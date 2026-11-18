import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlacaTituloSeccionComponent } from '../../shared/components/placa-titulo-seccion/placa-titulo-seccion.component';

@Component({
  selector: 'app-dinco',
  standalone: true,
  imports: [RouterLink, PlacaTituloSeccionComponent],
  templateUrl: './dinco.component.html',
  styleUrl: './dinco.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DincoComponent {}
