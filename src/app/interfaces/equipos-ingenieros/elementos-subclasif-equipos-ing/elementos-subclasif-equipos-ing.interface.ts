import { ClasificacionesEquiposIngenierosI } from "../clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface";
import { SubclasificacionesEquiposIngenierosI } from "../subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface";
import { LineasEquiposIngenierosI } from "../lineas-equipos-ingenieros/lineas-equipos-ingenieros.interface";
import { CuentasEquiposIngenierosI } from "../cuentas-equipos-ingenieros/cuentas-equipos-ingenieros.interface";
import { ClasesActivosEquiposIngenierosI } from "../clases-activos-equipos-ingenieros/clases-activos-equipos-ingenieros.interface";

export interface ElementosSubclasificacionesEquiposIngenierosI {
    idElementoSubclasificacionEquipoIngeniero?: number;
    nombreElementoSubclasificacionEquipoIngeniero: String;
    clasificacionEquipoIngenieroDTO: ClasificacionesEquiposIngenierosI;
    subclasificacionEquipoIngenieroDTO: SubclasificacionesEquiposIngenierosI;
    lineaEquipoIngenieroDTO: LineasEquiposIngenierosI;
    cuentaEquipoIngenieroDTO: CuentasEquiposIngenierosI;
    claseActivoEquipoIngenieroDTO: ClasesActivosEquiposIngenierosI;
}
