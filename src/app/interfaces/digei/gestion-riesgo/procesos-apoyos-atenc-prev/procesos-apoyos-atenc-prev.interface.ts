import { TiposRequerimientosApoyosAtencionPrevencionI } from "../tipos-requerimientos-apoy-atenc-prev/tipos-requerimientos-apoy-atenc-prev.interface";

export interface ProcesosApoyosAtencionPrevencionI {
    idProcesoApoyoAtencionPrevencion?: number;
    nombreProcesoApoyoAtencionPrevencion: String;
    tipoRequerimientoApoyoAtencionPrevencionDTO: TiposRequerimientosApoyosAtencionPrevencionI;
}

export interface ProcesosApoyosAtencionPrevencionMsj {
  mensaje: string;
}
