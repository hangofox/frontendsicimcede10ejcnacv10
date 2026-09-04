//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 13/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA EL DTO.
public class HistorialProyeccionAnualAseoLimpInfraestDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialProyeccionAnualAseoLimpInfraest;
    private String numRegHistorialProyeccionAnualAseoLimpInfraest;
    //private Long idInfraestructura;
    private String valorContratoHistorialProyeccionAnualAseoLimpInfraest;
    private String numeroPersonalHumanoHistProyAnAseoLimpInfraest;
    private String nombreArchivoDocumentoAnexoContratHistProyAnAseoLimpInfraest;
    private String nombreArchivoDocumentoAnexoCotizHistProyAnAseoLimpInfraest;
    
    private InfraestructuraDTO infraestructuraDTO;
    
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
}
