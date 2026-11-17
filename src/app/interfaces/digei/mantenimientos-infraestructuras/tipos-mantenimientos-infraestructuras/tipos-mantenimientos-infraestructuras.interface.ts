//MISMOS CAMPOS Y NOMBRES EXACTOS QUE TipoMantenimientoInfraestructuraDTO.java:
export interface TiposMantenimientosInfraestructurasI {
    idTipoMantenimientoInfraestructura?: number;
    nombreTipoMantenimientoInfraestructura: String;
}

export interface TiposMantenimientosInfraestructurasMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. NOMBRE YA EXISTENTE); ESTA BANDERA LO INDICA.
}
