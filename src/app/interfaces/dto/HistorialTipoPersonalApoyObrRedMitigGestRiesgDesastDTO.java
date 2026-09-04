//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 15/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast;
    private String numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast;
    private Long cantidadPersonalApoyo;
    private String nombreEspecialidadTipoPersonalApoyObrRedMitigGestRiesgDesast;
    //private Long idApoyoObrRedMitigGestRiesgDesast;
    //private Long idTipoPersonalApoyo;
    
    private ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO;
    private TipoPersonalApoyoDTO tipoPersonalApoyoDTO;
    
    public ApoyoObrRedMitigGestRiesgDesastDTO getApoyoObrRedMitigGestRiesgDesastDTO() {
        return apoyoObrRedMitigGestRiesgDesastDTO;
    }
    public void setApoyoObrRedMitigGestRiesgDesastDTO(ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO) {
        this.apoyoObrRedMitigGestRiesgDesastDTO = apoyoObrRedMitigGestRiesgDesastDTO;
    }
    public TipoPersonalApoyoDTO getTipoPersonalApoyoDTO() {
        return tipoPersonalApoyoDTO;
    }
    public void setTipoPersonalApoyoDTO(TipoPersonalApoyoDTO tipoPersonalApoyoDTO) {
        this.tipoPersonalApoyoDTO = tipoPersonalApoyoDTO;
    }
}
