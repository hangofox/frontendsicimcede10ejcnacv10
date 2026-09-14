import { UnidadesMilitaresI } from '../../../panel-control/unidades-militares/unidades-militares.interface';
import { HistorialProveedoresProductosServiciosI } from '../../../panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';

export interface TipoEstructuraInfraestructuraArrendadaI {
  idTipoEstructuraInfraestructuraArrendada?: number;
  nombreTipoEstructuraInfraestructuraArrendada: string;
}

export interface InfraestructurasArrendadasI {
  idInfraestructuraArrendada?: number;
  denominacionInfraestructuraArrendada: string;
  paisOrigenInfraestructuraArrendada: string;
  departamentoOEstadoOrigenInfraestructuraArrendada: string;
  ciudadOrigenInfraestructuraArrendada: string;
  direccionInfraestructuraArrendada: string;
  numeroLargoInfraestructuraArrendada: string;
  nombreUnidadMedidaLargoInfraestructuraArrendada: string;
  numeroAnchuraInfraestructuraArrendada: string;
  nombreUnidadMedidaAnchuraInfraestructuraArrendada: string;
  numeroProfundidadInfraestructuraArrendada: string;
  nombreUnidadMedidaProfundidadInfraestructuraArrendada: string;
  numeroPisosInfraestructuraArrendada: number;
  estadoUsoInfraestructuraArrendada: string;
  latitudInfraestructuraArrendada: string;
  longitudInfraestructuraArrendada: string;
  estratoInfraestructuraArrendada: string;
  fechaHMSIngresoInfraestructuraArrendada?: string;
  fechaHMSModificacionInfraestructuraArrendada?: string;
  historialProveedorProductoOServicioDTO: HistorialProveedoresProductosServiciosI;
  unidadMilitarDTO: UnidadesMilitaresI;
  tipoEstructuraInfraestructuraArrendadaDTO: TipoEstructuraInfraestructuraArrendadaI;
}

export interface InfraestructurasArrendadasMsj { mensaje: string; }
