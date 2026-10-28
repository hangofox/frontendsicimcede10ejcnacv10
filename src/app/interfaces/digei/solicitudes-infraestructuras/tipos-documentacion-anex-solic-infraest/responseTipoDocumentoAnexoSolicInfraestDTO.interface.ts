import { TiposDocumentosAnexosSolicInfraestI } from "./tipos-documentacion-anex-solic-infraest.interface";

export interface ResponseTipoDocumentoAnexoSolicInfraestDTO {
    tipoDocumentoAnexoSolicInfraestDTO: TiposDocumentosAnexosSolicInfraestI;
    mensaje: string;
    banderaexito?: boolean;
}
