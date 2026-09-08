import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SociedadesUnidadesCentralizadorasI } from '../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

import { SociedadesUnidadesCentralizadorasService } from '../../../../services/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';

import { AddUpdDelSociedadUnidadCentralizadoraComponent } from '../add-upd-del-sociedad-unidad-centralizadora/add-upd-del-sociedad-unidad-centralizadora.component';
import { VistaSociedadUnidadCentralizadoraComponent } from '../vista-sociedad-unidad-centralizadora/vista-sociedad-unidad-centralizadora.component';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-sociedades-unidades-centralizadoras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelSociedadUnidadCentralizadoraComponent, VistaSociedadUnidadCentralizadoraComponent, SemaforoContadoresComponent],
  templateUrl: './listado-sociedades-unidades-centralizadoras.component.html',
  styleUrl: './listado-sociedades-unidades-centralizadoras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoSociedadesUnidadesCentralizadorasComponent implements OnInit {

  //CATÁLOGO DE UNIDADES MILITARES CARGADO DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];

  //PÁGINA ACTUAL DE SOCIEDADES DE UNIDADES CENTRALIZADORAS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR):
  sociedadesUnidadesCentralizadoras: SociedadesUnidadesCentralizadorasI[] = [];
  totalRegistros = 0;

  sociedadesUnidadesCentralizadorasForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  sociedadUnidadCentralizadoraSeleccionada: SociedadesUnidadesCentralizadorasI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private sociedadesUnidadesCentralizadorasService: SociedadesUnidadesCentralizadorasService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private spinnerService: SpinnerService
  ) {
    this.sociedadesUnidadesCentralizadorasForm = this.formBuilder.group({
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
    const valoresFormulario = this.sociedadesUnidadesCentralizadorasForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;

    this.sociedadesUnidadesCentralizadorasService.findAllSociedadesUnidadesCentralizadorasPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      'idSociedadUnidadCentralizadora',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.sociedadesUnidadesCentralizadoras = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR SOCIEDADES DE UNIDADES CENTRALIZADORAS: ', err)
    });

    this.sociedadesUnidadesCentralizadorasService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE SOCIEDADES DE UNIDADES CENTRALIZADORAS: ', err)
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
    this.tandaNumeroRegistrosporPagina = Number(this.sociedadesUnidadesCentralizadorasForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', sociedadUnidadCentralizadora: SociedadesUnidadesCentralizadorasI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.sociedadUnidadCentralizadoraSeleccionada = sociedadUnidadCentralizadora;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(sociedadUnidadCentralizadora: SociedadesUnidadesCentralizadorasI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.sociedadUnidadCentralizadoraSeleccionada = sociedadUnidadCentralizadora;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.sociedadUnidadCentralizadoraSeleccionada = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.sociedadUnidadCentralizadoraSeleccionada = null;
  }

  //RECIBE LA SOCIEDAD DE UNIDAD CENTRALIZADORA NUEVA O MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (POST SI ES NUEVA, PUT SI YA TIENE ID):
  guardarSociedadUnidadCentralizadora(sociedadUnidadCentralizadora: SociedadesUnidadesCentralizadorasI): void {
    if (sociedadUnidadCentralizadora.idSociedadUnidadCentralizadora) {
      this.sociedadesUnidadesCentralizadorasService.updateSociedadUnidadCentralizadora(sociedadUnidadCentralizadora).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Unidad centralizadora modificada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL MODIFICAR SOCIEDAD DE UNIDAD CENTRALIZADORA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar la unidad centralizadora.');
        }
      });
    } else {
      this.sociedadesUnidadesCentralizadorasService.addSociedadUnidadCentralizadora(sociedadUnidadCentralizadora).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Unidad centralizadora creada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL CREAR SOCIEDAD DE UNIDAD CENTRALIZADORA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear la unidad centralizadora.');
        }
      });
    }
  }

  //RECIBE EL ID DE LA SOCIEDAD DE UNIDAD CENTRALIZADORA A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarSociedadUnidadCentralizadora(idSociedadUnidadCentralizadora: number): void {
    this.sociedadesUnidadesCentralizadorasService.deleteSociedadUnidadCentralizadora(idSociedadUnidadCentralizadora).subscribe({
      next: (respuesta) => {
        this.mostrarToast('exito', respuesta.mensaje || 'Unidad centralizadora eliminada correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR SOCIEDAD DE UNIDAD CENTRALIZADORA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la unidad centralizadora.');
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
