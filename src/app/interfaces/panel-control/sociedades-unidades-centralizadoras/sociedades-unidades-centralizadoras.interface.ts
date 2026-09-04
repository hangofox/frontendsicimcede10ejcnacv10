import { UnidadesMilitaresI } from "../unidades-militares/unidades-militares.interface";

export interface SociedadesUnidadesCentralizadorasI {
    idSociedadUnidadCentralizadora?: number;
    unidadMilitarDTO: UnidadesMilitaresI;
    codigoSociedadUnidadCentralizadora: String;
}

export interface SociedadesUnidadesCentralizadorasMsj {
  mensaje: string;
}
