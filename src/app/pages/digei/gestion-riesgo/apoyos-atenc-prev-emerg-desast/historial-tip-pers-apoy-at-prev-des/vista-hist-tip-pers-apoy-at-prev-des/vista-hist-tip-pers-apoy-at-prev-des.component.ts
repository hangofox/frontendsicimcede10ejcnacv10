import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialTipoPersonalApoyAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-tip-pers-apoy-atenc-prev-des/historial-tip-pers-apoy-atenc-prev-des.interface';

@Component({
  selector: 'app-vista-hist-tip-pers-apoy-atenc-prev-des',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-tip-pers-apoy-at-prev-des.component.html',
  styleUrl: './vista-hist-tip-pers-apoy-at-prev-des.component.scss'
})
export class VistaHistTipPersApoyAtencPrevDesComponent {
  @Input() data: HistorialTipoPersonalApoyAtencPrevEmergDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
