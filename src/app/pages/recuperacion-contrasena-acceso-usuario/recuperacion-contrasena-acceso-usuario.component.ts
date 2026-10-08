import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuariosI } from '../../interfaces/panel-control/usuarios/usuarios.interface';
import { UsuariosService } from '../../services/panel-control/usuarios/usuarios.service';
import { MedioEnvioCodigoActivacion } from '../../interfaces/panel-control/parametros-sistema/recuperaciones-contrasenas-accesos-usuarios/recuperacionesContrasenasAccesosUsuarios.interface';
import { RecuperacionesContrasenasAccesosUsuariosService } from '../../services/panel-control/parametros-sistema/recuperaciones-contrasenas-accesos-usuarios/recuperacionesContrasenasAccesosUsuarios.service';
import { LoginLogoComponent } from '../login/login-logo.component';
import { LoginPinonComponent } from '../login/login-pinon.component';
import { FechaAccesoComponent } from '../login/fecha-acceso.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-recuperacion-contrasena-acceso-usuario',
  standalone: true,
  imports: [FormsModule, RouterLink, LoginLogoComponent, LoginPinonComponent, FechaAccesoComponent, PiePaginaComponent],
  templateUrl: './recuperacion-contrasena-acceso-usuario.component.html',
  styleUrl: './recuperacion-contrasena-acceso-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecuperacionContrasenaAccesoUsuarioComponent {
  numeroDocumentoIdentificacion = '';
  usuarioEncontrado: UsuariosI | null = null;
  mensajeError = '';
  cargando = false;

  //ENVÍO DEL CÓDIGO DE ACTIVACIÓN:
  medioEnvio: MedioEnvioCodigoActivacion | '' = '';
  enviandoCodigo = false;
  codigoEnviado = false;
  mensajeEnvio = '';

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly recuperacionesService: RecuperacionesContrasenasAccesosUsuariosService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  //CORREOS DEL USUARIO ENCONTRADO QUE PUEDEN RECIBIR EL CÓDIGO, ENMASCARADOS PARA MOSTRARLOS.
  get mediosEnvioDisponibles(): { medio: MedioEnvioCodigoActivacion; etiqueta: string; correo: string }[] {
    const usuario = this.usuarioEncontrado;
    if (!usuario) return [];
    const medios: { medio: MedioEnvioCodigoActivacion; etiqueta: string; correo: string }[] = [];
    const institucional = String(usuario.correoElectronicoInstitucionalUsuario ?? '').trim();
    const personal = String(usuario.correoElectronicoPersonalUsuario ?? '').trim();
    if (institucional) medios.push({ medio: 'CORREO ELECTRONICO INSTITUCIONAL', etiqueta: 'Correo institucional', correo: this.enmascararCorreo(institucional) });
    if (personal) medios.push({ medio: 'CORREO ELECTRONICO PERSONAL', etiqueta: 'Correo personal', correo: this.enmascararCorreo(personal) });
    return medios;
  }

  //MUESTRA SOLO LAS DOS PRIMERAS LETRAS DEL USUARIO DEL CORREO Y EL DOMINIO (EJ. he*****@ejercito.mil.co).
  private enmascararCorreo(correo: string): string {
    const arroba = correo.indexOf('@');
    if (arroba < 1) return '*****';
    return correo.slice(0, Math.min(2, arroba)) + '*****' + correo.slice(arroba);
  }

  //BUSCA AL USUARIO POR NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN PARA INICIAR LA RECUPERACIÓN.
  //MISMO PATRÓN QUE EL PROYECTO DE REFERENCIA: LA RECUPERACIÓN NO PARTE DEL NICKNAME SINO
  //DEL DOCUMENTO, Y AL ENCONTRARLO SE DEJAN LOS DATOS EN sessionStorage PARA EL PASO SIGUIENTE.
  buscarUsuario(): void {
    this.mensajeError = '';
    this.usuarioEncontrado = null;
    this.medioEnvio = '';
    this.codigoEnviado = false;
    this.mensajeEnvio = '';

    const numeroDocumento = this.numeroDocumentoIdentificacion.trim();

    if (!numeroDocumento) {
      this.mensajeError = 'Digite el número de documento de identificación.';
      return;
    }

    if (!/^\d+$/.test(numeroDocumento)) {
      this.mensajeError = 'El número de documento de identificación solo admite dígitos.';
      return;
    }

    this.cargando = true;

    this.usuariosService.getRecoveryPasswordAccessUserbyNumeroDocumentoIdentificacion(numeroDocumento).subscribe({
      next: respuesta => {
        this.cargando = false;

        if (respuesta.mensaje === 'Registro consultado con éxito.' && respuesta.usuarioDTO) {
          this.usuarioEncontrado = respuesta.usuarioDTO;
          //SI SOLO TIENE UN CORREO REGISTRADO, QUEDA ELEGIDO DE UNA VEZ:
          const medios = this.mediosEnvioDisponibles;
          this.medioEnvio = medios.length === 1 ? medios[0].medio : '';
          //DATOS QUE CONSUME EL PASO SIGUIENTE (CÓDIGO DE ACTIVACIÓN Y NUEVA CONTRASEÑA):
          sessionStorage.setItem('idUsuarioEnviado', String(respuesta.usuarioDTO.idUsuario ?? ''));
          sessionStorage.setItem('numeroDocumentoIdentificacionUsuarioEnviado', numeroDocumento);
        } else {
          //MENSAJE DE NEGOCIO DEVUELTO POR EL BACKEND:
          this.mensajeError = respuesta.mensaje || 'No existe un usuario con ese número de documento de identificación.';
        }

        //OnPush: la respuesta llega fuera de un evento de la vista, hay que marcarla para revisión.
        this.changeDetectorRef.markForCheck();
      },
      error: error => {
        console.error('ERROR AL CONSULTAR EL USUARIO PARA LA RECUPERACIÓN DE CONTRASEÑA: ', error);
        this.mensajeError = (error.status === 404)
          ? 'No existe un usuario con ese número de documento de identificación.'
          : 'Error de comunicación con el servidor. Inténtalo de nuevo.';
        this.cargando = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  //PIDE AL BACKEND QUE ENVÍE EL CÓDIGO DE ACTIVACIÓN AL CORREO ELEGIDO. EL BACKEND GENERA EL CÓDIGO, GUARDA LA
  //RECUPERACIÓN Y REEMPLAZA EN LA PLANTILLA HTML LAS ETIQUETAS *[NUMDOCIDSICIM]* (NÚMERO DE DOCUMENTO) Y
  //*[CODACTIVAUSICIM]* (CÓDIGO DE ACTIVACIÓN) ANTES DE ENVIAR EL CORREO.
  enviarCodigoActivacion(): void {
    this.mensajeError = '';
    this.mensajeEnvio = '';

    const idUsuario = Number(this.usuarioEncontrado?.idUsuario);
    if (!idUsuario || !this.medioEnvio) {
      this.mensajeError = 'Seleccione el correo electrónico al que se enviará el código de activación.';
      return;
    }

    this.enviandoCodigo = true;

    this.recuperacionesService.sendActivationCodePasswordRecovery({ idUsuario, medioEnvio: this.medioEnvio }).subscribe({
      next: respuesta => {
        this.enviandoCodigo = false;
        if (respuesta.banderaexito) {
          this.codigoEnviado = true;
          this.mensajeEnvio = respuesta.mensaje;
        } else {
          //MENSAJE DE NEGOCIO DEVUELTO POR EL BACKEND (SIN CORREO, SIN PARÁMETROS, FALLA SMTP...):
          this.mensajeError = respuesta.mensaje || 'No es posible enviar el código de activación.';
        }
        this.changeDetectorRef.markForCheck();
      },
      error: error => {
        console.error('ERROR AL ENVIAR EL CÓDIGO DE ACTIVACIÓN DE RECUPERACIÓN DE CONTRASEÑA: ', error);
        this.mensajeError = 'Error de comunicación con el servidor. Inténtalo de nuevo.';
        this.enviandoCodigo = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
