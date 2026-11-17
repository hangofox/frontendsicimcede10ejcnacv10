import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HistorialMantenimientosInfraestI } from '../../../../../../interfaces/digei/mantenimientos-infraestructuras/historial-mantenimientos-infraest/historial-mantenimientos-infraest.interface';
import { TiposMantenimientosInfraestructurasI } from '../../../../../../interfaces/digei/mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras.interface';
import { InfraestructurasI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';
import { TiposFuentesFinanciacionI } from '../../../../../../interfaces/tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface';

@Component({
  selector: 'app-add-upd-del-hist-mtto-infraest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-mtto-infraest.component.html',
  styleUrl: './add-upd-del-hist-mtto-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelHistorialMantenimientoInfraestComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() historialMantenimientoInfraestructuraData: HistorialMantenimientosInfraestI | null = null;
  @Input() infraestructuras: InfraestructurasI[] = [];
  @Input() tiposMantenimientosInfraestructuras: TiposMantenimientosInfraestructurasI[] = [];
  @Input() tiposFuentesFinanciacion: TiposFuentesFinanciacionI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialMantenimientosInfraestI>();
  @Output() eliminar = new EventEmitter<number>();

  historialesMantenimientosInfraestructurasForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['historialMantenimientoInfraestructuraData']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const historial = this.historialMantenimientoInfraestructuraData;
    this.historialesMantenimientosInfraestructurasForm = this.formBuilder.group({
      idHistorialMantenimientoInfraestructura: [historial?.idHistorialMantenimientoInfraestructura ?? null],
      numRegHistorialMantenimientoInfraestructura: [historial?.numRegHistorialMantenimientoInfraestructura ?? '', Validators.required],
      infraestructuraSeleccionada: [historial?.infraestructuraDTO?.idInfraestructura ?? '', Validators.required],
      tipoMantenimientoInfraestructuraSeleccionado: [historial?.tipoMantenimientoInfraestructuraDTO?.idTipoMantenimientoInfraestructura ?? '', Validators.required],
      fechaHMSMantenimientoInfraestructura: [this.formatearFechaParaInput(historial?.fechaHMSMantenimientoInfraestructura) || this.obtenerFechaHoraActual(), Validators.required],
      asuntoMantenimientoInfraestructura: [historial?.asuntoMantenimientoInfraestructura ?? '', Validators.required],
      descripcionMantenimientoInfraestructura: [historial?.descripcionMantenimientoInfraestructura ?? ''],
      valorCostoMantenimientoInfraestructura: [historial?.valorCostoMantenimientoInfraestructura ?? '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      tipoFuenteFinanciacionSeleccionado: [historial?.tipoFuenteFinanciacionDTO?.idTipoFuenteFinanciacion ?? '', Validators.required]
    });
    if (this.banderaCrudEliminar) {
      this.historialesMantenimientosInfraestructurasForm.disable();
    }
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. A PROPÓSITO NO SE
  //USA Date.toISOString() (DEVUELVE LA HORA EN UTC Y EN COLOMBIA QUEDARÍA 5 HORAS ADELANTADA). MISMO PATRÓN DE
  //AddUpdDelSolicitudMantenimientoComponent.obtenerFechaHoraActual():
  private obtenerFechaHoraActual(): string {
    return this.fechaLocalParaInput(new Date());
  }

  private fechaLocalParaInput(fecha: Date): string {
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}T${dosDigitos(fecha.getHours())}:${dosDigitos(fecha.getMinutes())}`;
  }

  //NORMALIZA LA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm DE <input type="datetime-local">. COMO ES java.util.Date PUEDE
  //LLEGAR COMO MILISEGUNDOS, COMO TEXTO ISO CON ZONA HORARIA O COMO TEXTO DE ORACLE ("2024-05-12 14:30:00.0"):
  private formatearFechaParaInput(fecha: unknown): string {
    if (fecha === null || fecha === undefined || fecha === '') return '';
    if (typeof fecha === 'number' || /^\d+$/.test(String(fecha))) return this.fechaLocalParaInput(new Date(Number(fecha)));
    const texto = String(fecha);
    //CON ZONA HORARIA (EJ. "...T19:30:00.000+00:00" O "...Z") SE PASA A LA HORA LOCAL:
    if (/([+-]\d{2}:?\d{2}|Z)$/.test(texto)) {
      const local = new Date(texto);
      if (!isNaN(local.getTime())) return this.fechaLocalParaInput(local);
    }
    const sinEspacio = texto.replace(' ', 'T');
    return sinEspacio.length > 16 ? sinEspacio.slice(0, 16) : sinEspacio;
  }

  //JACKSON EXIGE SEGUNDOS EN EL TEXTO ISO DE UN java.util.Date (yyyy-MM-ddTHH:mm:ss) Y EL <input type="datetime-local"> SOLO
  //ENVÍA MINUTOS; SE AGREGAN ANTES DE ENVIARLO. MISMO PATRÓN DE AddUpdDelSolicitudMantenimientoComponent.agregarSegundosParaBackend():
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  guardarModificar(): void {
    if (this.historialesMantenimientosInfraestructurasForm.invalid) {
      this.historialesMantenimientosInfraestructurasForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.historialesMantenimientosInfraestructurasForm.getRawValue();
    const infraestructura = this.infraestructuras.find(i => i.idInfraestructura === Number(valoresFormulario.infraestructuraSeleccionada));
    const tipoMantenimiento = this.tiposMantenimientosInfraestructuras.find(t => t.idTipoMantenimientoInfraestructura === Number(valoresFormulario.tipoMantenimientoInfraestructuraSeleccionado));
    const tipoFuenteFinanciacion = this.tiposFuentesFinanciacion.find(t => t.idTipoFuenteFinanciacion === Number(valoresFormulario.tipoFuenteFinanciacionSeleccionado));
    if (!infraestructura || !tipoMantenimiento || !tipoFuenteFinanciacion) return;

    const historial: HistorialMantenimientosInfraestI = {
      idHistorialMantenimientoInfraestructura: valoresFormulario.idHistorialMantenimientoInfraestructura ?? undefined,
      numRegHistorialMantenimientoInfraestructura: String(valoresFormulario.numRegHistorialMantenimientoInfraestructura).trim().toUpperCase(),
      asuntoMantenimientoInfraestructura: String(valoresFormulario.asuntoMantenimientoInfraestructura).trim().toUpperCase(),
      descripcionMantenimientoInfraestructura: String(valoresFormulario.descripcionMantenimientoInfraestructura ?? '').trim(),
      fechaHMSMantenimientoInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSMantenimientoInfraestructura),
      valorCostoMantenimientoInfraestructura: String(valoresFormulario.valorCostoMantenimientoInfraestructura).trim(),
      infraestructuraDTO: infraestructura,
      tipoMantenimientoInfraestructuraDTO: tipoMantenimiento,
      tipoFuenteFinanciacionDTO: tipoFuenteFinanciacion
    };
    this.guardar.emit(historial);
  }

  confirmarEliminar(): void {
    const idHistorialMantenimientoInfraestructura = this.historialesMantenimientosInfraestructurasForm.getRawValue().idHistorialMantenimientoInfraestructura;
    if (idHistorialMantenimientoInfraestructura) {
      this.eliminar.emit(Number(idHistorialMantenimientoInfraestructura));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
