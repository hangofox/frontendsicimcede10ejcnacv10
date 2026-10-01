import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fecha-acceso',
  standalone: true,
  imports: [DatePipe],
  template: `<time class="fecha-acceso">{{ ahora | date:"EEEE, d 'de' MMMM 'de' y HH:mm":"":"es-CO" }}</time>`,
  styles: [`
    :host { position: absolute; z-index: 4; top: clamp(34px, 2.27vw, 45px); left: clamp(40px, 3.2vw, 64px); }
    .fecha-acceso { font-family: Arial, sans-serif; font-size: clamp(.86rem, .95vw, 1.2rem); font-weight: 400; line-height: 1.2; white-space: nowrap; color: #f4cdd6; text-shadow: 0 0 1px rgb(255 255 255 / 45%), 0 0 6px rgb(242 13 35 / 30%); }
    @media (max-width: 720px) { :host { top: 4px; left: 8px; } .fecha-acceso { font-size: 10px; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FechaAccesoComponent {
  readonly ahora = new Date();
}
