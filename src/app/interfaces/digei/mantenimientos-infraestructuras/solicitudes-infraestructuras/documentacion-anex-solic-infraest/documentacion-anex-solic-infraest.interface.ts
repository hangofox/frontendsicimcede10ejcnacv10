import { SolicitudesInfraestructurasI } from "../solicitudes-infraestructuras.interface";
import { TiposDocumentosAnexosSolicInfraestI } from "../tipos-documentacion-anex-solic-infraest/tipos-documentacion-anex-solic-infraest.interface";

//MISMOS CAMPOS Y NOMBRES EXACTOS QUE DocumentacionAnexaSolicInfraestDTO.java, EN EL ORDEN DE LA TABLA
//TABLA_DOCUMENTACION_ANEXAS_SOLIC_INFRAEST (UN REGISTRO POR DOCUMENTO ANEXO DE LA SOLICITUD):
export interface DocumentacionAnexaSolicInfraestI {
    idDocumentacionAnexaSolicInfraest?: number;
    solicitudInfraestructuraDTO: SolicitudesInfraestructurasI;
    nombreDocumentoAnexoSolicInfraest: String;
    tipoDocumentoAnexoSolicInfraestDTO: TiposDocumentosAnexosSolicInfraestI;
    //NOMBRE DEL ARCHIVO EN LA CARPETA DE LA UNIDAD MILITAR DE LA SOLICITUD (EJ. "ALCANCE_SOLICITUD_INFRAESTRUCTURA_001.PDF"):
    nombreArchivoDocumentoAnexoSolicInfraest: String | null;
}

export interface DocumentacionAnexaSolicInfraestMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
