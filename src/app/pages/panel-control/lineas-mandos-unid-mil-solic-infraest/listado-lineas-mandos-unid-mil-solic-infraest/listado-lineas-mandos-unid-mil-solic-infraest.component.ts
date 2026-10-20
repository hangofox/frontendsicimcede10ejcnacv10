import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { LineasMandosUnidadesMilitaresSolicInfraestI, LineasMandosUnidadesMilitaresSolicInfraestMsj } from '../../../../interfaces/panel-control/lineas-mandos-unid-mil-solic-infraest/lineas-mandos-unid-mil-solic-infraest.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

import { LineasMandosUnidadesMilitaresSolicInfraestService } from '../../../../services/panel-control/lineas-mandos-unid-mil-solic-infraest/lineas-mandos-unid-mil-solic-infraest.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';

import { AddUpdDelLineaMandoUnidMilSolicInfraestComponent } from '../add-upd-del-linea-mando-unid-mil-solic-infraest/add-upd-del-linea-mando-unid-mil-solic-infraest.component';
import { VistaLineaMandoUnidMilSolicInfraestComponent } from '../vista-linea-mando-unid-mil-solic-infraest/vista-linea-mando-unid-mil-solic-infraest.component';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-lineas-mandos-unid-mil-solic-infraest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelLineaMandoUnidMilSolicInfraestComponent, VistaLineaMandoUnidMilSolicInfraestComponent, SemaforoContadoresComponent],
  templateUrl: './listado-lineas-mandos-unid-mil-solic-infraest.component.html',
  styleUrl: './listado-lineas-mandos-unid-mil-solic-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoLineasMandosUnidMilSolicInfraestComponent implements OnInit {

  //CATÁLOGO DE UNIDADES MILITARES CARGADO DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];

  //PÁGINA ACTUAL DE LÍNEAS DE MANDO DE SOLICITUDES DE INFRAESTRUCTURAS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR):
  lineasMandosUnidadesMilitaresSolicInfraest: LineasMandosUnidadesMilitaresSolicInfraestI[] = [];
  totalRegistros = 0;

  lineasMandosUnidadesMilitaresSolicInfraestForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  lineaMandoUnidadMilitarSolicInfraestSeleccionada: LineasMandosUnidadesMilitaresSolicInfraestI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private lineasMandosUnidadesMilitaresSolicInfraestService: LineasMandosUnidadesMilitaresSolicInfraestService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private spinnerService: SpinnerService
  ) {
    this.lineasMandosUnidadesMilitaresSolicInfraestForm = this.formBuilder.group({
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
    const valoresFormulario = this.lineasMandosUnidadesMilitaresSolicInfraestForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;

    this.lineasMandosUnidadesMilitaresSolicInfraestService.findAllInfrastructureRequestMilitaryUnitChainsOfCommandPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      'idLineaMandoUnidadMilitarSolicInfraest',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.lineasMandosUnidadesMilitaresSolicInfraest = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR LÍNEAS DE MANDO DE SOLICITUDES DE INFRAESTRUCTURAS: ', err)
    });

    this.lineasMandosUnidadesMilitaresSolicInfraestService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE LÍNEAS DE MANDO DE SOLICITUDES DE INFRAESTRUCTURAS: ', err)
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
    this.tandaNumeroRegistrosporPagina = Number(this.lineasMandosUnidadesMilitaresSolicInfraestForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', lineaMandoUnidadMilitarSolicInfraest: LineasMandosUnidadesMilitaresSolicInfraestI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.lineaMandoUnidadMilitarSolicInfraestSeleccionada = lineaMandoUnidadMilitarSolicInfraest;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(lineaMandoUnidadMilitarSolicInfraest: LineasMandosUnidadesMilitaresSolicInfraestI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.lineaMandoUnidadMilitarSolicInfraestSeleccionada = lineaMandoUnidadMilitarSolicInfraest;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.lineaMandoUnidadMilitarSolicInfraestSeleccionada = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.lineaMandoUnidadMilitarSolicInfraestSeleccionada = null;
  }

  //RECIBE LA LÍNEA DE MANDO NUEVA O MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (POST SI ES NUEVA, PUT SI YA TIENE ID):
  guardarLineaMandoUnidadMilitarSolicInfraest(lineaMandoUnidadMilitarSolicInfraest: LineasMandosUnidadesMilitaresSolicInfraestI): void {
    if (lineaMandoUnidadMilitarSolicInfraest.idLineaMandoUnidadMilitarSolicInfraest) {
      this.lineasMandosUnidadesMilitaresSolicInfraestService.updateInfrastructureRequestMilitaryUnitChainOfCommand(lineaMandoUnidadMilitarSolicInfraest).subscribe({
        next: (respuesta) => this.procesarRespuestaGuardado(respuesta, 'Línea de mando modificada correctamente.', 'Error al modificar la línea de mando.'),
        error: (err) => {
          console.error('ERROR AL MODIFICAR LÍNEA DE MANDO DE SOLICITUD DE INFRAESTRUCTURA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar la línea de mando.');
        }
      });
    } else {
      this.lineasMandosUnidadesMilitaresSolicInfraestService.addInfrastructureRequestMilitaryUnitChainOfCommand(lineaMandoUnidadMilitarSolicInfraest).subscribe({
        next: (respuesta) => this.procesarRespuestaGuardado(respuesta, 'Línea de mando creada correctamente.', 'Error al crear la línea de mando.'),
        error: (err) => {
          console.error('ERROR AL CREAR LÍNEA DE MANDO DE SOLICITUD DE INFRAESTRUCTURA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear la línea de mando.');
        }
      });
    }
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. LA UNIDAD MILITAR YA TIENE UNA LÍNEA DE MANDO
  //REGISTRADA); EN ESE CASO SE MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO PARA CORREGIR LA UNIDAD MILITAR:
  private procesarRespuestaGuardado(respuesta: LineasMandosUnidadesMilitaresSolicInfraestMsj, mensajeExito: string, mensajeError: string): void {
    if (respuesta.banderaexito === false) {
      this.mostrarToast('error', respuesta.mensaje || mensajeError);
      return;
    }
    this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
    this.accionListar();
    this.cerrarModalAddUpdDel();
  }

  //RECIBE EL ID DE LA LÍNEA DE MANDO A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarLineaMandoUnidadMilitarSolicInfraest(idLineaMandoUnidadMilitarSolicInfraest: number): void {
    this.lineasMandosUnidadesMilitaresSolicInfraestService.deleteInfrastructureRequestMilitaryUnitChainOfCommand(idLineaMandoUnidadMilitarSolicInfraest).subscribe({
      next: (respuesta) => this.procesarRespuestaGuardado(respuesta, 'Línea de mando eliminada correctamente.', 'Error al eliminar la línea de mando.'),
      error: (err) => {
        console.error('ERROR AL ELIMINAR LÍNEA DE MANDO DE SOLICITUD DE INFRAESTRUCTURA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la línea de mando.');
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
