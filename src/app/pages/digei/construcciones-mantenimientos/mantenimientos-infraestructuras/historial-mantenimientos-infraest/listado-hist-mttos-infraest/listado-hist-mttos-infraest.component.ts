import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { HistorialMantenimientosInfraestI } from '../../../../../../interfaces/digei/mantenimientos-infraestructuras/historial-mantenimientos-infraest/historial-mantenimientos-infraest.interface';
import { TiposMantenimientosInfraestructurasI } from '../../../../../../interfaces/digei/mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { InfraestructurasI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';
import { TiposFuentesFinanciacionI } from '../../../../../../interfaces/tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface';

import { HistorialMantenimientosInfraestService } from '../../../../../../services/digei/mantenimientos-infraestructuras/historial-mantenimientos-infraest/historial-mantenimientos-infraest.service';
import { TiposMantenimientosInfraestructurasService } from '../../../../../../services/digei/mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras.service';
import { UnidadesMilitaresService } from '../../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { InfraestructurasService } from '../../../../../../services/digei/finca-raiz/infraestructuras/infraestructuras.service';
import { TiposFuentesFinanciacionService } from '../../../../../../services/tipos-fuentes-financiacion/tipos-fuentes-financiacion.service';
import { SpinnerService } from '../../../../../../services/spinner/spinner.service';

import { AddUpdDelHistorialMantenimientoInfraestComponent } from '../add-upd-del-hist-mtto-infraest/add-upd-del-hist-mtto-infraest.component';
import { VistaHistorialMantenimientoInfraestComponent } from '../vista-hist-mtto-infraest/vista-hist-mtto-infraest.component';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { OrdenarPorSiglaPipe } from '../../../../../../shared/pipes/ordenar-por-sigla.pipe';

//TONOS DE SemaforoContadoresComponent QUE SE VAN ASIGNANDO, EN ORDEN, A CADA TIPO DE MANTENIMIENTO DEL CATÁLOGO:
const TONOS_TIPOS_MANTENIMIENTO = ['verificacion', 'aprobacion', 'regular', 'asignacion', 'rechazado', 'mantenimiento', 'validacion', 'patrimonial', 'neutral'];

