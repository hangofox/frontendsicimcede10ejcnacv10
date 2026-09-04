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
public class HistorialMantenimientoInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialMantenimientoInfraestructura;
    private String numRegHistorialMantenimientoInfraestructura;
    private String asuntoMantenimientoInfraestructura;
    private String descripcionMantenimientoInfraestructura;
    private Date fechaHMSMantenimientoInfraestructura;
    private String valorCostoMantenimientoInfraestructura;
    //private Long idInfraestructura;
    //private Long idTipoMantenimientoInfraestructura;
    //private Long idTipoFuenteFinanciacion;
    
    private InfraestructuraDTO infraestructuraDTO;
    private TipoMantenimientoInfraestructuraDTO tipoMantenimientoInfraestructuraDTO;
    private TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO;
    
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
    public TipoMantenimientoInfraestructuraDTO getTipoMantenimientoInfraestructuraDTO() {
        return tipoMantenimientoInfraestructuraDTO;
    }
    public void setTipoMantenimientoInfraestructuraDTO(TipoMantenimientoInfraestructuraDTO tipoMantenimientoInfraestructuraDTO) {
        this.tipoMantenimientoInfraestructuraDTO = tipoMantenimientoInfraestructuraDTO;
    }
    public TipoFuenteFinanciacionDTO getTipoFuenteFinanciacionDTO() {
        return tipoFuenteFinanciacionDTO;
    }
    public void setTipoFuenteFinanciacionDTO(TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO) {
        this.tipoFuenteFinanciacionDTO = tipoFuenteFinanciacionDTO;
    }
}
