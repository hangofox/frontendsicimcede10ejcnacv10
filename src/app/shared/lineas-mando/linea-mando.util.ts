//NOMENCLATURA DE LA LÍNEA DE MANDO DE UNA UNIDAD MILITAR:
// - "->" SEPARA LOS PASOS (SIGLAS O ACRÓNIMOS) EN ORDEN, DE LA UNIDAD MILITAR SUBALTERNA HACIA LA SUPERIOR, EJ. "BAICC->BRICC->CAOCC".
// - AL FINAL PUEDEN IR VARIOS FINALES ALTERNATIVOS, CADA UNO ENTRE CORCHETES Y SEGUIDOS, DONDE TERMINA LA LÍNEA DE MANDO, EJ.
//   "BAICC->BRICC->CAOCC->[SECEJ->CEDE10][CEDE10][JEMGF->COING]": LA LÍNEA RECORRE EL TRAMO COMÚN (BAICC->BRICC->CAOCC) Y
//   LUEGO SIGUE POR UNO DE LOS TRES CAMINOS (SECEJ->CEDE10, CEDE10 O JEMGF->COING).
export const SEPARADOR_LINEA_MANDO = '->';
export const APERTURA_FINAL_ALTERNATIVO = '[';
export const CIERRE_FINAL_ALTERNATIVO = ']';

export interface EstructuraLineaMando {
  tramoComun: string[];
  finalesAlternativos: string[][];
}

export interface AnalisisLineaMando {
  estructura: EstructuraLineaMando;
  errores: string[];
}

//QUITA LOS ESPACIOS DE LOS EXTREMOS Y LOS QUE QUEDEN ALREDEDOR DE "->", "[" Y "]" (EJ. "CAOCC -> [ SECEJ ]" QUEDA "CAOCC->[SECEJ]"):
export function compactarLineaMando(texto: unknown): string {
  return String(texto ?? '').trim().replace(/\s*(->|\[|\])\s*/g, '$1');
}

function separarPasos(tramo: string): string[] {
  return tramo.split(SEPARADOR_LINEA_MANDO).map(paso => paso.trim());
}

//SEPARA LA LÍNEA DE MANDO EN SU TRAMO COMÚN Y SUS FINALES ALTERNATIVOS, Y DEVUELVE LOS ERRORES DE FORMATO DE LOS CORCHETES.
//NO VALIDA LAS SIGLAS O ACRÓNIMOS (ESO LO HACE EL FORMULARIO CONTRA EL CATÁLOGO DE UNIDADES MILITARES):
export function analizarLineaMando(texto: unknown): AnalisisLineaMando {
  const lineaMando = compactarLineaMando(texto);
  const estructura: EstructuraLineaMando = { tramoComun: [], finalesAlternativos: [] };
  const errores: string[] = [];
  if (!lineaMando) return { estructura, errores };

  const inicioFinales = lineaMando.indexOf(APERTURA_FINAL_ALTERNATIVO);
  let tramoComun = inicioFinales < 0 ? lineaMando : lineaMando.slice(0, inicioFinales);
  const finalesAlternativos = inicioFinales < 0 ? '' : lineaMando.slice(inicioFinales);

  if (tramoComun.includes(CIERRE_FINAL_ALTERNATIVO)) {
    errores.push('Hay un "]" sin su "[" de apertura.');
  }
  if (inicioFinales >= 0) {
    if (tramoComun.endsWith(SEPARADOR_LINEA_MANDO)) {
      tramoComun = tramoComun.slice(0, -SEPARADOR_LINEA_MANDO.length);
    } else {
      errores.push('Antes del primer "[" debe ir el tramo común terminado en "->", ej. "BAICC->BRICC->CAOCC->[SECEJ->CEDE10][CEDE10]".');
    }
    if (/^(\[[^\[\]]*\])+$/.test(finalesAlternativos)) {
      estructura.finalesAlternativos = (finalesAlternativos.match(/\[[^\[\]]*\]/g) ?? []).map(final => separarPasos(final.slice(1, -1)));
    } else {
      errores.push('Los finales alternativos van al final de la línea de mando, cada uno entre corchetes y seguidos, sin nada después, ej. "[SECEJ->CEDE10][CEDE10]".');
    }
    if (estructura.finalesAlternativos.length === 1) {
      errores.push('Con un solo final no se usan corchetes: escriba al menos dos finales alternativos o quite los corchetes.');
    }
  }
  estructura.tramoComun = tramoComun ? separarPasos(tramoComun) : [];
  return { estructura, errores };
}

