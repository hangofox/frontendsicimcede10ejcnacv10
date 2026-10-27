import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialOrdenApoyoMovimientoTropaI, HistorialOrdenApoyoMovimientoTropaMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-ordenes-apoy-mov-trop/historial-ordenes-apoy-mov-trop.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { HistorialOrdenApoyoMovimientoTropaService } from '../../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-ordenes-apoy-mov-trop/historial-ordenes-apoy-mov-trop.service';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelHistOrdApoyMovTropComponent } from '../add-upd-del-hist-ord-apoy-mov-trop/add-upd-del-hist-ord-apoy-mov-trop.component';
import { VistaHistOrdApoyMovTropComponent } from '../vista-hist-ord-apoy-mov-trop/vista-hist-ord-apoy-mov-trop.component';

@Component({
  selector: 'app-listado-hist-ord-apoy-mov-trop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelHistOrdApoyMovTropComponent, VistaHistOrdApoyMovTropComponent],
  templateUrl: './listado-hist-ord-apoy-mov-trop.component.html',
  styleUrl: './listado-hist-ord-apoy-mov-trop.component.scss'
})
export class ListadoHistOrdApoyMovTropComponent implements OnChanges {
  //APOYO DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES DESDE EL QUE SE ABRE EL HISTORIAL (MODAL DEL LISTADO DE APOYOS); SOLO
  //SE LISTAN Y SE CREAN ÓRDENES DE APOYO DE MOVIMIENTO DE TROPAS DE ESTE APOYO:
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cantidad: ['10'] });

  //EL BACKEND (count, lista Y listaPag) NO RECIBE EL ID DEL APOYO, ASÍ QUE SE TRAE EL HISTORIAL COMPLETO UNA SOLA VEZ Y SE
  //QUEDAN AQUÍ SOLO LOS REGISTROS DEL APOYO; LA BÚSQUEDA Y LA PAGINACIÓN SE HACEN SOBRE ESTA LISTA — MISMO PATRÓN QUE
  //ListadoHistEqTrApoyAtPrevEmDesComponent:
  registrosApoyo: HistorialOrdenApoyoMovimientoTropaI[] = [];
  registros: HistorialOrdenApoyoMovimientoTropaI[] = [];
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialOrdenApoyoMovimientoTropaI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: HistorialOrdenApoyoMovimientoTropaService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  //AL CAMBIAR EL APOYO SE LIMPIA LA BÚSQUEDA Y SE VUELVE A CARGAR SU HISTORIAL:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apoyoAtencPrevEmergDesast']) {
      this.form.patchValue({ keyword: '' });
      this.cargarHistorialApoyo();
    }
  }

  //TRAE EL HISTORIAL COMPLETO, DEJA SOLO LOS REGISTROS DEL APOYO Y VUELVE A LA PRIMERA PÁGINA:
  private cargarHistorialApoyo(): void {
    const idApoyoAtencPrevEmergDesast = this.apoyoAtencPrevEmergDesast?.idApoyoAtencPrevEmergDesast;
    if (!idApoyoAtencPrevEmergDesast) {
      this.registrosApoyo = [];
      this.buscar();
      return;
    }
    this.service.findAllTroopMovementSupportOrderHistories(undefined, undefined, 'idHistorialOrdenApoyoMovimientoTropa', 'ASC').subscribe({
      next: registros => {
        this.registrosApoyo = registros.filter(registro => registro.apoyoAtencPrevEmergDesastDTO?.idApoyoAtencPrevEmergDesast === idApoyoAtencPrevEmergDesast);
        this.buscar();
      },
      error: err => console.error('ERROR AL CARGAR EL HISTORIAL DE ÓRDENES DE APOYOS DE MOVIMIENTOS DE TROPAS DEL APOYO: ', err)
    });
  }

  //APLICA LA PALABRA CLAVE (NÚMERO DE REGISTRO, NÚMERO DE OFICIO / HR O ASUNTO) SOBRE EL HISTORIAL DEL APOYO Y RECORTA LA PÁGINA ACTUAL:
  listar(): void {
    const keyword = String(this.form.value.keyword || '').trim().toUpperCase();
    const filtrados = this.registrosApoyo.filter(registro => !keyword || [
      registro.numRegHistorialOrdenApoyoMovimientoTropa,
      registro.numeroOficioHrOrdenApoyoMovimientoTropa,
      registro.asuntoOrdenApoyoMovimientoTropa
    ].some(valor => String(valor ?? '').toUpperCase().includes(keyword)));
    this.total = filtrados.length;
    this.registros = filtrados.slice(this.pagina * this.cantidad, (this.pagina + 1) * this.cantidad);
    this.cdr.markForCheck();
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: HistorialOrdenApoyoMovimientoTropaI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: HistorialOrdenApoyoMovimientoTropaI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: HistorialOrdenApoyoMovimientoTropaI): void {
    const modificar = !!registro.idHistorialOrdenApoyoMovimientoTropa;
    (modificar ? this.service.updateTroopMovementSupportOrderHistory(registro) : this.service.addTroopMovementSupportOrderHistory(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Orden de apoyo modificada correctamente.' : 'Orden de apoyo agregada correctamente.', modificar ? 'Error al modificar la orden de apoyo.' : 'Error al agregar la orden de apoyo.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar la orden de apoyo.' : 'Error al agregar la orden de apoyo.'))
    });
  }

  eliminar(id: number): void {
    this.service.deleteTroopMovementSupportOrderHistory(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Orden de apoyo eliminada correctamente.', 'Error al eliminar la orden de apoyo.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la orden de apoyo.')
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. NÚMERO DE REGISTRO REPETIDO); EN ESE CASO SE MUESTRA
  //EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuesta(respuesta: HistorialOrdenApoyoMovimientoTropaMsj, mensajeExito: string, mensajeError: string): void {
    if (respuesta.banderaexito === false) {
      this.mostrarToast('error', respuesta.mensaje || mensajeError);
      return;
    }
    this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
    this.cerrar();
    this.cargarHistorialApoyo();
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
