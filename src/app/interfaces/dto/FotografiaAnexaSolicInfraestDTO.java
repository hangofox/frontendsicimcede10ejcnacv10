//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 31/03/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS RESPONSE DE LOS DTO.
public class FotografiaAnexaSolicInfraestDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DE RESPUESTA DEL DTO:
    private Long idFotografiasAnexasSolicInfraest;
    //private Long idSolicitudInfraestructura;
    private String nombreArchivoFotoExtensionOFormatoPosibLocEdifSolicInfraest;
    private String nombreArchivoFotoExtensionOFormatoVistaPanGrSolicInfraest;
    private String nombreArchivoFotoExtensionOFormatoVistaSolicInfraest1;
    private String nombreArchivoFotoExtensionOFormatoVistaSolicInfraest2;
    private String nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest1;
    private String nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest2;
    private String nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest1;
    private String nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest2;
    
    private SolicitudInfraestructuraDTO solicitudInfraestructuraDTO;
    
    //DECLARACIÓN DE LOS MÉTODOS SETTERS Y GETTERS DE LAS LLAVES FORANEAS DE LAS VARIABLES DE RESPUESTA DECLARADAS DEL DTO:
    public SolicitudInfraestructuraDTO getSolicitudInfraestructuraDTO() {
        return solicitudInfraestructuraDTO;
    }
    public void setSolicitudInfraestructuraDTO(SolicitudInfraestructuraDTO solicitudInfraestructuraDTO) {
        this.solicitudInfraestructuraDTO = solicitudInfraestructuraDTO;
    }
}
