import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InfraestructurasI } from '../../../../interfaces/digei/infraestructuras/infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { SociedadesUnidadesCentralizadorasI } from '../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';
import { TiposEstructurasInfraestructurasI } from '../../../../interfaces/digei/tipos-estructuras-infraestructuras/tipos-estructuras-infraestructuras.interface';
import { FuncionalidadesInfraestructurasI } from '../../../../interfaces/digei/funcionalidades-infraestructuras/funcionalidades-infraestructuras.interface';
import { SegurosI } from '../../../../interfaces/seguros/seguros.interface';
import { TerrenosI } from '../../../../interfaces/terrenos/terrenos.interface';

import { InfraestructurasService } from '../../../../services/digei/infraestructuras/infraestructuras.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SociedadesUnidadesCentralizadorasService } from '../../../../services/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.service';
import { TiposEstructurasInfraestructurasService } from '../../../../services/digei/tipos-estructuras-infraestructuras/tipos-estructuras-infraestructuras.service';
import { FuncionalidadesInfraestructurasService } from '../../../../services/digei/funcionalidades-infraestructuras/funcionalidades-infraestructuras.service';
import { SegurosService } from '../../../../services/seguros/seguros.service';
import { TerrenosService } from '../../../../services/terrenos/terrenos.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';

import { AddUpdDelInfraestructuraComponent } from '../add-upd-del-infraestructura/add-upd-del-infraestructura.component';
import { VistaInfraestructuraComponent } from '../vista-infraestructura/vista-infraestructura.component';

@Component({
  selector: 'app-listado-infraestructuras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelInfraestructuraComponent, VistaInfraestructuraComponent],
  templateUrl: './listado-infraestructuras.component.html',
  styleUrl: './listado-infraestructuras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoInfraestructurasComponent implements OnInit {

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

  infraestructurasForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
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
    this.sociedadesUnidadesCentralizadorasService.findAllSociedadesUnidadesCentralizadoras(undefined, undefined, undefined, 'codigoSociedadUnidadCentralizadora', 'ASC')
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
    this.tiposEstructurasInfraestructurasService.findAllTiposEstructurasInfraestructuras(undefined, undefined, 'nombreTipoEstructuraInfraestructura', 'ASC')
      .subscribe({
        next: (tiposEstructurasInfraestructuras) => {
          this.tiposEstructurasInfraestructuras = tiposEstructurasInfraestructuras;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE ESTRUCTURA DE INFRAESTRUCTURA: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE FUNCIONALIDADES DE INFRAESTRUCTURA DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarFuncionalidadesInfraestructuras(): void {
    this.funcionalidadesInfraestructurasService.findAllFuncionalidadesInfraestructuras('nombreFuncionalidadInfraestructura', 'ASC')
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
    this.segurosService.findAllSeguros(undefined, undefined, undefined, 'idSeguro', 'ASC')
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
    this.terrenosService.findAllTerrenos(undefined, undefined, undefined, 'denominacionTerreno', 'ASC')
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

    this.infraestructurasService.findAllInfraestructurasPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      'idInfraestructura',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.infraestructuras = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR INFRAESTRUCTURAS: ', err)
    });

    this.infraestructurasService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE INFRAESTRUCTURAS: ', err)
      });
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

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', infraestructura: InfraestructurasI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.infraestructuraSeleccionada = infraestructura;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(infraestructura: InfraestructurasI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.infraestructuraSeleccionada = infraestructura;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.infraestructuraSeleccionada = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.infraestructuraSeleccionada = null;
  }

  //RECIBE LA INFRAESTRUCTURA NUEVA O MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (POST SI ES NUEVA, PUT SI YA TIENE ID):
  guardarInfraestructura(infraestructura: InfraestructurasI): void {
    if (infraestructura.idInfraestructura) {
      this.infraestructurasService.updateInfraestructura(infraestructura).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Infraestructura modificada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL MODIFICAR INFRAESTRUCTURA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar la infraestructura.');
        }
      });
    } else {
      this.infraestructurasService.addInfraestructura(infraestructura).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Infraestructura creada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL CREAR INFRAESTRUCTURA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear la infraestructura.');
        }
      });
    }
  }

  //RECIBE EL ID DE LA INFRAESTRUCTURA A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarInfraestructura(idInfraestructura: number): void {
    this.infraestructurasService.deleteInfraestructura(idInfraestructura).subscribe({
      next: (respuesta) => {
        this.mostrarToast('exito', respuesta.mensaje || 'Infraestructura eliminada correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR INFRAESTRUCTURA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la infraestructura.');
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
