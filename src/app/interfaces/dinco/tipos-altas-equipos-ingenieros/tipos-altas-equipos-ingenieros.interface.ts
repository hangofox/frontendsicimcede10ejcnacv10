//CAMPOS DE TipoAltaEquipoIngenieroDTO (BACKEND):
export interface TiposAltasEquiposIngenierosI {
  idTipoAltaEquipoIngeniero?: number;
  nombreTipoAltaEquipoIngeniero: String;
}

export interface TiposAltasEquiposIngenierosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