//ARMA EL TEXTO QUE SE GUARDA, SIN ESPACIOS, EJ. "BAICC->BRICC->CAOCC->[SECEJ->CEDE10][CEDE10][JEMGF->COING]":
export function formatearLineaMando(estructura: EstructuraLineaMando): string {
  const tramoComun = estructura.tramoComun.join(SEPARADOR_LINEA_MANDO);
  if (!estructura.finalesAlternativos.length) return tramoComun;
  const finalesAlternativos = estructura.finalesAlternativos
    .map(final => APERTURA_FINAL_ALTERNATIVO + final.join(SEPARADOR_LINEA_MANDO) + CIERRE_FINAL_ALTERNATIVO)
    .join('');
  return tramoComun + SEPARADOR_LINEA_MANDO + finalesAlternativos;
}

//RUTAS COMPLETAS QUE PUEDE SEGUIR LA LÍNEA DE MANDO (TRAMO COMÚN + CADA FINAL ALTERNATIVO); SIN FINALES ALTERNATIVOS ES UNA SOLA RUTA:
export function obtenerRutasLineaMando(estructura: EstructuraLineaMando): string[][] {
  if (!estructura.finalesAlternativos.length) return estructura.tramoComun.length ? [estructura.tramoComun] : [];
  return estructura.finalesAlternativos.map(final => [...estructura.tramoComun, ...final]);
}

//ÍNDICES DE LOS FINALES ALTERNATIVOS QUE SIGUEN VIGENTES PARA UNA SOLICITUD SEGÚN LAS SIGLAS O ACRÓNIMOS DE LAS UNIDADES MILITARES QUE YA
//TIENEN INTEGRANTES REGISTRADOS: MIENTRAS NINGUNA UNIDAD MILITAR DE LOS FINALES LOS TIENE SE DEVUELVEN TODOS; CUANDO YA LOS TIENE, LA
//SOLICITUD TOMÓ ESE CAMINO Y SOLO SE DEVUELVEN LOS FINALES CON MÁS UNIDADES MILITARES CON INTEGRANTES (PUEDEN SER VARIOS SI EMPATAN,
//EJ. CON SOLO CEDE10 QUEDAN [JEMPP->CEDE10] Y [CEDE10]). LAS SIGLAS O ACRÓNIMOS SE COMPARAN EN MAYÚSCULA:
export function obtenerIndicesFinalesVigentes(estructura: EstructuraLineaMando, siglasoAcronimosConIntegrantes: Set<string>): number[] {
  const aprobadosPorFinal = estructura.finalesAlternativos.map(final =>
    final.filter(paso => siglasoAcronimosConIntegrantes.has(String(paso ?? '').trim().toUpperCase())).length
  );
  const maximoAprobados = Math.max(0, ...aprobadosPorFinal);
  return aprobadosPorFinal
    .map((aprobados, indice) => ({ aprobados, indice }))
    .filter(final => maximoAprobados === 0 || final.aprobados === maximoAprobados)
    .map(final => final.indice);
}

//TODOS LOS PASOS DE LA LÍNEA DE MANDO SIN REPETIR, EN ORDEN (PRIMERO EL TRAMO COMÚN Y LUEGO LOS DE CADA FINAL ALTERNATIVO),
//PARA LOS COMBOS Y ORDENAMIENTOS QUE NECESITAN UNA SOLA LISTA DE UNIDADES MILITARES:
export function obtenerPasosUnicosLineaMando(estructura: EstructuraLineaMando): string[] {
  return [...new Set([...estructura.tramoComun, ...estructura.finalesAlternativos.flat()].filter(paso => !!paso))];
}
