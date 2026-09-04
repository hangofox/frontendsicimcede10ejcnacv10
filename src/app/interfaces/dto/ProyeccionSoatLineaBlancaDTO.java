//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 08/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class ProyeccionSoatLineaBlancaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idProyeccionSoatLineaBlanca;
    //private Long idEquipoEquipoIngeniero;
    private String valorSolicitadoProyeccionSoatLineaBlanca;
    private Date fechaHMSProyeccionSoatLineaBlanca;
    
    private EquipoIngenieroDTO equipoIngenieroDTO;
    
    public EquipoIngenieroDTO getEquipoIngenieroDTO() {
        return equipoIngenieroDTO;
    }
    public void setEquipoIngenieroDTO(EquipoIngenieroDTO equipoIngenieroDTO) {
        this.equipoIngenieroDTO = equipoIngenieroDTO;
    }
}
