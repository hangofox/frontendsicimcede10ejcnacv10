//UTILIDAD DE REESCALADO DE FOTOGRAFÍAS PARA LAS CAJAS PEQUEÑAS DE LA APLICACIÓN (AVATARES DE 68px, 96px, ETC.).
//
//EL PROBLEMA: LAS FOTOGRAFÍAS QUE SUBEN LOS USUARIOS VIENEN DE CÁMARA O CELULAR (DEL ORDEN DE 1000x1500 PÍXELES) Y
//SE MUESTRAN EN CÍRCULOS DE 96 PÍXELES, UNA REDUCCIÓN DE UNAS DIEZ VECES. AHÍ HAY DOS FORMAS DE VERSE MAL, Y SON
//OPUESTAS:
//
//  1) SI SE LE ENTREGA AL <img> LA FOTOGRAFÍA ORIGINAL, EL NAVEGADOR LA ENCOGE EN UN SOLO PASO TOMANDO CUATRO
//     PÍXELES VECINOS Y TIRANDO EL RESTO. CADA PÍXEL FINAL DEBERÍA RESUMIR UNOS NOVENTA DE ORIGEN, ASÍ QUE LO QUE
//     APARECE ES DETALLE FALSO: BORDES ASERRADOS Y PELO QUE TIEMBLA. SE VE "CONTRASTADA" PERO ESTÁ MAL.
//  2) SI SE REDUCE PROMEDIANDO CORRECTAMENTE, EL RESULTADO ES FIEL PERO BLANDO: A UN DÉCIMO DE TAMAÑO EL DETALLE
//     FINO SIMPLEMENTE YA NO CABE.
//
//LA SOLUCIÓN ES HACER LAS DOS COSAS BIEN: REDUCIR UNA SOLA VEZ CON EL REESCALADOR DE ALTA CALIDAD DEL NAVEGADOR
//(createImageBitmap CON resizeQuality: 'high') Y DEVOLVERLE DESPUÉS EL CONTRASTE LOCAL CON UNA MÁSCARA DE ENFOQUE,
//QUE ES LO QUE HACE CUALQUIER PROGRAMA DE FOTOGRAFÍA AL EXPORTAR UNA MINIATURA. ASÍ SE VE NÍTIDA SIN INVENTAR
//BORDES. DE PASO SE LIBERA MEMORIA: UNA FOTOGRAFÍA DE 1086x1448 OCUPA 6,3 MB DESCOMPRIMIDA; SU MINIATURA, UNAS
//DECENAS DE KILOBYTES.
//
//NO SE USAN LIBRERÍAS EXTERNAS: createImageBitmap Y <canvas> SON NATIVOS. SI ALGO NO ESTÁ DISPONIBLE O FALLA, SE
//DEVUELVE LA FOTOGRAFÍA ORIGINAL SIN TOCAR, DE MODO QUE EN EL PEOR CASO SE VE COMO SE VEÍA ANTES.

import { CajaFotografia, LADO_IMAGEN_ANALISIS, calcularEncuadreRostro } from './encuadre-rostro.util';

export type { CajaFotografia } from './encuadre-rostro.util';

//FACTOR DE DENSIDAD DE PANTALLA CON EL QUE SE GENERA LA MINIATURA. SE LIMITA A 3 PARA QUE UN MONITOR DE MUCHA
//DENSIDAD NO OBLIGUE A GUARDAR UNA MINIATURA DESPROPORCIONADA:
const DENSIDAD_MAXIMA = 3;

//LA MINIATURA SE GENERA EXACTAMENTE DEL TAMAÑO EN PÍXELES REALES DE PANTALLA QUE VA A OCUPAR, NI UNO MÁS. DARLE
//MARGEN DE SOBRA PARECE MÁS PRUDENTE, PERO ES CONTRAPRODUCENTE: SI LLEGA MÁS GRANDE, EL NAVEGADOR VUELVE A
//ENCOGERLA CON SU FILTRO BARATO Y SE LLEVA POR DELANTE BUENA PARTE DEL ENFOQUE. MEDIDO SOBRE UNA FOTOGRAFÍA REAL
//EN UNA CAJA DE 96px, EL DETALLE QUE LLEGA A LA PANTALLA ES 15,4 SIN MARGEN, 12,9 CON UN MARGEN DE 1,5 Y 11,8 CON
//UNO DE 1,25. AL MAPEARSE 1:1 NO QUEDA NINGÚN REESCALADO POSTERIOR QUE LA VUELVA A ABLANDAR.

//SI LA FOTOGRAFÍA YA ES CASI DEL TAMAÑO NECESARIO NO SE TOCA: CADA REESCALADO PIERDE UN POCO DE DEFINICIÓN:
const FACTOR_MINIMO_PARA_REESCALAR = 1.2;

