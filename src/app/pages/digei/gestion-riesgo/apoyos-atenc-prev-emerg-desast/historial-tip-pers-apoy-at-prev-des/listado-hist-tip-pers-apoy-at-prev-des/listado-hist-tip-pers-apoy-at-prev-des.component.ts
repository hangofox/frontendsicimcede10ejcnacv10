import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialTipoPersonalApoyAtencPrevEmergDesastI, HistorialTipoPersonalApoyAtencPrevEmergDesastMsj } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-tip-pers-apoy-atenc-prev-des/historial-tip-pers-apoy-atenc-prev-des.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { TiposPersonalApoyosI } from '../../../../../../interfaces/digei/gestion-riesgo/tipos-personal-apoyos/tipos-personal-apoyos.interface';
import { HistorialTipoPersonalApoyAtencPrevEmergDesastService } from '../../../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-tip-pers-apoy-atenc-prev-des/historial-tip-pers-apoy-atenc-prev-des.service';
import { TiposPersonalApoyosService } from '../../../../../../services/digei/gestion-riesgo/tipos-personal-apoyos/tipos-personal-apoyos.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelHistTipPersApoyAtencPrevDesComponent } from '../add-upd-del-hist-tip-pers-apoy-at-prev-des/add-upd-del-hist-tip-pers-apoy-at-prev-des.component';
import { VistaHistTipPersApoyAtencPrevDesComponent } from '../vista-hist-tip-pers-apoy-at-prev-des/vista-hist-tip-pers-apoy-at-prev-des.component';

