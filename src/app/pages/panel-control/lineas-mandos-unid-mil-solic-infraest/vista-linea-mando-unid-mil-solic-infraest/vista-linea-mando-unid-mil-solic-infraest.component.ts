import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineasMandosUnidadesMilitaresSolicInfraestI } from '../../../../interfaces/panel-control/lineas-mandos-unid-mil-solic-infraest/lineas-mandos-unid-mil-solic-infraest.interface';

@Component({
  selector: 'app-vista-linea-mando-unid-mil-solic-infraest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-linea-mando-unid-mil-solic-infraest.component.html',
  styleUrl: './vista-linea-mando-unid-mil-solic-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaLineaMandoUnidMilSolicInfraestComponent {

  @Input() lineaMandoUnidadMilitarSolicInfraestData: LineasMandosUnidadesMilitaresSolicInfraestI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
