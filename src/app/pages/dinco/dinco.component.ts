import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlacaTituloSeccionComponent } from '../../shared/components/placa-titulo-seccion/placa-titulo-seccion.component';

@Component({
  selector: 'app-dinco',
  standalone: true,
  imports: [PlacaTituloSeccionComponent],
  templateUrl: './dinco.component.html',
  styleUrl: './dinco.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DincoComponent {

}
