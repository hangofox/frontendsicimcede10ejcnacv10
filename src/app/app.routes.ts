import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'Acceso | SICIM' },
  {
    path: 'recuperacion-contrasena-acceso-usuario',
    loadComponent: () => import('./pages/recuperacion-contrasena-acceso-usuario/recuperacion-contrasena-acceso-usuario.component').then(m => m.RecuperacionContrasenaAccesoUsuarioComponent),
    title: 'Recuperación de contraseña | SICIM'
  },
  {
    path: 'seguimiento-olvido-contrasena',
    loadComponent: () => import('./pages/seguimiento-olvido-contrasena/seguimiento-olvido-contrasena.component').then(m => m.SeguimientoOlvidoContrasenaComponent),
    title: 'Seguimiento de contraseña | SICIM'
  },
  {
    path: '',
    loadComponent: () => import('./pages/index/index.component').then(m => m.IndexComponent),
    canActivate: [authGuard],
    children: [
      { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio.component').then(m => m.InicioComponent), title: 'Inicio | SICIM' },
      {
        path: 'digei',
        children: [
          { path: '', loadComponent: () => import('./pages/digei/digei.component').then(m => m.DigeiComponent), title: 'DIGEI | SICIM' },
          { path: 'consolidaciones', loadComponent: () => import('./pages/digei/consolidaciones/consolidaciones.component').then(m => m.ConsolidacionesComponent), title: 'Consolidaciones | SICIM' },
          { path: 'construcciones-mantenimientos', loadComponent: () => import('./pages/digei/construcciones-mantenimientos/construcciones-mantenimientos.component').then(m => m.ConstruccionesMantenimientosComponent), title: 'Construcciones y mantenimientos | SICIM' },
          { path: 'gestion-riesgo', loadComponent: () => import('./pages/digei/gestion-riesgo/gestion-riesgo.component').then(m => m.GestionRiesgoComponent), title: 'Gestión del riesgo | SICIM' },
          { path: 'gestion-ambiental', loadComponent: () => import('./pages/digei/gestion-ambiental/gestion-ambiental.component').then(m => m.GestionAmbientalComponent), title: 'Gestión ambiental | SICIM' },
          { path: 'geomatica-topografia', loadComponent: () => import('./pages/digei/geomatica-topografia/geomatica-topografia.component').then(m => m.GeomaticaTopografiaComponent), title: 'Geomática y topografía | SICIM' },
          {
            //INFRAESTRUCTURAS ES UN SUBMODULO DE FINCA RAIZ, TANTO EN CARPETAS COMO EN NAVEGACION.
            path: 'finca-raiz',
            children: [
              { path: '', loadComponent: () => import('./pages/digei/finca-raiz/finca-raiz.component').then(m => m.FincaRaizComponent), title: 'Finca Raíz | SICIM' },
              { path: 'infraestructuras/listado-infraestructuras', loadComponent: () => import('./pages/digei/finca-raiz/infraestructuras/listado-infraestructuras/listado-infraestructuras.component').then(m => m.ListadoInfraestructurasComponent), title: 'Infraestructuras | SICIM' },
              { path: 'terrenos/listado-terrenos', loadComponent: () => import('./pages/digei/finca-raiz/terrenos/listado-terrenos/listado-terrenos.component').then(m => m.ListadoTerrenosComponent), title: 'Terrenos | SICIM' },
              { path: 'infraestructuras/estadisticas-infraestructuras', loadComponent: () => import('./pages/digei/finca-raiz/infraestructuras/estadisticas-infraestructuras/estadisticas-infraestructuras.component').then(m => m.EstadisticasInfraestructurasComponent), title: 'Estadísticas de infraestructuras | SICIM' },
              { path: 'terrenos/estadisticas-terrenos', loadComponent: () => import('./pages/digei/finca-raiz/terrenos/estadisticas-terrenos/estadisticas-terrenos.component').then(m => m.EstadisticasTerrenosComponent), title: 'Estadísticas de terrenos | SICIM' },
              { path: 'infraestructuras', redirectTo: 'infraestructuras/listado-infraestructuras', pathMatch: 'full' },
              { path: 'terrenos', redirectTo: 'terrenos/listado-terrenos', pathMatch: 'full' }
            ]
          },
          //SOLICITUDES DE INFRAESTRUCTURAS CUELGA DIRECTAMENTE DE DIGEI, COMO SU CARPETA.
          { path: 'solicitudes-infraestructuras/listado-solicitudes-infraestructuras', loadComponent: () => import('./pages/digei/solicitudes-infraestructuras/listado-solicitudes-infraestructuras/listado-solicitudes-infraestructuras.component').then(m => m.ListadoSolicitudesInfraestructurasComponent), title: 'Solicitudes de infraestructuras | SICIM' },
          { path: 'solicitudes-infraestructuras', redirectTo: 'solicitudes-infraestructuras/listado-solicitudes-infraestructuras', pathMatch: 'full' }
        ]
      },
      { path: 'dinco', loadComponent: () => import('./pages/dinco/dinco.component').then(m => m.DincoComponent), title: 'DINCO | SICIM' },
      { path: 'diesp', loadComponent: () => import('./pages/diesp/diesp.component').then(m => m.DiespComponent), title: 'DIESP | SICIM' },
      { path: 'dipli', loadComponent: () => import('./pages/dipli/dipli.component').then(m => m.DipliComponent), title: 'DIPLI | SICIM' },
      {
        path: 'panel-control',
        children: [
          { path: '', loadComponent: () => import('./pages/panel-control/panel-control.component').then(m => m.PanelControlComponent), title: 'Panel de control | SICIM' },
          { path: 'unidades-militares/listado-unidades-militares', loadComponent: () => import('./pages/panel-control/unidades-militares/listado-unidades-militares/listado-unidades-militares.component').then(m => m.ListadoUnidadesMilitaresComponent), title: 'Unidades militares | SICIM' },
          { path: 'sociedades-unidades-centralizadoras/listado-sociedades-unidades-centralizadoras', loadComponent: () => import('./pages/panel-control/sociedades-unidades-centralizadoras/listado-sociedades-unidades-centralizadoras/listado-sociedades-unidades-centralizadoras.component').then(m => m.ListadoSociedadesUnidadesCentralizadorasComponent), title: 'Sociedades de unidades centralizadoras | SICIM' },
          { path: 'unidades-militares-realiz-mttos/listado-unidades-militares-realiz-mttos', loadComponent: () => import('./pages/panel-control/unidades-militares-realiz-mttos/listado-unidades-militares-realiz-mttos/listado-unidades-militares-realiz-mttos.component').then(m => m.ListadoUnidadesMilitaresRealizMttosComponent), title: 'Unidad militares realizadoras de mantenimientos | SICIM' },
          { path: 'oficinas/listado-oficinas', loadComponent: () => import('./pages/panel-control/oficinas/listado-oficinas/listado-oficinas.component').then(m => m.ListadoOficinasComponent), title: 'Oficinas | SICIM' },
          { path: 'responsables/listado-responsables', loadComponent: () => import('./pages/panel-control/responsables/listado-responsables/listado-responsables.component').then(m => m.ListadoResponsablesComponent), title: 'Responsables | SICIM' },
          { path: 'parametros-sistema', loadComponent: () => import('./pages/panel-control/parametros-sistema/parametros-sistema.component').then(m => m.ParametrosSistemaComponent), title: 'Parámetros del sistema | SICIM' },
          { path: 'historial-integrantes-documentos/listado-historial-integrantes-documentos', loadComponent: () => import('./pages/panel-control/historial-integrantes-documentos/listado-historial-integrantes-documentos/listado-historial-integrantes-documentos.component').then(m => m.ListadoHistorialIntegrantesDocumentosComponent), title: 'Historial de integrantes de documentos | SICIM' },
          { path: 'mi-perfil', loadComponent: () => import('./pages/panel-control/mi-perfil/mi-perfil.component').then(m => m.MiPerfilComponent), title: 'Mi perfil | SICIM' },
          { path: 'usuarios/listado-usuarios', loadComponent: () => import('./pages/panel-control/usuarios/listado-usuarios/listado-usuarios.component').then(m => m.ListadoUsuariosComponent), title: 'Usuarios | SICIM' },
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
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Página no encontrada | SICIM' }
];
