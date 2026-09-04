//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 31/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS RESPONSE DE LOS DTO.
public class FotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE RESPUESTA DEL DTO:
    private Long idFotografiasAnexasApoyObrRedMitigGestRiesgDesast;
    //private Long idApoyoObrRedMitigGestRiesgDesast;
    private String nombreArchivoFotoExtensionOFormatoApoyObrRedMitigGestRiesgDesast1;
    private String nombreArchivoFotoExtensionOFormatoApoyObrRedMitigGestRiesgDesast2;
    
    private ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DE LAS LLAVES FORANEAS DE LAS VARIABLES DE RESPUESTA DECLARADAS DEL DTO:
    public ApoyoObrRedMitigGestRiesgDesastDTO getApoyoObrRedMitigGestRiesgDesastDTO() {
        return apoyoObrRedMitigGestRiesgDesastDTO;
    }
    public void setApoyoObrRedMitigGestRiesgDesastDTO(ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO) {
        this.apoyoObrRedMitigGestRiesgDesastDTO = apoyoObrRedMitigGestRiesgDesastDTO;
    }
}
