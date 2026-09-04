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
public class TokenCodigoActivacionRecuperacionContrasenaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS TOKEN DE LOS CÓDIGOS DE ACTIVACIÓN DE RECUPERACIÓN DE CONTRASEÑA DE ACCESO PARA LOS DTO:
    private String tokenCodigoActivacionRecuperacionContrasena;
    private Long tiempoMinutosValidez;
}