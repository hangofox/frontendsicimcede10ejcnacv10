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
public class AseguramientoLineaBlancaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idAseguramientoLineaBlanca;
    private String numeroSeguroAseguramientoLineaBlanca;
    private Date fechaHMSIniciacionAseguramientoLineaBlanca;
    private Date fechaHMSFinalizacionAseguramientoLineaBlanca;
    //private Long idEquipoIngeniero;
    //private Long idAseguradora;
    //private Long idTipoResponsabilidadContractual;
    private String valorSolicitadoAseguramientoLineaBlanca;
    
    private EquipoIngenieroDTO equipoIngenieroDTO;
    private AseguradoraDTO aseguradoraDTO;
    private TipoResponsabilidadContractualDTO tipoResponsabilidadContractualDTO;
    
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
    public TipoResponsabilidadContractualDTO getTipoResponsabilidadContractualDTO() {
        return tipoResponsabilidadContractualDTO;
    }
    public void setTipoResponsabilidadContractualDTO(TipoResponsabilidadContractualDTO tipoResponsabilidadContractualDTO) {
        this.tipoResponsabilidadContractualDTO = tipoResponsabilidadContractualDTO;
    }
}
