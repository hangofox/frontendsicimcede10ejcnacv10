//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 27/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class InformacionFinancieraSolicitudInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idInformacionFinancieraSolicitudInfraestructura;
    //private Long idSolicitudInfraestructura;
    //private Long idTipoFuenteFinanciacion;
    private String observacionesPresupuestoInfraestructura;
    //private Long idCapituloProductoInfraestructura;
    private Long cantidadActividadProductoInfraestructura;
    private String valorCostoUnitarioCapituloProductoInfraestructura;
    private String numeroAreaIntervencionInfraestructura;
    private String nombreUnidadMedidaAreaIntervencionInfraestructura;
    
    private SolicitudInfraestructuraDTO solicitudInfraestructuraDTO;
    private TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO;
    private ActividadProductoInfraestructuraDTO actividadProductoInfraestructuraDTO;

    public SolicitudInfraestructuraDTO getSolicitudInfraestructuraDTO() {
        return solicitudInfraestructuraDTO;
    }
    public void setSolicitudInfraestructuraDTO(SolicitudInfraestructuraDTO solicitudInfraestructuraDTO) {
        this.solicitudInfraestructuraDTO = solicitudInfraestructuraDTO;
    }
    public TipoFuenteFinanciacionDTO getTipoFuenteFinanciacionDTO() {
        return tipoFuenteFinanciacionDTO;
    }
    public void setTipoFuenteFinanciacionDTO(TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO) {
        this.tipoFuenteFinanciacionDTO = tipoFuenteFinanciacionDTO;
    }
    public ActividadProductoInfraestructuraDTO getActividadProductoInfraestructuraDTO() {
        return actividadProductoInfraestructuraDTO;
    }
    public void setActividadProductoInfraestructuraDTO(ActividadProductoInfraestructuraDTO actividadProductoInfraestructuraDTO) {
        this.actividadProductoInfraestructuraDTO = actividadProductoInfraestructuraDTO;
    }
}
