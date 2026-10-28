import { TiposFuentesFinanciacionI } from "./tipos-fuentes-financiacion.interface";

export interface ResponseTipoFuenteFinanciacionDTO {
    tipoFuenteFinanciacionDTO: TiposFuentesFinanciacionI;
    mensaje: string;
    banderaexito?: boolean;
}
