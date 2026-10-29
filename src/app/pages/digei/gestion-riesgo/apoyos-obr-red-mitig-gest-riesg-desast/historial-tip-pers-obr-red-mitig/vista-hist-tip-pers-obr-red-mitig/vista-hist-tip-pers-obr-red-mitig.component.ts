import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-tip-pers-obr-red-mitig/historial-tip-pers-obr-red-mitig.interface';

@Component({
  selector: 'app-vista-hist-tip-pers-obr-red-mitig',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-tip-pers-obr-red-mitig.component.html',
  styleUrl: './vista-hist-tip-pers-obr-red-mitig.component.scss'
})
export class VistaHistTipPersObrRedMitigComponent {
  @Input() data: HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
