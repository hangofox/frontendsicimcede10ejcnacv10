import { ApoyosAtencPrevEmergDesastI } from "../apoyos-atenc-prev-emerg-desast.interface";

export interface FotografiasAnexasApoyAtencPrevEmergDesastI {
    idFotografiasAnexasApoyAtencPrevEmergDesast?: number;
    apoyoAtencPrevEmergDesastDTO: ApoyosAtencPrevEmergDesastI;
    //LAS CUATRO COLUMNAS SON CLOB NULL EN ORACLE: CADA UNA GUARDA SOLO EL NOMBRE DEL ARCHIVO (EJ. "FOTO_APOY_1_CAOCC_1_20261027153000.jpg"):
    nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast1?: String | null;
    nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast2?: String | null;
    nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast3?: String | null;
    nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast4?: String | null;
}

export interface FotografiasAnexasApoyAtencPrevEmergDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
