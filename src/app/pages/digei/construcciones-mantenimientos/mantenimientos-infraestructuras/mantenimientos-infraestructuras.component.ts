import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mantenimientos-infraestructuras',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mantenimientos-infraestructuras.component.html',
  styleUrl: './mantenimientos-infraestructuras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MantenimientosInfraestructurasComponent {}
