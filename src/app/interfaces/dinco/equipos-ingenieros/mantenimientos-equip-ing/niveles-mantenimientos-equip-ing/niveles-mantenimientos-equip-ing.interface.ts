//MISMOS CAMPOS Y NOMBRES EXACTOS QUE NivelMantenimientoEquipoIngenieroDTO.java (EJ. MANTENIMIENTO DE I, II O III NIVEL):
export interface NivelesMantenimientosEquipIngI {
  idNivelMantenimientoEquipoIngeniero?: number;
  nombreNivelMantenimientoEquipoIngeniero: String;
}

export interface NivelesMantenimientosEquipIngMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. NOMBRE YA EXISTENTE); ESTA BANDERA LO INDICA.
}
