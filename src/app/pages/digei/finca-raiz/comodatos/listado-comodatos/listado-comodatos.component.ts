import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ComodatosI } from '../../../../../interfaces/digei/finca-raiz/comodatos/comodatos.interface';
import { HistorialProveedoresProductosServiciosI } from '../../../../../interfaces/panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';
import { TerrenosI } from '../../../../../interfaces/digei/finca-raiz/terrenos/terrenos.interface';
import { ComodatosService } from '../../../../../services/digei/finca-raiz/comodatos/comodatos.service';
import { CatalogosArrendamientosService } from '../../../../../services/digei/finca-raiz/catalogos-arrendamientos/catalogos-arrendamientos.service';
import { TerrenosService } from '../../../../../services/digei/finca-raiz/terrenos/terrenos.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelComodatoComponent } from '../add-upd-del-comodato/add-upd-del-comodato.component';
import { VistaComodatoComponent } from '../vista-comodato/vista-comodato.component';

@Component({ selector: 'app-listado-comodatos', standalone: true, imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelComodatoComponent, VistaComodatoComponent], templateUrl: './listado-comodatos.component.html', styleUrl: './listado-comodatos.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ListadoComodatosComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.group({ keyword: [''], terreno: [''], cantidad: ['10'] });
  registros: ComodatosI[] = []; terrenos: TerrenosI[] = []; proveedores: HistorialProveedoresProductosServiciosI[] = [];
  totalRegistros = 0; totalRegistrosActivos = 0; totalRegistrosInactivos = 0;
  paginaActual = 0; cantidad = 10; modalEdicion = false; modalVista = false;
  modo: 'guardar'|'modificar'|'eliminar' = 'guardar'; seleccionado: ComodatosI|null = null; mensaje = '';
  constructor(private service: ComodatosService, private terrenosService: TerrenosService, private catalogos: CatalogosArrendamientosService, private spinner: SpinnerService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.terrenosService.findAllTerrenos(undefined, undefined, undefined, 'denominacionTerreno', 'ASC').subscribe(x => { this.terrenos=x; this.cdr.markForCheck(); }); this.catalogos.proveedores().subscribe(x => {this.proveedores=x; this.cdr.markForCheck();}); this.listar(); }
  listar(): void {
    const v = this.form.getRawValue();
    const keyword = v.keyword?.trim() || undefined;
    const idTerreno = v.terreno ? Number(v.terreno) : undefined;
    this.service.findAllComodatosPag(this.paginaActual, this.cantidad, undefined, keyword, idTerreno, 'idComodatoTerreno', 'ASC').subscribe({ next: registros => { this.registros = registros; this.cdr.markForCheck(); }, error: () => this.mostrar('No fue posible listar los comodatos.') });
    this.service.findCountTotalRegisters(undefined, keyword, idTerreno).subscribe(total => { this.totalRegistros = total; this.cdr.markForCheck(); });
    this.service.findCountRegistersByState('ACTIVO', undefined, keyword, idTerreno).subscribe(total => { this.totalRegistrosActivos = total; this.cdr.markForCheck(); });
    this.service.findCountRegistersByState('INACTIVO', undefined, keyword, idTerreno).subscribe(total => { this.totalRegistrosInactivos = total; this.cdr.markForCheck(); });
  }
  buscar():void{this.paginaActual=0;this.listar();} cambiarCantidad():void{this.cantidad=Number(this.form.value.cantidad);this.buscar();} totalPaginas():number{return Math.max(1,Math.ceil(this.totalRegistros/this.cantidad));} cambiarPagina(p:number):void{this.paginaActual=p;this.listar();}
  abrir(m:'guardar'|'modificar'|'eliminar',x:ComodatosI|null=null):void{this.spinner.mostrarAntesDeAbrir(()=>{this.modo=m;this.seleccionado=x;this.modalEdicion=true;this.cdr.markForCheck();});} ver(x:ComodatosI):void{this.spinner.mostrarAntesDeAbrir(()=>{this.seleccionado=x;this.modalVista=true;this.cdr.markForCheck();});} cerrar():void{this.modalEdicion=false;this.modalVista=false;this.seleccionado=null;}
  guardar(x:ComodatosI):void{const modificando=!!x.idComodatoTerreno;(modificando?this.service.updateComodato(x):this.service.addComodato(x)).subscribe({next:r=>{this.mostrar(r.mensaje||(modificando?'Comodato modificado correctamente.':'Comodato creado correctamente.'));this.cerrar();this.listar();},error:()=>this.mostrar(modificando?'No fue posible modificar el comodato.':'No fue posible crear el comodato.')});} eliminar(id:number):void{this.service.deleteComodato(id).subscribe({next:r=>{this.mostrar(r.mensaje||'Comodato eliminado correctamente.');this.cerrar();this.listar();},error:()=>this.mostrar('No fue posible eliminar el comodato.')});}
  nombresyApellidosProvProdOServ(p:HistorialProveedoresProductosServiciosI):string{return `${p.nombresProvProdOServ||''} ${p.primerApellidoProvProdOServ||''} ${p.segundoApellidoProvProdOServ||''}`.trim()||p.numRegHistorialProveedorProductoOServicio;} private mostrar(m:string):void{this.mensaje=m;this.cdr.markForCheck();setTimeout(()=>{this.mensaje='';this.cdr.markForCheck();},4000);}
}
