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
public class InclusionSeguroEquipoIngenieroDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idInclusionSeguroEquipoIngeniero;
    private Date fechaHMSIniciacionInclusionSeguroEquipoIngeniero;
    private Date fechaHMSFinalizacionInclusionSeguroEquipoIngeniero;
    private String descripcionInclusionSeguroEquipoIngeniero;
    //private Long idAseguramientoEquipoIngeniero;
    
    private AseguramientoEquipoIngenieroDTO aseguramientoEquipoIngenieroDTO;
    
    public AseguramientoEquipoIngenieroDTO getAseguramientoEquipoIngenieroDTO() {
        return aseguramientoEquipoIngenieroDTO;
    }
    public void setAseguramientoEquipoIngenieroDTO(AseguramientoEquipoIngenieroDTO aseguramientoEquipoIngenieroDTO) {
        this.aseguramientoEquipoIngenieroDTO = aseguramientoEquipoIngenieroDTO;
    }
}
