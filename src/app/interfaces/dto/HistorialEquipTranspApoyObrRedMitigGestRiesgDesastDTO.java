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
public class HistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast;
    private String numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast;
    private String numeroPlacaEquipoTransporte;
    private Long totalHorasEmpleadasEquipTranspApoyObrRedMitigGestRiesgDesast;
    //private Long idApoyoObrRedMitigGestRiesgDesast;
    //private Long idClasificacionEquipoIngeniero;
    //private Long idSubclasificacionEquipoIngeniero;
    //private Long idElementoSubclasificacionEquipoIngeniero;
    //private Long idEquipoIngeniero;
    
    private ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO;
    private ClasificacionEquipoIngenieroDTO clasificacionEquipoIngenieroDTO;
    private SubclasificacionEquipoIngenieroDTO subclasificacionEquipoIngenieroDTO;
    private ElementoSubclasificacionEquipoIngenieroDTO elementoSubclasificacionEquipoIngenieroDTO;
    private EquipoIngenieroDTO equipoIngenieroDTO;
    
    public ApoyoObrRedMitigGestRiesgDesastDTO getApoyoObrRedMitigGestRiesgDesastDTO() {
        return apoyoObrRedMitigGestRiesgDesastDTO;
    }
    public void setApoyoObrRedMitigGestRiesgDesastDTO(ApoyoObrRedMitigGestRiesgDesastDTO apoyoObrRedMitigGestRiesgDesastDTO) {
        this.apoyoObrRedMitigGestRiesgDesastDTO = apoyoObrRedMitigGestRiesgDesastDTO;
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
    public EquipoIngenieroDTO getEquipoIngenieroDTO() {
        return equipoIngenieroDTO;
    }
    public void setEquipoIngenieroDTO(EquipoIngenieroDTO equipoIngenieroDTO) {
        this.equipoIngenieroDTO = equipoIngenieroDTO;
    }
}
