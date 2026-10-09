import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/panel-control/usuarios/usuarios.service';
import { RecuperacionesContrasenasAccesosUsuariosService } from '../../services/panel-control/parametros-sistema/recuperaciones-contrasenas-accesos-usuarios/recuperacionesContrasenasAccesosUsuarios.service';
import { LoginLogoComponent } from '../login/login-logo.component';
import { LoginPinonComponent } from '../login/login-pinon.component';
import { FechaAccesoComponent } from '../login/fecha-acceso.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';

//PASO 2 DE LA RECUPERACIÓN (MISMO PATRÓN DEL FRONTEND SIGEPS): EL USUARIO DIGITA EL CÓDIGO DE ACTIVACIÓN QUE
//RECIBIÓ POR CORREO Y SU NUEVA CONTRASEÑA. EL PASO 1 ES SeguimientoOlvidoContrasenaComponent.
@Component({
  selector: 'app-recuperacion-contrasena-acceso-usuario',
  standalone: true,
  imports: [FormsModule, RouterLink, LoginLogoComponent, LoginPinonComponent, FechaAccesoComponent, PiePaginaComponent],
  templateUrl: './recuperacion-contrasena-acceso-usuario.component.html',
  styleUrl: './recuperacion-contrasena-acceso-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecuperacionContrasenaAccesoUsuarioComponent implements OnInit {
  idUsuarioRecibido = 0;
  numeroDocumentoIdentificacionUsuarioRecibido = '';

  codigoActivacion = '';
  passwordUsuario1 = '';
  passwordUsuario2 = '';

  mensajeError = '';
  mensajeExito = '';
  cargando = false;

  constructor(
    private readonly router: Router,
    private readonly usuariosService: UsuariosService,
    private readonly recuperacionesService: RecuperacionesContrasenasAccesosUsuariosService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //DATOS GUARDADOS POR EL PASO ANTERIOR (SeguimientoOlvidoContrasenaComponent) AL ENVIAR EL CÓDIGO:
    this.idUsuarioRecibido = Number(sessionStorage.getItem('idUsuarioEnviado') || 0);
    this.numeroDocumentoIdentificacionUsuarioRecibido = sessionStorage.getItem('numeroDocumentoIdentificacionUsuarioEnviado') || '';

    //SI ENTRAN DIRECTO A ESTA PÁGINA (POR EJEMPLO ESCRIBIENDO LA URL) SIN HABER PEDIDO EL CÓDIGO, VUELVEN AL PASO 1:
    if (!this.idUsuarioRecibido || !this.numeroDocumentoIdentificacionUsuarioRecibido) {
      this.router.navigate(['/seguimiento-olvido-contrasena']);
    }
  }

  //ENCRIPTA LA CONTRASEÑA CON EL MISMO ESQUEMA DEL LOGIN (BASE64 APLICADO 10 VECES) QUE ESPERA EL BACKEND:
  private obtenerPasswordUsuarioEncriptado(passwordUsuarioDesencriptado: string): string {
    let passwordUsuarioEncriptado = passwordUsuarioDesencriptado;
    for (let i = 0; i < 10; i++) {
      passwordUsuarioEncriptado = btoa(passwordUsuarioEncriptado);
    }
    return passwordUsuarioEncriptado;
  }

  //CONVIERTE LA FECHA DEL BACKEND A Date (null SI NO SE PUEDE LEER):
  private aFecha(valor: unknown): Date | null {
    if (!valor) return null;
    const fecha = new Date(String(valor));
    return isNaN(fecha.getTime()) ? null : fecha;
  }

  private terminarConError(mensaje: string): void {
    this.mensajeError = mensaje;
    this.cargando = false;
    this.changeDetectorRef.markForCheck();
  }

  //RESTABLECE LA CONTRASEÑA DE ACCESO DEL USUARIO CON EL CÓDIGO DE ACTIVACIÓN RECIBIDO POR CORREO:
  restablecerContrasenaAccesoUsuario(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    const codigoActivacionDigitado = this.codigoActivacion.trim().toUpperCase();
    if (!codigoActivacionDigitado || !this.passwordUsuario1 || !this.passwordUsuario2) {
      this.mensajeError = 'Digite el código de activación y la nueva contraseña dos veces.';
      return;
    }

    //LAS DOS CONTRASEÑAS DEBEN COINCIDIR:
    if (this.passwordUsuario1 !== this.passwordUsuario2) {
      this.mensajeError = 'La contraseña y la confirmación de contraseña no coinciden.';
      return;
    }

    //POLÍTICA DE SEGURIDAD: MÍNIMO 8 CARACTERES, AL MENOS UNA MAYÚSCULA Y LETRAS Y NÚMEROS:
    const regexPoliticaSeguridad = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (!regexPoliticaSeguridad.test(this.passwordUsuario1)) {
      this.mensajeError = 'La contraseña debe tener mínimo 8 caracteres, incluir al menos una letra mayúscula y contener letras y números.';
      return;
    }

    this.cargando = true;

    //SE CONSULTA EL CÓDIGO PARA DAR UN MENSAJE CLARO ANTES DE INTENTAR EL CAMBIO. LA VALIDACIÓN QUE CUENTA LA HACE
    //EL BACKEND AL CAMBIAR LA CONTRASEÑA (MISMO USUARIO, VIGENCIA Y ESTADO), PORQUE LA DEL NAVEGADOR SE PUEDE SALTAR:
    this.recuperacionesService.getRecoveryPasswordAccessUserbyCodigoActivacion(codigoActivacionDigitado).subscribe({
      next: respuesta => {
        const recuperacion = respuesta.recuperacionContrasenaAccesoUsuarioDTO;

        if (respuesta.mensaje !== 'Registro consultado con éxito.' || !recuperacion) {
          this.terminarConError('El código de activación digitado no es válido.');
          return;
        }

        //EL CÓDIGO DEBE SER DEL MISMO USUARIO QUE INICIÓ LA RECUPERACIÓN:
        if (Number(recuperacion.usuarioDTO?.idUsuario) !== this.idUsuarioRecibido) {
          this.terminarConError('El código de activación digitado no es válido.');
          return;
        }

        if (recuperacion.estadoUsoCodigoActivacionContrasenaAccesoUsuario === 'USADO') {
          this.terminarConError('El código de activación ya fue usado.');
          return;
        }

        const fechaExpiracion = this.aFecha(recuperacion.fechaHMSExpCodActivContrasenaAccesoUsuario);
        if (recuperacion.estadoUsoCodigoActivacionContrasenaAccesoUsuario === 'EXPIRADO' || (fechaExpiracion !== null && fechaExpiracion < new Date())) {
          this.terminarConError('El código de activación ya expiró.');
          return;
        }

        //CÓDIGO VÁLIDO: EL BACKEND VUELVE A VALIDARLO, CAMBIA LA CONTRASEÑA Y LO MARCA COMO USADO:
        const passwordEncriptado = this.obtenerPasswordUsuarioEncriptado(this.passwordUsuario1);
        this.usuariosService.recoverPasswordAccessUserbyActivationCode(codigoActivacionDigitado, this.idUsuarioRecibido, passwordEncriptado).subscribe({
          next: respuestaPassword => {
            if (respuestaPassword.mensaje === 'Acceso de usuario recuperado con éxito. Se actualizó la contraseña de acceso.') {
              this.mensajeExito = respuestaPassword.mensaje;
              this.cargando = false;
              this.changeDetectorRef.markForCheck();

              //SE LIMPIA LA SESIÓN Y SE REDIRIGE AL LOGIN DESPUÉS DE 3 SEGUNDOS:
              sessionStorage.removeItem('idUsuarioEnviado');
              sessionStorage.removeItem('numeroDocumentoIdentificacionUsuarioEnviado');
              setTimeout(() => this.router.navigate(['/login']), 3000);
            } else {
              this.terminarConError(respuestaPassword.mensaje || 'No fue posible actualizar la contraseña de acceso.');
            }
          },
          error: err => {
            console.error('ERROR AL ACTUALIZAR LA CONTRASEÑA DE ACCESO: ', err);
            this.terminarConError('Error de comunicación con el servidor. Inténtalo de nuevo.');
          }
        });
      },
      error: err => {
        console.error('ERROR AL CONSULTAR EL CÓDIGO DE ACTIVACIÓN: ', err);
        this.terminarConError('El código de activación digitado no es válido.');
      }
    });
  }
}