@Component({
  selector: 'app-listado-hist-tip-pers-apoy-atenc-prev-des',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelHistTipPersApoyAtencPrevDesComponent, VistaHistTipPersApoyAtencPrevDesComponent],
  templateUrl: './listado-hist-tip-pers-apoy-at-prev-des.component.html',
  styleUrl: './listado-hist-tip-pers-apoy-at-prev-des.component.scss'
})
export class ListadoHistTipPersApoyAtencPrevDesComponent implements OnChanges {
  //APOYO DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES DESDE EL QUE SE ABRE EL HISTORIAL (MODAL DEL LISTADO DE APOYOS); SOLO
  //SE LISTAN Y SE CREAN TIPOS DE PERSONAL DE ESTE APOYO:
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cboxNombreTipoPersonalApoyoSeleccionado: [''], cantidad: ['10'] });

  //EL BACKEND (count, lista Y listaPag) NO RECIBE EL ID DEL APOYO, ASÍ QUE SE TRAE EL HISTORIAL COMPLETO UNA SOLA VEZ Y SE
  //QUEDAN AQUÍ SOLO LOS REGISTROS DEL APOYO; LA BÚSQUEDA, EL FILTRO POR TIPO DE PERSONAL Y LA PAGINACIÓN SE HACEN SOBRE ESTA
  //LISTA — MISMO PATRÓN QUE ListadoHistEqTrApoyAtPrevEmDesComponent:
  registrosApoyo: HistorialTipoPersonalApoyAtencPrevEmergDesastI[] = [];
  registros: HistorialTipoPersonalApoyAtencPrevEmergDesastI[] = [];
  //CATÁLOGO DE TIPOS DE PERSONAL DE APOYOS PARA EL COMBO DEL FORMULARIO:
  tiposPersonalApoyos: TiposPersonalApoyosI[] = [];
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialTipoPersonalApoyAtencPrevEmergDesastI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: HistorialTipoPersonalApoyAtencPrevEmergDesastService,
    private readonly tiposPersonalApoyosService: TiposPersonalApoyosService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.cargarTiposPersonalApoyos();
  }

  //NOMBRES DE LOS TIPOS DE PERSONAL QUE YA ESTÁN EN EL HISTORIAL DEL APOYO, PARA EL COMBO DE FILTRO:
  get tiposPersonalFiltro(): string[] {
    return [...new Set(this.registrosApoyo.map(registro => String(registro.tipoPersonalApoyoDTO?.nombreTipoPersonalApoyo ?? '')).filter(nombre => !!nombre))].sort();
  }

  //TOTALES DEL HISTORIAL DEL APOYO (TODOS LOS REGISTROS, SIN FILTROS) PARA EL PIE DE LA TABLA:
  get totalPersonalApoyo(): number {
    return this.registrosApoyo.reduce((suma, registro) => suma + Number(registro.cantidadPersonalApoyo ?? 0), 0);
  }

  //AL CAMBIAR EL APOYO SE LIMPIAN LOS FILTROS Y SE VUELVE A CARGAR SU HISTORIAL:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apoyoAtencPrevEmergDesast']) {
      this.form.patchValue({ keyword: '', cboxNombreTipoPersonalApoyoSeleccionado: '' });
      this.cargarHistorialApoyo();
    }
  }

  //CARGA EL CATÁLOGO DE TIPOS DE PERSONAL DE APOYOS DESDE EL BACKEND (COMBO DEL FORMULARIO), ORDENADO POR NOMBRE:
  private cargarTiposPersonalApoyos(): void {
    this.tiposPersonalApoyosService.findAllTypesOfSupportStaff(undefined, undefined, 'nombreTipoPersonalApoyo', 'ASC').subscribe({
      next: tiposPersonalApoyos => {
        this.tiposPersonalApoyos = tiposPersonalApoyos;
        this.cdr.markForCheck();
      },
      error: err => console.error('ERROR AL CARGAR TIPOS DE PERSONAL DE APOYOS: ', err)
    });
  }

  //TRAE EL HISTORIAL COMPLETO, DEJA SOLO LOS REGISTROS DEL APOYO Y VUELVE A LA PRIMERA PÁGINA:
  private cargarHistorialApoyo(): void {
    const idApoyoAtencPrevEmergDesast = this.apoyoAtencPrevEmergDesast?.idApoyoAtencPrevEmergDesast;
    if (!idApoyoAtencPrevEmergDesast) {
      this.registrosApoyo = [];
      this.buscar();
      return;
    }
    this.service.findAllSupportStaffTypeHistories(undefined, undefined, 'idHistorialTipoPersonalApoyAtencPrevEmergDesast', 'ASC').subscribe({
      next: registros => {
        this.registrosApoyo = registros.filter(registro => registro.apoyoAtencPrevEmergDesastDTO?.idApoyoAtencPrevEmergDesast === idApoyoAtencPrevEmergDesast);
        this.buscar();
      },
      error: err => console.error('ERROR AL CARGAR EL HISTORIAL DE TIPOS DE PERSONAL DEL APOYO: ', err)
    });
  }

  //APLICA LA PALABRA CLAVE (NÚMERO DE REGISTRO O TIPO DE PERSONAL) Y EL TIPO DE PERSONAL ELEGIDO SOBRE EL HISTORIAL DEL APOYO Y
  //RECORTA LA PÁGINA ACTUAL:
  listar(): void {
    const keyword = String(this.form.value.keyword || '').trim().toUpperCase();
    const tipoPersonal = String(this.form.value.cboxNombreTipoPersonalApoyoSeleccionado || '');
    const filtrados = this.registrosApoyo.filter(registro =>
      (!tipoPersonal || String(registro.tipoPersonalApoyoDTO?.nombreTipoPersonalApoyo ?? '') === tipoPersonal) &&
      (!keyword || [
        registro.numRegHistorialTipoPersonalApoyAtencPrevEmergDesast,
        registro.tipoPersonalApoyoDTO?.nombreTipoPersonalApoyo
      ].some(valor => String(valor ?? '').toUpperCase().includes(keyword))));
    this.total = filtrados.length;
    this.registros = filtrados.slice(this.pagina * this.cantidad, (this.pagina + 1) * this.cantidad);
    this.cdr.markForCheck();
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: HistorialTipoPersonalApoyAtencPrevEmergDesastI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: HistorialTipoPersonalApoyAtencPrevEmergDesastI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: HistorialTipoPersonalApoyAtencPrevEmergDesastI): void {
    const modificar = !!registro.idHistorialTipoPersonalApoyAtencPrevEmergDesast;
    (modificar ? this.service.updateSupportStaffTypeHistory(registro) : this.service.addSupportStaffTypeHistory(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Tipo de personal modificado correctamente.' : 'Tipo de personal agregado correctamente.', modificar ? 'Error al modificar el tipo de personal.' : 'Error al agregar el tipo de personal.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar el tipo de personal.' : 'Error al agregar el tipo de personal.'))
    });
  }

  eliminar(id: number): void {
    this.service.deleteSupportStaffTypeHistory(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Tipo de personal eliminado correctamente.', 'Error al eliminar el tipo de personal.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el tipo de personal.')
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. NÚMERO DE REGISTRO REPETIDO); EN ESE CASO SE MUESTRA
  //EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuesta(respuesta: HistorialTipoPersonalApoyAtencPrevEmergDesastMsj, mensajeExito: string, mensajeError: string): void {
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
