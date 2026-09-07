import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DigeiComponent } from './pages/digei/digei.component';
import { FincaRaizComponent } from './pages/digei/finca-raiz/finca-raiz.component';
import { ListadoInfraestructurasComponent } from './pages/digei/finca-raiz/infraestructuras/listado-infraestructuras/listado-infraestructuras.component';
import { ListadoTerrenosComponent } from './pages/digei/finca-raiz/terrenos/listado-terrenos/listado-terrenos.component';
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
          {
            //INFRAESTRUCTURAS ES UN SUBMODULO DE FINCA RAIZ, TANTO EN CARPETAS COMO EN NAVEGACION.
            path: 'finca-raiz',
            children: [
              { path: '', component: FincaRaizComponent, title: 'Finca Raíz | SICIM' },
              { path: 'infraestructuras/listado-infraestructuras', component: ListadoInfraestructurasComponent, title: 'Infraestructuras | SICIM' },
              { path: 'terrenos/listado-terrenos', component: ListadoTerrenosComponent, title: 'Terrenos | SICIM' },
              { path: 'infraestructuras', redirectTo: 'infraestructuras/listado-infraestructuras', pathMatch: 'full' },
              { path: 'terrenos', redirectTo: 'terrenos/listado-terrenos', pathMatch: 'full' }
            ]
          },
          //SOLICITUDES DE INFRAESTRUCTURAS CUELGA DIRECTAMENTE DE DIGEI, COMO SU CARPETA.
          { path: 'solicitudes-infraestructuras/listado-solicitudes-infraestructuras', component: ListadoSolicitudesInfraestructurasComponent, title: 'Solicitudes de infraestructuras | SICIM' },
          { path: 'solicitudes-infraestructuras', redirectTo: 'solicitudes-infraestructuras/listado-solicitudes-infraestructuras', pathMatch: 'full' }
        ]
      },
      { path: 'dinco', component: DincoComponent, title: 'DINCO | SICIM' },
      { path: 'diesp', component: DiespComponent, title: 'DIESP | SICIM' },
      { path: 'dipli', component: DipliComponent, title: 'DIPLI | SICIM' },
      {
        path: 'panel-control',
        children: [
          { path: '', component: PanelControlComponent, title: 'Panel de control | SICIM' },
          { path: 'unidades-militares/listado-unidades-militares', component: ListadoUnidadesMilitaresComponent, title: 'Unidades militares | SICIM' },
          { path: 'sociedades-unidades-centralizadoras/listado-sociedades-unidades-centralizadoras', component: ListadoSociedadesUnidadesCentralizadorasComponent, title: 'Sociedades de unidades centralizadoras | SICIM' },
          { path: 'unidades-militares-realiz-mttos/listado-unidades-militares-realiz-mttos', component: ListadoUnidadesMilitaresRealizMttosComponent, title: 'Unidad militares realizadoras de mantenimientos | SICIM' },
          { path: 'oficinas/listado-oficinas', component: ListadoOficinasComponent, title: 'Oficinas | SICIM' },
          { path: 'responsables/listado-responsables', component: ListadoResponsablesComponent, title: 'Responsables | SICIM' },
          { path: 'parametros-sistema', component: ParametrosSistemaComponent, title: 'Parámetros del sistema | SICIM' },
          { path: 'historial-integrantes-documentos/listado-historial-integrantes-documentos', component: ListadoHistorialIntegrantesDocumentosComponent, title: 'Historial de integrantes de documentos | SICIM' },
          { path: 'mi-perfil', component: MiPerfilComponent, title: 'Mi perfil | SICIM' },
          { path: 'usuarios/listado-usuarios', component: ListadoUsuariosComponent, title: 'Usuarios | SICIM' },
          { path: 'unidades-militares', redirectTo: 'unidades-militares/listado-unidades-militares', pathMatch: 'full' },
          { path: 'sociedades-unidades-centralizadoras', redirectTo: 'sociedades-unidades-centralizadoras/listado-sociedades-unidades-centralizadoras', pathMatch: 'full' },
          { path: 'unidades-militares-realiz-mttos', redirectTo: 'unidades-militares-realiz-mttos/listado-unidades-militares-realiz-mttos', pathMatch: 'full' },
          { path: 'oficinas', redirectTo: 'oficinas/listado-oficinas', pathMatch: 'full' },
          { path: 'responsables', redirectTo: 'responsables/listado-responsables', pathMatch: 'full' },
          { path: 'historial-integrantes-documentos', redirectTo: 'historial-integrantes-documentos/listado-historial-integrantes-documentos', pathMatch: 'full' },
          { path: 'usuarios', redirectTo: 'usuarios/listado-usuarios', pathMatch: 'full' }
        ]
      }
    ]
  },
  { path: '**', component: NotFoundComponent, title: 'Página no encontrada | SICIM' }
];
