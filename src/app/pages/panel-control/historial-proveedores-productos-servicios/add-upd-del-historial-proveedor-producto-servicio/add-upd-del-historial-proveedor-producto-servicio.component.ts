import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialProveedoresProductosServiciosI } from '../../../../interfaces/panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';
import { ProveedoresProductosServiciosI } from '../../../../interfaces/panel-control/proveedores-productos-servicios/proveedores-productos-servicios.interface';
import { ProveedoresProductosServiciosService } from '../../../../services/panel-control/proveedores-productos-servicios/proveedores-productos-servicios.service';
import { BuscadorUbicacionComponent } from '../../../../shared/components/buscador-ubicacion/buscador-ubicacion.component';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposDocumentosIdentificacionI } from '../../../../interfaces/tipos-documentos-identificacion/tipos-documentos-identificacion.interface';
import { TiposDocumentosIdentificacionService } from '../../../../services/tipos-documentos-identificacion/tipos-documentos-identificacion.service';

@Component({
  selector: 'app-add-upd-del-historial-proveedor-producto-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BuscadorUbicacionComponent],
  templateUrl: './add-upd-del-historial-proveedor-producto-servicio.component.html',
  styleUrl: './add-upd-del-historial-proveedor-producto-servicio.component.scss'
})
export class AddUpdDelHistorialProveedorProductoServicioComponent implements OnChanges {
  @ViewChild(BuscadorUbicacionComponent) buscadorUbicacion?: BuscadorUbicacionComponent;
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialProveedoresProductosServiciosI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialProveedoresProductosServiciosI>();
  @Output() eliminar = new EventEmitter<number>();

