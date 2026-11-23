import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EquiposIngenierosI } from '../../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { HistorialDemerDesgastEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/historial-demer-desgast-equip-ing.interface';
import { HistorialDemerDesgastEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/historial-demer-desgast-equip-ing.service';
import { SpinnerService } from '../../../../../../services/spinner/spinner.service';

import { AddUpdDelHistDemerDesgastEquipIngComponent } from '../add-upd-del-hist-demer-desgast-equip-ing/add-upd-del-hist-demer-desgast-equip-ing.component';
import { VistaHistDemerDesgastEquipIngComponent } from '../vista-hist-demer-desgast-equip-ing/vista-hist-demer-desgast-equip-ing.component';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

//HISTORIAL DE DEMÉRITOS Y DESGASTES DE UN EQUIPO DE INGENIEROS. SE ABRE EN UN MODAL DESDE EL BOTÓN DE HISTORIAL DEL LISTADO DE
//EQUIPOS DE INGENIEROS (MISMO PATRÓN QUE ListadoHistDiagnInicSeleccEquipIngComponent):
@Component({
  selector: 'app-listado-hist-demer-desgast-equip-ing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelHistDemerDesgastEquipIngComponent, VistaHistDemerDesgastEquipIngComponent, SemaforoContadoresComponent],
  templateUrl: './listado-hist-demer-desgast-equip-ing.component.html',
  styleUrl: './listado-hist-demer-desgast-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoHistDemerDesgastEquipIngComponent implements OnChanges, OnDestroy {

  //EQUIPO DE INGENIEROS DUEÑO DEL HISTORIAL:
  @Input({ required: true }) equipoIngeniero!: EquiposIngenierosI;

  //HistorialDemeritoYDesgasteEquipoIngenieroController SOLO FILTRA POR PALABRA CLAVE (N.° DE REGISTRO O NOMBRE DEL PROYECTO), NO POR
  //EQUIPO, ASÍ QUE SE TRAEN LOS HISTORIALES QUE COINCIDEN Y AQUÍ SE DEJAN LOS DE ESTE EQUIPO; EL TOTAL, EL SEMÁFORO Y LA PAGINACIÓN
  //SE CALCULAN SOBRE ESE RESULTADO:
  private historialesEquipo: HistorialDemerDesgastEquipIngI[] = [];

  //PÁGINA ACTUAL QUE SE MUESTRA EN LA TABLA:
  historialesDemeritosYDesgastesEquiposIngenieros: HistorialDemerDesgastEquipIngI[] = [];
  totalRegistros = 0;

  //SEMÁFORO: TOTAL ACUMULADO DE HORAS TRABAJADAS Y DE KILÓMETROS RECORRIDOS DEL EQUIPO (MISMO PATRÓN DE SUMAS QUE ListadoHistProyeccMunicEspecComponent):
  contadores: { etiqueta: string; tono: string; valor: number }[] = this.calcularContadores();

  historialesDemeritosYDesgastesEquiposIngenierosForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES INTERNOS:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  historialDemeritoDesgasteSeleccionado: HistorialDemerDesgastEquipIngI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private historialDemerDesgastEquipIngService: HistorialDemerDesgastEquipIngService,
    private spinnerService: SpinnerService
  ) {
    this.historialesDemeritosYDesgastesEquiposIngenierosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipoIngeniero'] && this.equipoIngeniero?.idEquipoIngeniero) {
      this.buscar();
    }
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LA PALABRA CLAVE:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA LOS HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE (DEL ÚLTIMO REGISTRADO AL PRIMERO) Y SE QUEDA CON LOS DEL EQUIPO:
  accionListar(): void {
    const palabraClave = (this.historialesDemeritosYDesgastesEquiposIngenierosForm.value.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const idEquipoIngeniero = Number(this.equipoIngeniero.idEquipoIngeniero);

    this.historialDemerDesgastEquipIngService.findAllEngineerEquipmentDemeritAndWearHistories(undefined, keyword, 'idHistorialDemeritoYDesgasteEquipoIngeniero', 'DESC')
      .subscribe({
        next: (historiales) => {
          this.historialesEquipo = (historiales ?? []).filter(historial =>
            Number(historial.equipoIngenieroDTO?.idEquipoIngeniero) === idEquipoIngeniero);
          this.recortarPagina();
        },
        error: (err) => {
          console.error('ERROR AL LISTAR HISTORIAL DE DEMÉRITOS Y DESGASTES DE EQUIPOS DE INGENIEROS: ', err);
          this.historialesEquipo = [];
          this.recortarPagina();
        }
      });
  }

  //RECALCULA EL TOTAL Y EL SEMÁFORO Y RECORTA LA PÁGINA ACTUAL:
  private recortarPagina(): void {
    this.totalRegistros = this.historialesEquipo.length;
    this.contadores = this.calcularContadores();
    const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina) - 1);
    this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
    const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
    this.historialesDemeritosYDesgastesEquiposIngenieros = this.historialesEquipo.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
    this.changeDetectorRef.markForCheck();
  }

  private calcularContadores(): { etiqueta: string; tono: string; valor: number }[] {
    const sumar = (campo: (historial: HistorialDemerDesgastEquipIngI) => unknown) =>
      Math.round(this.historialesEquipo.reduce((suma, historial) => suma + (Number(campo(historial)) || 0), 0) * 100) / 100;
    return [
      { etiqueta: 'HORAS TRABAJADAS', tono: 'verificacion', valor: sumar(historial => historial.horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero) },
      { etiqueta: 'KILÓMETROS RECORRIDOS', tono: 'asignacion', valor: sumar(historial => historial.kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero) }
    ];
  }

  //MUESTRA LOS VALORES MONETARIOS CON SEPARADOR DE MILES (ES-CO):
  formatearValor(valor: unknown): string {
    const texto = String(valor ?? '').trim();
    if (!texto) return '-';
    const numero = Number(texto);
    return isNaN(numero) ? texto : '$ ' + numero.toLocaleString('es-CO');
  }

  //MUESTRA HORAS Y KILÓMETROS CON SEPARADOR DE MILES (ES-CO):
  formatearNumero(valor: unknown): string {
    const texto = String(valor ?? '').trim();
    if (!texto) return '-';
    const numero = Number(texto);
    return isNaN(numero) ? texto : numero.toLocaleString('es-CO');
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
    this.tandaNumeroRegistrosporPagina = Number(this.historialesDemeritosYDesgastesEquiposIngenierosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.recortarPagina();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', historial: HistorialDemerDesgastEquipIngI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.historialDemeritoDesgasteSeleccionado = historial;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(historial: HistorialDemerDesgastEquipIngI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.historialDemeritoDesgasteSeleccionado = historial;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.historialDemeritoDesgasteSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.historialDemeritoDesgasteSeleccionado = null;
  }

  //CREA O MODIFICA EL REGISTRO (POST SI ES NUEVO, PUT SI YA TIENE ID). SI EL BACKEND RESPONDE banderaexito = false (EJ. N.° DE
  //REGISTRO REPETIDO) SE MUESTRA SU MENSAJE Y EL MODAL QUEDA ABIERTO:
  guardarHistorialDemeritoDesgaste(historial: HistorialDemerDesgastEquipIngI): void {
    const esModificacion = !!historial.idHistorialDemeritoYDesgasteEquipoIngeniero;
    const solicitud = esModificacion
      ? this.historialDemerDesgastEquipIngService.updateEngineerEquipmentDemeritAndWearHistory(historial)
      : this.historialDemerDesgastEquipIngService.addEngineerEquipmentDemeritAndWearHistory(historial);

    solicitud.subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible guardar el demérito y desgaste.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || `Demérito y desgaste ${esModificacion ? 'modificado' : 'creado'} correctamente.`);
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL GUARDAR DEMÉRITO Y DESGASTE DE EQUIPO DE INGENIEROS: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al guardar el demérito y desgaste.');
      }
    });
  }

  //ELIMINA EL REGISTRO SELECCIONADO:
  eliminarHistorialDemeritoDesgaste(idHistorialDemeritoYDesgasteEquipoIngeniero: number): void {
    this.historialDemerDesgastEquipIngService.deleteEngineerEquipmentDemeritAndWearHistory(idHistorialDemeritoYDesgasteEquipoIngeniero).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible eliminar el demérito y desgaste.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || 'Demérito y desgaste eliminado correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR DEMÉRITO Y DESGASTE DE EQUIPO DE INGENIEROS: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el demérito y desgaste.');
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
