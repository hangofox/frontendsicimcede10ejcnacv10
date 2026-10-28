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
    //LO ASIGNA EL BACKEND (CREACION AL CREAR Y LUEGO AUTOMÁTICAMENTE HASTA ASIGNACION SEGÚN LOS INTEGRANTES DEL HISTORIAL); EL FORMULARIO NO LO ENVÍA:
    estadoSolicitudInfraestructura?: String;
}

export interface SolicitudesInfraestructurasMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. ESTADO NO PERMITIDO EN UNA SOLICITUD AVALADA); ESTA BANDERA LO INDICA.
}
