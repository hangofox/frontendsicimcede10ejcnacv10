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
public class ProyeccionPlanAnualEquipSubsDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idProyeccionPlanAnualEquipSubs;
    //private Long idProyeccionPlanAnualAdqGeneral;
    private String nombreProyeccionPlanAnualEquipSubs;
    //private Long idEquipoIngeniero;
    private String nombreYNumeroRubroProyeccionPlanAnualEquipSubs;
    private String valorSolicitadoProyeccionPlanAnualEquipSubs;
    private String nombreBienOServicioProyeccionPlanAnualEquipSubs;
    private String nombreArchivoDocumentoAnexoProyPlAnNecEquipSubs;
    
    private ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO;
    private EquipoIngenieroDTO equipoIngenieroDTO;
    
    public ProyeccionPlanAnualAdqGeneralDTO getProyeccionPlanAnualAdqGeneralDTO() {
        return proyeccionPlanAnualAdqGeneralDTO;
    }
    public void setProyeccionPlanAnualAdqGeneralDTO(ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO) {
        this.proyeccionPlanAnualAdqGeneralDTO = proyeccionPlanAnualAdqGeneralDTO;
    }
    public EquipoIngenieroDTO getEquipoIngenieroDTO() {
        return equipoIngenieroDTO;
    }
    public void setEquipoIngenieroDTO(EquipoIngenieroDTO equipoIngenieroDTO) {
        this.equipoIngenieroDTO = equipoIngenieroDTO;
    }
}
