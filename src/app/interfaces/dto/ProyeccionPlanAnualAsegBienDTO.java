//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 13/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class ProyeccionPlanAnualAsegBienDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idProyeccionPlanAnualAsegBien;
    private String nombreProyeccionPlanAnualAsegBien;
    //private Long idProyeccionPlanAnualAdqGeneral;
    
    private ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO;
    
    public ProyeccionPlanAnualAdqGeneralDTO getProyeccionPlanAnualAdqGeneralDTO() {
        return proyeccionPlanAnualAdqGeneralDTO;
    }
    public void setProyeccionPlanAnualAdqGeneralDTO(ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO) {
        this.proyeccionPlanAnualAdqGeneralDTO = proyeccionPlanAnualAdqGeneralDTO;
    }
}
