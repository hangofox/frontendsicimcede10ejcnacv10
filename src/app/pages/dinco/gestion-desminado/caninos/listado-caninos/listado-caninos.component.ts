import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CaninosI } from '../../../../../interfaces/dinco/gestion-desminado/caninos/caninos.interface';
import { CompaniasUnidadesMilitaresI } from '../../../../../interfaces/panel-control/companias-unidades-militares/companias-unidades-militares.interface';
import { TiposDespejesMilitaresArtefactosExplosivosI } from '../../../../../interfaces/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';
import { RazasCaninosI } from '../../../../../interfaces/panel-control/razas-caninos/razas-caninos.interface';

import { CaninosService } from '../../../../../services/dinco/gestion-desminado/caninos/caninos.service';
import { CompaniasUnidadesMilitaresService } from '../../../../../services/panel-control/companias-unidades-militares/companias-unidades-militares.service';
import { TiposDespejesMilitaresArtefactosExplosivosService } from '../../../../../services/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.service';
import { RazasCaninosService } from '../../../../../services/panel-control/razas-caninos/razas-caninos.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';

import { AddUpdDelCaninoComponent } from '../add-upd-del-canino/add-upd-del-canino.component';
import { VistaCaninoComponent } from '../vista-canino/vista-canino.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-caninos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelCaninoComponent, VistaCaninoComponent, SemaforoContadoresComponent],
  templateUrl: './listado-caninos.component.html',
  styleUrl: './listado-caninos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoCaninosComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBOS DE FILTRO Y/O COMBOS DEL FORMULARIO):
  companiasUnidadesMilitares: CompaniasUnidadesMilitaresI[] = [];
  tiposDespejesMilitaresArtefactosExplosivos: TiposDespejesMilitaresArtefactosExplosivosI[] = [];
  razasCaninos: RazasCaninosI[] = [];

  //PÁGINA ACTUAL DE CANINOS (EL BACKEND FILTRA POR PALABRA CLAVE Y COMBOS; LA PÁGINA SE RECORTA EN EL CLIENTE PARA
  //PODER CONTAR CADA ESTADO DEL SEMÁFORO SOBRE EL MISMO RESULTADO — MISMO PATRÓN QUE ListadoInfraestructurasComponent):
  caninos: CaninosI[] = [];
  totalRegistros = 0;
  readonly estados = [
    { etiqueta: 'APTO', tono: 'bueno' },
    { etiqueta: 'EN ENTRENAMIENTO', tono: 'regular' },
    { etiqueta: 'EN TRATAMIENTO VETERINARIO', tono: 'mantenimiento' },
    { etiqueta: 'NO APTO', tono: 'malo' },
    { etiqueta: 'RETIRADO', tono: 'fuera-servicio' },
    { etiqueta: 'DADO DE BAJA', tono: 'baja' }
  ];
  estadosContadores = this.estados.map(estado => ({ ...estado, valor: 0 }));

  caninosForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  caninoSeleccionado: CaninosI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private caninosService: CaninosService,
    private companiasUnidadesMilitaresService: CompaniasUnidadesMilitaresService,
    private tiposDespejesMilitaresArtefactosExplosivosService: TiposDespejesMilitaresArtefactosExplosivosService,
    private razasCaninosService: RazasCaninosService,
    private spinnerService: SpinnerService
  ) {
    this.caninosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxNombreCompaniaUnidadMilitarSeleccionado: new FormControl(''),
      cboxNombreTipoDespejeMilitarArtefactoExplosivoSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarCompaniasUnidadesMilitares();
    this.cargarTiposDespejesMilitaresArtefactosExplosivos();
    this.cargarRazasCaninos();
    this.accionListar();
  }

  //CARGA EL CATÁLOGO DE COMPAÑÍAS DE UNIDADES MILITARES DESDE EL BACKEND:
  private cargarCompaniasUnidadesMilitares(): void {
    this.companiasUnidadesMilitaresService.findAllMilitaryUnitCompanies(undefined, undefined, undefined, 'nombreCompaniaUnidadMilitar', 'ASC')
      .subscribe({
        next: (companiasUnidadesMilitares) => {
          this.companiasUnidadesMilitares = companiasUnidadesMilitares;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR COMPAÑÍAS DE UNIDADES MILITARES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE DESPEJE MILITAR DE ARTEFACTOS EXPLOSIVOS DESDE EL BACKEND:
  private cargarTiposDespejesMilitaresArtefactosExplosivos(): void {
    this.tiposDespejesMilitaresArtefactosExplosivosService.findAllTypesOfMilitaryClearanceOfExplosiveDevices(undefined, undefined, 'nombreTipoDespejeMilitarArtefactoExplosivo', 'ASC')
      .subscribe({
        next: (tiposDespejesMilitaresArtefactosExplosivos) => {
          this.tiposDespejesMilitaresArtefactosExplosivos = tiposDespejesMilitaresArtefactosExplosivos;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE DESPEJE MILITAR DE ARTEFACTOS EXPLOSIVOS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE RAZAS DE CANINOS (PANEL DE CONTROL) DESDE EL BACKEND:
  private cargarRazasCaninos(): void {
    this.razasCaninosService.findAllCanineBreeds(undefined, undefined, 'nombreRazaCanino', 'ASC')
      .subscribe({
        next: (razasCaninos) => {
          this.razasCaninos = razasCaninos;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR RAZAS DE CANINOS (PANEL DE CONTROL): ', err)
      });
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA EL BACKEND CON LA PALABRA CLAVE Y LOS COMBOS DE FILTRO; CON EL RESULTADO SE CALCULAN EL TOTAL, LOS
  //CONTADORES DEL SEMÁFORO POR ESTADO Y LA PÁGINA ACTUAL:
  accionListar(): void {
    const valoresFormulario = this.caninosForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const nombreCompaniaUnidadMilitar: string | undefined = (valoresFormulario.cboxNombreCompaniaUnidadMilitarSeleccionado as string) || undefined;
    const nombreTipoDespejeMilitarArtefactoExplosivo: string | undefined = (valoresFormulario.cboxNombreTipoDespejeMilitarArtefactoExplosivoSeleccionado as string) || undefined;

    this.caninosService.findAllCanines(
      undefined,
      keyword,
      nombreCompaniaUnidadMilitar,
      nombreTipoDespejeMilitarArtefactoExplosivo,
      'idCanino',
      'ASC'
    ).subscribe({
      next: (registros) => {
        this.totalRegistros = registros.length;
        const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina) - 1);
        this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
        const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
        this.caninos = registros.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
        this.estadosContadores = this.estados.map(estado => ({
          ...estado,
          valor: registros.filter(registro => this.normalizarEstado(registro.estadoUsoCanino) === this.normalizarEstado(estado.etiqueta)).length
        }));
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR CANINOS: ', err)
    });
  }

  private normalizarEstado(estado: unknown): string {
    return String(estado ?? '').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
    this.tandaNumeroRegistrosporPagina = Number(this.caninosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', canino: CaninosI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.caninoSeleccionado = canino;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(canino: CaninosI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.caninoSeleccionado = canino;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.caninoSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.caninoSeleccionado = null;
  }

  //RECIBE EL CANINO NUEVO O MODIFICADO DESDE EL MODAL Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID).
  //SI EL BACKEND RESPONDE banderaexito = false (EJ. REGISTRO REPETIDO) SE MUESTRA SU MENSAJE Y EL MODAL QUEDA ABIERTO:
  guardarCanino(canino: CaninosI): void {
    const esModificacion = !!canino.idCanino;
    const solicitud = esModificacion
      ? this.caninosService.updateCanine(canino)
      : this.caninosService.addCanine(canino);

    solicitud.subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible guardar el canino.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || `Canino ${esModificacion ? 'modificado' : 'creado'} correctamente.`);
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL GUARDAR CANINO: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al guardar el canino.');
      }
    });
  }

  //RECIBE EL ID DEL CANINO A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarCanino(idCanino: number): void {
    this.caninosService.deleteCanine(idCanino).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible eliminar el canino.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || 'Canino eliminado correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR CANINO: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el canino.');
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
