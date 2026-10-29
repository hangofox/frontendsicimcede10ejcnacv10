import { ApoyosObrRedMitigGestRiesgDesastI } from "../apoyos-obr-red-mitig-gest-riesg-desast.interface";
import { MaquinariasPesadasI } from "../../maquinarias-pesadas/maquinarias-pesadas.interface";

export interface HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI {
    idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast?: number;
    numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast: String;
    apoyoObrRedMitigGestRiesgDesastDTO: ApoyosObrRedMitigGestRiesgDesastI;
    maquinariaPesadaDTO: MaquinariasPesadasI;
    totalHorasEmpleadasMaqPesadApoyObrRedMitigGestRiesgDesast: number;
}

export interface HistorialMaqPesadApoyObrRedMitigGestRiesgDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
