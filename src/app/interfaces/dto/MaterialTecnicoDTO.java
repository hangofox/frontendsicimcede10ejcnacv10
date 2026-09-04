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
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS RESPONSE DE LOS DTO.
public class MaterialTecnicoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idMaterialTecnico;
    private String nombreMaterialTecnico;
    private String serialMaterialTecnico;
    private String numeroInventarioMaterialTecnico;
    private String numeroActivoFijoMaterialTecnico;
    private String valorAdquisicionMaterialTecnico;
    private String valorContableMaterialTecnico;
    private String valorCostoUnitarioMaterialTecnico;
    private String codigoContableMaterialTecnico;
    private String centroCostoUnidadMilitar;
    private Date fechaHMSAltaMaterialTecnico;
    private String tiempoAnualVidaUtilMaterialTecnico;
    private Date fechaHMSIngresoMaterialTecnico;
    private Date fechaHMSModificacionMaterialTecnico;
    private String estadoUsoMaterialTecnico;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DEL DTO RELACIONAL:
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public TipoDespejeMilitarArtefactoExplosivoDTO getTipoDespejeMilitarArtefactoExplosivoDTO() {
        return tipoDespejeMilitarArtefactoExplosivoDTO;
    }
    public void setTipoDespejeMilitarArtefactoExplosivoDTO(TipoDespejeMilitarArtefactoExplosivoDTO tipoDespejeMilitarArtefactoExplosivoDTO) {
        this.tipoDespejeMilitarArtefactoExplosivoDTO = tipoDespejeMilitarArtefactoExplosivoDTO;
    }
}
