import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-consolidaciones',
  standalone: true,
  templateUrl: './consolidaciones.component.html',
  styleUrl: './consolidaciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsolidacionesComponent {}
