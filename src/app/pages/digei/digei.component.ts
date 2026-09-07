import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type PosicionPinon =
  | 'superior-izquierda'
  | 'superior-derecha'
  | 'izquierda'
  | 'derecha'
  | 'inferior-izquierda'
  | 'inferior-derecha';

/**
 * Área del mapa de procesos de DIGEI.
 * `ruta` queda en null mientras no existan destinos definidos para las áreas;
 * al definirlos basta con rellenar este campo y enlazar desde la plantilla.
 */
interface AreaDigei {
  readonly id: string;
  readonly nombre: string;
  readonly posicion: PosicionPinon;
  readonly ruta: string | null;
}

@Component({
  selector: 'app-digei',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './digei.component.html',
  styleUrl: './digei.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigeiComponent {
  /** Los seis piñones periféricos reutilizan el mismo anillo dentado. */
  readonly areas: readonly AreaDigei[] = [
    {
      id: 'gestion-riesgo',
      nombre: 'Gestión del Riesgo',
      posicion: 'superior-izquierda',
      ruta: null
    },
    {
      id: 'construcciones-mantenimientos',
      nombre: 'Construcciones y Mantenimientos',
      posicion: 'superior-derecha',
      ruta: null
    },
    {
      id: 'gestion-ambiental',
      nombre: 'Gestión Ambiental',
      posicion: 'izquierda',
      ruta: null
    },
    {
      id: 'geomatica-topografia',
      nombre: 'Geomática y Topografía',
      posicion: 'derecha',
      ruta: null
    },
    {
      id: 'consolidacion',
      nombre: 'Consolidación',
      posicion: 'inferior-izquierda',
      ruta: null
    },
    {
      id: 'finca-raiz',
      nombre: 'Finca Raíz',
      posicion: 'inferior-derecha',
      ruta: '/digei/finca-raiz'
    }
  ];
}
