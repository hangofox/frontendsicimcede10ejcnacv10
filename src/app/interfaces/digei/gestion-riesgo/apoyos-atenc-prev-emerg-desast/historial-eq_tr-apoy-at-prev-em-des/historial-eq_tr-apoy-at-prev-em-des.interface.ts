import { ApoyosAtencPrevEmergDesastI } from "../apoyos-atenc-prev-emerg-desast.interface";
import { ClasificacionesEquiposIngenierosI } from "../../../../dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface";
import { SubclasificacionesEquiposIngenierosI } from "../../../../dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface";
import { ElementosSubclasificacionesEquiposIngenierosI } from "../../../../dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface";
import { EquiposIngenierosI } from "../../../../dinco/equipos-ingenieros/equipos-ingenieros.interface";

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
