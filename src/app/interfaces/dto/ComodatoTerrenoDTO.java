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
public class ComodatoTerrenoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idComodatoTerreno;
    private Date fechaHMSIniciacionComodatoTerreno;
    private Date fechaHMSFinalizacionComodatoTerreno;
    private String estadoTerreno;
    //private Long idTerreno;
    //private Long idHistorialProveedorProductoOServicio;
    
    private TerrenoDTO terrenoDTO;
    private HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO;
    
    public TerrenoDTO getTerrenoDTO() {
        return terrenoDTO;
    }
    public void setTerrenoDTO(TerrenoDTO terrenoDTO) {
        this.terrenoDTO = terrenoDTO;
    }
    public HistorialProveedorProductoOServicioDTO getHistorialProveedorProductoOServicioDTO() {
        return historialProveedorProductoOServicioDTO;
    }
    public void setHistorialProveedorProductoOServicioDTO(HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO) {
        this.historialProveedorProductoOServicioDTO = historialProveedorProductoOServicioDTO;
    }
}
