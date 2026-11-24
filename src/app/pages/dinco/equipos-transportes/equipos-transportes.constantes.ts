import { EquiposIngenierosI } from '../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';

//LOS EQUIPOS DE TRANSPORTE SON LOS EQUIPOS DE INGENIEROS DE CLASIFICACIÓN "EQUIPO DE COMBATE" Y SUBCLASIFICACIÓN "EQUIPO DE TRANSPORTE"
//(NOMBRES TAL CUAL ESTÁN EN TABLA_CLASIFICACIONES_EQUIPOS_INGENIEROS Y TABLA_SUBCLASIFICACIONES_EQUIPOS_INGENIEROS). LOS HISTORIALES DE
//APOYOS Y LAS PROYECCIONES DE TÉCNICO-MECÁNICAS DE EQUIPOS DE TRANSPORTE SOLO ADMITEN ESOS EQUIPOS:
export const CLASIFICACION_EQUIPOS_TRANSPORTES = 'EQUIPO DE COMBATE';
export const SUBCLASIFICACION_EQUIPOS_TRANSPORTES = 'EQUIPO DE TRANSPORTE';

export function esEquipoTransporte(equipo: EquiposIngenierosI | null | undefined): boolean {
  return String(equipo?.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? '') === CLASIFICACION_EQUIPOS_TRANSPORTES
    && String(equipo?.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero ?? '') === SUBCLASIFICACION_EQUIPOS_TRANSPORTES;
}
