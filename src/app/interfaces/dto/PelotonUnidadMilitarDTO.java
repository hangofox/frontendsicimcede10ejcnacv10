//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 21/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
//Anotacion de lombok que me crea automaticamente los get, set constructor.
public class PelotonUnidadMilitarDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idPelotonUnidadMilitar;
    private String nombrePelotonUnidadMilitar;
    
    private CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO;
    
    public CompaniaUnidadMilitarDTO getCompaniaUnidadMilitarDTO() {
        return companiaUnidadMilitarDTO;
    }
    public void setCompaniaUnidadMilitarDTO(CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO) {
        this.companiaUnidadMilitarDTO = companiaUnidadMilitarDTO;
    }
}
