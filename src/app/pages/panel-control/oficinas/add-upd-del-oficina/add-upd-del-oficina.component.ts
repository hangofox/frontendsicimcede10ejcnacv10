import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { OficinasI } from '../../../../interfaces/panel-control/oficinas/oficinas.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

@Component({
  selector: 'app-add-upd-del-oficina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-oficina.component.html',
  styleUrl: './add-upd-del-oficina.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelOficinaComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() oficinaData: OficinasI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<OficinasI>();
  @Output() eliminar = new EventEmitter<number>();

  oficinasForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['oficinaData']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const oficina = this.oficinaData;
    this.oficinasForm = this.formBuilder.group({
      idOficina: [oficina?.idOficina ?? null],
      nombreOficina: [oficina?.nombreOficina ?? '', Validators.required],
      centroCostoOficina: [oficina?.centroCostoOficina ?? '', Validators.required],
      unidadMilitarSeleccionada: [oficina?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required]
    });
    if (this.banderaCrudEliminar) {
      this.oficinasForm.disable();
    }
  }

  guardarModificar(): void {
    if (this.oficinasForm.invalid) {
      this.oficinasForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.oficinasForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));

    const oficina: OficinasI = {
      idOficina: valoresFormulario.idOficina ?? undefined,
      nombreOficina: valoresFormulario.nombreOficina,
      centroCostoOficina: valoresFormulario.centroCostoOficina,
      unidadMilitarDTO: unidadMilitar ?? this.unidadesMilitares[0]
    };
    this.guardar.emit(oficina);
  }

  confirmarEliminar(): void {
    const idOficina = this.oficinasForm.getRawValue().idOficina;
    if (idOficina) {
      this.eliminar.emit(Number(idOficina));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
