import { CapitulosInfraestructurasI } from "./capitulos-infraestructuras.interface";

export interface ResponseCapituloInfraestructuraDTO {
    capituloInfraestructuraDTO: CapitulosInfraestructurasI;
    mensaje: string;
    banderaexito?: boolean;
}
