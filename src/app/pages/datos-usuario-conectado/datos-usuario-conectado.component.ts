import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UsuariosService } from '../../services/panel-control/usuarios/usuarios.service';
import { ParametrosSistemaService } from '../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../services/gestion-archivos/gestion-archivos.service';
import { generarMiniaturaFotografia } from '../../shared/fotografias/miniatura-fotografia.util';
import { CajaFotografia } from '../../shared/fotografias/encuadre-rostro.util';

//MEDIDAS EN PÍXELES DE LA FOTOGRAFÍA DENTRO DEL HEXÁGONO, POR TRAMO DE PANTALLA. SALEN DE .avatar MENOS EL inset
//DE .avatar img EN EL SCSS DE ESTE COMPONENTE (110x93 MENOS 10, 70x59 MENOS 8 Y 58x49 MENOS 8), Y HAY QUE
//ACTUALIZARLAS SI ESAS MEDIDAS CAMBIAN. SIRVEN PARA DOS COSAS: GENERAR LA MINIATURA DEL TAMAÑO JUSTO (PEDIRLA MÁS
//GRANDE DE LO NECESARIO LA DEJA BORROSA, PORQUE EL NAVEGADOR TENDRÍA QUE VOLVER A ENCOGERLA CON SU FILTRO BARATO) Y
//SABER QUÉ FRANJA DE LA FOTOGRAFÍA SE VE, QUE ES DE DONDE SALE EL ENCUADRE DE LA CARA:
const CAJA_FOTO_HEXAGONO_GRANDE: CajaFotografia = { ancho: 100, alto: 83 };
const CAJA_FOTO_HEXAGONO_BASE: CajaFotografia = { ancho: 62, alto: 51 };
const CAJA_FOTO_HEXAGONO_MOVIL: CajaFotografia = { ancho: 50, alto: 41 };

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

  //object-position CALCULADO PARA ESTA FOTOGRAFÍA CONCRETA (VER encuadre-rostro.util.ts). MIENTRAS SEA null MANDA
  //EL VALOR FIJO DEL SCSS, QUE ES EL COMPORTAMIENTO DE SIEMPRE:
  posicionFotoUsuario: string | null = null;
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
                this.mostrarFotoReescalada(blob, solicitud);
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

  //LA FOTOGRAFÍA LLEGA EN SU TAMAÑO ORIGINAL (NORMALMENTE MÁS DE 1000 PÍXELES DE LADO) Y SE MUESTRA DENTRO DEL
  //HEXÁGONO, QUE COMO MUCHO MIDE 100. SI SE LE ENTREGA ASÍ AL <img>, EL NAVEGADOR LA ENCOGE DE UN GOLPE CON UN
  //FILTRO BARATO Y APARECEN BORDES ASERRADOS; REDUCIÉNDOLA ANTES CON EL REESCALADOR DE ALTA CALIDAD Y DEVOLVIÉNDOLE
  //EL CONTRASTE LOCAL SE VE NÍTIDA (VER miniatura-fotografia.util.ts):
  private mostrarFotoReescalada(blob: Blob, solicitud: number): void {
    generarMiniaturaFotografia(blob, this.cajaFotoHexagono()).then(({ url, posicionObjeto }) => {
      //SI MIENTRAS SE REESCALABA SE PIDIÓ OTRA FOTOGRAFÍA (O SE CERRÓ LA SESIÓN), SE DESCARTA ESTA Y SE LIBERA SU URL:
      if (solicitud !== this.solicitudFotoActual) {
        URL.revokeObjectURL(url);
        return;
      }
      this.liberarUrlFoto();
      this.previewUrlFotoUsuario = url;
      this.posicionFotoUsuario = posicionObjeto;
      this.changeDetectorRef.markForCheck();
    });
  }

  //TRAMO DE PANTALLA ACTIVO. LOS DOS PUNTOS DE CORTE SON LOS MISMOS DEL SCSS (1201px Y 760px); SI ALLÍ CAMBIAN,
  //AQUÍ TAMBIÉN. NO SE ESCUCHA EL REDIMENSIONADO A PROPÓSITO: LA FOTOGRAFÍA SE RESUELVE UNA SOLA VEZ AL ENTRAR, Y
  //SI LUEGO SE CAMBIA EL TAMAÑO DE LA VENTANA EL NAVEGADOR AJUSTA LO QUE FALTE:
  private cajaFotoHexagono(): CajaFotografia {
    if (typeof window.matchMedia !== 'function') return CAJA_FOTO_HEXAGONO_GRANDE;
    if (window.matchMedia('(min-width: 1201px)').matches) return CAJA_FOTO_HEXAGONO_GRANDE;
    if (window.matchMedia('(max-width: 760px)').matches) return CAJA_FOTO_HEXAGONO_MOVIL;
    return CAJA_FOTO_HEXAGONO_BASE;
  }

  private limpiarFotoUsuario(solicitud?: number): void {
    if (solicitud !== undefined && solicitud !== this.solicitudFotoActual) return;
    this.liberarUrlFoto();
    this.previewUrlFotoUsuario = null;
    this.posicionFotoUsuario = null;
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
