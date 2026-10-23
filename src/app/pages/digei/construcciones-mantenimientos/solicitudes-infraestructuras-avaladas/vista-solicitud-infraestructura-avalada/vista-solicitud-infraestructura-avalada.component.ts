import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

//DETALLE DE SOLO LECTURA DE UNA SOLICITUD DE INFRAESTRUCTURA AVALADA (MISMA PLANTILLA Y ESTILOS DE VistaSolicitudInfraestructuraComponent):
@Component({
  selector: 'app-vista-solicitud-infraestructura-avalada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-solicitud-infraestructura-avalada.component.html',
  styleUrl: './vista-solicitud-infraestructura-avalada.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaSolicitudInfraestructuraAvaladaComponent {

  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
