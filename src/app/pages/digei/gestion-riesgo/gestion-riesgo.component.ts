import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gestion-riesgo',
  standalone: true,
  templateUrl: './gestion-riesgo.component.html',
  styleUrl: './gestion-riesgo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestionRiesgoComponent {}
