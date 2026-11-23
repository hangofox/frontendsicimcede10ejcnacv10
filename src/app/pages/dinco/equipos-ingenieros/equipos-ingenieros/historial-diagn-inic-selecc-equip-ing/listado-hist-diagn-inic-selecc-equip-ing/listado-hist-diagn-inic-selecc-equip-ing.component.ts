import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { EquiposIngenierosI } from '../../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { EstadosDiagnosticosEquiposIngenierosI } from '../../../../../../interfaces/dinco/estados-diagnosticos-equipos-ingenieros/estados-diagnosticos-equipos-ingenieros.interface';
import { UnidadesMilitaresRealizadorasMantenimientosI } from '../../../../../../interfaces/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.interface';
import { HistorialDiagnInicSeleccEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/historial-diagn-inic-selecc-equip-ing.interface';
import { HistorialDiagnInicSeleccEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/historial-diagn-inic-selecc-equip-ing.service';
import { EstadosDiagnosticosEquiposIngenierosService } from '../../../../../../services/dinco/estados-diagnosticos-equipos-ingenieros/estados-diagnosticos-equipos-ingenieros.service';
import { UnidadesMilitaresRealizadorasMantenimientosService } from '../../../../../../services/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.service';
import { SpinnerService } from '../../../../../../services/spinner/spinner.service';
import { ParametrosSistemaService } from '../../../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { UnidadesMilitaresService } from '../../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';

import { AddUpdDelHistDiagnInicSeleccEquipIngComponent, GuardadoHistorialDiagnosticoEvent } from '../add-upd-del-hist-diagn-inic-selecc-equip-ing/add-upd-del-hist-diagn-inic-selecc-equip-ing.component';
import { VistaHistDiagnInicSeleccEquipIngComponent } from '../vista-hist-diagn-inic-selecc-equip-ing/vista-hist-diagn-inic-selecc-equip-ing.component';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

//TONO DE CADA ESTADO DE DIAGNÓSTICO (TABLA_ESTADOS_DIAGNOSTICOS_EQUIPOS_INGENIEROS) EN EL SEMÁFORO Y EN EL BADGE DE LA TABLA;
//UN ESTADO NUEVO QUE NO ESTÉ AQUÍ SE MUESTRA CON TONO NEUTRAL:
const TONOS_ESTADOS_DIAGNOSTICOS: Record<string, string> = {
  'LINEA DE SERVICIO': 'bueno',
  'LÍNEA DE SERVICIO': 'bueno',
  'MANTENIMIENTO': 'mantenimiento',
  'FUERA DE SERVICIO': 'fuera-servicio'
};

//HISTORIAL DE DIAGNÓSTICOS INICIALES DE SELECCIÓN DE MANTENIMIENTOS DE UN EQUIPO DE INGENIEROS. SE ABRE EN UN MODAL DESDE EL
//BOTÓN DE HISTORIAL DEL LISTADO DE EQUIPOS DE INGENIEROS (MISMO PATRÓN QUE ListadoHistProyeccMunicEspecComponent):
@Component({
  selector: 'app-listado-hist-diagn-inic-selecc-equip-ing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelHistDiagnInicSeleccEquipIngComponent, VistaHistDiagnInicSeleccEquipIngComponent, SemaforoContadoresComponent],
  templateUrl: './listado-hist-diagn-inic-selecc-equip-ing.component.html',
  styleUrl: './listado-hist-diagn-inic-selecc-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoHistDiagnInicSeleccEquipIngComponent implements OnInit, OnChanges, OnDestroy {

  //EQUIPO DE INGENIEROS DUEÑO DEL HISTORIAL:
  @Input({ required: true }) equipoIngeniero!: EquiposIngenierosI;

  estadosDiagnosticosEquiposIngenieros: EstadosDiagnosticosEquiposIngenierosI[] = [];
  //CATÁLOGO DE UNIDADES MILITARES REALIZADORAS DE MANTENIMIENTOS (PANEL DE CONTROL), PARA EL COMBO DEL FORMULARIO:
  unidadesMilitaresRealizadorasMantenimientos: UnidadesMilitaresRealizadorasMantenimientosI[] = [];

  //HistorialDiagnosticoInicialSeleccMttoEquipIngController SOLO FILTRA POR N.° DE REGISTRO (NO POR EQUIPO), ASÍ QUE SE TRAEN LOS
  //HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE Y AQUÍ SE DEJAN LOS DE ESTE EQUIPO; EL TOTAL, EL SEMÁFORO Y LA PAGINACIÓN SE
  //CALCULAN SOBRE ESE RESULTADO:
  private historialesEquipo: HistorialDiagnInicSeleccEquipIngI[] = [];

  //PÁGINA ACTUAL QUE SE MUESTRA EN LA TABLA:
  historialesDiagnosticosInicialesSeleccMttoEquipIng: HistorialDiagnInicSeleccEquipIngI[] = [];
  totalRegistros = 0;

  //SEMÁFORO: UNA LUZ POR CADA ESTADO DE DIAGNÓSTICO:
  contadores: { etiqueta: string; tono: string; valor: number }[] = [];

  historialesDiagnosticosInicialesSeleccMttoEquipIngForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES INTERNOS:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  historialDiagnosticoSeleccionado: HistorialDiagnInicSeleccEquipIngI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  //DOCUMENTO ANEXO (MISMO PATRÓN QUE ListadoHistDemerDesgastEquipIngComponent): CARPETA DE LA UNIDAD MILITAR DEL EQUIPO (null MIENTRAS SE
  //RESUELVE O SI NO SE PUDO), BANDERA MIENTRAS SE SUBE / BORRA EL ARCHIVO, REGISTRO CUYO DOCUMENTO SE ESTÁ ABRIENDO, URLs blob: ABIERTAS Y
  //EXISTENCIA DE CADA ARCHIVO EN EL SERVIDOR (POR NOMBRE; null MIENTRAS SE VERIFICA):
  carpetaDocumentos: string | null = null;
  private carpetaNoDisponible = false;
  guardando = false;
  abriendoId: number | null = null;
  private readonly urlsAbiertas: string[] = [];
  private readonly existenciaDocumentos = new Map<string, boolean | null>();

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private historialDiagnInicSeleccEquipIngService: HistorialDiagnInicSeleccEquipIngService,
    private estadosDiagnosticosEquiposIngenierosService: EstadosDiagnosticosEquiposIngenierosService,
    private unidadesMilitaresRealizadorasMantenimientosService: UnidadesMilitaresRealizadorasMantenimientosService,
    private spinnerService: SpinnerService,
    private parametrosSistemaService: ParametrosSistemaService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private gestionArchivosService: GestionArchivosService
  ) {
    this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarEstadosDiagnosticos();
    this.cargarUnidadesMilitaresRealizadorasMantenimientos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipoIngeniero'] && this.equipoIngeniero?.idEquipoIngeniero) {
      //SE RESUELVE LA CARPETA DE LOS DOCUMENTOS DE LA UNIDAD MILITAR DEL EQUIPO Y SE VUELVE A LISTAR:
      this.carpetaDocumentos = null;
      this.carpetaNoDisponible = false;
      this.existenciaDocumentos.clear();
      this.obtenerCarpetaDocumentos().subscribe({
        next: carpeta => {
          this.carpetaDocumentos = carpeta;
          this.verificarDocumentosPagina();
          this.changeDetectorRef.markForCheck();
        },
        error: err => {
          console.error('ERROR AL OBTENER LA CARPETA DE LOS DOCUMENTOS ANEXOS DE DIAGNÓSTICOS INICIALES: ', err);
          //SIN CARPETA NO SE PUEDE VERIFICAR NI ABRIR NINGÚN DOCUMENTO: LA COLUMNA MUESTRA "NO":
          this.carpetaNoDisponible = true;
          this.changeDetectorRef.markForCheck();
        }
      });
      this.buscar();
    }
  }

  ngOnDestroy(): void {
    this.urlsAbiertas.forEach(url => URL.revokeObjectURL(url));
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  //CARPETA DEL SERVIDOR DE ARCHIVOS DONDE VAN LOS DOCUMENTOS: CARPETA PRINCIPAL + RUTA DE DOCUMENTACIÓN ANEXA DEL HISTORIAL DE DIAGNÓSTICOS
  //(PARÁMETROS DEL SISTEMA) + CARPETA DE LA UNIDAD MILITAR DEL EQUIPO — MISMO PATRÓN QUE ListadoDocumentacionAnexaSolicMttoComponent. SI EL
  //EQUIPO NO TRAE LA CARPETA DE SU UNIDAD MILITAR, SE CONSULTA LA UNIDAD MILITAR POR SU SIGLA O ACRÓNIMO:
  private obtenerCarpetaDocumentos(): Observable<string> {
    const unidadMilitar = this.equipoIngeniero?.unidadMilitarDTO;
    const carpetaUnidad$ = String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim()
      ? of(String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar).trim())
      : this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(String(unidadMilitar?.siglaoAcronimoUnidadMilitar || '').trim()).pipe(
          map(({ unidadMilitarDTO }) => String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim())
        );
    return forkJoin({ parametros: this.parametrosSistemaService.getSystemParameterbyId(1), carpetaUnidad: carpetaUnidad$ }).pipe(
      map(({ parametros, carpetaUnidad }) => {
        const parametrosSistemaDTO = parametros.parametrosSistemaDTO;
        const rutaDiagnosticos = String(parametrosSistemaDTO?.rutaDestinoArchivosDocumentacionAnexaHistorialDiagnosticoInicialSeleccEquipIng || '').trim();
        if (!rutaDiagnosticos) throw new Error('SIN RUTA DE DOCUMENTACIÓN ANEXA DEL HISTORIAL DE DIAGNÓSTICOS EN LOS PARÁMETROS DEL SISTEMA');
        if (!carpetaUnidad) throw new Error('SIN CARPETA DE ALMACENAMIENTO DE LA UNIDAD MILITAR DEL EQUIPO');
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim() + rutaDiagnosticos;
        const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
        return `${baseNormalizada}${carpetaUnidad.replace(/^[\\/]+|[\\/]+$/g, '')}/`;
      })
    );
  }

  nombreArchivo(historial: HistorialDiagnInicSeleccEquipIngI | null | undefined): string {
    return String(historial?.nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng ?? '').trim();
  }

  //VERIFICA EN EL SERVIDOR DE ARCHIVOS SI EL DOCUMENTO DE CADA REGISTRO DE LA PÁGINA EXISTE DE VERDAD (UN REGISTRO PUEDE TENER EL NOMBRE
  //GUARDADO SIN QUE EL ARCHIVO ESTÉ EN LA CARPETA) — MISMO PATRÓN QUE ListadoHistMttosEquipIngComponent:
  private verificarDocumentosPagina(): void {
    const carpeta = this.carpetaDocumentos;
    if (!carpeta) return;
    this.historialesDiagnosticosInicialesSeleccMttoEquipIng.forEach(historial => {
      const nombre = this.nombreArchivo(historial);
      if (!nombre || this.existenciaDocumentos.has(nombre)) return;
      this.existenciaDocumentos.set(nombre, null);
      this.gestionArchivosService.getFile(carpeta + nombre).pipe(map(() => true), catchError(() => of(false))).subscribe(existe => {
        this.existenciaDocumentos.set(nombre, existe);
        this.changeDetectorRef.markForCheck();
      });
    });
  }

  //ESTADO DEL DOCUMENTO EN LA TABLA: 'si' (EXISTE: BOTÓN), 'no' (SIN NOMBRE O SIN ARCHIVO EN EL SERVIDOR: "NO") O 'verificando' ("..."):
  estadoDocumento(historial: HistorialDiagnInicSeleccEquipIngI): 'si' | 'no' | 'verificando' {
    const nombre = this.nombreArchivo(historial);
    if (!nombre || this.carpetaNoDisponible) return 'no';
    const existe = this.existenciaDocumentos.get(nombre);
    return existe === undefined || existe === null ? 'verificando' : existe ? 'si' : 'no';
  }

  //ABRE EL DOCUMENTO ANEXO EN OTRA PESTAÑA (getFile + getFileBytes, CON EL TOKEN DE AUTORIZACIÓN). LA PESTAÑA SE ABRE ANTES DE LA
  //DESCARGA PARA QUE EL NAVEGADOR NO LA BLOQUEE COMO VENTANA EMERGENTE:
  abrirArchivo(historial: HistorialDiagnInicSeleccEquipIngI): void {
    const nombre = this.nombreArchivo(historial);
    if (!nombre || !this.carpetaDocumentos || this.abriendoId !== null) return;
    const pestana = window.open('', '_blank');
    this.abriendoId = historial.idHistorialDiagnosticoInicialSeleccMttoEquipIng ?? null;
    this.gestionArchivosService.getFile(this.carpetaDocumentos + nombre).subscribe({
      next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
        next: bytes => {
          const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
          this.urlsAbiertas.push(url);
          if (pestana) pestana.location.href = url; else window.open(url, '_blank');
          this.abriendoId = null;
          this.changeDetectorRef.markForCheck();
        },
        error: () => this.errorAlAbrir(pestana)
      }),
      error: () => this.errorAlAbrir(pestana)
    });
  }

  private errorAlAbrir(pestana: Window | null): void {
    pestana?.close();
    this.abriendoId = null;
    this.mostrarToast('error', 'No se encontró el documento anexo en el servidor de archivos.');
  }

  //ANTES DE BORRAR UN ARCHIVO SE VERIFICA QUE NINGÚN OTRO DIAGNÓSTICO LO SIGA USANDO; SI NO SE PUEDE VERIFICAR, NO SE BORRA:
  private borrarArchivosSinUso(nombres: string[]): Observable<unknown> {
    const carpeta = this.carpetaDocumentos;
    if (!nombres.length || !carpeta) return of(null);
    return new Observable(observador => {
      this.historialDiagnInicSeleccEquipIngService.findAllEngineerEquipmentInitialDiagnosisHistories().subscribe({
        next: registros => {
          const enUso = new Set((registros ?? []).map(registro => this.nombreArchivo(registro)).filter(Boolean));
          const borrados = [...new Set(nombres)].filter(nombre => !enUso.has(nombre)).map(nombre =>
            this.gestionArchivosService.deleteFile({ filePath: carpeta + nombre }).pipe(catchError(err => {
              console.error('ERROR AL BORRAR EL DOCUMENTO ANEXO ANTERIOR DEL DIAGNÓSTICO INICIAL: ', nombre, err);
              return of(null);
            }))
          );
          (borrados.length ? forkJoin(borrados) : of([])).subscribe(() => { observador.next(null); observador.complete(); });
        },
        error: err => {
          console.error('ERROR AL VERIFICAR EL USO DEL DOCUMENTO ANEXO ANTES DE BORRARLO: ', err);
          observador.next(null);
          observador.complete();
        }
      });
    });
  }

  private revertirSubida(ruta: string | null): void {
    if (!ruta) return;
    this.gestionArchivosService.deleteFile({ filePath: ruta }).subscribe({
      error: err => console.error('ERROR AL LIMPIAR EL DOCUMENTO ANEXO NO ASOCIADO: ', ruta, err)
    });
  }

  //CARGA EL CATÁLOGO DE ESTADOS DE DIAGNÓSTICO (COMBO DEL FORMULARIO Y LUCES DEL SEMÁFORO):
  private cargarEstadosDiagnosticos(): void {
    this.estadosDiagnosticosEquiposIngenierosService.findAllEngineerEquipmentDiagnosticStates(undefined, 'idEstadoDiagnosticoEquipoIngeniero', 'ASC')
      .subscribe({
        next: (estados) => {
          this.estadosDiagnosticosEquiposIngenieros = estados ?? [];
          this.recortarPagina();
        },
        error: (err) => console.error('ERROR AL CARGAR ESTADOS DE DIAGNÓSTICOS DE EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES REALIZADORAS DE MANTENIMIENTOS (ORDENADO POR SIGLA O ACRÓNIMO DE SU UNIDAD MILITAR):
  private cargarUnidadesMilitaresRealizadorasMantenimientos(): void {
    this.unidadesMilitaresRealizadorasMantenimientosService.findAllMaintenancePerformingMilitaryUnits()
      .subscribe({
        next: (realizadoras) => {
          this.unidadesMilitaresRealizadorasMantenimientos = [...(realizadoras ?? [])].sort((a, b) =>
            String(a.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '').localeCompare(String(b.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '')));
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR UNIDADES MILITARES REALIZADORAS DE MANTENIMIENTOS: ', err)
      });
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LA PALABRA CLAVE:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA LOS HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE (DEL ÚLTIMO REGISTRADO AL PRIMERO) Y SE QUEDA CON LOS DEL EQUIPO:
  accionListar(): void {
    const palabraClave = (this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm.value.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const idEquipoIngeniero = Number(this.equipoIngeniero.idEquipoIngeniero);

    this.historialDiagnInicSeleccEquipIngService.findAllEngineerEquipmentInitialDiagnosisHistories(undefined, keyword, 'idHistorialDiagnosticoInicialSeleccMttoEquipIng', 'DESC')
      .subscribe({
        next: (historiales) => {
          this.historialesEquipo = (historiales ?? []).filter(historial =>
            Number(historial.equipoIngenieroDTO?.idEquipoIngeniero) === idEquipoIngeniero);
          this.recortarPagina();
        },
        error: (err) => {
          console.error('ERROR AL LISTAR HISTORIAL DE DIAGNÓSTICOS INICIALES DE EQUIPOS DE INGENIEROS: ', err);
          this.historialesEquipo = [];
          this.recortarPagina();
        }
      });
  }

  //RECALCULA EL TOTAL Y EL SEMÁFORO Y RECORTA LA PÁGINA ACTUAL:
  private recortarPagina(): void {
    this.totalRegistros = this.historialesEquipo.length;
    this.contadores = this.estadosDiagnosticosEquiposIngenieros.map(estado => ({
      etiqueta: String(estado.nombreEstadoDiagnosticoEquipoIngeniero),
      tono: this.tonoEstado(estado.nombreEstadoDiagnosticoEquipoIngeniero),
      valor: this.historialesEquipo.filter(historial =>
        historial.estadoDiagnosticoEquipoIngenieroDTO?.idEstadoDiagnosticoEquipoIngeniero === estado.idEstadoDiagnosticoEquipoIngeniero).length
    }));
    const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina) - 1);
    this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
    const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
    this.historialesDiagnosticosInicialesSeleccMttoEquipIng = this.historialesEquipo.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
    this.verificarDocumentosPagina();
    this.changeDetectorRef.markForCheck();
  }

  private tonoEstado(nombreEstado: unknown): string {
    return TONOS_ESTADOS_DIAGNOSTICOS[String(nombreEstado ?? '').trim().toUpperCase()] ?? 'neutral';
  }

  //SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR DE LA REALIZADORA DEL MANTENIMIENTO. SE LEE CON CUIDADO PARA QUE LA TABLA NUNCA SE ROMPA SI EL BACKEND
  //LA ENVÍA INCOMPLETA (EJ. UN BACKEND SIN REINICIAR QUE AÚN LA DEVUELVE COMO UNIDAD MILITAR Y NO COMO REALIZADORA):
  siglaoAcronimoRealizadora(historial: HistorialDiagnInicSeleccEquipIngI): string {
    const realizadora = historial.unidadMilitarRealizadoraMantenimientoDTO as Partial<HistorialDiagnInicSeleccEquipIngI['unidadMilitarRealizadoraMantenimientoDTO']> | null | undefined;
    return String(realizadora?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '-');
  }

  //CLASE DEL BADGE DE ESTADO EN LA TABLA, CON EL MISMO TONO DE SU LUZ EN EL SEMÁFORO:
  claseEstado(nombreEstado: unknown): string {
    return `badge-${this.tonoEstado(nombreEstado)}`;
  }

  calcularTotalPaginas(): number {
    const total = Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina);
    return total > 0 ? total : 1;
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.recortarPagina();
  }

  seleccionarTandaNumeroRegistrosporPagina(): void {
    this.tandaNumeroRegistrosporPagina = Number(this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.recortarPagina();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', historial: HistorialDiagnInicSeleccEquipIngI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.historialDiagnosticoSeleccionado = historial;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(historial: HistorialDiagnInicSeleccEquipIngI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.historialDiagnosticoSeleccionado = historial;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  //MIENTRAS SE GUARDA NO SE CIERRA EL MODAL (PARA NO PERDER EL ESTADO DE LA SUBIDA):
  cerrarModalAddUpdDel(): void {
    if (this.guardando) return;
    this.modalAddUpdDelVisible = false;
    this.historialDiagnosticoSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.historialDiagnosticoSeleccionado = null;
  }

  //NOMBRE DEL ARCHIVO: ID DEL REGISTRO ENCRIPTADO (DOBLE base64) + EXTENSIÓN — MISMO PATRÓN QUE AddUpdDelHistorialIntegranteDocumentosComponent
  //Y ListadoUnidadesMilitaresComponent (encriptarIdUnidad). CON DÍGITOS EL RESULTADO SOLO TIENE LETRAS, NÚMEROS E "=" (VÁLIDO COMO NOMBRE):
  private encriptarId(id: number): string {
    let valor = String(id);
    for (let i = 0; i < 2; i++) valor = btoa(valor);
    return valor;
  }

  private nombreArchivoEncriptado(id: number, archivo: File): string {
    const extension = (archivo.name.split('.').pop() || '').toLowerCase();
    return `${this.encriptarId(id)}.${extension}`;
  }

  //EL BACKEND NO DEVUELVE EL REGISTRO CREADO: SE BUSCA EL ÚLTIMO REGISTRO DEL EQUIPO (EL DE MAYOR ID), QUE ES EL QUE SE ACABA DE CREAR:
  private obtenerRegistroCreado(): Observable<HistorialDiagnInicSeleccEquipIngI> {
    const idEquipoIngeniero = Number(this.equipoIngeniero.idEquipoIngeniero);
    return this.historialDiagnInicSeleccEquipIngService.findAllEngineerEquipmentInitialDiagnosisHistories(undefined, undefined, 'idHistorialDiagnosticoInicialSeleccMttoEquipIng', 'DESC').pipe(
      map(registros => {
        const creado = (registros ?? []).find(registro => Number(registro.equipoIngenieroDTO?.idEquipoIngeniero) === idEquipoIngeniero);
        if (!creado?.idHistorialDiagnosticoInicialSeleccMttoEquipIng) throw new Error('NO SE ENCONTRÓ EL REGISTRO CREADO');
        return creado;
      })
    );
  }

  //GUARDA EL REGISTRO Y SU DOCUMENTO ANEXO, CUYO NOMBRE ES EL ID DEL REGISTRO ENCRIPTADO:
  // - AL MODIFICAR (EL ID YA EXISTE): 1) SE SUBE EL ARCHIVO NUEVO, 2) SE GUARDA EL REGISTRO Y 3) SE BORRA EL ARCHIVO ANTERIOR SI SE QUITÓ O SI
  //   TENÍA OTRO NOMBRE. SI EL REGISTRO NO SE GUARDA, SE BORRA EL ARCHIVO SUBIDO (SALVO QUE TENGA EL MISMO NOMBRE DEL QUE YA TENÍA).
  // - AL CREAR (EL ID LO ASIGNA EL BACKEND): 1) SE CREA EL REGISTRO SIN ARCHIVO, 2) SE OBTIENE SU ID, 3) SE SUBE EL ARCHIVO CON EL ID
  //   ENCRIPTADO Y 4) SE ACTUALIZA EL REGISTRO CON ESE NOMBRE — MISMO ORDEN QUE LA FOTO DE UNA UNIDAD MILITAR NUEVA:
  guardarHistorialDiagnostico(evento: GuardadoHistorialDiagnosticoEvent): void {
    if (this.guardando) return;
    const carpeta = this.carpetaDocumentos;
    if (evento.archivo && !carpeta) {
      this.mostrarToast('error', 'No se pudo determinar la carpeta de los documentos (revise los parámetros del sistema y la carpeta de la unidad militar).');
      return;
    }
    this.guardando = true;
    this.changeDetectorRef.markForCheck();
    const historial: HistorialDiagnInicSeleccEquipIngI = { ...evento.historial };
    const idRegistro = historial.idHistorialDiagnosticoInicialSeleccMttoEquipIng;
    if (idRegistro) {
      this.modificarConArchivo(historial, idRegistro, evento);
    } else {
      this.crearConArchivo(historial, evento.archivo);
    }
  }

  private modificarConArchivo(historial: HistorialDiagnInicSeleccEquipIngI, idRegistro: number, evento: GuardadoHistorialDiagnosticoEvent): void {
    const carpeta = this.carpetaDocumentos;
    const nombreAnterior = this.nombreArchivo(this.historialDiagnosticoSeleccionado);
    let nombreNuevo = '';
    let subida$: Observable<unknown> = of(null);
    if (evento.archivo && carpeta) {
      nombreNuevo = this.nombreArchivoEncriptado(idRegistro, evento.archivo);
      historial.nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng = nombreNuevo;
      subida$ = this.gestionArchivosService.uploadFile(evento.archivo, carpeta + nombreNuevo);
    }
    //EL ARCHIVO ANTERIOR SE BORRA SI SE QUITÓ O SI SE REEMPLAZÓ POR OTRO CON DISTINTO NOMBRE (CON EL MISMO NOMBRE YA QUEDÓ SOBRESCRITO):
    const porBorrar = nombreAnterior && (evento.quitarArchivo || (nombreNuevo && nombreNuevo !== nombreAnterior)) ? nombreAnterior : '';
    const revertir = (): void => { if (nombreNuevo && nombreNuevo !== nombreAnterior) this.revertirSubida(carpeta + nombreNuevo); };
    subida$.subscribe({
      next: () => this.historialDiagnInicSeleccEquipIngService.updateEngineerEquipmentInitialDiagnosisHistory(historial).subscribe({
        next: respuesta => {
          if (respuesta.banderaexito === false) {
            revertir();
            this.terminarConError(respuesta.mensaje || 'No fue posible guardar el diagnóstico inicial.');
            return;
          }
          this.borrarArchivosSinUso(porBorrar ? [porBorrar] : []).subscribe(() => {
            [porBorrar, nombreNuevo].filter(Boolean).forEach(nombre => this.existenciaDocumentos.delete(nombre));
            this.terminarGuardado(respuesta.mensaje || 'Diagnóstico inicial modificado correctamente.');
          });
        },
        error: err => {
          console.error('ERROR AL GUARDAR DIAGNÓSTICO INICIAL DE EQUIPO DE INGENIEROS: ', err);
          revertir();
          this.terminarConError(err.error?.mensaje || 'Error al guardar el diagnóstico inicial.');
        }
      }),
      error: err => {
        console.error('ERROR AL SUBIR EL DOCUMENTO ANEXO DEL DIAGNÓSTICO INICIAL: ', err);
        this.terminarConError('No se pudo subir el documento anexo al servidor de archivos.');
      }
    });
  }

  private crearConArchivo(historial: HistorialDiagnInicSeleccEquipIngI, archivo: File | null): void {
    historial.nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng = null;
    this.historialDiagnInicSeleccEquipIngService.addEngineerEquipmentInitialDiagnosisHistory(historial).subscribe({
      next: respuesta => {
        if (respuesta.banderaexito === false) {
          this.terminarConError(respuesta.mensaje || 'No fue posible guardar el diagnóstico inicial.');
          return;
        }
        const mensaje = respuesta.mensaje || 'Diagnóstico inicial creado correctamente.';
        const carpeta = this.carpetaDocumentos;
        if (!archivo || !carpeta) {
          this.terminarGuardado(mensaje);
          return;
        }
        let rutaSubida = '';
        this.obtenerRegistroCreado().pipe(
          switchMap(creado => {
            const nombre = this.nombreArchivoEncriptado(Number(creado.idHistorialDiagnosticoInicialSeleccMttoEquipIng), archivo);
            rutaSubida = carpeta + nombre;
            return this.gestionArchivosService.uploadFile(archivo, rutaSubida).pipe(
              switchMap(() => this.historialDiagnInicSeleccEquipIngService.updateEngineerEquipmentInitialDiagnosisHistory({ ...creado, nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng: nombre })),
              map(actualizado => { if (actualizado.banderaexito === false) throw new Error(actualizado.mensaje); })
            );
          })
        ).subscribe({
          next: () => this.terminarGuardado(mensaje),
          error: err => {
            console.error('ERROR AL ASOCIAR EL DOCUMENTO ANEXO AL DIAGNÓSTICO INICIAL CREADO: ', err);
            if (rutaSubida) this.revertirSubida(rutaSubida);
            this.terminarGuardado('El diagnóstico inicial se creó, pero no se pudo guardar su documento anexo. Modifíquelo para adjuntarlo de nuevo.', 'error');
          }
        });
      },
      error: err => {
        console.error('ERROR AL GUARDAR DIAGNÓSTICO INICIAL DE EQUIPO DE INGENIEROS: ', err);
        this.terminarConError(err.error?.mensaje || 'Error al guardar el diagnóstico inicial.');
      }
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA: SE MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private terminarConError(mensaje: string): void {
    this.guardando = false;
    this.mostrarToast('error', mensaje);
  }

  private terminarGuardado(mensaje: string, tipo: 'exito' | 'error' = 'exito'): void {
    this.guardando = false;
    this.mostrarToast(tipo, mensaje);
    this.cerrarModalAddUpdDel();
    this.accionListar();
  }

  //ELIMINA EL DIAGNÓSTICO SELECCIONADO Y TAMBIÉN SU DOCUMENTO ANEXO DEL SERVIDOR DE ARCHIVOS:
  eliminarHistorialDiagnostico(idHistorialDiagnosticoInicialSeleccMttoEquipIng: number): void {
    if (this.guardando) return;
    const archivo = this.nombreArchivo(this.historialDiagnosticoSeleccionado);
    this.guardando = true;
    this.changeDetectorRef.markForCheck();
    this.historialDiagnInicSeleccEquipIngService.deleteEngineerEquipmentInitialDiagnosisHistory(idHistorialDiagnosticoInicialSeleccMttoEquipIng).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.guardando = false;
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible eliminar el diagnóstico inicial.');
          return;
        }
        this.borrarArchivosSinUso(archivo ? [archivo] : []).subscribe(() => {
          this.guardando = false;
          this.mostrarToast('exito', respuesta.mensaje || 'Diagnóstico inicial eliminado correctamente.');
          this.cerrarModalAddUpdDel();
          this.accionListar();
        });
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR DIAGNÓSTICO INICIAL DE EQUIPO DE INGENIEROS: ', err);
        this.guardando = false;
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el diagnóstico inicial.');
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
