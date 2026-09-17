import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InfraestructurasI } from '../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { SociedadesUnidadesCentralizadorasI } from '../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';
import { TiposEstructurasInfraestructurasI } from '../../../../interfaces/digei/finca-raiz/tipos-estructuras-infraestructuras/tipos-estructuras-infraestructuras.interface';
import { FuncionalidadesInfraestructurasI } from '../../../../interfaces/digei/finca-raiz/funcionalidades-infraestructuras/funcionalidades-infraestructuras.interface';
import { SegurosI } from '../../../../interfaces/seguros/seguros.interface';
import { TerrenosI } from '../../../../interfaces/digei/finca-raiz/terrenos/terrenos.interface';

import { InfraestructurasService } from '../../../../services/digei/finca-raiz/infraestructuras/infraestructuras.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SociedadesUnidadesCentralizadorasService } from '../../../../services/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.service';
import { TiposEstructurasInfraestructurasService } from '../../../../services/digei/finca-raiz/tipos-estructuras-infraestructuras/tipos-estructuras-infraestructuras.service';
import { FuncionalidadesInfraestructurasService } from '../../../../services/digei/finca-raiz/funcionalidades-infraestructuras/funcionalidades-infraestructuras.service';
import { SegurosService } from '../../../../services/seguros/seguros.service';
import { TerrenosService } from '../../../../services/digei/finca-raiz/terrenos/terrenos.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';

import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { ListadoHistorialQuimicosPiscinasInfraestComponent } from '../historial-quimicos-piscinas-infraest/listado-historial-quimicos-piscinas-infraest/listado-historial-quimicos-piscinas-infraest.component';

