import { InfraestructurasI } from "../../finca-raiz/infraestructuras/infraestructuras.interface";
import { TiposFuentesFinanciacionI } from "../../../tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface";
import { TiposMantenimientosInfraestructurasI } from "../tipos-mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras.interface";

//SE REEXPORTA PARA NO ROMPER LAS IMPORTACIONES QUE YA LA TOMABAN DE ESTE ARCHIVO:
export type { TiposMantenimientosInfraestructurasI };

//MISMOS CAMPOS Y NOMBRES EXACTOS QUE HistorialMantenimientoInfraestructuraDTO.java (UN REGISTRO POR MANTENIMIENTO REALIZADO A
//UNA INFRAESTRUCTURA):
export interface HistorialMantenimientosInfraestI {
    idHistorialMantenimientoInfraestructura?: number;
    numRegHistorialMantenimientoInfraestructura: String;
    asuntoMantenimientoInfraestructura: String;
    descripcionMantenimientoInfraestructura: String;
    fechaHMSMantenimientoInfraestructura: String;//EN EL BACKEND ES Date; VIAJA COMO TEXTO ISO.
    valorCostoMantenimientoInfraestructura: String;//EN LA TABLA ES VARCHAR2 (EJ. "85000").
    infraestructuraDTO: InfraestructurasI;
    tipoMantenimientoInfraestructuraDTO: TiposMantenimientosInfraestructurasI;
    tipoFuenteFinanciacionDTO: TiposFuentesFinanciacionI;
}

export interface HistorialMantenimientosInfraestMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. NÚMERO DE REGISTRO YA EXISTENTE); ESTA BANDERA LO INDICA.
}
