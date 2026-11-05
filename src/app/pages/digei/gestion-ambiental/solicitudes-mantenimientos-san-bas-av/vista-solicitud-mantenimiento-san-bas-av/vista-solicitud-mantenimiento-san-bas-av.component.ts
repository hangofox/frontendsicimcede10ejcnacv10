import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

//DETALLE DE SOLO LECTURA DE UNA SOLICITUD DE INFRAESTRUCTURA AVALADA (MISMA PLANTILLA Y ESTILOS DE VistaSolicitudMantenimientoSaneamientoBasicoComponent):
@Component({
  selector: 'app-vista-solicitud-mantenimiento-san-bas-av',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-solicitud-mantenimiento-san-bas-av.component.html',
  styleUrl: './vista-solicitud-mantenimiento-san-bas-av.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaSolicitudMantenimientoSaneamientoBasicoAvaladoComponent {

  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
