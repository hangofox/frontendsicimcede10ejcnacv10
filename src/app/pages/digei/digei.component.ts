import { ChangeDetectionStrategy, Component } from '@angular/core';

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
  readonly imagen: string;
  readonly posicion: PosicionPinon;
  readonly ruta: string | null;
}

@Component({
  selector: 'app-digei',
  standalone: true,
  imports: [],
  templateUrl: './digei.component.html',
  styleUrl: './digei.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigeiComponent {
  /** Los seis piñones periféricos reutilizan el mismo anillo dentado. */
  readonly anilloSatelite = 'assets/images/imagen_anillo_pinon_externo_01.png';

  readonly areas: readonly AreaDigei[] = [
    {
      id: 'gestion-riesgo',
      nombre: 'Gestión del Riesgo',
      imagen: 'assets/images/imagen_circulo_gestion_riesgo_01.png',
      posicion: 'superior-izquierda',
      ruta: null
    },
    {
      id: 'construcciones-mantenimientos',
      nombre: 'Construcciones y Mantenimientos',
      imagen: 'assets/images/imagen_circulo_construcciones_y_mantenimientos_01.png',
      posicion: 'superior-derecha',
      ruta: null
    },
    {
      id: 'gestion-ambiental',
      nombre: 'Gestión Ambiental',
      imagen: 'assets/images/imagen_circulo_gestion_ambiental_01.png',
      posicion: 'izquierda',
      ruta: null
    },
    {
      id: 'geomatica-topografia',
      nombre: 'Geomática y Topografía',
      imagen: 'assets/images/imagen_circulo_geomatica_y_topografia_01.png',
      posicion: 'derecha',
      ruta: null
    },
    {
      id: 'consolidacion',
      nombre: 'Consolidación',
      imagen: 'assets/images/imagen_circulo_consolidacion_01.png',
      posicion: 'inferior-izquierda',
      ruta: null
    },
    {
      id: 'finca-raiz',
      nombre: 'Finca Raíz',
      imagen: 'assets/images/imagen_circulo_finca_raiz_01.png',
      posicion: 'inferior-derecha',
      ruta: null
    }
  ];
}
