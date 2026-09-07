import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TerrenosI } from '../../../../../interfaces/digei/finca-raiz/terrenos/terrenos.interface';

@Component({ selector: 'app-vista-terreno', standalone: true, imports: [CommonModule], templateUrl: './vista-terreno.component.html', styleUrl: './vista-terreno.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class VistaTerrenoComponent { @Input() terrenoData: TerrenosI | null = null; @Output() cerrarModal = new EventEmitter<void>(); }
