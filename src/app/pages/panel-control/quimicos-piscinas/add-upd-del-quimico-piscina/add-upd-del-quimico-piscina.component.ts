import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuimicosPiscinasI } from '../../../../interfaces/panel-control/quimicos-piscinas/quimicos-piscinas.interface';

@Component({
  selector: 'app-add-upd-del-quimico-piscina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-quimico-piscina.component.html',
  styleUrl: './add-upd-del-quimico-piscina.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelQuimicoPiscinaComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() quimicoPiscinaData: QuimicosPiscinasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<QuimicosPiscinasI>();
  @Output() eliminar = new EventEmitter<number>();

  quimicosPiscinasForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['quimicoPiscinaData']) this.inicializarFormulario();
  }

  //INICIALIZA EL FORMULARIO CON LOS DATOS DEL REGISTRO SELECCIONADO:
  private inicializarFormulario(): void {
    this.quimicosPiscinasForm = this.formBuilder.group({
      idQuimicoPiscina: [this.quimicoPiscinaData?.idQuimicoPiscina ?? null],
      nombreQuimicoPiscina: [this.quimicoPiscinaData?.nombreQuimicoPiscina ?? '', Validators.required]
    });
    if (this.banderaCrudEliminar) this.quimicosPiscinasForm.disable();
  }

  guardarModificar(): void {
    if (this.quimicosPiscinasForm.invalid) {
      this.quimicosPiscinasForm.markAllAsTouched();
      return;
    }
    const valores = this.quimicosPiscinasForm.getRawValue();
    this.guardar.emit({
      idQuimicoPiscina: valores.idQuimicoPiscina ?? undefined,
      nombreQuimicoPiscina: valores.nombreQuimicoPiscina.trim().toUpperCase()
    });
  }

  confirmarEliminar(): void {
    const idQuimicoPiscina = this.quimicosPiscinasForm.getRawValue().idQuimicoPiscina;
    if (idQuimicoPiscina) this.eliminar.emit(Number(idQuimicoPiscina));
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
