//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/08/2023.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
//Anotacion de lombok que me crea automaticamente los get, set constructor.
public class UnidadMilitarDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idUnidadMilitar;
    private String codigoUnidadMilitar;
    private String nombreUnidadMilitar;
    private String siglaoAcronimoUnidadMilitar;
    private String nombreArchivoFotoLogExtoFmtUnidadMilitar;
    private String nombreCarpetaAlmacenamientoUnidadMilitar;
    private String nivelUnidadMilitar;
}
