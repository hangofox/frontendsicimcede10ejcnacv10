export interface HistorialProveedoresProductosServiciosI {
  idHistorialProveedorProductoOServicio?: number;
  numRegHistorialProveedorProductoOServicio: string;
  siglaOAcronimoUnidadMilitar: string;
  nombreTipoDocumentoIdentificacion: string;
  numeroDocumentoIdentificacionProvProdOServ: string;
  lugarExpedicionDocumentoIdentificacionProvProdOServ: string;
  nombresProvProdOServ: string;
  primerApellidoProvProdOServ: string;
  segundoApellidoProvProdOServ: string;
  direccionProvProdOServ: string;
  telefonoProvProdOServ: string;
  movilProvProdOServ: string;
  correoElectronicoPersonalProvProdOServ: string;
  correoElectronicoInstitucionalProvProdOServ: string;
  paisOrigenProvProdOServ: string;
  departamentoOEstadoOrigenProvProdOServ: string;
  ciudadOrigenProvProdOServ: string;
  fechaHMSIngresoProvProdOServ?: string;
  fechaHMSModificacionProvProdOServ?: string;
}

export interface HistorialProveedoresProductosServiciosMsj { mensaje: string; }
