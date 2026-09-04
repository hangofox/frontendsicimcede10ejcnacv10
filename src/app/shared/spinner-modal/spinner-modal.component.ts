import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerService } from '../../services/spinner/spinner.service';

//COMPONENTE COMPARTIDO DEL SPINNER (PIÑÓN GIRATORIO) — SE MONTA UNA ÚNICA VEZ EN LA RAÍZ DE LA APLICACIÓN
//(app.component.html) Y REACCIONA AL ESTADO GLOBAL DE SpinnerService, ASÍ QUE CUALQUIER COMPONENTE DEL PROYECTO
//PUEDE DISPARARLO ANTES DE ABRIR UN MODAL/POPUP SIN TENER QUE REPETIR ESTE MARCADO NI SU CSS.
@Component({
  selector: 'app-spinner-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner-modal.component.html',
  styleUrl: './spinner-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerModalComponent {
  constructor(public spinnerService: SpinnerService) {}
}
