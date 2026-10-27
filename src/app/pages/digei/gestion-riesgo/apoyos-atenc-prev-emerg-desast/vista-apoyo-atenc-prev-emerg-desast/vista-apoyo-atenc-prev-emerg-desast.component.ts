import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApoyosAtencPrevEmergDesastI } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';

@Component({
  selector: 'app-vista-apoyo-atenc-prev-emerg-desast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-apoyo-atenc-prev-emerg-desast.component.html',
  styleUrl: './vista-apoyo-atenc-prev-emerg-desast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaApoyoAtencPrevEmergDesastComponent {

  @Input() apoyoAtencPrevEmergDesastData: ApoyosAtencPrevEmergDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  //MUESTRA UNA FECHA DEL BACKEND (EJ. "2026-10-23T14:30:00.000-05:00" O "2026-10-23 14:30:00.0") COMO "2026-10-23 14:30", SIN
  //CONVERTIRLA DE ZONA HORARIA (EL BACKEND YA LA ENTREGA EN HORA DE BOGOTÁ POR spring.jackson.time-zone):
  formatearFecha(fecha: unknown): string {
    if (!fecha) return '-';
    return String(fecha).replace('T', ' ').slice(0, 16);
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
