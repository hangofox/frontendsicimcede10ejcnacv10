import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialEquipTranspApoyAtencPrevEmergDesastI, HistorialEquipTranspApoyAtencPrevEmergDesastMsj } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-eq_tr-apoy-at-prev-em-des/historial-eq_tr-apoy-at-prev-em-des.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { EquiposIngenierosI } from '../../../../../../interfaces/equipos-ingenieros/equipos-ingenieros.interface';
import { HistorialEquipTranspApoyAtencPrevEmergDesastService } from '../../../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-eq_tr-apoy-at-prev-em-des/historial-eq_tr-apoy-at-prev-em-des.service';
import { EquiposIngenierosService } from '../../../../../../services/equipos-ingenieros/equipos-ingenieros.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelHistEqTrApoyAtPrevEmDesComponent } from '../add-upd-del-hist-eq_tr-apoy-at-prev-em-des/add-upd-del-hist-eq_tr-apoy-at-prev-em-des.component';
import { VistaHistEqTrApoyAtPrevEmDesComponent } from '../vista-hist-eq_tr-apoy-at-prev-em-des/vista-hist-eq_tr-apoy-at-prev-em-des.component';

@Component({
  selector: 'app-listado-hist-eq_tr-apoy-at-prev-em-des',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelHistEqTrApoyAtPrevEmDesComponent, VistaHistEqTrApoyAtPrevEmDesComponent],
  templateUrl: './listado-hist-eq_tr-apoy-at-prev-em-des.component.html',
  styleUrl: './listado-hist-eq_tr-apoy-at-prev-em-des.component.scss'
})
export class ListadoHistEqTrApoyAtPrevEmDesComponent implements OnChanges {
  //APOYO DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES DESDE EL QUE SE ABRE EL HISTORIAL (MODAL DEL LISTADO DE APOYOS); SOLO
  //SE LISTAN Y SE CREAN EQUIPOS DE TRANSPORTE DE ESTE APOYO:
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cboxNombreClasificacionEquipoIngenieroSeleccionado: [''], cantidad: ['10'] });

  //EL BACKEND (count, lista Y listaPag) NO RECIBE EL ID DEL APOYO, ASÍ QUE SE TRAE EL HISTORIAL COMPLETO UNA SOLA VEZ Y SE
  //QUEDAN AQUÍ SOLO LOS REGISTROS DEL APOYO; LA BÚSQUEDA, EL FILTRO POR CLASIFICACIÓN Y LA PAGINACIÓN SE HACEN SOBRE ESTA LISTA:
  registrosApoyo: HistorialEquipTranspApoyAtencPrevEmergDesastI[] = [];
  registros: HistorialEquipTranspApoyAtencPrevEmergDesastI[] = [];
  //CATÁLOGO DE EQUIPOS DE INGENIEROS PARA EL COMBO DEL FORMULARIO:
  equiposIngenieros: EquiposIngenierosI[] = [];
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialEquipTranspApoyAtencPrevEmergDesastI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: HistorialEquipTranspApoyAtencPrevEmergDesastService,
    private readonly equiposIngenierosService: EquiposIngenierosService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.cargarEquiposIngenieros();
  }

  //NOMBRES DE LAS CLASIFICACIONES DE LOS EQUIPOS QUE YA ESTÁN EN EL HISTORIAL DEL APOYO, PARA EL COMBO DE FILTRO:
  get clasificacionesFiltro(): string[] {
    return [...new Set(this.registrosApoyo.map(registro => String(registro.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? '')).filter(nombre => !!nombre))].sort();
  }

  //AL CAMBIAR EL APOYO SE LIMPIAN LOS FILTROS Y SE VUELVE A CARGAR SU HISTORIAL:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apoyoAtencPrevEmergDesast']) {
      this.form.patchValue({ keyword: '', cboxNombreClasificacionEquipoIngenieroSeleccionado: '' });
      this.cargarHistorialApoyo();
    }
  }

  //CARGA EL CATÁLOGO DE EQUIPOS DE INGENIEROS DESDE EL BACKEND (COMBO DEL FORMULARIO), ORDENADO POR DENOMINACIÓN:
  private cargarEquiposIngenieros(): void {
    this.equiposIngenierosService.findAllEngineerEquipments(undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'denominacionEquipoIngeniero', 'ASC').subscribe({
      next: equiposIngenieros => {
        this.equiposIngenieros = equiposIngenieros;
        this.cdr.markForCheck();
      },
      error: err => console.error('ERROR AL CARGAR EQUIPOS DE INGENIEROS: ', err)
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
    this.service.findAllTransportEquipmentHistoriesOfSupports(undefined, undefined, undefined, undefined, undefined, undefined, 'idHistorialEquipTranspApoyAtencPrevEmergDesast', 'ASC').subscribe({
      next: registros => {
        this.registrosApoyo = registros.filter(registro => registro.apoyoAtencPrevEmergDesastDTO?.idApoyoAtencPrevEmergDesast === idApoyoAtencPrevEmergDesast);
        this.buscar();
      },
      error: err => console.error('ERROR AL CARGAR EL HISTORIAL DE EQUIPOS DE TRANSPORTE DEL APOYO: ', err)
    });
  }

  //APLICA LA PALABRA CLAVE (NÚMERO DE REGISTRO, PLACA O DENOMINACIÓN DEL EQUIPO) Y LA CLASIFICACIÓN SOBRE EL HISTORIAL DEL APOYO
  //Y RECORTA LA PÁGINA ACTUAL:
  listar(): void {
    const keyword = String(this.form.value.keyword || '').trim().toUpperCase();
    const nombreClasificacion = String(this.form.value.cboxNombreClasificacionEquipoIngenieroSeleccionado || '');
    const filtrados = this.registrosApoyo.filter(registro => {
      const coincideKeyword = !keyword || [
        registro.numRegHistorialEquipTranspApoyAtencPrevEmergDesast,
        registro.numeroPlacaEquipoTransporte,
        registro.equipoIngenieroDTO?.denominacionEquipoIngeniero
      ].some(valor => String(valor ?? '').toUpperCase().includes(keyword));
      const coincideClasificacion = !nombreClasificacion || String(registro.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? '') === nombreClasificacion;
      return coincideKeyword && coincideClasificacion;
    });
    this.total = filtrados.length;
    this.registros = filtrados.slice(this.pagina * this.cantidad, (this.pagina + 1) * this.cantidad);
    this.cdr.markForCheck();
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: HistorialEquipTranspApoyAtencPrevEmergDesastI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: HistorialEquipTranspApoyAtencPrevEmergDesastI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: HistorialEquipTranspApoyAtencPrevEmergDesastI): void {
    const modificar = !!registro.idHistorialEquipTranspApoyAtencPrevEmergDesast;
    (modificar ? this.service.updateTransportEquipmentHistoryOfSupport(registro) : this.service.addTransportEquipmentHistoryOfSupport(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Equipo de transporte modificado correctamente.' : 'Equipo de transporte agregado correctamente.', modificar ? 'Error al modificar el equipo de transporte.' : 'Error al agregar el equipo de transporte.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar el equipo de transporte.' : 'Error al agregar el equipo de transporte.'))
    });
  }

  eliminar(id: number): void {
    this.service.deleteTransportEquipmentHistoryOfSupport(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Equipo de transporte eliminado correctamente.', 'Error al eliminar el equipo de transporte.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el equipo de transporte.')
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. NÚMERO DE REGISTRO REPETIDO); EN ESE CASO SE MUESTRA
  //EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuesta(respuesta: HistorialEquipTranspApoyAtencPrevEmergDesastMsj, mensajeExito: string, mensajeError: string): void {
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
