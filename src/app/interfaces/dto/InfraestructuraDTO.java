//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 24/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class InfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idInfraestructura;
    private String denominacionInfraestructura;
    private String numeroInventarioInfraestructura;
    private String numeroActivoFijoInfraestructura;
    //private Long idUnidadMilitar;
    private String centroCostoUnidadMilitarInfraestructura;
    //private Long idSociedadUnidadCentralizadora;
    //private Long idTipoEstructuraInfraestructura;
    //private Long idFuncionalidadInfraestructura;
    //private Long idSeguro;
    private String paisOrigenInfraestructura;
    private String departamentoOEstadoOrigenInfraestructura;
    private String ciudadOrigenInfraestructura;
    private String direccionInfraestructura;
    private Date fechaHMSAmortizacionInfraestructura;
    private Date fechaHMSAltaInfraestructura;
    private String numeroLargoInfraestructura;
    private String nombreUnidadMedidaLargoInfraestructura;
    private String numeroAnchuraInfraestructura;
    private String nombreUnidadMedidaAnchuraInfraestructura;
    private String numeroProfundidadInfraestructura;
    private String nombreUnidadMedidaProfundidadInfraestructura;
    private String numeroPisosInfraestructura;
    private String estadoUsoInfraestructura;
    private String latitudInfraestructura;
    private String longitudInfraestructura;
    private String normaSismoresistenteInfraestructura;
    private String propiedadHorizontalInfraestructura;
    private String denominacionPosteriorInfraestructura;
    private String estratoInfraestructura;
    private String numeroCuentaInfraestructura;
    private String numeroSubcuentaInfraestructura;
    private String valorContableInfraestructura;
    //private Long idTerreno;
    private Date fechaHMSIngresoInfraestructura;
    private Date fechaHMSModificacionInfraestructura;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private SociedadUnidadCentralizadoraDTO sociedadUnidadCentralizadoraDTO;
    private TipoEstructuraInfraestructuraDTO tipoEstructuraInfraestructuraDTO;
    private FuncionalidadInfraestructuraDTO funcionalidadInfraestructuraDTO;
    private SeguroDTO seguroDTO;
    private TerrenoDTO terrenoDTO;
    
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
    public TipoEstructuraInfraestructuraDTO getTipoEstructuraInfraestructuraDTO() {
        return tipoEstructuraInfraestructuraDTO;
    }
    public void setTipoEstructuraInfraestructuraDTO(TipoEstructuraInfraestructuraDTO tipoEstructuraInfraestructuraDTO) {
        this.tipoEstructuraInfraestructuraDTO = tipoEstructuraInfraestructuraDTO;
    }
    public FuncionalidadInfraestructuraDTO getFuncionalidadInfraestructuraDTO() {
        return funcionalidadInfraestructuraDTO;
    }
    public void setFuncionalidadInfraestructuraDTO(FuncionalidadInfraestructuraDTO funcionalidadInfraestructuraDTO) {
        this.funcionalidadInfraestructuraDTO = funcionalidadInfraestructuraDTO;
    }
    public SeguroDTO getSeguroDTO() {
        return seguroDTO;
    }
    public void setSeguroDTO(SeguroDTO seguroDTO) {
        this.seguroDTO = seguroDTO;
    }
    public TerrenoDTO getTerrenoDTO() {
        return terrenoDTO;
    }
    public void setTerrenoDTO(TerrenoDTO terrenoDTO) {
        this.terrenoDTO = terrenoDTO;
    }
}
