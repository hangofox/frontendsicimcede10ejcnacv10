import { ApoyosObrRedMitigGestRiesgDesastI } from "../apoyos-obr-red-mitig-gest-riesg-desast.interface";

export interface IntegrantesApoyosObrRedMitigGestRiesgDesastI {
    idIntegrantesApoyosObrRedMitigGestRiesgDesast?: number;
    apoyoObrRedMitigGestRiesgDesastDTO: ApoyosObrRedMitigGestRiesgDesastI;
    //JEFE DE SECCIÓN TÉCNICA DE LA UNIDAD MILITAR:
    gradoJefeSeccionTecnicaUnidadMilitar?: String | null;
    nombresJefeSeccionTecnicaUnidadMilitar?: String | null;
    primerApellidoJefeSeccionTecnicaUnidadMilitar?: String | null;
    segundoApellidoJefeSeccionTecnicaUnidadMilitar?: String | null;
    //LAS COLUMNAS DE FIRMAS SON CLOB NULL EN ORACLE: CADA UNA GUARDA SOLO EL NOMBRE DEL ARCHIVO (EJ. "FIRMA_OBRA_1_CAOCC_JST_20261027153000.png"):
    nombreArchivoFotoFirmaJefeSeccionTecnicaUnidadMilitar?: String | null;
    cargoJefeSeccionTecnicaUnidadMilitar?: String | null;
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

export interface IntegrantesApoyosObrRedMitigGestRiesgDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
