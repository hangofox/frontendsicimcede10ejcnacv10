import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface OpcionEquiposTransportes {
  titulo: string;
  ruta?: string;//SIN RUTA: OPCIÓN VISUAL QUE AÚN NO NAVEGA (SU COMPONENTE TODAVÍA NO EXISTE).
}

//ÁREA EQUIPOS DE TRANSPORTE DE DINCO: MISMO ESQUEMA DE EQUIPOS DE INGENIEROS (EL MÓDULO MUESTRA EL ÁREA Y EL ÁREA MUESTRA SUS OPCIONES).
//LOS EQUIPOS DE TRANSPORTE SON REGISTROS DE TABLA_EQUIPOS_INGENIEROS; ESTAS OPCIONES SON LAS TABLAS QUE CUELGAN DE ELLOS:
@Component({
  selector: 'app-equipos-transportes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './equipos-transportes.component.html',
  styleUrl: './equipos-transportes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquiposTransportesComponent {
  readonly opciones: OpcionEquiposTransportes[] = [
    { titulo: 'Historial de equipos de transporte de apoyo de atención y prevención de emergencias', ruta: '/dinco/equipos-transportes/historial-equip-transp-apoy-atenc-prev-emerg-desast/listado-hist-eq-tr-apoy-atenc-prev' },
    { titulo: 'Historial de equipos de transporte de apoyo a obras, reducción y mitigación de gestión del riesgo', ruta: '/dinco/equipos-transportes/historial-equip-transp-apoy-obr-red-mitig-riesg-desast/listado-hist-eq-tr-apoy-obr-red-mitig' },
    { titulo: 'Proyecciones de técnico-mecánicas de equipos de transporte', ruta: '/dinco/equipos-transportes/proyecciones-tecnicomecanicas-equip-transp/listado-proy-tecnicomec-equip-transp' }
  ];
}
