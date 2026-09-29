//UTILIDAD DE ENCUADRE AUTOMÁTICO DE FOTOGRAFÍAS DE PERSONAS.
//
//EL PROBLEMA: LAS CAJAS DONDE SE MUESTRAN LAS FOTOGRAFÍAS (CÍRCULOS DE 96px, EL HEXÁGONO DEL CABEZOTE) CASI NUNCA
//TIENEN LA MISMA PROPORCIÓN QUE LA FOTOGRAFÍA, ASÍ QUE object-fit: cover RECORTA. CON UN object-position FIJO ESE
//RECORTE ES CIEGO AL CONTENIDO: A QUIEN TENGA LA CARA EN EL TERCIO SUPERIOR LE QUEDA BIEN, Y A QUIEN LA TENGA MÁS
//ABAJO —O SE HAYA RETRATADO DE MEDIO CUERPO— LE QUEDA BAJA O CORTADA.
//
//LO QUE HACE ESTE ARCHIVO: MIRAR LA FOTOGRAFÍA, ESTIMAR DÓNDE ESTÁ LA CABEZA Y DEVOLVER EL object-position QUE LA
//DEJA BIEN ENCUADRADA. SIN LIBRERÍAS NI MODELOS: SE DETECTAN LOS PÍXELES CON CROMATICIDAD DE PIEL, SE TOMA LA
//REGIÓN CONEXA MÁS GRANDE (LA CARA, NORMALMENTE) Y SE ESTIMA LA CORONILLA A PARTIR DE SU ANCHO.
//
//NO ES UN DETECTOR DE ROSTROS: NO SABE QUÉ ES UNA CARA, SOLO DÓNDE HAY PIEL. SE EQUIVOCA CON FONDOS DE TONO CARNE
//(MADERA, ARENA, UNA PARED BEIGE). POR ESO TODA ESTIMACIÓN DUDOSA SE DESCARTA Y SE DEVUELVE null, CON LO QUE MANDA
//EL object-position FIJO DEL CSS, QUE ES EL COMPORTAMIENTO QUE YA HABÍA.

//PROPORCIONES DE LA CAJA DONDE SE VA A MOSTRAR LA FOTOGRAFÍA, EN PÍXELES CSS. HACEN FALTA LAS DOS MEDIDAS PORQUE DE
//ELLAS DEPENDE QUÉ FRANJA DE LA FOTOGRAFÍA QUEDA VISIBLE:
export interface CajaFotografia {
  ancho: number;
  alto: number;
}

//LADO MÁXIMO DE LA IMAGEN DE ANÁLISIS. NO HACE FALTA MÁS: LA PIEL ES UNA MANCHA GRANDE, Y TRABAJAR PEQUEÑO ADEMÁS
//PROMEDIA EL RUIDO Y HACE EL RECORRIDO INSTANTÁNEO:
export const LADO_IMAGEN_ANALISIS = 160;

//VALIDACIONES DE LA REGIÓN DE PIEL ENCONTRADA, COMO FRACCIÓN DE LA IMAGEN DE ANÁLISIS. SI OCUPA MENOS DEL MÍNIMO NO
//HAY CARA RECONOCIBLE; SI OCUPA MÁS DEL MÁXIMO, LO QUE SE DETECTÓ ES UN FONDO DEL COLOR DE LA PIEL:
const AREA_MINIMA = 0.012;
const AREA_MAXIMA = 0.55;

//UNA CARA OCUPA UNA FRANJA, NO LA IMAGEN ENTERA. SI LA REGIÓN SE EXTIENDE CASI DE BORDE A BORDE EN LAS DOS
//DIRECCIONES A LA VEZ, LA DETECCIÓN NO ES DE FIAR:
const EXTENSION_MAXIMA = 0.9;

//EL ENCUADRE SE ANCLA EN LA LÍNEA DE LOS OJOS, NO EN LA CORONILLA. ANCLAR ARRIBA PARECE LO NATURAL, PERO FALLA EN
//LOS PRIMEROS PLANOS CERRADOS: SI LA CABEZA ES MÁS ALTA QUE LA FRANJA VISIBLE, EMPUJAR HACIA ARRIBA CORTA LA
//BARBILLA. LOS OJOS, EN CAMBIO, SIRVEN EN LOS DOS CASOS: EN UN PRIMER PLANO CENTRAN LA CARA, Y EN UN RETRATO DE
//MEDIO CUERPO EL VALOR SE SATURA CONTRA EL BORDE Y DEJA LA CABEZA ARRIBA CON AIRE, QUE ES LO QUE SE QUIERE ALLÍ.

