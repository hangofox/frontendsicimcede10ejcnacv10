import { ApoyosAtencPrevEmergDesastI } from "../apoyos-atenc-prev-emerg-desast.interface";
import { ClasificacionesEquiposIngenierosI } from "../../../../equipos-ingenieros/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface";
import { SubclasificacionesEquiposIngenierosI } from "../../../../equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface";
import { ElementosSubclasificacionesEquiposIngenierosI } from "../../../../equipos-ingenieros/elementos-subclasif-equipos-ing/elementos-subclasif-equipos-ing.interface";
import { EquiposIngenierosI } from "../../../../equipos-ingenieros/equipos-ingenieros.interface";

export interface HistorialEquipTranspApoyAtencPrevEmergDesastI {
    idHistorialEquipTranspApoyAtencPrevEmergDesast?: number;
    numRegHistorialEquipTranspApoyAtencPrevEmergDesast: String;
    apoyoAtencPrevEmergDesastDTO: ApoyosAtencPrevEmergDesastI;
    clasificacionEquipoIngenieroDTO: ClasificacionesEquiposIngenierosI;
    subclasificacionEquipoIngenieroDTO: SubclasificacionesEquiposIngenierosI;
    elementoSubclasificacionEquipoIngenieroDTO: ElementosSubclasificacionesEquiposIngenierosI;
    equipoIngenieroDTO: EquiposIngenierosI;
    numeroPlacaEquipoTransporte: String;
    diasEmpleadosEquipoTransporte: number;
}

export interface HistorialEquipTranspApoyAtencPrevEmergDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
