import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApoyosAtencPrevEmergDesastI, ApoyosAtencPrevEmergDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposEntidadesInstitucionalesI } from '../../../../../interfaces/tipos-entidades-institucionales/tipos-entidades-institucionales.interface';
import { TiposRequerimientosApoyosAtencionPrevencionI } from '../../../../../interfaces/digei/gestion-riesgo/tipos-requerimientos-apoy-atenc-prev/tipos-requerimientos-apoy-atenc-prev.interface';
import { ProcesosApoyosAtencionPrevencionI } from '../../../../../interfaces/digei/gestion-riesgo/procesos-apoyos-atenc-prev/procesos-apoyos-atenc-prev.interface';
import { TiposEventosApoyosRealizadosI } from '../../../../../interfaces/digei/gestion-riesgo/tipos-eventos-apoyos-realizados/tipos-eventos-apoyos-realizados.interface';
import { PaisesMundoI } from '../../../../../interfaces/paises-mundo/paises-mundo.interface';
import { DepartamentosoEstadosMundoI } from '../../../../../interfaces/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface';

import { ApoyosAtencPrevEmergDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposEntidadesInstitucionalesService } from '../../../../../services/tipos-entidades-institucionales/tipos-entidades-institucionales.service';
import { TiposRequerimientosApoyosAtencionPrevencionService } from '../../../../../services/digei/gestion-riesgo/tipos-requerimientos-apoy-atenc-prev/tipos-requerimientos-apoy-atenc-prev.service';
import { ProcesosApoyosAtencionPrevencionService } from '../../../../../services/digei/gestion-riesgo/procesos-apoyos-atenc-prev/procesos-apoyos-atenc-prev.service';
import { TiposEventosApoyosRealizadosService } from '../../../../../services/digei/gestion-riesgo/tipos-eventos-apoyos-realizados/tipos-eventos-apoyos-realizados.service';
import { PaisesMundoService } from '../../../../../services/paises-mundo/paises-mundo.service';
import { DepartamentosoEstadosMundoService } from '../../../../../services/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';
import { HistorialEquipTranspApoyAtencPrevEmergDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-eq_tr-apoy-at-prev-em-des/historial-eq_tr-apoy-at-prev-em-des.service';
import { HistorialOrdenApoyoMovimientoTropaService } from '../../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-ordenes-apoy-mov-trop/historial-ordenes-apoy-mov-trop.service';
import { FotografiasAnexasApoyAtencPrevEmergDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/fot_anex_apoy_atenc_prev_emerg_des/fot_anex_apoy_atenc_prev_emerg_des.service';

import { AddUpdDelApoyoAtencPrevEmergDesastComponent } from '../add-upd-del-apoyo-atenc-prev-emerg-desast/add-upd-del-apoyo-atenc-prev-emerg-desast.component';
import { VistaApoyoAtencPrevEmergDesastComponent } from '../vista-apoyo-atenc-prev-emerg-desast/vista-apoyo-atenc-prev-emerg-desast.component';
import { ListadoHistEqTrApoyAtPrevEmDesComponent } from '../../historial-eq_tr-apoy-at-prev-em-des/listado-hist-eq_tr-apoy-at-prev-em-des/listado-hist-eq_tr-apoy-at-prev-em-des.component';
import { ListadoHistOrdApoyMovTropComponent } from '../../historial-ordenes-apoy-mov-trop/listado-hist-ord-apoy-mov-trop/listado-hist-ord-apoy-mov-trop.component';
import { FotogAnexApoyAtencPrevEmergDesComponent } from '../../fotog_anex_apoy_atenc_prev_emerg_des/fotog_anex_apoy_atenc_prev_emerg_des.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { OrdenarPorSiglaPipe } from '../../../../../shared/pipes/ordenar-por-sigla.pipe';

@Component({
  selector: 'app-listado-apoyos-atenc-prev-emerg-desast',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelApoyoAtencPrevEmergDesastComponent, VistaApoyoAtencPrevEmergDesastComponent, ListadoHistEqTrApoyAtPrevEmDesComponent, ListadoHistOrdApoyMovTropComponent, FotogAnexApoyAtencPrevEmergDesComponent, SemaforoContadoresComponent, OrdenarPorSiglaPipe],
  templateUrl: './listado-apoyos-atenc-prev-emerg-desast.component.html',
  styleUrl: './listado-apoyos-atenc-prev-emerg-desast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoApoyosAtencPrevEmergDesastComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBOS DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposEntidadesInstitucionales: TiposEntidadesInstitucionalesI[] = [];
  tiposRequerimientosApoyosAtencionPrevencion: TiposRequerimientosApoyosAtencionPrevencionI[] = [];
  procesosApoyosAtencionPrevencion: ProcesosApoyosAtencionPrevencionI[] = [];
  tiposEventosApoyosRealizados: TiposEventosApoyosRealizadosI[] = [];
  paisesMundo: PaisesMundoI[] = [];
  departamentosoEstadosMundo: DepartamentosoEstadosMundoI[] = [];

  //PÁGINA ACTUAL DE APOYOS DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE
  //RECORTA EN EL CLIENTE):
  apoyosAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI[] = [];
  totalRegistros = 0;

  //CANTIDAD DE EQUIPOS DE TRANSPORTES, DE ÓRDENES DE MOVIMIENTOS DE TROPAS Y DE FOTOGRAFÍAS ANEXAS DE CADA APOYO (POR SU ID), PARA LAS
  //COLUMNAS QUE MUESTRAN "NO" O EL CHULO VERDE. LOS HISTORIALES NO SE PUEDEN FILTRAR POR APOYO EN EL BACKEND, ASÍ QUE CADA LISTA SE
  //TRAE COMPLETA UNA SOLA VEZ Y SE CUENTA AQUÍ; MIENTRAS SE CARGA (null) LA COLUMNA MUESTRA "...":
  cantidadEquiposTransportesPorApoyo: Map<number, number> | null = null;
  cantidadOrdenesMovimientosTropasPorApoyo: Map<number, number> | null = null;
  cantidadFotografiasAnexasPorApoyo: Map<number, number> | null = null;

  apoyosAtencPrevEmergDesastForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  apoyoAtencPrevEmergDesastSeleccionado: ApoyosAtencPrevEmergDesastI | null = null;

  //ESTADO DEL MODAL DEL HISTORIAL DE EQUIPOS DE TRANSPORTES DEL APOYO (ASOCIADO AL APOYO SELECCIONADO):
  modalEquiposTransportesVisible = false;
  apoyoAtencPrevEmergDesastParaEquiposTransportes: ApoyosAtencPrevEmergDesastI | null = null;

  //ESTADO DEL MODAL DEL HISTORIAL DE ÓRDENES DE APOYOS DE MOVIMIENTOS DE TROPAS DEL APOYO (ASOCIADO AL APOYO SELECCIONADO):
  modalOrdenesMovimientosTropasVisible = false;
  apoyoAtencPrevEmergDesastParaOrdenesMovimientosTropas: ApoyosAtencPrevEmergDesastI | null = null;

  //ESTADO DEL MODAL DE LAS FOTOGRAFÍAS ANEXAS DEL APOYO (ASOCIADO AL APOYO SELECCIONADO):
  modalFotografiasAnexasVisible = false;
  apoyoAtencPrevEmergDesastParaFotografiasAnexas: ApoyosAtencPrevEmergDesastI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private apoyosAtencPrevEmergDesastService: ApoyosAtencPrevEmergDesastService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private tiposEntidadesInstitucionalesService: TiposEntidadesInstitucionalesService,
    private tiposRequerimientosApoyosAtencionPrevencionService: TiposRequerimientosApoyosAtencionPrevencionService,
    private procesosApoyosAtencionPrevencionService: ProcesosApoyosAtencionPrevencionService,
    private tiposEventosApoyosRealizadosService: TiposEventosApoyosRealizadosService,
    private paisesMundoService: PaisesMundoService,
    private departamentosoEstadosMundoService: DepartamentosoEstadosMundoService,
    private spinnerService: SpinnerService,
    private historialEquipTranspApoyAtencPrevEmergDesastService: HistorialEquipTranspApoyAtencPrevEmergDesastService,
    private historialOrdenApoyoMovimientoTropaService: HistorialOrdenApoyoMovimientoTropaService,
    private fotografiasAnexasApoyAtencPrevEmergDesastService: FotografiasAnexasApoyAtencPrevEmergDesastService
  ) {
    this.apoyosAtencPrevEmergDesastForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxIdUnidadMilitarSeleccionado: new FormControl(''),
      cboxIdProcesoApoyoAtencionPrevencionSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarTiposEntidadesInstitucionales();
    this.cargarTiposRequerimientosApoyosAtencionPrevencion();
    this.cargarProcesosApoyosAtencionPrevencion();
    this.cargarTiposEventosApoyosRealizados();
    this.cargarPaisesMundo();
    this.cargarDepartamentosoEstadosMundo();
    this.accionListar();
    this.cargarCantidadEquiposTransportes();
    this.cargarCantidadOrdenesMovimientosTropas();
    this.cargarCantidadFotografiasAnexas();
  }

  //CUENTA CUÁNTOS REGISTROS DE LA LISTA PERTENECEN A CADA APOYO (POR EL ID DE SU apoyoAtencPrevEmergDesastDTO):
  private contarPorApoyo(registros: { apoyoAtencPrevEmergDesastDTO: ApoyosAtencPrevEmergDesastI }[]): Map<number, number> {
    const cantidades = new Map<number, number>();
    registros.forEach(registro => {
      const idApoyoAtencPrevEmergDesast = registro.apoyoAtencPrevEmergDesastDTO?.idApoyoAtencPrevEmergDesast;
      if (idApoyoAtencPrevEmergDesast !== undefined) cantidades.set(idApoyoAtencPrevEmergDesast, (cantidades.get(idApoyoAtencPrevEmergDesast) ?? 0) + 1);
    });
    return cantidades;
  }

  //CARGA EL HISTORIAL COMPLETO DE EQUIPOS DE TRANSPORTES Y CUENTA LOS DE CADA APOYO:
  private cargarCantidadEquiposTransportes(): void {
    this.cantidadEquiposTransportesPorApoyo = null;
    this.historialEquipTranspApoyAtencPrevEmergDesastService.findAllTransportEquipmentHistoriesOfSupports().subscribe({
      next: registros => {
        this.cantidadEquiposTransportesPorApoyo = this.contarPorApoyo(registros);
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LOS EQUIPOS DE TRANSPORTES DE LOS APOYOS: ', err)
    });
  }

  //CARGA EL HISTORIAL COMPLETO DE ÓRDENES DE APOYOS DE MOVIMIENTOS DE TROPAS Y CUENTA LAS DE CADA APOYO:
  private cargarCantidadOrdenesMovimientosTropas(): void {
    this.cantidadOrdenesMovimientosTropasPorApoyo = null;
    this.historialOrdenApoyoMovimientoTropaService.findAllTroopMovementSupportOrderHistories().subscribe({
      next: registros => {
        this.cantidadOrdenesMovimientosTropasPorApoyo = this.contarPorApoyo(registros);
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LAS ÓRDENES DE MOVIMIENTOS DE TROPAS DE LOS APOYOS: ', err)
    });
  }

  //CARGA LOS REGISTROS DE FOTOGRAFÍAS ANEXAS (UNO POR APOYO) Y CUENTA CUÁNTAS DE SUS CUATRO COLUMNAS TIENEN NOMBRE DE ARCHIVO:
  private cargarCantidadFotografiasAnexas(): void {
    this.cantidadFotografiasAnexasPorApoyo = null;
    this.fotografiasAnexasApoyAtencPrevEmergDesastService.findAllAttachedPhotographsOfSupports().subscribe({
      next: registros => {
        const cantidades = new Map<number, number>();
        registros.forEach(registro => {
          const idApoyoAtencPrevEmergDesast = registro.apoyoAtencPrevEmergDesastDTO?.idApoyoAtencPrevEmergDesast;
          if (idApoyoAtencPrevEmergDesast === undefined) return;
          const cantidad = [
            registro.nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast1,
            registro.nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast2,
            registro.nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast3,
            registro.nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast4
          ].filter(nombre => !!String(nombre ?? '').trim()).length;
          cantidades.set(idApoyoAtencPrevEmergDesast, (cantidades.get(idApoyoAtencPrevEmergDesast) ?? 0) + cantidad);
        });
        this.cantidadFotografiasAnexasPorApoyo = cantidades;
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LAS FOTOGRAFÍAS ANEXAS DE LOS APOYOS: ', err)
    });
  }

  //CANTIDAD DE REGISTROS ASOCIADOS AL APOYO EN EL MAPA DADO (null MIENTRAS EL MAPA SE CARGA):
  cantidadAsociada(cantidades: Map<number, number> | null, apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI): number | null {
    if (!cantidades) return null;
    return cantidades.get(apoyoAtencPrevEmergDesast.idApoyoAtencPrevEmergDesast ?? -1) ?? 0;
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
  private cargarUnidadesMilitares(): void {
    this.unidadesMilitaresService.findAllMilitaryUnits(undefined, undefined, 'nombreUnidadMilitar', 'ASC')
      .subscribe({
        next: (unidadesMilitares) => {
          this.unidadesMilitares = unidadesMilitares;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR UNIDADES MILITARES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE ENTIDADES INSTITUCIONALES DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposEntidadesInstitucionales(): void {
    this.tiposEntidadesInstitucionalesService.findAllTypesOfInstitutionalEntities(undefined, undefined, 'nombreTipoEntidadInstitucional', 'ASC')
      .subscribe({
        next: (tiposEntidadesInstitucionales) => {
          this.tiposEntidadesInstitucionales = tiposEntidadesInstitucionales;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE ENTIDADES INSTITUCIONALES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE REQUERIMIENTOS DE APOYOS DE ATENCIÓN Y PREVENCIÓN DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposRequerimientosApoyosAtencionPrevencion(): void {
    this.tiposRequerimientosApoyosAtencionPrevencionService.findAllTypesOfSupportRequirementsAttentionPrevention(undefined, undefined, 'nombreTipoRequerimientoApoyoAtencionPrevencion', 'ASC')
      .subscribe({
        next: (tiposRequerimientosApoyosAtencionPrevencion) => {
          this.tiposRequerimientosApoyosAtencionPrevencion = tiposRequerimientosApoyosAtencionPrevencion;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE REQUERIMIENTOS DE APOYOS DE ATENCIÓN Y PREVENCIÓN: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE PROCESOS DE APOYOS DE ATENCIÓN Y PREVENCIÓN DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO, ESTE
  //ÚLTIMO FILTRADO EN EL COMPONENTE POR EL TIPO DE REQUERIMIENTO SELECCIONADO):
  private cargarProcesosApoyosAtencionPrevencion(): void {
    this.procesosApoyosAtencionPrevencionService.findAllSupportProcessesAttentionPrevention(undefined, undefined, undefined, 'nombreProcesoApoyoAtencionPrevencion', 'ASC')
      .subscribe({
        next: (procesosApoyosAtencionPrevencion) => {
          this.procesosApoyosAtencionPrevencion = procesosApoyosAtencionPrevencion;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR PROCESOS DE APOYOS DE ATENCIÓN Y PREVENCIÓN: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE EVENTOS DE APOYOS REALIZADOS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposEventosApoyosRealizados(): void {
    this.tiposEventosApoyosRealizadosService.findAllTypesOfSupportEventsCarriedOut(undefined, undefined, 'nombreTipoEventoApoyoRealizado', 'ASC')
      .subscribe({
        next: (tiposEventosApoyosRealizados) => {
          this.tiposEventosApoyosRealizados = tiposEventosApoyosRealizados;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE EVENTOS DE APOYOS REALIZADOS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE PAÍSES DEL MUNDO DESDE EL BACKEND (COMBO CON CAMPO DE TEXTO DE "PAÍS" DEL FORMULARIO):
  private cargarPaisesMundo(): void {
    this.paisesMundoService.findAllCountriesOfTheWorld(undefined, undefined, 'nombrePaisMundo', 'ASC')
      .subscribe({
        next: (paises) => {
          this.paisesMundo = paises;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR PAÍSES DEL MUNDO: ', err)
      });
  }

  //CARGA EL CATÁLOGO COMPLETO DE DEPARTAMENTOS O ESTADOS DEL MUNDO DESDE EL BACKEND (COMBO CON CAMPO DE TEXTO DE "DEPARTAMENTO O
  //ESTADO" DEL FORMULARIO, FILTRADO EN EL COMPONENTE POR EL PAÍS SELECCIONADO):
  private cargarDepartamentosoEstadosMundo(): void {
    this.departamentosoEstadosMundoService.findAllDepartmentsOrStatesOfTheWorld(undefined, undefined, undefined, 'nombreDepartamentooEstadoMundo', 'ASC')
      .subscribe({
        next: (departamentos) => {
          this.departamentosoEstadosMundo = departamentos;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR DEPARTAMENTOS O ESTADOS DEL MUNDO: ', err)
      });
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE (CÓDIGO RADICADO O NOMBRE DE LA ENTIDAD SOLICITANTE), LA UNIDAD MILITAR Y
  //EL PROCESO SELECCIONADOS:
  accionListar(): void {
    const valoresFormulario = this.apoyosAtencPrevEmergDesastForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const idUnidadMilitar: number | undefined = valoresFormulario.cboxIdUnidadMilitarSeleccionado ? Number(valoresFormulario.cboxIdUnidadMilitarSeleccionado) : undefined;
    const idProcesoApoyoAtencionPrevencion: number | undefined = valoresFormulario.cboxIdProcesoApoyoAtencionPrevencionSeleccionado ? Number(valoresFormulario.cboxIdProcesoApoyoAtencionPrevencionSeleccionado) : undefined;

    this.apoyosAtencPrevEmergDesastService.findAllSupportsAttentionPreventionEmergenciesDisastersPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      idUnidadMilitar,
      idProcesoApoyoAtencionPrevencion,
      'idApoyoAtencPrevEmergDesast',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.apoyosAtencPrevEmergDesast = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR APOYOS DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES: ', err)
    });

    this.apoyosAtencPrevEmergDesastService.findCountTotalRegisters(undefined, keyword, idUnidadMilitar, idProcesoApoyoAtencionPrevencion)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE APOYOS DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES: ', err)
      });
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
    this.tandaNumeroRegistrosporPagina = Number(this.apoyosAtencPrevEmergDesastForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //MUESTRA UNA FECHA DEL BACKEND (EJ. "2026-10-23T14:30:00.000-05:00" O "2026-10-23 14:30:00.0") COMO "2026-10-23 14:30", SIN
  //CONVERTIRLA DE ZONA HORARIA (EL BACKEND YA LA ENTREGA EN HORA DE BOGOTÁ POR spring.jackson.time-zone):
  formatearFecha(fecha: unknown): string {
    if (!fecha) return '-';
    return String(fecha).replace('T', ' ').slice(0, 16);
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.apoyoAtencPrevEmergDesastSeleccionado = apoyoAtencPrevEmergDesast;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoAtencPrevEmergDesastSeleccionado = apoyoAtencPrevEmergDesast;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.apoyoAtencPrevEmergDesastSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.apoyoAtencPrevEmergDesastSeleccionado = null;
  }

  //ABRE EL MODAL CON EL HISTORIAL DE EQUIPOS DE TRANSPORTES ASOCIADO AL APOYO SELECCIONADO — MISMO PATRÓN QUE EL HISTORIAL DE
  //INTEGRANTES DE ListadoSolicitudesInfraestructurasComponent:
  abrirModalEquiposTransportes(apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoAtencPrevEmergDesastParaEquiposTransportes = apoyoAtencPrevEmergDesast;
      this.modalEquiposTransportesVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalEquiposTransportes(): void {
    this.modalEquiposTransportesVisible = false;
    this.apoyoAtencPrevEmergDesastParaEquiposTransportes = null;
    //SE VUELVE A CONTAR POR SI SE AGREGÓ O ELIMINÓ ALGÚN EQUIPO MIENTRAS EL MODAL ESTUVO ABIERTO:
    this.cargarCantidadEquiposTransportes();
  }

  //ABRE EL MODAL CON EL HISTORIAL DE ÓRDENES DE APOYOS DE MOVIMIENTOS DE TROPAS ASOCIADO AL APOYO SELECCIONADO — MISMO PATRÓN QUE
  //EL HISTORIAL DE EQUIPOS DE TRANSPORTES:
  abrirModalOrdenesMovimientosTropas(apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoAtencPrevEmergDesastParaOrdenesMovimientosTropas = apoyoAtencPrevEmergDesast;
      this.modalOrdenesMovimientosTropasVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalOrdenesMovimientosTropas(): void {
    this.modalOrdenesMovimientosTropasVisible = false;
    this.apoyoAtencPrevEmergDesastParaOrdenesMovimientosTropas = null;
    //SE VUELVE A CONTAR POR SI SE AGREGÓ O ELIMINÓ ALGUNA ORDEN MIENTRAS EL MODAL ESTUVO ABIERTO:
    this.cargarCantidadOrdenesMovimientosTropas();
  }

  //ABRE EL MODAL CON LAS CUATRO FOTOGRAFÍAS ANEXAS DEL APOYO SELECCIONADO:
  abrirModalFotografiasAnexas(apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoAtencPrevEmergDesastParaFotografiasAnexas = apoyoAtencPrevEmergDesast;
      this.modalFotografiasAnexasVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalFotografiasAnexas(): void {
    this.modalFotografiasAnexasVisible = false;
    this.apoyoAtencPrevEmergDesastParaFotografiasAnexas = null;
    //SE VUELVE A CONTAR POR SI SE AGREGÓ O QUITÓ ALGUNA FOTOGRAFÍA MIENTRAS EL MODAL ESTUVO ABIERTO:
    this.cargarCantidadFotografiasAnexas();
  }

  //RESPUESTA DEL BACKEND AL CREAR, MODIFICAR O ELIMINAR: RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. CÓDIGO RADICADO REPETIDO), ASÍ QUE
  //SE USA banderaexito PARA SABER SI CERRAR EL MODAL Y REFRESCAR EL LISTADO O DEJARLO ABIERTO MOSTRANDO EL MENSAJE DE ERROR:
  private procesarRespuesta(respuesta: ApoyosAtencPrevEmergDesastMsj, mensajeExito: string): void {
    if (respuesta.banderaexito === false) {
      this.mostrarToast('error', respuesta.mensaje || 'No se pudo completar la operación.');
      return;
    }
    this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
    this.accionListar();
    this.cerrarModalAddUpdDel();
  }

  //RECIBE EL APOYO NUEVO O MODIFICADO DESDE EL MODAL Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID):
  guardarApoyoAtencPrevEmergDesast(apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI): void {
    if (apoyoAtencPrevEmergDesast.idApoyoAtencPrevEmergDesast) {
      this.apoyosAtencPrevEmergDesastService.updateSupportAttentionPreventionEmergencyDisaster(apoyoAtencPrevEmergDesast).subscribe({
        next: (respuesta) => this.procesarRespuesta(respuesta, 'Informe de apoyo modificado correctamente.'),
        error: (err) => {
          console.error('ERROR AL MODIFICAR APOYO DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar el informe de apoyo.');
        }
      });
    } else {
      this.apoyosAtencPrevEmergDesastService.addSupportAttentionPreventionEmergencyDisaster(apoyoAtencPrevEmergDesast).subscribe({
        next: (respuesta) => this.procesarRespuesta(respuesta, 'Informe de apoyo creado correctamente.'),
        error: (err) => {
          console.error('ERROR AL CREAR APOYO DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear el informe de apoyo.');
        }
      });
    }
  }

  //RECIBE EL ID DEL APOYO A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarApoyoAtencPrevEmergDesast(idApoyoAtencPrevEmergDesast: number): void {
    this.apoyosAtencPrevEmergDesastService.deleteSupportAttentionPreventionEmergencyDisaster(idApoyoAtencPrevEmergDesast).subscribe({
      next: (respuesta) => this.procesarRespuesta(respuesta, 'Informe de apoyo eliminado correctamente.'),
      error: (err) => {
        console.error('ERROR AL ELIMINAR APOYO DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el informe de apoyo.');
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
