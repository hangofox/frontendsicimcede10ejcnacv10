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
public class DocumentacionAnexaContratInfraestArrendDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idDocumentacionAnexaContratInfraestArrend;
    //private Long idProyeccionPlanAnualArrendamiento;
    private String nombreDocumentoAnexoContratInfraestArrend;
    private String valorAlquilerContratInfraestArrend;
    private String nombreUnidadMedidaAlquilerContratInfraestArrend;
    private String nombreArchivoDocumentoAnexoContratInfraestArrend;
    
    private ProyeccionPlanAnualArrendamientoDTO proyeccionPlanAnualArrendamientoDTO;
    
    public ProyeccionPlanAnualArrendamientoDTO getProyeccionPlanAnualArrendamientoDTO() {
        return proyeccionPlanAnualArrendamientoDTO;
    }
    public void setProyeccionPlanAnualArrendamientoDTO(ProyeccionPlanAnualArrendamientoDTO proyeccionPlanAnualArrendamientoDTO) {
        this.proyeccionPlanAnualArrendamientoDTO = proyeccionPlanAnualArrendamientoDTO;
    }
}
