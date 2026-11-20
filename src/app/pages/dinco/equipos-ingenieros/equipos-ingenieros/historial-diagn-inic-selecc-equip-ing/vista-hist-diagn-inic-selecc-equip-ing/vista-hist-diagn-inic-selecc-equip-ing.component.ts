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

  //"SIGLA O ACRÓNIMO — NOMBRE" DE LA UNIDAD MILITAR DE LA REALIZADORA; SE LEE CON CUIDADO PARA QUE LA VISTA NUNCA SE ROMPA SI EL BACKEND LA ENVÍA INCOMPLETA:
  get textoRealizadora(): string {
    const realizadora = this.historialDiagnosticoData?.unidadMilitarRealizadoraMantenimientoDTO as Partial<HistorialDiagnInicSeleccEquipIngI['unidadMilitarRealizadoraMantenimientoDTO']> | null | undefined;
    const unidad = realizadora?.unidadMilitarDTO;
    return unidad ? `${unidad.siglaoAcronimoUnidadMilitar} — ${unidad.nombreUnidadMilitar}` : '-';
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
