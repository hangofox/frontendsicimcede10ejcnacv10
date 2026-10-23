import { UnidadesMilitaresI } from "../unidades-militares/unidades-militares.interface";

export interface LineasMandosUnidadesMilitaresI {
    idLineaMandoUnidadMilitar?: number;
    lineaMandoUnidadMilitar: String;
    unidadMilitarDTO: UnidadesMilitaresI;
}

export interface LineasMandosUnidadesMilitaresMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. EL ID DEL REGISTRO NO EXISTE); ESTA BANDERA LO INDICA.
}
