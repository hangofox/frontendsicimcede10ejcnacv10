import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InfraestructurasI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';
import { HistorialQuimicosPiscinasInfraestI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/historial-quimicos-piscinas-infraest/historial-quimicos-piscinas-infraest.interface';
import { OficinasI } from '../../../../../../interfaces/panel-control/oficinas/oficinas.interface';
import { QuimicosPiscinasI } from '../../../../../../interfaces/panel-control/quimicos-piscinas/quimicos-piscinas.interface';
import { HistorialQuimicosPiscinasInfraestService } from '../../../../../../services/digei/finca-raiz/infraestructuras/historial-quimicos-piscinas-infraest/historial-quimicos-piscinas-infraest.service';
import { OficinasService } from '../../../../../../services/panel-control/oficinas/oficinas.service';
import { QuimicosPiscinasService } from '../../../../../../services/panel-control/quimicos-piscinas/quimicos-piscinas.service';
import { SpinnerService } from '../../../../../../services/spinner/spinner.service';
import { AddUpdDelHistorialQuimicoPiscinaInfraestComponent } from '../add-upd-del-historial-quimico-piscina-infraest/add-upd-del-historial-quimico-piscina-infraest.component';
import { VistaHistorialQuimicoPiscinaInfraestComponent } from '../vista-historial-quimico-piscina-infraest/vista-historial-quimico-piscina-infraest.component';

@Component({
  selector: 'app-listado-historial-quimicos-piscinas-infraest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelHistorialQuimicoPiscinaInfraestComponent, VistaHistorialQuimicoPiscinaInfraestComponent],
  templateUrl: './listado-historial-quimicos-piscinas-infraest.component.html',
  styleUrl: './listado-historial-quimicos-piscinas-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoHistorialQuimicosPiscinasInfraestComponent implements OnChanges {
  @Input({ required: true }) infraestructura!: InfraestructurasI;

  historiales: HistorialQuimicosPiscinasInfraestI[] = [];
  oficinas: OficinasI[] = [];
  quimicosPiscinas: QuimicosPiscinasI[] = [];
  totalRegistros = 0;
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;
  form: FormGroup;
  modalCrudVisible = false;
  modalVistaVisible = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialQuimicosPiscinasInfraestI | null = null;
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';

  constructor(
    formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private service: HistorialQuimicosPiscinasInfraestService,
    private oficinasService: OficinasService,
    private quimicosPiscinasService: QuimicosPiscinasService,
    private spinnerService: SpinnerService
  ) {
    this.form = formBuilder.group({ palabraClave: new FormControl(''), registrosPagina: new FormControl('10') });
    this.quimicosPiscinasService.findAllQuimicosPiscinas(undefined, undefined, 'nombreQuimicoPiscina', 'ASC').subscribe({
      next: quimicosPiscinas => {
        this.quimicosPiscinas = quimicosPiscinas;
        this.changeDetectorRef.markForCheck();
      },
      error: error => console.error('ERROR AL CARGAR QUÍMICOS DE PISCINAS: ', error)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['infraestructura'] && this.infraestructura?.idInfraestructura) {
      this.cargarOficinasUnidadInfraestructura();
      this.buscar();
    }
  }

  //CARGA ÚNICAMENTE LAS OFICINAS DE LA UNIDAD MILITAR A LA QUE PERTENECE LA INFRAESTRUCTURA:
  private cargarOficinasUnidadInfraestructura(): void {
    const siglaUnidadMilitar = String(this.infraestructura.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '');
    this.oficinasService.findAllOfficesLista(undefined, undefined, siglaUnidadMilitar || undefined, 'nombreOficina', 'ASC').subscribe({
      next: oficinas => {
        this.oficinas = oficinas;
        this.changeDetectorRef.markForCheck();
      },
      error: error => console.error('ERROR AL CARGAR OFICINAS DE LA UNIDAD MILITAR: ', error)
    });
  }

  buscar(): void {
    this.paginaActual = 0;
    this.listar();
  }

  listar(): void {
    const keyword = String(this.form.value.palabraClave || '').trim().toUpperCase() || undefined;
    const idInfraestructura = this.infraestructura.idInfraestructura;
    this.service.findAllHistorialesPag(this.paginaActual, this.tandaNumeroRegistrosporPagina, undefined, keyword, idInfraestructura, 'idHistorialQuimicoPiscinaInfraest', 'ASC').subscribe({
      next: data => { this.historiales = data; this.changeDetectorRef.markForCheck(); },
      error: error => console.error('ERROR AL LISTAR HISTORIAL DE QUÍMICOS DE PISCINAS: ', error)
    });
    this.service.findCountTotalRegisters(undefined, keyword, idInfraestructura).subscribe(total => {
      this.totalRegistros = total;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirCrud(modo: 'guardar' | 'modificar' | 'eliminar', historial: HistorialQuimicosPiscinasInfraestI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modo = modo; this.seleccionado = historial; this.modalCrudVisible = true; this.changeDetectorRef.markForCheck();
    });
  }

  abrirVista(historial: HistorialQuimicosPiscinasInfraestI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.seleccionado = historial; this.modalVistaVisible = true; this.changeDetectorRef.markForCheck();
    });
  }

  cerrarCrud(): void { this.modalCrudVisible = false; this.seleccionado = null; }
  cerrarVista(): void { this.modalVistaVisible = false; this.seleccionado = null; }

  guardar(historial: HistorialQuimicosPiscinasInfraestI): void {
    const solicitud = historial.idHistorialQuimicoPiscinaInfraest ? this.service.updateHistorial(historial) : this.service.addHistorial(historial);
    solicitud.subscribe({
      next: respuesta => { this.mostrarToast('exito', respuesta.mensaje || 'Registro guardado correctamente.'); this.listar(); this.cerrarCrud(); },
      error: error => this.mostrarToast('error', error.error?.mensaje || 'Error al guardar el registro.')
    });
  }

  eliminar(id: number): void {
    this.service.deleteHistorial(id).subscribe({
      next: respuesta => { this.mostrarToast('exito', respuesta.mensaje || 'Registro eliminado correctamente.'); this.listar(); this.cerrarCrud(); },
      error: error => this.mostrarToast('error', error.error?.mensaje || 'Error al eliminar el registro.')
    });
  }

  cambiarPagina(pagina: number): void { this.paginaActual = pagina; this.listar(); }
  cambiarTanda(): void { this.tandaNumeroRegistrosporPagina = Number(this.form.value.registrosPagina); this.buscar(); }
  totalPaginas(): number { return Math.max(Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina), 1); }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    this.toastTipo = tipo; this.toastMensaje = mensaje; this.changeDetectorRef.markForCheck();
    setTimeout(() => { this.toastMensaje = ''; this.changeDetectorRef.markForCheck(); }, 4000);
  }
}
