import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface OpcionMenu {
  id: string;
  etiqueta: string;
  /** null mientras la opcion no tenga destino: se dibuja pero no navega. */
  ruta: string | null;
  habilitada: boolean;
  icono: string;
}

@Component({
  selector: 'app-menu-principal-horizontal-superior',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  templateUrl: './menu-principal-horizontal-superior.component.html',
  styleUrl: './menu-principal-horizontal-superior.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuPrincipalHorizontalSuperiorComponent {
  //ORDEN SEGUN LA REFERENCIA: DIPLI VA ANTES QUE DIESP. CADA OPCION CONSERVA SU RUTA E ICONO.
  readonly opciones: readonly OpcionMenu[] = [
    { id: 'inicio', etiqueta: 'Inicio', ruta: '/inicio', habilitada: true, icono: 'inicio' },
    { id: 'digei', etiqueta: 'DIGEI', ruta: '/digei', habilitada: true, icono: 'digei' },
    { id: 'dinco', etiqueta: 'DINCO', ruta: '/dinco', habilitada: true, icono: 'dinco' },
    { id: 'dipli', etiqueta: 'DIPLI', ruta: '/dipli', habilitada: true, icono: 'dipli' },
    { id: 'diesp', etiqueta: 'DIESP', ruta: '/diesp', habilitada: true, icono: 'diesp' },
    //SIN RUTA NI COMPONENTE TODAVIA: SE MUESTRA DESHABILITADA.
    { id: 'proyectos', etiqueta: 'Proyectos', ruta: null, habilitada: false, icono: 'proyectos' },
    { id: 'panel', etiqueta: 'Panel de control', ruta: '/panel-control', habilitada: true, icono: 'panel' }
  ];
}
