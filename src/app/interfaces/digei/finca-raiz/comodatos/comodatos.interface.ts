import { TerrenosI } from '../terrenos/terrenos.interface';
import { HistorialProveedoresProductosServiciosI } from '../../../panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';

export interface ComodatosI {
  idComodatoTerreno?: number;
  fechaHMSIniciacionComodatoTerreno: string;
  fechaHMSFinalizacionComodatoTerreno: string;
  estadoTerreno: string;
  terrenoDTO: TerrenosI;
  historialProveedorProductoOServicioDTO: HistorialProveedoresProductosServiciosI;
}

export interface ComodatosMsj { mensaje: string; }
