import { GerentesProyectosSolicInfraestI } from "./gerentes-proyectos-solic-infraest.interface";

export interface ResponseGerenteProyectoSolicInfraestDTO {
    gerenteProyectoSolicInfraestDTO: GerentesProyectosSolicInfraestI;
    mensaje: string;
    banderaexito?: boolean;
}
