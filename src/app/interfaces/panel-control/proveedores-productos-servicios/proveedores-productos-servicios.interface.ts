import { TiposDocumentosIdentificacionI } from '../../tipos-documentos-identificacion/tipos-documentos-identificacion.interface';

export interface ProveedoresProductosServiciosI {
  idProveedorProductoOServicio?: number;
  numeroDocumentoIdentificacionProvProdOServ: String;
  lugarExpedicionDocumentoIdentificacionProvProdOServ: String;
  nombresProvProdOServ: String;
  primerApellidoProvProdOServ: String;
  segundoApellidoProvProdOServ: String;
  direccionProvProdOServ: String;
  telefonoProvProdOServ: String;
  movilProvProdOServ: String;
  correoElectronicoPersonalProvProdOServ: String;
  correoElectronicoInstitucionalProvProdOServ: String;
  paisOrigenProvProdOServ: String;
  departamentoOEstadoOrigenProvProdOServ: String;
  ciudadOrigenProvProdOServ: String;
  fechaHMSIngresoProvProdOServ?: String;
  fechaHMSModificacionProvProdOServ?: String;
  estadoProvProdOServ: String;
  tipoDocumentoIdentificacionDTO: TiposDocumentosIdentificacionI;
}

export interface ProveedoresProductosServiciosMsj { mensaje: string; }
