export interface UnidadesMilitaresI {
    idUnidadMilitar?: number;
    codigoUnidadMilitar: String;
    nombreUnidadMilitar: String;
    siglaoAcronimoUnidadMilitar: String;
    nombreArchivoFotoLogExtoFmtUnidadMilitar: String;
    nombreCarpetaAlmacenamientoUnidadMilitar: String;
    nivelUnidadMilitar: String;
}

export interface UnidadesMilitaresMsj {
    mensaje: string;
    banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO MODIFIQUE (EJ. SIGLA O ACRÓNIMO REPETIDA); ESTA BANDERA LO INDICA.
}