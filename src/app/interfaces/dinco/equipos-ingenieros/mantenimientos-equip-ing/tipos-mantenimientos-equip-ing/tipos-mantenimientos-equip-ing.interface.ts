//MISMOS CAMPOS Y NOMBRES EXACTOS QUE TipoMantenimientoEquipoIngenieroDTO.java (EJ. MANTENIMIENTO PREVENTIVO, CORRECTIVO...):
export interface TiposMantenimientosEquipIngI {
  idTipoMantenimientoEquipoIngeniero?: number;
  nombreTipoMantenimientoEquipoIngeniero: String;
}

export interface TiposMantenimientosEquipIngMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. NOMBRE YA EXISTENTE); ESTA BANDERA LO INDICA.
}
