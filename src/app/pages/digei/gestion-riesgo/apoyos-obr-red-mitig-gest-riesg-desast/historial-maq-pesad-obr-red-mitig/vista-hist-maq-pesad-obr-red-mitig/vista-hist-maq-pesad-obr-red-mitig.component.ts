import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-maq-pesad-obr-red-mitig/historial-maq-pesad-obr-red-mitig.interface';

@Component({
  selector: 'app-vista-hist-maq-pesad-obr-red-mitig',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-maq-pesad-obr-red-mitig.component.html',
  styleUrl: './vista-hist-maq-pesad-obr-red-mitig.component.scss'
})
export class VistaHistMaqPesadObrRedMitigComponent {
  @Input() data: HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
