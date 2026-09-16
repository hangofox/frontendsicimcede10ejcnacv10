import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CentrosCostosUnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/centros-costos-unidades-militares/centros-costos-unidades-militares.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { CentrosCostosUnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/centros-costos-unidades-militares/centros-costos-unidades-militares.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';
import { AddUpdDelCentroCostoUnidadMilitarComponent } from '../add-upd-del-centro-costo-unidad-militar/add-upd-del-centro-costo-unidad-militar.component';
import { VistaCentroCostoUnidadMilitarComponent } from '../vista-centro-costo-unidad-militar/vista-centro-costo-unidad-militar.component';

@Component({
  selector: 'app-listado-centros-costos-unidades-militares',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelCentroCostoUnidadMilitarComponent, VistaCentroCostoUnidadMilitarComponent],
  templateUrl: './listado-centros-costos-unidades-militares.component.html',
  styleUrl: './listado-centros-costos-unidades-militares.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoCentrosCostosUnidadesMilitaresComponent implements OnChanges {
  @Input({ required: true }) unidadMilitar!: UnidadesMilitaresI;
  centrosCostos: CentrosCostosUnidadesMilitaresI[] = [];
  totalRegistros = 0;
  paginaActual = 0;
  registrosPorPagina = 10;
  form: FormGroup;
  modalCrud = false;
  modalVista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: CentrosCostosUnidadesMilitaresI | null = null;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  constructor(formBuilder: FormBuilder, private readonly service: CentrosCostosUnidadesMilitaresService, private readonly spinner: SpinnerService, private readonly cdr: ChangeDetectorRef) {
    this.form = formBuilder.group({ palabraClave: new FormControl(''), registrosPagina: new FormControl('10') });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unidadMilitar'] && this.unidadMilitar?.idUnidadMilitar) this.buscar();
  }

  buscar(): void { this.paginaActual = 0; this.listar(); }

  listar(): void {
    const keyword = String(this.form.value.palabraClave || '').trim().toUpperCase() || undefined;
    const sigla = String(this.unidadMilitar.siglaoAcronimoUnidadMilitar || '') || undefined;
    this.service.findAllMilitaryUnitCostCentersPag(this.paginaActual, this.registrosPorPagina, undefined, keyword, sigla, 'idCentroCostoUnidadMilitar', 'ASC').subscribe({
      next: data => { this.centrosCostos = data; this.cdr.markForCheck(); },
      error: error => this.notificar('error', error.error?.mensaje || 'Error al consultar los centros de costo.')
    });
    this.service.findCountTotalRegisters(undefined, keyword, sigla).subscribe({
      next: total => { this.totalRegistros = total; this.cdr.markForCheck(); },
      error: error => this.notificar('error', error.error?.mensaje || 'Error al contar los centros de costo.')
    });
  }

  abrirCrud(modo: 'guardar' | 'modificar' | 'eliminar', item: CentrosCostosUnidadesMilitaresI | null = null): void {
    this.spinner.showBeforeOpening(() => { this.modo = modo; this.seleccionado = item; this.modalCrud = true; this.cdr.markForCheck(); });
  }

  abrirVista(item: CentrosCostosUnidadesMilitaresI): void {
    this.spinner.showBeforeOpening(() => { this.seleccionado = item; this.modalVista = true; this.cdr.markForCheck(); });
  }

  cerrarCrud(): void { this.modalCrud = false; this.seleccionado = null; }
  cerrarVista(): void { this.modalVista = false; this.seleccionado = null; }

  guardar(item: CentrosCostosUnidadesMilitaresI): void {
    const peticion = item.idCentroCostoUnidadMilitar ? this.service.updateMilitaryUnitCostCenter(item) : this.service.addMilitaryUnitCostCenter(item);
    peticion.subscribe({
      next: respuesta => { this.notificar('exito', respuesta.mensaje || 'Centro de costo guardado correctamente.'); this.listar(); this.cerrarCrud(); },
      error: error => this.notificar('error', error.error?.mensaje || 'Error al guardar el centro de costo.')
    });
  }

  eliminar(id: number): void {
    this.service.deleteMilitaryUnitCostCenter(id).subscribe({
      next: respuesta => { this.notificar('exito', respuesta.mensaje || 'Centro de costo eliminado correctamente.'); this.listar(); this.cerrarCrud(); },
      error: error => this.notificar('error', error.error?.mensaje || 'Error al eliminar el centro de costo.')
    });
  }

  cambiarPagina(pagina: number): void { this.paginaActual = pagina; this.listar(); }
  cambiarTanda(): void { this.registrosPorPagina = Number(this.form.value.registrosPagina); this.buscar(); }
  totalPaginas(): number { return Math.max(Math.ceil(this.totalRegistros / this.registrosPorPagina), 1); }

  private notificar(tipo: 'exito' | 'error', mensaje: string): void {
    this.tipoMensaje = tipo;
    this.mensaje = mensaje;
    this.cdr.markForCheck();
    setTimeout(() => { this.mensaje = ''; this.cdr.markForCheck(); }, 4000);
  }
}
