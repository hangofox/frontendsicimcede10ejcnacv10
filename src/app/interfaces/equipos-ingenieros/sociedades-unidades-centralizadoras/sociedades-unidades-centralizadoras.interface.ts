import { UnidadesMilitaresI } from "../../panel-control/unidades-militares/unidades-militares.interface";

export interface SociedadesUnidadesCentralizadorasI {
    idSociedadUnidadCentralizadora?: number;
    codigoSociedadUnidadCentralizadora: String;
    unidadMilitarDTO: UnidadesMilitaresI;
}
