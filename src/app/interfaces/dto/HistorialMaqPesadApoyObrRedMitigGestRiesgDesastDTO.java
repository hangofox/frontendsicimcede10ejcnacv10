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
public class HistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast;
    private String numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast;
    private Long totalHorasEmpleadasMaqPesadApoyObrRedMitigGestRiesgDesast;
    //private Long idApoyoObrRedMitigGestRiesgDesast;
    //private Long idMaquinariaPesada;
    
    private ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO;
    private MaquinariaPesadaDTO maquinariaPesadaDTO;
    
    public ApoyoObrRedMitigGestRiesgDesastDTO getApoyoObrRedMitigGestRiesgDesastDTO() {
        return apoyoObrRedMitigGestRiesgDesastDTO;
    }
    public void setApoyoObrRedMitigGestRiesgDesastDTO(ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO) {
        this.apoyoObrRedMitigGestRiesgDesastDTO = apoyoObrRedMitigGestRiesgDesastDTO;
    }
    public MaquinariaPesadaDTO getMaquinariaPesadaDTO() {
        return maquinariaPesadaDTO;
    }
    public void setMaquinariaPesadaDTO(MaquinariaPesadaDTO maquinariaPesadaDTO) {
        this.maquinariaPesadaDTO = maquinariaPesadaDTO;
    }
}
