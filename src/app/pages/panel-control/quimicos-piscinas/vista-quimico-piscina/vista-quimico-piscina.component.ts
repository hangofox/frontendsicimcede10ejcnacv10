import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuimicosPiscinasI } from '../../../../interfaces/panel-control/quimicos-piscinas/quimicos-piscinas.interface';

@Component({
  selector: 'app-vista-quimico-piscina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-quimico-piscina.component.html',
  styleUrl: './vista-quimico-piscina.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaQuimicoPiscinaComponent {
  @Input() quimicoPiscinaData: QuimicosPiscinasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
