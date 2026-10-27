import { ClasificacionesEquiposIngenierosI } from "../clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface";

export interface SubclasificacionesEquiposIngenierosI {
    idSubclasificacionEquipoIngeniero?: number;
    nombreSubclasificacionEquipoIngeniero: String;
    clasificacionEquipoIngenieroDTO: ClasificacionesEquiposIngenierosI;
}
