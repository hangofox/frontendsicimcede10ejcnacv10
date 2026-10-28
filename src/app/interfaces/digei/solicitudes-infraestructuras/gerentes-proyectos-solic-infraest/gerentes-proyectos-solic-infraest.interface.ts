import { SolicitudesInfraestructurasI } from "../solicitudes-infraestructuras.interface";

//MISMOS CAMPOS Y NOMBRES EXACTOS QUE GerenteProyectoSolicInfraestDTO.java, EN EL ORDEN DE LA TABLA
//TABLA_GERENTES_PROYECTOS_SOLIC_INFRAEST (UN SOLO GERENTE DE PROYECTO POR SOLICITUD DE INFRAESTRUCTURA):
export interface GerentesProyectosSolicInfraestI {
    idGerenteProyectoSolicInfraest?: number;
    solicitudInfraestructuraDTO: SolicitudesInfraestructurasI;
    gradoGerenteProyectoSolicInfraest: String;
    nombresGerenteProyectoSolicInfraest: String;
    primerApellidoGerenteProyectoSolicInfraest: String;
    segundoApellidoGerenteProyectoSolicInfraest: String;
    movilGerenteProyectoSolicInfraest: String;
    cargoActualGerenteProyectoSolicInfraest: String;
}

export interface GerentesProyectosSolicInfraestMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. LA SOLICITUD YA TIENE GERENTE DE PROYECTO); ESTA BANDERA LO INDICA.
}
