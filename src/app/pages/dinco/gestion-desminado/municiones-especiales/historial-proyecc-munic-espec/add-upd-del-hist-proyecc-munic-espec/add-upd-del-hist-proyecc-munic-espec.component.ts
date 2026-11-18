import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MunicionesEspecialesI } from '../../../../../../interfaces/dinco/gestion-desminado/municiones-especiales/municiones-especiales.interface';
import { HistorialProyeccMunicEspecI } from '../../../../../../interfaces/dinco/gestion-desminado/municiones-especiales/historial-proyecc-munic-espec/historial-proyecc-munic-espec.interface';

@Component({
  selector: 'app-add-upd-del-hist-proyecc-munic-espec',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-proyecc-munic-espec.component.html',
  styleUrl: './add-upd-del-hist-proyecc-munic-espec.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelHistProyeccMunicEspecComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() historialProyeccionMunicionEspecialData: HistorialProyeccMunicEspecI | null = null;
  //LA PROYECCIÓN SIEMPRE QUEDA ASOCIADA A LA MUNICIÓN ESPECIAL DESDE LA QUE SE ABRIÓ EL HISTORIAL (NO SE ELIGE EN EL FORMULARIO):
  @Input({ required: true }) municionEspecial!: MunicionesEspecialesI;

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialProyeccMunicEspecI>();
  @Output() eliminar = new EventEmitter<number>();

  historialesProyeccionesMunicionesEspecialesForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['historialProyeccionMunicionEspecialData']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const registro = this.historialProyeccionMunicionEspecialData;
    this.historialesProyeccionesMunicionesEspecialesForm = this.formBuilder.group({
      idHistorialProyeccionMunicionEspecial: [registro?.idHistorialProyeccionMunicionEspecial ?? null],
      numRegHistorialProyeccionMunicionEspecial: [registro?.numRegHistorialProyeccionMunicionEspecial ?? '', Validators.required],
      nombreBienOServicioHistorialProyeccionMunicionEspecial: [registro?.nombreBienOServicioHistorialProyeccionMunicionEspecial ?? '', Validators.required],
      numeroRubroPresupuestalHistProyMunEsp: [registro?.numeroRubroPresupuestalHistProyMunEsp ?? '', Validators.required],
      cantidadSolicitadaHistorialProyeccionMunicionEspecial: [registro?.cantidadSolicitadaHistorialProyeccionMunicionEspecial ?? '', [Validators.required, Validators.pattern(/^\d+$/)]],
      valorTotalHistorialProyeccionMunicionEspecial: [registro?.valorTotalHistorialProyeccionMunicionEspecial ?? '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
    if (this.banderaCrudEliminar) {
      this.historialesProyeccionesMunicionesEspecialesForm.disable();
    }
  }

  //VERDADERO CUANDO EL CAMPO YA FUE TOCADO Y NO CUMPLE SU VALIDACIÓN (PARA MOSTRAR EL MENSAJE DE ERROR):
  campoInvalido(nombreCampo: string): boolean {
    const control = this.historialesProyeccionesMunicionesEspecialesForm.get(nombreCampo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  private aMayusculas(valor: unknown): string {
    return String(valor ?? '').trim().toUpperCase();
  }

  guardarModificar(): void {
    if (this.historialesProyeccionesMunicionesEspecialesForm.invalid) {
      this.historialesProyeccionesMunicionesEspecialesForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.historialesProyeccionesMunicionesEspecialesForm.getRawValue();
    this.guardar.emit({
      idHistorialProyeccionMunicionEspecial: valoresFormulario.idHistorialProyeccionMunicionEspecial ?? undefined,
      numRegHistorialProyeccionMunicionEspecial: this.aMayusculas(valoresFormulario.numRegHistorialProyeccionMunicionEspecial),
      nombreBienOServicioHistorialProyeccionMunicionEspecial: this.aMayusculas(valoresFormulario.nombreBienOServicioHistorialProyeccionMunicionEspecial),
      numeroRubroPresupuestalHistProyMunEsp: this.aMayusculas(valoresFormulario.numeroRubroPresupuestalHistProyMunEsp),
      cantidadSolicitadaHistorialProyeccionMunicionEspecial: Number(valoresFormulario.cantidadSolicitadaHistorialProyeccionMunicionEspecial),
      valorTotalHistorialProyeccionMunicionEspecial: String(valoresFormulario.valorTotalHistorialProyeccionMunicionEspecial).trim(),
      municionEspecialDTO: this.municionEspecial
    });
  }

  confirmarEliminar(): void {
    const idHistorialProyeccionMunicionEspecial = this.historialesProyeccionesMunicionesEspecialesForm.getRawValue().idHistorialProyeccionMunicionEspecial;
    if (idHistorialProyeccionMunicionEspecial) {
      this.eliminar.emit(Number(idHistorialProyeccionMunicionEspecial));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
