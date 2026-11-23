import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface OpcionMantenimientosEquipIng {
  titulo: string;
  ruta?: string;//SIN RUTA: OPCIÓN VISUAL QUE AÚN NO NAVEGA (SU COMPONENTE TODAVÍA NO EXISTE).
}

const RUTA_MANTENIMIENTOS_EQUIP_ING = '/dinco/equipos-ingenieros/mantenimientos-equip-ing';

//MANTENIMIENTOS DE EQUIPOS DE INGENIEROS: MISMO ESQUEMA DE MANTENIMIENTOS DE INFRAESTRUCTURAS (EL FORMULARIO DE MANTENIMIENTO ES UNA PÁGINA
//EN mantenimientos-equip-ing Y EL HISTORIAL SOLO LISTA), PERO TODAVÍA SIN ROMBOS NI FONDO: LAS OPCIONES VAN EN TEXTO SIMPLE, COMO EN
//EQUIPOS DE INGENIEROS, HASTA QUE SE CREEN LAS IMÁGENES.
@Component({
  selector: 'app-mantenimientos-equip-ing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mantenimientos-equip-ing.component.html',
  styleUrl: './mantenimientos-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MantenimientosEquipIngComponent {
  readonly opciones: OpcionMantenimientosEquipIng[] = [
    //LLEVA DIRECTO AL FORMULARIO DE NUEVO MANTENIMIENTO (NO A UN LISTADO), COMO EL ROMBO DE MANTENIMIENTO DE INFRAESTRUCTURAS:
    { titulo: 'Mantenimiento de equipo de ingenieros', ruta: RUTA_MANTENIMIENTOS_EQUIP_ING + '/mantenimientos-equip-ing/add-upd-del-hist-mtto-equip-ing' },
    { titulo: 'Historial de mantenimientos de equipos de ingenieros', ruta: RUTA_MANTENIMIENTOS_EQUIP_ING + '/historial-mantenimientos-equip-ing/listado-hist-mttos-equip-ing' }
  ];
}
