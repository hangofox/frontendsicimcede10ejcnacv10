import { UnidadesMilitaresI } from '../../../panel-control/unidades-militares/unidades-militares.interface';
import { TiposDespejesMilitaresArtefactosExplosivosI } from '../../tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';

//CAMPOS DE MaterialTecnicoDTO (BACKEND). LAS FECHAS SON java.util.Date: SE ENVÍAN COMO yyyy-MM-ddTHH:mm:ss.
export interface MaterialesTecnicosI {
  idMaterialTecnico?: number;
  nombreMaterialTecnico: String;
  serialMaterialTecnico: String;
  numeroInventarioMaterialTecnico: String;
  numeroActivoFijoMaterialTecnico: String;
  valorAdquisicionMaterialTecnico: String;
  valorContableMaterialTecnico: String;
  valorCostoUnitarioMaterialTecnico: String;
  codigoContableMaterialTecnico: String;
  centroCostoUnidadMilitar: String;
  fechaHMSAltaMaterialTecnico: String;
  tiempoAnualVidaUtilMaterialTecnico: String;
  fechaHMSIngresoMaterialTecnico: String;
  fechaHMSModificacionMaterialTecnico: String;
  estadoUsoMaterialTecnico: String;
  unidadMilitarDTO: UnidadesMilitaresI;
  tipoDespejeMilitarArtefactoExplosivoDTO: TiposDespejesMilitaresArtefactosExplosivosI;
}

export interface MaterialesTecnicosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. INVENTARIO O ACTIVO FIJO REPETIDO); ESTA BANDERA LO INDICA.
}
