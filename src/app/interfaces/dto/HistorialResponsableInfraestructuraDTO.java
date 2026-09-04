//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;
import java.util.Date;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 14/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA EL DTO.
public class HistorialResponsableInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idHistorialResponsableInfraestructura;
    private String numRegHistorialResponsableInfraestructura;
    private String siglaOAcronimoUnidadMilitar;
    private String nombreTipoDocumentoIdentificacion;
    private String numeroDocumentoIdentificacionResponsable;
    private String lugarExpedicionDocumentoIdentificacionResponsable;
    private String gradoResponsable;
    private String nombresResponsable;
    private String primerApellidoResponsable;
    private String segundoApellidoResponsable;
    private String siONoActualResponsablePredeterminado;
    private String numeroCursoResponsable;
    private String puestoCursoResponsable;
    private String escalafonAntiguedadResponsable;
    //private Long idInfraestructura;
    private Date fechaHMSIngresoResponsable;
    private Date fechaHMSModificacionResponsable;
    
    private InfraestructuraDTO infraestructuraDTO;
    
    public InfraestructuraDTO getInfraestructuraDTO() {
        return infraestructuraDTO;
    }
    public void setInfraestructuraDTO(InfraestructuraDTO infraestructuraDTO) {
        this.infraestructuraDTO = infraestructuraDTO;
    }
}
