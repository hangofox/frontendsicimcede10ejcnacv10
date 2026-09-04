//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 14/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class ProyeccionSeguroInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idProyeccionSeguroInfraestructura;
    private String valorSolicitadoProySegInfraest;
    private String valorSolicitadoTodoRiesgoProySegInfraest;
    private String valorSolicitadoRenegociacionProySegInfraest;
    //private Long idInfraestructura;
    
    private InfraestructuraDTO infraestructuraDTO;
    
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
}
