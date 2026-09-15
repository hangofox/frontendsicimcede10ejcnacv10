import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CentrosCostosOficinasI } from '../../../../../interfaces/panel-control/oficinas/centros-costos-oficinas/centros-costos-oficinas.interface';
import { OficinasI } from '../../../../../interfaces/panel-control/oficinas/oficinas.interface';
import { CentrosCostosOficinasService } from '../../../../../services/panel-control/oficinas/centros-costos-oficinas/centros-costos-oficinas.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';
import { AddUpdDelCentroCostoOficinaComponent } from '../add-upd-del-centro-costo-oficina/add-upd-del-centro-costo-oficina.component';
import { VistaCentroCostoOficinaComponent } from '../vista-centro-costo-oficina/vista-centro-costo-oficina.component';

@Component({ selector: 'app-listado-centros-costos-oficinas', standalone: true, imports: [CommonModule, ReactiveFormsModule, AddUpdDelCentroCostoOficinaComponent, VistaCentroCostoOficinaComponent], templateUrl: './listado-centros-costos-oficinas.component.html', styleUrl: './listado-centros-costos-oficinas.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ListadoCentrosCostosOficinasComponent implements OnChanges {
  @Input({ required: true }) oficina!: OficinasI;
  centrosCostos: CentrosCostosOficinasI[] = [];
  totalRegistros = 0;
  paginaActual = 0;
  registrosPorPagina = 10;
  form: FormGroup;
  modalCrud = false;
  modalVista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: CentrosCostosOficinasI | null = null;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  constructor(formBuilder: FormBuilder, private service: CentrosCostosOficinasService, private spinner: SpinnerService, private cdr: ChangeDetectorRef) {
    this.form = formBuilder.group({ palabraClave: new FormControl(''), registrosPagina: new FormControl('10') });
  }

  ngOnChanges(changes: SimpleChanges): void { if (changes['oficina'] && this.oficina?.idOficina) this.buscar(); }
  buscar(): void { this.paginaActual = 0; this.listar(); }
  listar(): void {
    const keyword = String(this.form.value.palabraClave || '').trim().toUpperCase() || undefined;
    const sigla = String(this.oficina.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '') || undefined;
    const nombre = String(this.oficina.nombreOficina);
    this.service.findAllCentrosCostosOficinasPag(this.paginaActual, this.registrosPorPagina, undefined, keyword, sigla, nombre, 'idCentroCostoOficina', 'ASC').subscribe(data => { this.centrosCostos = data; this.cdr.markForCheck(); });
    this.service.findCountTotalRegisters(undefined, keyword, sigla, nombre).subscribe(total => { this.totalRegistros = total; this.cdr.markForCheck(); });
  }
  abrirCrud(modo: 'guardar' | 'modificar' | 'eliminar', item: CentrosCostosOficinasI | null = null): void { this.spinner.mostrarAntesDeAbrir(() => { this.modo = modo; this.seleccionado = item; this.modalCrud = true; this.cdr.markForCheck(); }); }
  abrirVista(item: CentrosCostosOficinasI): void { this.spinner.mostrarAntesDeAbrir(() => { this.seleccionado = item; this.modalVista = true; this.cdr.markForCheck(); }); }
  cerrarCrud(): void { this.modalCrud = false; this.seleccionado = null; }
  cerrarVista(): void { this.modalVista = false; this.seleccionado = null; }
  guardar(item: CentrosCostosOficinasI): void {
    const peticion = item.idCentroCostoOficina ? this.service.updateCentroCostoOficina(item) : this.service.addCentroCostoOficina(item);
    peticion.subscribe({ next: respuesta => { this.notificar('exito', respuesta.mensaje || 'Centro de costo guardado correctamente.'); this.listar(); this.cerrarCrud(); }, error: error => this.notificar('error', error.error?.mensaje || 'Error al guardar el centro de costo.') });
  }
  eliminar(id: number): void { this.service.deleteCentroCostoOficina(id).subscribe({ next: respuesta => { this.notificar('exito', respuesta.mensaje || 'Centro de costo eliminado correctamente.'); this.listar(); this.cerrarCrud(); }, error: error => this.notificar('error', error.error?.mensaje || 'Error al eliminar el centro de costo.') }); }
  cambiarPagina(pagina: number): void { this.paginaActual = pagina; this.listar(); }
  cambiarTanda(): void { this.registrosPorPagina = Number(this.form.value.registrosPagina); this.buscar(); }
  totalPaginas(): number { return Math.max(Math.ceil(this.totalRegistros / this.registrosPorPagina), 1); }
  private notificar(tipo: 'exito' | 'error', mensaje: string): void { this.tipoMensaje = tipo; this.mensaje = mensaje; this.cdr.markForCheck(); setTimeout(() => { this.mensaje = ''; this.cdr.markForCheck(); }, 4000); }
}
