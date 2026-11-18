import { UnidadesMilitaresI } from '../unidades-militares/unidades-militares.interface';

//CAMPOS DE CompaniaUnidadMilitarDTO (BACKEND):
export interface CompaniasUnidadesMilitaresI {
  idCompaniaUnidadMilitar?: number;
  nombreCompaniaUnidadMilitar: String;
  unidadMilitarDTO: UnidadesMilitaresI;
}

export interface CompaniasUnidadesMilitaresMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
