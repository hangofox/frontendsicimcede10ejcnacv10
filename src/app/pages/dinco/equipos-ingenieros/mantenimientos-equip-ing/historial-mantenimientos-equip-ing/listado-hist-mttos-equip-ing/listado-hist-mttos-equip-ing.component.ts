import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { HistorialMantenimientosEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/historial-mantenimientos-equip-ing/historial-mantenimientos-equip-ing.interface';
import { TiposMantenimientosEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/tipos-mantenimientos-equip-ing/tipos-mantenimientos-equip-ing.interface';
import { NivelesMantenimientosEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/niveles-mantenimientos-equip-ing/niveles-mantenimientos-equip-ing.interface';
import { UnidadesMilitaresI } from '../../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposFuentesFinanciacionI } from '../../../../../../interfaces/tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface';

import { HistorialMantenimientosEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/mantenimientos-equip-ing/historial-mantenimientos-equip-ing/historial-mantenimientos-equip-ing.service';
import { TiposMantenimientosEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/mantenimientos-equip-ing/tipos-mantenimientos-equip-ing/tipos-mantenimientos-equip-ing.service';
import { NivelesMantenimientosEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/mantenimientos-equip-ing/niveles-mantenimientos-equip-ing/niveles-mantenimientos-equip-ing.service';
import { UnidadesMilitaresService } from '../../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposFuentesFinanciacionService } from '../../../../../../services/tipos-fuentes-financiacion/tipos-fuentes-financiacion.service';
import { SpinnerService } from '../../../../../../services/spinner/spinner.service';
import { ParametrosSistemaService } from '../../../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';
import { obtenerCarpetaDocumentosContratosMttoEquipIng } from '../../mantenimientos-equip-ing/add-upd-del-hist-mtto-equip-ing/add-upd-del-hist-mtto-equip-ing.component';

import { VistaHistMttoEquipIngComponent } from '../vista-hist-mtto-equip-ing/vista-hist-mtto-equip-ing.component';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { OrdenarPorSiglaPipe } from '../../../../../../shared/pipes/ordenar-por-sigla.pipe';

//FORMULARIO DE CREAR / MODIFICAR / ELIMINAR: COMO EN MANTENIMIENTOS DE INFRAESTRUCTURAS, ESTE LISTADO SOLO MUESTRA EL HISTORIAL; EL
//FORMULARIO ES UNA PÁGINA APARTE EN mantenimientos-equip-ing (SE CREA DESDE LA OPCIÓN DE MANTENIMIENTO Y SE MODIFICA / ELIMINA DESDE
//LOS BOTONES DE CADA REGISTRO DE ESTA TABLA):
const RUTA_FORMULARIO_MANTENIMIENTO = '/dinco/equipos-ingenieros/mantenimientos-equip-ing/mantenimientos-equip-ing/add-upd-del-hist-mtto-equip-ing';

//TONOS DE SemaforoContadoresComponent QUE SE VAN ASIGNANDO, EN ORDEN, A CADA TIPO DE MANTENIMIENTO DEL CATÁLOGO:
const TONOS_TIPOS_MANTENIMIENTO = ['verificacion', 'aprobacion', 'regular', 'asignacion', 'rechazado', 'mantenimiento', 'validacion', 'patrimonial', 'neutral'];

@Component({
  selector: 'app-listado-hist-mttos-equip-ing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, VistaHistMttoEquipIngComponent, SemaforoContadoresComponent, OrdenarPorSiglaPipe],
  templateUrl: './listado-hist-mttos-equip-ing.component.html',
  styleUrl: './listado-hist-mttos-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoHistMttosEquipIngComponent implements OnInit, OnDestroy {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBOS DE FILTRO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  nivelesMantenimientosEquipIng: NivelesMantenimientosEquipIngI[] = [];
  tiposMantenimientosEquipIng: TiposMantenimientosEquipIngI[] = [];
  tiposFuentesFinanciacion: TiposFuentesFinanciacionI[] = [];

  //HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE (BÚSQUEDA DEL BACKEND) Y, DE ELLOS, LOS QUE ADEMÁS CUMPLEN LOS COMBOS DE FILTRO.
  //HistorialMantenimientoEquipoIngenieroController SOLO FILTRA POR PALABRA CLAVE (NÚMERO DE REGISTRO), ASÍ QUE LOS COMBOS, EL
  //SEMÁFORO Y LA PAGINACIÓN SE RESUELVEN AQUÍ SOBRE EL RESULTADO DE LA BÚSQUEDA:
  private historialesBusqueda: HistorialMantenimientosEquipIngI[] = [];
  private historialesFiltrados: HistorialMantenimientosEquipIngI[] = [];
  //BASE DEL SEMÁFORO: LOS FILTRADOS POR TODO MENOS POR EL COMBO DE TIPO DE MANTENIMIENTO.
  private historialesSemaforo: HistorialMantenimientosEquipIngI[] = [];

  //PÁGINA ACTUAL QUE SE MUESTRA EN LA TABLA:
  historialesMantenimientosEquiposIngenieros: HistorialMantenimientosEquipIngI[] = [];
  totalRegistros = 0;

  //SEMÁFORO AL LADO DEL TOTAL DE REGISTROS: UNA LUZ POR CADA TIPO DE MANTENIMIENTO DEL CATÁLOGO (EL COMBO DE TIPO NO LO RECORTA,
  //PARA QUE SE SIGAN VIENDO LOS DEMÁS TIPOS):
  tiposMantenimientoContadores: { etiqueta: string; tono: string; valor: number }[] = [];

  historialesMantenimientosEquiposIngenierosForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalVistaVisible = false;
  historialMantenimientoEquipoIngenieroSeleccionado: HistorialMantenimientosEquipIngI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  //REGISTRO CUYO DOCUMENTO ANEXO SE ESTÁ ABRIENDO EN OTRA PESTAÑA (PARA DESHABILITAR LOS BOTONES MIENTRAS SE DESCARGA):
  abriendoId: number | null = null;
  //URLs blob: ABIERTAS EN OTRAS PESTAÑAS, QUE SE LIBERAN AL SALIR DEL LISTADO:
  private readonly urlsAbiertas: string[] = [];
  //EXISTENCIA DEL DOCUMENTO ANEXO EN EL SERVIDOR POR REGISTRO (null MIENTRAS SE VERIFICA) Y CARPETA DE DOCUMENTOS POR UNIDAD MILITAR:
  private readonly existenciaDocumentos = new Map<string, boolean | null>();
  private readonly carpetasPorUnidad = new Map<string, Observable<string>>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private historialMantenimientosEquipIngService: HistorialMantenimientosEquipIngService,
    private tiposMantenimientosEquipIngService: TiposMantenimientosEquipIngService,
    private nivelesMantenimientosEquipIngService: NivelesMantenimientosEquipIngService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private tiposFuentesFinanciacionService: TiposFuentesFinanciacionService,
    private spinnerService: SpinnerService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService
  ) {
    this.historialesMantenimientosEquiposIngenierosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxIdNivelMantenimientoEquipoIngenieroSeleccionado: new FormControl(''),
      cboxIdTipoMantenimientoEquipoIngenieroSeleccionado: new FormControl(''),
      cboxIdTipoFuenteFinanciacionSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarNivelesMantenimientosEquipIng();
    this.cargarTiposMantenimientosEquipIng();
    this.cargarTiposFuentesFinanciacion();
    this.accionListar();
    this.mostrarMensajeDelFormulario();
  }

  ngOnDestroy(): void {
    this.urlsAbiertas.forEach(url => URL.revokeObjectURL(url));
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  nombreArchivo(historial: HistorialMantenimientosEquipIngI | null | undefined): string {
    return String(historial?.nombreArchivoDocumentoAnexoContratoMttoEquipIng ?? '').trim();
  }

  //ABRE EL DOCUMENTO ANEXO DEL CONTRATO EN OTRA PESTAÑA (CARPETA DE LA UNIDAD MILITAR DEL EQUIPO + getFile + getFileBytes, CON EL TOKEN
  //DE AUTORIZACIÓN) — MISMO PATRÓN QUE ListadoDocumentacionAnexaSolicMttoComponent. LA PESTAÑA SE ABRE ANTES DE LA DESCARGA PARA QUE EL
  //NAVEGADOR NO LA BLOQUEE COMO VENTANA EMERGENTE:
  abrirArchivo(historial: HistorialMantenimientosEquipIngI): void {
    const nombre = this.nombreArchivo(historial);
    if (!nombre || this.abriendoId !== null) return;
    const pestana = window.open('', '_blank');
    this.abriendoId = historial.idHistorialMantenimientoEquipoIngeniero ?? null;
    const esPdf = nombre.toLowerCase().endsWith('.pdf');
    obtenerCarpetaDocumentosContratosMttoEquipIng(historial.equipoIngenieroDTO, this.parametrosSistemaService, this.unidadesMilitaresService).subscribe({
      next: carpeta => this.gestionArchivosService.getFile(carpeta + nombre).subscribe({
        next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
          next: bytes => {
            const url = URL.createObjectURL(esPdf ? new Blob([bytes], { type: 'application/pdf' }) : bytes);
            this.urlsAbiertas.push(url);
            if (pestana) pestana.location.href = url; else window.open(url, '_blank');
            this.abriendoId = null;
            this.changeDetectorRef.markForCheck();
          },
          error: () => this.errorAlAbrir(pestana)
        }),
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

  //AL VOLVER DEL FORMULARIO TRAS MODIFICAR O ELIMINAR, ÉSTE DEJA EL MENSAJE DEL RESULTADO EN EL ESTADO DE NAVEGACIÓN; SE MUESTRA
  //EN EL TOAST Y SE BORRA DEL ESTADO PARA QUE NO VUELVA A SALIR AL RECARGAR O AL REGRESAR CON EL BOTÓN ATRÁS DEL NAVEGADOR:
  private mostrarMensajeDelFormulario(): void {
    const estado = history.state as { toastMensaje?: string; toastTipo?: 'exito' | 'error' } | null;
    if (!estado?.toastMensaje) return;
    this.mostrarToast(estado.toastTipo === 'error' ? 'error' : 'exito', estado.toastMensaje);
    const { toastMensaje, toastTipo, ...resto } = estado;
    history.replaceState(resto, '');
  }

  //PASA EL TEXTO A MAYÚSCULA, LE QUITA LAS TILDES Y DEJA UN SOLO ESPACIO ENTRE PALABRAS (EJ. "Jemop " → "JEMOP"):
  private normalizarTexto(texto: unknown): string {
    return String(texto ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/\s+/g, ' ').trim();
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES DESDE EL BACKEND (COMBO DE FILTRO):
  private cargarUnidadesMilitares(): void {
    this.unidadesMilitaresService.findAllMilitaryUnits(undefined, undefined, 'nombreUnidadMilitar', 'ASC')
      .subscribe({
        next: (unidadesMilitares) => {
          this.unidadesMilitares = unidadesMilitares ?? [];
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR UNIDADES MILITARES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE NIVELES DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS (COMBO DE FILTRO):
  private cargarNivelesMantenimientosEquipIng(): void {
    this.nivelesMantenimientosEquipIngService.findAllLevelsOfEngineerEquipmentMaintenance(undefined, undefined, 'idNivelMantenimientoEquipoIngeniero', 'ASC')
      .subscribe({
        next: (niveles) => {
          this.nivelesMantenimientosEquipIng = niveles ?? [];
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR NIVELES DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS (COMBO DE FILTRO Y LUCES DEL SEMÁFORO):
  private cargarTiposMantenimientosEquipIng(): void {
    this.tiposMantenimientosEquipIngService.findAllTypesOfEngineerEquipmentMaintenance(undefined, undefined, 'nombreTipoMantenimientoEquipoIngeniero', 'ASC')
      .subscribe({
        next: (tipos) => {
          this.tiposMantenimientosEquipIng = tipos ?? [];
          this.calcularSemaforo();
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE FUENTES DE FINANCIACIÓN (COMBO DE FILTRO):
  private cargarTiposFuentesFinanciacion(): void {
    this.tiposFuentesFinanciacionService.findAllTypesOfFundingSources(undefined, undefined, 'nombreTipoFuenteFinanciacion', 'ASC')
      .subscribe({
        next: (tiposFuentesFinanciacion) => {
          this.tiposFuentesFinanciacion = tiposFuentesFinanciacion ?? [];
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE FUENTES DE FINANCIACIÓN: ', err)
      });
  }

  //BOTÓN BUSCAR Y ENTER DE LA PALABRA CLAVE: RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //COMBOS DE FILTRO: NO HACE FALTA VOLVER AL BACKEND, SE FILTRA EL RESULTADO DE LA ÚLTIMA BÚSQUEDA:
  filtrar(): void {
    this.paginaActual = 0;
    this.aplicarFiltros();
  }

  //CONSULTA AL BACKEND LOS HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE (DEL ÚLTIMO REGISTRADO AL PRIMERO; SE ORDENA POR EL ID,
  //COMO LOS DEMÁS LISTADOS) Y LUEGO APLICA LOS COMBOS DE FILTRO, EL SEMÁFORO Y LA PAGINACIÓN:
  accionListar(): void {
    const palabraClave = (this.historialesMantenimientosEquiposIngenierosForm.value.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;

    this.historialMantenimientosEquipIngService.findAllEngineerEquipmentMaintenanceHistories(undefined, keyword, 'idHistorialMantenimientoEquipoIngeniero', 'DESC')
      .subscribe({
        next: (historiales) => {
          this.historialesBusqueda = historiales ?? [];
          this.aplicarFiltros();
        },
        error: (err) => {
          console.error('ERROR AL LISTAR HISTORIALES DE MANTENIMIENTOS DE EQUIPOS DE INGENIEROS: ', err);
          this.historialesBusqueda = [];
          this.aplicarFiltros();
        }
      });
  }

  //FILTRA EL RESULTADO DE LA BÚSQUEDA POR LOS COMBOS (UNIDAD MILITAR DEL EQUIPO, NIVEL, TIPO DE MANTENIMIENTO Y FUENTE DE
  //FINANCIACIÓN), RECALCULA EL TOTAL Y EL SEMÁFORO Y RECORTA LA PÁGINA ACTUAL:
  private aplicarFiltros(): void {
    const valoresFormulario = this.historialesMantenimientosEquiposIngenierosForm.value;
    this.historialesSemaforo = this.historialesBusqueda.filter(historial =>
      this.cumpleUnidadMilitar(historial, valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado) &&
      this.cumpleNivelMantenimiento(historial, valoresFormulario.cboxIdNivelMantenimientoEquipoIngenieroSeleccionado) &&
      this.cumpleFuenteFinanciacion(historial, valoresFormulario.cboxIdTipoFuenteFinanciacionSeleccionado));
    this.historialesFiltrados = this.historialesSemaforo.filter(historial =>
      this.cumpleTipoMantenimiento(historial, valoresFormulario.cboxIdTipoMantenimientoEquipoIngenieroSeleccionado));
    this.totalRegistros = this.historialesFiltrados.length;
    this.calcularSemaforo();
    //SI LA PÁGINA ACTUAL QUEDÓ FUERA DE RANGO (EJ. AL ELIMINAR EL ÚLTIMO REGISTRO DE LA ÚLTIMA PÁGINA), SE VUELVE A LA ÚLTIMA:
    this.paginaActual = Math.min(this.paginaActual, this.calcularTotalPaginas() - 1);
    this.recortarPagina();
  }

  private cumpleUnidadMilitar(historial: HistorialMantenimientosEquipIngI, siglaoAcronimo: string): boolean {
    if (!siglaoAcronimo) return true;
    return this.normalizarTexto(historial.equipoIngenieroDTO?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar) === this.normalizarTexto(siglaoAcronimo);
  }

  private cumpleNivelMantenimiento(historial: HistorialMantenimientosEquipIngI, idNivel: string): boolean {
    if (!idNivel) return true;
    return Number(historial.nivelMantenimientoEquipoIngenieroDTO?.idNivelMantenimientoEquipoIngeniero) === Number(idNivel);
  }

  private cumpleTipoMantenimiento(historial: HistorialMantenimientosEquipIngI, idTipo: string): boolean {
    if (!idTipo) return true;
    return Number(historial.tipoMantenimientoEquipoIngenieroDTO?.idTipoMantenimientoEquipoIngeniero) === Number(idTipo);
  }

  private cumpleFuenteFinanciacion(historial: HistorialMantenimientosEquipIngI, idFuente: string): boolean {
    if (!idFuente) return true;
    return Number(historial.tipoFuenteFinanciacionDTO?.idTipoFuenteFinanciacion) === Number(idFuente);
  }

  //UNA LUZ POR TIPO DE MANTENIMIENTO DEL CATÁLOGO, CON SU CANTIDAD DE HISTORIALES:
  private calcularSemaforo(): void {
    const historiales = this.historialesSemaforo;
    this.tiposMantenimientoContadores = this.tiposMantenimientosEquipIng.map((tipo, indice) => ({
      etiqueta: this.normalizarTexto(tipo.nombreTipoMantenimientoEquipoIngeniero),
      tono: TONOS_TIPOS_MANTENIMIENTO[indice % TONOS_TIPOS_MANTENIMIENTO.length],
      valor: historiales.filter(historial =>
        Number(historial.tipoMantenimientoEquipoIngenieroDTO?.idTipoMantenimientoEquipoIngeniero) === Number(tipo.idTipoMantenimientoEquipoIngeniero)).length
    }));
  }

  private recortarPagina(): void {
    const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
    this.historialesMantenimientosEquiposIngenieros = this.historialesFiltrados.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
    this.verificarDocumentosPagina();
    this.changeDetectorRef.markForCheck();
  }

  //VERIFICA EN EL SERVIDOR DE ARCHIVOS SI EL DOCUMENTO ANEXO DE CADA REGISTRO DE LA PÁGINA EXISTE DE VERDAD (UN REGISTRO PUEDE TENER EL
  //NOMBRE GUARDADO SIN QUE EL ARCHIVO ESTÉ EN LA CARPETA). SOLO SE CONSULTAN LOS DE LA PÁGINA VISIBLE Y CADA RESULTADO QUEDA EN CACHÉ;
  //LA CARPETA SE RESUELVE UNA VEZ POR UNIDAD MILITAR:
  private verificarDocumentosPagina(): void {
    this.historialesMantenimientosEquiposIngenieros.forEach(historial => {
      const clave = this.claveDocumento(historial);
      if (!clave || this.existenciaDocumentos.has(clave)) return;
      this.existenciaDocumentos.set(clave, null);
      this.carpetaDocumentosEquipo(historial).pipe(
        switchMap(carpeta => this.gestionArchivosService.getFile(carpeta + this.nombreArchivo(historial))),
        map(() => true),
        catchError(() => of(false))
      ).subscribe(existe => {
        this.existenciaDocumentos.set(clave, existe);
        this.changeDetectorRef.markForCheck();
      });
    });
  }

  //CLAVE DE CACHÉ: EQUIPO + NOMBRE DEL ARCHIVO (SI CAMBIA CUALQUIERA DE LOS DOS SE VUELVE A VERIFICAR):
  private claveDocumento(historial: HistorialMantenimientosEquipIngI): string {
    const nombre = this.nombreArchivo(historial);
    return nombre ? `${historial.equipoIngenieroDTO?.idEquipoIngeniero}|${nombre}` : '';
  }

  private carpetaDocumentosEquipo(historial: HistorialMantenimientosEquipIngI): Observable<string> {
    const clave = String(historial.equipoIngenieroDTO?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '');
    let carpeta$ = this.carpetasPorUnidad.get(clave);
    if (!carpeta$) {
      carpeta$ = obtenerCarpetaDocumentosContratosMttoEquipIng(historial.equipoIngenieroDTO, this.parametrosSistemaService, this.unidadesMilitaresService).pipe(shareReplay(1));
      this.carpetasPorUnidad.set(clave, carpeta$);
    }
    return carpeta$;
  }

  //ESTADO DEL DOCUMENTO ANEXO EN LA TABLA: 'si' (EXISTE: BOTÓN), 'no' (SIN NOMBRE O SIN ARCHIVO EN EL SERVIDOR: "NO") O 'verificando' ("..."):
  estadoDocumento(historial: HistorialMantenimientosEquipIngI): 'si' | 'no' | 'verificando' {
    const clave = this.claveDocumento(historial);
    if (!clave) return 'no';
    const existe = this.existenciaDocumentos.get(clave);
    return existe === undefined || existe === null ? 'verificando' : existe ? 'si' : 'no';
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
    this.tandaNumeroRegistrosporPagina = Number(this.historialesMantenimientosEquiposIngenierosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.recortarPagina();
  }

  //FECHA DEL MANTENIMIENTO PARA LA TABLA: EL BACKEND LA MAPEA COMO java.util.Date Y PUEDE LLEGAR COMO TEXTO ISO O COMO MILISEGUNDOS;
  //SE MUESTRA COMO YYYY-MM-DD HH:mm EN HORA LOCAL:
  formatearFecha(fecha: unknown): string {
    if (fecha === null || fecha === undefined || fecha === '') return '-';
    const valor = typeof fecha === 'number' || /^\d+$/.test(String(fecha)) ? new Date(Number(fecha)) : new Date(String(fecha).replace(' ', 'T'));
    if (isNaN(valor.getTime())) return String(fecha);
    const dosDigitos = (numero: number): string => String(numero).padStart(2, '0');
    return `${valor.getFullYear()}-${dosDigitos(valor.getMonth() + 1)}-${dosDigitos(valor.getDate())} ${dosDigitos(valor.getHours())}:${dosDigitos(valor.getMinutes())}`;
  }

  //VALOR DEL COSTO PARA LA TABLA: EN LA TABLA ES VARCHAR2; SI ES NUMÉRICO SE MUESTRA CON SEPARADOR DE MILES Y SIGNO DE PESOS:
  formatearValor(valor: unknown): string {
    const texto = String(valor ?? '').trim();
    if (!texto) return '-';
    const numero = Number(texto.replace(/[^\d.-]/g, ''));
    return !isNaN(numero) && /\d/.test(texto) ? '$ ' + numero.toLocaleString('es-CO') : texto;
  }

  //BOTONES MODIFICAR Y ELIMINAR DE CADA REGISTRO: ABREN LA PÁGINA DEL FORMULARIO EN mantenimientos-equip-ing CON EL MODO Y EL ID:
  irAlFormulario(modo: 'modificar' | 'eliminar', historial: HistorialMantenimientosEquipIngI): void {
    if (!historial.idHistorialMantenimientoEquipoIngeniero) return;
    this.router.navigate([RUTA_FORMULARIO_MANTENIMIENTO], { queryParams: { modo, id: historial.idHistorialMantenimientoEquipoIngeniero } });
  }

  abrirModalVista(historial: HistorialMantenimientosEquipIngI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.historialMantenimientoEquipoIngenieroSeleccionado = historial;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.historialMantenimientoEquipoIngenieroSeleccionado = null;
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
