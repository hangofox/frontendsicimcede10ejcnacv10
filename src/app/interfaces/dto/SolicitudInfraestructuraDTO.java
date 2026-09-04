//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 27/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class SolicitudInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idSolicitudInfraestructura;
    private String codigoRadicadoSolicitudInfraestructura;
    //private Long idUnidadMilitar;
    private Date fechaHMSSolicitudInfraestructura;
    //private Long idTipoSolicitudInfraestructura;
    private String nombreSolicitudInfraestructura;
    //private Long idInfraestructura;
    private String nombreDependenciaSolicitudInfraestructura;
    private Long numeroFuncionariosSolicitudInfraestructura;
    private Long numeroUsuariosSolicitudInfraestructura;
    private String observacionesJuridicasEstadoPredioInfraestructura;
    private String observacionesEstadoAmbientalInfraestructura;
    private String justificacionNecesidadInfraestructura;
    private String descripcionGeneralNecesidadInfraestructura;
    private String descripcionImpactoEsperadoInfraestructura;
    private Date fechaHMSIngresoSolicitudInfraestructura;
    private Date fechaHMSModificacionSolicitudInfraestructura;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private TipoSolicitudInfraestructuraDTO tipoSolicitudInfraestructuraDTO;
    private InfraestructuraDTO infraestructuraDTO;
    
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public TipoSolicitudInfraestructuraDTO getTipoSolicitudInfraestructuraDTO() {
        return tipoSolicitudInfraestructuraDTO;
    }
    public void setTipoSolicitudInfraestructuraDTO(TipoSolicitudInfraestructuraDTO tipoSolicitudInfraestructuraDTO) {
        this.tipoSolicitudInfraestructuraDTO = tipoSolicitudInfraestructuraDTO;
    }
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
}
