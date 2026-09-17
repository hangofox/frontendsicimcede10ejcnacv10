import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialResponsablesInfraestI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/historial-responsables-infraest/historial-responsables-infraest.interface';
@Component({ selector: 'app-vista-historial-responsables-infraest', standalone: true, imports: [CommonModule], templateUrl: './vista-historial-responsables-infraest.component.html', styleUrl: './vista-historial-responsables-infraest.component.scss' })
export class VistaHistorialResponsablesInfraestComponent { @Input() historialData: HistorialResponsablesInfraestI | null = null; @Output() cerrarModal = new EventEmitter<void>(); }
