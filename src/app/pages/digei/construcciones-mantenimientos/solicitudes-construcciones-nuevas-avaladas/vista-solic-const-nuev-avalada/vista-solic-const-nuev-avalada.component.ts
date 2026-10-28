import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

//DETALLE DE SOLO LECTURA DE UNA SOLICITUD DE INFRAESTRUCTURA AVALADA (MISMA PLANTILLA Y ESTILOS DE VistaSolicitudConstruccionNuevaComponent):
@Component({
  selector: 'app-vista-solic-const-nuev-avalada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-solic-const-nuev-avalada.component.html',
  styleUrl: './vista-solic-const-nuev-avalada.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaSolicitudConstruccionNuevaAvaladaComponent {

  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
