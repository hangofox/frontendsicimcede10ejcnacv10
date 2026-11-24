import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProyeccionesTecnicomecanicasEquipTranspI, ProyeccionesTecnicomecanicasEquipTranspMsj } from '../../../../../interfaces/dinco/equipos-transportes/proyecciones-tecnicomecanicas-equip-transp/proyecciones-tecnicomecanicas-equip-transp.interface';
import { EquiposIngenierosI } from '../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { ClasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface';
import { SubclasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface';
import { ElementosSubclasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface';
import { ProyeccionesTecnicomecanicasEquipTranspService } from '../../../../../services/dinco/equipos-transportes/proyecciones-tecnicomecanicas-equip-transp/proyecciones-tecnicomecanicas-equip-transp.service';
import { EquiposIngenierosService } from '../../../../../services/dinco/equipos-ingenieros/equipos-ingenieros.service';
import { ClasificacionesEquiposIngenierosService } from '../../../../../services/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.service';
import { SubclasificacionesEquiposIngenierosService } from '../../../../../services/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.service';
import { ElementosSubclasificacionesEquiposIngenierosService } from '../../../../../services/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.service';
import { LineasEquiposIngenierosI } from '../../../../../interfaces/dinco/lineas-equipos-ingenieros/lineas-equipos-ingenieros.interface';
import { LineasEquiposIngenierosService } from '../../../../../services/dinco/lineas-equipos-ingenieros/lineas-equipos-ingenieros.service';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { CLASIFICACION_EQUIPOS_TRANSPORTES, SUBCLASIFICACION_EQUIPOS_TRANSPORTES, esEquipoTransporte } from '../../equipos-transportes.constantes';
import { AddUpdDelProyTecnicomecEquipTranspComponent, anioProyeccion, formatearFechaProyeccion, formatearValorProyeccion } from '../add-upd-del-proy-tecnicomec-equip-transp/add-upd-del-proy-tecnicomec-equip-transp.component';
import { VistaProyTecnicomecEquipTranspComponent } from '../vista-proy-tecnicomec-equip-transp/vista-proy-tecnicomec-equip-transp.component';

//PROYECCIONES DE TÉCNICO-MECÁNICAS DE EQUIPOS DE TRANSPORTE (TABLA_PROYECCIONES_TECNICOMECANICAS_EQUIP_TRANSP). LA PALABRA CLAVE DEL
//BACKEND SOLO BUSCA EN EL RUBRO, ASÍ QUE SE TRAE LA LISTA COMPLETA UNA VEZ Y LA BÚSQUEDA (RUBRO, EQUIPO, INVENTARIO O PLACA), LOS
//COMBOS Y LA PAGINACIÓN SE HACEN AQUÍ, IGUAL QUE EN LOS HISTORIALES DE EQUIPOS DE TRANSPORTE:
@Component({
  selector: 'app-listado-proy-tecnicomec-equip-transp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelProyTecnicomecEquipTranspComponent, VistaProyTecnicomecEquipTranspComponent],
  templateUrl: './listado-proy-tecnicomec-equip-transp.component.html',
  styleUrl: './listado-proy-tecnicomec-equip-transp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoProyTecnicomecEquipTranspComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  form = this.fb.group({
    keyword: [''],
    //SOLO EQUIPOS DE TRANSPORTE: LA CLASIFICACIÓN Y LA SUBCLASIFICACIÓN QUEDAN SELECCIONADAS POR DEFECTO Y SUS COMBOS SOLO TIENEN ESA OPCIÓN:
    cboxNombreClasificacionEquipoIngenieroSeleccionado: [CLASIFICACION_EQUIPOS_TRANSPORTES],
    cboxNombreSubclasificacionEquipoIngenieroSeleccionado: [SUBCLASIFICACION_EQUIPOS_TRANSPORTES],
    cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: [''],
    cboxNombreLineaEquipoIngenieroSeleccionado: [''],
    cboxIdEquipoSeleccionado: [''],
    cboxAnioSeleccionado: [''],
    cantidad: ['10']
  });

  private proyeccionesCompletas: ProyeccionesTecnicomecanicasEquipTranspI[] = [];
  registros: ProyeccionesTecnicomecanicasEquipTranspI[] = [];
  equiposIngenieros: EquiposIngenierosI[] = [];
  //CATÁLOGOS DE LOS COMBOS EN CASCADA (MISMO ESQUEMA DE ListadoEquiposIngenierosComponent), RECORTADOS A EQUIPOS DE TRANSPORTE:
  clasificacionesEquiposIngenieros: ClasificacionesEquiposIngenierosI[] = [];
  private subclasificacionesEquiposIngenieros: SubclasificacionesEquiposIngenierosI[] = [];
  private elementosSubclasificacionesEquiposIngenieros: ElementosSubclasificacionesEquiposIngenierosI[] = [];
  private lineasEquiposIngenieros: LineasEquiposIngenierosI[] = [];
  total = 0;
  //SUMA DEL VALOR SOLICITADO DE LAS PROYECCIONES FILTRADAS:
  valorTotalFiltrado = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  guardando = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: ProyeccionesTecnicomecanicasEquipTranspI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  readonly formatearFecha = formatearFechaProyeccion;
  readonly formatearValor = formatearValorProyeccion;

  constructor(
    private readonly service: ProyeccionesTecnicomecanicasEquipTranspService,
    private readonly equiposIngenierosService: EquiposIngenierosService,
    private readonly clasificacionesEquiposIngenierosService: ClasificacionesEquiposIngenierosService,
    private readonly subclasificacionesEquiposIngenierosService: SubclasificacionesEquiposIngenierosService,
    private readonly elementosSubclasificacionesEquiposIngenierosService: ElementosSubclasificacionesEquiposIngenierosService,
    private readonly lineasEquiposIngenierosService: LineasEquiposIngenierosService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
    this.cargarProyecciones();
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

  //AL CAMBIAR LA CLASIFICACIÓN SE LIMPIAN SUBCLASIFICACIÓN, ELEMENTO Y EQUIPO; AL CAMBIAR LA SUBCLASIFICACIÓN, ELEMENTO Y EQUIPO; AL
  //CAMBIAR EL ELEMENTO, EL EQUIPO (EL COMBO DE EQUIPOS SOLO MUESTRA LOS QUE CUMPLEN LOS TRES):
  cambiarClasificacionFiltro(): void {
    this.form.patchValue({ cboxNombreSubclasificacionEquipoIngenieroSeleccionado: SUBCLASIFICACION_EQUIPOS_TRANSPORTES, cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: '', cboxNombreLineaEquipoIngenieroSeleccionado: '', cboxIdEquipoSeleccionado: '' });
    this.buscar();
  }

  cambiarSubclasificacionFiltro(): void {
    this.form.patchValue({ cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: '', cboxNombreLineaEquipoIngenieroSeleccionado: '', cboxIdEquipoSeleccionado: '' });
    this.buscar();
  }

  cambiarElementoFiltro(): void {
    this.form.patchValue({ cboxIdEquipoSeleccionado: '' });
    this.buscar();
  }

  //VERDADERO SI EL EQUIPO CUMPLE LA CLASIFICACIÓN, SUBCLASIFICACIÓN, ELEMENTO Y LÍNEA ELEGIDOS EN LOS COMBOS:
  private cumpleClasificacion(equipo: EquiposIngenierosI | null | undefined): boolean {
    const { cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: elemento, cboxNombreLineaEquipoIngenieroSeleccionado: linea } = this.form.value;
    //SIEMPRE SE EXIGE LA CLASIFICACIÓN Y SUBCLASIFICACIÓN DE LOS EQUIPOS DE TRANSPORTE:
    const clasificacion = this.form.value.cboxNombreClasificacionEquipoIngenieroSeleccionado || CLASIFICACION_EQUIPOS_TRANSPORTES;
    const subclasificacion = this.form.value.cboxNombreSubclasificacionEquipoIngenieroSeleccionado || SUBCLASIFICACION_EQUIPOS_TRANSPORTES;
    return (!clasificacion || String(equipo?.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? '') === clasificacion) &&
      (!subclasificacion || String(equipo?.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero ?? '') === subclasificacion) &&
      (!elemento || String(equipo?.elementoSubclasificacionEquipoIngenieroDTO?.nombreElementoSubclasificacionEquipoIngeniero ?? '') === elemento) &&
      (!linea || String(equipo?.elementoSubclasificacionEquipoIngenieroDTO?.lineaEquipoIngenieroDTO?.nombreLineaEquipoIngeniero ?? '') === linea);
  }

  //EQUIPOS QUE YA TIENEN PROYECCIONES (Y CUMPLEN LOS COMBOS DE CLASIFICACIÓN), PARA EL COMBO DE FILTRO:
  get equiposFiltro(): { id: number; nombre: string }[] {
    const equipos = new Map<number, string>();
    this.proyeccionesCompletas.forEach(proyeccion => {
      const equipo = proyeccion.equipoIngenieroDTO;
      if (equipo?.idEquipoIngeniero && this.cumpleClasificacion(equipo)) equipos.set(Number(equipo.idEquipoIngeniero), `${equipo.denominacionEquipoIngeniero}${equipo.numeroInventarioEquipoIngeniero ? ' (' + equipo.numeroInventarioEquipoIngeniero + ')' : ''}`);
    });
    return [...equipos.entries()].map(([id, nombre]) => ({ id, nombre })).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  //AÑOS DE LAS PROYECCIONES (MÁS RECIENTE PRIMERO), PARA EL COMBO DE FILTRO:
  get aniosFiltro(): string[] {
    return [...new Set(this.proyeccionesCompletas.map(proyeccion => anioProyeccion(proyeccion.fechaHMSProyeccionTecnicomecanicaEquipTransp)).filter(anio => !!anio))].sort().reverse();
  }

  private cargarProyecciones(): void {
    this.service.findAllTechnicalMechanicalProjectionsOfTransportEquipment(undefined, undefined, undefined, undefined, undefined, 'fechaHMSProyeccionTecnicomecanicaEquipTransp', 'DESC').subscribe({
      next: proyecciones => {
        this.proyeccionesCompletas = proyecciones ?? [];
        this.listar();
      },
      error: err => {
        console.error('ERROR AL CARGAR LAS PROYECCIONES DE TÉCNICO-MECÁNICAS DE EQUIPOS DE TRANSPORTE: ', err);
        this.mostrarToast('error', 'No se pudieron cargar las proyecciones de técnico-mecánicas.');
      }
    });
  }

  listar(): void {
    const keyword = String(this.form.value.keyword || '').trim().toUpperCase();
    const idEquipo = Number(this.form.value.cboxIdEquipoSeleccionado) || 0;
    const anio = String(this.form.value.cboxAnioSeleccionado || '');
    const filtrados = this.proyeccionesCompletas.filter(proyeccion => {
      const equipo = proyeccion.equipoIngenieroDTO;
      const coincideKeyword = !keyword || [
        proyeccion.nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp,
        equipo?.denominacionEquipoIngeniero,
        equipo?.numeroInventarioEquipoIngeniero,
        equipo?.numeroPlacaEquipoIngeniero
      ].some(valor => String(valor ?? '').toUpperCase().includes(keyword));
      const coincideEquipo = !idEquipo || Number(equipo?.idEquipoIngeniero) === idEquipo;
      const coincideAnio = !anio || anioProyeccion(proyeccion.fechaHMSProyeccionTecnicomecanicaEquipTransp) === anio;
      return coincideKeyword && this.cumpleClasificacion(equipo) && coincideEquipo && coincideAnio;
    });
    this.total = filtrados.length;
    this.valorTotalFiltrado = filtrados.reduce((suma, proyeccion) => suma + (Number(String(proyeccion.valorSolicitadoProyeccionTecnicomecanicaEquipTransp ?? '').replace(/,/g, '')) || 0), 0);
    if (this.pagina > 0 && this.pagina >= this.paginas()) this.pagina = this.paginas() - 1;
    this.registros = filtrados.slice(this.pagina * this.cantidad, (this.pagina + 1) * this.cantidad);
    this.cdr.markForCheck();
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: ProyeccionesTecnicomecanicasEquipTranspI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: ProyeccionesTecnicomecanicasEquipTranspI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { if (this.guardando) return; this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: ProyeccionesTecnicomecanicasEquipTranspI): void {
    if (this.guardando) return;
    const modificar = !!registro.idProyeccionTecnicomecanicaEquipTransp;
    const mensajeError = modificar ? 'Error al modificar la proyección de técnico-mecánica.' : 'Error al crear la proyección de técnico-mecánica.';
    this.guardando = true;
    (modificar ? this.service.updateTechnicalMechanicalProjectionOfTransportEquipment(registro) : this.service.addTechnicalMechanicalProjectionOfTransportEquipment(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Proyección de técnico-mecánica modificada correctamente.' : 'Proyección de técnico-mecánica creada correctamente.', mensajeError),
      error: err => { this.guardando = false; this.mostrarToast('error', err.error?.mensaje || mensajeError); }
    });
  }

  eliminar(id: number): void {
    if (this.guardando) return;
    this.guardando = true;
    this.service.deleteTechnicalMechanicalProjectionOfTransportEquipment(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Proyección de técnico-mecánica eliminada correctamente.', 'Error al eliminar la proyección de técnico-mecánica.'),
      error: err => { this.guardando = false; this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la proyección de técnico-mecánica.'); }
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. EL MISMO RUBRO YA EXISTE PARA EL EQUIPO); EN ESE CASO SE
  //MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuesta(respuesta: ProyeccionesTecnicomecanicasEquipTranspMsj, mensajeExito: string, mensajeError: string): void {
    this.guardando = false;
    if (respuesta.banderaexito === false) {
      this.mostrarToast('error', respuesta.mensaje || mensajeError);
      return;
    }
    this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
    this.cerrar();
    this.cargarProyecciones();
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
