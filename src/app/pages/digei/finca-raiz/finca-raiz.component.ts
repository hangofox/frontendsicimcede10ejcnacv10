import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-finca-raiz',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './finca-raiz.component.html',
  styleUrl: './finca-raiz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FincaRaizComponent {}
