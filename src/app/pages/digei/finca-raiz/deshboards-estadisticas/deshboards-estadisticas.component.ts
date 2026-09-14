import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

import { TerrenosI } from '../../../../interfaces/digei/finca-raiz/terrenos/terrenos.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { ComodatosService } from '../../../../services/digei/finca-raiz/comodatos/comodatos.service';
import { InfraestructurasArrendadasService } from '../../../../services/digei/finca-raiz/infraestructuras-arrendadas/infraestructuras-arrendadas.service';
import { InfraestructurasService } from '../../../../services/digei/finca-raiz/infraestructuras/infraestructuras.service';
import { TerrenosService } from '../../../../services/digei/finca-raiz/terrenos/terrenos.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { etiquetasConectoresPlugin, valoresSobreBarrasPlugin } from '../../../../shared/chartjs/etiquetas-conectores.plugin';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

Chart.register(...registerables);

type TipoEstadistica = 'TERRENOS' | 'INFRAESTRUCTURAS' | 'INFRAESTRUCTURAS ARRENDADAS' | 'COMODATOS';
interface EstadoGrafica { etiqueta: string; tono: string; color: string; valor: number; }

@Component({
  selector: 'app-deshboards-estadisticas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent],
  templateUrl: './deshboards-estadisticas.component.html',
  styleUrl: './deshboards-estadisticas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeshboardsEstadisticasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('graficaTorta') graficaTortaRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficaBarras') graficaBarrasRef!: ElementRef<HTMLCanvasElement>;

  readonly filtrosForm: FormGroup;
  unidadesMilitares: UnidadesMilitaresI[] = [];
  terrenos: TerrenosI[] = [];
  totalRegistros = 0;
  estadosContadores: EstadoGrafica[] = [];
  cargando = false;
  mensajeError = '';

  private readonly estadosInfraestructuras = [
    { etiqueta: 'BUENO', tono: 'bueno', color: '#16833a' },
    { etiqueta: 'REGULAR', tono: 'regular', color: '#e66a00' },
    { etiqueta: 'MALO', tono: 'malo', color: '#c32c32' },
    { etiqueta: 'MANTENIMIENTO', tono: 'mantenimiento', color: '#d6a400' },
    { etiqueta: 'FUERA DE SERVICIO', tono: 'fuera-servicio', color: '#7550a8' },
    { etiqueta: 'DADA DE BAJA', tono: 'baja', color: '#6b7280' }
  ];
  private readonly estadosTerrenos = [
    { etiqueta: 'ARRENDADO', tono: 'arrendado', color: '#2674b8' },
    { etiqueta: 'EN INVASION', tono: 'invasion', color: '#c32c32' },
    { etiqueta: 'PATRIMONIAL', tono: 'patrimonial', color: '#8b5a16' },
    { etiqueta: 'RESERVA NATURAL', tono: 'reserva', color: '#16833a' }
  ];
  private readonly coloresComodatos = ['#2674b8', '#16833a', '#e66a00', '#7550a8', '#c32c32', '#6b7280'];
  private readonly tonosComodatos = ['arrendado', 'bueno', 'regular', 'fuera-servicio', 'malo', 'baja'];
  private graficas: Chart[] = [];
  private solicitudActual = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly infraestructurasService: InfraestructurasService,
    private readonly infraestructurasArrendadasService: InfraestructurasArrendadasService,
    private readonly terrenosService: TerrenosService,
    private readonly comodatosService: ComodatosService,
    private readonly unidadesMilitaresService: UnidadesMilitaresService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.filtrosForm = this.formBuilder.group({ tipo: ['TERRENOS'], keyword: [''], unidad: [''], terreno: [''] });
  }

  get tipoSeleccionado(): TipoEstadistica { return this.filtrosForm.value.tipo as TipoEstadistica; }
  get tituloSeleccionado(): string {
    return this.tipoSeleccionado === 'INFRAESTRUCTURAS' ? 'INFRAESTRUCTURAS' : this.tipoSeleccionado;
  }

  ngOnInit(): void {
    this.unidadesMilitaresService.findAllMilitaryUnits(undefined, undefined, 'nombreUnidadMilitar', 'ASC').subscribe({
      next: datos => { this.unidadesMilitares = datos; this.cdr.markForCheck(); },
      error: error => console.error('ERROR AL CARGAR UNIDADES MILITARES:', error)
    });
    this.terrenosService.findAllTerrenos(undefined, undefined, undefined, 'denominacionTerreno', 'ASC').subscribe({
      next: datos => { this.terrenos = datos; this.cdr.markForCheck(); },
      error: error => console.error('ERROR AL CARGAR TERRENOS:', error)
    });
  }

  ngAfterViewInit(): void { this.cargarEstadisticas(); }

  cambiarTipo(): void {
    this.filtrosForm.patchValue({ keyword: '', unidad: '', terreno: '' }, { emitEvent: false });
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    const solicitud = ++this.solicitudActual;
    const valores = this.filtrosForm.getRawValue();
    const keyword = valores.keyword?.trim().toUpperCase() || undefined;
    this.cargando = true;
    this.mensajeError = '';

    if (this.tipoSeleccionado === 'INFRAESTRUCTURAS') {
      const unidad = valores.unidad || undefined;
      this.infraestructurasService.findAllInfraestructuras(undefined, keyword, unidad, 'idInfraestructura', 'ASC').subscribe({
        next: datos => this.procesarEstadosFijos(solicitud, datos, this.estadosInfraestructuras, dato => dato.estadoUsoInfraestructura),
        error: error => this.procesarError(solicitud, error)
      });
      return;
    }

    if (this.tipoSeleccionado === 'INFRAESTRUCTURAS ARRENDADAS') {
      const unidad = valores.unidad || undefined;
      this.infraestructurasArrendadasService.findAllInfraestructurasArrendadas(undefined, keyword, 'idInfraestructuraArrendada', 'ASC').subscribe({
        next: datos => {
          const datosFiltrados = unidad
            ? datos.filter(dato => dato.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar === unidad)
            : datos;
          this.procesarEstadosFijos(solicitud, datosFiltrados, this.estadosInfraestructuras, dato => dato.estadoUsoInfraestructuraArrendada);
        },
        error: error => this.procesarError(solicitud, error)
      });
      return;
    }

    if (this.tipoSeleccionado === 'TERRENOS') {
      const unidad = valores.unidad || undefined;
      this.terrenosService.findAllTerrenos(undefined, keyword, unidad, 'idTerreno', 'ASC').subscribe({
        next: datos => this.procesarEstadosFijos(solicitud, datos, this.estadosTerrenos, dato => dato.estadoTerrenoDTO?.nombreEstadoTerreno),
        error: error => this.procesarError(solicitud, error)
      });
      return;
    }

    const idTerreno = valores.terreno ? Number(valores.terreno) : undefined;
    this.comodatosService.findAllComodatos(undefined, keyword, idTerreno, 'idComodatoTerreno', 'ASC').subscribe({
      next: datos => {
        if (solicitud !== this.solicitudActual) return;
        const cantidades = new Map<string, number>();
        datos.forEach(dato => {
          const estado = this.normalizar(dato.estadoTerreno) || 'SIN ESTADO';
          cantidades.set(estado, (cantidades.get(estado) || 0) + 1);
        });
        this.totalRegistros = datos.length;
        this.estadosContadores = Array.from(cantidades, ([etiqueta, valor], indice) => ({
          etiqueta, valor,
          tono: this.tonosComodatos[indice % this.tonosComodatos.length],
          color: this.coloresComodatos[indice % this.coloresComodatos.length]
        }));
        this.finalizarCarga();
      },
      error: error => this.procesarError(solicitud, error)
    });
  }

  limpiarFiltros(): void {
    this.filtrosForm.patchValue({ keyword: '', unidad: '', terreno: '' }, { emitEvent: false });
    this.cargarEstadisticas();
  }

  private procesarEstadosFijos<T>(solicitud: number, datos: T[], estados: Omit<EstadoGrafica, 'valor'>[], obtenerEstado: (dato: T) => unknown): void {
    if (solicitud !== this.solicitudActual) return;
    this.totalRegistros = datos.length;
    this.estadosContadores = estados.map(estado => ({ ...estado, valor: datos.filter(dato => this.normalizar(obtenerEstado(dato)) === estado.etiqueta).length }));
    this.finalizarCarga();
  }

  private finalizarCarga(): void {
    this.cargando = false;
    this.dibujarGraficas();
    this.cdr.markForCheck();
  }

  private procesarError(solicitud: number, error: unknown): void {
    if (solicitud !== this.solicitudActual) return;
    console.error('ERROR AL CARGAR DASHBOARDS Y ESTADISTICAS:', error);
    this.totalRegistros = 0;
    this.estadosContadores = [];
    this.cargando = false;
    this.mensajeError = 'No fue posible cargar las estadísticas.';
    this.destruirGraficas();
    this.cdr.markForCheck();
  }

  private dibujarGraficas(): void {
    this.destruirGraficas();
    const etiquetas = this.estadosContadores.map(estado => estado.etiqueta);
    const colores = this.estadosContadores.map(estado => estado.color);
    const valores = this.estadosContadores.map(estado => estado.valor);
    const titulo = this.tituloSeleccionado.toLowerCase();
    this.graficas.push(new Chart(this.graficaTortaRef.nativeElement, {
      type: 'pie', data: { labels: etiquetas, datasets: [{ data: valores, backgroundColor: colores, borderColor: '#fff', borderWidth: 2 }] },
      plugins: [etiquetasConectoresPlugin],
      options: { responsive: true, maintainAspectRatio: false, layout: { padding: { top: 35, right: 105, bottom: 15, left: 105 } }, plugins: { legend: { position: 'bottom' }, title: { display: true, text: `Distribución de ${titulo} por estado`, font: { size: 15, weight: 'bold' } } } }
    }));
    this.graficas.push(new Chart(this.graficaBarrasRef.nativeElement, {
      type: 'bar', data: { labels: etiquetas, datasets: [{ label: this.tituloSeleccionado, data: valores, backgroundColor: colores, borderRadius: 6 }] },
      plugins: [valoresSobreBarrasPlugin],
      options: { responsive: true, maintainAspectRatio: false, layout: { padding: { top: 20 } }, plugins: { legend: { display: false }, title: { display: true, text: `Cantidad de ${titulo} por estado`, font: { size: 15, weight: 'bold' } } }, scales: { y: { beginAtZero: true, grace: '15%', ticks: { precision: 0 } } } }
    }));
  }

  private normalizar(valor: unknown): string { return String(valor ?? '').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  private destruirGraficas(): void { this.graficas.forEach(grafica => grafica.destroy()); this.graficas = []; }
  ngOnDestroy(): void { this.solicitudActual++; this.destruirGraficas(); }
}
