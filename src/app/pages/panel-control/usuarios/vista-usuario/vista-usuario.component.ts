import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { UsuariosI } from '../../../../interfaces/panel-control/usuarios/usuarios.interface';
import { GradosSiathI } from '../../../../interfaces/grados-siath/grados-siath.interface';
import { UsuariosService } from '../../../../services/panel-control/usuarios/usuarios.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';
import { generarMiniaturaFotografia } from '../../../../shared/fotografias/miniatura-fotografia.util';
import { CajaFotografia } from '../../../../shared/fotografias/encuadre-rostro.util';

//MEDIDAS EN PÍXELES DEL CÍRCULO DE LA FOTOGRAFÍA. DEBEN COINCIDIR CON .avatar DEL SCSS DE ESTE COMPONENTE:
const CAJA_FOTO: CajaFotografia = { ancho: 96, alto: 96 };

@Component({
  selector: 'app-vista-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-usuario.component.html',
  styleUrl: './vista-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaUsuarioComponent implements OnChanges, OnDestroy {

  @Input() usuarioData: UsuariosI | null = null;
  @Input() gradosSiath: GradosSiathI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();

  previewUrlFotoUsuario: string | null = null;

  //object-position CALCULADO PARA ESTA FOTOGRAFÍA CONCRETA (VER encuadre-rostro.util.ts). MIENTRAS SEA null MANDA
  //EL VALOR FIJO DEL SCSS, QUE ES EL COMPORTAMIENTO DE SIEMPRE:
  posicionFotoUsuario: string | null = null;
  private readonly subscriptions = new Subscription();
  private solicitudFotoActual = 0;

  constructor(
    private usuariosService: UsuariosService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarioData']) this.cargarFotoUsuario();
  }

  private cargarFotoUsuario(): void {
    const solicitud = ++this.solicitudFotoActual;
    this.limpiarPreviewFoto();
    if (!this.usuarioData?.idUsuario) return;

    this.subscriptions.add(this.usuariosService.getUserbyId(Number(this.usuarioData.idUsuario)).subscribe({
      next: (respuesta) => {
        if (solicitud !== this.solicitudFotoActual) return;
        const nombreArchivo = respuesta.usuarioDTO?.nombreArchivoFotoExtensionoFormatoUsuario;
        if (nombreArchivo) this.resolverFotoUsuario(String(nombreArchivo), solicitud);
      },
      error: (err) => console.error('ERROR AL CARGAR LOS DATOS DEL USUARIO PARA LA FOTO: ', err)
    }));
  }

  private resolverFotoUsuario(nombreArchivo: string, solicitud: number): void {
    this.subscriptions.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        if (solicitud !== this.solicitudFotoActual) return;
        const rutaCompleta = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones)
          + String(parametrosSistemaDTO.rutaDestinoArchivosUsuarios) + nombreArchivo;

        this.subscriptions.add(this.gestionArchivosService.getFile(rutaCompleta).subscribe({
          next: ({ rutaEstatica }) => {
            this.subscriptions.add(this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
              next: (blob) => {
                if (solicitud !== this.solicitudFotoActual) return;
                this.mostrarFotoReescalada(blob, solicitud);
              },
              error: () => this.limpiarPreviewFoto(solicitud)
            }));
          },
          error: () => this.limpiarPreviewFoto(solicitud)
        }));
      },
      error: (err) => {
        console.error('ERROR AL OBTENER LOS PARÁMETROS DEL SISTEMA PARA LA FOTO DEL USUARIO: ', err);
        this.limpiarPreviewFoto(solicitud);
      }
    }));
  }

  //LA FOTOGRAFÍA LLEGA EN SU TAMAÑO ORIGINAL (NORMALMENTE MÁS DE 1000 PÍXELES DE LADO) Y SE MUESTRA EN UN CÍRCULO
  //DE 96 PÍXELES. SI SE LE ENTREGA ASÍ AL <img>, EL NAVEGADOR LA ENCOGE CON UN FILTRO BARATO Y SE VE BLANDA;
  //REDUCIÉNDOLA ANTES CON EL REESCALADOR DE ALTA CALIDAD SE VE NÍTIDA (VER miniatura-fotografia.util.ts):
  private mostrarFotoReescalada(blob: Blob, solicitud: number): void {
    generarMiniaturaFotografia(blob, CAJA_FOTO).then(({ url, posicionObjeto }) => {
      //SI MIENTRAS SE REESCALABA SE PIDIÓ OTRA FOTOGRAFÍA (O SE CERRÓ EL MODAL), SE DESCARTA ESTA Y SE LIBERA SU URL:
      if (solicitud !== this.solicitudFotoActual) {
        URL.revokeObjectURL(url);
        return;
      }
      this.limpiarPreviewFoto();
      this.previewUrlFotoUsuario = url;
      this.posicionFotoUsuario = posicionObjeto;
      this.changeDetectorRef.markForCheck();
    });
  }

  onErrorFotoUsuario(): void {
    this.limpiarPreviewFoto();
  }

  private limpiarPreviewFoto(solicitud?: number): void {
    if (solicitud !== undefined && solicitud !== this.solicitudFotoActual) return;
    if (this.previewUrlFotoUsuario?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoUsuario);
    this.previewUrlFotoUsuario = null;
    this.posicionFotoUsuario = null;
    this.changeDetectorRef.markForCheck();
  }

  //MUESTRA LA DESCRIPCIÓN COMPLETA DEL GRADO (NO LA SIGLA/ACRÓNIMO QUE SE GUARDA EN gradoUsuario), BUSCÁNDOLA EN
  //EL CATÁLOGO REAL DE GRADOS SIATH YA CARGADO EN listado-usuarios. SI NO SE ENCUENTRA COINCIDENCIA, SE MUESTRA LA
  //SIGLA TAL CUAL PARA NO OCULTAR EL DATO:
  get descripcionGradoUsuario(): string {
    const sigla = String(this.usuarioData?.gradoUsuario ?? '').trim();
    if (!sigla) return 'No registrado';
    const grado = this.gradosSiath.find(g => String(g.nombreGradoSiath) === sigla);
    return grado ? String(grado.descripcionGradoSiath) : sigla;
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }

  ngOnDestroy(): void {
    this.solicitudFotoActual++;
    this.subscriptions.unsubscribe();
    this.limpiarPreviewFoto();
  }
}
