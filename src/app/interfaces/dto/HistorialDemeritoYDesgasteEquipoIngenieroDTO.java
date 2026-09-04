//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 30/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class HistorialDemeritoYDesgasteEquipoIngenieroDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialDemeritoYDesgasteEquipoIngeniero;
    private String numRegHistorialDemeritoYDesgasteEquipoIngeniero;
    //private Long idEquipoIngeniero;
    private String nombreProyectoHistorialDemeritoYDesgasteEquipoIngeniero;
    private String valorPresupuestalProyectoHistorialDemeritoYDesgasteEquipoIngeniero;
    private String horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero;
    private String kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero;
    
    private EquipoIngenieroDTO equipoIngenieroDTO;
    
    public EquipoIngenieroDTO getEquipoIngenieroDTO() {
        return equipoIngenieroDTO;
    }
    public void setEquipoIngenieroDTO(EquipoIngenieroDTO equipoIngenieroDTO) {
        this.equipoIngenieroDTO = equipoIngenieroDTO;
    }
}
