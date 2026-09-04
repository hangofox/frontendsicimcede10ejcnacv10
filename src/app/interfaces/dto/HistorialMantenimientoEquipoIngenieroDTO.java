//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 15/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class HistorialMantenimientoEquipoIngenieroDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialMantenimientoEquipoIngeniero;
    private String numRegHistorialMantenimientoEquipoIngeniero;
    private String asuntoMantenimientoEquipoIngeniero;
    private String descripcionMantenimientoEquipoIngeniero;
    private Date fechaHMSMantenimientoEquipoIngeniero;
    private String valorCostoMantenimientoEquipoIngeniero;
    private String nombreDocumentoAnexoContratoMttoEquipIng;
    private String nombreArchivoDocumentoAnexoContratoMttoEquipIng;
    //private Long idEquipoIngeniero;
    //private Long idNivelMantenimientoEquipoIngeniero;
    //private Long idTipoMantenimientoEquipoIngeniero;
    //private Long idTipoFuenteFinanciacion;
    
    private EquipoIngenieroDTO equipoIngenieroDTO;
    private NivelMantenimientoEquipoIngenieroDTO nivelMantenimientoEquipoIngenieroDTO;
    private TipoMantenimientoEquipoIngenieroDTO tipoMantenimientoEquipoIngenieroDTO;
    private TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO;
    
    public EquipoIngenieroDTO getEquipoIngenieroDTO() {
        return equipoIngenieroDTO;
    }
    public void setEquipoIngenieroDTO(EquipoIngenieroDTO equipoIngenieroDTO) {
        this.equipoIngenieroDTO = equipoIngenieroDTO;
    }
    public NivelMantenimientoEquipoIngenieroDTO getNivelMantenimientoEquipoIngenieroDTO() {
        return nivelMantenimientoEquipoIngenieroDTO;
    }
    public void setNivelMantenimientoEquipoIngenieroDTO(NivelMantenimientoEquipoIngenieroDTO nivelMantenimientoEquipoIngenieroDTO) {
        this.nivelMantenimientoEquipoIngenieroDTO = nivelMantenimientoEquipoIngenieroDTO;
    }
    public TipoMantenimientoEquipoIngenieroDTO getTipoMantenimientoEquipoIngenieroDTO() {
        return tipoMantenimientoEquipoIngenieroDTO;
    }
    public void setTipoMantenimientoEquipoIngenieroDTO(TipoMantenimientoEquipoIngenieroDTO tipoMantenimientoEquipoIngenieroDTO) {
        this.tipoMantenimientoEquipoIngenieroDTO = tipoMantenimientoEquipoIngenieroDTO;
    }
    public TipoFuenteFinanciacionDTO getTipoFuenteFinanciacionDTO() {
        return tipoFuenteFinanciacionDTO;
    }
    public void setTipoFuenteFinanciacionDTO(TipoFuenteFinanciacionDTO tipoFuenteFinanciacionDTO) {
        this.tipoFuenteFinanciacionDTO = tipoFuenteFinanciacionDTO;
    }
}
