//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/08/2023.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
//Anotacion de lombok que me crea automaticamente los get, set constructor.
public class CiudadMundoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idCiudadMundo;
    private String nombreCiudadMundo;
    
    private PaisMundoDTO paisMundoDTO;
    private DepartamentooEstadoMundoDTO departamentooEstadoMundoDTO;
    
    public PaisMundoDTO getPaisMundoDTO() {
        return paisMundoDTO;
    }
    public void setPaisMundoDTO(PaisMundoDTO paisMundoDTO) {
        this.paisMundoDTO = paisMundoDTO;
    }
    public DepartamentooEstadoMundoDTO getDepartamentooEstadoMundoDTO() {
        return departamentooEstadoMundoDTO;
    }
    public void setDepartamentooEstadoMundoDTO(DepartamentooEstadoMundoDTO departamentooEstadoMundoDTO) {
        this.departamentooEstadoMundoDTO = departamentooEstadoMundoDTO;
    }
}