import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentrosCostosUnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/centros-costos-unidades-militares/centros-costos-unidades-militares.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

@Component({
  selector: 'app-add-upd-del-centro-costo-unidad-militar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-centro-costo-unidad-militar.component.html',
  styleUrl: './add-upd-del-centro-costo-unidad-militar.component.scss'
})
export class AddUpdDelCentroCostoUnidadMilitarComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() centroCostoData: CentrosCostosUnidadesMilitaresI | null = null;
  @Input({ required: true }) unidadMilitar!: UnidadesMilitaresI;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<CentrosCostosUnidadesMilitaresI>();
  @Output() eliminar = new EventEmitter<number>();
  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnChanges(): void { this.iniciarFormulario(); }

  enviar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idCentroCostoUnidadMilitar: valores.id ?? undefined,
      centroCostoUnidadMilitar: String(valores.centroCosto).trim().toUpperCase(),
      unidadMilitarDTO: this.unidadMilitar
    });
  }

  confirmarEliminar(): void {
    const id = this.form.getRawValue().id;
    if (id) this.eliminar.emit(Number(id));
  }

  private iniciarFormulario(): void {
    this.form = this.formBuilder.group({
      id: [this.centroCostoData?.idCentroCostoUnidadMilitar ?? null],
      centroCosto: [this.centroCostoData?.centroCostoUnidadMilitar ?? '', Validators.required]
    });
    if (this.modo === 'eliminar') this.form.disable();
  }
}
