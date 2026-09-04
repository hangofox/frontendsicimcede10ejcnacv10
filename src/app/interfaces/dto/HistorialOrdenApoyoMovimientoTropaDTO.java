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
public class HistorialOrdenApoyoMovimientoTropaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialOrdenApoyoMovimientoTropa;
    private String numRegHistorialOrdenApoyoMovimientoTropa;
    //private Long idApoyoAtencPrevEmergDesast;
    private String numeroOficioHrOrdenApoyoMovimientoTropa;
    private String asuntoOrdenApoyoMovimientoTropa;
    
    private ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO;
    
    public ApoyoAtencPrevEmergDesastDTO getApoyoAtencPrevEmergDesastDTO() {
        return apoyoAtencPrevEmergDesastDTO;
    }
    public void setApoyoAtencPrevEmergDesastDTO(ApoyoAtencPrevEmergDesastDTO apoyoAtencPrevEmergDesastDTO) {
        this.apoyoAtencPrevEmergDesastDTO = apoyoAtencPrevEmergDesastDTO;
    }
}
