import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialMantenimientosInfraestI } from '../../../../../../interfaces/digei/mantenimientos-infraestructuras/historial-mantenimientos-infraest/historial-mantenimientos-infraest.interface';

@Component({
  selector: 'app-vista-hist-mtto-infraest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-mtto-infraest.component.html',
  styleUrl: './vista-hist-mtto-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaHistorialMantenimientoInfraestComponent {

  @Input() historialMantenimientoInfraestructuraData: HistorialMantenimientosInfraestI | null = null;
  //FECHA Y VALOR YA FORMATEADOS POR EL LISTADO (LOS MISMOS QUE SE VEN EN LA TABLA):
  @Input() fechaFormateada = '';
  @Input() valorFormateado = '';
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
