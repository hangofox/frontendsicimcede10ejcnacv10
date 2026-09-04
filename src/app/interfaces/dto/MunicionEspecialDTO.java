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
//Anotacion de lombok que me crea automaticamente los get, set constructor.
public class MunicionEspecialDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idMunicionEspecial;
    private String nombreMunicionEspecial;
    private String cantidadMunicionEspecial;
    private String loteMunicionEspecial;
    private String valorAdquisicionMunicionEspecial;
    private String valorContableMunicionEspecial;
    private Date fechaHMSAltaMunicionEspecial;
    private String centroCostoPelotonUnidadMilitar;
    private Date fechaHMSIngresoMunicionEspecial;
    private Date fechaHMSModificacionMunicionEspecial;
    private String estadoMunicionEspecial;
    
    private PelotonUnidadMilitarDTO pelotonUnidadMilitarDTO;
    private TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO;
    
    public PelotonUnidadMilitarDTO getPelotonUnidadMilitarDTO() {
        return pelotonUnidadMilitarDTO;
    }
    public void setPelotonUnidadMilitarDTO(PelotonUnidadMilitarDTO pelotonUnidadMilitarDTO) {
        this.pelotonUnidadMilitarDTO = pelotonUnidadMilitarDTO;
    }
    public TipoDespejeMilitarArtefactoExplosivoDTO getTipoDespejeMilitarArtefactoExplosivoDTO() {
        return tipoDespejeMilitarArtefactoExplosivoDTO;
    }
    public void setTipoDespejeMilitarArtefactoExplosivoDTO(TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO) {
        this.tipoDespejeMilitarArtefactoExplosivoDTO = tipoDespejeMilitarArtefactoExplosivoDTO;
    }
}
