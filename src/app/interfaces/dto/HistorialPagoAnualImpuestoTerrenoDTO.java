//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class HistorialPagoAnualImpuestoTerrenoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialPagoAnualImpuestoTerreno;
    private String numRegHistorialPagoAnualImpuestoTerreno;
    //private Long idTerreno;
    private String valorTotalHistorialPagoAnualImpuestoTerreno;
    private Date fechaHMSHistorialPagoAnualImpuestoTerreno;
    //private Long idTipoEntidadInstitucional;
    private String nombreEntidadInstitucionalPagoAnualImpuestoTerreno;
    private String numeroFacturaHistorialPagoAnualImpuestoTerreno;
    private String siONoReduccionHistorialPagoAnualImpuestoTerreno;
    //private Long idTipoReduccionImpuestoTerreno;
    private String numeroPorcentajeReduccHistPagAnImpTerr;
    private String nombreArchivoDocumentoAnexoFactHistPagAnImpTerr;
    
    private TerrenoDTO terrenoDTO;
    private TipoEntidadInstitucionalDTO tipoEntidadInstitucionalDTO;
    private TipoReduccionImpuestoTerrenoDTO tipoReduccionImpuestoTerrenoDTO;
    
    public TerrenoDTO getTerrenoDTO() {
        return terrenoDTO;
    }
    public void setTerrenoDTO(TerrenoDTO terrenoDTO) {
        this.terrenoDTO = terrenoDTO;
    }
    public TipoEntidadInstitucionalDTO getTipoEntidadInstitucionalDTO() {
        return tipoEntidadInstitucionalDTO;
    }
    public void setTipoEntidadInstitucionalDTO(TipoEntidadInstitucionalDTO tipoEntidadInstitucionalDTO) {
        this.tipoEntidadInstitucionalDTO = tipoEntidadInstitucionalDTO;
    }
    public TipoReduccionImpuestoTerrenoDTO getTipoReduccionImpuestoTerrenoDTO() {
        return tipoReduccionImpuestoTerrenoDTO;
    }
    public void setTipoReduccionImpuestoTerrenoDTO(TipoReduccionImpuestoTerrenoDTO tipoReduccionImpuestoTerrenoDTO) {
        this.tipoReduccionImpuestoTerrenoDTO = tipoReduccionImpuestoTerrenoDTO;
    }
}
