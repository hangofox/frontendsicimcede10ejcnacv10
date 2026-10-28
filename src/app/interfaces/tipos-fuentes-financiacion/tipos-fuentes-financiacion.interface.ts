//MISMOS CAMPOS Y NOMBRES EXACTOS QUE TipoFuenteFinanciacionDTO.java, EN EL ORDEN DE LA TABLA TABLA_TIPOS_FUENTES_FINANCIACION:
export interface TiposFuentesFinanciacionI {
    idTipoFuenteFinanciacion?: number;
    nombreTipoFuenteFinanciacion: String;
    clasificacionTipoFuenteFinanciacion: String;//EJ. INTERNO O EXTERNO.
}

export interface TiposFuentesFinanciacionMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. NOMBRE YA EXISTENTE); ESTA BANDERA LO INDICA.
}
