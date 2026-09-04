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
public class HistorialIntegranteDocumentosDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialIntegranteDocumentos;
    private String numRegHistorialIntegranteDocumentos;
    private String gradoIntegranteDocumentos;
    private String nombresYApellidosIntegranteDocumentos;
    private String cargoIntegranteDocumentos;
    private String numeroDocumentoIdentificacionIntegranteDocumentos;
    private String nombreArchivoFotoFirmaIntegranteDocumentos;
    private String siONoIntegranteDocumentos;
    private String siONoActualIntegranteDocumentosPredeterminado;
    private String numeroCursoIntegranteDocumentos;
    private String puestoCursoIntegranteDocumentos;
    private String escalafonAntiguedadIntegranteDocumentos;
    private Date fechaHMSIngresoIntegranteDocumentos;
    private Date fechaHMSModificacionIntegranteDocumentos;
    //private Long idUnidadMilitar;
    //private Long idTipoDocumentoIdentificacion;
    //private Long idCargoIntegranteDocumentos;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO;
    private CargoIntegranteDocumentosDTO cargoIntegranteDocumentosDTO;
    
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public TipoDocumentoIdentificacionDTO getTipoDocumentoIdentificacionDTO() {
        return tipoDocumentoIdentificacionDTO;
    }
    public void setTipoDocumentoIdentificacionDTO(TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO) {
        this.tipoDocumentoIdentificacionDTO = tipoDocumentoIdentificacionDTO;
    }
    public CargoIntegranteDocumentosDTO getCargoIntegranteDocumentosDTO() {
        return cargoIntegranteDocumentosDTO;
    }
    public void setCargoIntegranteDocumentosDTO(CargoIntegranteDocumentosDTO cargoIntegranteDocumentosDTO) {
        this.cargoIntegranteDocumentosDTO = cargoIntegranteDocumentosDTO;
    }
}
