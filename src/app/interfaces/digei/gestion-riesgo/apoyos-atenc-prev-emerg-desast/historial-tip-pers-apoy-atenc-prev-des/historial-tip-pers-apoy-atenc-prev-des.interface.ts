import { ApoyosAtencPrevEmergDesastI } from "../apoyos-atenc-prev-emerg-desast.interface";
import { TiposPersonalApoyosI } from "../../tipos-personal-apoyos/tipos-personal-apoyos.interface";

export interface HistorialTipoPersonalApoyAtencPrevEmergDesastI {
    idHistorialTipoPersonalApoyAtencPrevEmergDesast?: number;
    numRegHistorialTipoPersonalApoyAtencPrevEmergDesast: String;
    apoyoAtencPrevEmergDesastDTO: ApoyosAtencPrevEmergDesastI;
    tipoPersonalApoyoDTO: TiposPersonalApoyosI;
    cantidadPersonalApoyo: number;
    diasEmpleadosTipoPersonalApoyAtencPrevEmergDesast: number;
}

export interface HistorialTipoPersonalApoyAtencPrevEmergDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
