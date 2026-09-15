import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { QuimicosPiscinasI } from '../../../../interfaces/panel-control/quimicos-piscinas/quimicos-piscinas.interface';
import { QuimicosPiscinasService } from '../../../../services/panel-control/quimicos-piscinas/quimicos-piscinas.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelQuimicoPiscinaComponent } from '../add-upd-del-quimico-piscina/add-upd-del-quimico-piscina.component';
import { VistaQuimicoPiscinaComponent } from '../vista-quimico-piscina/vista-quimico-piscina.component';

@Component({
  selector: 'app-listado-quimicos-piscinas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelQuimicoPiscinaComponent, VistaQuimicoPiscinaComponent, SemaforoContadoresComponent],
  templateUrl: './listado-quimicos-piscinas.component.html',
  styleUrl: './listado-quimicos-piscinas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoQuimicosPiscinasComponent implements OnInit {

  //PÁGINA ACTUAL DE QUÍMICOS DE PISCINAS TRAÍDA DEL BACKEND:
  quimicosPiscinas: QuimicosPiscinasI[] = [];
  totalRegistros = 0;

  quimicosPiscinasForm: FormGroup;

  //PAGINACIÓN REAL CONTRA EL BACKEND:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE LOS MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  quimicoPiscinaSeleccionado: QuimicosPiscinasI | null = null;

  //MENSAJE DE RESULTADO DE LAS OPERACIONES:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private quimicosPiscinasService: QuimicosPiscinasService,
    private spinnerService: SpinnerService
  ) {
    this.quimicosPiscinasForm = this.formBuilder.group({
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
    const palabraClave = (this.quimicosPiscinasForm.value.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;

    this.quimicosPiscinasService.findAllQuimicosPiscinasPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      'idQuimicoPiscina',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.quimicosPiscinas = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => console.error('ERROR AL LISTAR QUÍMICOS DE PISCINAS: ', error)
    });

    this.quimicosPiscinasService.findCountTotalRegisters(undefined, keyword).subscribe({
      next: (total) => {
        this.totalRegistros = total;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => console.error('ERROR AL CONTAR QUÍMICOS DE PISCINAS: ', error)
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
    this.tandaNumeroRegistrosporPagina = Number(this.quimicosPiscinasForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL SOLICITADO DESPUÉS DE MOSTRAR EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', quimicoPiscina: QuimicosPiscinasI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.quimicoPiscinaSeleccionado = quimicoPiscina;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(quimicoPiscina: QuimicosPiscinasI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.quimicoPiscinaSeleccionado = quimicoPiscina;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.quimicoPiscinaSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.quimicoPiscinaSeleccionado = null;
  }

  //CREA O MODIFICA EL REGISTRO SEGÚN LA EXISTENCIA DEL IDENTIFICADOR:
  guardarQuimicoPiscina(quimicoPiscina: QuimicosPiscinasI): void {
    const solicitud = quimicoPiscina.idQuimicoPiscina
      ? this.quimicosPiscinasService.updateQuimicoPiscina(quimicoPiscina)
      : this.quimicosPiscinasService.addQuimicoPiscina(quimicoPiscina);

    solicitud.subscribe({
      next: (respuesta) => {
        const accion = quimicoPiscina.idQuimicoPiscina ? 'modificado' : 'creado';
        this.mostrarToast('exito', respuesta.mensaje || `Químico de piscina ${accion} correctamente.`);
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (error) => {
        console.error('ERROR AL GUARDAR QUÍMICO DE PISCINA: ', error);
        this.mostrarToast('error', error.error?.mensaje || 'Error al guardar el químico de piscina.');
      }
    });
  }

  //ELIMINA EL REGISTRO SELECCIONADO:
  eliminarQuimicoPiscina(idQuimicoPiscina: number): void {
    this.quimicosPiscinasService.deleteQuimicoPiscina(idQuimicoPiscina).subscribe({
      next: (respuesta) => {
        this.mostrarToast('exito', respuesta.mensaje || 'Químico de piscina eliminado correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (error) => {
        console.error('ERROR AL ELIMINAR QUÍMICO DE PISCINA: ', error);
        this.mostrarToast('error', error.error?.mensaje || 'Error al eliminar el químico de piscina.');
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
