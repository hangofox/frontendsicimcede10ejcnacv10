//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 14/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA EL DTO.
public class HistorialProyeccionMunicionEspecialDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialProyeccionMunicionEspecial;
    private String numRegHistorialProyeccionMunicionEspecial;
    //private Long idMunicionEspecial;
    private String valorTotalHistorialProyeccionMunicionEspecial;
    private String numeroRubroPresupuestalHistProyMunEsp;
    private String nombreBienOServicioHistorialProyeccionMunicionEspecial;
    private Long cantidadSolicitadaHistorialProyeccionMunicionEspecial;
    
    private MunicionEspecialDTO municionEspecialDTO;
    
    public MunicionEspecialDTO getMunicionEspecialDTO() {
        return municionEspecialDTO;
    }
    public void setMunicionEspecialDTO(MunicionEspecialDTO municionEspecialDTO) {
        this.municionEspecialDTO = municionEspecialDTO;
    }
}
