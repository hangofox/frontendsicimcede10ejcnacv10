import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesMilitaresRealizadorasMantenimientosI } from '../../../../interfaces/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.interface';

@Component({
  selector: 'app-vista-unidad-militar-realiz-mtto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-unidad-militar-realiz-mtto.component.html',
  styleUrl: './vista-unidad-militar-realiz-mtto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaUnidadMilitarRealizMttoComponent {

  @Input() unidadMilitarRealizMttoData: UnidadesMilitaresRealizadorasMantenimientosI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