//DÓNDE ESTÁN LOS OJOS DENTRO DE LA MANCHA DE PIEL, COMO FRACCIÓN DEL ANCHO DE LA CARA MEDIDO DESDE DONDE EMPIEZA LA
//PIEL. SE USA EL ANCHO Y NO EL ALTO PORQUE EL ALTO SE ALARGA CON EL CUELLO Y EL PECHO DESCUBIERTO. COMPROBADO CONTRA
//UNA FOTOGRAFÍA REAL DE 240x320: ESTIMA LOS OJOS EN y=115 Y ESTÁN EN y=120:
const OJOS_BAJO_EL_INICIO_DE_LA_PIEL = 0.45;

//A QUÉ ALTURA DE LO QUE SE VE SE COLOCA ESA LÍNEA DE LOS OJOS. UN TERCIO ES LA PROPORCIÓN CLÁSICA DEL RETRATO Y
//DEJA SITIO A LA BARBILLA POR DEBAJO:
const ALTURA_DE_LOS_OJOS_EN_LA_CAJA = 0.3;

//CALCULA EL object-position CON EL QUE LA CABEZA QUEDA BIEN ENCUADRADA EN LA CAJA, A PARTIR DE LOS PÍXELES RGBA DE
//UNA VERSIÓN PEQUEÑA DE LA FOTOGRAFÍA. DEVUELVE null CUANDO NO HAY UNA REGIÓN DE PIEL CREÍBLE, PARA QUE EL LLAMADOR
//DEJE EL VALOR FIJO DEL CSS:
export function calcularEncuadreRostro(pixeles: Uint8ClampedArray, ancho: number, alto: number, caja: CajaFotografia): string | null {
  const region = mayorRegionDePiel(pixeles, ancho, alto);
  if (!region) return null;

  const anchoCara = region.x1 - region.x0 + 1;
  const altoCara = region.y1 - region.y0 + 1;
  const area = region.area / (ancho * alto);
  if (area < AREA_MINIMA || area > AREA_MAXIMA) return null;
  if (anchoCara > ancho * EXTENSION_MAXIMA && altoCara > alto * EXTENSION_MAXIMA) return null;

  //LÍNEA DE LOS OJOS ESTIMADA: UN POCO POR DEBAJO DE DONDE EMPIEZA LA PIEL DE LA FRENTE:
  const lineaDeLosOjos = region.y0 + anchoCara * OJOS_BAJO_EL_INICIO_DE_LA_PIEL;

  //FRANJA DE LA FOTOGRAFÍA QUE DEJA VER LA CAJA CON object-fit: cover. SE RECORTA EN UNA SOLA DIRECCIÓN: LA QUE LE
  //SOBRA RESPECTO A LA PROPORCIÓN DE LA CAJA:
  const proporcionCaja = caja.ancho / caja.alto;
  let anchoVisible = ancho;
  let altoVisible = alto;
  if (ancho / alto > proporcionCaja) {
    anchoVisible = alto * proporcionCaja;
  } else {
    altoVisible = ancho / proporcionCaja;
  }

  //object-position REPARTE LO QUE SOBRA: 0 % PEGA LA FRANJA VISIBLE AL BORDE SUPERIOR (O IZQUIERDO) Y 100 % AL
  //CONTRARIO. SE DESPEJA EL PORCENTAJE QUE DEJA LOS OJOS A LA ALTURA DESEADA, Y LA CARA CENTRADA A LO ANCHO:
  const porcentajeVertical = fraccionRecorte(lineaDeLosOjos - ALTURA_DE_LOS_OJOS_EN_LA_CAJA * altoVisible, alto - altoVisible);
  const centroCaraX = (region.x0 + region.x1 + 1) / 2;
  const porcentajeHorizontal = fraccionRecorte(centroCaraX - anchoVisible / 2, ancho - anchoVisible);

  return aPorcentaje(porcentajeHorizontal) + '% ' + aPorcentaje(porcentajeVertical) + '%';
}

