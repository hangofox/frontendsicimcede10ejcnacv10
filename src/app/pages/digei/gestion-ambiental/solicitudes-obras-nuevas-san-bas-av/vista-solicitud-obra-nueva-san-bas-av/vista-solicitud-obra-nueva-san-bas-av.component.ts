import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

//DETALLE DE SOLO LECTURA DE UNA SOLICITUD DE INFRAESTRUCTURA AVALADA (MISMA PLANTILLA Y ESTILOS DE VistaSolicitudObraNuevaSaneamientoBasicoComponent):
@Component({
  selector: 'app-vista-solicitud-obra-nueva-san-bas-av',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-solicitud-obra-nueva-san-bas-av.component.html',
  styleUrl: './vista-solicitud-obra-nueva-san-bas-av.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaSolicitudObraNuevaSaneamientoBasicoAvaladoComponent {

  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
