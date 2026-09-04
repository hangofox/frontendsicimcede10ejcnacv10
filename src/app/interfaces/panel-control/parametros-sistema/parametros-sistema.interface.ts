export interface ParametrosSistemaI {
    idParametrosSistema?: number;
    tiempoMinutosSesionInactivaSistema: number;
    tiempoMinutosValidezCodigoActivacionContrasena: number;
    rutaDestinoCarpetaPrincipalServidorAplicaciones: String;
    rutaDestinoCarpetaCargueTemporalArchivos: String;
    rutaDestinoArchivosUsuarios: String;
    rutaDestinoArchivosUnidadesMilitares: String;
    rutaDestinoArchivosHistorialIntegrantesDocumentos: String;
    rutaDestinoArchivosResponsables: String;
    rutaDestinoArchivosAltasEquiposIngenieros: String;
    rutaDestinoArchivosBajasEquiposIngenieros: String;
    authEnable: String;//EL BACKEND LO DECLARA COMO String (NO boolean) EN ParametrosSistemaDTO.
    startTTLSEnable: String;//EL BACKEND LO DECLARA COMO String (NO boolean) EN ParametrosSistemaDTO.
    smtpHost: String;//ESPECÍFICA LA DIRECCIÓN DEL SERVIDOR SMTP AL QUE SE CONECTARÁ PARA ENVIAR LOS CORREOS ELECTRÓNICOS.
    smtpPort: number;//ESPECÍFICA EL PUERTO DEL SERVIDOR SMTP AL QUE SE CONECTARÁ PARA ENVIAR LOS CORREOS ELECTRÓNICOS.
    smtpProtocols: String;//ESPECÍFICA LOS PROTOCOLOS SSL/TLS CON SU VERSIÓN QUE SE DEBEN DE USAR PARA ENVIAR LOS CORREOS ELECTRÓNICOS.
    correoElectronicoRemitente: String;//ESPECÍFICA EL CORREO ELECTRÓNICO DEL REMITENTE.
    usuarioRemitente: String;//ESPECÍFICA EL USUARIO REMITENTE (NICKNAME O CORREO ELECTRÓNICO DEL REMITENTE).
    passwordRemitente: String;//ESPECÍFICA EL PASSWORD REMITENTE.
    asuntoDestinatarioRecuperacionContrasena: String;//ESPECÍFICA EL ASUNTO DEL DESTINATARIO.
    cuerpoMensajeHtmlRecuperacionContrasena: String;//ESPECÍFICA EL CUERPO DEL MENSAJE HTML.
}

export interface ParametrosSistemaMsj {
  mensaje: string;
}
