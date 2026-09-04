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
public class TerrenoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idTerreno;
    private String denominacionTerreno;
    private String numeroInventarioTerreno;
    private String numeroActivoFijoTerreno;
    private UnidadMilitarDTO unidadMilitarDTO;
    private SociedadUnidadCentralizadoraDTO sociedadUnidadCentralizadoraDTO;
    private String numeroCatastralTerreno;
    private String numeroEscrituraTerreno;
    private String numeroNotariaTerreno;
    private String lugarUbicacionNotariaTerreno;
    private Date fechaHMSMatriculaTerreno;
    private String paisOrigenTerreno;
    private String departamentoOEstadoOrigenTerreno;
    private String ciudadOrigenTerreno;
    private String direccionTerreno;
    private String latitudTerreno;
    private String longitudTerreno;
    private String numeroAreaTerreno;
    private String nombreUnidadMedidaTerreno;
    private String siONoExoneradoImpuestoPredialTerreno;
    private Long numeroAnosExoneracionImpuestoPredialTerreno;
    private String observacionesTerreno;
    private Date fechaHMSAltaTerreno;
    private Date fechaHMSIngresoTerreno;
    private Date fechaHMSModificacionTerreno;
    
    private EstadoTerrenoDTO estadoTerrenoDTO;
    
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
    public EstadoTerrenoDTO getEstadoTerrenoDTO() {
        return estadoTerrenoDTO;
    }
    public void setEstadoTerrenoDTO(EstadoTerrenoDTO estadoTerrenoDTO) {
        this.estadoTerrenoDTO = estadoTerrenoDTO;
    }
}
