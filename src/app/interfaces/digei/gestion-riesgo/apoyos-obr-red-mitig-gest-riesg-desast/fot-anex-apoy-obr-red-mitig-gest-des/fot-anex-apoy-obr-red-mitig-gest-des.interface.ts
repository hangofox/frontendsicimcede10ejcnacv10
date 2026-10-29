import { ApoyosObrRedMitigGestRiesgDesastI } from "../apoyos-obr-red-mitig-gest-riesg-desast.interface";

export interface FotografiasAnexasApoyObrRedMitigGestRiesgDesastI {
    idFotografiasAnexasApoyObrRedMitigGestRiesgDesast?: number;
    apoyoObrRedMitigGestRiesgDesastDTO: ApoyosObrRedMitigGestRiesgDesastI;
    //LAS DOS COLUMNAS SON CLOB NULL EN ORACLE: CADA UNA GUARDA SOLO EL NOMBRE DEL ARCHIVO (EJ. "FOTO_OBRA_02_CBRICC_GAVIONES_RIO_GUATIQUIA_ANTES.jpg"):
    nombreArchivoFotoExtensionOFormatoApoyObrRedMitigGestRiesgDesast1?: String | null;
    nombreArchivoFotoExtensionOFormatoApoyObrRedMitigGestRiesgDesast2?: String | null;
}

export interface FotografiasAnexasApoyObrRedMitigGestRiesgDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
