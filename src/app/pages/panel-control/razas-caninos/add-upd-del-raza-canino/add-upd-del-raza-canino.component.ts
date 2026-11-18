import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RazasCaninosI } from '../../../../interfaces/panel-control/razas-caninos/razas-caninos.interface';

@Component({
  selector: 'app-add-upd-del-raza-canino',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-raza-canino.component.html',
  styleUrl: './add-upd-del-raza-canino.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelRazaCaninoComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() razaCaninoData: RazasCaninosI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<RazasCaninosI>();
  @Output() eliminar = new EventEmitter<number>();

  razasCaninosForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['razaCaninoData']) this.inicializarFormulario();
  }

  //INICIALIZA EL FORMULARIO CON LOS DATOS DEL REGISTRO SELECCIONADO:
  private inicializarFormulario(): void {
    this.razasCaninosForm = this.formBuilder.group({
      idRazaCanino: [this.razaCaninoData?.idRazaCanino ?? null],
      nombreRazaCanino: [this.razaCaninoData?.nombreRazaCanino ?? '', Validators.required]
    });
    if (this.banderaCrudEliminar) this.razasCaninosForm.disable();
  }

  guardarModificar(): void {
    if (this.razasCaninosForm.invalid) {
      this.razasCaninosForm.markAllAsTouched();
      return;
    }
    const valores = this.razasCaninosForm.getRawValue();
    this.guardar.emit({
      idRazaCanino: valores.idRazaCanino ?? undefined,
      nombreRazaCanino: valores.nombreRazaCanino.trim().toUpperCase()
    });
  }

  confirmarEliminar(): void {
    const idRazaCanino = this.razasCaninosForm.getRawValue().idRazaCanino;
    if (idRazaCanino) this.eliminar.emit(Number(idRazaCanino));
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
