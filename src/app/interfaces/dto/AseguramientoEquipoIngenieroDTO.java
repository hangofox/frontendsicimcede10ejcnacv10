//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 31/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS RESPONSE DE LOS DTO.
public class AseguramientoEquipoIngenieroDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE RESPUESTA DEL DTO:
    private Long idAseguramientoEquipoIngeniero;
    //private Long idEquipoIngeniero;
    private Date fechaHMSIniciacionAseguramientoEquipoIngeniero;
    private Date fechaHMSFinalizacionAseguramientoEquipoIngeniero;
    //private Long idAseguradora;
    private String numeroSeguroAseguramientoEquipoIngeniero;
    private String valorSolicitadoAseguramientoEquipoIngeniero;

    private EquipoIngenieroDTO equipoIngenieroDTO;
    private AseguradoraDTO aseguradoraDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DE LAS LLAVES FORANEAS DE LAS VARIABLES DE RESPUESTA DECLARADAS DEL DTO:
    public EquipoIngenieroDTO getEquipoIngenieroDTO() {
        return equipoIngenieroDTO;
    }
    public void setEquipoIngenieroDTO(EquipoIngenieroDTO equipoIngenieroDTO) {
        this.equipoIngenieroDTO = equipoIngenieroDTO;
    }
    public AseguradoraDTO getAseguradoraDTO() {
        return aseguradoraDTO;
    }
    public void setAseguradoraDTO(AseguradoraDTO aseguradoraDTO) {
        this.aseguradoraDTO = aseguradoraDTO;
    }
}
