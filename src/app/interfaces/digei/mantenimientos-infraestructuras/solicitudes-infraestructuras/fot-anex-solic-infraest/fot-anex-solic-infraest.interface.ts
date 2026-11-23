import { SolicitudesInfraestructurasI } from "../solicitudes-infraestructuras.interface";

//MISMOS CAMPOS Y NOMBRES EXACTOS QUE FotografiaAnexaSolicInfraestDTO.java, EN EL ORDEN DE LA TABLA
//TABLA_FOTOGRAFIAS_ANEXAS_SOLIC_INFRAEST (UN SOLO REGISTRO POR SOLICITUD, CON OCHO FOTOGRAFÍAS):
export interface FotografiasAnexasSolicInfraestI {
    idFotografiasAnexasSolicInfraest?: number;
    solicitudInfraestructuraDTO: SolicitudesInfraestructurasI;
    //LAS OCHO COLUMNAS SON CLOB NULL EN ORACLE: CADA UNA GUARDA SOLO EL NOMBRE DEL ARCHIVO (EJ. "FOTO_UBIC_CAOCC_ALOJ_TROPA.jpg"):
    nombreArchivoFotoExtensionOFormatoPosibLocEdifSolicInfraest?: String | null;
    nombreArchivoFotoExtensionOFormatoVistaPanGrSolicInfraest?: String | null;
    nombreArchivoFotoExtensionOFormatoVistaSolicInfraest1?: String | null;
    nombreArchivoFotoExtensionOFormatoVistaSolicInfraest2?: String | null;
    nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest1?: String | null;
    nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest2?: String | null;
    nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest1?: String | null;
    nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest2?: String | null;
}

export interface FotografiasAnexasSolicInfraestMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
