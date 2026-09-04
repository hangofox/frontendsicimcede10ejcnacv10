import { UnidadesMilitaresI } from "../unidades-militares/unidades-militares.interface";

export interface OficinasI {
    idOficina?: number;
    unidadMilitarDTO: UnidadesMilitaresI;
    nombreOficina: String;
    centroCostoOficina: String;
}

export interface OficinasMsj {
  mensaje: string;
}