@Component({
  selector: 'app-listado-piscinas-infraestructuras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, ListadoHistorialQuimicosPiscinasInfraestComponent],
  templateUrl: './listado-piscinas-infraestructuras.component.html',
  styleUrl: './listado-piscinas-infraestructuras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoPiscinasInfraestructurasComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBO DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  sociedadesUnidadesCentralizadoras: SociedadesUnidadesCentralizadorasI[] = [];
  tiposEstructurasInfraestructuras: TiposEstructurasInfraestructurasI[] = [];
  funcionalidadesInfraestructuras: FuncionalidadesInfraestructurasI[] = [];
  seguros: SegurosI[] = [];
  terrenos: TerrenosI[] = [];

  //PÁGINA ACTUAL DE INFRAESTRUCTURAS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE RECORTA EN EL CLIENTE):
  infraestructuras: InfraestructurasI[] = [];
  totalRegistros = 0;
  readonly estadosUso = [
    { etiqueta: 'BUENO', tono: 'bueno' },
    { etiqueta: 'REGULAR', tono: 'regular' },
    { etiqueta: 'MALO', tono: 'malo' },
    { etiqueta: 'MANTENIMIENTO', tono: 'mantenimiento' },
    { etiqueta: 'FUERA DE SERVICIO', tono: 'fuera-servicio' },
    { etiqueta: 'DADA DE BAJA', tono: 'baja' }
  ];
  estadosUsoContadores = this.estadosUso.map(estado => ({ ...estado, valor: 0 }));

  infraestructurasForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalHistorialQuimicosVisible = false;
  infraestructuraSeleccionada: InfraestructurasI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private infraestructurasService: InfraestructurasService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private sociedadesUnidadesCentralizadorasService: SociedadesUnidadesCentralizadorasService,
    private tiposEstructurasInfraestructurasService: TiposEstructurasInfraestructurasService,
    private funcionalidadesInfraestructurasService: FuncionalidadesInfraestructurasService,
    private segurosService: SegurosService,
    private terrenosService: TerrenosService,
    private spinnerService: SpinnerService
  ) {
    this.infraestructurasForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxTipoEstructuraInfraestructuraSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarSociedadesUnidadesCentralizadoras();
    this.cargarTiposEstructurasInfraestructuras();
    this.cargarFuncionalidadesInfraestructuras();
    this.cargarSeguros();
    this.cargarTerrenos();
    this.accionListar();
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
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

  //CARGA EL CATÁLOGO DE SOCIEDADES DE UNIDADES CENTRALIZADORAS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarSociedadesUnidadesCentralizadoras(): void {
    this.sociedadesUnidadesCentralizadorasService.findAllCentralizingUnitCompanies(undefined, undefined, undefined, 'codigoSociedadUnidadCentralizadora', 'ASC')
      .subscribe({
        next: (sociedadesUnidadesCentralizadoras) => {
          this.sociedadesUnidadesCentralizadoras = sociedadesUnidadesCentralizadoras;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR SOCIEDADES DE UNIDADES CENTRALIZADORAS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE ESTRUCTURA DE INFRAESTRUCTURA DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposEstructurasInfraestructuras(): void {
    this.tiposEstructurasInfraestructurasService.findAllTypesOfInfrastructureStructures(undefined, undefined, 'nombreTipoEstructuraInfraestructura', 'ASC')
      .subscribe({
        next: (tiposEstructurasInfraestructuras) => {
          //EL COMBO SOLO OFRECE LOS TIPOS DE PISCINA: OFRECER EL CATÁLOGO COMPLETO DEJARÍA ELEGIR TIPOS QUE
          //SIEMPRE DEVOLVERÍAN LA TABLA VACÍA, PORQUE ESTE LISTADO YA ESTÁ ACOTADO A PISCINAS:
          this.tiposEstructurasInfraestructuras = tiposEstructurasInfraestructuras.filter(tipoEstructura =>
            this.nombresTiposEstructurasPiscinas.includes(
              this.normalizarNombreTipoEstructura(tipoEstructura.nombreTipoEstructuraInfraestructura)
            )
          );
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE ESTRUCTURA DE INFRAESTRUCTURA: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE FUNCIONALIDADES DE INFRAESTRUCTURA DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarFuncionalidadesInfraestructuras(): void {
    this.funcionalidadesInfraestructurasService.findAllInfrastructureFunctionalities('nombreFuncionalidadInfraestructura', 'ASC')
      .subscribe({
        next: (funcionalidadesInfraestructuras) => {
          this.funcionalidadesInfraestructuras = funcionalidadesInfraestructuras;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR FUNCIONALIDADES DE INFRAESTRUCTURA: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE SEGUROS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarSeguros(): void {
    this.segurosService.findAllInsurances(undefined, undefined, undefined, 'idSeguro', 'ASC')
      .subscribe({
        next: (seguros) => {
          this.seguros = seguros;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR SEGUROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TERRENOS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTerrenos(): void {
    this.terrenosService.findAllLands(undefined, undefined, undefined, 'denominacionTerreno', 'ASC')
      .subscribe({
        next: (terrenos) => {
          this.terrenos = terrenos;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TERRENOS: ', err)
      });
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE Y LA UNIDAD MILITAR SELECCIONADAS:
  accionListar(): void {
    const valoresFormulario = this.infraestructurasForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;
    const idTipoEstructura = Number(valoresFormulario.cboxTipoEstructuraInfraestructuraSeleccionado) || undefined;

    this.infraestructurasService.findAllInfrastructures(
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      'idInfraestructura',
      'ASC'
    ).subscribe({
      next: (registros) => {
        //ESTE LISTADO DE DIPLI SOLO MUESTRA INFRAESTRUCTURAS DE TIPO PISCINA: EL BACKEND DEVUELVE TODAS LAS
        //INFRAESTRUCTURAS, ASÍ QUE EL RECORTE POR TIPO DE ESTRUCTURA SE APLICA AQUÍ ANTES DE CUALQUIER OTRO FILTRO:
        const infraestructurasFiltradas = registros
          .filter(infraestructura => this.esInfraestructuraPiscina(infraestructura))
          .filter(infraestructura =>
            !idTipoEstructura ||
            Number(infraestructura.tipoEstructuraInfraestructuraDTO?.idTipoEstructuraInfraestructura) === idTipoEstructura
          );
        this.totalRegistros = infraestructurasFiltradas.length;
        const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina) - 1);
        this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
        const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
        this.infraestructuras = infraestructurasFiltradas.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
        this.estadosUsoContadores = this.estadosUso.map(estado => ({
          ...estado,
          valor: infraestructurasFiltradas.filter(infraestructura =>
            this.normalizarEstado(infraestructura.estadoUsoInfraestructura) === estado.etiqueta
          ).length
        }));
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR INFRAESTRUCTURAS: ', err)
    });
  }

  private normalizarEstado(estado: unknown): string {
    return String(estado ?? '').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  claseEstadoUso(estado: unknown): string {
    const clases: Record<string, string> = {
      BUENO: 'badge-bueno',
      REGULAR: 'badge-regular',
      MALO: 'badge-malo',
      MANTENIMIENTO: 'badge-mantenimiento',
      'FUERA DE SERVICIO': 'badge-fuera-servicio',
      'DADA DE BAJA': 'badge-baja'
    };
    return clases[this.normalizarEstado(estado)] ?? 'badge-neutral';
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
    this.tandaNumeroRegistrosporPagina = Number(this.infraestructurasForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //TIPOS DE ESTRUCTURA QUE DIPLI RECONOCE COMO PISCINA. SE COMPARAN NORMALIZADOS (SIN TILDES, SIN ESPACIOS
  //REPETIDOS Y EN MAYÚSCULAS) PORQUE EL CATÁLOGO DE ORACLE NO GARANTIZA UN FORMATO ÚNICO:
  private readonly nombresTiposEstructurasPiscinas = [
    'PISCINA(S) CASINOS',
    'PISCINA(S) CENTRO RECREACIONAL',
    'PISCINA(S) DE EDUCACION / ENTRENAMIENTO'
  ];

  private normalizarNombreTipoEstructura(nombreTipoEstructura: unknown): string {
    return String(nombreTipoEstructura ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, ' ')
      .toUpperCase();
  }

  esInfraestructuraPiscina(infraestructura: InfraestructurasI): boolean {
    return this.nombresTiposEstructurasPiscinas.includes(
      this.normalizarNombreTipoEstructura(infraestructura.tipoEstructuraInfraestructuraDTO?.nombreTipoEstructuraInfraestructura)
    );
  }

  abrirModalHistorialQuimicos(infraestructura: InfraestructurasI): void {
    if (!this.esInfraestructuraPiscina(infraestructura)) return;

    this.spinnerService.showBeforeOpening(() => {
      this.infraestructuraSeleccionada = infraestructura;
      this.modalHistorialQuimicosVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalHistorialQuimicos(): void {
    this.modalHistorialQuimicosVisible = false;
    this.infraestructuraSeleccionada = null;
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
