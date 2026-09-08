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
 * Cada área dispone de una ruta propia y su medallón se renderiza como enlace.
 */
interface AreaDigei {
  readonly id: string;
  readonly nombre: string;
  readonly posicion: PosicionPinon;
  readonly ruta: string;
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
      ruta: '/digei/gestion-riesgo'
    },
    {
      id: 'construcciones-mantenimientos',
      nombre: 'Construcciones y Mantenimientos',
      posicion: 'superior-derecha',
      ruta: '/digei/construcciones-mantenimientos'
    },
    {
      id: 'gestion-ambiental',
      nombre: 'Gestión Ambiental',
      posicion: 'izquierda',
      ruta: '/digei/gestion-ambiental'
    },
    {
      id: 'geomatica-topografia',
      nombre: 'Geomática y Topografía',
      posicion: 'derecha',
      ruta: '/digei/geomatica-topografia'
    },
    {
      id: 'consolidacion',
      nombre: 'Consolidación',
      posicion: 'inferior-izquierda',
      ruta: '/digei/consolidaciones'
    },
    {
      id: 'finca-raiz',
      nombre: 'Finca Raíz',
      posicion: 'inferior-derecha',
      ruta: '/digei/finca-raiz'
    }
  ];
}
