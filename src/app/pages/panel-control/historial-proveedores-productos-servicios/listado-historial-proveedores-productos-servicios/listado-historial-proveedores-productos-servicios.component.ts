import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialProveedoresProductosServiciosI } from '../../../../interfaces/panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';
import { HistorialProveedoresProductosServiciosService } from '../../../../services/panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.service';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelHistorialProveedorProductoServicioComponent } from '../add-upd-del-historial-proveedor-producto-servicio/add-upd-del-historial-proveedor-producto-servicio.component';
import { VistaHistorialProveedorProductoServicioComponent } from '../vista-historial-proveedor-producto-servicio/vista-historial-proveedor-producto-servicio.component';

@Component({
  selector: 'app-listado-historial-proveedores-productos-servicios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelHistorialProveedorProductoServicioComponent, VistaHistorialProveedorProductoServicioComponent],
  templateUrl: './listado-historial-proveedores-productos-servicios.component.html',
  styleUrl: './listado-historial-proveedores-productos-servicios.component.scss'
})
export class ListadoHistorialProveedoresProductosServiciosComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cantidad: ['10'] });
  registros: HistorialProveedoresProductosServiciosI[] = [];
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialProveedoresProductosServiciosI | null = null;
  toast = '';

  constructor(
    private readonly service: HistorialProveedoresProductosServiciosService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.listar(); }

  //EL HISTORIAL NO TIENE COLUMNA DE ESTADO NI EN LA TABLA DE ORACLE NI EN HistorialProveedorProductoOServicioDTO,
  //ASÍ QUE AQUÍ SOLO SE LISTA LA PÁGINA Y SE CUENTA EL TOTAL FILTRADO — MISMO PATRÓN QUE
  //ListadoHistorialIntegrantesDocumentosComponent:
  listar(): void {
    const keyword = this.form.value.keyword?.trim() || undefined;
    this.service.findAllProductOrServiceProviderHistoriesPag(this.pagina, this.cantidad, undefined, keyword, 'idHistorialProveedorProductoOServicio', 'ASC').subscribe(registros => {
      this.registros = registros;
      this.cdr.markForCheck();
    });
    this.service.findCountTotalRegisters(undefined, keyword).subscribe(total => {
      this.total = total;
      this.cdr.markForCheck();
    });
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: HistorialProveedoresProductosServiciosI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: HistorialProveedoresProductosServiciosI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: HistorialProveedoresProductosServiciosI): void {
    const modificar = !!registro.idHistorialProveedorProductoOServicio;
    (modificar ? this.service.updateProductOrServiceProviderHistory(registro) : this.service.addProductOrServiceProviderHistory(registro)).subscribe(respuesta => {
      this.toast = respuesta.mensaje || (modificar ? 'Historial modificado correctamente.' : 'Historial creado correctamente.');
      this.cerrar();
      this.listar();
    });
  }

  eliminar(id: number): void {
    this.service.deleteProductOrServiceProviderHistory(id).subscribe(respuesta => {
      this.toast = respuesta.mensaje || 'Historial eliminado correctamente.';
      this.cerrar();
      this.listar();
    });
  }
}
