import { SolicitudesInfraestructurasI } from "../solicitudes-infraestructuras.interface";
import { UnidadesMilitaresI } from "../../../../panel-control/unidades-militares/unidades-militares.interface";

//MISMOS CAMPOS Y NOMBRES EXACTOS QUE HistorialIntegranteSolicitudInfraestructuraDTO.java (UN REGISTRO POR INTEGRANTE Y
//CARGO DE LA SOLICITUD DE INFRAESTRUCTURA):
export interface HistorialIntegrantesSolicInfraestI {
    idHistorialIntegranteSolicitudInfraestructura?: number;
    numRegHistorialIntegranteSolicitudInfraestructura: String;
    solicitudInfraestructuraDTO: SolicitudesInfraestructurasI;
    unidadMilitarDTO: UnidadesMilitaresI;//UNIDAD MILITAR DEL INTEGRANTE (PASO DE LA LÍNEA DE MANDO DE LA SOLICITUD).
    gradoIntegranteSolicitudInfraestructura: String;
    nombresIntegranteSolicitudInfraestructura: String;
    primerApellidoIntegranteSolicitudInfraestructura: String;
    segundoApellidoIntegranteSolicitudInfraestructura: String;
    nombreArchivoFotoFirmaIntegranteSolicitudInfraestructura: String;
    cargoIntegranteSolicitudInfraestructura: String;
}

export interface HistorialIntegrantesSolicInfraestMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. CARGO YA REGISTRADO EN LA SOLICITUD); ESTA BANDERA LO INDICA.
}
