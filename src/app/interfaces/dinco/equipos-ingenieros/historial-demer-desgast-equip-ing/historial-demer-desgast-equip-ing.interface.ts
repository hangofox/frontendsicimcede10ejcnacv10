import { EquiposIngenierosI } from '../equipos-ingenieros.interface';

//CAMPOS DE HistorialDemeritoYDesgasteEquipoIngenieroDTO (BACKEND; TABLA_HISTORIAL_DEMERITOS_Y_DESGASTES_EQUIPOS_INGENIEROS):
export interface HistorialDemerDesgastEquipIngI {
  idHistorialDemeritoYDesgasteEquipoIngeniero?: number;
  numRegHistorialDemeritoYDesgasteEquipoIngeniero: String;
  nombreProyectoHistorialDemeritoYDesgasteEquipoIngeniero: String;
  valorPresupuestalProyectoHistorialDemeritoYDesgasteEquipoIngeniero: String;//OPCIONAL.
  horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero: String;//OPCIONAL.
  kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero: String;//OPCIONAL.
  equipoIngenieroDTO: EquiposIngenierosI;
}

export interface HistorialDemerDesgastEquipIngMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. N.° DE REGISTRO REPETIDO); ESTA BANDERA LO INDICA.
}
