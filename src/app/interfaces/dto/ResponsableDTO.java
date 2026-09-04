//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
//import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/08/2023.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
//Anotacion de lombok que me crea automaticamente los get, set constructor.
public class ResponsableDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idResponsable;
    //private Long idUnidadMilitar;
    private String usuarioRedResponsable;
    //private Long idTipoDocumentoIdentificacion;
    private String numeroDocumentoIdentificacionResponsable;
    private String lugarExpedicionDocumentoIdentificacionResponsable;
    private String gradoResponsable;
    private String nombresResponsable;
    private String primerApellidoResponsable;
    private String segundoApellidoResponsable;
    private String armaResponsable;
    private String nombreArchivoFotoExtensionoFormatoResponsable;
    private Date fechaHMSNacimientoResponsable;
    private String sexoResponsable;
    private String direccionResponsable;
    private String telefonoResponsable;
    private String movilResponsable;
    private String correoElectronicoPersonalResponsable;
    private String correoElectronicoInstitucionalResponsable;
    private String paisOrigenResponsable;
    private String departamentooEstadoOrigenResponsable;
    private String ciudadOrigenResponsable;
    private String numeroCursoResponsable;
    private String puestoCursoResponsable;
    private String escalafonAntiguedadResponsable;
    private Date fechaHMSIncorporacionFFMMResponsable;
    private Date fechaHMSIngresoResponsable;
    private Date fechaHMSModificacionResponsable;
    private String estadoResponsable;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO;
    
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public TipoDocumentoIdentificacionDTO getTipoDocumentoIdentificacionDTO() {
        return tipoDocumentoIdentificacionDTO;
    }
    public void setTipoDocumentoIdentificacionDTO(TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO) {
        this.tipoDocumentoIdentificacionDTO = tipoDocumentoIdentificacionDTO;
    }
}
