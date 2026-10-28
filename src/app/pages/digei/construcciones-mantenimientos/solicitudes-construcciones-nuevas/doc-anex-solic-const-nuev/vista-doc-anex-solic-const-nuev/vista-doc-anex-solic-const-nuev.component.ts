import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentacionAnexaSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/documentacion-anex-solic-infraest/documentacion-anex-solic-infraest.interface';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';

@Component({
  selector: 'app-vista-doc-anex-solic-const-nuev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-doc-anex-solic-const-nuev.component.html',
  styleUrl: './vista-doc-anex-solic-const-nuev.component.scss'
})
export class VistaDocumentacionAnexaSolicConstNuevComponent implements OnChanges, OnDestroy {
  @Input() data: DocumentacionAnexaSolicInfraestI | null = null;
  //CARPETA DEL SERVIDOR DE ARCHIVOS CON LOS DOCUMENTOS DE LA UNIDAD MILITAR DE LA SOLICITUD (LA RESUELVE EL LISTADO):
  @Input() carpetaDocumentos: string | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  //VISTA PREVIA DEL ARCHIVO (blob:) TRAÍDO CON EL TOKEN DE AUTORIZACIÓN, IGUAL QUE LAS FOTOGRAFÍAS ANEXAS DE APOYOS:
  urlArchivo: string | null = null;
  urlSegura: SafeResourceUrl | null = null;
  cargando = false;
  noEncontrado = false;

  constructor(
    private readonly gestionArchivosService: GestionArchivosService,
    private readonly sanitizer: DomSanitizer,
    private readonly cdr: ChangeDetectorRef
  ) {}

  get nombreArchivo(): string {
    return String(this.data?.nombreArchivoDocumentoAnexoSolicInfraest ?? '').trim();
  }

  get extension(): string {
    return (this.nombreArchivo.split('.').pop() || '').toLowerCase();
  }

  //LOS PDF SE MUESTRAN EN UN VISOR Y LAS IMÁGENES DIRECTAMENTE; LOS DEMÁS (WORD, EXCEL) SOLO SE PUEDEN ABRIR O DESCARGAR:
  get esPdf(): boolean { return this.extension === 'pdf'; }
  get esImagen(): boolean { return ['jpg', 'jpeg', 'png'].includes(this.extension); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['carpetaDocumentos']) this.cargarArchivo();
  }

  ngOnDestroy(): void { this.liberarArchivo(); }

  private cargarArchivo(): void {
    this.liberarArchivo();
    this.noEncontrado = false;
    if (!this.nombreArchivo || !this.carpetaDocumentos) {
      this.noEncontrado = !!this.nombreArchivo;
      return;
    }
    this.cargando = true;
    this.gestionArchivosService.getFile(this.carpetaDocumentos + this.nombreArchivo).subscribe({
      next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
        next: bytes => {
          //SE FIJA EL TIPO DEL ARCHIVO PARA QUE EL NAVEGADOR MUESTRE EL PDF EN EL VISOR Y NO LO DESCARGUE:
          const tipo = this.esPdf ? 'application/pdf' : (bytes.type || 'application/octet-stream');
          this.urlArchivo = URL.createObjectURL(new Blob([bytes], { type: tipo }));
          this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlArchivo);
          this.cargando = false;
          this.cdr.markForCheck();
        },
        error: () => this.marcarNoEncontrado()
      }),
      error: () => this.marcarNoEncontrado()
    });
  }

  private marcarNoEncontrado(): void {
    this.cargando = false;
    this.noEncontrado = true;
    this.cdr.markForCheck();
  }

  private liberarArchivo(): void {
    if (this.urlArchivo) URL.revokeObjectURL(this.urlArchivo);
    this.urlArchivo = null;
    this.urlSegura = null;
  }

  //ABRE EL ARCHIVO EN OTRA PESTAÑA DEL NAVEGADOR:
  abrirEnPestana(): void {
    if (this.urlArchivo) window.open(this.urlArchivo, '_blank');
  }
}
