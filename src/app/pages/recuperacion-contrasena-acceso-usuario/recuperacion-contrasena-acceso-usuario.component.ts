import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuariosI } from '../../interfaces/panel-control/usuarios/usuarios.interface';
import { UsuariosService } from '../../services/panel-control/usuarios/usuarios.service';
import { CabezoteComponent } from '../cabezote/cabezote.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-recuperacion-contrasena-acceso-usuario',
  standalone: true,
  imports: [FormsModule, RouterLink, CabezoteComponent, PiePaginaComponent],
  templateUrl: './recuperacion-contrasena-acceso-usuario.component.html',
  styleUrl: './recuperacion-contrasena-acceso-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecuperacionContrasenaAccesoUsuarioComponent {
  numeroDocumentoIdentificacion = '';
  usuarioEncontrado: UsuariosI | null = null;
  mensajeError = '';
  cargando = false;

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  //BUSCA AL USUARIO POR NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN PARA INICIAR LA RECUPERACIÓN.
  //MISMO PATRÓN QUE EL PROYECTO DE REFERENCIA: LA RECUPERACIÓN NO PARTE DEL NICKNAME SINO
  //DEL DOCUMENTO, Y AL ENCONTRARLO SE DEJAN LOS DATOS EN sessionStorage PARA EL PASO SIGUIENTE.
  buscarUsuario(): void {
    this.mensajeError = '';
    this.usuarioEncontrado = null;

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
}
