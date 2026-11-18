import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RazasCaninosI } from '../../../../interfaces/panel-control/razas-caninos/razas-caninos.interface';

@Component({
  selector: 'app-vista-raza-canino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-raza-canino.component.html',
  styleUrl: './vista-raza-canino.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaRazaCaninoComponent {
  @Input() razaCaninoData: RazasCaninosI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
