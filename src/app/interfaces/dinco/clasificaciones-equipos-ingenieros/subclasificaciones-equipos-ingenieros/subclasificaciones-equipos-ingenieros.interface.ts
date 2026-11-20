import { ClasificacionesEquiposIngenierosI } from '../../clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface';

//CAMPOS DE SubclasificacionEquipoIngenieroDTO (BACKEND):
export interface SubclasificacionesEquiposIngenierosI {
  idSubclasificacionEquipoIngeniero?: number;
  nombreSubclasificacionEquipoIngeniero: String;
  clasificacionEquipoIngenieroDTO: ClasificacionesEquiposIngenierosI;
}

export interface SubclasificacionesEquiposIngenierosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
