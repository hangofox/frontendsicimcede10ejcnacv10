import { InfraestructurasI } from '../infraestructuras.interface';

export interface HistorialResponsablesInfraestI {
  idHistorialResponsableInfraestructura?: number;
  numRegHistorialResponsableInfraestructura?: String;
  siglaOAcronimoUnidadMilitar: String;
  nombreTipoDocumentoIdentificacion: String;
  numeroDocumentoIdentificacionResponsable: String;
  lugarExpedicionDocumentoIdentificacionResponsable: String;
  gradoResponsable: String;
  nombresResponsable: String;
  primerApellidoResponsable: String;
  segundoApellidoResponsable: String;
  siONoActualResponsablePredeterminado: String;
  numeroCursoResponsable: String;
  puestoCursoResponsable: String;
  escalafonAntiguedadResponsable: String;
  fechaHMSIngresoResponsable?: String;
  fechaHMSModificacionResponsable?: String;
  infraestructuraDTO: InfraestructurasI;
}

export interface HistorialResponsablesInfraestMsj {
  mensaje: string;
}
