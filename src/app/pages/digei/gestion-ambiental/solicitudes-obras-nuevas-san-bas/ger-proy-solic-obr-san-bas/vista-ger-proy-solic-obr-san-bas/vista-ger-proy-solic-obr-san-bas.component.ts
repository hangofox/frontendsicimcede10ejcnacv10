import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GerentesProyectosSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/gerentes-proyectos-solic-infraest/gerentes-proyectos-solic-infraest.interface';

@Component({
  selector: 'app-vista-ger-proy-solic-obr-san-bas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-ger-proy-solic-obr-san-bas.component.html',
  styleUrl: './vista-ger-proy-solic-obr-san-bas.component.scss'
})
export class VistaGerenteProyectoSolicObrSbComponent {
  @Input() data: GerentesProyectosSolicInfraestI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
}
