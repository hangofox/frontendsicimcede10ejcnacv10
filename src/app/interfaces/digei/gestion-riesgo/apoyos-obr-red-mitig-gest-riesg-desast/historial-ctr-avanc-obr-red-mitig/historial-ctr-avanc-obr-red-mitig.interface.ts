import { ApoyosObrRedMitigGestRiesgDesastI } from "../apoyos-obr-red-mitig-gest-riesg-desast.interface";

export interface HistorialControlAvancObrRedMitigGestRiesgDesastI {
    idHistorialControlAvancObrRedMitigGestRiesgDesast?: number;
    numRegHistorialControlAvancObrRedMitigGestRiesgDesast: String;
    apoyoObrRedMitigGestRiesgDesastDTO: ApoyosObrRedMitigGestRiesgDesastI;
    nombreHistorialControlAvancObrRedMitigGestRiesgDesast: String;
    //LOS TRES PORCENTAJES SON VARCHAR2 NULL EN ORACLE (EJ. "100"):
    numeroPorcentajeActProgAvancObrRedMitigGestRiesgDesast?: String | null;
    numeroPorcentajeActEjecAvancObrRedMitigGestRiesgDesast?: String | null;
    numeroPorcentajeActFaltAvancObrRedMitigGestRiesgDesast?: String | null;
    observacionesHistorialControlAvancObrRedMitigGestRiesgDesast?: String | null;
}

export interface HistorialControlAvancObrRedMitigGestRiesgDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
