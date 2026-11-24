import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialEquipTranspApoyAtencPrevEmergDesastI, HistorialEquipTranspApoyAtencPrevEmergDesastMsj } from '../../../../../interfaces/dinco/equipos-transportes/historial-equip-transp-apoy-atenc-prev-emerg-desast/historial-equip-transp-apoy-atenc-prev-emerg-desast.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { EquiposIngenierosI } from '../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { ClasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface';
import { SubclasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface';
import { ElementosSubclasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface';
import { ClasificacionesEquiposIngenierosService } from '../../../../../services/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.service';
import { SubclasificacionesEquiposIngenierosService } from '../../../../../services/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.service';
import { ElementosSubclasificacionesEquiposIngenierosService } from '../../../../../services/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.service';
import { LineasEquiposIngenierosI } from '../../../../../interfaces/dinco/lineas-equipos-ingenieros/lineas-equipos-ingenieros.interface';
import { LineasEquiposIngenierosService } from '../../../../../services/dinco/lineas-equipos-ingenieros/lineas-equipos-ingenieros.service';
import { HistorialEquipTranspApoyAtencPrevEmergDesastService } from '../../../../../services/dinco/equipos-transportes/historial-equip-transp-apoy-atenc-prev-emerg-desast/historial-equip-transp-apoy-atenc-prev-emerg-desast.service';
import { ApoyosAtencPrevEmergDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.service';
import { EquiposIngenierosService } from '../../../../../services/dinco/equipos-ingenieros/equipos-ingenieros.service';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { CLASIFICACION_EQUIPOS_TRANSPORTES, SUBCLASIFICACION_EQUIPOS_TRANSPORTES, esEquipoTransporte } from '../../equipos-transportes.constantes';
import { AddUpdDelHistEqTrApoyAtencPrevComponent } from '../add-upd-del-hist-eq-tr-apoy-atenc-prev/add-upd-del-hist-eq-tr-apoy-atenc-prev.component';
import { VistaHistEqTrApoyAtencPrevComponent } from '../vista-hist-eq-tr-apoy-atenc-prev/vista-hist-eq-tr-apoy-atenc-prev.component';

//HISTORIAL DE EQUIPOS DE TRANSPORTE DE APOYOS DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES, VISTO DESDE DINCO: A DIFERENCIA DEL
//HISTORIAL DE DIGEI (MODAL DE UN SOLO APOYO), AQUÍ SE LISTAN LOS EQUIPOS DE TODOS LOS APOYOS Y EL APOYO SE ELIGE EN EL FORMULARIO.
@Component({
  selector: 'app-listado-hist-eq-tr-apoy-atenc-prev',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelHistEqTrApoyAtencPrevComponent, VistaHistEqTrApoyAtencPrevComponent],
  templateUrl: './listado-hist-eq-tr-apoy-atenc-prev.component.html',
  styleUrl: './listado-hist-eq-tr-apoy-atenc-prev.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoHistEqTrApoyAtencPrevComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  form = this.fb.group({
    keyword: [''],
    cboxIdApoyoSeleccionado: [''],
    //SOLO EQUIPOS DE TRANSPORTE: LA CLASIFICACIÓN Y LA SUBCLASIFICACIÓN QUEDAN SELECCIONADAS POR DEFECTO Y SUS COMBOS SOLO TIENEN ESA OPCIÓN:
    cboxNombreClasificacionEquipoIngenieroSeleccionado: [CLASIFICACION_EQUIPOS_TRANSPORTES],
    cboxNombreSubclasificacionEquipoIngenieroSeleccionado: [SUBCLASIFICACION_EQUIPOS_TRANSPORTES],
    cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: [''],
    cboxNombreLineaEquipoIngenieroSeleccionado: [''],
    cantidad: ['10']
  });
  //CATÁLOGOS DE LOS COMBOS EN CASCADA (MISMO ESQUEMA DE ListadoEquiposIngenierosComponent), RECORTADOS A EQUIPOS DE TRANSPORTE:
  clasificacionesEquiposIngenieros: ClasificacionesEquiposIngenierosI[] = [];
  private subclasificacionesEquiposIngenieros: SubclasificacionesEquiposIngenierosI[] = [];
  private elementosSubclasificacionesEquiposIngenieros: ElementosSubclasificacionesEquiposIngenierosI[] = [];
  private lineasEquiposIngenieros: LineasEquiposIngenierosI[] = [];

  //EL BACKEND SOLO BUSCA LA PALABRA CLAVE EN EL NÚMERO DE REGISTRO Y NO FILTRA POR APOYO, ASÍ QUE SE TRAE EL HISTORIAL COMPLETO UNA
  //VEZ Y LA BÚSQUEDA, LOS COMBOS Y LA PAGINACIÓN SE HACEN SOBRE ESTA LISTA (MISMO CRITERIO DEL HISTORIAL DE DIGEI):
  private historialCompleto: HistorialEquipTranspApoyAtencPrevEmergDesastI[] = [];
  registros: HistorialEquipTranspApoyAtencPrevEmergDesastI[] = [];
  //CATÁLOGOS PARA LOS COMBOS DEL FILTRO Y DEL FORMULARIO:
  apoyos: ApoyosAtencPrevEmergDesastI[] = [];
  equiposIngenieros: EquiposIngenierosI[] = [];
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  guardando = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialEquipTranspApoyAtencPrevEmergDesastI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly service: HistorialEquipTranspApoyAtencPrevEmergDesastService,
    private readonly apoyosService: ApoyosAtencPrevEmergDesastService,
    private readonly equiposIngenierosService: EquiposIngenierosService,
    private readonly clasificacionesEquiposIngenierosService: ClasificacionesEquiposIngenierosService,
    private readonly subclasificacionesEquiposIngenierosService: SubclasificacionesEquiposIngenierosService,
    private readonly elementosSubclasificacionesEquiposIngenierosService: ElementosSubclasificacionesEquiposIngenierosService,
    private readonly lineasEquiposIngenierosService: LineasEquiposIngenierosService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarHistorial();
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  //COMBOS EN CASCADA: LA SUBCLASIFICACIÓN DEPENDE DE LA CLASIFICACIÓN Y EL ELEMENTO DE LA SUBCLASIFICACIÓN:
  get subclasificacionesFiltro(): SubclasificacionesEquiposIngenierosI[] {
    const clasificacion = this.form.value.cboxNombreClasificacionEquipoIngenieroSeleccionado;
    if (!clasificacion) return this.subclasificacionesEquiposIngenieros;
    return this.subclasificacionesEquiposIngenieros.filter(item => item.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero === clasificacion);
  }

  //LÍNEAS QUE TIENEN LOS ELEMENTOS DEL COMBO DE ELEMENTOS (LA LÍNEA ES DEL ELEMENTO DE LA SUBCLASIFICACIÓN), EN EL ORDEN DEL CATÁLOGO:
  get lineasFiltro(): LineasEquiposIngenierosI[] {
    const nombres = new Set(this.elementosFiltro.map(elemento => String(elemento.lineaEquipoIngenieroDTO?.nombreLineaEquipoIngeniero ?? '')).filter(nombre => !!nombre));
    return this.lineasEquiposIngenieros.filter(linea => nombres.has(String(linea.nombreLineaEquipoIngeniero)));
  }

  get elementosFiltro(): ElementosSubclasificacionesEquiposIngenierosI[] {
    const { cboxNombreClasificacionEquipoIngenieroSeleccionado: clasificacion, cboxNombreSubclasificacionEquipoIngenieroSeleccionado: subclasificacion } = this.form.value;
    return this.elementosSubclasificacionesEquiposIngenieros.filter(item =>
      (!clasificacion || item.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero === clasificacion) &&
      (!subclasificacion || item.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero === subclasificacion));
  }

  //AL CAMBIAR LA CLASIFICACIÓN SE LIMPIA EL ELEMENTO (LA SUBCLASIFICACIÓN SE MANTIENE EN EQUIPO DE TRANSPORTE); AL CAMBIAR LA
  //SUBCLASIFICACIÓN, EL ELEMENTO:
  cambiarClasificacionFiltro(): void {
    this.form.patchValue({ cboxNombreSubclasificacionEquipoIngenieroSeleccionado: SUBCLASIFICACION_EQUIPOS_TRANSPORTES, cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: '', cboxNombreLineaEquipoIngenieroSeleccionado: '' });
    this.buscar();
  }

  cambiarSubclasificacionFiltro(): void {
    this.form.patchValue({ cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: '', cboxNombreLineaEquipoIngenieroSeleccionado: '' });
    this.buscar();
  }

  private cargarCatalogos(): void {
    this.apoyosService.findAllSupportsAttentionPreventionEmergenciesDisasters(undefined, undefined, undefined, undefined, 'idApoyoAtencPrevEmergDesast', 'DESC').subscribe({
      next: apoyos => { this.apoyos = apoyos ?? []; this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR LOS APOYOS DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS: ', err)
    });
    //EL COMBO DEL FORMULARIO SOLO OFRECE EQUIPOS DE TRANSPORTE (EL BACKEND FILTRA POR NOMBRE DE CLASIFICACIÓN Y SUBCLASIFICACIÓN):
    this.equiposIngenierosService.findAllEngineerEquipments(undefined, undefined, undefined, CLASIFICACION_EQUIPOS_TRANSPORTES, SUBCLASIFICACION_EQUIPOS_TRANSPORTES, undefined, undefined, 'denominacionEquipoIngeniero', 'ASC').subscribe({
      next: equipos => { this.equiposIngenieros = (equipos ?? []).filter(esEquipoTransporte); this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR EQUIPOS DE INGENIEROS: ', err)
    });
    this.clasificacionesEquiposIngenierosService.findAllEngineerEquipmentClassifications(undefined, undefined, 'nombreClasificacionEquipoIngeniero', 'ASC').subscribe({
      next: clasificaciones => { this.clasificacionesEquiposIngenieros = (clasificaciones ?? []).filter(item => item.nombreClasificacionEquipoIngeniero === CLASIFICACION_EQUIPOS_TRANSPORTES); this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR CLASIFICACIONES DE EQUIPOS DE INGENIEROS: ', err)
    });
    this.subclasificacionesEquiposIngenierosService.findAllEngineerEquipmentSubclassifications(undefined, undefined, undefined, undefined, 'nombreSubclasificacionEquipoIngeniero', 'ASC').subscribe({
      next: subclasificaciones => { this.subclasificacionesEquiposIngenieros = (subclasificaciones ?? []).filter(item => item.nombreSubclasificacionEquipoIngeniero === SUBCLASIFICACION_EQUIPOS_TRANSPORTES); this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR SUBCLASIFICACIONES DE EQUIPOS DE INGENIEROS: ', err)
    });
    this.elementosSubclasificacionesEquiposIngenierosService.findAllEngineerEquipmentSubclassificationElements(undefined, undefined, undefined, 'nombreElementoSubclasificacionEquipoIngeniero', 'ASC').subscribe({
      next: elementos => { this.elementosSubclasificacionesEquiposIngenieros = elementos ?? []; this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR ELEMENTOS DE SUBCLASIFICACIONES DE EQUIPOS DE INGENIEROS: ', err)
    });
    this.lineasEquiposIngenierosService.findAllEngineerEquipmentLines(undefined, undefined, 'nombreLineaEquipoIngeniero', 'ASC').subscribe({
      next: lineas => { this.lineasEquiposIngenieros = lineas ?? []; this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR LÍNEAS DE EQUIPOS DE INGENIEROS: ', err)
    });
  }

  private cargarHistorial(): void {
    this.service.findAllTransportEquipmentHistoriesOfSupports(undefined, undefined, CLASIFICACION_EQUIPOS_TRANSPORTES, SUBCLASIFICACION_EQUIPOS_TRANSPORTES, undefined, undefined, 'idHistorialEquipTranspApoyAtencPrevEmergDesast', 'DESC').subscribe({
      next: registros => {
        this.historialCompleto = registros ?? [];
        this.listar();
      },
      error: err => {
        console.error('ERROR AL CARGAR EL HISTORIAL DE EQUIPOS DE TRANSPORTE DE APOYOS DE ATENCIÓN Y PREVENCIÓN: ', err);
        this.mostrarToast('error', 'No se pudo cargar el historial de equipos de transporte.');
      }
    });
  }

  //PALABRA CLAVE (NÚMERO DE REGISTRO, PLACA, EQUIPO O RADICADO DEL APOYO), APOYO, CLASIFICACIÓN, SUBCLASIFICACIÓN, ELEMENTO Y LÍNEA; LUEGO
  //SE RECORTA LA PÁGINA:
  listar(): void {
    const keyword = String(this.form.value.keyword || '').trim().toUpperCase();
    const idApoyo = Number(this.form.value.cboxIdApoyoSeleccionado) || 0;
    const clasificacion = String(this.form.value.cboxNombreClasificacionEquipoIngenieroSeleccionado || CLASIFICACION_EQUIPOS_TRANSPORTES);
    const subclasificacion = String(this.form.value.cboxNombreSubclasificacionEquipoIngenieroSeleccionado || SUBCLASIFICACION_EQUIPOS_TRANSPORTES);
    const elemento = String(this.form.value.cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado || '');
    const linea = String(this.form.value.cboxNombreLineaEquipoIngenieroSeleccionado || '');
    const filtrados = this.historialCompleto.filter(registro => {
      const coincideKeyword = !keyword || [
        registro.numRegHistorialEquipTranspApoyAtencPrevEmergDesast,
        registro.numeroPlacaEquipoTransporte,
        registro.equipoIngenieroDTO?.denominacionEquipoIngeniero,
        registro.apoyoAtencPrevEmergDesastDTO?.codigoRadicadoApoyoAtencPrevEmergDesast
      ].some(valor => String(valor ?? '').toUpperCase().includes(keyword));
      const coincideApoyo = !idApoyo || registro.apoyoAtencPrevEmergDesastDTO?.idApoyoAtencPrevEmergDesast === idApoyo;
      const coincideClasificacion = !clasificacion || String(registro.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? '') === clasificacion;
      const coincideSubclasificacion = !subclasificacion || String(registro.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero ?? '') === subclasificacion;
      const coincideElemento = !elemento || String(registro.elementoSubclasificacionEquipoIngenieroDTO?.nombreElementoSubclasificacionEquipoIngeniero ?? '') === elemento;
      const coincideLinea = !linea || String(registro.elementoSubclasificacionEquipoIngenieroDTO?.lineaEquipoIngenieroDTO?.nombreLineaEquipoIngeniero ?? '') === linea;
      return coincideKeyword && coincideApoyo && coincideClasificacion && coincideSubclasificacion && coincideElemento && coincideLinea;
    });
    this.total = filtrados.length;
    if (this.pagina > 0 && this.pagina >= this.paginas()) this.pagina = this.paginas() - 1;
    this.registros = filtrados.slice(this.pagina * this.cantidad, (this.pagina + 1) * this.cantidad);
    this.cdr.markForCheck();
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: HistorialEquipTranspApoyAtencPrevEmergDesastI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: HistorialEquipTranspApoyAtencPrevEmergDesastI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { if (this.guardando) return; this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: HistorialEquipTranspApoyAtencPrevEmergDesastI): void {
    if (this.guardando) return;
    const modificar = !!registro.idHistorialEquipTranspApoyAtencPrevEmergDesast;
    const mensajeError = modificar ? 'Error al modificar el equipo de transporte del historial.' : 'Error al agregar el equipo de transporte al historial.';
    this.guardando = true;
    (modificar ? this.service.updateTransportEquipmentHistoryOfSupport(registro) : this.service.addTransportEquipmentHistoryOfSupport(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Equipo de transporte del historial modificado correctamente.' : 'Equipo de transporte agregado al historial correctamente.', mensajeError),
      error: err => { this.guardando = false; this.mostrarToast('error', err.error?.mensaje || mensajeError); }
    });
  }

  eliminar(id: number): void {
    if (this.guardando) return;
    this.guardando = true;
    this.service.deleteTransportEquipmentHistoryOfSupport(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Equipo de transporte eliminado del historial correctamente.', 'Error al eliminar el equipo de transporte del historial.'),
      error: err => { this.guardando = false; this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el equipo de transporte del historial.'); }
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA; EN ESE CASO SE MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuesta(respuesta: HistorialEquipTranspApoyAtencPrevEmergDesastMsj, mensajeExito: string, mensajeError: string): void {
    this.guardando = false;
    if (respuesta.banderaexito === false) {
      this.mostrarToast('error', respuesta.mensaje || mensajeError);
      return;
    }
    this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
    this.cerrar();
    this.cargarHistorial();
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
