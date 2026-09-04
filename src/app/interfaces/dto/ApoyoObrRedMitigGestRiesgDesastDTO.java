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
public class ApoyoObrRedMitigGestRiesgDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idApoyoObrRedMitigGestRiesgDesast;
    private String codigoRadicadoApoyoObrRedMitigGestRiesgDesast;
    //private Long idUnidadMilitar;
    private String paisOrigenApoyoObrRedMitigGestRiesgDesast;
    private String departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast;
    private String ciudadOrigenApoyoObrRedMitigGestRiesgDesast;
    private String latitudApoyoObrRedMitigGestRiesgDesast;
    private String longitudApoyoObrRedMitigGestRiesgDesast;
    private Date fechaHMSIniciacionApoyoObrRedMitigGestRiesgDesast;
    private Date fechaHMSFinalizacionApoyoObrRedMitigGestRiesgDesast;
    //private Long idTipoEntidadInstitucional;
    private String nombreEntidadInstitucionalSolicApoyoObrRedMitigGestRiesgDesast;
    private String codigoRadicadoHrOficioAutorizacionCdoIngApoyoObrRedMitigGestRiesgDesast;
    //private Long idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast;
    private Long numeroPobBenefApoyoObrRedMitigGestRiesgDesast;
    private String descripcionObrApoyoObrRedMitigGestRiesgDesast;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private TipoEntidadInstitucionalDTO tipoEntidadInstitucionalDTO;
    private TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO;
    
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
    public TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO getTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO() {
        return tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO;
    }
    public void setTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO(TipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO) {
        this.tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO = tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO;
    }
}
