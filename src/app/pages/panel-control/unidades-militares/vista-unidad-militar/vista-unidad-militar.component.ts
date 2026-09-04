import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

@Component({
  selector: 'app-vista-unidad-militar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-unidad-militar.component.html',
  styleUrl: './vista-unidad-militar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaUnidadMilitarComponent implements OnChanges, OnDestroy {

  @Input() unidadMilitarData: UnidadesMilitaresI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
  previewUrlFotoUnidadMilitar: string | null = null;
  private readonly subscriptions = new Subscription();

  constructor(
    private unidadesMilitaresService: UnidadesMilitaresService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unidadMilitarData']) this.cargarFotoUnidadMilitar();
  }

  private cargarFotoUnidadMilitar(): void {
    this.limpiarPreview();
    if (!this.unidadMilitarData?.idUnidadMilitar) return;
    this.subscriptions.add(this.unidadesMilitaresService.getMilitaryUnitbyId(Number(this.unidadMilitarData.idUnidadMilitar)).subscribe({
      next: ({ unidadMilitarDTO }) => {
        const nombre = String(unidadMilitarDTO?.nombreArchivoFotoLogExtoFmtUnidadMilitar || '').trim();
        if (nombre) this.resolverFoto(nombre);
      },
      error: (err) => console.error('ERROR AL CONSULTAR LA UNIDAD MILITAR PARA EL LOGOTIPO: ', err)
    }));
  }

  private resolverFoto(nombreArchivo: string): void {
    this.subscriptions.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const ruta = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosUnidadesMilitares).trim()
          + nombreArchivo;
        this.subscriptions.add(this.gestionArchivosService.getFile(ruta).subscribe({
          next: ({ rutaEstatica }) => this.subscriptions.add(this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
            next: (blob) => {
              this.limpiarPreview();
              this.previewUrlFotoUnidadMilitar = URL.createObjectURL(blob);
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

  onErrorFotoUnidadMilitar(): void { this.limpiarPreview(); }

  private limpiarPreview(): void {
    if (this.previewUrlFotoUnidadMilitar?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoUnidadMilitar);
    this.previewUrlFotoUnidadMilitar = null;
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
