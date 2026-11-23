import { EquiposIngenierosI } from '../equipos-ingenieros.interface';

//CAMPOS DE HistorialDemeritoYDesgasteEquipoIngenieroDTO (BACKEND; TABLA_HISTORIAL_DEMERITOS_Y_DESGASTES_EQUIPOS_INGENIEROS):
export interface HistorialDemerDesgastEquipIngI {
  idHistorialDemeritoYDesgasteEquipoIngeniero?: number;
  numRegHistorialDemeritoYDesgasteEquipoIngeniero: String;
  nombreProyectoHistorialDemeritoYDesgasteEquipoIngeniero: String;
  valorPresupuestalProyectoHistorialDemeritoYDesgasteEquipoIngeniero: String;//OPCIONAL.
  horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero: String;//OPCIONAL.
  kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero: String;//OPCIONAL.
  //NOMBRE DEL ARCHIVO DEL DOCUMENTO ANEXO (CLOB, OPCIONAL); EL ARCHIVO VA EN LA CARPETA DE LA RUTA DE DEMÉRITOS Y DESGASTES (PARÁMETROS
  //DEL SISTEMA) + LA CARPETA DE LA UNIDAD MILITAR DEL EQUIPO:
  nombreArchivoDocumentoAnexoHistDemerDesgastEquipIng?: String | null;
  equipoIngenieroDTO: EquiposIngenierosI;
}

export interface HistorialDemerDesgastEquipIngMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. N.° DE REGISTRO REPETIDO); ESTA BANDERA LO INDICA.
}
