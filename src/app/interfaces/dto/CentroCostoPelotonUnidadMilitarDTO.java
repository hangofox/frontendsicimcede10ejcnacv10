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
public class CentroCostoPelotonUnidadMilitarDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idCentroCostoPelotonUnidadMilitar;
    private String centroCostoPelotonUnidadMilitar;
    private PelotonUnidadMilitarDTO pelotonUnidadMilitarDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DEL DTO RELACIONAL:
    public PelotonUnidadMilitarDTO getPelotonUnidadMilitarDTO() {
        return pelotonUnidadMilitarDTO;
    }
    public void setPelotonUnidadMilitarDTO(PelotonUnidadMilitarDTO pelotonUnidadMilitarDTO) {
        this.pelotonUnidadMilitarDTO = pelotonUnidadMilitarDTO;
    }
}
