import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-ambiental',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gestion-ambiental.component.html',
  styleUrl: './gestion-ambiental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestionAmbientalComponent {}
