//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 10/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class HistorialProyeccionAnualAdqServPublicDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialProyeccionAnualAdqServPublic;
    private String numRegHistorialProyeccionAnualAdqServPublic;
    private String valorTotalHistorialPagoAnualAdqServPublic;
    private Date fechaHMSHistorialPagoAnualAdqServPublic;
    private String telefonoHistorialPagoAnualAdqServPublic;
    private String movilHistorialPagoAnualAdqServPublic;
    private String nombreArchivoDocumentoAnexoFactHistPagAnAdqServPublic;
    //private Long idInfraestructura;
    //private Long idTipoServicioPublico;
    //private Long idUnidadMilitar;
    
    private InfraestructuraDTO infraestructuraDTO;
    private TipoServicioPublicoDTO tipoServicioPublicoDTO;
    private UnidadMilitarDTO unidadMilitarDTO;
    
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
    public TipoServicioPublicoDTO getTipoServicioPublicoDTO() {
        return tipoServicioPublicoDTO;
    }
    public void setTipoServicioPublicoDTO(TipoServicioPublicoDTO tipoServicioPublicoDTO) {
        this.tipoServicioPublicoDTO = tipoServicioPublicoDTO;
    }
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
}
