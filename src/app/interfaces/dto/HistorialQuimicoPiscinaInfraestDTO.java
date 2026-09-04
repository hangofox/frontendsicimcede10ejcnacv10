//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.sql.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 15/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class HistorialQuimicoPiscinaInfraestDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialQuimicoPiscinaInfraest;
    private String numRegHistorialQuimicoPiscinaInfraest;
    private String nombreHistorialQuimicoPiscinaInfraest;
    private String centroCostoOficinaQuimicoPiscinaInfraest;
    //private Long idOficina;
    //private Long idInfraestructura;
    private Date fechaHMSIngresoQuimicoPiscinaInfraest;
    private Date fechaHMSModificacionQuimicoPiscinaInfraest;
    
    private OficinaDTO oficinaDTO;
    private InfraestructuraDTO infraestructuraDTO;
    
    public OficinaDTO getOficinaDTO() {
        return oficinaDTO;
    }
    public void setOficinaDTO(OficinaDTO oficinaDTO) {
        this.oficinaDTO = oficinaDTO;
    }
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
}
