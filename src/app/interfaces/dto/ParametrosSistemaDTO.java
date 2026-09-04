//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 30/07/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class ParametrosSistemaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idParametrosSistema;
    private Long tiempoMinutosSesionInactivaSistema;
    private Long tiempoMinutosValidezCodigoActivacionContrasena;
    private String rutaDestinoCarpetaPrincipalServidorAplicaciones;
    private String rutaDestinoCarpetaCargueTemporalArchivos;
    private String rutaDestinoArchivosUsuarios;
    private String rutaDestinoArchivosUnidadesMilitares;
    private String rutaDestinoArchivosHistorialIntegrantesDocumentos;
    private String rutaDestinoArchivosResponsables;
    private String rutaDestinoArchivosAltasEquiposIngenieros;
    private String rutaDestinoArchivosBajasEquiposIngenieros;
    private String authEnable;
    private String startTTLSEnable;
    private String smtpHost;
    private Long smtpPort;
    private String smtpProtocols;
    private String usuarioRemitente;
    private String passwordRemitente;
    private String correoElectronicoRemitente;
    private String asuntoDestinatarioRecuperacionContrasena;
    private String cuerpoMensajeHtmlRecuperacionContrasena;
}
