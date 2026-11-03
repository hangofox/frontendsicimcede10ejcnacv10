import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

/** Un nivel de la ruta de navegación: texto visible y dirección a la que lleva. */
export interface NivelRutaNavegacion {
  etiqueta: string;
  enlace: string;
}

//PALABRAS QUE VAN EN MINÚSCULA DENTRO DE UN TÍTULO (SALVO AL INICIO): "Gestión del Riesgo", "Geomática y Topografía".
const PALABRAS_MENORES = new Set(['a', 'al', 'con', 'de', 'del', 'e', 'el', 'en', 'la', 'las', 'lo', 'los', 'o', 'para', 'por', 'u', 'un', 'una', 'y']);

@Component({
  selector: 'app-ruta-navegacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ruta-navegacion.component.html',
  styleUrl: './ruta-navegacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RutaNavegacionComponent {
  private readonly router = inject(Router);
  private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    //PUBLICA EN EL CONTENEDOR PADRE (.contenido DE index) EL ALTO REAL DE LA RUTA EN --ruta-navegacion-alto. EN LAS PÁGINAS DE
    //ENTRADA DE LOS MÓDULOS LA RUTA VA SUPERPUESTA SOBRE EL FONDO E index BAJA LOS PIÑONES Y PANALES ESE ALTO; ASÍ, AUNQUE EN UN
    //CELULAR ESTRECHO LOS NIVELES PASEN A DOS LÍNEAS, LA RUTA NUNCA QUEDA ENCIMA DE ELLOS.
    const destruccion = inject(DestroyRef);
    afterNextRender(() => {
      const anfitrion = this.elemento.nativeElement;
      const observador = new ResizeObserver(() => {
        anfitrion.parentElement?.style.setProperty('--ruta-navegacion-alto', `${Math.ceil(anfitrion.getBoundingClientRect().height)}px`);
      });
      observador.observe(anfitrion);
      destruccion.onDestroy(() => observador.disconnect());
    });
  }

  /** Niveles de la ruta activa, recalculados en cada navegación. Se siembra
      con la actual porque el primer NavigationEnd ya ha ocurrido cuando este
      componente se crea. */
  readonly niveles = toSignal(
    this.router.events.pipe(
      filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd),
      startWith(null),
      map(() => this.construirNiveles(this.router.routerState.snapshot.root))
    ),
    { initialValue: [] as NivelRutaNavegacion[] }
  );

  /** Solo se muestra dentro de DIGEI y a partir del segundo nivel: en la
      propia página de DIGEI un único eslabón sin enlace no aporta nada. */
  readonly visible = computed(() => {
    const niveles = this.niveles();
    return niveles.length >= 2 && niveles[0].enlace === '/digei';
  });

  /** Recorre la rama activa de rutas y genera un nivel por cada ruta que
      consume segmentos de la dirección. Las etiquetas salen del title de
      app.routes.ts, así que un componente nuevo con su title queda incluido
      sin tocar este componente. */
  private construirNiveles(raiz: ActivatedRouteSnapshot): NivelRutaNavegacion[] {
    const niveles: NivelRutaNavegacion[] = [];
    let camino = '';
    for (let ruta: ActivatedRouteSnapshot | null = raiz; ruta; ruta = ruta.firstChild) {
      if (!ruta.url.length) continue;
      camino += '/' + ruta.url.map(segmento => segmento.path).join('/');
      const titulo = this.tituloDe(ruta);
      if (titulo) niveles.push({ etiqueta: this.formatearEtiqueta(titulo), enlace: camino });
    }
    return niveles;
  }

  /** Una ruta con hijos (digei, gestion-riesgo...) no tiene title propio:
      lo toma de su hijo de camino vacío, que es la página de entrada. */
  private tituloDe(ruta: ActivatedRouteSnapshot): string | undefined {
    if (ruta.title) return ruta.title;
    const entrada = ruta.routeConfig?.children?.find(hijo => hijo.path === '' && typeof hijo.title === 'string');
    return entrada?.title as string | undefined;
  }

  /** 'Gestión del riesgo | SICIM' -> 'Gestión del Riesgo'. Las siglas
      (DIGEI) se respetan tal cual. */
  private formatearEtiqueta(titulo: string): string {
    return titulo.replace(/\s*\|\s*SICIM\s*$/i, '').trim().split(/\s+/).map((palabra, indice) => {
      if (palabra.length > 1 && palabra === palabra.toLocaleUpperCase('es')) return palabra;
      const minuscula = palabra.toLocaleLowerCase('es');
      if (indice > 0 && PALABRAS_MENORES.has(minuscula)) return minuscula;
      return minuscula.charAt(0).toLocaleUpperCase('es') + minuscula.slice(1);
    }).join(' ');
  }
}
