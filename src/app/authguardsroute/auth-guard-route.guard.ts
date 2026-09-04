import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { PrivilegyRestriccAccesosUsuariosService } from 'src/app/services/panel-control/usuarios/privileg-y-restricc-accesos-usuarios/privileg-y-restricc-accesos-usuarios.service';
//import { Observable } from 'rxjs';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
//import { ToastComponent } from 'src/app/shared/toast-alertas/toast.component';
//import { IndexComponent } from 'src/app/pages/index/index.component';
//import { LoginComponent } from 'src/app/pages/login/login.component';

@Injectable({
  providedIn: 'root',
})

export class AuthGuardRoute implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private privilegyRestriccAccesosUsuariosService: PrivilegyRestriccAccesosUsuariosService,
    //private toastComponent: ToastComponent
    //private indexComponent: IndexComponent,
    //private loginComponent: LoginComponent
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!(isLoggedIn == "true")) {//EN CASO DEL USUARIO NO ESTAR AUTENTICADO, ES REDIRIGIDO AL LOGIN.
       //LLAMA LA ALERTA DE MENSAJE TOAST DE PRIMENG Y ENVIO LOS PARÁMETROS DE TÍTULO Y DESCRIPCIÓN:
       //this.loginComponent.alertaMensajeError("Error", "Acceso no autorizado. No tienes permiso para acceder a esta funcionalidad ni realizar esta acción.");
       this.router.navigate(['/']);
       
       return of(false);
    }
    
    //OBTENEMOS LAS VARIABLES DE SESIÓN Y/O VARIABLES LOCALES DE ALMACENAMIENTO DE LA FUNCIONALIDAD ACTUAL DEL SISTEMA:
    //const idUsuario = Number(sessionStorage.getItem('idUsuario'));
    //const nombreFuncionalidad = sessionStorage.getItem('nombreFuncionalidad') || '';
    //const nombreRol = sessionStorage.getItem('nombreRol') || '';
    const idUsuario = Number(localStorage.getItem('idUsuario'));
    const nombreFuncionalidad = localStorage.getItem('nombreFuncionalidad') || '';
    const nombreRol = localStorage.getItem('nombreRol') || '';
    const urlAccesoUsuarioDetectada = route.routeConfig?.path || '';
    
    //console.log("ID USUARIO: "+Number(localStorage.getItem('idUsuario')));
    //console.log("NOMBRE DE FUNCIONALIDAD: "+localStorage.getItem('nombreFuncionalidad'));
    //console.log("NOMBRE DE ROL: "+localStorage.getItem('nombreRol'));
    //console.log("URL DE ACCESO USUARIO DETECTADA: "+urlAccesoUsuarioDetectada);
    
    //LLAMA AL SERVICIO PARA CARGAR LOS PRIVILEGIOS Y RESTRICCIONES DE ACCESOS DEL USUARIO POR ID DE USUARIO, NOMBRE DE FUNCIONALIDAD Y NOMBRE DE ROL:
    return this.privilegyRestriccAccesosUsuariosService.findAllUsersAccessPrivilegesAndRestrictionsbyIdUsuarioAndNombreFuncionalidadAndNombreRolAndOrderedbyIdAsc(idUsuario, nombreFuncionalidad, nombreRol)
      .pipe(map((data) => {
        if (data.length==0) {//EN CASO DE NO ENCONTRAR NINGÚN REGISTRO, RETORNA AL LOGIN.
           //LLAMA EL SERVICIO PARA LIMPIAR LAS VARIABLES DE SESIÓN Y/O VARIABLES LOCALES DE ALMACENAMIENTO DE LA FUNCIONALIDAD Y ROL ACTUAL DEL SISTEMA:
           this.sessionService.clearSession();
           
           //LLAMA LA ALERTA DE MENSAJE TOAST DE PRIMENG Y ENVIO LOS PARÁMETROS DE TÍTULO Y DESCRIPCIÓN:
           //this.toastComponent.msjError("Error", "Acceso no autorizado. No tienes permiso para acceder a esta funcionalidad ni realizar esta acción.");
           
           //SE REDIRIGE AL USUARIO A LA PÁGINA DE INICIO DE SESIÓN:
           this.router.navigate(['/'], { queryParams: { error: 'no-autorizado' } });//SE IMPORTA EL ENRUTADOR EN EL COMPONENTE.
           
           return false;//RETORNA EN FALSO (FALSE).
        }
        if (data.length > 0) {//EN CASO DE ENCONTRAR AL MENOS UN (1) REGISTRO.
           //OBTENGO EL VALOR DESPUÉS DEL "/" DE LA URL DE ACCESO DEL USUARIO ALMACENADA EN LA BASE DE DATOS:
           const segmentos = (data[0].urlAccesoUsuario).split('/');
           const urlAccesoUsuarioAlmacenada = segmentos[segmentos.length - 1];
           
           //console.log("URL ACCESO USUARIO ALMACENADA: "+urlAccesoUsuarioAlmacenada+" URL DE ACCESO USUARIO DETECTADA: "+urlAccesoUsuarioDetectada);
           if (!(urlAccesoUsuarioDetectada==urlAccesoUsuarioAlmacenada)) {//EN CASO DE QUE LA URL ACCESADA POR EL USUARIO Y DETECTADA NO COICIDA CON LA URL DE ACCESO ALMACENADA EN LA BASE DE DATOS RETORNA AL LOGIN.
              //NOTA: ESTO SE USA SI EL USUARIO INTENTA ACCESAR USANDO UNA FUNCIONALIDAD Y ROL QUE ESTEN REGISTRADOS COMO PRIVILEGIO Y RESTRICCIÓN DE ACCESO DEL USUARIO EN LA BASE DE DATOS.
              //LLAMA EL SERVICIO PARA LIMPIAR LAS VARIABLES DE SESIÓN Y/O VARIABLES LOCALES DE ALMACENAMIENTO DE LA FUNCIONALIDAD Y ROL ACTUAL DEL SISTEMA:
              this.sessionService.clearSession();
              
              //SE REDIRIGE AL USUARIO A LA PÁGINA DE INICIO DE SESIÓN:
              this.router.navigate(['/']);//SE IMPORTA EL ENRUTADOR EN EL COMPONENTE.
              
              //LLAMA LA ALERTA DE MENSAJE TOAST DE PRIMENG Y ENVIO LOS PARÁMETROS DE TÍTULO Y DESCRIPCIÓN:
              //this.indexComponent.alertaMensajeError("Error", "Lo siento, intentastes acceder a esta funcionalidad de forma equivocada.");
           }
           
           return true;//RETORNA EN VERDADERO (TRUE).
        }
        return false;//RETORNA EN FALSO (FALSE).
      }),
      catchError((err) => {//EN CASO DE ERROR.
        console.error('ERROR AL VERIFICAR LOS PRIVILEGIOS Y RESTRICCIONES DE ACCESO DEL USUARIO: ', err);
        //LLAMA EL SERVICIO PARA LIMPIAR LAS VARIABLES DE SESIÓN Y/O VARIABLES LOCALES DE ALMACENAMIENTO DE LA FUNCIONALIDAD Y ROL ACTUAL DEL SISTEMA:
        this.sessionService.clearSession();
        
        //SE REDIRIGE AL USUARIO A LA PÁGINA DE INICIO DE SESIÓN:
        this.router.navigate(['/']);//SE IMPORTA EL ENRUTADOR EN EL COMPONENTE.
        
        return of(false);//RETORNA EN FALSO (FALSE).
      })
    );
  }
  
}
