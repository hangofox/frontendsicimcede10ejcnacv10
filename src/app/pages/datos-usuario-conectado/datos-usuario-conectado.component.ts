import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UsuariosService } from '../../services/panel-control/usuarios/usuarios.service';
import { ParametrosSistemaService } from '../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../services/gestion-archivos/gestion-archivos.service';

@Component({
  selector: 'app-datos-usuario-conectado',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgIf],
  templateUrl: './datos-usuario-conectado.component.html',
  styleUrl: './datos-usuario-conectado.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatosUsuarioConectadoComponent implements OnDestroy {
  readonly usuario$;
  readonly ahora = new Date();
  previewUrlFotoUsuario: string | null = null;
  private readonly subscriptions = new Subscription();
  private solicitudFotoActual = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly usuariosService: UsuariosService,
    private readonly parametrosSistemaService: ParametrosSistemaService,
    private readonly gestionArchivosService: GestionArchivosService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.usuario$ = this.authService.usuario$;
    this.subscriptions.add(this.usuario$.subscribe(usuario => {
      if (usuario?.idUsuario) this.cargarFotoUsuario(usuario.idUsuario);
      else this.limpiarFotoUsuario();
    }));
  }

  private cargarFotoUsuario(idUsuario: number): void {
    const solicitud = ++this.solicitudFotoActual;
    this.subscriptions.add(this.usuariosService.getUserbyId(idUsuario).subscribe({
      next: (respuestaUsuario) => {
        if (solicitud !== this.solicitudFotoActual) return;
        const nombreArchivo = respuestaUsuario.usuarioDTO?.nombreArchivoFotoExtensionoFormatoUsuario;
        if (!nombreArchivo) {
          this.limpiarFotoUsuario(solicitud);
          return;
        }
        this.resolverFotoUsuario(String(nombreArchivo), solicitud);
      },
      error: () => this.limpiarFotoUsuario(solicitud)
    }));
  }

  private resolverFotoUsuario(nombreArchivo: string, solicitud: number): void {
    this.subscriptions.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const ruta = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones)
          + String(parametrosSistemaDTO.rutaDestinoArchivosUsuarios) + nombreArchivo;
        this.subscriptions.add(this.gestionArchivosService.getFile(ruta).subscribe({
          next: ({ rutaEstatica }) => {
            this.subscriptions.add(this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
              next: (blob) => {
                if (solicitud !== this.solicitudFotoActual) return;
                this.liberarUrlFoto();
                this.previewUrlFotoUsuario = URL.createObjectURL(blob);
                this.changeDetectorRef.markForCheck();
              },
              error: () => this.limpiarFotoUsuario(solicitud)
            }));
          },
          error: () => this.limpiarFotoUsuario(solicitud)
        }));
      },
      error: () => this.limpiarFotoUsuario(solicitud)
    }));
  }

  onErrorFotoUsuario(): void {
    this.limpiarFotoUsuario();
  }

  private limpiarFotoUsuario(solicitud?: number): void {
    if (solicitud !== undefined && solicitud !== this.solicitudFotoActual) return;
    this.liberarUrlFoto();
    this.previewUrlFotoUsuario = null;
    this.changeDetectorRef.markForCheck();
  }

  private liberarUrlFoto(): void {
    if (this.previewUrlFotoUsuario?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoUsuario);
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    void this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.solicitudFotoActual++;
    this.subscriptions.unsubscribe();
    this.liberarUrlFoto();
  }
}
