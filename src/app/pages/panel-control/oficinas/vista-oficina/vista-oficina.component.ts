import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OficinasI } from '../../../../interfaces/panel-control/oficinas/oficinas.interface';

@Component({
  selector: 'app-vista-oficina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-oficina.component.html',
  styleUrl: './vista-oficina.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaOficinaComponent {

  @Input() oficinaData: OficinasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
