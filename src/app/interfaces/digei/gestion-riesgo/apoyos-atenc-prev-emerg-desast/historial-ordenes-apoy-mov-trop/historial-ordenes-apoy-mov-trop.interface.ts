import { ApoyosAtencPrevEmergDesastI } from "../apoyos-atenc-prev-emerg-desast.interface";

export interface HistorialOrdenApoyoMovimientoTropaI {
    idHistorialOrdenApoyoMovimientoTropa?: number;
    numRegHistorialOrdenApoyoMovimientoTropa: String;
    apoyoAtencPrevEmergDesastDTO: ApoyosAtencPrevEmergDesastI;
    numeroOficioHrOrdenApoyoMovimientoTropa: String;
    asuntoOrdenApoyoMovimientoTropa: String;
}

export interface HistorialOrdenApoyoMovimientoTropaMsj {
  mensaje: string;
  banderaexito?: boolean;
}
