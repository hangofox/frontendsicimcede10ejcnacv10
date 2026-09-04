import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    private readonly router: Router
  ) {}

  async ingresar(): Promise<void> {
    this.mensajeError = '';
    if (this.captcha.trim().toUpperCase() !== this.codigoCaptcha) {
      this.mensajeError = 'El código de verificación no coincide.';
      this.actualizarCaptcha();
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

    //PASO 1: OBTIENE EL TOKEN DE AUTORIZACIÓN FIRMADO POR EL BACKEND (POST /login):
    let tokenAutorizacion = '';
    try {
      const respuestaToken = await firstValueFrom(
        this.tokensAutorizacionesService.tokenAuthorizationByNicknameAndPassword({
          nicknameUsuario: this.usuario,
          passwordUsuario: passwordEncriptado
        })
      );
      tokenAutorizacion = respuestaToken.tokenAutorizacion || '';
    } catch (error) {
      console.error('ERROR AL OBTENER EL TOKEN DE AUTORIZACIÓN DEL USUARIO: ', error);
      this.mensajeError = 'Error de comunicación con el servidor. Inténtalo de nuevo.';
      this.cargando = false;
      this.actualizarCaptcha();
      return;
    }

    //PASO 2: CONSULTA EL USUARIO REAL EN BASE DE DATOS POR NICKNAME Y CONTRASEÑA ENCRIPTADA:
    this.usuariosService.getUserbyNicknameAndPassword(this.usuario, passwordEncriptado).subscribe({
      next: async respuesta => {
        if (respuesta.mensaje === 'Registro consultado con éxito.') {
          this.authService.establecerSesion(respuesta.usuarioDTO, tokenAutorizacion);
          await this.esperarAnimacionCarga(inicioAnimacionCarga);
          this.cargando = false;
          void this.router.navigate(['/inicio']);
          return;
        }
        this.cargando = false;
        //MENSAJES DE NEGOCIO DEVUELTOS POR EL BACKEND (NICKNAME INEXISTENTE, CONTRASEÑA INCORRECTA, USUARIO INACTIVO):
        this.mensajeError = respuesta.mensaje || 'Usuario o contraseña incorrectos.';
        this.actualizarCaptcha();
      },
      error: (error) => {
        console.error('ERROR AL CONSULTAR EL USUARIO EN BASE DE DATOS: ', error);
        this.mensajeError = (error.status === 401 || error.status === 403)
          ? 'Acceso denegado. Verifique sus credenciales.'
          : 'Error de comunicación con el servidor. Inténtalo de nuevo.';
        this.cargando = false;
        this.actualizarCaptcha();
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
