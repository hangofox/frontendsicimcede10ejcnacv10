import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

@Component({
  selector: 'app-vista-solicitud-obra-nueva-san-bas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-solicitud-obra-nueva-san-bas.component.html',
  styleUrl: './vista-solicitud-obra-nueva-san-bas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaSolicitudObraNuevaSaneamientoBasicoComponent {

  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
