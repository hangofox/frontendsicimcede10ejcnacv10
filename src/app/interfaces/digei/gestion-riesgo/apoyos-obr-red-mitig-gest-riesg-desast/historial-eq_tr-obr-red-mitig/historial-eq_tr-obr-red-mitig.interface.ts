import { ApoyosObrRedMitigGestRiesgDesastI } from "../apoyos-obr-red-mitig-gest-riesg-desast.interface";
import { ClasificacionesEquiposIngenierosI } from "../../../../dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface";
import { SubclasificacionesEquiposIngenierosI } from "../../../../dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface";
import { ElementosSubclasificacionesEquiposIngenierosI } from "../../../../dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface";
import { EquiposIngenierosI } from "../../../../dinco/equipos-ingenieros/equipos-ingenieros.interface";

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
