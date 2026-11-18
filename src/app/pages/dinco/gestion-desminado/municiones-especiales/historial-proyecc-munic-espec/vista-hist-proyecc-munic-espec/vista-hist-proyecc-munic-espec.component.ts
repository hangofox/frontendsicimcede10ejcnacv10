import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialProyeccMunicEspecI } from '../../../../../../interfaces/dinco/gestion-desminado/municiones-especiales/historial-proyecc-munic-espec/historial-proyecc-munic-espec.interface';

@Component({
  selector: 'app-vista-hist-proyecc-munic-espec',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-hist-proyecc-munic-espec.component.html',
  styleUrl: './vista-hist-proyecc-munic-espec.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaHistProyeccMunicEspecComponent {

  @Input() historialProyeccionMunicionEspecialData: HistorialProyeccMunicEspecI | null = null;
  //VALOR TOTAL YA FORMATEADO POR EL LISTADO (EJ. "$ 3.500.000"):
  @Input() valorFormateado = '';
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
