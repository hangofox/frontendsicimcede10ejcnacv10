import { PelotonesUnidadesMilitaresI } from '../../../panel-control/pelotones-unidades-militares/pelotones-unidades-militares.interface';
import { TiposDespejesMilitaresArtefactosExplosivosI } from '../../tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';

//CAMPOS DE MunicionEspecialDTO (BACKEND). LAS FECHAS SON java.util.Date: SE ENVÍAN COMO yyyy-MM-ddTHH:mm:ss.
export interface MunicionesEspecialesI {
  idMunicionEspecial?: number;
  nombreMunicionEspecial: String;
  cantidadMunicionEspecial: String;
  loteMunicionEspecial: String;
  valorAdquisicionMunicionEspecial: String;
  valorContableMunicionEspecial: String;
  fechaHMSAltaMunicionEspecial: String;
  centroCostoPelotonUnidadMilitar: String;
  fechaHMSIngresoMunicionEspecial: String;
  fechaHMSModificacionMunicionEspecial: String;
  estadoMunicionEspecial: String;
  pelotonUnidadMilitarDTO: PelotonesUnidadesMilitaresI;
  tipoDespejeMilitarArtefactoExplosivoDTO: TiposDespejesMilitaresArtefactosExplosivosI;
}

export interface MunicionesEspecialesMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. NOMBRE Y LOTE REPETIDOS); ESTA BANDERA LO INDICA.
}
