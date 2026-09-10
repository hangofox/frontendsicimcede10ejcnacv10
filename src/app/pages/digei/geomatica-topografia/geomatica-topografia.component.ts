import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-geomatica-topografia',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './geomatica-topografia.component.html',
  styleUrl: './geomatica-topografia.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeomaticaTopografiaComponent {}
