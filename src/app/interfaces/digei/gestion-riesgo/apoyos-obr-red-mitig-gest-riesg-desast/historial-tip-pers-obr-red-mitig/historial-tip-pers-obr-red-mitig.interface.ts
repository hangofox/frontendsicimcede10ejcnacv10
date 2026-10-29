import { ApoyosObrRedMitigGestRiesgDesastI } from "../apoyos-obr-red-mitig-gest-riesg-desast.interface";
import { TiposPersonalApoyosI } from "../../tipos-personal-apoyos/tipos-personal-apoyos.interface";

export interface HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI {
    idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast?: number;
    numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast: String;
    apoyoObrRedMitigGestRiesgDesastDTO: ApoyosObrRedMitigGestRiesgDesastI;
    tipoPersonalApoyoDTO: TiposPersonalApoyosI;
    cantidadPersonalApoyo: number;
    nombreEspecialidadTipoPersonalApoyObrRedMitigGestRiesgDesast: String;
}

export interface HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
