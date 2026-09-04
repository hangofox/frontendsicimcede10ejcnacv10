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
public class HistorialMaqPesadApoyAtencPrevEmergDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialMaqPesadApoyAtencPrevEmergDesast;
    private String numRegHistorialMaqPesadApoyAtencPrevEmergDesast;
    private Long diasEmpleadosMaqPesadApoyAtencPrevEmergDesast;
    //private Long idApoyoAtencPrevEmergDesast;
    //private Long idMaquinariaPesada;
    
    private ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO;
    private MaquinariaPesadaDTO maquinariaPesadaDTO;
    
    public ApoyoAtencPrevEmergDesastDTO getApoyoAtencPrevEmergDesastDTO() {
        return apoyoAtencPrevEmergDesastDTO;
    }
    public void setApoyoAtencPrevEmergDesastDTO(ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO) {
        this.apoyoAtencPrevEmergDesastDTO = apoyoAtencPrevEmergDesastDTO;
    }
    public MaquinariaPesadaDTO getMaquinariaPesadaDTO() {
        return maquinariaPesadaDTO;
    }
    public void setMaquinariaPesadaDTO(MaquinariaPesadaDTO maquinariaPesadaDTO) {
        this.maquinariaPesadaDTO = maquinariaPesadaDTO;
    }
}
