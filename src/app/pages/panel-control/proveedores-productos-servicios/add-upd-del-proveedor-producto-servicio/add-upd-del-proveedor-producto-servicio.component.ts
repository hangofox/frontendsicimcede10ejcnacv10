import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProveedoresProductosServiciosI } from '../../../../interfaces/panel-control/proveedores-productos-servicios/proveedores-productos-servicios.interface';
import { TiposDocumentosIdentificacionI } from '../../../../interfaces/tipos-documentos-identificacion/tipos-documentos-identificacion.interface';
import { BuscadorUbicacionComponent } from '../../../../shared/components/buscador-ubicacion/buscador-ubicacion.component';

@Component({
  selector: 'app-add-upd-del-proveedor-producto-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BuscadorUbicacionComponent],
  templateUrl: './add-upd-del-proveedor-producto-servicio.component.html',
  styleUrl: './add-upd-del-proveedor-producto-servicio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelProveedorProductoServicioComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() proveedorProductoOServicioData: ProveedoresProductosServiciosI | null = null;
  @Input() tiposDocumentosIdentificacion: TiposDocumentosIdentificacionI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<ProveedoresProductosServiciosI>();
  @Output() eliminar = new EventEmitter<number>();

  proveedoresProductosServiciosForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['proveedorProductoOServicioData']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const proveedorProductoOServicio = this.proveedorProductoOServicioData;
    this.proveedoresProductosServiciosForm = this.formBuilder.group({
      idProveedorProductoOServicio: [proveedorProductoOServicio?.idProveedorProductoOServicio ?? null],
      tipoDocumentoIdentificacionSeleccionada: [proveedorProductoOServicio?.tipoDocumentoIdentificacionDTO?.idTipoDocumentoIdentificacion ?? '', Validators.required],
      numeroDocumentoIdentificacionProvProdOServ: [proveedorProductoOServicio?.numeroDocumentoIdentificacionProvProdOServ ?? '', Validators.required],
      lugarExpedicionDocumentoIdentificacionProvProdOServ: [proveedorProductoOServicio?.lugarExpedicionDocumentoIdentificacionProvProdOServ ?? '', Validators.required],
      nombresProvProdOServ: [proveedorProductoOServicio?.nombresProvProdOServ ?? '', Validators.required],
      primerApellidoProvProdOServ: [proveedorProductoOServicio?.primerApellidoProvProdOServ ?? '', Validators.required],
      segundoApellidoProvProdOServ: [proveedorProductoOServicio?.segundoApellidoProvProdOServ ?? ''],
      direccionProvProdOServ: [proveedorProductoOServicio?.direccionProvProdOServ ?? '', Validators.required],
      telefonoProvProdOServ: [proveedorProductoOServicio?.telefonoProvProdOServ ?? ''],
      movilProvProdOServ: [proveedorProductoOServicio?.movilProvProdOServ ?? '', Validators.required],
      correoElectronicoPersonalProvProdOServ: [proveedorProductoOServicio?.correoElectronicoPersonalProvProdOServ ?? '', [Validators.required, Validators.email]],
      correoElectronicoInstitucionalProvProdOServ: [proveedorProductoOServicio?.correoElectronicoInstitucionalProvProdOServ ?? '', Validators.email],
      paisOrigenProvProdOServ: [proveedorProductoOServicio?.paisOrigenProvProdOServ ?? '', Validators.required],
      departamentoOEstadoOrigenProvProdOServ: [proveedorProductoOServicio?.departamentoOEstadoOrigenProvProdOServ ?? '', Validators.required],
      ciudadOrigenProvProdOServ: [proveedorProductoOServicio?.ciudadOrigenProvProdOServ ?? '', Validators.required],
      estadoProvProdOServ: [proveedorProductoOServicio?.estadoProvProdOServ ?? 'ACTIVO', Validators.required],
      fechaHMSIngresoProvProdOServ: [{ value: this.formatearFechaParaInput(proveedorProductoOServicio?.fechaHMSIngresoProvProdOServ) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR). SI LA COLUMNA
      //DE ORACLE ES NOT NULL, TAMBIÉN DEBE ENVIARSE AL CREAR UN REGISTRO NUEVO (NO SOLO AL MODIFICAR); DEJARLA
      //VACÍA EN ESE CASO PROVOCABA ORA-01400 AL INSERTAR — MISMO PATRÓN QUE AddUpdDelUsuarioComponent:
      fechaHMSModificacionProvProdOServ: [{ value: this.obtenerFechaHoraActual(), disabled: true }]
    });
    if (this.banderaCrudEliminar) {
      this.proveedoresProductosServiciosForm.disable();
    }
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">.
  //A PROPÓSITO NO SE USA Date.toISOString() (DEVUELVE LA HORA EN UTC): EN COLOMBIA (UTC-5) EL CAMPO QUEDABA
  //MOSTRANDO/ENVIANDO LA HORA 5 HORAS ADELANTADA RESPECTO A LA HORA REAL DE BOGOTÁ. MISMO PATRÓN QUE
  //AddUpdDelHistorialIntegranteDocumentosComponent.obtenerFechaHoraActual():
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA UNA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. LOS
  //CAMPOS TIMESTAMP DE ORACLE LLEGAN CON ESPACIO EN VEZ DE "T" Y, MUCHAS VECES, CON SEGUNDOS/FRACCIÓN DE SEGUNDOS
  //(EJ. "2024-05-12 14:30:00.0") — MISMO PATRÓN QUE
  //AddUpdDelHistorialIntegranteDocumentosComponent.formatearFechaParaInput():
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //EL BACKEND MAPEA LAS FECHAS DEL PROVEEDOR DE PRODUCTOS O SERVICIOS COMO java.util.Date
  //(ProveedorProductoOServicioDTO), Y AL NO TENER NINGÚN @JsonFormat NI spring.jackson.date-format CONFIGURADO,
  //JACKSON EXIGE SEGUNDOS EN EL STRING ISO (yyyy-MM-ddTHH:mm:ss). EL <input type="datetime-local"> SOLO ENVÍA
  //MINUTOS (yyyy-MM-ddTHH:mm), ASÍ QUE JACKSON NO LOGRA PARSEARLO Y EL CAMPO QUEDA EN null EN EL BACKEND (SIN
  //LANZAR ERROR 400, POR ESO SOLO SE NOTA CUANDO LA COLUMNA DE ORACLE ES NOT NULL). SE LE AGREGAN LOS SEGUNDOS
  //ANTES DE ENVIARLO, SIN CAMBIAR LO QUE VE O EDITA EL USUARIO EN EL FORMULARIO — MISMO PATRÓN QUE
  //AddUpdDelHistorialIntegranteDocumentosComponent.agregarSegundosParaBackend():
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  guardarModificar(): void {
    if (this.proveedoresProductosServiciosForm.invalid) {
      this.proveedoresProductosServiciosForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.proveedoresProductosServiciosForm.getRawValue();
    const tipoDocumentoIdentificacion = this.tiposDocumentosIdentificacion.find(t => t.idTipoDocumentoIdentificacion === Number(valoresFormulario.tipoDocumentoIdentificacionSeleccionada));

    const proveedorProductoOServicio: ProveedoresProductosServiciosI = {
      idProveedorProductoOServicio: valoresFormulario.idProveedorProductoOServicio ?? undefined,
      tipoDocumentoIdentificacionDTO: tipoDocumentoIdentificacion ?? this.tiposDocumentosIdentificacion[0],
      numeroDocumentoIdentificacionProvProdOServ: valoresFormulario.numeroDocumentoIdentificacionProvProdOServ,
      lugarExpedicionDocumentoIdentificacionProvProdOServ: valoresFormulario.lugarExpedicionDocumentoIdentificacionProvProdOServ,
      nombresProvProdOServ: valoresFormulario.nombresProvProdOServ,
      primerApellidoProvProdOServ: valoresFormulario.primerApellidoProvProdOServ,
      segundoApellidoProvProdOServ: valoresFormulario.segundoApellidoProvProdOServ,
      direccionProvProdOServ: valoresFormulario.direccionProvProdOServ,
      telefonoProvProdOServ: valoresFormulario.telefonoProvProdOServ,
      movilProvProdOServ: valoresFormulario.movilProvProdOServ,
      correoElectronicoPersonalProvProdOServ: valoresFormulario.correoElectronicoPersonalProvProdOServ,
      correoElectronicoInstitucionalProvProdOServ: valoresFormulario.correoElectronicoInstitucionalProvProdOServ,
      paisOrigenProvProdOServ: valoresFormulario.paisOrigenProvProdOServ,
      departamentoOEstadoOrigenProvProdOServ: valoresFormulario.departamentoOEstadoOrigenProvProdOServ,
      ciudadOrigenProvProdOServ: valoresFormulario.ciudadOrigenProvProdOServ,
      estadoProvProdOServ: valoresFormulario.estadoProvProdOServ,
      fechaHMSIngresoProvProdOServ: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoProvProdOServ),
      fechaHMSModificacionProvProdOServ: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionProvProdOServ)
    };
    this.guardar.emit(proveedorProductoOServicio);
  }

  confirmarEliminar(): void {
    const idProveedorProductoOServicio = this.proveedoresProductosServiciosForm.getRawValue().idProveedorProductoOServicio;
    if (idProveedorProductoOServicio) {
      this.eliminar.emit(Number(idProveedorProductoOServicio));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }

}
