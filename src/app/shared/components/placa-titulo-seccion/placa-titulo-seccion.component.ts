import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Iconos disponibles: los mismos del menu principal horizontal superior. */
export type IconoPlacaTituloSeccion = 'inicio' | 'digei' | 'dinco' | 'dipli' | 'diesp' | 'proyectos' | 'panel';

let consecutivoPlaca = 0;

/**
 * Placa plateada con marco dorado y laterales concavos para el titulo de
 * cada seccion del menu principal. Replica la placa de Inicio y de DIGEI:
 * mismo SVG, mismos degradados, misma letra. Solo cambian icono y texto.
 */
@Component({
  selector: 'app-placa-titulo-seccion',
  standalone: true,
  templateUrl: './placa-titulo-seccion.component.html',
  styleUrl: './placa-titulo-seccion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacaTituloSeccionComponent {
  @Input({ required: true }) texto = '';
  @Input({ required: true }) icono: IconoPlacaTituloSeccion = 'inicio';

  /** Ids propios por instancia para que los degradados del SVG no choquen. */
  private readonly consecutivo = ++consecutivoPlaca;
  readonly idOro = `placa-titulo-oro-${this.consecutivo}`;
  readonly idPlata = `placa-titulo-plata-${this.consecutivo}`;

  /**
   * Ancho del viewBox aproximado al ancho real de la placa (el SVG se
   * estira con preserveAspectRatio="none"): asi los laterales concavos no
   * se deforman. 320 es el de Inicio; por cada caracter se suman ~12,2
   * unidades, lo que mide la letra a 16px con su espaciado.
   */
  get anchoMarco(): number {
    return Math.max(320, Math.round(this.texto.length * 12.2 + 154));
  }

  get trazoBorde(): string {
    const w = this.anchoMarco;
    return `M2 2H${w - 2}V27.07A13 13 0 1 0 ${w - 2} 42.93V68H2V42.93A13 13 0 1 0 2 27.07V2Z`;
  }

  get trazoPlaca(): string {
    const w = this.anchoMarco;
    return `M8 8H${w - 8}V28.29A11 11 0 1 0 ${w - 8} 41.71V62H8V41.71A11 11 0 1 0 8 28.29V8Z`;
  }

  get trazoCurvaDorada(): string {
    const w = this.anchoMarco;
    return `M${w - 5} 27.68A12 12 0 1 0 ${w - 5} 42.32M5 42.32A12 12 0 1 0 5 27.68`;
  }

  get trazoReflejo(): string {
    return `M18 5H${this.anchoMarco - 18}`;
  }
}
