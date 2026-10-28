import { SolicitudesInfraestructurasI } from "../solicitudes-infraestructuras.interface";
import { TiposFuentesFinanciacionI } from "../../../tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface";
import { ActividadesProductosInfraestructurasI } from "./activ-prod-infraest/actividades-productos-infraestructuras.interface";

//MISMOS CAMPOS Y NOMBRES EXACTOS QUE InformacionFinancieraSolicitudInfraestructuraDTO.java, EN EL ORDEN DE LA TABLA
//TABLA_INFORMACION_FINANCIERA_SOLICITUDES_INFRAESTRUCTURAS (UN REGISTRO POR ACTIVIDAD DE PRODUCTO DE LA SOLICITUD):
export interface InformacionFinancieraSolicInfraestI {
    idInformacionFinancieraSolicitudInfraestructura?: number;
    solicitudInfraestructuraDTO: SolicitudesInfraestructurasI;
    tipoFuenteFinanciacionDTO: TiposFuentesFinanciacionI;
    observacionesPresupuestoInfraestructura: String;
    actividadProductoInfraestructuraDTO: ActividadesProductosInfraestructurasI;
    cantidadActividadProductoInfraestructura: number;
    valorCostoUnitarioCapituloProductoInfraestructura: String;//EN LA TABLA ES VARCHAR2 (EJ. "85000").
    numeroAreaIntervencionInfraestructura: String;//EN LA TABLA ES VARCHAR2 (EJ. "360.00").
    nombreUnidadMedidaAreaIntervencionInfraestructura: String;//EJ. "METROS CUADRADOS".
}

export interface InformacionFinancieraSolicInfraestMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
