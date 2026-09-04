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
public class ContratoProyeccionSeguroInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idContratoProyeccionSeguroInfraestructura;
    private String numeroContratoSeguroInfraestructura;
    private Date fechaHMSContratoProyeccionSeguroInfraestructura;
    private String descripcionContratoProyeccionSeguroInfraestructura;
    //private Long idProyeccionSeguroInfraestructura;
    //private Long idTipoContratoSeguroInfraestructura;
    //private Long idTipoResponsabilidadContractual;
    
    private ProyeccionSeguroInfraestructuraDTO proyeccionSeguroInfraestructuraDTO;
    private TipoContratoSeguroInfraestructuraDTO tipoContratoSeguroInfraestructuraDTO;
    private TipoResponsabilidadContractualDTO tipoResponsabilidadContractualDTO;
    
    public ProyeccionSeguroInfraestructuraDTO getProyeccionSeguroInfraestructuraDTO() {
        return proyeccionSeguroInfraestructuraDTO;
    }
    public void setProyeccionSeguroInfraestructuraDTO(ProyeccionSeguroInfraestructuraDTO proyeccionSeguroInfraestructuraDTO) {
        this.proyeccionSeguroInfraestructuraDTO = proyeccionSeguroInfraestructuraDTO;
    }
    public TipoContratoSeguroInfraestructuraDTO getTipoContratoSeguroInfraestructuraDTO() {
        return tipoContratoSeguroInfraestructuraDTO;
    }
    public void setTipoContratoSeguroInfraestructuraDTO(TipoContratoSeguroInfraestructuraDTO tipoContratoSeguroInfraestructuraDTO) {
        this.tipoContratoSeguroInfraestructuraDTO = tipoContratoSeguroInfraestructuraDTO;
    }
    public TipoResponsabilidadContractualDTO getTipoResponsabilidadContractualDTO() {
        return tipoResponsabilidadContractualDTO;
    }
    public void setTipoResponsabilidadContractualDTO(TipoResponsabilidadContractualDTO tipoResponsabilidadContractualDTO) {
        this.tipoResponsabilidadContractualDTO = tipoResponsabilidadContractualDTO;
    }
}
