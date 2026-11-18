import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RazasCaninosI } from '../../../../interfaces/panel-control/razas-caninos/razas-caninos.interface';
import { RazasCaninosService } from '../../../../services/panel-control/razas-caninos/razas-caninos.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelRazaCaninoComponent } from '../add-upd-del-raza-canino/add-upd-del-raza-canino.component';
import { VistaRazaCaninoComponent } from '../vista-raza-canino/vista-raza-canino.component';

@Component({
  selector: 'app-listado-razas-caninos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelRazaCaninoComponent, VistaRazaCaninoComponent, SemaforoContadoresComponent],
  templateUrl: './listado-razas-caninos.component.html',
  styleUrl: './listado-razas-caninos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoRazasCaninosComponent implements OnInit {

  //PÁGINA ACTUAL DE RAZAS DE CANINOS TRAÍDA DEL BACKEND:
  razasCaninos: RazasCaninosI[] = [];
  totalRegistros = 0;

  razasCaninosForm: FormGroup;

  //PAGINACIÓN REAL CONTRA EL BACKEND:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE LOS MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  razaCaninoSeleccionado: RazasCaninosI | null = null;

  //MENSAJE DE RESULTADO DE LAS OPERACIONES:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private razasCaninosService: RazasCaninosService,
    private spinnerService: SpinnerService
  ) {
    this.razasCaninosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.accionListar();
  }

  //REINICIA LA PÁGINA Y CONSULTA EL BACKEND CON EL FILTRO ACTUAL:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA EL LISTADO PAGINADO Y EL TOTAL DE REGISTROS FILTRADOS:
  accionListar(): void {
    const palabraClave = (this.razasCaninosForm.value.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;

    this.razasCaninosService.findAllCanineBreedsPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      'idRazaCanino',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.razasCaninos = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => console.error('ERROR AL LISTAR RAZAS DE CANINOS: ', error)
    });

    //EL BACKEND NO TIENE ENDPOINT DE CONTEO PARA RAZAS DE CANINOS: SE CUENTA SOBRE EL LISTADO SIN PAGINACIÓN CON EL MISMO FILTRO:
    this.razasCaninosService.findAllCanineBreeds(undefined, keyword).subscribe({
      next: (razasCaninos) => {
        this.totalRegistros = razasCaninos.length;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => console.error('ERROR AL CONTAR RAZAS DE CANINOS: ', error)
    });
  }

  calcularTotalPaginas(): number {
    return Math.max(Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina), 1);
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.accionListar();
  }

  seleccionarTandaNumeroRegistrosporPagina(): void {
    this.tandaNumeroRegistrosporPagina = Number(this.razasCaninosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL SOLICITADO DESPUÉS DE MOSTRAR EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', razaCanino: RazasCaninosI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.razaCaninoSeleccionado = razaCanino;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(razaCanino: RazasCaninosI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.razaCaninoSeleccionado = razaCanino;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.razaCaninoSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.razaCaninoSeleccionado = null;
  }

  //CREA O MODIFICA EL REGISTRO SEGÚN LA EXISTENCIA DEL IDENTIFICADOR:
  guardarRazaCanino(razaCanino: RazasCaninosI): void {
    const solicitud = razaCanino.idRazaCanino
      ? this.razasCaninosService.updateCanineBreed(razaCanino)
      : this.razasCaninosService.addCanineBreed(razaCanino);

    solicitud.subscribe({
      next: (respuesta) => {
        const accion = razaCanino.idRazaCanino ? 'modificada' : 'creada';
        this.mostrarToast('exito', respuesta.mensaje || `Raza de canino ${accion} correctamente.`);
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (error) => {
        console.error('ERROR AL GUARDAR RAZA DE CANINO: ', error);
        this.mostrarToast('error', error.error?.mensaje || 'Error al guardar la raza de canino.');
      }
    });
  }

  //ELIMINA EL REGISTRO SELECCIONADO:
  eliminarRazaCanino(idRazaCanino: number): void {
    this.razasCaninosService.deleteCanineBreed(idRazaCanino).subscribe({
      next: (respuesta) => {
        this.mostrarToast('exito', respuesta.mensaje || 'Raza de canino eliminada correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (error) => {
        console.error('ERROR AL ELIMINAR RAZA DE CANINO: ', error);
        this.mostrarToast('error', error.error?.mensaje || 'Error al eliminar la raza de canino.');
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
