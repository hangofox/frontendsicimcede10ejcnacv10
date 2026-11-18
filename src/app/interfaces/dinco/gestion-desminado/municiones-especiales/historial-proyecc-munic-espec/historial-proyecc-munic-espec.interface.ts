import { MunicionesEspecialesI } from '../municiones-especiales.interface';

//CAMPOS DE HistorialProyeccionMunicionEspecialDTO (BACKEND):
export interface HistorialProyeccMunicEspecI {
  idHistorialProyeccionMunicionEspecial?: number;
  numRegHistorialProyeccionMunicionEspecial: String;
  valorTotalHistorialProyeccionMunicionEspecial: String;
  numeroRubroPresupuestalHistProyMunEsp: String;
  nombreBienOServicioHistorialProyeccionMunicionEspecial: String;
  cantidadSolicitadaHistorialProyeccionMunicionEspecial: number;//Long EN EL BACKEND.
  municionEspecialDTO: MunicionesEspecialesI;
}

export interface HistorialProyeccMunicEspecMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. N.° DE REGISTRO REPETIDO); ESTA BANDERA LO INDICA.
}
