//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 22/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class ProyeccionPlanAnualPozoDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idProyeccionPlanAnualPozo;
    private String nombreProyeccionPlanAnualPozo;
    private String nombreYNumeroRubroProyeccionPlanAnualPozo;
    private String valorSolicitadoProyeccionPlanAnualPozo;
    private String nombreBienOServicioProyeccionPlanAnualPozo;
    private String nombreArchivoDocumentoAnexoCotizProyPlAnPozo;
    //private Long idProyeccionPlanAnualAdqGeneral;
    //private Long idTipoMantenimientoPozo;
    //private Long idInfraestructura;
    
    private ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO;
    private TipoMantenimientoPozoDTO tipoMantenimientoPozoDTO;
    private InfraestructuraDTO infraestructuraDTO;
    
    public ProyeccionPlanAnualAdqGeneralDTO getProyeccionPlanAnualAdqGeneralDTO() {
        return proyeccionPlanAnualAdqGeneralDTO;
    }
    public void setProyeccionPlanAnualAdqGeneralDTO(ProyeccionPlanAnualAdqGeneralDTO proyeccionPlanAnualAdqGeneralDTO) {
        this.proyeccionPlanAnualAdqGeneralDTO = proyeccionPlanAnualAdqGeneralDTO;
    }
    public TipoMantenimientoPozoDTO getTipoMantenimientoPozoDTO() {
        return tipoMantenimientoPozoDTO;
    }
    public void setTipoMantenimientoPozoDTO(TipoMantenimientoPozoDTO tipoMantenimientoPozoDTO) {
        this.tipoMantenimientoPozoDTO = tipoMantenimientoPozoDTO;
    }
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
}
