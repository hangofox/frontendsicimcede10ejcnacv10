import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { OficinasI } from '../../../../interfaces/panel-control/oficinas/oficinas.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

import { OficinasService } from '../../../../services/panel-control/oficinas/oficinas.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';

import { AddUpdDelOficinaComponent } from '../add-upd-del-oficina/add-upd-del-oficina.component';
import { VistaOficinaComponent } from '../vista-oficina/vista-oficina.component';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-oficinas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelOficinaComponent, VistaOficinaComponent, SemaforoContadoresComponent],
  templateUrl: './listado-oficinas.component.html',
  styleUrl: './listado-oficinas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoOficinasComponent implements OnInit {

  //CATÁLOGO DE UNIDADES MILITARES CARGADO DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];

  //PÁGINA ACTUAL DE OFICINAS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE RECORTA EN EL CLIENTE):
  oficinas: OficinasI[] = [];
  totalRegistros = 0;

  oficinasForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  oficinaSeleccionada: OficinasI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private oficinasService: OficinasService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private spinnerService: SpinnerService
  ) {
    this.oficinasForm = this.formBuilder.group({
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
    const valoresFormulario = this.oficinasForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;

    this.oficinasService.findAllOfficesPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      'idOficina',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.oficinas = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR OFICINAS: ', err)
    });

    this.oficinasService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE OFICINAS: ', err)
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
    this.tandaNumeroRegistrosporPagina = Number(this.oficinasForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', oficina: OficinasI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.oficinaSeleccionada = oficina;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(oficina: OficinasI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.oficinaSeleccionada = oficina;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.oficinaSeleccionada = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.oficinaSeleccionada = null;
  }

  //RECIBE LA OFICINA NUEVA O MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (POST SI ES NUEVA, PUT SI YA TIENE ID):
  guardarOficina(oficina: OficinasI): void {
    if (oficina.idOficina) {
      this.oficinasService.updateOffice(oficina).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Oficina modificada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL MODIFICAR OFICINA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar la oficina.');
        }
      });
    } else {
      this.oficinasService.addOffice(oficina).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Oficina creada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL CREAR OFICINA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear la oficina.');
        }
      });
    }
  }

  //RECIBE EL ID DE LA OFICINA A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarOficina(idOficina: number): void {
    this.oficinasService.deleteOffice(idOficina).subscribe({
      next: (respuesta) => {
        this.mostrarToast('exito', respuesta.mensaje || 'Oficina eliminada correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR OFICINA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la oficina.');
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
