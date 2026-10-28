import { ApoyosAtencPrevEmergDesastI } from "../apoyos-atenc-prev-emerg-desast.interface";
import { MaquinariasPesadasI } from "../../maquinarias-pesadas/maquinarias-pesadas.interface";

export interface HistorialMaqPesadApoyAtencPrevEmergDesastI {
    idHistorialMaqPesadApoyAtencPrevEmergDesast?: number;
    numRegHistorialMaqPesadApoyAtencPrevEmergDesast: String;
    apoyoAtencPrevEmergDesastDTO: ApoyosAtencPrevEmergDesastI;
    maquinariaPesadaDTO: MaquinariasPesadasI;
    diasEmpleadosMaqPesadApoyAtencPrevEmergDesast: number;
}

export interface HistorialMaqPesadApoyAtencPrevEmergDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
