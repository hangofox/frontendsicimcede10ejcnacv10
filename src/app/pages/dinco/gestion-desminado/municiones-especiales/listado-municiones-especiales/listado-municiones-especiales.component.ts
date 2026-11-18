import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MunicionesEspecialesI } from '../../../../../interfaces/dinco/gestion-desminado/municiones-especiales/municiones-especiales.interface';
import { PelotonesUnidadesMilitaresI } from '../../../../../interfaces/panel-control/pelotones-unidades-militares/pelotones-unidades-militares.interface';
import { TiposDespejesMilitaresArtefactosExplosivosI } from '../../../../../interfaces/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';

import { MunicionesEspecialesService } from '../../../../../services/dinco/gestion-desminado/municiones-especiales/municiones-especiales.service';
import { PelotonesUnidadesMilitaresService } from '../../../../../services/panel-control/pelotones-unidades-militares/pelotones-unidades-militares.service';
import { TiposDespejesMilitaresArtefactosExplosivosService } from '../../../../../services/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';
import { HistorialProyeccMunicEspecService } from '../../../../../services/dinco/gestion-desminado/municiones-especiales/historial-proyecc-munic-espec/historial-proyecc-munic-espec.service';

import { AddUpdDelMunicionEspecialComponent } from '../add-upd-del-municion-especial/add-upd-del-municion-especial.component';
import { VistaMunicionEspecialComponent } from '../vista-municion-especial/vista-municion-especial.component';
import { ListadoHistProyeccMunicEspecComponent } from '../historial-proyecc-munic-espec/listado-hist-proyecc-munic-espec/listado-hist-proyecc-munic-espec.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-municiones-especiales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelMunicionEspecialComponent, VistaMunicionEspecialComponent, SemaforoContadoresComponent, ListadoHistProyeccMunicEspecComponent],
  templateUrl: './listado-municiones-especiales.component.html',
  styleUrl: './listado-municiones-especiales.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoMunicionesEspecialesComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBOS DE FILTRO Y/O COMBOS DEL FORMULARIO):
  pelotonesUnidadesMilitares: PelotonesUnidadesMilitaresI[] = [];
  tiposDespejesMilitaresArtefactosExplosivos: TiposDespejesMilitaresArtefactosExplosivosI[] = [];

  //PÁGINA ACTUAL DE MUNICIONES ESPECIALES (EL BACKEND FILTRA POR PALABRA CLAVE Y COMBOS; LA PÁGINA SE RECORTA EN EL CLIENTE PARA
  //PODER CONTAR CADA ESTADO DEL SEMÁFORO SOBRE EL MISMO RESULTADO — MISMO PATRÓN QUE ListadoInfraestructurasComponent):
  municionesEspeciales: MunicionesEspecialesI[] = [];
  totalRegistros = 0;
  readonly estados = [
    { etiqueta: 'DISPONIBLE', tono: 'bueno' },
    { etiqueta: 'EN USO', tono: 'regular' },
    { etiqueta: 'EN REVISIÓN', tono: 'mantenimiento' },
    { etiqueta: 'VENCIDA', tono: 'malo' },
    { etiqueta: 'AGOTADA', tono: 'fuera-servicio' },
    { etiqueta: 'DADA DE BAJA', tono: 'baja' }
  ];
  estadosContadores = this.estados.map(estado => ({ ...estado, valor: 0 }));

  //CANTIDAD DE PROYECCIONES REGISTRADAS EN EL HISTORIAL DE CADA MUNICIÓN ESPECIAL (POR ID); null MIENTRAS SE CUENTAN:
  cantidadProyeccionesPorMunicion: Map<number, number> | null = null;

  municionesEspecialesForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalHistorialProyeccionesVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  municionEspecialSeleccionada: MunicionesEspecialesI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private municionesEspecialesService: MunicionesEspecialesService,
    private pelotonesUnidadesMilitaresService: PelotonesUnidadesMilitaresService,
    private tiposDespejesMilitaresArtefactosExplosivosService: TiposDespejesMilitaresArtefactosExplosivosService,
    private spinnerService: SpinnerService,
    private historialProyeccMunicEspecService: HistorialProyeccMunicEspecService
  ) {
    this.municionesEspecialesForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxNombrePelotonUnidadMilitarSeleccionado: new FormControl(''),
      cboxNombreTipoDespejeMilitarArtefactoExplosivoSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarPelotonesUnidadesMilitares();
    this.cargarTiposDespejesMilitaresArtefactosExplosivos();
    this.cargarCantidadProyecciones();
    this.accionListar();
  }

  //CARGA EL HISTORIAL COMPLETO DE PROYECCIONES Y CUENTA LAS DE CADA MUNICIÓN ESPECIAL (EL BACKEND NO FILTRA POR MUNICIÓN, ASÍ QUE SE
  //TRAE UNA SOLA VEZ Y SE INDEXA EN MEMORIA PARA NO CONSULTAR UNA VEZ POR FILA — MISMO PATRÓN QUE ListadoApoyosAtencPrevEmergDesastComponent):
  private cargarCantidadProyecciones(): void {
    this.cantidadProyeccionesPorMunicion = null;
    this.historialProyeccMunicEspecService.findAllSpecialAmmunitionProjectionHistories().subscribe({
      next: registros => {
        const cantidades = new Map<number, number>();
        registros.forEach(registro => {
          const idMunicionEspecial = registro.municionEspecialDTO?.idMunicionEspecial;
          if (idMunicionEspecial !== undefined) cantidades.set(idMunicionEspecial, (cantidades.get(idMunicionEspecial) ?? 0) + 1);
        });
        this.cantidadProyeccionesPorMunicion = cantidades;
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LAS PROYECCIONES DE LAS MUNICIONES ESPECIALES: ', err)
    });
  }

  //CANTIDAD DE PROYECCIONES DE LA MUNICIÓN: null MIENTRAS SE CUENTAN ("..."), 0 SI NO TIENE ("NO"):
  cantidadProyecciones(municionEspecial: MunicionesEspecialesI): number | null {
    if (!this.cantidadProyeccionesPorMunicion) return null;
    return this.cantidadProyeccionesPorMunicion.get(municionEspecial.idMunicionEspecial ?? -1) ?? 0;
  }

  //CARGA EL CATÁLOGO DE PELOTONES DE UNIDADES MILITARES DESDE EL BACKEND:
  private cargarPelotonesUnidadesMilitares(): void {
    this.pelotonesUnidadesMilitaresService.findAllMilitaryUnitPlatoons(undefined, undefined, undefined, 'nombrePelotonUnidadMilitar', 'ASC')
      .subscribe({
        next: (pelotonesUnidadesMilitares) => {
          this.pelotonesUnidadesMilitares = pelotonesUnidadesMilitares;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR PELOTONES DE UNIDADES MILITARES: ', err)
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

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA EL BACKEND CON LA PALABRA CLAVE Y LOS COMBOS DE FILTRO; CON EL RESULTADO SE CALCULAN EL TOTAL, LOS
  //CONTADORES DEL SEMÁFORO POR ESTADO Y LA PÁGINA ACTUAL:
  accionListar(): void {
    const valoresFormulario = this.municionesEspecialesForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const nombrePelotonUnidadMilitar: string | undefined = (valoresFormulario.cboxNombrePelotonUnidadMilitarSeleccionado as string) || undefined;
    const nombreTipoDespejeMilitarArtefactoExplosivo: string | undefined = (valoresFormulario.cboxNombreTipoDespejeMilitarArtefactoExplosivoSeleccionado as string) || undefined;

    this.municionesEspecialesService.findAllSpecialAmmunitions(
      undefined,
      keyword,
      nombrePelotonUnidadMilitar,
      nombreTipoDespejeMilitarArtefactoExplosivo,
      'idMunicionEspecial',
      'ASC'
    ).subscribe({
      next: (registros) => {
        this.totalRegistros = registros.length;
        const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina) - 1);
        this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
        const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
        this.municionesEspeciales = registros.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
        this.estadosContadores = this.estados.map(estado => ({
          ...estado,
          valor: registros.filter(registro => this.normalizarEstado(registro.estadoMunicionEspecial) === this.normalizarEstado(estado.etiqueta)).length
        }));
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR MUNICIONES ESPECIALES: ', err)
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
    this.tandaNumeroRegistrosporPagina = Number(this.municionesEspecialesForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', municionEspecial: MunicionesEspecialesI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.municionEspecialSeleccionada = municionEspecial;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(municionEspecial: MunicionesEspecialesI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.municionEspecialSeleccionada = municionEspecial;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.municionEspecialSeleccionada = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.municionEspecialSeleccionada = null;
  }

  //ABRE EL HISTORIAL DE PROYECCIONES DE LA MUNICIÓN ESPECIAL SELECCIONADA (MISMO PATRÓN QUE EL HISTORIAL DE QUÍMICOS DE PISCINAS):
  abrirModalHistorialProyecciones(municionEspecial: MunicionesEspecialesI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.municionEspecialSeleccionada = municionEspecial;
      this.modalHistorialProyeccionesVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  //AL CERRAR EL HISTORIAL SE VUELVEN A CONTAR LAS PROYECCIONES, PORQUE DENTRO SE PUDIERON CREAR O ELIMINAR:
  cerrarModalHistorialProyecciones(): void {
    this.modalHistorialProyeccionesVisible = false;
    this.municionEspecialSeleccionada = null;
    this.cargarCantidadProyecciones();
  }

  //RECIBE LA MUNICIÓN ESPECIAL NUEVA O MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (POST SI ES NUEVA, PUT SI YA TIENE ID).
  //SI EL BACKEND RESPONDE banderaexito = false (EJ. REGISTRO REPETIDO) SE MUESTRA SU MENSAJE Y EL MODAL QUEDA ABIERTO:
  guardarMunicionEspecial(municionEspecial: MunicionesEspecialesI): void {
    const esModificacion = !!municionEspecial.idMunicionEspecial;
    const solicitud = esModificacion
      ? this.municionesEspecialesService.updateSpecialAmmunition(municionEspecial)
      : this.municionesEspecialesService.addSpecialAmmunition(municionEspecial);

    solicitud.subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible guardar la munición especial.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || `Munición especial ${esModificacion ? 'modificada' : 'creada'} correctamente.`);
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL GUARDAR MUNICIÓN ESPECIAL: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al guardar la munición especial.');
      }
    });
  }

  //RECIBE EL ID DE LA MUNICIÓN ESPECIAL A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarMunicionEspecial(idMunicionEspecial: number): void {
    this.municionesEspecialesService.deleteSpecialAmmunition(idMunicionEspecial).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible eliminar la munición especial.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || 'Munición especial eliminada correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR MUNICIÓN ESPECIAL: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la munición especial.');
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
