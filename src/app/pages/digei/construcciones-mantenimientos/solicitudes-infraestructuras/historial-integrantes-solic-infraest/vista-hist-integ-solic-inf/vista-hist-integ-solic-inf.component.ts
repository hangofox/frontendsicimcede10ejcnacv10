import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialIntegrantesSolicInfraestI } from '../../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.interface';

@Component({
  selector: 'app-vista-hist-integ-solic-inf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-integ-solic-inf.component.html',
  styleUrl: './vista-hist-integ-solic-inf.component.scss'
})
export class VistaHistorialIntegranteSolicInfraestComponent {
  @Input() data: HistorialIntegrantesSolicInfraestI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
