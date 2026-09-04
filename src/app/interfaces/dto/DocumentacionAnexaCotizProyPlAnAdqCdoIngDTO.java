//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 08/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class DocumentacionAnexaCotizProyPlAnAdqCdoIngDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idDocumentacionAnexaCotizProyPlAnAdqCdoIng;
    //private Long idProyeccionPlanAnualAdqCdoIng;
    private String nombreDocumentoAnexoCotizProyPlAnAdqCdoIng;
    private String nombreArchivoDocumentoAnexoCotizProyPlAnAdqCdoIng;
    
    private ProyeccionPlanAnualAdqCdoIngDTO proyeccionPlanAnualAdqCdoIngDTO;
    
    public ProyeccionPlanAnualAdqCdoIngDTO getProyeccionPlanAnualAdqCdoIngDTO() {
        return proyeccionPlanAnualAdqCdoIngDTO;
    }
    public void setProyeccionPlanAnualAdqCdoIngDTO(ProyeccionPlanAnualAdqCdoIngDTO proyeccionPlanAnualAdqCdoIngDTO) {
        this.proyeccionPlanAnualAdqCdoIngDTO = proyeccionPlanAnualAdqCdoIngDTO;
    }
}