  form: FormGroup;
  busquedaForm: FormGroup;
  proveedoresEncontrados: ProveedoresProductosServiciosI[] = [];
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposDocumentosIdentificacion: TiposDocumentosIdentificacionI[] = [];
  buscando = false;
  mensajeBusqueda = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly proveedoresService: ProveedoresProductosServiciosService,
    private readonly unidadesMilitaresService: UnidadesMilitaresService,
    private readonly tiposDocumentosIdentificacionService: TiposDocumentosIdentificacionService
  ) {
    this.form = this.crearFormulario();
    this.busquedaForm = this.crearFormularioBusqueda();
    this.unidadesMilitaresService.findAllMilitaryUnits(undefined, undefined, 'nombreUnidadMilitar', 'ASC').subscribe(
      unidadesMilitares => this.unidadesMilitares = unidadesMilitares
    );
    this.tiposDocumentosIdentificacionService.findAllTypesOfIdentificationDocuments(undefined, undefined, 'nombreTipoDocumentoIdentificacion', 'ASC').subscribe(
      tiposDocumentosIdentificacion => this.tiposDocumentosIdentificacion = tiposDocumentosIdentificacion
    );
  }

  ngOnChanges(): void {
    this.form = this.crearFormulario();
    this.busquedaForm = this.crearFormularioBusqueda();
    this.proveedoresEncontrados = [];
    this.mensajeBusqueda = '';
    if (this.modo === 'eliminar') this.form.disable();
  }

  buscarProveedores(): void {
    const termino = String(this.busquedaForm.get('termino')?.value || '').trim();
    if (!termino) {
      this.proveedoresEncontrados = [];
      this.mensajeBusqueda = 'Ingrese un NIT, número de documento o nombre para realizar la búsqueda.';
      return;
    }
    this.buscando = true;
    this.mensajeBusqueda = '';
    this.busquedaForm.get('proveedorSeleccionado')?.setValue('');
    this.proveedoresService.findAllProductOrServiceProviders(undefined, undefined, termino, 'nombresProvProdOServ', 'ASC').subscribe({
      next: proveedores => {
        this.proveedoresEncontrados = proveedores;
        this.buscando = false;
        this.mensajeBusqueda = proveedores.length ? '' : 'No se encontraron proveedores con el criterio ingresado.';
      },
      error: () => {
        this.proveedoresEncontrados = [];
        this.buscando = false;
        this.mensajeBusqueda = 'No fue posible consultar los proveedores.';
      }
    });
  }

  cargarProveedorSeleccionado(): void {
    const id = Number(this.busquedaForm.get('proveedorSeleccionado')?.value);
    const proveedor = this.proveedoresEncontrados.find(item => item.idProveedorProductoOServicio === id);
    if (!proveedor) return;
    this.form.patchValue({
      tipo: proveedor.tipoDocumentoIdentificacionDTO?.nombreTipoDocumentoIdentificacion ?? '',
      documento: proveedor.numeroDocumentoIdentificacionProvProdOServ,
      expedicion: proveedor.lugarExpedicionDocumentoIdentificacionProvProdOServ,
      nombres: proveedor.nombresProvProdOServ,
      apellido1: proveedor.primerApellidoProvProdOServ,
      apellido2: proveedor.segundoApellidoProvProdOServ,
      direccion: proveedor.direccionProvProdOServ,
      telefono: proveedor.telefonoProvProdOServ,
      movil: proveedor.movilProvProdOServ,
      correo1: proveedor.correoElectronicoPersonalProvProdOServ,
      correo2: proveedor.correoElectronicoInstitucionalProvProdOServ,
      pais: proveedor.paisOrigenProvProdOServ,
      departamento: proveedor.departamentoOEstadoOrigenProvProdOServ,
      ciudad: proveedor.ciudadOrigenProvProdOServ
    });
    this.buscadorUbicacion?.sincronizarFormulario();
    this.mensajeBusqueda = 'Datos del proveedor cargados correctamente.';
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const valor = this.form.getRawValue();
    this.guardar.emit({
      idHistorialProveedorProductoOServicio: valor.id ?? undefined,
      numRegHistorialProveedorProductoOServicio: valor.registro,
      siglaOAcronimoUnidadMilitar: valor.unidad,
      nombreTipoDocumentoIdentificacion: valor.tipo,
      numeroDocumentoIdentificacionProvProdOServ: valor.documento,
      lugarExpedicionDocumentoIdentificacionProvProdOServ: valor.expedicion,
      nombresProvProdOServ: valor.nombres,
      primerApellidoProvProdOServ: valor.apellido1,
      segundoApellidoProvProdOServ: valor.apellido2,
      direccionProvProdOServ: valor.direccion,
      telefonoProvProdOServ: valor.telefono,
      movilProvProdOServ: valor.movil,
      correoElectronicoPersonalProvProdOServ: valor.correo1,
      correoElectronicoInstitucionalProvProdOServ: valor.correo2,
      paisOrigenProvProdOServ: valor.pais,
      departamentoOEstadoOrigenProvProdOServ: valor.departamento,
      ciudadOrigenProvProdOServ: valor.ciudad,
      fechaHMSIngresoProvProdOServ: this.agregarSegundos(valor.ingreso),
      fechaHMSModificacionProvProdOServ: this.agregarSegundos(valor.modificacion)
    });
  }

  confirmar(): void {
    const id = this.form.getRawValue().id;
    if (id) this.eliminar.emit(Number(id));
  }

  private crearFormularioBusqueda(): FormGroup {
    return this.fb.group({ termino: [''], proveedorSeleccionado: [''] });
  }

  private crearFormulario(): FormGroup {
    const item = this.data;
    return this.fb.group({
      id: [item?.idHistorialProveedorProductoOServicio ?? null],
      //EL NUMERO DE REGISTRO LO GENERA EL BACKEND Y NO DEBE SER MODIFICADO DESDE EL FRONTEND.
      registro: [{ value: item?.numRegHistorialProveedorProductoOServicio ?? '', disabled: true }],
      unidad: [item?.siglaOAcronimoUnidadMilitar ?? '', Validators.required],
      tipo: [item?.nombreTipoDocumentoIdentificacion ?? '', Validators.required],
      documento: [item?.numeroDocumentoIdentificacionProvProdOServ ?? '', Validators.required],
      expedicion: [item?.lugarExpedicionDocumentoIdentificacionProvProdOServ ?? '', Validators.required],
      nombres: [item?.nombresProvProdOServ ?? '', Validators.required],
      apellido1: [item?.primerApellidoProvProdOServ ?? '', Validators.required],
      apellido2: [item?.segundoApellidoProvProdOServ ?? ''],
      direccion: [item?.direccionProvProdOServ ?? '', Validators.required],
      telefono: [item?.telefonoProvProdOServ ?? ''],
      movil: [item?.movilProvProdOServ ?? '', Validators.required],
      correo1: [item?.correoElectronicoPersonalProvProdOServ ?? '', [Validators.required, Validators.email]],
      correo2: [item?.correoElectronicoInstitucionalProvProdOServ ?? '', Validators.email],
      pais: [item?.paisOrigenProvProdOServ ?? '', Validators.required],
      departamento: [item?.departamentoOEstadoOrigenProvProdOServ ?? '', Validators.required],
      ciudad: [item?.ciudadOrigenProvProdOServ ?? '', Validators.required],
      ingreso: [{ value: this.formatearFecha(item?.fechaHMSIngresoProvProdOServ) || this.ahora(), disabled: true }],
      modificacion: [{ value: this.ahora(), disabled: true }]
    });
  }

  private formatearFecha(fecha: unknown): string {
    return fecha ? String(fecha).replace(' ', 'T').slice(0, 16) : '';
  }

  private agregarSegundos(fecha: string): string {
    return fecha?.length === 16 ? `${fecha}:00` : fecha;
  }

  private ahora(): string {
    const fecha = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}T${dosDigitos(fecha.getHours())}:${dosDigitos(fecha.getMinutes())}`;
  }
}
