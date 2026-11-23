import { DocumentacionAnexaSolicInfraestI } from "./documentacion-anex-solic-infraest.interface";

export interface ResponseDocumentacionAnexaSolicInfraestDTO {
    documentacionAnexaSolicInfraestDTO: DocumentacionAnexaSolicInfraestI;
    mensaje: string;
    banderaexito?: boolean;
}
