import { ApoyosAtencPrevEmergDesastI } from "../apoyos-atenc-prev-emerg-desast.interface";

export interface IntegrantesApoyosAtencPrevEmergDesastI {
    idIntegrantesApoyosAtencPrevEmergDesast?: number;
    apoyoAtencPrevEmergDesastDTO: ApoyosAtencPrevEmergDesastI;
    //JEFE DE GESTIÓN DEL RIESGO DE LA UNIDAD MILITAR:
    gradoJefeGestionRiesgoUnidadMilitar?: String | null;
    nombresJefeGestionRiesgoUnidadMilitar?: String | null;
    primerApellidoJefeGestionRiesgoUnidadMilitar?: String | null;
    segundoApellidoJefeGestionRiesgoUnidadMilitar?: String | null;
    //LAS COLUMNAS DE FIRMAS SON CLOB NULL EN ORACLE: CADA UNA GUARDA SOLO EL NOMBRE DEL ARCHIVO (EJ. "FIRMA_APOY_1_CAOCC_JGR_20261027153000.png"):
    nombreArchivoFotoFirmaJefeGestionRiesgoUnidadMilitar?: String | null;
    cargoJefeGestionRiesgoUnidadMilitar?: String | null;
    //JEFE DE OPERACIONES DE LA UNIDAD MILITAR:
    gradoJefeOperacionesUnidadMilitar?: String | null;
    nombresJefeOperacionesUnidadMilitar?: String | null;
    primerApellidoJefeOperacionesUnidadMilitar?: String | null;
    segundoApellidoJefeOperacionesUnidadMilitar?: String | null;
    nombreArchivoFotoFirmaJefeOperacionesUnidadMilitar?: String | null;
    cargoJefeOperacionesUnidadMilitar?: String | null;
    //COMANDANTE DE LA UNIDAD MILITAR:
    gradoCteUnidadMilitar?: String | null;
    nombresCteUnidadMilitar?: String | null;
    primerApellidoCteUnidadMilitar?: String | null;
    segundoApellidoCteUnidadMilitar?: String | null;
    nombreArchivoFotoFirmaCteUnidadMilitar?: String | null;
    cargoCteUnidadMilitar?: String | null;
}

export interface IntegrantesApoyosAtencPrevEmergDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
