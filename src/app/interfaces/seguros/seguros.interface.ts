import { TiposDocumentosIdentificacionI } from "../tipos-documentos-identificacion/tipos-documentos-identificacion.interface";

export interface TiposSegurosI {
    idTipoSeguro?: number;
    nombreTipoSeguro: String;
}

export interface AseguradorasI {
    idAseguradora?: number;
    tipoDocumentoIdentificacionDTO: TiposDocumentosIdentificacionI;
    nombreAseguradora: String;
    numeroDocumentoIdentificacionAseguradora: String;
    paisOrigenAseguradora: String;
    departamentoOEstadoOrigenAseguradora: String;
    ciudadOrigenAseguradora: String;
    direccionAseguradora: String;
    estadoAseguradora: String;
}

export interface SegurosI {
    idSeguro?: number;
    aseguradoraDTO: AseguradorasI;
    tipoSeguroDTO: TiposSegurosI;
    fechaHMSInicioSeguro: String;
    fechaHMSExpiracionSeguro: String;
    estadoSeguro: String;
}

export interface SegurosMsj {
  mensaje: string;
}
