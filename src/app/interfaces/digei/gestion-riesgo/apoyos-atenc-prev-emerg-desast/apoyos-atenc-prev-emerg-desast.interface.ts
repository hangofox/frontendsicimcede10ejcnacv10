import { UnidadesMilitaresI } from "../../../panel-control/unidades-militares/unidades-militares.interface";
import { TiposEntidadesInstitucionalesI } from "../../../tipos-entidades-institucionales/tipos-entidades-institucionales.interface";
import { TiposRequerimientosApoyosAtencionPrevencionI } from "../tipos-requerimientos-apoy-atenc-prev/tipos-requerimientos-apoy-atenc-prev.interface";
import { ProcesosApoyosAtencionPrevencionI } from "../procesos-apoyos-atenc-prev/procesos-apoyos-atenc-prev.interface";
import { TiposEventosApoyosRealizadosI } from "../tipos-eventos-apoyos-realizados/tipos-eventos-apoyos-realizados.interface";

export interface ApoyosAtencPrevEmergDesastI {
    idApoyoAtencPrevEmergDesast?: number;
    codigoRadicadoApoyoAtencPrevEmergDesast: String;
    unidadMilitarDTO: UnidadesMilitaresI;
    paisOrigenApoyoAtencPrevEmergDesast: String;
    departamentoOEstadoOrigenApoyoAtencPrevEmergDesast: String;
    ciudadOrigenApoyoAtencPrevEmergDesast: String;
    latitudApoyoAtencPrevEmergDesast: String;
    longitudApoyoAtencPrevEmergDesast: String;
    fechaHMSIniciacionApoyoAtencPrevEmergDesast: String;
    fechaHMSFinalizacionApoyoAtencPrevEmergDesast: String;
    tipoEntidadInstitucionalDTO: TiposEntidadesInstitucionalesI;
    nombreEntidadInstitucionalSolicApoyoAtencPrevEmergDesast: String;
    tipoRequerimientoApoyoAtencionPrevencionDTO: TiposRequerimientosApoyosAtencionPrevencionI;
    procesoApoyoAtencionPrevencionDTO: ProcesosApoyosAtencionPrevencionI;
    codigoRadicadoTipoRequerimientoApoyoAtencionPrevencion: String;
    tipoEventoApoyoRealizadoDTO: TiposEventosApoyosRealizadosI;
    numeroHeridosRequerimientoApoyoAtencionPrevencion: number;
    numeroMuertosRequerimientoApoyoAtencionPrevencion: number;
    numeroDesaparecidosRequerimientoApoyoAtencionPrevencion: number;
    numeroViviendasAfectadasRequerimientoApoyoAtencionPrevencion: number;
    numeroPuentesAfectadosRequerimientoApoyoAtencionPrevencion: number;
    numeroViasAfectadasRequerimientoApoyoAtencionPrevencion: number;
    numeroHectareasAfectadasRequerimientoApoyoAtencionPrevencion: number;
    descripcionAfectacionApoyoAtencPrevEmergDesast?: String;
}

export interface ApoyosAtencPrevEmergDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
