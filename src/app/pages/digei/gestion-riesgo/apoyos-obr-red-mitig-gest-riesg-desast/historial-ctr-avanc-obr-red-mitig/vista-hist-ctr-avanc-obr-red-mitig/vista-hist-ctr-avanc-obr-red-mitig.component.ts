import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialControlAvancObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-ctr-avanc-obr-red-mitig/historial-ctr-avanc-obr-red-mitig.interface';

@Component({
  selector: 'app-vista-hist-ctr-avanc-obr-red-mitig',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-ctr-avanc-obr-red-mitig.component.html',
  styleUrl: './vista-hist-ctr-avanc-obr-red-mitig.component.scss'
})
export class VistaHistCtrAvancObrRedMitigComponent {
  @Input() data: HistorialControlAvancObrRedMitigGestRiesgDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
