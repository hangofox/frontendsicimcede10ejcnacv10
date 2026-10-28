import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialMaqPesadApoyAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-maq-pesad-apoy-atenc-prev-des/historial-maq-pesad-apoy-atenc-prev-des.interface';

@Component({
  selector: 'app-vista-hist-maq-pesad-apoy-atenc-prev-des',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-maq-pesad-apoy-at-prev-des.component.html',
  styleUrl: './vista-hist-maq-pesad-apoy-at-prev-des.component.scss'
})
export class VistaHistMaqPesadApoyAtencPrevDesComponent {
  @Input() data: HistorialMaqPesadApoyAtencPrevEmergDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
