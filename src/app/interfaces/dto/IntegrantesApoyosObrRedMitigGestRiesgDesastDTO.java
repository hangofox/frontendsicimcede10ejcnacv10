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
public class IntegrantesApoyosObrRedMitigGestRiesgDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idIntegrantesApoyosObrRedMitigGestRiesgDesast;
    //private Long idApoyoObrRedMitigGestRiesgDesast;
    private String gradoJefeSeccionTecnicaUnidadMilitar;
    private String nombresJefeSeccionTecnicaUnidadMilitar;
    private String primerApellidoJefeSeccionTecnicaUnidadMilitar;
    private String segundoApellidoJefeSeccionTecnicaUnidadMilitar;
    private String nombreArchivoFotoFirmaJefeSeccionTecnicaUnidadMilitar;
    private String cargoJefeSeccionTecnicaUnidadMilitar;
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
    
    private ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO;
    
    public ApoyoObrRedMitigGestRiesgDesastDTO getApoyoObrRedMitigGestRiesgDesastDTO() {
        return apoyoObrRedMitigGestRiesgDesastDTO;
    }
    public void setApoyoObrRedMitigGestRiesgDesastDTO(ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO) {
        this.apoyoObrRedMitigGestRiesgDesastDTO = apoyoObrRedMitigGestRiesgDesastDTO;
    }
}
