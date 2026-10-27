import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { IntegrantesApoyosAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/integrantes-apoy-atenc-prev-emerg-des/integrantes-apoy-atenc-prev-emerg-des.interface';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';
import { ConfiguracionIntegranteApoyo, INTEGRANTES_APOYO, nombreArchivoFirmaIntegrante, TipoIntegranteApoyo } from '../add-upd-del-integ_apoy-atenc-prev-emerg-desast/add-upd-del-integ_apoy-atenc-prev-emerg-desast.component';

@Component({
  selector: 'app-vista-integ-apoy-atenc-prev-emerg-desast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-integ-apoy-atenc-prev-emerg-desast.component.html',
  styleUrl: './vista-integ-apoy-atenc-prev-emerg-desast.component.scss'
})
export class VistaIntegApoyAtencPrevEmergDesastComponent implements OnChanges, OnDestroy {
  @Input() data: IntegrantesApoyosAtencPrevEmergDesastI | null = null;
  //CARPETA DEL SERVIDOR DE ARCHIVOS CON LAS FIRMAS DE LA UNIDAD MILITAR DEL APOYO (LA RESUELVE EL LISTADO):
  @Input() carpetaFirmas: string | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  readonly integrantes = INTEGRANTES_APOYO;
  //VISTA PREVIA DE LA FIRMA DE CADA INTEGRANTE (null SI NO TIENE O NO SE ENCONTRÓ EL ARCHIVO EN EL SERVIDOR):
  previews: Record<TipoIntegranteApoyo, string | null> = { JGR: null, JOP: null, CTE: null };
  noEncontradas: Record<TipoIntegranteApoyo, boolean> = { JGR: false, JOP: false, CTE: false };
  private solicitudCarga = 0;

  constructor(
    private readonly gestionArchivosService: GestionArchivosService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['carpetaFirmas']) this.cargarFirmas();
  }

  ngOnDestroy(): void { this.liberarPreviews(); }

  valor(integrante: ConfiguracionIntegranteApoyo, prefijo: string): string {
    return String((this.data as any)?.[prefijo + integrante.sufijo] ?? '').trim();
  }

  nombreFirma(integrante: ConfiguracionIntegranteApoyo): string {
    return nombreArchivoFirmaIntegrante(this.data, integrante);
  }

  //GRADO, NOMBRES Y APELLIDOS DEL INTEGRANTE EN UNA SOLA LÍNEA (EJ. "MY OSCAR IVAN TRUJILLO MORA"):
  nombreCompleto(integrante: ConfiguracionIntegranteApoyo): string {
    return ['grado', 'nombres', 'primerApellido', 'segundoApellido'].map(prefijo => this.valor(integrante, prefijo)).filter(Boolean).join(' ');
  }

  private liberarPreviews(): void {
    this.integrantes.forEach(integrante => {
      const url = this.previews[integrante.tipo];
      if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
      this.previews[integrante.tipo] = null;
      this.noEncontradas[integrante.tipo] = false;
    });
  }

  //TRAE CADA FIRMA GUARDADA DEL SERVIDOR DE ARCHIVOS (getFile + getFileBytes, CON EL TOKEN DE AUTORIZACIÓN):
  private cargarFirmas(): void {
    const solicitud = ++this.solicitudCarga;
    this.liberarPreviews();
    const carpeta = this.carpetaFirmas;
    if (!carpeta) return;
    this.integrantes.forEach(integrante => {
      const nombre = this.nombreFirma(integrante);
      if (!nombre) return;
      const marcarNoEncontrada = () => {
        if (solicitud !== this.solicitudCarga) return;
        this.noEncontradas[integrante.tipo] = true;
        this.cdr.markForCheck();
      };
      this.gestionArchivosService.getFile(carpeta + nombre).subscribe({
        next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
          next: bytes => {
            if (solicitud !== this.solicitudCarga) return;
            this.previews[integrante.tipo] = URL.createObjectURL(bytes);
            this.cdr.markForCheck();
          },
          error: marcarNoEncontrada
        }),
        error: marcarNoEncontrada
      });
    });
  }
}
