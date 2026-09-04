import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UnidadesMilitaresRealizadorasMantenimientosI } from '../../../../interfaces/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

import { UnidadesMilitaresRealizadorasMantenimientosService } from '../../../../services/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';

import { AddUpdDelUnidadMilitarRealizMttoComponent } from '../add-upd-del-unidad-militar-realiz-mtto/add-upd-del-unidad-militar-realiz-mtto.component';
import { VistaUnidadMilitarRealizMttoComponent } from '../vista-unidad-militar-realiz-mtto/vista-unidad-militar-realiz-mtto.component';

@Component({
  selector: 'app-listado-unidades-militares-realiz-mttos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelUnidadMilitarRealizMttoComponent, VistaUnidadMilitarRealizMttoComponent],
  templateUrl: './listado-unidades-militares-realiz-mttos.component.html',
  styleUrl: './listado-unidades-militares-realiz-mttos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoUnidadesMilitaresRealizMttosComponent implements OnInit {

  //CATÁLOGO DE UNIDADES MILITARES CARGADO DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];

  //PÁGINA ACTUAL DE UNIDADES MILITARES REALIZADORAS DE MANTENIMIENTOS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR):
  unidadesMilitaresRealizMttos: UnidadesMilitaresRealizadorasMantenimientosI[] = [];
  totalRegistros = 0;

  unidadesMilitaresRealizMttosForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  unidadMilitarRealizMttoSeleccionada: UnidadesMilitaresRealizadorasMantenimientosI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private unidadesMilitaresRealizMttosService: UnidadesMilitaresRealizadorasMantenimientosService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private spinnerService: SpinnerService
  ) {
    this.unidadesMilitaresRealizMttosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
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

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE Y LA UNIDAD MILITAR SELECCIONADAS:
  accionListar(): void {
    const valoresFormulario = this.unidadesMilitaresRealizMttosForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;

    this.unidadesMilitaresRealizMttosService.findAllMaintenancePerformingMilitaryUnitsPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      'idUnidadMilitarRealizadoraMantenimiento',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.unidadesMilitaresRealizMttos = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR UNIDADES MILITARES REALIZADORAS DE MANTENIMIENTOS: ', err)
    });

    this.unidadesMilitaresRealizMttosService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE UNIDADES MILITARES REALIZADORAS DE MANTENIMIENTOS: ', err)
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
    this.tandaNumeroRegistrosporPagina = Number(this.unidadesMilitaresRealizMttosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', unidadMilitarRealizMtto: UnidadesMilitaresRealizadorasMantenimientosI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.unidadMilitarRealizMttoSeleccionada = unidadMilitarRealizMtto;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(unidadMilitarRealizMtto: UnidadesMilitaresRealizadorasMantenimientosI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.unidadMilitarRealizMttoSeleccionada = unidadMilitarRealizMtto;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.unidadMilitarRealizMttoSeleccionada = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.unidadMilitarRealizMttoSeleccionada = null;
  }

  //RECIBE LA UNIDAD MILITAR REALIZADORA DE MANTENIMIENTOS NUEVA O MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (POST SI ES NUEVA, PUT SI YA TIENE ID):
  guardarUnidadMilitarRealizMtto(unidadMilitarRealizMtto: UnidadesMilitaresRealizadorasMantenimientosI): void {
    if (unidadMilitarRealizMtto.idUnidadMilitarRealizadoraMantenimiento) {
      this.unidadesMilitaresRealizMttosService.updateMaintenancePerformingMilitaryUnit(unidadMilitarRealizMtto).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Unidad militar realizadora de mantenimientos modificada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL MODIFICAR UNIDAD MILITAR REALIZADORA DE MANTENIMIENTOS: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar la unidad militar realizadora de mantenimientos.');
        }
      });
    } else {
      this.unidadesMilitaresRealizMttosService.addMaintenancePerformingMilitaryUnit(unidadMilitarRealizMtto).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Unidad militar realizadora de mantenimientos creada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL CREAR UNIDAD MILITAR REALIZADORA DE MANTENIMIENTOS: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear la unidad militar realizadora de mantenimientos.');
        }
      });
    }
  }

  //RECIBE EL ID DE LA UNIDAD MILITAR REALIZADORA DE MANTENIMIENTOS A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarUnidadMilitarRealizMtto(idUnidadMilitarRealizadoraMantenimiento: number): void {
    this.unidadesMilitaresRealizMttosService.deleteMaintenancePerformingMilitaryUnit(idUnidadMilitarRealizadoraMantenimiento).subscribe({
      next: (respuesta) => {
        this.mostrarToast('exito', respuesta.mensaje || 'Unidad militar realizadora de mantenimientos eliminada correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR UNIDAD MILITAR REALIZADORA DE MANTENIMIENTOS: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la unidad militar realizadora de mantenimientos.');
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
