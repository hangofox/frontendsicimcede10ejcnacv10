import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialEquipTranspApoyAtencPrevEmergDesastI } from '../../../../../interfaces/dinco/equipos-transportes/historial-equip-transp-apoy-atenc-prev-emerg-desast/historial-equip-transp-apoy-atenc-prev-emerg-desast.interface';

@Component({
  selector: 'app-vista-hist-eq-tr-apoy-atenc-prev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-eq-tr-apoy-atenc-prev.component.html',
  styleUrl: './vista-hist-eq-tr-apoy-atenc-prev.component.scss'
})
export class VistaHistEqTrApoyAtencPrevComponent {
  @Input() data: HistorialEquipTranspApoyAtencPrevEmergDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