//PASA UN DESPLAZAMIENTO EN PÍXELES A LA FRACCIÓN 0-1 QUE ENTIENDE object-position. SI NO SOBRA NADA EN ESA DIRECCIÓN
//NO HAY RECORTE Y EL VALOR ES INDIFERENTE, ASÍ QUE SE DEVUELVE EL CENTRO:
function fraccionRecorte(desplazamiento: number, sobrante: number): number {
  if (sobrante <= 0) return 0.5;
  return Math.min(1, Math.max(0, desplazamiento / sobrante));
}

function aPorcentaje(fraccion: number): string {
  return (Math.round(fraccion * 1000) / 10).toString();
}

//¿ES ESTE PÍXEL PIEL? SE EXIGEN DOS REGLAS CLÁSICAS A LA VEZ, UNA EN RGB Y OTRA EN CROMINANCIA (Cb/Cr), PORQUE CADA
//UNA POR SEPARADO DEJA PASAR DEMASIADO: LA DE RGB ACEPTA NARANJAS Y ROJOS FUERTES, Y LA DE CROMINANCIA ACEPTA GRISES:
function esPiel(r: number, g: number, b: number): boolean {
  const maximo = Math.max(r, g, b);
  const minimo = Math.min(r, g, b);
  const reglaRgb = r > 95 && g > 40 && b > 20 && maximo - minimo > 15 && r - g > 15 && r > b;
  if (!reglaRgb) return false;
  const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
  const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
  return cb >= 80 && cb <= 135 && cr >= 133 && cr <= 180;
}

interface RegionPiel {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  area: number;
}

//REGIÓN DE PIEL CONEXA MÁS GRANDE. SE BUSCA LA MAYOR Y NO EL PROMEDIO DE TODA LA PIEL PORQUE UNA MANO, UN BRAZO O EL
//CUELLO SON MANCHAS APARTE: PROMEDIARLAS CORRERÍA EL ENCUADRE HACIA UN PUNTO DONDE NO HAY NADIE. EL RECORRIDO ES UN
//RELLENO POR INUNDACIÓN CON PILA EXPLÍCITA (NADA DE RECURSIÓN, QUE CON MILES DE PÍXELES DESBORDA):
function mayorRegionDePiel(pixeles: Uint8ClampedArray, ancho: number, alto: number): RegionPiel | null {
  const total = ancho * alto;
  const mascaraPiel = new Uint8Array(total);
  for (let i = 0; i < total; i++) {
    const p = i * 4;
    //LOS PÍXELES TRANSPARENTES NO CUENTAN: UNA IMAGEN RECORTADA CON FONDO VACÍO NO DEBE APORTAR PIEL:
    if (pixeles[p + 3] > 128 && esPiel(pixeles[p], pixeles[p + 1], pixeles[p + 2])) mascaraPiel[i] = 1;
  }

  const visitado = new Uint8Array(total);
  const pila = new Int32Array(total);
  let mayor: RegionPiel | null = null;

  for (let inicio = 0; inicio < total; inicio++) {
    if (!mascaraPiel[inicio] || visitado[inicio]) continue;

    let cima = 0;
    pila[cima++] = inicio;
    visitado[inicio] = 1;
    let area = 0;
    let x0 = ancho;
    let x1 = 0;
    let y0 = alto;
    let y1 = 0;

    while (cima > 0) {
      const i = pila[--cima];
      const x = i % ancho;
      const y = (i - x) / ancho;
      area++;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;

      if (x > 0 && mascaraPiel[i - 1] && !visitado[i - 1]) { visitado[i - 1] = 1; pila[cima++] = i - 1; }
      if (x < ancho - 1 && mascaraPiel[i + 1] && !visitado[i + 1]) { visitado[i + 1] = 1; pila[cima++] = i + 1; }
      if (y > 0 && mascaraPiel[i - ancho] && !visitado[i - ancho]) { visitado[i - ancho] = 1; pila[cima++] = i - ancho; }
      if (y < alto - 1 && mascaraPiel[i + ancho] && !visitado[i + ancho]) { visitado[i + ancho] = 1; pila[cima++] = i + ancho; }
    }

    if (!mayor || area > mayor.area) mayor = { x0, x1, y0, y1, area };
  }

  return mayor;
}
