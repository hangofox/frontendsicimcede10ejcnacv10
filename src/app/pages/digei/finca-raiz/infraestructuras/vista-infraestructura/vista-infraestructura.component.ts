import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfraestructurasI } from '../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';

@Component({
  selector: 'app-vista-infraestructura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-infraestructura.component.html',
  styleUrl: './vista-infraestructura.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaInfraestructuraComponent {

  @Input() infraestructuraData: InfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
