import { InformacionFinancieraSolicInfraestI } from "./informacion-financiera-solic-infraest.interface";

export interface ResponseInformacionFinancieraSolicitudInfraestructuraDTO {
    informacionFinancieraSolicitudInfraestructuraDTO: InformacionFinancieraSolicInfraestI;
    mensaje: string;
    banderaexito?: boolean;
}
