//CAMPOS DE ClaseActivoEquipoIngenieroDTO (BACKEND):
export interface ClasesActivosEquiposIngenierosI {
  idClaseActivoEquipoIngeniero?: number;
  nombreClaseActivoEquipoIngeniero: String;
  numeroClaseActivoEquipoIngeniero: String;
}

export interface ClasesActivosEquiposIngenierosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
