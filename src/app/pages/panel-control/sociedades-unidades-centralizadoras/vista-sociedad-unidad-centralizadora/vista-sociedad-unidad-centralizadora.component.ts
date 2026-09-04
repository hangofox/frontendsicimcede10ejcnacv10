import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SociedadesUnidadesCentralizadorasI } from '../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';

@Component({
  selector: 'app-vista-sociedad-unidad-centralizadora',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-sociedad-unidad-centralizadora.component.html',
  styleUrl: './vista-sociedad-unidad-centralizadora.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaSociedadUnidadCentralizadoraComponent {

  @Input() sociedadUnidadCentralizadoraData: SociedadesUnidadesCentralizadorasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
