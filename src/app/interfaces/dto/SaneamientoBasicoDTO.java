//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 30/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class SaneamientoBasicoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idSaneamientoBasico;
    private String nombreCaudalSaneamientoBasico;
    private String nombreUnidadMedidaSaneamientoBasico;
    //private Long idOficina;
    private String centroCostoOficinaSaneamientoBasico;
    //private Long idInfraestructura;
    
    private OficinaDTO oficinaDTO;
    private InfraestructuraDTO infraestructuraDTO;
    
    public OficinaDTO getOficinaDTO() {
        return oficinaDTO;
    }
    public void setOficinaDTO(OficinaDTO oficinaDTO) {
        this.oficinaDTO = oficinaDTO;
    }
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
}
