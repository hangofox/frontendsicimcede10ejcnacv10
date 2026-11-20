//CAMPOS DE LineaEquipoIngenieroDTO (BACKEND):
export interface LineasEquiposIngenierosI {
  idLineaEquipoIngeniero?: number;
  nombreLineaEquipoIngeniero: String;
}

export interface LineasEquiposIngenierosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
