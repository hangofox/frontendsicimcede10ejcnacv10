//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 15/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class InclusionSeguroInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idInclusionSeguroInfraestructura;
    private Date fechaHMSIniciacionInclusionSeguroInfraestructura;
    private Date fechaHMSFinalizacionInclusionSeguroInfraestructura;
    private String descripcionInclusionSeguroInfraestructura;
    //private Long idProyeccionSeguroInfraestructura;
    
    private ProyeccionSeguroInfraestructuraDTO proyeccionSeguroInfraestructuraDTO;
    
    public ProyeccionSeguroInfraestructuraDTO getProyeccionSeguroInfraestructuraDTO() {
        return proyeccionSeguroInfraestructuraDTO;
    }
    public void setProyeccionSeguroInfraestructuraDTO(ProyeccionSeguroInfraestructuraDTO proyeccionSeguroInfraestructuraDTO) {
        this.proyeccionSeguroInfraestructuraDTO = proyeccionSeguroInfraestructuraDTO;
    }
}
