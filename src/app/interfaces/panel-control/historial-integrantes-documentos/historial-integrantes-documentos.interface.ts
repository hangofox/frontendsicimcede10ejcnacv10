import { UnidadesMilitaresI } from "../unidades-militares/unidades-militares.interface";
import { TiposDocumentosIdentificacionI } from "../../tipos-documentos-identificacion/tipos-documentos-identificacion.interface";
import { CargosIntegrantesDocumentosI } from "../cargos-integrantes-documentos/cargos-integrantes-documentos.interface";

export interface HistorialIntegrantesDocumentosI {
    idHistorialIntegranteDocumentos?: number;
    numRegHistorialIntegranteDocumentos: String;
    unidadMilitarDTO: UnidadesMilitaresI;
    gradoIntegranteDocumentos: String;
    nombresYApellidosIntegranteDocumentos: String;
    cargoIntegranteDocumentos: String;
    tipoDocumentoIdentificacionDTO: TiposDocumentosIdentificacionI;
    numeroDocumentoIdentificacionIntegranteDocumentos: String;
    nombreArchivoFotoFirmaIntegranteDocumentos?: String;
    cargoIntegranteDocumentosDTO: CargosIntegrantesDocumentosI;
    siONoIntegranteDocumentos: String;
    siONoActualIntegranteDocumentosPredeterminado: String;
    numeroCursoIntegranteDocumentos: String;
    puestoCursoIntegranteDocumentos: String;
    escalafonAntiguedadIntegranteDocumentos: String;
    fechaHMSIngresoIntegranteDocumentos: String;
    fechaHMSModificacionIntegranteDocumentos: String;
}

export interface HistorialIntegrantesDocumentosMsj {
  mensaje: string;
}
