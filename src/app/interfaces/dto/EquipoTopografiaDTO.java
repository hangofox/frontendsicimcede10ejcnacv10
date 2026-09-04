//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 21/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS RESPONSE DE LOS DTO.
public class EquipoTopografiaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idEquipoTopografia;
    private String denominacionEquipoTopografia;
    private String numeroInventarioEquipoTopografia;
    private String numeroActivoFijoEquipoTopografia;
    private String centroCostoUnidadMilitarEquipoTopografia;
    private Date fechaHMSIngresoEquipoTopografia;
    private Date fechaHMSModificacionEquipoTopografia;
    private String estadoEquipoTopografia;
    private UnidadMilitarDTO unidadMilitarDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DEL DTO RELACIONAL:
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
}
