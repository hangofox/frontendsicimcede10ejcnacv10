import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MunicionesEspecialesI } from '../../../../../../interfaces/dinco/gestion-desminado/municiones-especiales/municiones-especiales.interface';
import { HistorialProyeccMunicEspecI } from '../../../../../../interfaces/dinco/gestion-desminado/municiones-especiales/historial-proyecc-munic-espec/historial-proyecc-munic-espec.interface';
import { HistorialProyeccMunicEspecService } from '../../../../../../services/dinco/gestion-desminado/municiones-especiales/historial-proyecc-munic-espec/historial-proyecc-munic-espec.service';
import { SpinnerService } from '../../../../../../services/spinner/spinner.service';

import { AddUpdDelHistProyeccMunicEspecComponent } from '../add-upd-del-hist-proyecc-munic-espec/add-upd-del-hist-proyecc-munic-espec.component';
import { VistaHistProyeccMunicEspecComponent } from '../vista-hist-proyecc-munic-espec/vista-hist-proyecc-munic-espec.component';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

//HISTORIAL DE PROYECCIONES DE UNA MUNICIÓN ESPECIAL. SE ABRE EN UN MODAL DESDE EL BOTÓN DE HISTORIAL DEL LISTADO DE MUNICIONES
//ESPECIALES, IGUAL QUE EL HISTORIAL DE QUÍMICOS DE PISCINAS (ListadoHistorialQuimicosPiscinasInfraestComponent):
@Component({
  selector: 'app-listado-hist-proyecc-munic-espec',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelHistProyeccMunicEspecComponent, VistaHistProyeccMunicEspecComponent, SemaforoContadoresComponent],
  templateUrl: './listado-hist-proyecc-munic-espec.component.html',
  styleUrl: './listado-hist-proyecc-munic-espec.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoHistProyeccMunicEspecComponent implements OnChanges {

  //MUNICIÓN ESPECIAL DUEÑA DEL HISTORIAL:
  @Input({ required: true }) municionEspecial!: MunicionesEspecialesI;

  //HistorialProyeccionMunicionEspecialController SOLO FILTRA POR PALABRA CLAVE (NO POR MUNICIÓN ESPECIAL), ASÍ QUE SE TRAEN LOS
  //HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE Y AQUÍ SE DEJAN LOS DE ESTA MUNICIÓN; EL TOTAL, EL SEMÁFORO Y LA PAGINACIÓN SE
  //CALCULAN SOBRE ESE RESULTADO:
  private historialesMunicion: HistorialProyeccMunicEspecI[] = [];

  //PÁGINA ACTUAL QUE SE MUESTRA EN LA TABLA:
  historialesProyeccionesMunicionesEspeciales: HistorialProyeccMunicEspecI[] = [];
  totalRegistros = 0;

  //SEMÁFORO: TOTAL DE PROYECCIONES Y UNIDADES SOLICITADAS EN TOTAL:
  contadores: { etiqueta: string; tono: string; valor: number }[] = [{ etiqueta: 'UNIDADES SOLICITADAS', tono: 'verificacion', valor: 0 }];

  historialesProyeccionesMunicionesEspecialesForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES INTERNOS:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  historialProyeccionMunicionEspecialSeleccionado: HistorialProyeccMunicEspecI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private historialProyeccMunicEspecService: HistorialProyeccMunicEspecService,
    private spinnerService: SpinnerService
  ) {
    this.historialesProyeccionesMunicionesEspecialesForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['municionEspecial'] && this.municionEspecial?.idMunicionEspecial) {
      this.buscar();
    }
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LA PALABRA CLAVE:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA LOS HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE (DEL ÚLTIMO REGISTRADO AL PRIMERO) Y SE QUEDA CON LOS DE LA MUNICIÓN:
  accionListar(): void {
    const palabraClave = (this.historialesProyeccionesMunicionesEspecialesForm.value.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const idMunicionEspecial = Number(this.municionEspecial.idMunicionEspecial);

    this.historialProyeccMunicEspecService.findAllSpecialAmmunitionProjectionHistories(undefined, keyword, 'idHistorialProyeccionMunicionEspecial', 'DESC')
      .subscribe({
        next: (historiales) => {
          this.historialesMunicion = (historiales ?? []).filter(historial =>
            Number(historial.municionEspecialDTO?.idMunicionEspecial) === idMunicionEspecial);
          this.recortarPagina();
        },
        error: (err) => {
          console.error('ERROR AL LISTAR HISTORIAL DE PROYECCIONES DE MUNICIONES ESPECIALES: ', err);
          this.historialesMunicion = [];
          this.recortarPagina();
        }
      });
  }

  //RECALCULA EL TOTAL Y EL SEMÁFORO Y RECORTA LA PÁGINA ACTUAL:
  private recortarPagina(): void {
    this.totalRegistros = this.historialesMunicion.length;
    this.contadores = [{
      etiqueta: 'UNIDADES SOLICITADAS',
      tono: 'verificacion',
      valor: this.historialesMunicion.reduce((suma, historial) => suma + (Number(historial.cantidadSolicitadaHistorialProyeccionMunicionEspecial) || 0), 0)
    }];
    const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina) - 1);
    this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
    const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
    this.historialesProyeccionesMunicionesEspeciales = this.historialesMunicion.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
    this.changeDetectorRef.markForCheck();
  }

  //MUESTRA LOS VALORES MONETARIOS CON SEPARADOR DE MILES (ES-CO):
  formatearValor(valor: unknown): string {
    if (valor === null || valor === undefined || String(valor).trim() === '') return '-';
    const numero = Number(String(valor).replace(',', '.'));
    if (Number.isNaN(numero)) return String(valor);
    return '$ ' + numero.toLocaleString('es-CO', { maximumFractionDigits: 2 });
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
    this.tandaNumeroRegistrosporPagina = Number(this.historialesProyeccionesMunicionesEspecialesForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.recortarPagina();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', historial: HistorialProyeccMunicEspecI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.historialProyeccionMunicionEspecialSeleccionado = historial;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(historial: HistorialProyeccMunicEspecI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.historialProyeccionMunicionEspecialSeleccionado = historial;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.historialProyeccionMunicionEspecialSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.historialProyeccionMunicionEspecialSeleccionado = null;
  }

  //CREA O MODIFICA LA PROYECCIÓN (POST SI ES NUEVA, PUT SI YA TIENE ID). SI EL BACKEND RESPONDE banderaexito = false (EJ. N.° DE
  //REGISTRO REPETIDO) SE MUESTRA SU MENSAJE Y EL MODAL QUEDA ABIERTO:
  guardarHistorialProyeccionMunicionEspecial(historial: HistorialProyeccMunicEspecI): void {
    const esModificacion = !!historial.idHistorialProyeccionMunicionEspecial;
    const solicitud = esModificacion
      ? this.historialProyeccMunicEspecService.updateSpecialAmmunitionProjectionHistory(historial)
      : this.historialProyeccMunicEspecService.addSpecialAmmunitionProjectionHistory(historial);

    solicitud.subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible guardar la proyección.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || `Proyección ${esModificacion ? 'modificada' : 'creada'} correctamente.`);
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL GUARDAR PROYECCIÓN DE MUNICIÓN ESPECIAL: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al guardar la proyección.');
      }
    });
  }

  //ELIMINA LA PROYECCIÓN SELECCIONADA:
  eliminarHistorialProyeccionMunicionEspecial(idHistorialProyeccionMunicionEspecial: number): void {
    this.historialProyeccMunicEspecService.deleteSpecialAmmunitionProjectionHistory(idHistorialProyeccionMunicionEspecial).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible eliminar la proyección.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || 'Proyección eliminada correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR PROYECCIÓN DE MUNICIÓN ESPECIAL: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la proyección.');
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
