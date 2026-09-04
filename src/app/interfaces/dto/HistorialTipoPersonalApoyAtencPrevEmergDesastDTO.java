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
public class HistorialTipoPersonalApoyAtencPrevEmergDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialTipoPersonalApoyAtencPrevEmergDesast;
    private String numRegHistorialTipoPersonalApoyAtencPrevEmergDesast;
    private Long cantidadPersonalApoyo;
    private Long diasEmpleadosTipoPersonalApoyAtencPrevEmergDesast;
    //private Long idApoyoAtencPrevEmergDesast;
    //private Long idTipoPersonalApoyo;
    
    private ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO;
    private TipoPersonalApoyoDTO tipoPersonalApoyoDTO;
    
    public ApoyoAtencPrevEmergDesastDTO getApoyoAtencPrevEmergDesastDTO() {
        return apoyoAtencPrevEmergDesastDTO;
    }
    public void setApoyoAtencPrevEmergDesastDTO(ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO) {
        this.apoyoAtencPrevEmergDesastDTO = apoyoAtencPrevEmergDesastDTO;
    }
    public TipoPersonalApoyoDTO getTipoPersonalApoyoDTO() {
        return tipoPersonalApoyoDTO;
    }
    public void setTipoPersonalApoyoDTO(TipoPersonalApoyoDTO tipoPersonalApoyoDTO) {
        this.tipoPersonalApoyoDTO = tipoPersonalApoyoDTO;
    }
}