//INTENSIDAD DE LA MÁSCARA DE ENFOQUE. CRECE CON LA REDUCCIÓN (A MÁS DETALLE PERDIDO, MÁS HAY QUE DEVOLVER) Y SE
//LIMITA PARA NO DEJAR EL HALO CLARO ALREDEDOR DE LAS SILUETAS QUE DELATA UNA FOTOGRAFÍA SOBREENFOCADA:
const ENFOQUE_POR_DUPLICACION = 0.18;
const ENFOQUE_MAXIMO = 0.5;

//LO QUE NECESITA LA PLANTILLA PARA MOSTRAR LA FOTOGRAFÍA: LA URL DE LA MINIATURA Y EL object-position CON EL QUE LA
//CARA QUEDA BIEN ENCUADRADA. posicionObjeto ES null CUANDO NO SE PUDO ESTIMAR, Y ENTONCES MANDA EL VALOR DEL CSS:
export interface FotografiaAjustada {
  url: string;
  posicionObjeto: string | null;
}

//GENERA UNA VERSIÓN DE LA FOTOGRAFÍA AJUSTADA A LA CAJA DONDE SE VA A MOSTRAR.
//
//LA MINIATURA SE ESCALA PARA QUE SU LADO MENOR ALCANCE EL LADO MAYOR DE LA CAJA, QUE ES LA CONDICIÓN QUE NECESITA
//object-fit: cover PARA LLENARLA SIN DEFORMAR, VENGA LA FOTOGRAFÍA VERTICAL U HORIZONTAL.
//
//QUIEN LA RECIBE ES DUEÑO DE LA URL Y DEBE LIBERARLA CON URL.revokeObjectURL():
export async function generarMiniaturaFotografia(fotografia: Blob, caja: CajaFotografia): Promise<FotografiaAjustada> {
  try {
    if (typeof createImageBitmap !== 'function') return { url: URL.createObjectURL(fotografia), posicionObjeto: null };

    const densidad = Math.min(Math.max(window.devicePixelRatio || 1, 1), DENSIDAD_MAXIMA);
    const ladoObjetivo = Math.round(Math.max(caja.ancho, caja.alto) * densidad);

    const original = await createImageBitmap(fotografia);
    const ladoMenor = Math.min(original.width, original.height);
    const anchoOriginal = original.width;
    const altoOriginal = original.height;
    //EL ENCUADRE SE ESTIMA SOBRE EL BITMAP YA DECODIFICADO, ANTES DE CERRARLO, PARA NO VOLVER A DECODIFICAR EL BLOB:
    const posicionObjeto = estimarEncuadre(original, caja);
    original.close();

    if (ladoMenor < ladoObjetivo * FACTOR_MINIMO_PARA_REESCALAR) return { url: URL.createObjectURL(fotografia), posicionObjeto };

    //SE CONSERVA LA PROPORCIÓN ORIGINAL: EL RECORTE NO SE HACE AQUÍ, LO HACE object-fit: cover EN EL CSS, QUE ES
    //QUIEN SABE CÓMO ESTÁ ENCUADRADA LA CAJA:
    const escala = ladoObjetivo / ladoMenor;
    const ancho = Math.max(1, Math.round(anchoOriginal * escala));
    const alto = Math.max(1, Math.round(altoOriginal * escala));

    //EL REESCALADO LO HACE createImageBitmap A PARTIR DEL BLOB ORIGINAL, NO UN drawImage SOBRE EL BITMAP YA
    //DECODIFICADO, PORQUE ASÍ EL NAVEGADOR APLICA SU FILTRO BUENO EN UN SOLO PASO:
    const miniatura = await createImageBitmap(fotografia, {
      resizeWidth: ancho,
      resizeHeight: alto,
      resizeQuality: 'high'
    });

    const lienzo = document.createElement('canvas');
    lienzo.width = ancho;
    lienzo.height = alto;
    const contexto = lienzo.getContext('2d');
    if (!contexto) {
      miniatura.close();
      return { url: URL.createObjectURL(fotografia), posicionObjeto };
    }
    contexto.imageSmoothingEnabled = true;
    contexto.imageSmoothingQuality = 'high';
    contexto.drawImage(miniatura, 0, 0, ancho, alto);
    miniatura.close();

    aplicarMascaraEnfoque(contexto, ancho, alto, cantidadEnfoque(ladoMenor / ladoObjetivo));

    //SE GUARDA EN PNG PARA NO DEPENDER DEL FORMATO DE ORIGEN NI PERDER LA TRANSPARENCIA SI LA IMAGEN LA TUVIERA. A
    //ESTE TAMAÑO EL PESO ES IRRELEVANTE Y NO SE VUELVE A COMPRIMIR CON PÉRDIDA LO QUE YA VENÍA COMPRIMIDO:
    const reducida = await new Promise<Blob | null>(resolver => lienzo.toBlob(resolver, 'image/png'));
    return { url: URL.createObjectURL(reducida || fotografia), posicionObjeto };
  } catch (error) {
    console.error('NO SE PUDO REESCALAR LA FOTOGRAFÍA, SE MUESTRA LA ORIGINAL: ', error);
    return { url: URL.createObjectURL(fotografia), posicionObjeto: null };
  }
}

