import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialProveedoresProductosServiciosI } from '../../../../../interfaces/panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';
import { InfraestructurasArrendadasI, TipoEstructuraInfraestructuraArrendadaI } from '../../../../../interfaces/digei/finca-raiz/infraestructuras-arrendadas/infraestructuras-arrendadas.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { CatalogosArrendamientosService } from '../../../../../services/digei/finca-raiz/catalogos-arrendamientos/catalogos-arrendamientos.service';
import { InfraestructurasArrendadasService } from '../../../../../services/digei/finca-raiz/infraestructuras-arrendadas/infraestructuras-arrendadas.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelInfraestructuraArrendadaComponent } from '../add-upd-del-infraestructura-arrendada/add-upd-del-infraestructura-arrendada.component';
import { VistaInfraestructuraArrendadaComponent } from '../vista-infraestructura-arrendada/vista-infraestructura-arrendada.component';

@Component({ selector: 'app-listado-infraestructuras-arrendadas', standalone: true, imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelInfraestructuraArrendadaComponent, VistaInfraestructuraArrendadaComponent], templateUrl: './listado-infraestructuras-arrendadas.component.html', styleUrl: './listado-infraestructuras-arrendadas.component.scss' })
export class ListadoInfraestructurasArrendadasComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.group({ keyword: [''], unidadMilitar: [''], tipoEstructura: [''], cantidad: ['10'] });
  registros: InfraestructurasArrendadasI[] = []; unidades: UnidadesMilitaresI[] = []; proveedores: HistorialProveedoresProductosServiciosI[] = []; tipos: TipoEstructuraInfraestructuraArrendadaI[] = [];
  totalRegistros = 0; paginaActual = 0; cantidad = 10; modalEdicion = false; modalVista = false; modo: 'guardar'|'modificar'|'eliminar' = 'guardar'; seleccionado: InfraestructurasArrendadasI|null = null; mensaje = ''; mensajeTipo: 'exito'|'error' = 'exito'; private mensajeTimer?: ReturnType<typeof setTimeout>;
  readonly estadosUso = [
    { etiqueta: 'BUENO', tono: 'bueno' }, { etiqueta: 'REGULAR', tono: 'regular' },
    { etiqueta: 'MALO', tono: 'malo' }, { etiqueta: 'MANTENIMIENTO', tono: 'mantenimiento' },
    { etiqueta: 'FUERA DE SERVICIO', tono: 'fuera-servicio' }, { etiqueta: 'DADA DE BAJA', tono: 'baja' }
  ];
  estadosUsoContadores = this.estadosUso.map(estado => ({ ...estado, valor: 0 }));
  constructor(private service: InfraestructurasArrendadasService, private catalogos: CatalogosArrendamientosService, private unidadesService: UnidadesMilitaresService, private spinner: SpinnerService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.catalogos.getProviders().subscribe(x => { this.proveedores=x; this.cdr.markForCheck(); }); this.catalogos.getStructureTypes().subscribe(x => { this.tipos=x; this.cdr.markForCheck(); }); this.unidadesService.findAllMilitaryUnits(undefined,undefined,'nombreUnidadMilitar','ASC').subscribe(x => { this.unidades=x; this.cdr.markForCheck(); }); this.listar(); }
  listar(): void {
    const keyword = this.form.value.keyword?.trim() || undefined;
    const siglaUnidad = this.form.value.unidadMilitar || '';
    const idTipoEstructura = Number(this.form.value.tipoEstructura) || undefined;
    this.service.findAllRentedInfrastructures(undefined, keyword, 'idInfraestructuraArrendada', 'ASC').subscribe(registros => {
      const filtrados = registros.filter(registro =>
        (!siglaUnidad || registro.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar === siglaUnidad) &&
        (!idTipoEstructura || Number(registro.tipoEstructuraInfraestructuraArrendadaDTO?.idTipoEstructuraInfraestructuraArrendada) === idTipoEstructura)
      );
      this.totalRegistros = filtrados.length;
      const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.cantidad) - 1);
      this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
      const inicio = this.paginaActual * this.cantidad;
      this.registros = filtrados.slice(inicio, inicio + this.cantidad);
      this.estadosUsoContadores = this.estadosUso.map(estado => ({ ...estado, valor: filtrados.filter(registro => this.normalizarEstado(registro.estadoUsoInfraestructuraArrendada) === estado.etiqueta).length }));
      this.cdr.markForCheck();
    });
  }
  buscar():void{this.paginaActual=0;this.listar();} cambiarCantidad():void{this.cantidad=Number(this.form.value.cantidad);this.buscar();} totalPaginas():number{return Math.max(1,Math.ceil(this.totalRegistros/this.cantidad));} cambiarPagina(p:number):void{this.paginaActual=p;this.listar();}
  abrir(m:'guardar'|'modificar'|'eliminar',x:InfraestructurasArrendadasI|null=null):void{this.spinner.showBeforeOpening(()=>{this.modo=m;this.seleccionado=x;this.modalEdicion=true;this.cdr.markForCheck();});} ver(x:InfraestructurasArrendadasI):void{this.seleccionado=x;this.modalVista=true;} cerrar():void{this.modalEdicion=false;this.modalVista=false;this.seleccionado=null;}
  guardar(x:InfraestructurasArrendadasI):void{const modificando=!!x.idInfraestructuraArrendada;(modificando?this.service.updateRentedInfrastructure(x):this.service.addRentedInfrastructure(x)).subscribe({next:r=>{this.mostrarMensaje('exito',r.mensaje||(modificando?'Infraestructura arrendada modificada correctamente.':'Infraestructura arrendada creada correctamente.'));this.cerrar();this.listar();},error:e=>this.mostrarMensaje('error',e.error?.mensaje||(modificando?'Error al modificar la infraestructura arrendada.':'Error al crear la infraestructura arrendada.'))});} eliminar(id:number):void{this.service.deleteRentedInfrastructure(id).subscribe({next:r=>{this.mostrarMensaje('exito',r.mensaje||'Infraestructura arrendada eliminada correctamente.');this.cerrar();this.listar();},error:e=>this.mostrarMensaje('error',e.error?.mensaje||'Error al eliminar la infraestructura arrendada.')});}
  claseEstadoUso(estado: unknown): string { const clases: Record<string,string>={BUENO:'badge-bueno',REGULAR:'badge-regular',MALO:'badge-malo',MANTENIMIENTO:'badge-mantenimiento','FUERA DE SERVICIO':'badge-fuera-servicio','DADA DE BAJA':'badge-baja'}; return clases[this.normalizarEstado(estado)]??'badge-neutral'; }
  private normalizarEstado(estado: unknown): string { return String(estado??'').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
  private mostrarMensaje(tipo:'exito'|'error',mensaje:string):void{if(this.mensajeTimer)clearTimeout(this.mensajeTimer);this.mensajeTipo=tipo;this.mensaje=mensaje;this.cdr.markForCheck();this.mensajeTimer=setTimeout(()=>{this.mensaje='';this.cdr.markForCheck();},4000);}
}
