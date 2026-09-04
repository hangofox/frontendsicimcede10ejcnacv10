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
public class UsuarioDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idUsuario;
    private String nicknameUsuario;
    private String passwordUsuario;
    //private Long idTipoDocumentoIdentificacion;
    private String numeroDocumentoIdentificacionUsuario;
    private String lugarExpedicionDocumentoIdentificacionUsuario;
    private String gradoUsuario;
    private String nombresUsuario;
    private String primerApellidoUsuario;
    private String segundoApellidoUsuario;
    private String nombreArchivoFotoExtensionoFormatoUsuario;
    private Date fechaHMSNacimientoUsuario;
    private String sexoUsuario;
    private String direccionUsuario;
    private String telefonoUsuario;
    private String movilUsuario;
    private String correoElectronicoPersonalUsuario;
    private String correoElectronicoInstitucionalUsuario;
    private String paisOrigenUsuario;
    private String departamentooEstadoOrigenUsuario;
    private String ciudadOrigenUsuario;
    //private Long idTipoUsuario;
    private Date fechaHMSIngresoUsuario;
    private Date fechaHMSModificacionUsuario;
    private String estadoUsuario;

    private TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO;
    private TipoUsuarioDTO tipoUsuarioDTO;

    public TipoDocumentoIdentificacionDTO getTipoDocumentoIdentificacionDTO() {
        return tipoDocumentoIdentificacionDTO;
    }
    public void setTipoDocumentoIdentificacionDTO(TipoDocumentoIdentificacionDTO tipoDocumentoIdentificacionDTO) {
        this.tipoDocumentoIdentificacionDTO = tipoDocumentoIdentificacionDTO;
    }
    public TipoUsuarioDTO getTipoUsuarioDTO() {
        return tipoUsuarioDTO;
    }
    public void setTipoUsuarioDTO(TipoUsuarioDTO tipoUsuarioDTO) {
        this.tipoUsuarioDTO = tipoUsuarioDTO;
    }
}
