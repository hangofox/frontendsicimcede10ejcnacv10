import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { CabezoteComponent } from '../cabezote/cabezote.component';
import { MenuPrincipalHorizontalSuperiorComponent } from '../menu-principal-horizontal-superior/menu-principal-horizontal-superior.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet, CabezoteComponent, MenuPrincipalHorizontalSuperiorComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
  private readonly router = inject(Router);

  /** Ruta activa. Se siembra con la actual porque el primer NavigationEnd
      ya ha ocurrido cuando este componente se crea. */
  private readonly ruta = toSignal(
    this.router.events.pipe(
      filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd),
      map(evento => evento.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  /** El menú superior se oculta en Inicio y se muestra en el resto.
      Se compara el primer segmento para que una ruta como /inicio-algo
      no cuente como Inicio. */
  readonly menuVisible = computed(() => {
    const camino = this.ruta().split(/[?#]/)[0];
    return camino !== '/inicio' && !camino.startsWith('/inicio/');
  });

  /** Decide si el menú se muestra íntegro, con sus siete opciones.

      Por defecto el menú oculta la opción de la sección en la que estás y
      reparte el ancho entre las otras seis. Eso tiene sentido en la
      página de entrada de una sección, donde su propia opción no lleva a
      ningún sitio nuevo. En una subpágina sí lleva: es a donde se vuelve.
      Y al faltar una pieza se rompe además la alternancia de colores,
      porque sale de :nth-child, que no reindexa al ocultar un elemento.

      El criterio es por tanto la profundidad de la ruta, no una lista de
      rutas concretas: dos segmentos o más es una subpágina. */
  readonly menuCompleto = computed(() => {
    const camino = this.ruta().split(/[?#]/)[0];
    return camino.split('/').filter(Boolean).length >= 2;
  });
}
