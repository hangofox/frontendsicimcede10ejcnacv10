import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seguimiento-olvido-contrasena',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './seguimiento-olvido-contrasena.component.html',
  styleUrl: './seguimiento-olvido-contrasena.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeguimientoOlvidoContrasenaComponent {
  radicado = '';
  consultado = false;
  consultar(): void { this.consultado = this.radicado.trim().length > 0; }
}
