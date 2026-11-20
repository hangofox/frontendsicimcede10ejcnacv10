import { UnidadesMilitaresI } from '../../panel-control/unidades-militares/unidades-militares.interface';
import { SociedadesUnidadesCentralizadorasI } from '../../panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';
import { ClasificacionesEquiposIngenierosI } from '../clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface';
import { SubclasificacionesEquiposIngenierosI } from '../clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface';
import { ElementosSubclasificacionesEquiposIngenierosI } from '../elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface';
import { TiposAltasEquiposIngenierosI } from '../tipos-altas-equipos-ingenieros/tipos-altas-equipos-ingenieros.interface';

//CAMPOS DE EquipoIngenieroDTO (BACKEND). LAS FECHAS SON java.util.Date: SE ENVÍAN COMO yyyy-MM-ddTHH:mm:ss.
export interface EquiposIngenierosI {
  idEquipoIngeniero?: number;
  denominacionEquipoIngeniero: String;
  numeroInventarioEquipoIngeniero: String;
  numeroActivoFijoEquipoIngeniero: String;
  centroCostoUnidadMilitarEquipoIngeniero: String;
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
  unidadMilitarDTO: UnidadesMilitaresI;
  sociedadUnidadCentralizadoraDTO: SociedadesUnidadesCentralizadorasI;
  clasificacionEquipoIngenieroDTO: ClasificacionesEquiposIngenierosI;
  subclasificacionEquipoIngenieroDTO: SubclasificacionesEquiposIngenierosI;
  elementoSubclasificacionEquipoIngenieroDTO: ElementosSubclasificacionesEquiposIngenierosI;
  tipoAltaEquipoIngenieroDTO: TiposAltasEquiposIngenierosI;
}

export interface EquiposIngenierosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. INVENTARIO O ACTIVO FIJO REPETIDO); ESTA BANDERA LO INDICA.
}
