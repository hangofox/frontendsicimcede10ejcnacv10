//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 19/06/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class ElementoSubclasificacionEquipoIngenieroDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idElementoSubclasificacionEquipoIngeniero;
    private String nombreElementoSubclasificacionEquipoIngeniero;
    //private Long idClasificacionEquipoIngeniero;
    //private Long idSubclasificacionEquipoIngeniero;
    //private Long idLineaEquipoIngeniero;
    //private Long idCuentaEquipoIngeniero;
    //private Long idClaseActivoEquipoIngeniero;
    
    private ClasificacionEquipoIngenieroDTO clasificacionEquipoIngenieroDTO;
    private SubclasificacionEquipoIngenieroDTO subclasificacionEquipoIngenieroDTO;
    private LineaEquipoIngenieroDTO lineaEquipoIngenieroDTO;
    private CuentaEquipoIngenieroDTO cuentaEquipoIngenieroDTO;
    private ClaseActivoEquipoIngenieroDTO claseActivoEquipoIngenieroDTO;
    
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
    public LineaEquipoIngenieroDTO getLineaEquipoIngenieroDTO() {
        return lineaEquipoIngenieroDTO;
    }
    public void setLineaEquipoIngenieroDTO(LineaEquipoIngenieroDTO lineaEquipoIngenieroDTO) {
        this.lineaEquipoIngenieroDTO = lineaEquipoIngenieroDTO;
    }
    public CuentaEquipoIngenieroDTO getCuentaEquipoIngenieroDTO() {
        return cuentaEquipoIngenieroDTO;
    }
    public void setCuentaEquipoIngenieroDTO(CuentaEquipoIngenieroDTO cuentaEquipoIngenieroDTO) {
        this.cuentaEquipoIngenieroDTO = cuentaEquipoIngenieroDTO;
    }
    public ClaseActivoEquipoIngenieroDTO getClaseActivoEquipoIngenieroDTO() {
        return claseActivoEquipoIngenieroDTO;
    }
    public void setClaseActivoEquipoIngenieroDTO(ClaseActivoEquipoIngenieroDTO claseActivoEquipoIngenieroDTO) {
        this.claseActivoEquipoIngenieroDTO = claseActivoEquipoIngenieroDTO;
    }
}
