import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialDemerDesgastEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/historial-demer-desgast-equip-ing.interface';

@Component({
  selector: 'app-vista-hist-demer-desgast-equip-ing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-demer-desgast-equip-ing.component.html',
  styleUrl: './vista-hist-demer-desgast-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaHistDemerDesgastEquipIngComponent {

  @Input() historialDemeritoDesgasteData: HistorialDemerDesgastEquipIngI | null = null;
  //VALORES YA FORMATEADOS POR EL LISTADO (SEPARADOR DE MILES ES-CO):
  @Input() valorFormateado = '-';
  @Input() horasFormateadas = '-';
  @Input() kilometrosFormateados = '-';
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
