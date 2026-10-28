import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

//DETALLE DE SOLO LECTURA DE UNA SOLICITUD DE INFRAESTRUCTURA AVALADA (MISMA PLANTILLA Y ESTILOS DE VistaSolicitudMantenimientoComponent):
@Component({
  selector: 'app-vista-solicitud-mantenimiento-avalado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-solicitud-mantenimiento-avalado.component.html',
  styleUrl: './vista-solicitud-mantenimiento-avalado.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaSolicitudMantenimientoAvaladoComponent {

  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
