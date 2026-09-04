//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class IntegrantesApoyosAtencPrevEmergDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idIntegrantesApoyosAtencPrevEmergDesast;
    //private Long idApoyoAtencPrevEmergDesast;
    private String gradoJefeGestionRiesgoUnidadMilitar;
    private String nombresJefeGestionRiesgoUnidadMilitar;
    private String primerApellidoJefeGestionRiesgoUnidadMilitar;
    private String segundoApellidoJefeGestionRiesgoUnidadMilitar;
    private String nombreArchivoFotoFirmaJefeGestionRiesgoUnidadMilitar;
    private String cargoJefeGestionRiesgoUnidadMilitar;
    private String gradoJefeOperacionesUnidadMilitar;
    private String nombresJefeOperacionesUnidadMilitar;
    private String primerApellidoJefeOperacionesUnidadMilitar;
    private String segundoApellidoJefeOperacionesUnidadMilitar;
    private String nombreArchivoFotoFirmaJefeOperacionesUnidadMilitar;
    private String cargoJefeOperacionesUnidadMilitar;
    private String gradoCteUnidadMilitar;
    private String nombresCteUnidadMilitar;
    private String primerApellidoCteUnidadMilitar;
    private String segundoApellidoCteUnidadMilitar;
    private String nombreArchivoFotoFirmaCteUnidadMilitar;
    private String cargoCteUnidadMilitar;
    
    private ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO;
    
    public ApoyoAtencPrevEmergDesastDTO getApoyoAtencPrevEmergDesastDTO() {
        return apoyoAtencPrevEmergDesastDTO;
    }
    public void setApoyoAtencPrevEmergDesastDTO(ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO) {
        this.apoyoAtencPrevEmergDesastDTO = apoyoAtencPrevEmergDesastDTO;
    }
}
