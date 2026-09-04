import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { HistorialIntegrantesDocumentosI } from '../../../../interfaces/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.interface';
import { HistorialIntegrantesDocumentosService } from '../../../../services/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

@Component({
  selector: 'app-vista-historial-integrante-documentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-historial-integrante-documentos.component.html',
  styleUrl: './vista-historial-integrante-documentos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaHistorialIntegranteDocumentosComponent implements OnChanges, OnDestroy {

  @Input() historialIntegranteDocumentosData: HistorialIntegrantesDocumentosI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
  previewUrlFotoFirmaIntegranteDocumentos: string | null = null;
  private readonly subscriptions = new Subscription();

  constructor(
    private historialService: HistorialIntegrantesDocumentosService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['historialIntegranteDocumentosData']) this.cargarFirma();
  }

  private cargarFirma(): void {
    this.limpiarPreview();
    const id = this.historialIntegranteDocumentosData?.idHistorialIntegranteDocumentos;
    if (!id) return;
    this.subscriptions.add(this.historialService.getHistorialIntegranteDocumentosbyId(Number(id)).subscribe({
      next: ({ historialIntegranteDocumentosDTO }) => {
        const nombre = String(historialIntegranteDocumentosDTO?.nombreArchivoFotoFirmaIntegranteDocumentos || '').trim();
        const sigla = String(historialIntegranteDocumentosDTO?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
        if (!nombre || !sigla) return;
        this.subscriptions.add(this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(sigla).subscribe({
          next: ({ unidadMilitarDTO }) => {
            const carpeta = String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
            if (carpeta) this.resolverFirma(nombre, carpeta);
          },
          error: (err) => console.error('ERROR AL CONSULTAR LA UNIDAD MILITAR PARA LA FIRMA: ', err)
        }));
      },
      error: (err) => console.error('ERROR AL CONSULTAR EL HISTORIAL PARA LA FIRMA: ', err)
    }));
  }

  private resolverFirma(nombre: string, carpeta: string): void {
    this.subscriptions.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const carpetaConSeparador = /[\\/]$/.test(carpeta) ? carpeta : `${carpeta}/`;
        const ruta = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosHistorialIntegrantesDocumentos).trim()
          + carpetaConSeparador + nombre;
        this.subscriptions.add(this.gestionArchivosService.getFile(ruta).subscribe({
          next: ({ rutaEstatica }) => this.subscriptions.add(this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
            next: (blob) => {
              this.limpiarPreview();
              this.previewUrlFotoFirmaIntegranteDocumentos = URL.createObjectURL(blob);
              this.changeDetectorRef.markForCheck();
            },
            error: () => this.limpiarPreview()
          })),
          error: () => this.limpiarPreview()
        }));
      },
      error: () => this.limpiarPreview()
    }));
  }

  onErrorFirma(): void { this.limpiarPreview(); }

  private limpiarPreview(): void {
    if (this.previewUrlFotoFirmaIntegranteDocumentos?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoFirmaIntegranteDocumentos);
    this.previewUrlFotoFirmaIntegranteDocumentos = null;
    this.changeDetectorRef.markForCheck();
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.limpiarPreview();
  }
}
