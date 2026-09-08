import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gestion-ambiental',
  standalone: true,
  templateUrl: './gestion-ambiental.component.html',
  styleUrl: './gestion-ambiental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestionAmbientalComponent {}