//ESTIMA EL object-position QUE DEJA LA CARA BIEN ENCUADRADA. EL ANÁLISIS SE HACE SOBRE UNA COPIA PEQUEÑA DE LA
//FOTOGRAFÍA (VER encuadre-rostro.util.ts): NO HACE FALTA MÁS RESOLUCIÓN PARA UBICAR UNA MANCHA DE PIEL, Y ASÍ EL
//RECORRIDO ES INSTANTÁNEO. SI ALGO FALLA SE DEVUELVE null Y MANDA EL VALOR FIJO DEL CSS:
function estimarEncuadre(bitmap: ImageBitmap, caja: CajaFotografia): string | null {
  try {
    const escala = Math.min(1, LADO_IMAGEN_ANALISIS / Math.max(bitmap.width, bitmap.height));
    const ancho = Math.max(1, Math.round(bitmap.width * escala));
    const alto = Math.max(1, Math.round(bitmap.height * escala));
    const lienzo = document.createElement('canvas');
    lienzo.width = ancho;
    lienzo.height = alto;
    const contexto = lienzo.getContext('2d', { willReadFrequently: true });
    if (!contexto) return null;
    contexto.drawImage(bitmap, 0, 0, ancho, alto);
    return calcularEncuadreRostro(contexto.getImageData(0, 0, ancho, alto).data, ancho, alto, caja);
  } catch (error) {
    console.error('NO SE PUDO ESTIMAR EL ENCUADRE DE LA FOTOGRAFÍA: ', error);
    return null;
  }
}

//CUÁNTO ENFOQUE APLICAR SEGÚN CUÁNTO SE REDUJO LA FOTOGRAFÍA: UNA REDUCCIÓN DE 2 VECES PIERDE POCO DETALLE Y UNA
//DE 10 PIERDE MUCHO, ASÍ QUE LA CANTIDAD SUBE CON EL LOGARITMO DE LA REDUCCIÓN:
function cantidadEnfoque(reduccion: number): number {
  if (!(reduccion > 1)) return 0;
  return Math.min(ENFOQUE_MAXIMO, ENFOQUE_POR_DUPLICACION * Math.log2(reduccion));
}

//MÁSCARA DE ENFOQUE CLÁSICA: SE DESENFOCA UNA COPIA CON UNA GAUSSIANA SEPARABLE DE TRES TOMAS (1-2-1) Y SE LE
//DEVUELVE A CADA PÍXEL LO QUE EL DESENFOQUE LE QUITÓ. NO INVENTA DETALLE NUEVO, REALZA EL QUE YA ESTÁ:
function aplicarMascaraEnfoque(contexto: CanvasRenderingContext2D, ancho: number, alto: number, cantidad: number): void {
  if (cantidad <= 0.01 || ancho < 3 || alto < 3) return;

  const imagen = contexto.getImageData(0, 0, ancho, alto);
  const pixeles = imagen.data;
  const total = ancho * alto * 4;
  const paso = ancho * 4;
  const horizontal = new Float32Array(total);
  const desenfocada = new Float32Array(total);

  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const i = y * paso + x * 4;
      const iIzquierda = y * paso + Math.max(0, x - 1) * 4;
      const iDerecha = y * paso + Math.min(ancho - 1, x + 1) * 4;
      for (let c = 0; c < 3; c++) {
        horizontal[i + c] = (pixeles[iIzquierda + c] + 2 * pixeles[i + c] + pixeles[iDerecha + c]) / 4;
      }
    }
  }
  for (let y = 0; y < alto; y++) {
    const iArriba = Math.max(0, y - 1) * paso;
    const iAbajo = Math.min(alto - 1, y + 1) * paso;
    for (let x = 0; x < ancho; x++) {
      const i = y * paso + x * 4;
      const desplazamiento = x * 4;
      for (let c = 0; c < 3; c++) {
        desenfocada[i + c] = (horizontal[iArriba + desplazamiento + c] + 2 * horizontal[i + c] + horizontal[iAbajo + desplazamiento + c]) / 4;
      }
    }
  }
  //LA ASIGNACIÓN A UN Uint8ClampedArray YA RECORTA SOLA A 0-255, NO HACE FALTA COMPROBARLO:
  for (let i = 0; i < total; i += 4) {
    for (let c = 0; c < 3; c++) {
      pixeles[i + c] = pixeles[i + c] + cantidad * (pixeles[i + c] - desenfocada[i + c]);
    }
  }
  contexto.putImageData(imagen, 0, 0);
}
