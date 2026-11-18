import { CompaniasUnidadesMilitaresI } from '../../../panel-control/companias-unidades-militares/companias-unidades-militares.interface';
import { TiposDespejesMilitaresArtefactosExplosivosI } from '../../tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';

//CAMPOS DE CaninoDTO (BACKEND). LAS FECHAS SON java.util.Date: SE ENVÍAN COMO yyyy-MM-ddTHH:mm:ss.
export interface CaninosI {
  idCanino?: number;
  denominacionCanino: String;
  numeroChipCanino: String;
  numeroInventarioCanino: String;
  numeroActivoFijoCanino: String;
  nombreCanino: String;
  colorCanino: String;
  nombreRazaCanino: String;//CAMPO PARAMÉTRICO: SE TOMA DEL CATÁLOGO DE RAZAS DE CANINOS (PANEL DE CONTROL).
  valorAdquisicionCanino: String;
  valorContableCanino: String;
  valorCostoUnitarioCanino: String;
  centroCostoCompaniaUnidadMilitar: String;
  fechaHMSAltaCanino: String;
  tiempoAnualVidaUtilCanino: String;
  descripcionCanino: String;
  fechaHMSIngresoCanino: String;
  fechaHMSModificacionCanino: String;
  estadoUsoCanino: String;
  companiaUnidadMilitarDTO: CompaniasUnidadesMilitaresI;
  tipoDespejeMilitarArtefactoExplosivoDTO: TiposDespejesMilitaresArtefactosExplosivosI;
}

export interface CaninosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. CHIP, INVENTARIO O ACTIVO FIJO REPETIDO); ESTA BANDERA LO INDICA.
}
