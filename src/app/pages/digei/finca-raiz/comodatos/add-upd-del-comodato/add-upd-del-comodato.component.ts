import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComodatosI } from '../../../../../interfaces/digei/finca-raiz/comodatos/comodatos.interface';
import { HistorialProveedoresProductosServiciosI } from '../../../../../interfaces/panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';
import { TerrenosI } from '../../../../../interfaces/digei/finca-raiz/terrenos/terrenos.interface';

@Component({ selector: 'app-add-upd-del-comodato', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './add-upd-del-comodato.component.html', styleUrl: './add-upd-del-comodato.component.scss' })
export class AddUpdDelComodatoComponent implements OnChanges {
  @Input() modo: 'guardar'|'modificar'|'eliminar' = 'guardar';
  @Input() comodatoData: ComodatosI|null = null;
  @Input() terrenos: TerrenosI[] = [];
  @Input() proveedores: HistorialProveedoresProductosServiciosI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<ComodatosI>();
  @Output() eliminar = new EventEmitter<number>();
  private readonly fb = inject(FormBuilder);
  form = this.crear();

  ngOnChanges(): void { this.form = this.crear(); if (this.modo === 'eliminar') this.form.disable(); }
  private crear() {
    const x = this.comodatoData;
    return this.fb.group({
      id: [x?.idComodatoTerreno ?? null], terreno: [x?.terrenoDTO?.idTerreno ?? '', Validators.required],
      proveedor: [x?.historialProveedorProductoOServicioDTO?.idHistorialProveedorProductoOServicio ?? '', Validators.required],
      fechaHMSIniciacionComodatoTerreno: [{ value: this.fecha(x?.fechaHMSIniciacionComodatoTerreno) || this.ahora(), disabled: true }],
      //ORACLE EXIGE LA FECHA DE FINALIZACION (NOT NULL), INCLUSO AL CREAR. SE PRECARGA LA HORA LOCAL ACTUAL
      //COMO CAMPO INFORMATIVO DE SOLO LECTURA, IGUAL QUE LAS FECHAS DE AUDITORIA DE RESPONSABLES.
      fechaHMSFinalizacionComodatoTerreno: [{ value: this.ahora(), disabled: true }], estado: [x?.estadoTerreno ?? 'ACTIVO', Validators.required]
    });
  }
  enviar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v=this.form.getRawValue(), terreno=this.terrenos.find(x=>x.idTerreno===Number(v.terreno)), proveedor=this.proveedores.find(x=>x.idHistorialProveedorProductoOServicio===Number(v.proveedor));
    if (!terreno || !proveedor) return;
    this.guardar.emit({ idComodatoTerreno:v.id??undefined, terrenoDTO:terreno, historialProveedorProductoOServicioDTO:proveedor, fechaHMSIniciacionComodatoTerreno:this.backend(v.fechaHMSIniciacionComodatoTerreno!), fechaHMSFinalizacionComodatoTerreno:this.backend(v.fechaHMSFinalizacionComodatoTerreno!), estadoTerreno:v.estado! });
  }
  confirmar(): void { const id=this.form.getRawValue().id; if(id)this.eliminar.emit(id); }
  private fecha(v?:string):string{return v?String(v).replace(' ','T').slice(0,16):'';}
  private backend(v:string):string{return v?.length===16?`${v}:00`:v;}
  private ahora():string{const d=new Date(),z=(n:number)=>String(n).padStart(2,'0');return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`;}
}
