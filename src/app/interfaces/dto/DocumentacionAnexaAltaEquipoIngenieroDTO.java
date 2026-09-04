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
public class DocumentacionAnexaAltaEquipoIngenieroDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idDocumentacionAnexaAltaEquipoIngeniero;
    private String nombreDocumentoAnexoAltaEquipoIngeniero;
    private String nombreArchivoDocumentoAnexoAltaEquipoIngeniero;
    //private Long idEquipoIngeniero;
    //private Long idTipoDocumentoAnexoAltaEquipoIngeniero;
    
    private EquipoIngenieroDTO equipoIngenieroDTO;
    private TipoDocumentoAnexoAltaEquipoIngenieroDTO tipoDocumentoAnexoAltaEquipoIngenieroDTO;
    
    public EquipoIngenieroDTO getEquipoIngenieroDTO() {
        return equipoIngenieroDTO;
    }
    public void setEquipoIngenieroDTO(EquipoIngenieroDTO equipoIngenieroDTO) {
        this.equipoIngenieroDTO = equipoIngenieroDTO;
    }
    public TipoDocumentoAnexoAltaEquipoIngenieroDTO getTipoDocumentoAnexoAltaEquipoIngenieroDTO() {
        return tipoDocumentoAnexoAltaEquipoIngenieroDTO;
    }
    public void setTipoDocumentoAnexoAltaEquipoIngenieroDTO(TipoDocumentoAnexoAltaEquipoIngenieroDTO tipoDocumentoAnexoAltaEquipoIngenieroDTO) {
        this.tipoDocumentoAnexoAltaEquipoIngenieroDTO = tipoDocumentoAnexoAltaEquipoIngenieroDTO;
    }
}
