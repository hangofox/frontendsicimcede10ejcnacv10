import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineasMandosUnidadesMilitaresI } from '../../../../interfaces/panel-control/lineas-mandos-unidades-militares/lineas-mandos-unidades-militares.interface';

@Component({
  selector: 'app-vista-linea-mando-unidad-militar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-linea-mando-unidad-militar.component.html',
  styleUrl: './vista-linea-mando-unidad-militar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaLineaMandoUnidadMilitarComponent {

  @Input() lineaMandoUnidadMilitarData: LineasMandosUnidadesMilitaresI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