@Component({
  selector: 'app-listado-hist-mttos-infraest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelHistorialMantenimientoInfraestComponent, VistaHistorialMantenimientoInfraestComponent, SemaforoContadoresComponent, OrdenarPorSiglaPipe],
  templateUrl: './listado-hist-mttos-infraest.component.html',
  styleUrl: './listado-hist-mttos-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoHistorialMantenimientosInfraestComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBOS DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposMantenimientosInfraestructuras: TiposMantenimientosInfraestructurasI[] = [];
  tiposFuentesFinanciacion: TiposFuentesFinanciacionI[] = [];
  infraestructuras: InfraestructurasI[] = [];

  //HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE (BÚSQUEDA DEL BACKEND) Y, DE ELLOS, LOS QUE ADEMÁS CUMPLEN LOS COMBOS DE FILTRO.
  //HistorialMantenimientoInfraestructuraController SOLO FILTRA POR PALABRA CLAVE (NO POR UNIDAD MILITAR, TIPO DE MANTENIMIENTO NI
  //FUENTE DE FINANCIACIÓN), ASÍ QUE LOS COMBOS, EL SEMÁFORO Y LA PAGINACIÓN SE RESUELVEN AQUÍ SOBRE EL RESULTADO DE LA BÚSQUEDA:
  private historialesBusqueda: HistorialMantenimientosInfraestI[] = [];
  private historialesFiltrados: HistorialMantenimientosInfraestI[] = [];
  //BASE DEL SEMÁFORO: LOS FILTRADOS POR TODO MENOS POR EL COMBO DE TIPO DE MANTENIMIENTO.
  private historialesSemaforo: HistorialMantenimientosInfraestI[] = [];

  //PÁGINA ACTUAL QUE SE MUESTRA EN LA TABLA:
  historialesMantenimientosInfraestructuras: HistorialMantenimientosInfraestI[] = [];
  totalRegistros = 0;

  //SEMÁFORO AL LADO DEL TOTAL DE REGISTROS: UNA LUZ POR CADA TIPO DE MANTENIMIENTO DEL CATÁLOGO, CON LA CANTIDAD DE HISTORIALES DE
  //ESE TIPO SEGÚN LA PALABRA CLAVE Y LOS COMBOS DE UNIDAD MILITAR Y FUENTE DE FINANCIACIÓN (EL COMBO DE TIPO NO LO RECORTA, PARA QUE
  //SE SIGAN VIENDO LOS DEMÁS TIPOS):
  tiposMantenimientoContadores: { etiqueta: string; tono: string; valor: number }[] = [];

  historialesMantenimientosInfraestructurasForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  historialMantenimientoInfraestructuraSeleccionado: HistorialMantenimientosInfraestI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private historialMantenimientosInfraestService: HistorialMantenimientosInfraestService,
    private tiposMantenimientosInfraestructurasService: TiposMantenimientosInfraestructurasService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private infraestructurasService: InfraestructurasService,
    private tiposFuentesFinanciacionService: TiposFuentesFinanciacionService,
    private spinnerService: SpinnerService
  ) {
    this.historialesMantenimientosInfraestructurasForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxIdTipoMantenimientoInfraestructuraSeleccionado: new FormControl(''),
      cboxIdTipoFuenteFinanciacionSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarTiposMantenimientosInfraestructuras();
    this.cargarTiposFuentesFinanciacion();
    this.cargarInfraestructuras();
    this.accionListar();
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
          this.unidadesMilitares = unidadesMilitares;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR UNIDADES MILITARES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE MANTENIMIENTO DE INFRAESTRUCTURA (COMBO DE FILTRO, COMBO DEL FORMULARIO Y LUCES DEL SEMÁFORO):
  private cargarTiposMantenimientosInfraestructuras(): void {
    this.tiposMantenimientosInfraestructurasService.findAllTypesOfInfrastructureMaintenance(undefined, undefined, 'nombreTipoMantenimientoInfraestructura', 'ASC')
      .subscribe({
        next: (tiposMantenimientosInfraestructuras) => {
          this.tiposMantenimientosInfraestructuras = tiposMantenimientosInfraestructuras;
          this.calcularSemaforo();
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE MANTENIMIENTO DE INFRAESTRUCTURA: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE FUENTES DE FINANCIACIÓN (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
  private cargarTiposFuentesFinanciacion(): void {
    this.tiposFuentesFinanciacionService.findAllTypesOfFundingSources(undefined, undefined, 'nombreTipoFuenteFinanciacion', 'ASC')
      .subscribe({
        next: (tiposFuentesFinanciacion) => {
          this.tiposFuentesFinanciacion = tiposFuentesFinanciacion;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE FUENTES DE FINANCIACIÓN: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE INFRAESTRUCTURAS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarInfraestructuras(): void {
    this.infraestructurasService.findAllInfrastructures(undefined, undefined, undefined, 'denominacionInfraestructura', 'ASC')
      .subscribe({
        next: (infraestructuras) => {
          this.infraestructuras = infraestructuras;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR INFRAESTRUCTURAS: ', err)
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

  //CONSULTA AL BACKEND LOS HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE (DEL ÚLTIMO REGISTRADO AL PRIMERO; SE ORDENA POR EL ID, COMO LOS DEMÁS LISTADOS) Y LUEGO
  //APLICA LOS COMBOS DE FILTRO, EL SEMÁFORO Y LA PAGINACIÓN:
  accionListar(): void {
    const palabraClave = (this.historialesMantenimientosInfraestructurasForm.value.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;

    this.historialMantenimientosInfraestService.findAllInfrastructureMaintenanceHistories(undefined, keyword, 'idHistorialMantenimientoInfraestructura', 'DESC')
      .subscribe({
        next: (historiales) => {
          this.historialesBusqueda = historiales ?? [];
          this.aplicarFiltros();
        },
        error: (err) => {
          console.error('ERROR AL LISTAR HISTORIALES DE MANTENIMIENTOS DE INFRAESTRUCTURAS: ', err);
          this.historialesBusqueda = [];
          this.aplicarFiltros();
        }
      });
  }

  //FILTRA EL RESULTADO DE LA BÚSQUEDA POR LOS COMBOS (UNIDAD MILITAR DE LA INFRAESTRUCTURA, TIPO DE MANTENIMIENTO Y FUENTE DE
  //FINANCIACIÓN), RECALCULA EL TOTAL Y EL SEMÁFORO Y RECORTA LA PÁGINA ACTUAL:
  private aplicarFiltros(): void {
    const valoresFormulario = this.historialesMantenimientosInfraestructurasForm.value;
    this.historialesSemaforo = this.historialesBusqueda.filter(historial =>
      this.cumpleUnidadMilitar(historial, valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado) &&
      this.cumpleFuenteFinanciacion(historial, valoresFormulario.cboxIdTipoFuenteFinanciacionSeleccionado));
    this.historialesFiltrados = this.historialesSemaforo.filter(historial =>
      this.cumpleTipoMantenimiento(historial, valoresFormulario.cboxIdTipoMantenimientoInfraestructuraSeleccionado));
    this.totalRegistros = this.historialesFiltrados.length;
    this.calcularSemaforo();
    //SI LA PÁGINA ACTUAL QUEDÓ FUERA DE RANGO (EJ. AL ELIMINAR EL ÚLTIMO REGISTRO DE LA ÚLTIMA PÁGINA), SE VUELVE A LA ÚLTIMA:
    this.paginaActual = Math.min(this.paginaActual, this.calcularTotalPaginas() - 1);
    this.recortarPagina();
  }

  private cumpleUnidadMilitar(historial: HistorialMantenimientosInfraestI, siglaoAcronimo: string): boolean {
    if (!siglaoAcronimo) return true;
    return this.normalizarTexto(historial.infraestructuraDTO?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar) === this.normalizarTexto(siglaoAcronimo);
  }

  private cumpleTipoMantenimiento(historial: HistorialMantenimientosInfraestI, idTipo: string): boolean {
    if (!idTipo) return true;
    return historial.tipoMantenimientoInfraestructuraDTO?.idTipoMantenimientoInfraestructura === Number(idTipo);
  }

  private cumpleFuenteFinanciacion(historial: HistorialMantenimientosInfraestI, idFuente: string): boolean {
    if (!idFuente) return true;
    return historial.tipoFuenteFinanciacionDTO?.idTipoFuenteFinanciacion === Number(idFuente);
  }

  //UNA LUZ POR TIPO DE MANTENIMIENTO DEL CATÁLOGO, CON SU CANTIDAD DE HISTORIALES:
  private calcularSemaforo(): void {
    const historiales = this.historialesSemaforo;
    this.tiposMantenimientoContadores = this.tiposMantenimientosInfraestructuras.map((tipo, indice) => ({
      etiqueta: this.normalizarTexto(tipo.nombreTipoMantenimientoInfraestructura),
      tono: TONOS_TIPOS_MANTENIMIENTO[indice % TONOS_TIPOS_MANTENIMIENTO.length],
      valor: historiales.filter(historial => historial.tipoMantenimientoInfraestructuraDTO?.idTipoMantenimientoInfraestructura === tipo.idTipoMantenimientoInfraestructura).length
    }));
  }

  private recortarPagina(): void {
    const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
    this.historialesMantenimientosInfraestructuras = this.historialesFiltrados.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
    this.changeDetectorRef.markForCheck();
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
    this.tandaNumeroRegistrosporPagina = Number(this.historialesMantenimientosInfraestructurasForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
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
    return texto && !isNaN(numero) && /\d/.test(texto) ? '$ ' + numero.toLocaleString('es-CO') : texto;
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', historial: HistorialMantenimientosInfraestI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.historialMantenimientoInfraestructuraSeleccionado = historial;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(historial: HistorialMantenimientosInfraestI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.historialMantenimientoInfraestructuraSeleccionado = historial;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.historialMantenimientoInfraestructuraSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.historialMantenimientoInfraestructuraSeleccionado = null;
  }

  //RECIBE EL HISTORIAL NUEVO O MODIFICADO DESDE EL MODAL Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID). EL BACKEND
  //PUEDE RESPONDER HTTP 200 SIN GUARDAR (banderaexito = false), EN CUYO CASO SE MUESTRA SU MENSAJE COMO ERROR Y EL MODAL SIGUE ABIERTO:
  guardarHistorialMantenimientoInfraestructura(historial: HistorialMantenimientosInfraestI): void {
    const esModificacion = !!historial.idHistorialMantenimientoInfraestructura;
    const peticion = esModificacion
      ? this.historialMantenimientosInfraestService.updateInfrastructureMaintenanceHistory(historial)
      : this.historialMantenimientosInfraestService.addInfrastructureMaintenanceHistory(historial);
    peticion.subscribe({
      next: (respuesta) => {
        if (respuesta?.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No se pudo guardar el historial de mantenimiento.');
          return;
        }
        this.mostrarToast('exito', respuesta?.mensaje || (esModificacion ? 'Historial de mantenimiento modificado correctamente.' : 'Historial de mantenimiento creado correctamente.'));
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error(esModificacion ? 'ERROR AL MODIFICAR HISTORIAL DE MANTENIMIENTO DE INFRAESTRUCTURA: ' : 'ERROR AL CREAR HISTORIAL DE MANTENIMIENTO DE INFRAESTRUCTURA: ', err);
        this.mostrarToast('error', err.error?.mensaje || (esModificacion ? 'Error al modificar el historial de mantenimiento.' : 'Error al crear el historial de mantenimiento.'));
      }
    });
  }

  //RECIBE EL ID DEL HISTORIAL A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarHistorialMantenimientoInfraestructura(idHistorialMantenimientoInfraestructura: number): void {
    this.historialMantenimientosInfraestService.deleteInfrastructureMaintenanceHistory(idHistorialMantenimientoInfraestructura).subscribe({
      next: (respuesta) => {
        if (respuesta?.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No se pudo eliminar el historial de mantenimiento.');
          return;
        }
        this.mostrarToast('exito', respuesta?.mensaje || 'Historial de mantenimiento eliminado correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR HISTORIAL DE MANTENIMIENTO DE INFRAESTRUCTURA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el historial de mantenimiento.');
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
