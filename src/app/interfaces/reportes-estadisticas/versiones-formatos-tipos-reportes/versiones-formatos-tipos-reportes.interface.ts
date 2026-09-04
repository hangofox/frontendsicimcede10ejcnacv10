import { TiposReportesI } from "../tipos-reportes/tipos-reportes.interface";

export interface VersionesFormatosTiposReportesI {
    idVersionFormatoTipoReporte?: number;
    nombreVersionFormatoTipoReporte: String;
    tipoReporteDTO: TiposReportesI;
}

export interface VersionesFormatosTiposReportesMsj {
    mensaje: string;
}