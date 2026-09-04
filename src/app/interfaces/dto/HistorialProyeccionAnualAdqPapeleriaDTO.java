//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 10/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class HistorialProyeccionAnualAdqPapeleriaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialProyeccionAnualAdqPapeleria;
    private String numRegHistorialProyeccionAnualAdqPapeleria;
    private String valorContratoHistorialProyeccionAnualAdqPapeleria;
    private String numeroRubroPresupuestalHistProyAnAdqPap;
    private String nombreArchivoDocumentoAnexoContratHistProyAnAdqPap;
    private String nombreArchivoDocumentoAnexoCotizHistProyAnAdqPap;
    private String nombreArchivoDocumentoAnexoPlNecHistProyAnAdqPap;
    //private Long idUnidadMilitar;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
}
