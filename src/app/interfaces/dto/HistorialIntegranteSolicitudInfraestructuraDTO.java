//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 20/10/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA EL DTO.
public class HistorialIntegranteSolicitudInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialIntegranteSolicitudInfraestructura;
    private String numRegHistorialIntegranteSolicitudInfraestructura;
    private SolicitudInfraestructuraDTO solicitudInfraestructuraDTO;
    private UnidadMilitarDTO unidadMilitarDTO;
    private String gradoIntegranteSolicitudInfraestructura;
    private String nombresIntegranteSolicitudInfraestructura;
    private String primerApellidoIntegranteSolicitudInfraestructura;
    private String segundoApellidoIntegranteSolicitudInfraestructura;
    private String nombreArchivoFotoFirmaIntegranteSolicitudInfraestructura;
    private String cargoIntegranteSolicitudInfraestructura;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DEL DTO RELACIONAL:
    public SolicitudInfraestructuraDTO getSolicitudInfraestructuraDTO() {
        return solicitudInfraestructuraDTO;
    }
    public void setSolicitudInfraestructuraDTO(SolicitudInfraestructuraDTO solicitudInfraestructuraDTO) {
        this.solicitudInfraestructuraDTO = solicitudInfraestructuraDTO;
    }
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
}
