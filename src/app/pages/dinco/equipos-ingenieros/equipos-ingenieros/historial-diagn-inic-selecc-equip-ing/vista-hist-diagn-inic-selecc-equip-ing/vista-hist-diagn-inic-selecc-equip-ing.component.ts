import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialDiagnInicSeleccEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/historial-diagn-inic-selecc-equip-ing.interface';

@Component({
  selector: 'app-vista-hist-diagn-inic-selecc-equip-ing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-diagn-inic-selecc-equip-ing.component.html',
  styleUrl: './vista-hist-diagn-inic-selecc-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaHistDiagnInicSeleccEquipIngComponent {

  @Input() historialDiagnosticoData: HistorialDiagnInicSeleccEquipIngI | null = null;
  //CLASE DEL BADGE DEL ESTADO, YA CALCULADA POR EL LISTADO (MISMO TONO DEL SEMÁFORO):
  @Input() claseEstado = 'badge-neutral';
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
