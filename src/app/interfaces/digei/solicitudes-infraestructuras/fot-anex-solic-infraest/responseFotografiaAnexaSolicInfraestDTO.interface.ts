import { FotografiasAnexasSolicInfraestI } from "./fot-anex-solic-infraest.interface";

export interface ResponseFotografiaAnexaSolicInfraestDTO {
    fotografiaAnexaSolicInfraestDTO: FotografiasAnexasSolicInfraestI;
    mensaje: string;
    banderaexito?: boolean;
}
