import { EquiposIngenierosI } from '../../equipos-ingenieros.interface';
import { NivelesMantenimientosEquipIngI } from '../niveles-mantenimientos-equip-ing/niveles-mantenimientos-equip-ing.interface';
import { TiposMantenimientosEquipIngI } from '../tipos-mantenimientos-equip-ing/tipos-mantenimientos-equip-ing.interface';
import { TiposFuentesFinanciacionI } from '../../../../tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface';

//MISMOS CAMPOS Y NOMBRES EXACTOS QUE HistorialMantenimientoEquipoIngenieroDTO.java (TABLA_HISTORIAL_MANTENIMIENTOS_EQUIPOS_INGENIEROS;
//UN REGISTRO POR MANTENIMIENTO REALIZADO A UN EQUIPO DE INGENIEROS):
export interface HistorialMantenimientosEquipIngI {
  idHistorialMantenimientoEquipoIngeniero?: number;
  numRegHistorialMantenimientoEquipoIngeniero: String;//LO GENERA EL BACKEND AL CREAR (HIST-MTTO-EQUIP-ING-{ID}-{FECHA}).
  asuntoMantenimientoEquipoIngeniero: String;//CLOB NOT NULL.
  descripcionMantenimientoEquipoIngeniero: String;//CLOB NOT NULL.
  fechaHMSMantenimientoEquipoIngeniero: String;//EN EL BACKEND ES Date; VIAJA COMO TEXTO ISO.
  valorCostoMantenimientoEquipoIngeniero: String;//EN LA TABLA ES VARCHAR2 NULL (EJ. "4500000.00").
  nombreDocumentoAnexoContratoMttoEquipIng: String;//VARCHAR2(250) NOT NULL.
  nombreArchivoDocumentoAnexoContratoMttoEquipIng: String;//CLOB NULL.
  equipoIngenieroDTO: EquiposIngenierosI;
  nivelMantenimientoEquipoIngenieroDTO: NivelesMantenimientosEquipIngI;
  tipoMantenimientoEquipoIngenieroDTO: TiposMantenimientosEquipIngI;
  tipoFuenteFinanciacionDTO: TiposFuentesFinanciacionI;
}

export interface HistorialMantenimientosEquipIngMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
