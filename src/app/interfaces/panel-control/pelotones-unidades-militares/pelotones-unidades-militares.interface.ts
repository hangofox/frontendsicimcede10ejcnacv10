import { CompaniasUnidadesMilitaresI } from '../companias-unidades-militares/companias-unidades-militares.interface';

//CAMPOS DE PelotonUnidadMilitarDTO (BACKEND):
export interface PelotonesUnidadesMilitaresI {
  idPelotonUnidadMilitar?: number;
  nombrePelotonUnidadMilitar: String;
  companiaUnidadMilitarDTO: CompaniasUnidadesMilitaresI;
}

export interface PelotonesUnidadesMilitaresMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
