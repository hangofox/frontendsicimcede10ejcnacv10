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
public class ProyeccionPlanAnualAdqCdoIngDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idProyeccionPlanAnualAdqCdoIng;
    //private Long idProyeccionPlanAnualAdqGeneral;
    private String nombreProyeccionPlanAnualAdqCdoIng;
    //private Long idDestinacionMantenimientoCdoIng;
    private String valorSolicitadoProyeccionPlanAnualAdqCdoIng;
    //private Long idInfraestructura;
    
    private ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO;
    private DestinacionMantenimientoCdoIngDTO destinacionMantenimientoCdoIngDTO;
    private InfraestructuraDTO infraestructuraDTO;
    
    public ProyeccionPlanAnualAdqGeneralDTO getProyeccionPlanAnualAdqGeneralDTO() {
        return proyeccionPlanAnualAdqGeneralDTO;
    }
    public void setProyeccionPlanAnualAdqGeneralDTO(ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO) {
        this.proyeccionPlanAnualAdqGeneralDTO = proyeccionPlanAnualAdqGeneralDTO;
    }
    public DestinacionMantenimientoCdoIngDTO getDestinacionMantenimientoCdoIngDTO() {
        return destinacionMantenimientoCdoIngDTO;
    }
    public void setDestinacionMantenimientoCdoIngDTO(DestinacionMantenimientoCdoIngDTO destinacionMantenimientoCdoIngDTO) {
        this.destinacionMantenimientoCdoIngDTO = destinacionMantenimientoCdoIngDTO;
    }
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
}
