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
public class ContribucionSaneamientoBasicoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idContribucionSaneamientoBasico;
    //private Long idInfraestructura;
    //private Long idHistorialProveedorProductoOServicio;
    //private Long idTipoContribucionSaneamientoBasico;
    private String valorPagoContribucionSaneamientoBasico;
    private Date fechaHMSContribucionSaneamientoBasico;
    private String nombreArchivoDocumentoAnexoFactContribSanBas;
    
    private InfraestructuraDTO infraestructuraDTO;
    private HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO;
    private TipoContribucionSaneamientoBasicoDTO tipoContribucionSaneamientoBasicoDTO;
    
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
    public HistorialProveedorProductoOServicioDTO getHistorialProveedorProductoOServicioDTO() {
        return historialProveedorProductoOServicioDTO;
    }
    public void setHistorialProveedorProductoOServicioDTO(HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO) {
        this.historialProveedorProductoOServicioDTO = historialProveedorProductoOServicioDTO;
    }
    public TipoContribucionSaneamientoBasicoDTO getTipoContribucionSaneamientoBasicoDTO() {
        return tipoContribucionSaneamientoBasicoDTO;
    }
    public void setTipoContribucionSaneamientoBasicoDTO(TipoContribucionSaneamientoBasicoDTO tipoContribucionSaneamientoBasicoDTO) {
        this.tipoContribucionSaneamientoBasicoDTO = tipoContribucionSaneamientoBasicoDTO;
    }
}
