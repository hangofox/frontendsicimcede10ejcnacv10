import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialIntegrantesSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.interface';

@Component({
  selector: 'app-vista-hist-integ-solic-mtto-san-bas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-integ-solic-mtto-san-bas.component.html',
  styleUrl: './vista-hist-integ-solic-mtto-san-bas.component.scss'
})
export class VistaHistorialIntegranteSolicMttoSbComponent {
  @Input() data: HistorialIntegrantesSolicInfraestI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
