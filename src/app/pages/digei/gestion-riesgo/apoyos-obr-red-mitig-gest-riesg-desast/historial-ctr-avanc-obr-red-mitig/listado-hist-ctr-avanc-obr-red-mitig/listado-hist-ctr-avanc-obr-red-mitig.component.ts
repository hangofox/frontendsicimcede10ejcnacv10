import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialControlAvancObrRedMitigGestRiesgDesastI, HistorialControlAvancObrRedMitigGestRiesgDesastMsj } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-ctr-avanc-obr-red-mitig/historial-ctr-avanc-obr-red-mitig.interface';
import { ApoyosObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.interface';
import { HistorialControlAvancObrRedMitigGestRiesgDesastService } from '../../../../../../services/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-ctr-avanc-obr-red-mitig/historial-ctr-avanc-obr-red-mitig.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelHistCtrAvancObrRedMitigComponent } from '../add-upd-del-hist-ctr-avanc-obr-red-mitig/add-upd-del-hist-ctr-avanc-obr-red-mitig.component';
import { VistaHistCtrAvancObrRedMitigComponent } from '../vista-hist-ctr-avanc-obr-red-mitig/vista-hist-ctr-avanc-obr-red-mitig.component';

@Component({
  selector: 'app-listado-hist-ctr-avanc-obr-red-mitig',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelHistCtrAvancObrRedMitigComponent, VistaHistCtrAvancObrRedMitigComponent],
  templateUrl: './listado-hist-ctr-avanc-obr-red-mitig.component.html',
  styleUrl: './listado-hist-ctr-avanc-obr-red-mitig.component.scss'
})
export class ListadoHistCtrAvancObrRedMitigComponent implements OnChanges {
  //APOYO DE OBRAS, REDUCCIÓN Y MITIGACIÓN DE RIESGOS Y DESASTRES DESDE EL QUE SE ABRE EL HISTORIAL (MODAL DEL LISTADO DE APOYOS); SOLO
  //SE LISTAN Y SE CREAN CONTROLES DE AVANCES DE LA OBRA DE ESTE APOYO:
  @Input() apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cantidad: ['10'] });

  //EL BACKEND (count, lista Y listaPag) NO RECIBE EL ID DEL APOYO, ASÍ QUE SE TRAE EL HISTORIAL COMPLETO UNA SOLA VEZ Y SE
  //QUEDAN AQUÍ SOLO LOS REGISTROS DEL APOYO; LA BÚSQUEDA Y LA PAGINACIÓN SE HACEN SOBRE ESTA LISTA — MISMO PATRÓN QUE
  //ListadoHistMaqPesadObrRedMitigComponent:
  registrosApoyo: HistorialControlAvancObrRedMitigGestRiesgDesastI[] = [];
  registros: HistorialControlAvancObrRedMitigGestRiesgDesastI[] = [];
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialControlAvancObrRedMitigGestRiesgDesastI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: HistorialControlAvancObrRedMitigGestRiesgDesastService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  //AL CAMBIAR EL APOYO SE LIMPIA LA BÚSQUEDA Y SE VUELVE A CARGAR SU HISTORIAL:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apoyoObrRedMitigGestRiesgDesast']) {
      this.form.patchValue({ keyword: '' });
      this.cargarHistorialApoyo();
    }
  }

  //TRAE EL HISTORIAL COMPLETO, DEJA SOLO LOS REGISTROS DEL APOYO Y VUELVE A LA PRIMERA PÁGINA:
  private cargarHistorialApoyo(): void {
    const idApoyoObrRedMitigGestRiesgDesast = this.apoyoObrRedMitigGestRiesgDesast?.idApoyoObrRedMitigGestRiesgDesast;
    if (!idApoyoObrRedMitigGestRiesgDesast) {
      this.registrosApoyo = [];
      this.buscar();
      return;
    }
    this.service.findAllProgressControlHistoriesOfWorks(undefined, undefined, 'idHistorialControlAvancObrRedMitigGestRiesgDesast', 'ASC').subscribe({
      next: registros => {
        this.registrosApoyo = registros.filter(registro => registro.apoyoObrRedMitigGestRiesgDesastDTO?.idApoyoObrRedMitigGestRiesgDesast === idApoyoObrRedMitigGestRiesgDesast);
        this.buscar();
      },
      error: err => console.error('ERROR AL CARGAR EL HISTORIAL DE CONTROLES DE AVANCES DE LA OBRA DEL APOYO: ', err)
    });
  }

  //APLICA LA PALABRA CLAVE (NÚMERO DE REGISTRO, NOMBRE U OBSERVACIONES) SOBRE EL HISTORIAL DEL APOYO Y RECORTA LA PÁGINA ACTUAL:
  listar(): void {
    const keyword = String(this.form.value.keyword || '').trim().toUpperCase();
    const filtrados = this.registrosApoyo.filter(registro =>
      !keyword || [
        registro.numRegHistorialControlAvancObrRedMitigGestRiesgDesast,
        registro.nombreHistorialControlAvancObrRedMitigGestRiesgDesast,
        registro.observacionesHistorialControlAvancObrRedMitigGestRiesgDesast
      ].some(valor => String(valor ?? '').toUpperCase().includes(keyword)));
    this.total = filtrados.length;
    this.registros = filtrados.slice(this.pagina * this.cantidad, (this.pagina + 1) * this.cantidad);
    this.cdr.markForCheck();
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: HistorialControlAvancObrRedMitigGestRiesgDesastI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: HistorialControlAvancObrRedMitigGestRiesgDesastI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  //MUESTRA UN PORCENTAJE ALMACENADO (EJ. "100") COMO "100 %", O "-" SI LA COLUMNA ESTÁ VACÍA:
  formatearPorcentaje(porcentaje: unknown): string {
    const texto = String(porcentaje ?? '').trim();
    if (!texto) return '-';
    return texto.endsWith('%') ? texto : `${texto} %`;
  }

  guardar(registro: HistorialControlAvancObrRedMitigGestRiesgDesastI): void {
    const modificar = !!registro.idHistorialControlAvancObrRedMitigGestRiesgDesast;
    (modificar ? this.service.updateProgressControlHistoryOfWork(registro) : this.service.addProgressControlHistoryOfWork(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Control de avance modificado correctamente.' : 'Control de avance agregado correctamente.', modificar ? 'Error al modificar el control de avance.' : 'Error al agregar el control de avance.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar el control de avance.' : 'Error al agregar el control de avance.'))
    });
  }

  eliminar(id: number): void {
    this.service.deleteProgressControlHistoryOfWork(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Control de avance eliminado correctamente.', 'Error al eliminar el control de avance.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el control de avance.')
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. NÚMERO DE REGISTRO REPETIDO); EN ESE CASO SE MUESTRA
  //EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuesta(respuesta: HistorialControlAvancObrRedMitigGestRiesgDesastMsj, mensajeExito: string, mensajeError: string): void {
    if (respuesta.banderaexito === false) {
      this.mostrarToast('error', respuesta.mensaje || mensajeError);
      return;
    }
    this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
    this.cerrar();
    this.cargarHistorialApoyo();
  }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTipo = tipo;
    this.toast = mensaje;
    this.cdr.markForCheck();
    this.toastTimer = setTimeout(() => {
      this.toast = '';
      this.cdr.markForCheck();
    }, 4000);
  }
}
