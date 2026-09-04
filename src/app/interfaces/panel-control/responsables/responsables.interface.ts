import { UnidadesMilitaresI } from "../../panel-control/unidades-militares/unidades-militares.interface";
import { TiposDocumentosIdentificacionI } from "../../tipos-documentos-identificacion/tipos-documentos-identificacion.interface";

export interface ResponsablesI {
    idResponsable?: number;
    unidadMilitarDTO: UnidadesMilitaresI;
    usuarioRedResponsable: String;
    tipoDocumentoIdentificacionDTO: TiposDocumentosIdentificacionI;
    numeroDocumentoIdentificacionResponsable: String;
    lugarExpedicionDocumentoIdentificacionResponsable: String;
    gradoResponsable: String;
    nombresResponsable: String;
    primerApellidoResponsable: String;
    segundoApellidoResponsable: String;
    armaResponsable: String;
    nombreArchivoFotoExtensionoFormatoResponsable: String;
    fechaHMSNacimientoResponsable: String;
    sexoResponsable: String;
    direccionResponsable: String;
    telefonoResponsable: String;
    movilResponsable: String;
    correoElectronicoPersonalResponsable: String;
    correoElectronicoInstitucionalResponsable: String;
    paisOrigenResponsable: String;
    departamentooEstadoOrigenResponsable: String;
    ciudadOrigenResponsable: String;
    numeroCursoResponsable: String;
    puestoCursoResponsable: String;
    escalafonAntiguedadResponsable: String;
    fechaHMSIncorporacionFFMMResponsable: String;
    fechaHMSIngresoResponsable: String;
    fechaHMSModificacionResponsable: String;
    estadoResponsable: String;
}

export interface ResponsablesMsj {
  mensaje: string;
}
