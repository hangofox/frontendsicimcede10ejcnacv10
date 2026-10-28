import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialEquipTranspApoyAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-eq_tr-apoy-at-prev-em-des/historial-eq_tr-apoy-at-prev-em-des.interface';

@Component({
  selector: 'app-vista-hist-eq_tr-apoy-at-prev-em-des',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-eq_tr-apoy-at-prev-em-des.component.html',
  styleUrl: './vista-hist-eq_tr-apoy-at-prev-em-des.component.scss'
})
export class VistaHistEqTrApoyAtPrevEmDesComponent {
  @Input() data: HistorialEquipTranspApoyAtencPrevEmergDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
