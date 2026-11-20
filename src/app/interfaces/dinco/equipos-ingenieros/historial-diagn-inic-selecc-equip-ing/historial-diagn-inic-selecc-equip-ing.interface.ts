import { UnidadesMilitaresI } from '../../../panel-control/unidades-militares/unidades-militares.interface';
import { EquiposIngenierosI } from '../equipos-ingenieros.interface';
import { EstadosDiagnosticosEquiposIngenierosI } from '../../estados-diagnosticos-equipos-ingenieros/estados-diagnosticos-equipos-ingenieros.interface';

//CAMPOS DE HistorialDiagnosticoInicialSeleccMttoEquipIngDTO (BACKEND; TABLA_HISTORIAL_DIAGNOSTICOS_INICIALES_SELECC_MTTOS_EQUIP_ING):
export interface HistorialDiagnInicSeleccEquipIngI {
  idHistorialDiagnosticoInicialSeleccMttoEquipIng?: number;
  numRegHistorialDiagnosticoInicialSeleccMttoEquipIng: String;
  nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng: String;//CLOB, OPCIONAL.
  descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng: String;//CLOB, OPCIONAL.
  unidadMilitarDTO: UnidadesMilitaresI;
  unidadMilitarRealizadoraMantenimientoDTO: UnidadesMilitaresI;
  equipoIngenieroDTO: EquiposIngenierosI;
  estadoDiagnosticoEquipoIngenieroDTO: EstadosDiagnosticosEquiposIngenierosI;
}

export interface HistorialDiagnInicSeleccEquipIngMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. N.° DE REGISTRO REPETIDO); ESTA BANDERA LO INDICA.
}
