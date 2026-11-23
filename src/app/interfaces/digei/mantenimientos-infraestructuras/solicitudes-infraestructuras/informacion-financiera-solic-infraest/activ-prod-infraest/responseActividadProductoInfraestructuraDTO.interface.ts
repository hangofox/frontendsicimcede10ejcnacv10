import { ActividadesProductosInfraestructurasI } from "./actividades-productos-infraestructuras.interface";

export interface ResponseActividadProductoInfraestructuraDTO {
    actividadProductoInfraestructuraDTO: ActividadesProductosInfraestructurasI;
    mensaje: string;
    banderaexito?: boolean;
}
