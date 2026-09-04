//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 13/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA EL DTO.
public class HistorialProyeccionAnualMultaYSancionatoriaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialProyeccionAnualMultaYSancionatoria;
    private String numRegHistorialProyeccionAnualMultaYSancionatoria;
    //private Long idUnidadMilitar;
    private String numeroAutoAmbientalHistProyAnMultYSanc;
    private String denominacionAutoAmbientalHistProyAnMultYSanc;
    private String observacionesAutoAmbientalHistProyAnMultYSanc;
    private String valorPresupuestalHistProyAnMultYSanc;
    private String nombreArchivoDocumentoAnexoHistProyAnMultYSanc;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
}
