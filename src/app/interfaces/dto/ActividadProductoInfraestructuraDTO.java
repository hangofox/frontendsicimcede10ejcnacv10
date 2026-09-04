//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 25/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
//Anotacion de lombok que me crea automaticamente los get, set constructor.
public class ActividadProductoInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idActividadProductoInfraestructura;
    private String nombreActividadProductoInfraestructura;
    //private Long idCapituloInfraestructura;
    private String siglaOAcronimoUnidadMedidaActividadProductoInfraestructura;
    
    private CapituloInfraestructuraDTO capituloInfraestructuraDTO;
    
    public CapituloInfraestructuraDTO getCapituloInfraestructuraDTO() {
        return capituloInfraestructuraDTO;
    }
    public void setCapituloInfraestructuraDTO(CapituloInfraestructuraDTO capituloInfraestructuraDTO) {
        this.capituloInfraestructuraDTO = capituloInfraestructuraDTO;
    }
}
