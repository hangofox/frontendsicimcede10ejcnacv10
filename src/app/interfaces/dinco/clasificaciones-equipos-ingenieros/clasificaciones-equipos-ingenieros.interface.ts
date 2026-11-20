//CAMPOS DE ClasificacionEquipoIngenieroDTO (BACKEND):
export interface ClasificacionesEquiposIngenierosI {
  idClasificacionEquipoIngeniero?: number;
  nombreClasificacionEquipoIngeniero: String;
}

export interface ClasificacionesEquiposIngenierosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
