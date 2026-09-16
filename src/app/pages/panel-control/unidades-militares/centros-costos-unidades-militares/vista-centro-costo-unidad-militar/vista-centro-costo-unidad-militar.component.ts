import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CentrosCostosUnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/centros-costos-unidades-militares/centros-costos-unidades-militares.interface';

@Component({
  selector: 'app-vista-centro-costo-unidad-militar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-centro-costo-unidad-militar.component.html',
  styleUrl: './vista-centro-costo-unidad-militar.component.scss'
})
export class VistaCentroCostoUnidadMilitarComponent {
  @Input() centroCostoData: CentrosCostosUnidadesMilitaresI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
