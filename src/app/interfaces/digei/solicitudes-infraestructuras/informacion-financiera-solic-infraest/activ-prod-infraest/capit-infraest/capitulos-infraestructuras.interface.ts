//MISMOS CAMPOS Y NOMBRES EXACTOS QUE CapituloInfraestructuraDTO.java, EN EL ORDEN DE LA TABLA TABLA_CAPITULOS_INFRAESTRUCTURAS:
export interface CapitulosInfraestructurasI {
    idCapituloInfraestructura?: number;
    nombreCapituloInfraestructura: String;
}

export interface CapitulosInfraestructurasMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. NOMBRE YA EXISTENTE); ESTA BANDERA LO INDICA.
}
