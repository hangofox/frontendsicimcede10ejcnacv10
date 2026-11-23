import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EquiposIngenierosI } from '../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { SociedadesUnidadesCentralizadorasI } from '../../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';
import { ClasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface';
import { SubclasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface';
import { ElementosSubclasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface';
import { TiposAltasEquiposIngenierosI } from '../../../../../interfaces/dinco/tipos-altas-equipos-ingenieros/tipos-altas-equipos-ingenieros.interface';

import { EquiposIngenierosService } from '../../../../../services/dinco/equipos-ingenieros/equipos-ingenieros.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SociedadesUnidadesCentralizadorasService } from '../../../../../services/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.service';
import { ClasificacionesEquiposIngenierosService } from '../../../../../services/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.service';
import { SubclasificacionesEquiposIngenierosService } from '../../../../../services/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.service';
import { ElementosSubclasificacionesEquiposIngenierosService } from '../../../../../services/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.service';
import { TiposAltasEquiposIngenierosService } from '../../../../../services/dinco/tipos-altas-equipos-ingenieros/tipos-altas-equipos-ingenieros.service';
import { HistorialDiagnInicSeleccEquipIngService } from '../../../../../services/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/historial-diagn-inic-selecc-equip-ing.service';
import { HistorialDemerDesgastEquipIngService } from '../../../../../services/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/historial-demer-desgast-equip-ing.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';

import { AddUpdDelEquipoIngenieroComponent, ESTADOS_USO_EQUIPOS_INGENIEROS } from '../add-upd-del-equipo-ingeniero/add-upd-del-equipo-ingeniero.component';
import { VistaEquipoIngenieroComponent } from '../vista-equipo-ingeniero/vista-equipo-ingeniero.component';
import { ListadoHistDiagnInicSeleccEquipIngComponent } from '../historial-diagn-inic-selecc-equip-ing/listado-hist-diagn-inic-selecc-equip-ing/listado-hist-diagn-inic-selecc-equip-ing.component';
import { ListadoHistDemerDesgastEquipIngComponent } from '../historial-demer-desgast-equip-ing/listado-hist-demer-desgast-equip-ing/listado-hist-demer-desgast-equip-ing.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

//TONO DE CADA ESTADO DE USO EN EL SEMÁFORO Y EN EL BADGE DE LA TABLA (MISMO ORDEN DE ESTADOS_USO_EQUIPOS_INGENIEROS,
//QUE SON LOS ESTADOS DE TABLA_EQUIPOS_INGENIEROS EN EL COMPLEMENTO DE TABLAS DE DINCO):
const TONOS_ESTADOS_USO_EQUIPOS_INGENIEROS: Record<string, string> = {
  'MÁQUINA TOTALMENTE LISTA': 'bueno',
  'MÁQUINA PARCIALMENTE LISTA': 'regular',
  'MÁQUINA MANTENIMIENTO PROGRAMADO': 'mantenimiento',
  'MÁQUINA MANTENIMIENTO IMPREVISTO': 'malo',
  'MÁQUINA FUERA DE SERVICIO': 'fuera-servicio',
  'MÁQUINA EN TRASLADO DE UNIDAD': 'verificacion',
  'MÁQUINA ESPERA INFORMATIVO': 'validacion',
  'MÁQUINA EN RECESO': 'asignacion',
  'MÁQUINA EN PROCESO DE BAJA': 'rechazado',
  'MÁQUINA DADA DE BAJA': 'baja',
  'MÁQUINA EN MUSEO': 'patrimonial'
};

@Component({
  selector: 'app-listado-equipos-ingenieros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelEquipoIngenieroComponent, VistaEquipoIngenieroComponent, ListadoHistDiagnInicSeleccEquipIngComponent, ListadoHistDemerDesgastEquipIngComponent, SemaforoContadoresComponent],
  templateUrl: './listado-equipos-ingenieros.component.html',
  styleUrl: './listado-equipos-ingenieros.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoEquiposIngenierosComponent implements OnInit, OnDestroy {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBOS DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  sociedadesUnidadesCentralizadoras: SociedadesUnidadesCentralizadorasI[] = [];
  clasificacionesEquiposIngenieros: ClasificacionesEquiposIngenierosI[] = [];
  subclasificacionesEquiposIngenieros: SubclasificacionesEquiposIngenierosI[] = [];
  elementosSubclasificacionesEquiposIngenieros: ElementosSubclasificacionesEquiposIngenierosI[] = [];
  tiposAltasEquiposIngenieros: TiposAltasEquiposIngenierosI[] = [];

  //PÁGINA ACTUAL DE EQUIPOS (EL BACKEND FILTRA POR PALABRA CLAVE Y COMBOS; LA PÁGINA SE RECORTA EN EL CLIENTE PARA PODER
  //CONTAR CADA ESTADO DEL SEMÁFORO SOBRE EL MISMO RESULTADO — MISMO PATRÓN QUE ListadoCaninosComponent):
  equiposIngenieros: EquiposIngenierosI[] = [];
  totalRegistros = 0;
  readonly estados = ESTADOS_USO_EQUIPOS_INGENIEROS.map(etiqueta => ({ etiqueta, tono: TONOS_ESTADOS_USO_EQUIPOS_INGENIEROS[etiqueta] ?? 'neutral' }));
  estadosContadores = this.estados.map(estado => ({ ...estado, valor: 0 }));

  //CANTIDAD DE DIAGNÓSTICOS INICIALES DE SELECCIÓN DE MANTENIMIENTOS DE CADA EQUIPO (POR ID); null MIENTRAS SE CUENTAN:
  cantidadDiagnosticosPorEquipo: Map<number, number> | null = null;
  //CANTIDAD DE DEMÉRITOS Y DESGASTES DE CADA EQUIPO (POR ID); null MIENTRAS SE CUENTAN:
  cantidadDemeritosPorEquipo: Map<number, number> | null = null;

  equiposIngenierosForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalHistorialDiagnosticosVisible = false;
  modalHistorialDemeritosVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  equipoIngenieroSeleccionado: EquiposIngenierosI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private equiposIngenierosService: EquiposIngenierosService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private sociedadesUnidadesCentralizadorasService: SociedadesUnidadesCentralizadorasService,
    private clasificacionesEquiposIngenierosService: ClasificacionesEquiposIngenierosService,
    private subclasificacionesEquiposIngenierosService: SubclasificacionesEquiposIngenierosService,
    private elementosSubclasificacionesEquiposIngenierosService: ElementosSubclasificacionesEquiposIngenierosService,
    private tiposAltasEquiposIngenierosService: TiposAltasEquiposIngenierosService,
    private spinnerService: SpinnerService,
    private historialDiagnInicSeleccEquipIngService: HistorialDiagnInicSeleccEquipIngService,
    private historialDemerDesgastEquipIngService: HistorialDemerDesgastEquipIngService
  ) {
    this.equiposIngenierosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxNombreClasificacionEquipoIngenieroSeleccionado: new FormControl(''),
      cboxNombreSubclasificacionEquipoIngenieroSeleccionado: new FormControl(''),
      cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: new FormControl(''),
      cboxEstadoUsoEquipoIngenieroSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarSociedadesUnidadesCentralizadoras();
    this.cargarClasificacionesEquiposIngenieros();
    this.cargarSubclasificacionesEquiposIngenieros();
    this.cargarElementosSubclasificacionesEquiposIngenieros();
    this.cargarTiposAltasEquiposIngenieros();
    this.cargarCantidadDiagnosticos();
    this.cargarCantidadDemeritos();
    this.accionListar();
  }

  //CARGA EL HISTORIAL COMPLETO DE DEMÉRITOS Y DESGASTES Y CUENTA LOS DE CADA EQUIPO (MISMO PATRÓN QUE cargarCantidadDiagnosticos):
  private cargarCantidadDemeritos(): void {
    this.cantidadDemeritosPorEquipo = null;
    this.historialDemerDesgastEquipIngService.findAllEngineerEquipmentDemeritAndWearHistories().subscribe({
      next: registros => {
        const cantidades = new Map<number, number>();
        (registros ?? []).forEach(registro => {
          const idEquipoIngeniero = registro.equipoIngenieroDTO?.idEquipoIngeniero;
          if (idEquipoIngeniero !== undefined) cantidades.set(idEquipoIngeniero, (cantidades.get(idEquipoIngeniero) ?? 0) + 1);
        });
        this.cantidadDemeritosPorEquipo = cantidades;
        this.changeDetectorRef.markForCheck();
      },
      error: err => {
        console.error('ERROR AL CONTAR LOS DEMÉRITOS Y DESGASTES DE LOS EQUIPOS DE INGENIEROS: ', err);
        //SI FALLA EL CONTEO NO SE DEJA LA COLUMNA EN "..." INDEFINIDAMENTE:
        this.cantidadDemeritosPorEquipo = new Map<number, number>();
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  //CANTIDAD DE DEMÉRITOS Y DESGASTES DEL EQUIPO: null MIENTRAS SE CUENTAN ("..."), 0 SI NO TIENE ("NO"):
  cantidadDemeritos(equipoIngeniero: EquiposIngenierosI): number | null {
    if (!this.cantidadDemeritosPorEquipo) return null;
    return this.cantidadDemeritosPorEquipo.get(equipoIngeniero.idEquipoIngeniero ?? -1) ?? 0;
  }

  //CARGA EL HISTORIAL COMPLETO DE DIAGNÓSTICOS INICIALES Y CUENTA LOS DE CADA EQUIPO (EL BACKEND NO FILTRA POR EQUIPO, ASÍ QUE SE
  //TRAE UNA SOLA VEZ Y SE INDEXA EN MEMORIA PARA NO CONSULTAR UNA VEZ POR FILA — MISMO PATRÓN QUE ListadoMunicionesEspecialesComponent):
  private cargarCantidadDiagnosticos(): void {
    this.cantidadDiagnosticosPorEquipo = null;
    this.historialDiagnInicSeleccEquipIngService.findAllEngineerEquipmentInitialDiagnosisHistories().subscribe({
      next: registros => {
        const cantidades = new Map<number, number>();
        (registros ?? []).forEach(registro => {
          const idEquipoIngeniero = registro.equipoIngenieroDTO?.idEquipoIngeniero;
          if (idEquipoIngeniero !== undefined) cantidades.set(idEquipoIngeniero, (cantidades.get(idEquipoIngeniero) ?? 0) + 1);
        });
        this.cantidadDiagnosticosPorEquipo = cantidades;
        this.changeDetectorRef.markForCheck();
      },
      error: err => {
        console.error('ERROR AL CONTAR LOS DIAGNÓSTICOS INICIALES DE LOS EQUIPOS DE INGENIEROS: ', err);
        //SI FALLA EL CONTEO NO SE DEJA LA COLUMNA EN "..." INDEFINIDAMENTE:
        this.cantidadDiagnosticosPorEquipo = new Map<number, number>();
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  //CANTIDAD DE DIAGNÓSTICOS DEL EQUIPO: null MIENTRAS SE CUENTAN ("..."), 0 SI NO TIENE ("NO"):
  cantidadDiagnosticos(equipoIngeniero: EquiposIngenierosI): number | null {
    if (!this.cantidadDiagnosticosPorEquipo) return null;
    return this.cantidadDiagnosticosPorEquipo.get(equipoIngeniero.idEquipoIngeniero ?? -1) ?? 0;
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES (PANEL DE CONTROL) DESDE EL BACKEND:
  private cargarUnidadesMilitares(): void {
    this.unidadesMilitaresService.findAllMilitaryUnits(undefined, undefined, 'siglaoAcronimoUnidadMilitar', 'ASC')
      .subscribe({
        next: (unidadesMilitares) => {
          this.unidadesMilitares = unidadesMilitares;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR UNIDADES MILITARES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE SOCIEDADES DE UNIDADES CENTRALIZADORAS (PANEL DE CONTROL) DESDE EL BACKEND:
  private cargarSociedadesUnidadesCentralizadoras(): void {
    this.sociedadesUnidadesCentralizadorasService.findAllCentralizingUnitCompanies(undefined, undefined, undefined, 'codigoSociedadUnidadCentralizadora', 'ASC')
      .subscribe({
        next: (sociedadesUnidadesCentralizadoras) => {
          this.sociedadesUnidadesCentralizadoras = sociedadesUnidadesCentralizadoras;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR SOCIEDADES DE UNIDADES CENTRALIZADORAS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE CLASIFICACIONES DE EQUIPOS DE INGENIEROS DESDE EL BACKEND:
  private cargarClasificacionesEquiposIngenieros(): void {
    this.clasificacionesEquiposIngenierosService.findAllEngineerEquipmentClassifications(undefined, undefined, 'nombreClasificacionEquipoIngeniero', 'ASC')
      .subscribe({
        next: (clasificacionesEquiposIngenieros) => {
          this.clasificacionesEquiposIngenieros = clasificacionesEquiposIngenieros;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR CLASIFICACIONES DE EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO COMPLETO DE SUBCLASIFICACIONES; LOS COMBOS LO FILTRAN SEGÚN LA CLASIFICACIÓN ELEGIDA:
  private cargarSubclasificacionesEquiposIngenieros(): void {
    this.subclasificacionesEquiposIngenierosService.findAllEngineerEquipmentSubclassifications(undefined, undefined, undefined, undefined, 'nombreSubclasificacionEquipoIngeniero', 'ASC')
      .subscribe({
        next: (subclasificacionesEquiposIngenieros) => {
          this.subclasificacionesEquiposIngenieros = subclasificacionesEquiposIngenieros;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR SUBCLASIFICACIONES DE EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO COMPLETO DE ELEMENTOS DE SUBCLASIFICACIONES; LOS COMBOS LO FILTRAN SEGÚN LA SUBCLASIFICACIÓN ELEGIDA:
  private cargarElementosSubclasificacionesEquiposIngenieros(): void {
    this.elementosSubclasificacionesEquiposIngenierosService.findAllEngineerEquipmentSubclassificationElements(undefined, undefined, undefined, 'nombreElementoSubclasificacionEquipoIngeniero', 'ASC')
      .subscribe({
        next: (elementosSubclasificacionesEquiposIngenieros) => {
          this.elementosSubclasificacionesEquiposIngenieros = elementosSubclasificacionesEquiposIngenieros;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR ELEMENTOS DE SUBCLASIFICACIONES DE EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE ALTAS DE EQUIPOS DE INGENIEROS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposAltasEquiposIngenieros(): void {
    this.tiposAltasEquiposIngenierosService.findAllEngineerEquipmentRegistrationTypes(undefined, undefined, 'nombreTipoAltaEquipoIngeniero', 'ASC')
      .subscribe({
        next: (tiposAltasEquiposIngenieros) => {
          this.tiposAltasEquiposIngenieros = tiposAltasEquiposIngenieros;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE ALTAS DE EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //COMBOS EN CASCADA DEL FILTRO: LA SUBCLASIFICACIÓN DEPENDE DE LA CLASIFICACIÓN Y EL ELEMENTO DE LA SUBCLASIFICACIÓN:
  get subclasificacionesFiltro(): SubclasificacionesEquiposIngenierosI[] {
    const clasificacion = this.equiposIngenierosForm.value.cboxNombreClasificacionEquipoIngenieroSeleccionado;
    if (!clasificacion) return this.subclasificacionesEquiposIngenieros;
    return this.subclasificacionesEquiposIngenieros.filter(item => item.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero === clasificacion);
  }

  get elementosFiltro(): ElementosSubclasificacionesEquiposIngenierosI[] {
    const { cboxNombreClasificacionEquipoIngenieroSeleccionado: clasificacion, cboxNombreSubclasificacionEquipoIngenieroSeleccionado: subclasificacion } = this.equiposIngenierosForm.value;
    return this.elementosSubclasificacionesEquiposIngenieros.filter(item =>
      (!clasificacion || item.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero === clasificacion) &&
      (!subclasificacion || item.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero === subclasificacion));
  }

  //AL CAMBIAR LA CLASIFICACIÓN SE LIMPIAN SUBCLASIFICACIÓN Y ELEMENTO; AL CAMBIAR LA SUBCLASIFICACIÓN, EL ELEMENTO:
  cambiarClasificacionFiltro(): void {
    this.equiposIngenierosForm.patchValue({ cboxNombreSubclasificacionEquipoIngenieroSeleccionado: '', cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: '' });
    this.buscar();
  }

  cambiarSubclasificacionFiltro(): void {
    this.equiposIngenierosForm.patchValue({ cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado: '' });
    this.buscar();
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA EL BACKEND CON LA PALABRA CLAVE Y LOS COMBOS DE FILTRO; CON EL RESULTADO SE CALCULAN EL TOTAL, LOS CONTADORES
  //DEL SEMÁFORO POR ESTADO Y LA PÁGINA ACTUAL. EL ESTADO SE FILTRA EN EL CLIENTE PARA QUE EL SEMÁFORO SIGA MOSTRANDO
  //CUÁNTOS EQUIPOS HAY EN CADA ESTADO CON LOS DEMÁS FILTROS:
  accionListar(): void {
    const valoresFormulario = this.equiposIngenierosForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;
    const nombreClasificacionEquipoIngeniero: string | undefined = (valoresFormulario.cboxNombreClasificacionEquipoIngenieroSeleccionado as string) || undefined;
    const nombreSubclasificacionEquipoIngeniero: string | undefined = (valoresFormulario.cboxNombreSubclasificacionEquipoIngenieroSeleccionado as string) || undefined;
    const nombreElementoSubclasificacionEquipoIngeniero: string | undefined = (valoresFormulario.cboxNombreElementoSubclasificacionEquipoIngenieroSeleccionado as string) || undefined;
    const estadoSeleccionado: string = valoresFormulario.cboxEstadoUsoEquipoIngenieroSeleccionado || '';

    this.equiposIngenierosService.findAllEngineerEquipments(
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      nombreClasificacionEquipoIngeniero,
      nombreSubclasificacionEquipoIngeniero,
      nombreElementoSubclasificacionEquipoIngeniero,
      undefined,
      'idEquipoIngeniero',
      'ASC'
    ).subscribe({
      next: (registros) => {
        this.estadosContadores = this.estados.map(estado => ({
          ...estado,
          valor: registros.filter(registro => this.normalizarEstado(registro.estadoUsoEquipoIngeniero) === this.normalizarEstado(estado.etiqueta)).length
        }));
        const filtrados = estadoSeleccionado
          ? registros.filter(registro => this.normalizarEstado(registro.estadoUsoEquipoIngeniero) === this.normalizarEstado(estadoSeleccionado))
          : registros;
        this.totalRegistros = filtrados.length;
        const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina) - 1);
        this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
        const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
        this.equiposIngenieros = filtrados.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR EQUIPOS DE INGENIEROS: ', err)
    });
  }

  private normalizarEstado(estado: unknown): string {
    return String(estado ?? '').trim().replace(/\s+/g, ' ').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  //CLASE DEL BADGE DE ESTADO EN LA TABLA, CON EL MISMO TONO DE SU LUZ EN EL SEMÁFORO:
  claseEstado(estado: unknown): string {
    const encontrado = this.estados.find(item => this.normalizarEstado(item.etiqueta) === this.normalizarEstado(estado));
    return encontrado ? `badge-${encontrado.tono}` : 'badge-neutral';
  }

  calcularTotalPaginas(): number {
    const total = Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina);
    return total > 0 ? total : 1;
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.accionListar();
  }

  seleccionarTandaNumeroRegistrosporPagina(): void {
    this.tandaNumeroRegistrosporPagina = Number(this.equiposIngenierosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', equipoIngeniero: EquiposIngenierosI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.equipoIngenieroSeleccionado = equipoIngeniero;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(equipoIngeniero: EquiposIngenierosI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.equipoIngenieroSeleccionado = equipoIngeniero;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.equipoIngenieroSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.equipoIngenieroSeleccionado = null;
  }

  //ABRE EL HISTORIAL DE DIAGNÓSTICOS INICIALES DE SELECCIÓN DE MANTENIMIENTOS DEL EQUIPO SELECCIONADO:
  abrirModalHistorialDiagnosticos(equipoIngeniero: EquiposIngenierosI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.equipoIngenieroSeleccionado = equipoIngeniero;
      this.modalHistorialDiagnosticosVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  //AL CERRAR EL HISTORIAL SE VUELVEN A CONTAR LOS DIAGNÓSTICOS, PORQUE DENTRO SE PUDIERON CREAR O ELIMINAR:
  cerrarModalHistorialDiagnosticos(): void {
    this.modalHistorialDiagnosticosVisible = false;
    this.equipoIngenieroSeleccionado = null;
    this.cargarCantidadDiagnosticos();
  }

  //ABRE EL HISTORIAL DE DEMÉRITOS Y DESGASTES DEL EQUIPO SELECCIONADO:
  abrirModalHistorialDemeritos(equipoIngeniero: EquiposIngenierosI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.equipoIngenieroSeleccionado = equipoIngeniero;
      this.modalHistorialDemeritosVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  //AL CERRAR EL HISTORIAL SE VUELVEN A CONTAR LOS DEMÉRITOS Y DESGASTES, PORQUE DENTRO SE PUDIERON CREAR O ELIMINAR:
  cerrarModalHistorialDemeritos(): void {
    this.modalHistorialDemeritosVisible = false;
    this.equipoIngenieroSeleccionado = null;
    this.cargarCantidadDemeritos();
  }

  //RECIBE EL EQUIPO NUEVO O MODIFICADO DESDE EL MODAL Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID).
  //SI EL BACKEND RESPONDE banderaexito = false (EJ. INVENTARIO O ACTIVO FIJO REPETIDO) SE MUESTRA SU MENSAJE Y EL MODAL QUEDA ABIERTO:
  guardarEquipoIngeniero(equipoIngeniero: EquiposIngenierosI): void {
    const esModificacion = !!equipoIngeniero.idEquipoIngeniero;
    const solicitud = esModificacion
      ? this.equiposIngenierosService.updateEngineerEquipment(equipoIngeniero)
      : this.equiposIngenierosService.addEngineerEquipment(equipoIngeniero);

    solicitud.subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible guardar el equipo de ingenieros.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || `Equipo de ingenieros ${esModificacion ? 'modificado' : 'creado'} correctamente.`);
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL GUARDAR EQUIPO DE INGENIEROS: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al guardar el equipo de ingenieros.');
      }
    });
  }

  //RECIBE EL ID DEL EQUIPO DE INGENIEROS A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarEquipoIngeniero(idEquipoIngeniero: number): void {
    this.equiposIngenierosService.deleteEngineerEquipment(idEquipoIngeniero).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible eliminar el equipo de ingenieros.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || 'Equipo de ingenieros eliminado correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR EQUIPO DE INGENIEROS: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el equipo de ingenieros.');
      }
    });
  }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTipo = tipo;
    this.toastMensaje = mensaje;
    this.changeDetectorRef.markForCheck();
    this.toastTimer = setTimeout(() => {
      this.toastMensaje = '';
      this.changeDetectorRef.markForCheck();
    }, 4000);
  }
}
