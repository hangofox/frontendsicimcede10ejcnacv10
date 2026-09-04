//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto;

//IMPORTACIÓN DE LIBRERIAS:
import lombok.Data;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 01/04/2026.
* Declaración del método DTO.
*/
@Data//DECLARACIÓN DE LA DATA PARA LOS DATOS DE LA TABLA DE LA BASE DE DATOS PARA LOS DTO.
public class IntegrantesSolicitudesInfraestructuraDTO {
    
    //DECLARACIÓN DE LAS VARIABLES DEL DTO:
    private Long idIntegrantesSolicitudesInfraestructura;
    //private Long idSolicitudInfraestructura;
    private String gradoJefeGestionIngenierosBatallon;
    private String nombresJefeGestionIngenierosBatallon;
    private String primerApellidoJefeGestionIngenierosBatallon;
    private String segundoApellidoJefeGestionIngenierosBatallon;
    private String nombreArchivoFotoFirmaJefeGestionIngenierosBatallon;
    private String cargoJefeGestionIngenierosBatallon;
    private String gradoCteBatallon;
    private String nombresCteBatallon;
    private String primerApellidoCteBatallon;
    private String segundoApellidoCteBatallon;
    private String nombreArchivoFotoFirmaCteBatallon;
    private String cargoCteBatallon;
    private String gradoFincaRaizBr;
    private String nombresFincaRaizBr;
    private String primerApellidoFincaRaizBr;
    private String segundoApellidoFincaRaizBr;
    private String nombreArchivoFotoFirmaFincaRaizBr;
    private String cargoFincaRaizBr;
    private String gradoJefeGestionIngenierosBr;
    private String nombresJefeGestionIngenierosBr;
    private String primerApellidoJefeGestionIngenierosBr;
    private String segundoApellidoJefeGestionIngenierosBr;
    private String nombreArchivoFotoFirmaJefeGestionIngenierosBr;
    private String cargoJefeGestionIngenierosBr;
    private String gradoCteOJem2doCteBr;
    private String nombresCteOJem2doCteBr;
    private String primerApellidoCteOJem2doCteBr;
    private String segundoApellidoCteOJem2doCteBr;
    private String nombreArchivoFotoFirmaCteOJem2doCteBr;
    private String cargoCteOJem2doCteBr;
    private String gradoFincaRaizDiv;
    private String nombresFincaRaizDiv;
    private String primerApellidoFincaRaizDiv;
    private String segundoApellidoFincaRaizDiv;
    private String nombreArchivoFotoFirmaFincaRaizDiv;
    private String cargoFincaRaizDiv;
    private String gradoJefeGestionIngenierosDiv;
    private String nombresJefeGestionIngenierosDiv;
    private String primerApellidoJefeGestionIngenierosDiv;
    private String segundoApellidoJefeGestionIngenierosDiv;
    private String nombreArchivoFotoFirmaJefeGestionIngenierosDiv;
    private String cargoJefeGestionIngenierosDiv;
    private String gradoCteDiv;
    private String nombresCteDiv;
    private String primerApellidoCteDiv;
    private String segundoApellidoCteDiv;
    private String nombreArchivoFotoFirmaCteDiv;
    private String cargoCteDiv;
    private String gradoFincaRaizComando;
    private String nombresFincaRaizComando;
    private String primerApellidoFincaRaizComando;
    private String segundoApellidoFincaRaizComando;
    private String nombreArchivoFotoFirmaFincaRaizComando;
    private String cargoFincaRaizComando;
    private String gradoJefeGestionIngenierosComando;
    private String nombresJefeGestionIngenierosComando;
    private String primerApellidoJefeGestionIngenierosComando;
    private String segundoApellidoJefeGestionIngenierosComando;
    private String nombreArchivoFotoFirmaJefeGestionIngenierosComando;
    private String cargoJefeGestionIngenierosComando;
    private String gradoCteComando;
    private String nombresCteComando;
    private String primerApellidoCteComando;
    private String segundoApellidoCteComando;
    private String nombreArchivoFotoFirmaCteComando;
    private String cargoCteComando;
    private String gradoFincaRaizCede;
    private String nombresFincaRaizCede;
    private String primerApellidoFincaRaizCede;
    private String segundoApellidoFincaRaizCede;
    private String nombreArchivoFotoFirmaFincaRaizCede;
    private String cargoFincaRaizCede;
    private String gradoJefeGestionIngenierosCede;
    private String nombresJefeGestionIngenierosCede;
    private String primerApellidoJefeGestionIngenierosCede;
    private String segundoApellidoJefeGestionIngenierosCede;
    private String nombreArchivoFotoFirmaJefeGestionIngenierosCede;
    private String cargoJefeGestionIngenierosCede;
    private String gradoCteCede;
    private String nombresCteCede;
    private String primerApellidoCteCede;
    private String segundoApellidoCteCede;
    private String nombreArchivoFotoFirmaCteCede;
    private String cargoCteCede;
    private String gradoFincaRaizJef;
    private String nombresFincaRaizJef;
    private String primerApellidoFincaRaizJef;
    private String segundoApellidoFincaRaizJef;
    private String nombreArchivoFotoFirmaFincaRaizJef;
    private String cargoFincaRaizJef;
    private String gradoJefeGestionIngenierosJef;
    private String nombresJefeGestionIngenierosJef;
    private String primerApellidoJefeGestionIngenierosJef;
    private String segundoApellidoJefeGestionIngenierosJef;
    private String nombreArchivoFotoFirmaJefeGestionIngenierosJef;
    private String cargoJefeGestionIngenierosJef;
    private String gradoCteJef;
    private String nombresCteJef;
    private String primerApellidoCteJef;
    private String segundoApellidoCteJef;
    private String nombreArchivoFotoFirmaCteJef;
    private String cargoCteJef;
    
    private SolicitudInfraestructuraDTO solicitudInfraestructuraDTO;
    
    public SolicitudInfraestructuraDTO getSolicitudInfraestructuraDTO() {
        return solicitudInfraestructuraDTO;
    }
    public void setSolicitudInfraestructuraDTO(SolicitudInfraestructuraDTO solicitudInfraestructuraDTO) {
        this.solicitudInfraestructuraDTO = solicitudInfraestructuraDTO;
    }
}
