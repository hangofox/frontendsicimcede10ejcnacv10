import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadosTerrenosI } from '../../../../../interfaces/digei/finca-raiz/estados-terrenos/estados-terrenos.interface';
import { TerrenosI } from '../../../../../interfaces/digei/finca-raiz/terrenos/terrenos.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { SociedadesUnidadesCentralizadorasI } from '../../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';

@Component({
  selector: 'app-add-upd-del-terreno', standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-terreno.component.html', styleUrl: './add-upd-del-terreno.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelTerrenoComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() terrenoData: TerrenosI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];
  @Input() sociedades: SociedadesUnidadesCentralizadorasI[] = [];
  @Input() estados: EstadosTerrenosI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<TerrenosI>();
  @Output() eliminar = new EventEmitter<number>();

  terrenoForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.terrenoForm = this.crearFormulario();
  }
  ngOnChanges(): void { this.terrenoForm = this.crearFormulario(); if (this.modo === 'eliminar') this.terrenoForm.disable(); }

  private crearFormulario() {
    const t = this.terrenoData;
    return this.fb.group({
      idTerreno: [t?.idTerreno ?? null], unidad: [t?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required],
      sociedad: [t?.sociedadUnidadCentralizadoraDTO?.idSociedadUnidadCentralizadora ?? '', Validators.required], estado: [t?.estadoTerrenoDTO?.idEstadoTerreno ?? '', Validators.required],
      denominacionTerreno: [t?.denominacionTerreno ?? '', Validators.required], numeroInventarioTerreno: [t?.numeroInventarioTerreno ?? '', Validators.required], numeroActivoFijoTerreno: [t?.numeroActivoFijoTerreno ?? '', Validators.required],
      numeroCatastralTerreno: [t?.numeroCatastralTerreno ?? ''], numeroEscrituraTerreno: [t?.numeroEscrituraTerreno ?? ''], numeroNotariaTerreno: [t?.numeroNotariaTerreno ?? ''], lugarUbicacionNotariaTerreno: [t?.lugarUbicacionNotariaTerreno ?? ''], fechaHMSMatriculaTerreno: [this.fecha(t?.fechaHMSMatriculaTerreno)],
      paisOrigenTerreno: [t?.paisOrigenTerreno ?? ''], departamentoOEstadoOrigenTerreno: [t?.departamentoOEstadoOrigenTerreno ?? ''], ciudadOrigenTerreno: [t?.ciudadOrigenTerreno ?? ''], direccionTerreno: [t?.direccionTerreno ?? ''], latitudTerreno: [t?.latitudTerreno ?? ''], longitudTerreno: [t?.longitudTerreno ?? ''],
      numeroAreaTerreno: [t?.numeroAreaTerreno ?? ''], nombreUnidadMedidaTerreno: [t?.nombreUnidadMedidaTerreno ?? ''], siONoExoneradoImpuestoPredialTerreno: [t?.siONoExoneradoImpuestoPredialTerreno ?? 'NO'], numeroAnosExoneracionImpuestoPredialTerreno: [t?.numeroAnosExoneracionImpuestoPredialTerreno ?? 0], observacionesTerreno: [t?.observacionesTerreno ?? ''], fechaHMSAltaTerreno: [this.fecha(t?.fechaHMSAltaTerreno)], fechaHMSIngresoTerreno: [this.fecha(t?.fechaHMSIngresoTerreno) || this.ahora()]
    });
  }
  private fecha(value: unknown): string { return value ? String(value).replace(' ', 'T').slice(0, 16) : ''; }
  private ahora(): string { const d = new Date(); const z = (v: number) => String(v).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`; }
  private backend(value: string): string { return value?.length === 16 ? `${value}:00` : value; }

  enviar(): void {
    if (this.terrenoForm.invalid) { this.terrenoForm.markAllAsTouched(); return; }
    const v = this.terrenoForm.getRawValue();
    const unidad = this.unidadesMilitares.find(x => x.idUnidadMilitar === Number(v.unidad));
    const sociedad = this.sociedades.find(x => x.idSociedadUnidadCentralizadora === Number(v.sociedad));
    const estado = this.estados.find(x => x.idEstadoTerreno === Number(v.estado));
    if (!unidad || !sociedad || !estado) return;
    this.guardar.emit({
      idTerreno: v.idTerreno ?? undefined, unidadMilitarDTO: unidad, sociedadUnidadCentralizadoraDTO: sociedad, estadoTerrenoDTO: estado,
      denominacionTerreno: v.denominacionTerreno!, numeroInventarioTerreno: v.numeroInventarioTerreno!, numeroActivoFijoTerreno: v.numeroActivoFijoTerreno!, numeroCatastralTerreno: v.numeroCatastralTerreno!, numeroEscrituraTerreno: v.numeroEscrituraTerreno!, numeroNotariaTerreno: v.numeroNotariaTerreno!, lugarUbicacionNotariaTerreno: v.lugarUbicacionNotariaTerreno!, fechaHMSMatriculaTerreno: this.backend(v.fechaHMSMatriculaTerreno!), paisOrigenTerreno: v.paisOrigenTerreno!, departamentoOEstadoOrigenTerreno: v.departamentoOEstadoOrigenTerreno!, ciudadOrigenTerreno: v.ciudadOrigenTerreno!, direccionTerreno: v.direccionTerreno!, latitudTerreno: v.latitudTerreno!, longitudTerreno: v.longitudTerreno!, numeroAreaTerreno: v.numeroAreaTerreno!, nombreUnidadMedidaTerreno: v.nombreUnidadMedidaTerreno!, siONoExoneradoImpuestoPredialTerreno: v.siONoExoneradoImpuestoPredialTerreno!, numeroAnosExoneracionImpuestoPredialTerreno: Number(v.numeroAnosExoneracionImpuestoPredialTerreno), observacionesTerreno: v.observacionesTerreno!, fechaHMSAltaTerreno: this.backend(v.fechaHMSAltaTerreno!), fechaHMSIngresoTerreno: this.backend(v.fechaHMSIngresoTerreno!), fechaHMSModificacionTerreno: this.backend(this.ahora())
    });
  }
  confirmarEliminar(): void { const id = this.terrenoForm.getRawValue().idTerreno; if (id) this.eliminar.emit(Number(id)); }
}
