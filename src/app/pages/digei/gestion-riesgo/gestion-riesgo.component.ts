import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-riesgo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gestion-riesgo.component.html',
  styleUrl: './gestion-riesgo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestionRiesgoComponent {}
