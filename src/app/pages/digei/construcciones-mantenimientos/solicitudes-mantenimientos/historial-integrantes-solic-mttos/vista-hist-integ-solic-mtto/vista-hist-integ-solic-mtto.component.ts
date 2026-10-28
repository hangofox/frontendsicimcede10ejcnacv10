import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialIntegrantesSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.interface';

@Component({
  selector: 'app-vista-hist-integ-solic-mtto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-integ-solic-mtto.component.html',
  styleUrl: './vista-hist-integ-solic-mtto.component.scss'
})
export class VistaHistorialIntegranteSolicMttoComponent {
  @Input() data: HistorialIntegrantesSolicInfraestI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
