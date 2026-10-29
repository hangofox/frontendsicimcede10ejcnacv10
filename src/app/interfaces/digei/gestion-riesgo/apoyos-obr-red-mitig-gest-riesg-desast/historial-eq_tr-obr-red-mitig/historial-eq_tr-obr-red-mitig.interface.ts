import { ApoyosObrRedMitigGestRiesgDesastI } from "../apoyos-obr-red-mitig-gest-riesg-desast.interface";
import { ClasificacionesEquiposIngenierosI } from "../../../../equipos-ingenieros/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface";
import { SubclasificacionesEquiposIngenierosI } from "../../../../equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface";
import { ElementosSubclasificacionesEquiposIngenierosI } from "../../../../equipos-ingenieros/elementos-subclasif-equipos-ing/elementos-subclasif-equipos-ing.interface";
import { EquiposIngenierosI } from "../../../../equipos-ingenieros/equipos-ingenieros.interface";

export interface HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI {
    idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast?: number;
    numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast: String;
    apoyoObrRedMitigGestRiesgDesastDTO: ApoyosObrRedMitigGestRiesgDesastI;
    clasificacionEquipoIngenieroDTO: ClasificacionesEquiposIngenierosI;
    subclasificacionEquipoIngenieroDTO: SubclasificacionesEquiposIngenierosI;
    elementoSubclasificacionEquipoIngenieroDTO: ElementosSubclasificacionesEquiposIngenierosI;
    equipoIngenieroDTO: EquiposIngenierosI;
    numeroPlacaEquipoTransporte: String;
    totalHorasEmpleadasEquipTranspApoyObrRedMitigGestRiesgDesast: number;
}

export interface HistorialEquipTranspApoyObrRedMitigGestRiesgDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
