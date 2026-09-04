import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DigeiComponent } from './pages/digei/digei.component';
import { ListadoInfraestructurasComponent } from './pages/digei/infraestructuras/listado-infraestructuras/listado-infraestructuras.component';
import { ListadoSolicitudesInfraestructurasComponent } from './pages/digei/solicitudes-infraestructuras/listado-solicitudes-infraestructuras/listado-solicitudes-infraestructuras.component';
import { DincoComponent } from './pages/dinco/dinco.component';
import { DiespComponent } from './pages/diesp/diesp.component';
import { DipliComponent } from './pages/dipli/dipli.component';
import { IndexComponent } from './pages/index/index.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ListadoHistorialIntegrantesDocumentosComponent } from './pages/panel-control/historial-integrantes-documentos/listado-historial-integrantes-documentos/listado-historial-integrantes-documentos.component';
import { MiPerfilComponent } from './pages/panel-control/mi-perfil/mi-perfil.component';
import { ListadoOficinasComponent } from './pages/panel-control/oficinas/listado-oficinas/listado-oficinas.component';
import { PanelControlComponent } from './pages/panel-control/panel-control.component';
import { ParametrosSistemaComponent } from './pages/panel-control/parametros-sistema/parametros-sistema.component';
import { ListadoResponsablesComponent } from './pages/panel-control/responsables/listado-responsables/listado-responsables.component';
import { ListadoSociedadesUnidadesCentralizadorasComponent } from './pages/panel-control/sociedades-unidades-centralizadoras/listado-sociedades-unidades-centralizadoras/listado-sociedades-unidades-centralizadoras.component';
import { ListadoUnidadesMilitaresComponent } from './pages/panel-control/unidades-militares/listado-unidades-militares/listado-unidades-militares.component';
import { ListadoUnidadesMilitaresRealizMttosComponent } from './pages/panel-control/unidades-militares-realiz-mttos/listado-unidades-militares-realiz-mttos/listado-unidades-militares-realiz-mttos.component';
import { ListadoUsuariosComponent } from './pages/panel-control/usuarios/listado-usuarios/listado-usuarios.component';
import { RecuperacionContrasenaAccesoUsuarioComponent } from './pages/recuperacion-contrasena-acceso-usuario/recuperacion-contrasena-acceso-usuario.component';
import { SeguimientoOlvidoContrasenaComponent } from './pages/seguimiento-olvido-contrasena/seguimiento-olvido-contrasena.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, title: 'Acceso | SICIM' },
  {
    path: 'recuperacion-contrasena-acceso-usuario',
    component: RecuperacionContrasenaAccesoUsuarioComponent,
    title: 'Recuperación de contraseña | SICIM'
  },
  {
    path: 'seguimiento-olvido-contrasena',
    component: SeguimientoOlvidoContrasenaComponent,
    title: 'Seguimiento de contraseña | SICIM'
  },
  {
    path: '',
    component: IndexComponent,
    canActivate: [authGuard],
    children: [
      { path: 'inicio', component: InicioComponent, title: 'Inicio | SICIM' },
      {
        path: 'digei',
        children: [
          { path: '', component: DigeiComponent, title: 'DIGEI | SICIM' },
          { path: 'infraestructuras', component: ListadoInfraestructurasComponent, title: 'Infraestructuras | SICIM' },
          { path: 'solicitudes-infraestructuras', component: ListadoSolicitudesInfraestructurasComponent, title: 'Solicitudes de infraestructuras | SICIM' }
        ]
      },
      { path: 'dinco', component: DincoComponent, title: 'DINCO | SICIM' },
      { path: 'diesp', component: DiespComponent, title: 'DIESP | SICIM' },
      { path: 'dipli', component: DipliComponent, title: 'DIPLI | SICIM' },
      {
        path: 'panel-control',
        children: [
          { path: '', component: PanelControlComponent, title: 'Panel de control | SICIM' },
          { path: 'unidades-militares', component: ListadoUnidadesMilitaresComponent, title: 'Unidades militares | SICIM' },
          { path: 'sociedades-unidades-centralizadoras', component: ListadoSociedadesUnidadesCentralizadorasComponent, title: 'Sociedades de unidades centralizadoras | SICIM' },
          { path: 'unidades-militares-realiz-mttos', component: ListadoUnidadesMilitaresRealizMttosComponent, title: 'Unidad militares realizadoras de mantenimientos | SICIM' },
          { path: 'oficinas', component: ListadoOficinasComponent, title: 'Oficinas | SICIM' },
          { path: 'responsables', component: ListadoResponsablesComponent, title: 'Responsables | SICIM' },
          { path: 'parametros-sistema', component: ParametrosSistemaComponent, title: 'Parámetros del sistema | SICIM' },
          { path: 'historial-integrantes-documentos', component: ListadoHistorialIntegrantesDocumentosComponent, title: 'Historial de integrantes de documentos | SICIM' },
          { path: 'mi-perfil', component: MiPerfilComponent, title: 'Mi perfil | SICIM' },
          { path: 'usuarios', component: ListadoUsuariosComponent, title: 'Usuarios | SICIM' }
        ]
      }
    ]
  },
  { path: '**', component: NotFoundComponent, title: 'Página no encontrada | SICIM' }
];
