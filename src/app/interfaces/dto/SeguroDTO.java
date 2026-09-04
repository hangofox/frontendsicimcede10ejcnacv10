//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 24/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class SeguroDTO {

    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idSeguro;
    //private Long idAseguradora;
    //private Long idTipoAseguradora;
    private Date fechaHMSInicioSeguro;
    private Date fechaHMSExpiracionSeguro;
    private String estadoSeguro;
    
    private AseguradoraDTO aseguradoraDTO;
    private TipoSeguroDTO tipoSeguroDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DE LAS VARIABLES DECLARADAS DEL DTO EN ORDEN ALFABÉTICO:
    public AseguradoraDTO getAseguradoraDTO() {
        return aseguradoraDTO;
    }
    public void setAseguradoraDTO(AseguradoraDTO aseguradoraDTO) {
        this.aseguradoraDTO = aseguradoraDTO;
    }
    public String getEstadoSeguro() {
        return estadoSeguro;
    }
    public void setEstadoSeguro(String estadoSeguro) {
        this.estadoSeguro = estadoSeguro;
    }
    public Date getFechaHMSExpiracionSeguro() {
        return fechaHMSExpiracionSeguro;
    }
    public void setFechaHMSExpiracionSeguro(Date fechaHMSExpiracionSeguro) {
        this.fechaHMSExpiracionSeguro = fechaHMSExpiracionSeguro;
    }
    public Date getFechaHMSInicioSeguro() {
        return fechaHMSInicioSeguro;
    }
    public void setFechaHMSInicioSeguro(Date fechaHMSInicioSeguro) {
        this.fechaHMSInicioSeguro = fechaHMSInicioSeguro;
    }
    public Long getIdSeguro() {
        return idSeguro;
    }
    public void setIdSeguro(Long idSeguro) {
        this.idSeguro = idSeguro;
    }
    public TipoSeguroDTO getTipoSeguroDTO() {
        return tipoSeguroDTO;
    }
    public void setTipoSeguroDTO(TipoSeguroDTO tipoSeguroDTO) {
        this.tipoSeguroDTO = tipoSeguroDTO;
    }
}
