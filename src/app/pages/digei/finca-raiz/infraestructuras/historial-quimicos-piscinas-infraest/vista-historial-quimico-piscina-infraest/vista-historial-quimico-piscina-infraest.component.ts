import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistorialQuimicosPiscinasInfraestI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/historial-quimicos-piscinas-infraest/historial-quimicos-piscinas-infraest.interface';
@Component({ selector: 'app-vista-historial-quimico-piscina-infraest', standalone: true, imports: [CommonModule], templateUrl: './vista-historial-quimico-piscina-infraest.component.html', styleUrl: './vista-historial-quimico-piscina-infraest.component.scss' })
export class VistaHistorialQuimicoPiscinaInfraestComponent { @Input() historialData: HistorialQuimicosPiscinasInfraestI | null = null; @Output() cerrarModal = new EventEmitter<void>(); }
