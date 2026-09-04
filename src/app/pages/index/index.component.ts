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
}
