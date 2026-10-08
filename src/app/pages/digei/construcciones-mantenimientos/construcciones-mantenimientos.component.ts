import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-construcciones-mantenimientos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './construcciones-mantenimientos.component.html',
  styleUrl: './construcciones-mantenimientos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstruccionesMantenimientosComponent {}
