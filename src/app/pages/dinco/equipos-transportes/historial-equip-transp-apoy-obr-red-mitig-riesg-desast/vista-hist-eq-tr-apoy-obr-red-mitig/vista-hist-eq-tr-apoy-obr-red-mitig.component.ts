import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI } from '../../../../../interfaces/dinco/equipos-transportes/historial-equip-transp-apoy-obr-red-mitig-riesg-desast/historial-equip-transp-apoy-obr-red-mitig-riesg-desast.interface';

@Component({
  selector: 'app-vista-hist-eq-tr-apoy-obr-red-mitig',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-eq-tr-apoy-obr-red-mitig.component.html',
  styleUrl: './vista-hist-eq-tr-apoy-obr-red-mitig.component.scss'
})
export class VistaHistEqTrApoyObrRedMitigComponent {
  @Input() data: HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
