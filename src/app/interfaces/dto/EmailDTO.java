//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
//import javax.persistence.Lob;
//import java.io.Serializable;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/08/2023.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
//Anotacion de lombok que me crea automaticamente los get, set constructor.
public class EmailDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS PARÁMETROS DEL CORREO ELECTRÓNICO PARA LOS DTO:
    //DATOS DEL REMITENTE:
    private boolean authEnable;//PERMITE SI O NO ACTIVAR EN VERDADERO O FALSO (TRUE OR FALSE) LA AUTENTICACIÓN SMTP CON USUARIO Y PASSWORD.
    private boolean startTTLSEnable;//PERMITE SI O NO ACTIVAR EN VERDADERO O FALSO (TRUE OR FALSE) EL CIFRADO DE LA CONEXIÓN.
    private String smtpHost;//ESPECÍFICA LA DIRECCIÓN DEL SERVIDOR SMTP AL QUE SE CONECTARÁ PARA ENVIAR LOS CORREOS ELECTRÓNICOS.
    private int smtpPort;//ESPECÍFICA EL PUERTO DEL SERVIDOR SMTP AL QUE SE CONECTARÁ PARA ENVIAR LOS CORREOS ELECTRÓNICOS.
    private String smtpProtocols;//ESPECÍFICA LOS PROTOCOLOS SSL/TLS CON SU VERSIÓN QUE SE DEBEN DE USAR PARA ENVIAR LOS CORREOS ELECTRÓNICOS.
    private String usuarioRemitente;//ESPECÍFICA EL USUARIO REMITENTE (NICKNAME O CORREO ELECTRÓNICO DEL REMITENTE).
    private String passwordRemitente;//ESPECÍFICA EL PASSWORD REMITENTE.
    private String correoElectronicoRemitente;//ESPECÍFICA EL CORREO ELECTRÓNICO DEL REMITENTE.
    
    //DATOS DEL DESTINATARIO:
    private String correoElectronicoDestinatario;//ESPECÍFICA EL CORREO ELECTRÓNICO DEL DESTINATARIO.
    private String asuntoDestinatario;//ESPECÍFICA EL ASUNTO DEL DESTINATARIO.
    private String cuerpoMensajeHtml;//ESPECÍFICA EL CUERPO DEL MENSAJE HTML.
}