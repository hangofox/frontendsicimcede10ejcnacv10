import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-semaforo-contadores',
  standalone: true,
  templateUrl: './semaforo-contadores.component.html',
  styleUrl: './semaforo-contadores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SemaforoContadoresComponent {
  @Input({ required: true }) total = 0;
  @Input() activos: number | null = null;
  @Input() inactivos: number | null = null;
  @Input() estados: ReadonlyArray<{ etiqueta: string; valor: number; tono?: string }> = [];
}
