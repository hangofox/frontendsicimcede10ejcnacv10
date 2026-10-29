import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-eq_tr-obr-red-mitig/historial-eq_tr-obr-red-mitig.interface';

@Component({
  selector: 'app-vista-hist-eq_tr-obr-red-mitig',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-eq_tr-obr-red-mitig.component.html',
  styleUrl: './vista-hist-eq_tr-obr-red-mitig.component.scss'
})
export class VistaHistEqTrObrRedMitigComponent {
  @Input() data: HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
