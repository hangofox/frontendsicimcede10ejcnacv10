import { OficinasI } from '../oficinas.interface';

export interface CentrosCostosOficinasI {
  idCentroCostoOficina?: number;
  centroCostoOficina: String;
  oficinaDTO: OficinasI;
}

export interface CentrosCostosOficinasMsj {
  mensaje: string;
}
