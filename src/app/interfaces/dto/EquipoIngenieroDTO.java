//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 30/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class EquipoIngenieroDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idEquipoIngeniero;
    private String denominacionEquipoIngeniero;
    private String numeroInventarioEquipoIngeniero;
    private String numeroActivoFijoEquipoIngeniero;
    //private Long idUnidadMilitar;
    private String centroCostoUnidadMilitarEquipoIngeniero;
    //private Long idSociedadUnidadCentralizadora;
    //private Long idClasificacionEquipoIngeniero;
    //private Long idSubclasificacionEquipoIngeniero;
    //private Long idElementoSubclasificacionEquipoIngeniero;
    //private Long idTipoAltaEquipoIngeniero;
    private String marcaEquipoIngeniero;
    private String modeloEquipoIngeniero;
    private String capacidadEquipoIngeniero;
    private String empadronamientoEquipoIngeniero;
    private String numeroPlacaEquipoIngeniero;
    private Date fechaHMSMatriculaEquipoIngeniero;
    private Date fechaHMSAltaEquipoIngeniero;
    private String valorAdquisicionEquipoIngeniero;
    private String valorContableEquipoIngeniero;
    private String valorDepreciacionEquipoIngeniero;
    private String observacionesEquipoIngeniero;
    private Date fechaHMSIngresoEquipoIngeniero;
    private Date fechaHMSModificacionEquipoIngeniero;
    private String estadoUsoEquipoIngeniero;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private SociedadUnidadCentralizadoraDTO sociedadUnidadCentralizadoraDTO;
    private ClasificacionEquipoIngenieroDTO clasificacionEquipoIngenieroDTO;
    private SubclasificacionEquipoIngenieroDTO subclasificacionEquipoIngenieroDTO;
    private ElementoSubclasificacionEquipoIngenieroDTO elementoSubclasificacionEquipoIngenieroDTO;
    private TipoAltaEquipoIngenieroDTO tipoAltaEquipoIngenieroDTO;
    
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public SociedadUnidadCentralizadoraDTO getSociedadUnidadCentralizadoraDTO() {
        return sociedadUnidadCentralizadoraDTO;
    }
    public void setSociedadUnidadCentralizadoraDTO(SociedadUnidadCentralizadoraDTO sociedadUnidadCentralizadoraDTO) {
        this.sociedadUnidadCentralizadoraDTO = sociedadUnidadCentralizadoraDTO;
    }
    public ClasificacionEquipoIngenieroDTO getClasificacionEquipoIngenieroDTO() {
        return clasificacionEquipoIngenieroDTO;
    }
    public void setClasificacionEquipoIngenieroDTO(ClasificacionEquipoIngenieroDTO clasificacionEquipoIngenieroDTO) {
        this.clasificacionEquipoIngenieroDTO = clasificacionEquipoIngenieroDTO;
    }
    public SubclasificacionEquipoIngenieroDTO getSubclasificacionEquipoIngenieroDTO() {
        return subclasificacionEquipoIngenieroDTO;
    }
    public void setSubclasificacionEquipoIngenieroDTO(SubclasificacionEquipoIngenieroDTO subclasificacionEquipoIngenieroDTO) {
        this.subclasificacionEquipoIngenieroDTO = subclasificacionEquipoIngenieroDTO;
    }
    public ElementoSubclasificacionEquipoIngenieroDTO getElementoSubclasificacionEquipoIngenieroDTO() {
        return elementoSubclasificacionEquipoIngenieroDTO;
    }
    public void setElementoSubclasificacionEquipoIngenieroDTO(ElementoSubclasificacionEquipoIngenieroDTO elementoSubclasificacionEquipoIngenieroDTO) {
        this.elementoSubclasificacionEquipoIngenieroDTO = elementoSubclasificacionEquipoIngenieroDTO;
    }
    public TipoAltaEquipoIngenieroDTO getTipoAltaEquipoIngenieroDTO() {
        return tipoAltaEquipoIngenieroDTO;
    }
    public void setTipoAltaEquipoIngenieroDTO(TipoAltaEquipoIngenieroDTO tipoAltaEquipoIngenieroDTO) {
        this.tipoAltaEquipoIngenieroDTO = tipoAltaEquipoIngenieroDTO;
    }
}
