import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface OpcionGestionDesminado {
  titulo: string;
  ruta?: string;//SIN RUTA: OPCIÓN VISUAL QUE AÚN NO NAVEGA (SU COMPONENTE TODAVÍA NO EXISTE).
}

//ÁREA GESTIÓN DE DESMINADO DE DINCO: MISMO ESQUEMA DE DIGEI (EL MÓDULO MUESTRA EL ÁREA Y EL ÁREA MUESTRA SUS OPCIONES).
@Component({
  selector: 'app-gestion-desminado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gestion-desminado.component.html',
  styleUrl: './gestion-desminado.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestionDesminadoComponent {
  readonly opciones: OpcionGestionDesminado[] = [
    { titulo: 'Caninos', ruta: '/dinco/gestion-desminado/caninos/listado-caninos' },
    { titulo: 'Materiales técnicos', ruta: '/dinco/gestion-desminado/materiales-tecnicos/listado-materiales-tecnicos' },
    //EL HISTORIAL DE PROYECCIONES SE ABRE DESDE EL BOTÓN DE HISTORIAL DE CADA MUNICIÓN EN SU LISTADO:
    { titulo: 'Municiones especiales', ruta: '/dinco/gestion-desminado/municiones-especiales/listado-municiones-especiales' }
  ];
}
