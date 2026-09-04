import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface AccesoPanelControl {
  titulo: string;
  ruta: string;
  icono: string;
}

@Component({
  selector: 'app-panel-control',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './panel-control.component.html',
  styleUrl: './panel-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelControlComponent {
  readonly accesos: AccesoPanelControl[] = [
    { titulo: 'Unidades militares', ruta: '/panel-control/unidades-militares', icono: 'imagen_unidades_militares_01.png' },
    { titulo: 'Unidades centralizadoras', ruta: '/panel-control/sociedades-unidades-centralizadoras', icono: 'imagen_sociedades_unidades_centralizadoras_01.png' },
    { titulo: 'Unidades militares realizadoras de mantenimientos', ruta: '/panel-control/unidades-militares-realiz-mttos', icono: 'imagen_unidades_militares_realizadoras_matenimientos_01.png' },
    { titulo: 'Oficinas', ruta: '/panel-control/oficinas', icono: 'imagen_oficinas_01.png' },
    { titulo: 'Responsables', ruta: '/panel-control/responsables', icono: 'imagen_responsables_01.png' },
    { titulo: 'Parámetros del sistema', ruta: '/panel-control/parametros-sistema', icono: 'imagen_parametros_sistema_01.png' },
    { titulo: 'Historial de integrantes de documentos', ruta: '/panel-control/historial-integrantes-documentos', icono: 'imagen_historial_integrantes_documentos_01.png' },
    { titulo: 'Mi perfil', ruta: '/panel-control/mi-perfil', icono: 'imagen_mi_perfil_01.png' },
    { titulo: 'Usuarios', ruta: '/panel-control/usuarios', icono: 'imagen_usuarios_01.png' }
  ];
}
