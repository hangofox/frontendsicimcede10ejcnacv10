//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 20/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
//Anotacion de lombok que me crea automaticamente los get, set constructor.
public class CaninoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idCanino;
    private String denominacionCanino;
    private String numeroChipCanino;
    private String numeroInventarioCanino;
    private String numeroActivoFijoCanino;
    private String nombreCanino;
    private String colorCanino;
    private String nombreRazaCanino;
    private String valorAdquisicionCanino;
    private String valorContableCanino;
    private String valorCostoUnitarioCanino;
    private String centroCostoCompaniaUnidadMilitar;
    private Date fechaHMSAltaCanino;
    private String tiempoAnualVidaUtilCanino;
    private String descripcionCanino;
    private Date fechaHMSIngresoCanino;
    private Date fechaHMSModificacionCanino;
    private String estadoUsoCanino;
    
    private CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO;
    private TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO;
    
    public CompaniaUnidadMilitarDTO getCompaniaUnidadMilitarDTO() {
        return companiaUnidadMilitarDTO;
    }
    public void setCompaniaUnidadMilitarDTO(CompaniaUnidadMilitarDTO companiaUnidadMilitarDTO) {
        this.companiaUnidadMilitarDTO = companiaUnidadMilitarDTO;
    }
    public TipoDespejeMilitarArtefactoExplosivoDTO getTipoDespejeMilitarArtefactoExplosivoDTO() {
        return tipoDespejeMilitarArtefactoExplosivoDTO;
    }
    public void setTipoDespejeMilitarArtefactoExplosivoDTO(TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO) {
        this.tipoDespejeMilitarArtefactoExplosivoDTO = tipoDespejeMilitarArtefactoExplosivoDTO;
    }
}
