import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesInfraestructurasI } from '../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

@Component({
  selector: 'app-vista-solicitud-infraestructura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-solicitud-infraestructura.component.html',
  styleUrl: './vista-solicitud-infraestructura.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaSolicitudInfraestructuraComponent {

  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
