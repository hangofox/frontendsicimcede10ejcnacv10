//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 09/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class DocumentacionAnexaCotizProySoatLinBlancDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idDocumentacionAnexaCotizProySoatLinBlanc;
    //private Long idProyeccionSoatLineaBlanca;
    private String nombreDocumentoAnexoCotizProySoatLinBlanc;
    private String nombreArchivoDocumentoAnexoCotizProySoatLinBlanc;
    
    private ProyeccionSoatLineaBlancaDTO proyeccionSoatLineaBlancaDTO;
    
    public ProyeccionSoatLineaBlancaDTO getProyeccionSoatLineaBlancaDTO() {
        return proyeccionSoatLineaBlancaDTO;
    }
    public void setProyeccionSoatLineaBlancaDTO(ProyeccionSoatLineaBlancaDTO proyeccionSoatLineaBlancaDTO) {
        this.proyeccionSoatLineaBlancaDTO = proyeccionSoatLineaBlancaDTO;
    }
}
