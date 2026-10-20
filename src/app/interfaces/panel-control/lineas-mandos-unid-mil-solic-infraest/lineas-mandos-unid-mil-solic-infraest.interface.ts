import { UnidadesMilitaresI } from "../unidades-militares/unidades-militares.interface";

export interface LineasMandosUnidadesMilitaresSolicInfraestI {
    idLineaMandoUnidadMilitarSolicInfraest?: number;
    lineaMandoUnidadMilitarSolicInfraest: String;
    unidadMilitarDTO: UnidadesMilitaresI;
}

export interface LineasMandosUnidadesMilitaresSolicInfraestMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. UNIDAD MILITAR YA REGISTRADA); ESTA BANDERA LO INDICA.
}
