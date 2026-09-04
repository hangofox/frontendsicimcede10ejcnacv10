import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ResponsablesI } from '../../../../interfaces/panel-control/responsables/responsables.interface';
import { ResponsablesService } from '../../../../services/panel-control/responsables/responsables.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';

@Component({
  selector: 'app-vista-responsable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-responsable.component.html',
  styleUrl: './vista-responsable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaResponsableComponent implements OnChanges, OnDestroy {

  @Input() responsableData: ResponsablesI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  previewUrlFotoResponsable: string | null = null;
  private readonly subscriptions = new Subscription();
  private solicitudFotoActual = 0;

  constructor(
    private responsablesService: ResponsablesService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['responsableData']) {
      this.cargarFotoResponsable();
    }
  }

  private cargarFotoResponsable(): void {
    const solicitud = ++this.solicitudFotoActual;
    this.limpiarPreviewFoto();
    if (!this.responsableData?.idResponsable) {
      this.cargarFotoDesdeDatosSeleccionados(solicitud);
      return;
    }
    this.subscriptions.add(this.responsablesService.getResponsiblebyId(Number(this.responsableData.idResponsable)).subscribe({
      next: ({ responsableDTO }) => {
        if (solicitud !== this.solicitudFotoActual) {
          return;
        }
        const nombre = String(
          responsableDTO?.nombreArchivoFotoExtensionoFormatoResponsable
          || this.responsableData?.nombreArchivoFotoExtensionoFormatoResponsable
          || ''
        ).trim();
        const sigla = String(
          responsableDTO?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar
          || this.responsableData?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar
          || ''
        ).trim();
        if (!nombre || !sigla) {
          return;
        }
        this.subscriptions.add(this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(sigla).subscribe({
          next: ({ unidadMilitarDTO }) => {
            if (solicitud !== this.solicitudFotoActual) return;
            const carpeta = String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
            if (carpeta) {
              this.resolverFotoResponsable(nombre, carpeta, solicitud);
            }
          },
          error: (err) => {
            console.error('ERROR AL CONSULTAR LA UNIDAD MILITAR PARA LA FOTO: ', err);
            this.limpiarPreviewFoto(solicitud);
          }
        }));
      },
      error: (err) => {
        console.error('ERROR AL CARGAR EL RESPONSABLE PARA LA FOTO: ', err);
        this.cargarFotoDesdeDatosSeleccionados(solicitud);
      }
    }));
  }

  private cargarFotoDesdeDatosSeleccionados(solicitud: number): void {
    const nombre = String(this.responsableData?.nombreArchivoFotoExtensionoFormatoResponsable || '').trim();
    const sigla = String(this.responsableData?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
    if (!nombre || !sigla) {
      return;
    }
    this.subscriptions.add(this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(sigla).subscribe({
      next: ({ unidadMilitarDTO }) => {
        const carpeta = String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
        if (carpeta) {
          this.resolverFotoResponsable(nombre, carpeta, solicitud);
        }
      },
      error: (err) => console.error('ERROR AL CONSULTAR LA UNIDAD MILITAR PARA LA FOTO: ', err)
    }));
  }

  private resolverFotoResponsable(nombre: string, carpetaUnidad: string, solicitud: number): void {
    this.subscriptions.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        if (solicitud !== this.solicitudFotoActual) return;

        //MISMO PATRÓN DE VISTA-USUARIO: LA RUTA PROVIENE DE PARÁMETROS DEL SISTEMA Y EL ARCHIVO
        //SE RESUELVE/DESCARGA EXCLUSIVAMENTE MEDIANTE GestionArchivosService. PARA RESPONSABLES
        //SE AGREGA LA CARPETA DE LA UNIDAD MILITAR CONSULTADA POR SU SIGLA O ACRÓNIMO.
        const carpetaUnidadConfigurada = String(carpetaUnidad).trim();
        const carpetaUnidadConSeparador = /[\\/]$/.test(carpetaUnidadConfigurada)
          ? carpetaUnidadConfigurada
          : `${carpetaUnidadConfigurada}/`;
        const rutaCompleta = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosResponsables).trim()
          + carpetaUnidadConSeparador
          + String(nombre).trim();

        this.cargarFotoDesdeRuta(rutaCompleta, solicitud);
      },
      error: (err) => {
        console.error('ERROR AL OBTENER LOS PARÁMETROS DEL SISTEMA PARA LA FOTO DEL RESPONSABLE: ', err);
        this.limpiarPreviewFoto(solicitud);
      }
    }));
  }

  private cargarFotoDesdeRuta(ruta: string, solicitud: number): void {
    this.subscriptions.add(this.gestionArchivosService.getFile(ruta).subscribe({
      next: ({ rutaEstatica }) => {
        this.subscriptions.add(this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
        next: (blob) => {
          if (solicitud !== this.solicitudFotoActual) return;
          this.limpiarPreviewFoto();
          this.previewUrlFotoResponsable = URL.createObjectURL(blob);
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => {
          console.error('ERROR AL DESCARGAR LOS BYTES DE LA FOTO DEL RESPONSABLE: ', ruta, err);
          this.limpiarPreviewFoto(solicitud);
        }
        }));
      },
      error: (err) => {
        console.error('ERROR AL RESOLVER LA RUTA DE LA FOTO DEL RESPONSABLE: ', ruta, err);
        this.limpiarPreviewFoto(solicitud);
      }
    }));
  }

  onErrorFotoResponsable(): void {
    this.limpiarPreviewFoto();
  }

  private limpiarPreviewFoto(solicitud?: number): void {
    if (solicitud !== undefined && solicitud !== this.solicitudFotoActual) return;
    if (this.previewUrlFotoResponsable?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoResponsable);
    this.previewUrlFotoResponsable = null;
    this.changeDetectorRef.markForCheck();
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
