import { UnidadesMilitaresI } from "../../panel-control/unidades-militares/unidades-militares.interface";
import { TiposSolicitudesInfraestructurasI } from "../tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.interface";
import { InfraestructurasI } from "../finca-raiz/infraestructuras/infraestructuras.interface";

export interface SolicitudesInfraestructurasI {
    idSolicitudInfraestructura?: number;
    codigoRadicadoSolicitudInfraestructura: String;
    unidadMilitarDTO: UnidadesMilitaresI;
    fechaHMSSolicitudInfraestructura: String;
    tipoSolicitudInfraestructuraDTO: TiposSolicitudesInfraestructurasI;
    nombreSolicitudInfraestructura: String;
    infraestructuraDTO: InfraestructurasI;
    nombreDependenciaSolicitudInfraestructura: String;
    numeroFuncionariosSolicitudInfraestructura: number;
    numeroUsuariosSolicitudInfraestructura: number;
    observacionesJuridicasEstadoPredioInfraestructura: String;
    observacionesEstadoAmbientalInfraestructura: String;
    justificacionNecesidadInfraestructura: String;
    descripcionGeneralNecesidadInfraestructura: String;
    descripcionImpactoEsperadoInfraestructura: String;
    fechaHMSIngresoSolicitudInfraestructura: String;
    fechaHMSModificacionSolicitudInfraestructura: String;
}

export interface SolicitudesInfraestructurasMsj {
  mensaje: string;
}
