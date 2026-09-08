import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TerrenosI } from '../../../../../interfaces/digei/finca-raiz/terrenos/terrenos.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { SociedadesUnidadesCentralizadorasI } from '../../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';
import { TerrenosService } from '../../../../../services/digei/finca-raiz/terrenos/terrenos.service';
import { EstadosTerrenosService } from '../../../../../services/digei/finca-raiz/estados-terrenos/estados-terrenos.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SociedadesUnidadesCentralizadorasService } from '../../../../../services/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';
import { EstadosTerrenosI } from '../../../../../interfaces/digei/finca-raiz/estados-terrenos/estados-terrenos.interface';
import { AddUpdDelTerrenoComponent } from '../add-upd-del-terreno/add-upd-del-terreno.component';
import { VistaTerrenoComponent } from '../vista-terreno/vista-terreno.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-terrenos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelTerrenoComponent, VistaTerrenoComponent, SemaforoContadoresComponent],
  templateUrl: './listado-terrenos.component.html',
  styleUrl: './listado-terrenos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoTerrenosComponent implements OnInit {
  readonly terrenosForm: FormGroup;
  terrenos: TerrenosI[] = [];
  unidadesMilitares: UnidadesMilitaresI[] = [];
  sociedades: SociedadesUnidadesCentralizadorasI[] = [];
  estados: EstadosTerrenosI[] = [];
  totalRegistros = 0;
  readonly estadosTerreno = [
    { etiqueta: 'ARRENDADO', tono: 'arrendado' },
    { etiqueta: 'EN INVASION', tono: 'invasion' },
    { etiqueta: 'PATRIMONIAL', tono: 'patrimonial' },
    { etiqueta: 'RESERVA NATURAL', tono: 'reserva' }
  ];
  estadosContadores = this.estadosTerreno.map(estado => ({ ...estado, valor: 0 }));
  paginaActual = 0;
  cantidad = 10;
  modalEdicion = false;
  modalVista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: TerrenosI | null = null;
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly terrenosService: TerrenosService,
    private readonly unidadesService: UnidadesMilitaresService,
    private readonly sociedadesService: SociedadesUnidadesCentralizadorasService,
    private readonly estadosService: EstadosTerrenosService,
    private readonly spinner: SpinnerService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.terrenosForm = this.formBuilder.group({
      keyword: [''],
      unidad: [''],
      cantidad: ['10']
    });
  }

  ngOnInit(): void {
    this.unidadesService.findAllMilitaryUnits(undefined, undefined, 'nombreUnidadMilitar', 'ASC').subscribe(v => { this.unidadesMilitares = v; this.cdr.markForCheck(); });
    this.sociedadesService.findAllSociedadesUnidadesCentralizadoras(undefined, undefined, undefined, 'codigoSociedadUnidadCentralizadora', 'ASC').subscribe(v => { this.sociedades = v; this.cdr.markForCheck(); });
    this.estadosService.findAllEstadosTerrenos(undefined, 'nombreEstadoTerreno', 'ASC').subscribe(v => { this.estados = v; this.cdr.markForCheck(); });
    this.listar();
  }

  buscar(): void { this.paginaActual = 0; this.listar(); }

  listar(): void {
    const valor = this.terrenosForm.getRawValue();
    const keyword = valor.keyword?.trim().toUpperCase() || undefined;
    const unidad = valor.unidad || undefined;
    this.terrenosService.findAllTerrenosPag(this.paginaActual, this.cantidad, undefined, keyword, unidad, 'idTerreno', 'ASC').subscribe({
      next: data => { this.terrenos = data; this.cdr.markForCheck(); },
      error: error => { console.error('Error al listar terrenos', error); this.toast('error', 'No fue posible listar los terrenos.'); }
    });
    this.terrenosService.findCountTotalRegisters(undefined, keyword, unidad).subscribe(total => { this.totalRegistros = total; this.cdr.markForCheck(); });
    this.terrenosService.findAllTerrenos(undefined, keyword, unidad, 'idTerreno', 'ASC').subscribe({
      next: terrenosFiltrados => {
        this.estadosContadores = this.estadosTerreno.map(estado => ({
          ...estado,
          valor: terrenosFiltrados.filter(terreno =>
            this.normalizarEstado(terreno.estadoTerrenoDTO?.nombreEstadoTerreno) === estado.etiqueta
          ).length
        }));
        this.cdr.markForCheck();
      },
      error: error => console.error('Error al contar estados de terrenos', error)
    });
  }

  private normalizarEstado(estado: unknown): string {
    return String(estado ?? '').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  claseEstadoTerreno(estado: unknown): string {
    const clases: Record<string, string> = {
      ARRENDADO: 'badge-arrendado',
      'EN INVASION': 'badge-invasion',
      PATRIMONIAL: 'badge-patrimonial',
      'RESERVA NATURAL': 'badge-reserva'
    };
    return clases[this.normalizarEstado(estado)] ?? 'badge-neutral';
  }

  totalPaginas(): number { return Math.max(1, Math.ceil(this.totalRegistros / this.cantidad)); }
  cambiarPagina(pagina: number): void { this.paginaActual = pagina; this.listar(); }
  cambiarCantidad(): void { this.cantidad = Number(this.terrenosForm.value.cantidad); this.buscar(); }

  abrirEdicion(modo: 'guardar' | 'modificar' | 'eliminar', terreno: TerrenosI | null = null): void {
    this.spinner.mostrarAntesDeAbrir(() => { this.modo = modo; this.seleccionado = terreno; this.modalEdicion = true; this.cdr.markForCheck(); });
  }
  abrirVista(terreno: TerrenosI): void { this.spinner.mostrarAntesDeAbrir(() => { this.seleccionado = terreno; this.modalVista = true; this.cdr.markForCheck(); }); }
  cerrarEdicion(): void { this.modalEdicion = false; this.seleccionado = null; }
  cerrarVista(): void { this.modalVista = false; this.seleccionado = null; }

  guardar(terreno: TerrenosI): void {
    const operacion = terreno.idTerreno ? this.terrenosService.updateTerreno(terreno) : this.terrenosService.addTerreno(terreno);
    operacion.subscribe({
      next: respuesta => { this.toast('exito', respuesta.mensaje || 'Terreno guardado correctamente.'); this.cerrarEdicion(); this.listar(); },
      error: error => this.toast('error', error.error?.mensaje || 'No fue posible guardar el terreno.')
    });
  }

  eliminar(id: number): void {
    this.terrenosService.deleteTerreno(id).subscribe({
      next: respuesta => { this.toast('exito', respuesta.mensaje || 'Terreno eliminado correctamente.'); this.cerrarEdicion(); this.listar(); },
      error: error => this.toast('error', error.error?.mensaje || 'No fue posible eliminar el terreno.')
    });
  }

  private toast(tipo: 'exito' | 'error', mensaje: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTipo = tipo; this.toastMensaje = mensaje; this.cdr.markForCheck();
    this.toastTimer = setTimeout(() => { this.toastMensaje = ''; this.cdr.markForCheck(); }, 4000);
  }
}
