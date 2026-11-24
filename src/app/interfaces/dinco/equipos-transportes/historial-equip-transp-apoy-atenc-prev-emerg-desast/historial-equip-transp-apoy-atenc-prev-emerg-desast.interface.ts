import { ApoyosAtencPrevEmergDesastI } from "../../../digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface";
import { ClasificacionesEquiposIngenierosI } from "../../clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface";
import { SubclasificacionesEquiposIngenierosI } from "../../clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface";
import { ElementosSubclasificacionesEquiposIngenierosI } from "../../elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface";
import { EquiposIngenierosI } from "../../equipos-ingenieros/equipos-ingenieros.interface";

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
