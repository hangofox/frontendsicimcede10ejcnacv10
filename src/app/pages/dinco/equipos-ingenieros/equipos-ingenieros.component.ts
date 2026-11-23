import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface OpcionEquiposIngenieros {
  titulo: string;
  ruta?: string;//SIN RUTA: OPCIÓN VISUAL QUE AÚN NO NAVEGA (SU COMPONENTE TODAVÍA NO EXISTE).
}

//ÁREA EQUIPOS DE INGENIEROS DE DINCO: MISMO ESQUEMA DE DIGEI (EL MÓDULO MUESTRA EL ÁREA Y EL ÁREA MUESTRA SUS OPCIONES).
@Component({
  selector: 'app-equipos-ingenieros',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './equipos-ingenieros.component.html',
  styleUrl: './equipos-ingenieros.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquiposIngenierosComponent {
  //SOLO LOS REGISTROS DE DINCO QUE CUELGAN DE TABLA_EQUIPOS_INGENIEROS (COMPLEMENTO TABLAS DINCO). LOS CATÁLOGOS SOLO ALIMENTAN COMBOS;
  //DOCUMENTACIÓN ANEXA DE ALTAS Y BAJAS, PERSONAL DE MANTENIMIENTO Y SUMINISTROS VAN DENTRO DE SU REGISTRO. LAS QUE AÚN NO TIENEN COMPONENTE VAN SIN RUTA:
  readonly opciones: OpcionEquiposIngenieros[] = [
    { titulo: 'Equipos de ingenieros', ruta: '/dinco/equipos-ingenieros/equipos-ingenieros/listado-equipos-ingenieros' },
    //CONSULTA DE LA JERARQUÍA CLASIFICACIÓN → SUBCLASIFICACIÓN → ELEMENTO EN TRES COLUMNAS:
    { titulo: 'Clasificaciones, subclasificaciones y elementos de equipos de ingenieros', ruta: '/dinco/equipos-ingenieros/clasific-subclasific-element-equip-ing' },
    //MANTENIMIENTO E HISTORIAL DE MANTENIMIENTOS DE EQUIPOS DE INGENIEROS:
    { titulo: 'Mantenimientos de equipos', ruta: '/dinco/equipos-ingenieros/mantenimientos-equip-ing' }
    //LOS DEMÉRITOS Y DESGASTES SE GESTIONAN DESDE EL BOTÓN DE HISTORIAL DE CADA EQUIPO EN EL LISTADO DE EQUIPOS DE INGENIEROS.
  ];
}
