import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

@Component({
  selector: 'app-vista-solicitud-mantenimiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-solicitud-mantenimiento.component.html',
  styleUrl: './vista-solicitud-mantenimiento.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaSolicitudMantenimientoComponent {

  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
