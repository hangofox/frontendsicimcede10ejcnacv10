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
public class PrivilegyRestriccAccesoUsuarioDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE LOS CAMPOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO:
    private Long idPrivilegioyRestriccionAccesoUsuario;
    private String numeroRegistroPrivilegioyRestriccionAccesoUsuario;
    //private Long idUnidadMilitar;
    //private Long idUsuario;
    //private Long idFuncionalidad;
    //private Long idRol;
    private String urlAccesoUsuario;
    private String sioNoPrivilegioyRestriccionAccesoUsuario;
    private Date fechaHMSIngresoPrivilegioyRestriccionAccesoUsuario;
    
    private UnidadMilitarDTO unidadMilitarDTO;
    private UsuarioDTO usuarioDTO;
    private FuncionalidadDTO funcionalidadDTO;
    private RolDTO rolDTO;
    
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public UsuarioDTO getUsuarioDTO() {
        return usuarioDTO;
    }
    public void setUsuarioDTO(UsuarioDTO usuarioDTO) {
        this.usuarioDTO = usuarioDTO;
    }
    public FuncionalidadDTO getFuncionalidadDTO() {
        return funcionalidadDTO;
    }
    public void setFuncionalidadDTO(FuncionalidadDTO funcionalidadDTO) {
        this.funcionalidadDTO = funcionalidadDTO;
    }
    public RolDTO getRolDTO() {
        return rolDTO;
    }
    public void setRolDTO(RolDTO rolDTO) {
        this.rolDTO = rolDTO;
    }
}