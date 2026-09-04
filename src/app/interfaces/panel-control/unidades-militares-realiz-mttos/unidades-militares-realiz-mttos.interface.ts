import { UnidadesMilitaresI } from "../unidades-militares/unidades-militares.interface";

export interface UnidadesMilitaresRealizadorasMantenimientosI {
    idUnidadMilitarRealizadoraMantenimiento?: number;
    codigoUnidadMilitarRealizadoraMantenimiento: String;
    unidadMilitarDTO: UnidadesMilitaresI;
}

export interface UnidadesMilitaresRealizadorasMantenimientosMsj {
  mensaje: string;
}
