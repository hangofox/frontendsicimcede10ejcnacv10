import { UnidadesMilitaresI } from "../panel-control/unidades-militares/unidades-militares.interface";
import { SociedadesUnidadesCentralizadorasI } from "./sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface";
import { ClasificacionesEquiposIngenierosI } from "./clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface";
import { SubclasificacionesEquiposIngenierosI } from "./subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface";
import { ElementosSubclasificacionesEquiposIngenierosI } from "./elementos-subclasif-equipos-ing/elementos-subclasif-equipos-ing.interface";
import { TiposAltasEquiposIngenierosI } from "./tipos-altas-equipos-ingenieros/tipos-altas-equipos-ingenieros.interface";

export interface EquiposIngenierosI {
    idEquipoIngeniero?: number;
    denominacionEquipoIngeniero: String;
    numeroInventarioEquipoIngeniero: String;
    numeroActivoFijoEquipoIngeniero: String;
    unidadMilitarDTO: UnidadesMilitaresI;
    centroCostoUnidadMilitarEquipoIngeniero: String;
    sociedadUnidadCentralizadoraDTO: SociedadesUnidadesCentralizadorasI;
    clasificacionEquipoIngenieroDTO: ClasificacionesEquiposIngenierosI;
    subclasificacionEquipoIngenieroDTO: SubclasificacionesEquiposIngenierosI;
    elementoSubclasificacionEquipoIngenieroDTO: ElementosSubclasificacionesEquiposIngenierosI;
    tipoAltaEquipoIngenieroDTO: TiposAltasEquiposIngenierosI;
    marcaEquipoIngeniero: String;
    modeloEquipoIngeniero: String;
    capacidadEquipoIngeniero: String;
    empadronamientoEquipoIngeniero: String;
    numeroPlacaEquipoIngeniero: String;
    fechaHMSMatriculaEquipoIngeniero: String;
    fechaHMSAltaEquipoIngeniero: String;
    valorAdquisicionEquipoIngeniero: String;
    valorContableEquipoIngeniero: String;
    valorDepreciacionEquipoIngeniero: String;
    observacionesEquipoIngeniero: String;
    fechaHMSIngresoEquipoIngeniero: String;
    fechaHMSModificacionEquipoIngeniero: String;
    estadoUsoEquipoIngeniero: String;
}

export interface EquiposIngenierosMsj {
  mensaje: string;
}
