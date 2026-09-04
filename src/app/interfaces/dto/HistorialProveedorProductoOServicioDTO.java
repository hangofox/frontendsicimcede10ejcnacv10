//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 02/06/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA EL DTO.
public class HistorialProveedorProductoOServicioDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialProveedorProductoOServicio;
    private String numRegHistorialProveedorProductoOServicio;
    private String siglaOAcronimoUnidadMilitar;
    private String nombreTipoDocumentoIdentificacion;
    private String numeroDocumentoIdentificacionProvProdOServ;
    private String lugarExpedicionDocumentoIdentificacionProvProdOServ;
    private String nombresProvProdOServ;
    private String primerApellidoProvProdOServ;
    private String segundoApellidoProvProdOServ;
    private String direccionProvProdOServ;
    private String telefonoProvProdOServ;
    private String movilProvProdOServ;
    private String correoElectronicoPersonalProvProdOServ;
    private String correoElectronicoInstitucionalProvProdOServ;
    private String paisOrigenProvProdOServ;
    private String departamentoOEstadoOrigenProvProdOServ;
    private String ciudadOrigenProvProdOServ;
    private Date fechaHMSIngresoProvProdOServ;
    private Date fechaHMSModificacionProvProdOServ;
}
