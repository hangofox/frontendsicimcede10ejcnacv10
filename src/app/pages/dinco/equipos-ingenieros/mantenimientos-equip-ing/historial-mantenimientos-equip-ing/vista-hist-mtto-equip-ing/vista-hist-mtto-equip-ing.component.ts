import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialMantenimientosEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/historial-mantenimientos-equip-ing/historial-mantenimientos-equip-ing.interface';

@Component({
  selector: 'app-vista-hist-mtto-equip-ing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-mtto-equip-ing.component.html',
  styleUrl: './vista-hist-mtto-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaHistMttoEquipIngComponent {

  @Input() historialMantenimientoEquipoIngenieroData: HistorialMantenimientosEquipIngI | null = null;
  //FECHA Y VALOR YA FORMATEADOS POR EL LISTADO (LOS MISMOS QUE SE VEN EN LA TABLA):
  @Input() fechaFormateada = '';
  @Input() valorFormateado = '';
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
