import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialOrdenApoyoMovimientoTropaI } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-ordenes-apoy-mov-trop/historial-ordenes-apoy-mov-trop.interface';

@Component({
  selector: 'app-vista-hist-ord-apoy-mov-trop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-ord-apoy-mov-trop.component.html',
  styleUrl: './vista-hist-ord-apoy-mov-trop.component.scss'
})
export class VistaHistOrdApoyMovTropComponent {
  @Input() data: HistorialOrdenApoyoMovimientoTropaI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
