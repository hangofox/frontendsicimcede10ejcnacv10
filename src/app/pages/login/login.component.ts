import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { TokensAutorizacionesService } from '../../services/tokens-autorizaciones/tokens-autorizaciones.service';
import { UsuariosService } from '../../services/panel-control/usuarios/usuarios.service';
import { CabezoteComponent } from '../cabezote/cabezote.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CabezoteComponent, PiePaginaComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  captcha = '';
  codigoCaptcha = this.generarCodigo();
  mensajeError = '';
  cargando = false;
  mostrarContrasena = false;

  constructor(
    private readonly authService: AuthService,
    private readonly tokensAutorizacionesService: TokensAutorizacionesService,
    private readonly usuariosService: UsuariosService,
    private readonly router: Router,
    private readonly detectorCambios: ChangeDetectorRef
  ) {}

  //EL COMPONENTE ES OnPush: ASIGNAR mensajeError DENTRO DE UNA RESPUESTA HTTP NO BASTA PARA
  //QUE ANGULAR REPINTE, PORQUE ESE CALLBACK NO MARCA EL COMPONENTE COMO SUCIO. TODA RUTA DE
  //ERROR PASA POR AQUÍ PARA QUE EL MENSAJE LLEGUE SIEMPRE A LA PANTALLA.
  private mostrarError(mensaje: string): void {
    this.cargando = false;
    this.mensajeError = mensaje;
    this.actualizarCaptcha();
    this.detectorCambios.markForCheck();
  }

  async ingresar(): Promise<void> {
    this.mensajeError = '';
    if (this.captcha.trim().toUpperCase() !== this.codigoCaptcha) {
      this.mostrarError('El código de verificación no coincide.');
      return;
    }

    this.cargando = true;
    const inicioAnimacionCarga = performance.now();

    //ENCRIPTA LA CONTRASEÑA CON EL MISMO ESQUEMA (BASE64 APLICADO 10 VECES) QUE ESPERA EL BACKEND PARA
    //COMPARARLA CONTRA LA ALMACENADA EN tabla_usuarios:
    let passwordEncriptado = this.contrasena;
    for (let i = 0; i < 10; i++) {
      passwordEncriptado = btoa(passwordEncriptado);
    }

    //PASO 1: OBTIENE EL TOKEN DE AUTORIZACIÓN FIRMADO POR EL BACKEND (POST /login).
    //SI EL BACKEND RECHAZA LAS CREDENCIALES DEVUELVE 401. ESE 401 NO SE MUESTRA AQUÍ NI
    //INTERRUMPE EL FLUJO: EL MOTIVO CONCRETO (NICKNAME INEXISTENTE, CONTRASEÑA INCORRECTA
    //O USUARIO INACTIVO) LO DA EL PASO 2, Y ES EL QUE VE EL USUARIO. SOLO SE ABORTA
    //CUANDO NO HAY RESPUESTA DEL SERVIDOR (status 0), QUE SÍ ES UN FALLO DE COMUNICACIÓN.
    let tokenAutorizacion = '';
    try {
      const respuestaToken = await firstValueFrom(
        this.tokensAutorizacionesService.tokenAuthorizationByNicknameAndPassword({
          nicknameUsuario: this.usuario,
          passwordUsuario: passwordEncriptado
        })
      );
      if (respuestaToken.mensaje === 'Token de Autorización de Usuario generado con éxito.') {
        tokenAutorizacion = respuestaToken.tokenAutorizacion || '';
      }
    } catch (error: any) {
      console.error('ERROR AL OBTENER EL TOKEN DE AUTORIZACIÓN DEL USUARIO: ', error);
      if (error?.status === 0) {
        this.mostrarError('Error de comunicación con el servidor. Inténtalo de nuevo.');
        return;
      }
    }

    //PASO 2: CONSULTA EL USUARIO REAL EN BASE DE DATOS POR NICKNAME Y CONTRASEÑA ENCRIPTADA:
    this.usuariosService.getUserbyNicknameAndPassword(this.usuario, passwordEncriptado).subscribe({
      next: async respuesta => {
        if (respuesta.mensaje === 'Registro consultado con éxito.') {
          //LAS CREDENCIALES SON VÁLIDAS PERO EL BACKEND NO FIRMÓ EL TOKEN: NO SE ABRE SESIÓN.
          //GUARDAR UN TOKEN VACÍO HARÍA QUE EL INTERCEPTOR ENVIARA UNA CABECERA Authorization
          //VACÍA EN TODAS LAS PETICIONES SIGUIENTES Y TODAS RESPONDERÍAN 401.
          if (!tokenAutorizacion) {
            this.mostrarError('No se generó el token de autorización. Consulte con el Administrador del Sistema.');
            return;
          }
          this.authService.establecerSesion(respuesta.usuarioDTO, tokenAutorizacion);
          await this.esperarAnimacionCarga(inicioAnimacionCarga);
          this.cargando = false;
          void this.router.navigate(['/inicio']);
          return;
        }
        //MENSAJES DE NEGOCIO DEVUELTOS POR EL BACKEND (NICKNAME INEXISTENTE, CONTRASEÑA INCORRECTA, USUARIO INACTIVO):
        this.mostrarError(respuesta.mensaje || 'Usuario o contraseña incorrectos.');
      },
      error: (error) => {
        console.error('ERROR AL CONSULTAR EL USUARIO EN BASE DE DATOS: ', error);
        this.mostrarError((error.status === 401 || error.status === 403)
          ? 'Usuario o contraseña incorrectos.'
          : 'Error de comunicación con el servidor. Inténtalo de nuevo.');
      }
    });
  }

  actualizarCaptcha(): void {
    this.codigoCaptcha = this.generarCodigo();
    this.captcha = '';
  }

  alternarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  private async esperarAnimacionCarga(inicioAnimacionCarga: number): Promise<void> {
    const duracionMinimaMs = 2400;
    const tiempoRestanteMs = Math.max(0, duracionMinimaMs - (performance.now() - inicioAnimacionCarga));
    if (tiempoRestanteMs > 0) {
      await new Promise<void>(resolve => setTimeout(resolve, tiempoRestanteMs));
    }
  }

  private generarCodigo(): string {
    const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 5 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
  }
}
