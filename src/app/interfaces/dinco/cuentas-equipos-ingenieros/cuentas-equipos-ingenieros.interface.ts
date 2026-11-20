//CAMPOS DE CuentaEquipoIngenieroDTO (BACKEND):
export interface CuentasEquiposIngenierosI {
  idCuentaEquipoIngeniero?: number;
  nombreCuentaEquipoIngeniero: String;
  numeroCuentaEquipoIngeniero: String;
}

export interface CuentasEquiposIngenierosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
