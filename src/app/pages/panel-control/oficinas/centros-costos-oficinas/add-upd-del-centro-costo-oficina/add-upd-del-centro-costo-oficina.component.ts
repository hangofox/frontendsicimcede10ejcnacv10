import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentrosCostosOficinasI } from '../../../../../interfaces/panel-control/oficinas/centros-costos-oficinas/centros-costos-oficinas.interface';
import { OficinasI } from '../../../../../interfaces/panel-control/oficinas/oficinas.interface';
@Component({ selector: 'app-add-upd-del-centro-costo-oficina', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './add-upd-del-centro-costo-oficina.component.html', styleUrl: './add-upd-del-centro-costo-oficina.component.scss' })
export class AddUpdDelCentroCostoOficinaComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar'; @Input() centroCostoData: CentrosCostosOficinasI | null = null; @Input({ required: true }) oficina!: OficinasI;
  @Output() cerrarModal = new EventEmitter<void>(); @Output() guardar = new EventEmitter<CentrosCostosOficinasI>(); @Output() eliminar = new EventEmitter<number>(); form!: FormGroup;
  constructor(private fb: FormBuilder) { this.iniciar(); }
  ngOnChanges(changes: SimpleChanges): void { if (changes['modo'] || changes['centroCostoData']) this.iniciar(); }
  private iniciar(): void { this.form = this.fb.group({ id: [this.centroCostoData?.idCentroCostoOficina ?? null], centroCosto: [this.centroCostoData?.centroCostoOficina ?? '', Validators.required] }); if (this.modo === 'eliminar') this.form.disable(); }
  enviar(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const v = this.form.getRawValue(); this.guardar.emit({ idCentroCostoOficina: v.id ?? undefined, centroCostoOficina: String(v.centroCosto).trim().toUpperCase(), oficinaDTO: this.oficina }); }
  confirmarEliminar(): void { const id = this.form.getRawValue().id; if (id) this.eliminar.emit(Number(id)); }
}
