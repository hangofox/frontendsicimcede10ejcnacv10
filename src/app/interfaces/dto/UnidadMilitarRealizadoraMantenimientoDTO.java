//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 24/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS RESPONSE DE LOS DTO.
public class UnidadMilitarRealizadoraMantenimientoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idUnidadMilitarRealizadoraMantenimiento;
    private String codigoUnidadMilitarRealizadoraMantenimiento;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DEL DTO RELACIONAL:
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
}
