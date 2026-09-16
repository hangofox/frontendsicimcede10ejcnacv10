import { UnidadesMilitaresI } from '../unidades-militares.interface';

export interface CentrosCostosUnidadesMilitaresI {
  idCentroCostoUnidadMilitar?: number;
  centroCostoUnidadMilitar: String;
  unidadMilitarDTO: UnidadesMilitaresI;
}

export interface CentrosCostosUnidadesMilitaresMsj {
  mensaje: string;
}
