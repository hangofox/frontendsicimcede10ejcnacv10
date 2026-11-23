import { CapitulosInfraestructurasI } from "./capit-infraest/capitulos-infraestructuras.interface";

//MISMOS CAMPOS Y NOMBRES EXACTOS QUE ActividadProductoInfraestructuraDTO.java, EN EL ORDEN DE LA TABLA
//TABLA_ACTIVIDADES_PRODUCTOS_INFRAESTRUCTURAS:
export interface ActividadesProductosInfraestructurasI {
    idActividadProductoInfraestructura?: number;
    nombreActividadProductoInfraestructura: String;
    capituloInfraestructuraDTO: CapitulosInfraestructurasI;
    siglaOAcronimoUnidadMedidaActividadProductoInfraestructura: String;
}

export interface ActividadesProductosInfraestructurasMsj {
  mensaje: string;
  banderaexito?: boolean;
}
