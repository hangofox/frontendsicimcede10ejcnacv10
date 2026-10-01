import { ChangeDetectionStrategy, Component } from '@angular/core';

// Copia visual del logo institucional: el cabezote del sistema permanece intacto.
@Component({
  selector: 'app-login-logo',
  standalone: true,
  templateUrl: './login-logo.component.html',
  styleUrl: './login-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginLogoComponent {}
