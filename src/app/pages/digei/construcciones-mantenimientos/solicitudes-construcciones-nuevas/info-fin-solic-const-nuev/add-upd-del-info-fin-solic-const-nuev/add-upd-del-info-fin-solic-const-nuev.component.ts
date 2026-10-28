import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InformacionFinancieraSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/informacion-financiera-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { TiposFuentesFinanciacionI } from '../../../../../../interfaces/tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface';
import { ActividadesProductosInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/activ-prod-infraest/actividades-productos-infraestructuras.interface';
import { CapitulosInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/activ-prod-infraest/capit-infraest/capitulos-infraestructuras.interface';
import { UnidadesMedidasI } from '../../../../../../interfaces/unidades-medidas/unidades-medidas.interface';

@Component({
  selector: 'app-add-upd-del-inf-fin-solic-const-nuev',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-info-fin-solic-const-nuev.component.html',
  styleUrl: './add-upd-del-info-fin-solic-const-nuev.component.scss'
})
export class AddUpdDelInformacionFinancieraSolicConstNuevComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: InformacionFinancieraSolicInfraestI | null = null;
  //SOLICITUD DE INFRAESTRUCTURA A LA QUE PERTENECE LA INFORMACIÓN FINANCIERA (LA DEL MODAL DESDE EL QUE SE ABRIÓ EL LISTADO):
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;
  //CATÁLOGOS CARGADOS UNA SOLA VEZ EN EL LISTADO Y PASADOS AL FORMULARIO:
  @Input() tiposFuentesFinanciacion: TiposFuentesFinanciacionI[] = [];
  @Input() actividadesProductosInfraestructuras: ActividadesProductosInfraestructurasI[] = [];
  @Input() unidadesMedidas: UnidadesMedidasI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<InformacionFinancieraSolicInfraestI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EL CAPÍTULO NO SE GUARDA EN LA TABLA: SOLO FILTRA EL COMBO DE ACTIVIDADES (CADA ACTIVIDAD YA TRAE SU CAPÍTULO).
  //SON OBLIGATORIOS (NOT NULL) LA FUENTE DE FINANCIACIÓN, LA ACTIVIDAD, LA CANTIDAD, EL NÚMERO DEL ÁREA DE INTERVENCIÓN Y SU
  //UNIDAD DE MEDIDA; EL VALOR DEL COSTO UNITARIO Y LAS OBSERVACIONES SON OPCIONALES. LOS LÍMITES SON LOS TAMAÑOS DE LAS COLUMNAS:
  form = this.fb.group({
    tipoFuenteFinanciacionSeleccionado: ['', Validators.required],
    capituloSeleccionado: [''],
    actividadSeleccionada: ['', Validators.required],
    cantidad: [null as number | null, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
    valorCostoUnitario: ['', [Validators.maxLength(150), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
    numeroAreaIntervencion: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
    unidadMedidaAreaIntervencion: ['', [Validators.required, Validators.maxLength(150)]],
    observaciones: ['']
  });

  //CAPÍTULOS ÚNICOS SACADOS DEL CATÁLOGO DE ACTIVIDADES (ORDENADOS POR ID, COMO EN LA TABLA DE CAPÍTULOS):
  get capitulos(): CapitulosInfraestructurasI[] {
    const capitulos = new Map<number, CapitulosInfraestructurasI>();
    this.actividadesProductosInfraestructuras.forEach(actividad => {
      const capitulo = actividad.capituloInfraestructuraDTO;
      if (capitulo?.idCapituloInfraestructura !== undefined) capitulos.set(capitulo.idCapituloInfraestructura, capitulo);
    });
    return [...capitulos.values()].sort((a, b) => (a.idCapituloInfraestructura ?? 0) - (b.idCapituloInfraestructura ?? 0));
  }

  //ACTIVIDADES DEL CAPÍTULO ELEGIDO (SI NO HAY CAPÍTULO, TODAS):
  get actividadesFiltradas(): ActividadesProductosInfraestructurasI[] {
    const idCapitulo = Number(this.form.getRawValue().capituloSeleccionado);
    if (!idCapitulo) return this.actividadesProductosInfraestructuras;
    return this.actividadesProductosInfraestructuras.filter(actividad => actividad.capituloInfraestructuraDTO?.idCapituloInfraestructura === idCapitulo);
  }

  //CLASIFICACIONES (EJ. INTERNO, EXTERNO) PARA AGRUPAR EL COMBO DE FUENTES DE FINANCIACIÓN:
  get clasificacionesFuentes(): string[] {
    return [...new Set(this.tiposFuentesFinanciacion.map(tipo => String(tipo.clasificacionTipoFuenteFinanciacion ?? '')))];
  }

  fuentesPorClasificacion(clasificacion: string): TiposFuentesFinanciacionI[] {
    return this.tiposFuentesFinanciacion.filter(tipo => String(tipo.clasificacionTipoFuenteFinanciacion ?? '') === clasificacion);
  }

  //FUENTE DE FINANCIACIÓN ELEGIDA; AL MODIFICAR, SI AÚN NO LLEGA EL CATÁLOGO, SE USA LA DEL REGISTRO:
  get tipoFuenteFinanciacionSeleccionado(): TiposFuentesFinanciacionI | null {
    const id = Number(this.form.getRawValue().tipoFuenteFinanciacionSeleccionado);
    if (!id) return null;
    return this.tiposFuentesFinanciacion.find(tipo => tipo.idTipoFuenteFinanciacion === id)
      ?? (this.data?.tipoFuenteFinanciacionDTO?.idTipoFuenteFinanciacion === id ? this.data.tipoFuenteFinanciacionDTO : null);
  }

  //ACTIVIDAD ELEGIDA; AL MODIFICAR, SI AÚN NO LLEGA EL CATÁLOGO, SE USA LA DEL REGISTRO:
  get actividadSeleccionada(): ActividadesProductosInfraestructurasI | null {
    const id = Number(this.form.getRawValue().actividadSeleccionada);
    if (!id) return null;
    return this.actividadesProductosInfraestructuras.find(actividad => actividad.idActividadProductoInfraestructura === id)
      ?? (this.data?.actividadProductoInfraestructuraDTO?.idActividadProductoInfraestructura === id ? this.data.actividadProductoInfraestructuraDTO : null);
  }

  //UNIDAD DE MEDIDA DEL ÁREA DE INTERVENCIÓN DEL REGISTRO QUE NO ESTÁ EN EL CATÁLOGO DE UNIDADES DE MEDIDAS (SE AGREGA AL COMBO
  //PARA NO PERDERLA AL MODIFICAR); '' SI ESTÁ EN EL CATÁLOGO O NO HAY UNIDAD:
  get unidadMedidaFueraDeCatalogo(): string {
    const unidadMedida = String(this.form.getRawValue().unidadMedidaAreaIntervencion ?? '');
    if (!unidadMedida || this.unidadesMedidas.some(unidad => unidad.nombreUnidadMedida === unidadMedida)) return '';
    return unidadMedida;
  }

  //VALOR TOTAL DE LA ACTIVIDAD (CANTIDAD × VALOR DEL COSTO UNITARIO), SOLO INFORMATIVO (NO SE GUARDA EN LA TABLA):
  get valorTotal(): number | null {
    const valores = this.form.getRawValue();
    const cantidad = Number(valores.cantidad);
    const valorUnitario = Number(valores.valorCostoUnitario);
    if (!cantidad || !String(valores.valorCostoUnitario ?? '').trim() || isNaN(valorUnitario)) return null;
    return cantidad * valorUnitario;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      const x = this.data;
      const idCapitulo = x?.actividadProductoInfraestructuraDTO?.capituloInfraestructuraDTO?.idCapituloInfraestructura;
      this.form.reset({
        tipoFuenteFinanciacionSeleccionado: x?.tipoFuenteFinanciacionDTO?.idTipoFuenteFinanciacion ? String(x.tipoFuenteFinanciacionDTO.idTipoFuenteFinanciacion) : '',
        capituloSeleccionado: idCapitulo ? String(idCapitulo) : '',
        actividadSeleccionada: x?.actividadProductoInfraestructuraDTO?.idActividadProductoInfraestructura ? String(x.actividadProductoInfraestructuraDTO.idActividadProductoInfraestructura) : '',
        cantidad: x?.cantidadActividadProductoInfraestructura ?? null,
        valorCostoUnitario: String(x?.valorCostoUnitarioCapituloProductoInfraestructura ?? ''),
        numeroAreaIntervencion: String(x?.numeroAreaIntervencionInfraestructura ?? ''),
        unidadMedidaAreaIntervencion: String(x?.nombreUnidadMedidaAreaIntervencionInfraestructura ?? ''),
        observaciones: String(x?.observacionesPresupuestoInfraestructura ?? '')
      });
      if (this.modo === 'eliminar') {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  //AL CAMBIAR EL CAPÍTULO SE LIMPIA LA ACTIVIDAD SI YA NO PERTENECE AL CAPÍTULO ELEGIDO:
  onCambioCapitulo(): void {
    const idActividad = Number(this.form.getRawValue().actividadSeleccionada);
    if (idActividad && !this.actividadesFiltradas.some(actividad => actividad.idActividadProductoInfraestructura === idActividad)) {
      this.form.patchValue({ actividadSeleccionada: '' });
    }
  }

  //AL ELEGIR LA ACTIVIDAD SE SELECCIONA SU CAPÍTULO EN EL COMBO DE CAPÍTULOS:
  onCambioActividad(): void {
    const idCapitulo = this.actividadSeleccionada?.capituloInfraestructuraDTO?.idCapituloInfraestructura;
    if (idCapitulo) this.form.patchValue({ capituloSeleccionado: String(idCapitulo) });
  }

  enviar(): void {
    const tipoFuenteFinanciacion = this.tipoFuenteFinanciacionSeleccionado;
    const actividad = this.actividadSeleccionada;
    if (this.form.invalid || !tipoFuenteFinanciacion || !actividad || !this.solicitudInfraestructura) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idInformacionFinancieraSolicitudInfraestructura: this.data?.idInformacionFinancieraSolicitudInfraestructura,
      solicitudInfraestructuraDTO: this.solicitudInfraestructura,
      tipoFuenteFinanciacionDTO: tipoFuenteFinanciacion,
      observacionesPresupuestoInfraestructura: String(valores.observaciones ?? '').trim().toUpperCase(),
      actividadProductoInfraestructuraDTO: actividad,
      cantidadActividadProductoInfraestructura: Number(valores.cantidad),
      valorCostoUnitarioCapituloProductoInfraestructura: String(valores.valorCostoUnitario ?? '').trim(),
      numeroAreaIntervencionInfraestructura: String(valores.numeroAreaIntervencion ?? '').trim(),
      nombreUnidadMedidaAreaIntervencionInfraestructura: String(valores.unidadMedidaAreaIntervencion ?? '').trim().toUpperCase()
    });
  }

  confirmar(): void {
    if (this.data?.idInformacionFinancieraSolicitudInfraestructura) this.eliminar.emit(this.data.idInformacionFinancieraSolicitudInfraestructura);
  }
}
