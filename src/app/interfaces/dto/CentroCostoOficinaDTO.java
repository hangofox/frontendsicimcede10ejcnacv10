//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
//import com.fasterxml.jackson.annotation.JsonFormat;


/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 18/12/2025.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
//Anotacion de lombok que me crea automaticamente los get, set constructor.
public class CentroCostoOficinaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idCentroCostoOficina;
    //private Long idOficina;
    private String centroCostoOficina;
    
    private OficinaDTO oficinaDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DEL DTO RELACIONAL:
    public OficinaDTO getOficinaDTO() {
        return oficinaDTO;
    }
    public void setOficinaDTO(OficinaDTO oficinaDTO) {
        this.oficinaDTO = oficinaDTO;
    }
}
