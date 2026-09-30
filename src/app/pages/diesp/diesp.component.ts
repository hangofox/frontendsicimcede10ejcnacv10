import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlacaTituloSeccionComponent } from '../../shared/components/placa-titulo-seccion/placa-titulo-seccion.component';

@Component({
  selector: 'app-diesp',
  standalone: true,
  imports: [PlacaTituloSeccionComponent],
  templateUrl: './diesp.component.html',
  styleUrl: './diesp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiespComponent {

}
