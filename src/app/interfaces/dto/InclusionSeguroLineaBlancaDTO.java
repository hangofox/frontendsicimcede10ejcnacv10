//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 15/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class InclusionSeguroLineaBlancaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idInclusionSeguroLineaBlanca;
    private Date fechaHMSIniciacionInclusionSeguroLineaBlanca;
    private Date fechaHMSFinalizacionInclusionSeguroLineaBlanca;
    private String descripcionInclusionSeguroLineaBlanca;
    //private Long idAseguramientoLineaBlanca;
    
    private AseguramientoLineaBlancaDTO aseguramientoLineaBlancaDTO;
    
    public AseguramientoLineaBlancaDTO getAseguramientoLineaBlancaDTO() {
        return aseguramientoLineaBlancaDTO;
    }
    public void setAseguramientoLineaBlancaDTO(AseguramientoLineaBlancaDTO aseguramientoLineaBlancaDTO) {
        this.aseguramientoLineaBlancaDTO = aseguramientoLineaBlancaDTO;
    }
}
