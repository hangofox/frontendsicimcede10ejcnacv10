//MISMOS CAMPOS Y NOMBRES EXACTOS QUE TipoDocumentoAnexoSolicInfraestDTO.java, EN EL ORDEN DE LA TABLA
//TABLA_TIPOS_DOCUMENTOS_ANEXOS_SOLIC_INFRAEST (EJ. ALCANCE, COTIZACION, FICHA TECNICA):
export interface TiposDocumentosAnexosSolicInfraestI {
    idTipoDocumentoAnexoSolicInfraest?: number;
    nombreTipoDocumentoAnexoSolicInfraest: String;
}

export interface TiposDocumentosAnexosSolicInfraestMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. NOMBRE YA EXISTENTE); ESTA BANDERA LO INDICA.
}
