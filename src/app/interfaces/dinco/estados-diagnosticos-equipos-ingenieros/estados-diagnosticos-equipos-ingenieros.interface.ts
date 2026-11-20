//CAMPOS DE EstadoDiagnosticoEquipoIngenieroDTO (BACKEND):
export interface EstadosDiagnosticosEquiposIngenierosI {
  idEstadoDiagnosticoEquipoIngeniero?: number;
  nombreEstadoDiagnosticoEquipoIngeniero: String;
}

export interface EstadosDiagnosticosEquiposIngenierosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
