import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EquiposIngenierosI } from '../../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { EstadosDiagnosticosEquiposIngenierosI } from '../../../../../../interfaces/dinco/estados-diagnosticos-equipos-ingenieros/estados-diagnosticos-equipos-ingenieros.interface';
import { UnidadesMilitaresRealizadorasMantenimientosI } from '../../../../../../interfaces/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.interface';
import { HistorialDiagnInicSeleccEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/historial-diagn-inic-selecc-equip-ing.interface';
import { HistorialDiagnInicSeleccEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/historial-diagn-inic-selecc-equip-ing.service';
import { EstadosDiagnosticosEquiposIngenierosService } from '../../../../../../services/dinco/estados-diagnosticos-equipos-ingenieros/estados-diagnosticos-equipos-ingenieros.service';
import { UnidadesMilitaresRealizadorasMantenimientosService } from '../../../../../../services/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.service';
import { SpinnerService } from '../../../../../../services/spinner/spinner.service';

import { AddUpdDelHistDiagnInicSeleccEquipIngComponent } from '../add-upd-del-hist-diagn-inic-selecc-equip-ing/add-upd-del-hist-diagn-inic-selecc-equip-ing.component';
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

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private historialDiagnInicSeleccEquipIngService: HistorialDiagnInicSeleccEquipIngService,
    private estadosDiagnosticosEquiposIngenierosService: EstadosDiagnosticosEquiposIngenierosService,
    private unidadesMilitaresRealizadorasMantenimientosService: UnidadesMilitaresRealizadorasMantenimientosService,
    private spinnerService: SpinnerService
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
      this.buscar();
    }
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
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

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.historialDiagnosticoSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.historialDiagnosticoSeleccionado = null;
  }

  //CREA O MODIFICA EL DIAGNÓSTICO (POST SI ES NUEVO, PUT SI YA TIENE ID). SI EL BACKEND RESPONDE banderaexito = false (EJ. N.° DE
  //REGISTRO REPETIDO) SE MUESTRA SU MENSAJE Y EL MODAL QUEDA ABIERTO:
  guardarHistorialDiagnostico(historial: HistorialDiagnInicSeleccEquipIngI): void {
    const esModificacion = !!historial.idHistorialDiagnosticoInicialSeleccMttoEquipIng;
    const solicitud = esModificacion
      ? this.historialDiagnInicSeleccEquipIngService.updateEngineerEquipmentInitialDiagnosisHistory(historial)
      : this.historialDiagnInicSeleccEquipIngService.addEngineerEquipmentInitialDiagnosisHistory(historial);

    solicitud.subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible guardar el diagnóstico inicial.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || `Diagnóstico inicial ${esModificacion ? 'modificado' : 'creado'} correctamente.`);
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL GUARDAR DIAGNÓSTICO INICIAL DE EQUIPO DE INGENIEROS: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al guardar el diagnóstico inicial.');
      }
    });
  }

  //ELIMINA EL DIAGNÓSTICO SELECCIONADO:
  eliminarHistorialDiagnostico(idHistorialDiagnosticoInicialSeleccMttoEquipIng: number): void {
    this.historialDiagnInicSeleccEquipIngService.deleteEngineerEquipmentInitialDiagnosisHistory(idHistorialDiagnosticoInicialSeleccMttoEquipIng).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible eliminar el diagnóstico inicial.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || 'Diagnóstico inicial eliminado correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR DIAGNÓSTICO INICIAL DE EQUIPO DE INGENIEROS: ', err);
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
