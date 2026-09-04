//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 25/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS RESPONSE DE LOS DTO.
public class CentroCostoCompaniaUnidadMilitarDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idCentroCostoCompaniaUnidadMilitar;
    private String centroCostoCompaniaUnidadMilitar;
    
    private CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DEL DTO RELACIONAL:
    public CompaniaUnidadMilitarDTO getCompaniaUnidadMilitarDTO() {
        return companiaUnidadMilitarDTO;
    }
    public void setCompaniaUnidadMilitarDTO(CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO) {
        this.companiaUnidadMilitarDTO = companiaUnidadMilitarDTO;
    }
}
