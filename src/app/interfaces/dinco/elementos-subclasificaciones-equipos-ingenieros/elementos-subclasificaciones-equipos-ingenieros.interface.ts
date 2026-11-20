import { ClasificacionesEquiposIngenierosI } from '../clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface';
import { SubclasificacionesEquiposIngenierosI } from '../clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface';
import { LineasEquiposIngenierosI } from '../lineas-equipos-ingenieros/lineas-equipos-ingenieros.interface';
import { CuentasEquiposIngenierosI } from '../cuentas-equipos-ingenieros/cuentas-equipos-ingenieros.interface';
import { ClasesActivosEquiposIngenierosI } from '../clases-activos-equipos-ingenieros/clases-activos-equipos-ingenieros.interface';

//CAMPOS DE ElementoSubclasificacionEquipoIngenieroDTO (BACKEND):
export interface ElementosSubclasificacionesEquiposIngenierosI {
  idElementoSubclasificacionEquipoIngeniero?: number;
  nombreElementoSubclasificacionEquipoIngeniero: String;
  clasificacionEquipoIngenieroDTO: ClasificacionesEquiposIngenierosI;
  subclasificacionEquipoIngenieroDTO: SubclasificacionesEquiposIngenierosI;
  lineaEquipoIngenieroDTO: LineasEquiposIngenierosI;
  cuentaEquipoIngenieroDTO: CuentasEquiposIngenierosI;
  claseActivoEquipoIngenieroDTO: ClasesActivosEquiposIngenierosI;
}

export interface ElementosSubclasificacionesEquiposIngenierosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
