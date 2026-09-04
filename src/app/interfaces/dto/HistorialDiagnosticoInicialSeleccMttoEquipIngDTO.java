//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 15/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class HistorialDiagnosticoInicialSeleccMttoEquipIngDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialDiagnosticoInicialSeleccMttoEquipIng;
    private String numRegHistorialDiagnosticoInicialSeleccMttoEquipIng;
    private String nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng;
    private String descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng;
    //private Long idUnidadMilitar;
    //private Long idUnidadMilitarRealizadoraMantenimiento;
    //private Long idEquipoIngeniero;
    //private Long idEstadoDiagnosticoEquipoIngeniero;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private UnidadMilitarDTO unidadMilitarRealizadoraMantenimientoDTO;
    private EquipoIngenieroDTO equipoIngenieroDTO;
    private EstadoDiagnosticoEquipoIngenieroDTO estadoDiagnosticoEquipoIngenieroDTO;
    
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public UnidadMilitarDTO getUnidadMilitarRealizadoraMantenimientoDTO() {
        return unidadMilitarRealizadoraMantenimientoDTO;
    }
    public void setUnidadMilitarRealizadoraMantenimientoDTO(UnidadMilitarDTO unidadMilitarRealizadoraMantenimientoDTO) {
        this.unidadMilitarRealizadoraMantenimientoDTO = unidadMilitarRealizadoraMantenimientoDTO;
    }
    public EquipoIngenieroDTO getEquipoIngenieroDTO() {
        return equipoIngenieroDTO;
    }
    public void setEquipoIngenieroDTO(EquipoIngenieroDTO equipoIngenieroDTO) {
        this.equipoIngenieroDTO = equipoIngenieroDTO;
    }
    public EstadoDiagnosticoEquipoIngenieroDTO getEstadoDiagnosticoEquipoIngenieroDTO() {
        return estadoDiagnosticoEquipoIngenieroDTO;
    }
    public void setEstadoDiagnosticoEquipoIngenieroDTO(EstadoDiagnosticoEquipoIngenieroDTO estadoDiagnosticoEquipoIngenieroDTO) {
        this.estadoDiagnosticoEquipoIngenieroDTO = estadoDiagnosticoEquipoIngenieroDTO;
    }
}
