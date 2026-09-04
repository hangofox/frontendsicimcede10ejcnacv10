export interface SiathEmpleadosI {
    idSthEmpleado?: number;
    codigoFuerzaSthUnidadMilitar: number;
    siglaoAcronimoSthUnidadMilitar: String;
    nombreTipoDocIdentifSthEmpleado: String;
    numDocIdentifSthEmpleado: String;
    lugarExpedicionDocIdentifSthEmpleado: String;
    gradoSthEmpleado: String;
    nombresSthEmpleado: String;
    apellidosSthEmpleado: String;
    armaSthEmpleado: String;
    fechaHMSNacimientoSthEmpleado: String;
    sexoSthEmpleado: String;
    direccionSthEmpleado: String;
    telefonoSthEmpleado: number;
    movilSthEmpleado: number;
    correoElectronicoPersonalSthEmpleado: String;
    correoElectronicoInstitucionalSthEmpleado: String;
    codigoDaneOrigenSthEmpleado: String;
    numeroCursoSthEmpleado: number;
    escalafonAntiguedadSthEmpleado: number;
    fechaHMSIncorporacionFFMMSthEmpleado: String;
    estadoSthEmpleado: String;
}

export interface SiathEmpleadosMsj {
    mensaje: string;
}