//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 31/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS RESPONSE DE LOS DTO.
public class ApoyoAtencPrevEmergDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE RESPUESTA DEL DTO:
    private Long idApoyoAtencPrevEmergDesast;
    private String codigoRadicadoApoyoAtencPrevEmergDesast;
    //private Long idUnidadMilitar;
    private String paisOrigenApoyoAtencPrevEmergDesast;
    private String departamentoOEstadoOrigenApoyoAtencPrevEmergDesast;
    private String ciudadOrigenApoyoAtencPrevEmergDesast;
    private String latitudApoyoAtencPrevEmergDesast;
    private String longitudApoyoAtencPrevEmergDesast;
    private Date fechaHMSIniciacionApoyoAtencPrevEmergDesast;
    private Date fechaHMSFinalizacionApoyoAtencPrevEmergDesast;
    //private Long idTipoEntidadInstitucional;
    private String nombreEntidadInstitucionalSolicApoyoAtencPrevEmergDesast;
    //private Long idTipoRequerimientoApoyoAtencionPrevencion;
    private String codigoRadicadoTipoRequerimientoApoyoAtencionPrevencion;
    //private Long idTipoEventoApoyoRealizado;
    private Long numeroHeridosRequerimientoApoyoAtencionPrevencion;
    private Long numeroMuertosRequerimientoApoyoAtencionPrevencion;
    private Long numeroDesaparecidosRequerimientoApoyoAtencionPrevencion;
    private Long numeroViviendasAfectadasRequerimientoApoyoAtencionPrevencion;
    private Long numeroPuentesAfectadosRequerimientoApoyoAtencionPrevencion;
    private Long numeroViasAfectadasRequerimientoApoyoAtencionPrevencion;
    private Long numeroHectareasAfectadasRequerimientoApoyoAtencionPrevencion;
    private String descripcionAfectacionApoyoAtencPrevEmergDesast;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private TipoEntidadInstitucionalDTO tipoEntidadInstitucionalDTO;
    private TipoRequerimientoApoyoAtencionPrevencionDTO tipoRequerimientoApoyoAtencionPrevencionDTO;
    private ProcesoApoyoAtencionPrevencionDTO procesoApoyoAtencionPrevencionDTO;
    private TipoEventoApoyoRealizadoDTO tipoEventoApoyoRealizadoDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DE LAS LLAVES FORANEAS DE LAS VARIABLES DE RESPUESTA DECLARADAS DEL DTO:
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public TipoEntidadInstitucionalDTO getTipoEntidadInstitucionalDTO() {
        return tipoEntidadInstitucionalDTO;
    }
    public void setTipoEntidadInstitucionalDTO(TipoEntidadInstitucionalDTO tipoEntidadInstitucionalDTO) {
        this.tipoEntidadInstitucionalDTO = tipoEntidadInstitucionalDTO;
    }
    public TipoRequerimientoApoyoAtencionPrevencionDTO getTipoRequerimientoApoyoAtencionPrevencionDTO() {
        return tipoRequerimientoApoyoAtencionPrevencionDTO;
    }
    public void setTipoRequerimientoApoyoAtencionPrevencionDTO(TipoRequerimientoApoyoAtencionPrevencionDTO tipoRequerimientoApoyoAtencionPrevencionDTO) {
        this.tipoRequerimientoApoyoAtencionPrevencionDTO = tipoRequerimientoApoyoAtencionPrevencionDTO;
    }
    public ProcesoApoyoAtencionPrevencionDTO getProcesoApoyoAtencionPrevencionDTO() {
        return procesoApoyoAtencionPrevencionDTO;
    }
    public void setProcesoApoyoAtencionPrevencionDTO(ProcesoApoyoAtencionPrevencionDTO procesoApoyoAtencionPrevencionDTO) {
        this.procesoApoyoAtencionPrevencionDTO = procesoApoyoAtencionPrevencionDTO;
    }
    public TipoEventoApoyoRealizadoDTO getTipoEventoApoyoRealizadoDTO() {
        return tipoEventoApoyoRealizadoDTO;
    }
    public void setTipoEventoApoyoRealizadoDTO(TipoEventoApoyoRealizadoDTO tipoEventoApoyoRealizadoDTO) {
        this.tipoEventoApoyoRealizadoDTO = tipoEventoApoyoRealizadoDTO;
    }
}
