//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 08/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class InfraestructuraArrendadaDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idInfraestructuraArrendada;
    //private Long idHistorialProveedorProductoOServicio;
    private String denominacionInfraestructuraArrendada;
    //private Long idUnidadMilitar;
    //private Long idTipoEstructuraInfraestructuraArrendada;
    private String paisOrigenInfraestructuraArrendada;
    private String departamentoOEstadoOrigenInfraestructuraArrendada;
    private String ciudadOrigenInfraestructuraArrendada;
    private String direccionInfraestructuraArrendada;
    private String numeroLargoInfraestructuraArrendada;
    private String nombreUnidadMedidaLargoInfraestructuraArrendada;
    private String numeroAnchuraInfraestructuraArrendada;
    private String nombreUnidadMedidaAnchuraInfraestructuraArrendada;
    private String numeroProfundidadInfraestructuraArrendada;
    private String nombreUnidadMedidaProfundidadInfraestructuraArrendada;
    private String numeroPisosInfraestructuraArrendada;
    private String estadoUsoInfraestructuraArrendada;
    private String latitudInfraestructuraArrendada;
    private String longitudInfraestructuraArrendada;
    private String estratoInfraestructuraArrendada;
    private Date fechaHMSIngresoInfraestructuraArrendada;
    private Date fechaHMSModificacionInfraestructuraArrendada;
    
    private HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO;
    private UnidadMilitarDTO unidadMilitarDTO;
    private TipoEstructuraInfraestructuraArrendadaDTO tipoEstructuraInfraestructuraArrendadaDTO;
    
    public HistorialProveedorProductoOServicioDTO getHistorialProveedorProductoOServicioDTO() {
        return historialProveedorProductoOServicioDTO;
    }
    public void setHistorialProveedorProductoOServicioDTO(HistorialProveedorProductoOServicioDTO historialProveedorProductoOServicioDTO) {
        this.historialProveedorProductoOServicioDTO = historialProveedorProductoOServicioDTO;
    }
    public UnidadMilitarDTO getUnidadMilitarDTO() {
        return unidadMilitarDTO;
    }
    public void setUnidadMilitarDTO(UnidadMilitarDTO unidadMilitarDTO) {
        this.unidadMilitarDTO = unidadMilitarDTO;
    }
    public TipoEstructuraInfraestructuraArrendadaDTO getTipoEstructuraInfraestructuraArrendadaDTO() {
        return tipoEstructuraInfraestructuraArrendadaDTO;
    }
    public void setTipoEstructuraInfraestructuraArrendadaDTO(TipoEstructuraInfraestructuraArrendadaDTO tipoEstructuraInfraestructuraArrendadaDTO) {
        this.tipoEstructuraInfraestructuraArrendadaDTO = tipoEstructuraInfraestructuraArrendadaDTO;
    }
}
