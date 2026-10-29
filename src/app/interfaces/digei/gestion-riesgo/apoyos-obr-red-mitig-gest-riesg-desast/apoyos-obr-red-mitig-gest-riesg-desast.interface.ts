import { UnidadesMilitaresI } from "../../../panel-control/unidades-militares/unidades-militares.interface";
import { TiposEntidadesInstitucionalesI } from "../../../tipos-entidades-institucionales/tipos-entidades-institucionales.interface";
import { TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI } from "../tipos-em-desast-gen-obr-red-mitig/tipos-em-desast-gen-obr-red-mitig.interface";

export interface ApoyosObrRedMitigGestRiesgDesastI {
    idApoyoObrRedMitigGestRiesgDesast?: number;
    codigoRadicadoApoyoObrRedMitigGestRiesgDesast: String;
    unidadMilitarDTO: UnidadesMilitaresI;
    paisOrigenApoyoObrRedMitigGestRiesgDesast: String;
    departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast: String;
    ciudadOrigenApoyoObrRedMitigGestRiesgDesast: String;
    latitudApoyoObrRedMitigGestRiesgDesast: String;
    longitudApoyoObrRedMitigGestRiesgDesast: String;
    fechaHMSIniciacionApoyoObrRedMitigGestRiesgDesast: String;
    fechaHMSFinalizacionApoyoObrRedMitigGestRiesgDesast: String;
    tipoEntidadInstitucionalDTO: TiposEntidadesInstitucionalesI;
    nombreEntidadInstitucionalSolicApoyoObrRedMitigGestRiesgDesast: String;
    codigoRadicadoHrOficioAutorizacionCdoIngApoyoObrRedMitigGestRiesgDesast: String;
    tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO: TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI;
    numeroPobBenefApoyoObrRedMitigGestRiesgDesast: number;
    descripcionObrApoyoObrRedMitigGestRiesgDesast?: String;
}

export interface ApoyosObrRedMitigGestRiesgDesastMsj {
  mensaje: string;
  banderaexito?: boolean;
}
