import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialProveedoresProductosServiciosI } from '../../../../../interfaces/panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';
import { InfraestructurasArrendadasI, TipoEstructuraInfraestructuraArrendadaI } from '../../../../../interfaces/digei/finca-raiz/infraestructuras-arrendadas/infraestructuras-arrendadas.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { BuscadorUbicacionComponent } from '../../../../../shared/components/buscador-ubicacion/buscador-ubicacion.component';
import { UnidadesMedidasI } from '../../../../../interfaces/unidades-medidas/unidades-medidas.interface';
import { UnidadesMedidasService } from '../../../../../services/unidades-medidas/unidades-medidas.service';

@Component({ selector: 'app-add-upd-del-infraestructura-arrendada', standalone: true, imports: [CommonModule, ReactiveFormsModule, BuscadorUbicacionComponent], templateUrl: './add-upd-del-infraestructura-arrendada.component.html', styleUrl: './add-upd-del-infraestructura-arrendada.component.scss' })
export class AddUpdDelInfraestructuraArrendadaComponent implements OnChanges {
  @Input() modo: 'guardar'|'modificar'|'eliminar' = 'guardar';
  @Input() data: InfraestructurasArrendadasI|null = null;
  @Input() unidades: UnidadesMilitaresI[] = [];
  @Input() proveedores: HistorialProveedoresProductosServiciosI[] = [];
  @Input() tipos: TipoEstructuraInfraestructuraArrendadaI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<InfraestructurasArrendadasI>();
  @Output() eliminar = new EventEmitter<number>();
  private readonly fb = inject(FormBuilder);
  private readonly unidadesMedidasService = inject(UnidadesMedidasService);
  form = this.crear();
  unidadesMedidasLongitud: UnidadesMedidasI[] = [];

  constructor() {
    this.cargarUnidadesMedidasLongitud();
  }

  private cargarUnidadesMedidasLongitud(): void {
    this.unidadesMedidasService.findAllUnitsOfMeasurement(undefined, 'nombreUnidadMedida', 'ASC').subscribe({
      next: unidadesMedidas => {
        this.unidadesMedidasLongitud = unidadesMedidas.filter(unidadMedida =>
          this.normalizarTexto(unidadMedida.nombreCategoriaUnidadMedida) === 'LONGITUD SISTEMA METRICO'
        );
      },
      error: error => console.error('ERROR AL CARGAR UNIDADES DE MEDIDA DE LONGITUD: ', error)
    });
  }

  private normalizarTexto(valor: unknown): string {
    return String(valor ?? '').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  ngOnChanges(): void { this.form = this.crear(); if (this.modo === 'eliminar') this.form.disable(); }

  private crear() {
    const x = this.data;
    return this.fb.group({
      id: [x?.idInfraestructuraArrendada ?? null], denominacion: [x?.denominacionInfraestructuraArrendada ?? '', Validators.required],
      unidad: [x?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required], proveedor: [x?.historialProveedorProductoOServicioDTO?.idHistorialProveedorProductoOServicio ?? '', Validators.required], tipo: [x?.tipoEstructuraInfraestructuraArrendadaDTO?.idTipoEstructuraInfraestructuraArrendada ?? '', Validators.required],
      pais: [x?.paisOrigenInfraestructuraArrendada ?? ''], departamento: [x?.departamentoOEstadoOrigenInfraestructuraArrendada ?? ''], ciudad: [x?.ciudadOrigenInfraestructuraArrendada ?? ''], direccion: [x?.direccionInfraestructuraArrendada ?? ''],
      largo: [x?.numeroLargoInfraestructuraArrendada ?? ''], uLargo: [x?.nombreUnidadMedidaLargoInfraestructuraArrendada ?? ''], ancho: [x?.numeroAnchuraInfraestructuraArrendada ?? ''], uAncho: [x?.nombreUnidadMedidaAnchuraInfraestructuraArrendada ?? ''], profundidad: [x?.numeroProfundidadInfraestructuraArrendada ?? ''], uProfundidad: [x?.nombreUnidadMedidaProfundidadInfraestructuraArrendada ?? ''],
      pisos: [x?.numeroPisosInfraestructuraArrendada ?? 0], estado: [x?.estadoUsoInfraestructuraArrendada ?? '', Validators.required], latitud: [x?.latitudInfraestructuraArrendada ?? ''], longitud: [x?.longitudInfraestructuraArrendada ?? ''], estrato: [x?.estratoInfraestructuraArrendada ?? ''],
      fechaHMSIngresoInfraestructuraArrendada: [{ value: this.fecha(x?.fechaHMSIngresoInfraestructuraArrendada) || this.ahora(), disabled: true }],
      //LA COLUMNA DE MODIFICACION ES NOT NULL EN ORACLE. COMO EN EL FORMULARIO DE INFRAESTRUCTURA,
      //SE ENVIA LA HORA LOCAL ACTUAL TAMBIEN AL CREAR Y EL CAMPO PERMANECE INFORMATIVO/NO EDITABLE.
      fechaHMSModificacionInfraestructuraArrendada: [{ value: this.ahora(), disabled: true }]
    });
  }

  enviar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const unidad = this.unidades.find(x => x.idUnidadMilitar === Number(v.unidad));
    const proveedor = this.proveedores.find(x => x.idHistorialProveedorProductoOServicio === Number(v.proveedor));
    const tipo = this.tipos.find(x => x.idTipoEstructuraInfraestructuraArrendada === Number(v.tipo));
    if (!unidad || !proveedor || !tipo) return;
    this.guardar.emit({
      idInfraestructuraArrendada: v.id ?? undefined, denominacionInfraestructuraArrendada: v.denominacion!, unidadMilitarDTO: unidad, historialProveedorProductoOServicioDTO: proveedor, tipoEstructuraInfraestructuraArrendadaDTO: tipo,
      paisOrigenInfraestructuraArrendada: v.pais!, departamentoOEstadoOrigenInfraestructuraArrendada: v.departamento!, ciudadOrigenInfraestructuraArrendada: v.ciudad!, direccionInfraestructuraArrendada: v.direccion!,
      numeroLargoInfraestructuraArrendada: v.largo!, nombreUnidadMedidaLargoInfraestructuraArrendada: v.uLargo!, numeroAnchuraInfraestructuraArrendada: v.ancho!, nombreUnidadMedidaAnchuraInfraestructuraArrendada: v.uAncho!, numeroProfundidadInfraestructuraArrendada: v.profundidad!, nombreUnidadMedidaProfundidadInfraestructuraArrendada: v.uProfundidad!,
      numeroPisosInfraestructuraArrendada: Number(v.pisos), estadoUsoInfraestructuraArrendada: v.estado!, latitudInfraestructuraArrendada: v.latitud!, longitudInfraestructuraArrendada: v.longitud!, estratoInfraestructuraArrendada: v.estrato!,
      fechaHMSIngresoInfraestructuraArrendada: this.backend(v.fechaHMSIngresoInfraestructuraArrendada!), fechaHMSModificacionInfraestructuraArrendada: this.backend(v.fechaHMSModificacionInfraestructuraArrendada!)
    });
  }

  confirmar(): void { const id = this.form.getRawValue().id; if (id) this.eliminar.emit(id); }
  private fecha(value?: string): string { return value ? String(value).replace(' ', 'T').slice(0, 16) : ''; }
  private backend(value: string): string { return value?.length === 16 ? `${value}:00` : value; }
  private ahora(): string { const d=new Date(), z=(n:number)=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`; }
}
