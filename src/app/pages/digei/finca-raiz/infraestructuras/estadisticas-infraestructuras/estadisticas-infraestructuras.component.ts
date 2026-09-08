import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { InfraestructurasService } from '../../../../../services/digei/finca-raiz/infraestructuras/infraestructuras.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { etiquetasConectoresPlugin, valoresSobreBarrasPlugin } from '../../../../../shared/chartjs/etiquetas-conectores.plugin';

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas-infraestructuras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent],
  templateUrl: './estadisticas-infraestructuras.component.html',
  styleUrl: './estadisticas-infraestructuras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EstadisticasInfraestructurasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('graficaTorta') graficaTortaRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficaBarras') graficaBarrasRef!: ElementRef<HTMLCanvasElement>;

  readonly filtrosForm: FormGroup;
  unidadesMilitares: UnidadesMilitaresI[] = [];
  totalRegistros = 0;
  cargando = false;
  mensajeError = '';

  readonly estados = [
    { etiqueta: 'BUENO', tono: 'bueno', color: '#16833a' },
    { etiqueta: 'REGULAR', tono: 'regular', color: '#e66a00' },
    { etiqueta: 'MALO', tono: 'malo', color: '#c32c32' },
    { etiqueta: 'MANTENIMIENTO', tono: 'mantenimiento', color: '#d6a400' },
    { etiqueta: 'FUERA DE SERVICIO', tono: 'fuera-servicio', color: '#7550a8' },
    { etiqueta: 'DADA DE BAJA', tono: 'baja', color: '#6b7280' }
  ];
  estadosContadores = this.estados.map(estado => ({ etiqueta: estado.etiqueta, tono: estado.tono, valor: 0 }));

  private graficas: Chart[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly infraestructurasService: InfraestructurasService,
    private readonly unidadesMilitaresService: UnidadesMilitaresService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.filtrosForm = this.formBuilder.group({ keyword: [''], unidad: [''] });
  }

  ngOnInit(): void {
    this.unidadesMilitaresService.findAllMilitaryUnits(undefined, undefined, 'nombreUnidadMilitar', 'ASC').subscribe({
      next: unidades => { this.unidadesMilitares = unidades; this.cdr.markForCheck(); },
      error: error => console.error('ERROR AL CARGAR UNIDADES MILITARES:', error)
    });
  }

  ngAfterViewInit(): void { this.cargarEstadisticas(); }

  cargarEstadisticas(): void {
    const valores = this.filtrosForm.getRawValue();
    const keyword = valores.keyword?.trim().toUpperCase() || undefined;
    const unidad = valores.unidad || undefined;
    this.cargando = true;
    this.mensajeError = '';

    this.infraestructurasService.findAllInfraestructuras(undefined, keyword, unidad, 'idInfraestructura', 'ASC').subscribe({
      next: registros => {
        this.totalRegistros = registros.length;
        this.estadosContadores = this.estados.map(estado => ({
          etiqueta: estado.etiqueta,
          tono: estado.tono,
          valor: registros.filter(registro => this.normalizar(registro.estadoUsoInfraestructura) === estado.etiqueta).length
        }));
        this.cargando = false;
        this.dibujarGraficas();
        this.cdr.markForCheck();
      },
      error: error => {
        console.error('ERROR AL CARGAR ESTADISTICAS DE INFRAESTRUCTURAS:', error);
        this.cargando = false;
        this.mensajeError = 'No fue posible cargar las estadísticas.';
        this.destruirGraficas();
        this.cdr.markForCheck();
      }
    });
  }

  limpiarFiltros(): void {
    this.filtrosForm.reset({ keyword: '', unidad: '' });
    this.cargarEstadisticas();
  }

  private dibujarGraficas(): void {
    this.destruirGraficas();
    const etiquetas = this.estados.map(estado => estado.etiqueta);
    const colores = this.estados.map(estado => estado.color);
    const valores = this.estadosContadores.map(estado => estado.valor);
    this.graficas.push(new Chart(this.graficaTortaRef.nativeElement, {
      type: 'pie', data: { labels: etiquetas, datasets: [{ data: valores, backgroundColor: colores, borderColor: '#fff', borderWidth: 2 }] },
      plugins: [etiquetasConectoresPlugin],
      options: { responsive: true, maintainAspectRatio: false, layout: { padding: { top: 35, right: 105, bottom: 15, left: 105 } }, plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Distribución por estado de uso', font: { size: 15, weight: 'bold' } } } }
    }));
    this.graficas.push(new Chart(this.graficaBarrasRef.nativeElement, {
      type: 'bar', data: { labels: etiquetas, datasets: [{ label: 'Infraestructuras', data: valores, backgroundColor: colores, borderRadius: 6 }] },
      plugins: [valoresSobreBarrasPlugin],
      options: { responsive: true, maintainAspectRatio: false, layout: { padding: { top: 16 } }, plugins: { legend: { display: false }, title: { display: true, text: 'Cantidad por estado de uso', font: { size: 15, weight: 'bold' } } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }
    }));
  }

  private normalizar(valor: unknown): string {
    return String(valor ?? '').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  private destruirGraficas(): void { this.graficas.forEach(grafica => grafica.destroy()); this.graficas = []; }
  ngOnDestroy(): void { this.destruirGraficas(); }
}
