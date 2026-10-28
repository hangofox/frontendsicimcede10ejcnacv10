import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialMaqPesadApoyAtencPrevEmergDesastI, HistorialMaqPesadApoyAtencPrevEmergDesastMsj } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-maq-pesad-apoy-atenc-prev-des/historial-maq-pesad-apoy-atenc-prev-des.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { MaquinariasPesadasI } from '../../../../../../interfaces/digei/gestion-riesgo/maquinarias-pesadas/maquinarias-pesadas.interface';
import { HistorialMaqPesadApoyAtencPrevEmergDesastService } from '../../../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-maq-pesad-apoy-atenc-prev-des/historial-maq-pesad-apoy-atenc-prev-des.service';
import { MaquinariasPesadasService } from '../../../../../../services/digei/gestion-riesgo/maquinarias-pesadas/maquinarias-pesadas.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelHistMaqPesadApoyAtencPrevDesComponent } from '../add-upd-del-hist-maq-pesad-apoy-at-prev-des/add-upd-del-hist-maq-pesad-apoy-at-prev-des.component';
import { VistaHistMaqPesadApoyAtencPrevDesComponent } from '../vista-hist-maq-pesad-apoy-at-prev-des/vista-hist-maq-pesad-apoy-at-prev-des.component';

@Component({
  selector: 'app-listado-hist-maq-pesad-apoy-atenc-prev-des',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelHistMaqPesadApoyAtencPrevDesComponent, VistaHistMaqPesadApoyAtencPrevDesComponent],
  templateUrl: './listado-hist-maq-pesad-apoy-at-prev-des.component.html',
  styleUrl: './listado-hist-maq-pesad-apoy-at-prev-des.component.scss'
})
export class ListadoHistMaqPesadApoyAtencPrevDesComponent implements OnChanges {
  //APOYO DE ATENCIÓN Y PREVENCIÓN DE EMERGENCIAS Y DESASTRES DESDE EL QUE SE ABRE EL HISTORIAL (MODAL DEL LISTADO DE APOYOS); SOLO
  //SE LISTAN Y SE CREAN MAQUINARIAS PESADAS DE ESTE APOYO:
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cboxNombreMaquinariaPesadaSeleccionada: [''], cantidad: ['10'] });

  //EL BACKEND (count, lista Y listaPag) NO RECIBE EL ID DEL APOYO, ASÍ QUE SE TRAE EL HISTORIAL COMPLETO UNA SOLA VEZ Y SE
  //QUEDAN AQUÍ SOLO LOS REGISTROS DEL APOYO; LA BÚSQUEDA, EL FILTRO POR MAQUINARIA PESADA Y LA PAGINACIÓN SE HACEN SOBRE ESTA
  //LISTA — MISMO PATRÓN QUE ListadoHistEqTrApoyAtPrevEmDesComponent:
  registrosApoyo: HistorialMaqPesadApoyAtencPrevEmergDesastI[] = [];
  registros: HistorialMaqPesadApoyAtencPrevEmergDesastI[] = [];
  //CATÁLOGO DE MAQUINARIAS PESADAS PARA EL COMBO DEL FORMULARIO:
  maquinariasPesadas: MaquinariasPesadasI[] = [];
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialMaqPesadApoyAtencPrevEmergDesastI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: HistorialMaqPesadApoyAtencPrevEmergDesastService,
    private readonly maquinariasPesadasService: MaquinariasPesadasService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.cargarMaquinariasPesadas();
  }

  //NOMBRES DE LAS MAQUINARIAS PESADAS QUE YA ESTÁN EN EL HISTORIAL DEL APOYO, PARA EL COMBO DE FILTRO:
  get maquinariasPesadasFiltro(): string[] {
    return [...new Set(this.registrosApoyo.map(registro => String(registro.maquinariaPesadaDTO?.nombreMaquinariaPesada ?? '')).filter(nombre => !!nombre))].sort();
  }

  //AL CAMBIAR EL APOYO SE LIMPIAN LOS FILTROS Y SE VUELVE A CARGAR SU HISTORIAL:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apoyoAtencPrevEmergDesast']) {
      this.form.patchValue({ keyword: '', cboxNombreMaquinariaPesadaSeleccionada: '' });
      this.cargarHistorialApoyo();
    }
  }

  //CARGA EL CATÁLOGO DE MAQUINARIAS PESADAS DESDE EL BACKEND (COMBO DEL FORMULARIO), ORDENADO POR NOMBRE:
  private cargarMaquinariasPesadas(): void {
    this.maquinariasPesadasService.findAllHeavyMachinery(undefined, 'nombreMaquinariaPesada', 'ASC').subscribe({
      next: maquinariasPesadas => {
        this.maquinariasPesadas = maquinariasPesadas;
        this.cdr.markForCheck();
      },
      error: err => console.error('ERROR AL CARGAR MAQUINARIAS PESADAS: ', err)
    });
  }

  //TRAE EL HISTORIAL COMPLETO, DEJA SOLO LOS REGISTROS DEL APOYO Y VUELVE A LA PRIMERA PÁGINA:
  private cargarHistorialApoyo(): void {
    const idApoyoAtencPrevEmergDesast = this.apoyoAtencPrevEmergDesast?.idApoyoAtencPrevEmergDesast;
    if (!idApoyoAtencPrevEmergDesast) {
      this.registrosApoyo = [];
      this.buscar();
      return;
    }
    this.service.findAllHeavyMachineryHistoriesOfSupports(undefined, undefined, 'idHistorialMaqPesadApoyAtencPrevEmergDesast', 'ASC').subscribe({
      next: registros => {
        this.registrosApoyo = registros.filter(registro => registro.apoyoAtencPrevEmergDesastDTO?.idApoyoAtencPrevEmergDesast === idApoyoAtencPrevEmergDesast);
        this.buscar();
      },
      error: err => console.error('ERROR AL CARGAR EL HISTORIAL DE MAQUINARIAS PESADAS DEL APOYO: ', err)
    });
  }

  //APLICA LA PALABRA CLAVE (NÚMERO DE REGISTRO, MAQUINARIA PESADA O EMPADRONAMIENTO) Y LA MAQUINARIA ELEGIDA SOBRE EL HISTORIAL DEL
  //APOYO Y RECORTA LA PÁGINA ACTUAL:
  listar(): void {
    const keyword = String(this.form.value.keyword || '').trim().toUpperCase();
    const maquinariaPesada = String(this.form.value.cboxNombreMaquinariaPesadaSeleccionada || '');
    const filtrados = this.registrosApoyo.filter(registro =>
      (!maquinariaPesada || String(registro.maquinariaPesadaDTO?.nombreMaquinariaPesada ?? '') === maquinariaPesada) &&
      (!keyword || [
        registro.numRegHistorialMaqPesadApoyAtencPrevEmergDesast,
        registro.maquinariaPesadaDTO?.nombreMaquinariaPesada,
        registro.maquinariaPesadaDTO?.empadronamientoMaquinariaPesada
      ].some(valor => String(valor ?? '').toUpperCase().includes(keyword))));
    this.total = filtrados.length;
    this.registros = filtrados.slice(this.pagina * this.cantidad, (this.pagina + 1) * this.cantidad);
    this.cdr.markForCheck();
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: HistorialMaqPesadApoyAtencPrevEmergDesastI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: HistorialMaqPesadApoyAtencPrevEmergDesastI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: HistorialMaqPesadApoyAtencPrevEmergDesastI): void {
    const modificar = !!registro.idHistorialMaqPesadApoyAtencPrevEmergDesast;
    (modificar ? this.service.updateHeavyMachineryHistoryOfSupport(registro) : this.service.addHeavyMachineryHistoryOfSupport(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Maquinaria pesada modificada correctamente.' : 'Maquinaria pesada agregada correctamente.', modificar ? 'Error al modificar la maquinaria pesada.' : 'Error al agregar la maquinaria pesada.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar la maquinaria pesada.' : 'Error al agregar la maquinaria pesada.'))
    });
  }

  eliminar(id: number): void {
    this.service.deleteHeavyMachineryHistoryOfSupport(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Maquinaria pesada eliminada correctamente.', 'Error al eliminar la maquinaria pesada.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la maquinaria pesada.')
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. NÚMERO DE REGISTRO REPETIDO); EN ESE CASO SE MUESTRA
  //EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuesta(respuesta: HistorialMaqPesadApoyAtencPrevEmergDesastMsj, mensajeExito: string, mensajeError: string): void {
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
