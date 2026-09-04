//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 24/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class AseguradoraDTO {

    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idAseguradora;
    private String nombreAseguradora;
    //private Long idTipoAseguradora;
    private String numeroDocumentoIdentificacionAseguradora;
    private String paisOrigenAseguradora;
    private String departamentoOEstadoOrigenAseguradora;
    private String ciudadOrigenAseguradora;
    private String direccionAseguradora;
    private String estadoAseguradora;
    
    private TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO;
    
    public TipoDocumentoIdentificacionDTO getTipoDocumentoIdentificacionDTO() {
        return tipoDocumentoIdentificacionDTO;
    }
    public void setTipoDocumentoIdentificacionDTO(TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO) {
        this.tipoDocumentoIdentificacionDTO = tipoDocumentoIdentificacionDTO;
    }
}
