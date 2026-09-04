import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { UsuariosI } from '../../../../interfaces/panel-control/usuarios/usuarios.interface';
import { GradosSiathI } from '../../../../interfaces/grados-siath/grados-siath.interface';
import { UsuariosService } from '../../../../services/panel-control/usuarios/usuarios.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

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
                this.limpiarPreviewFoto();
                this.previewUrlFotoUsuario = URL.createObjectURL(blob);
                this.changeDetectorRef.markForCheck();
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

  onErrorFotoUsuario(): void {
    this.limpiarPreviewFoto();
  }

  private limpiarPreviewFoto(solicitud?: number): void {
    if (solicitud !== undefined && solicitud !== this.solicitudFotoActual) return;
    if (this.previewUrlFotoUsuario?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoUsuario);
    this.previewUrlFotoUsuario = null;
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
