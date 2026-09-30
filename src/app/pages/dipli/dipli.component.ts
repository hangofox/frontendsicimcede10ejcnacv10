import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlacaTituloSeccionComponent } from '../../shared/components/placa-titulo-seccion/placa-titulo-seccion.component';

@Component({
  selector: 'app-dipli',
  standalone: true,
  imports: [RouterLink, PlacaTituloSeccionComponent],
  templateUrl: './dipli.component.html',
  styleUrl: './dipli.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DipliComponent {

}
