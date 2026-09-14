import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistorialProveedoresProductosServiciosI } from '../../../../interfaces/panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';
import { TipoEstructuraInfraestructuraArrendadaI } from '../../../../interfaces/digei/finca-raiz/infraestructuras-arrendadas/infraestructuras-arrendadas.interface';
@Injectable({ providedIn: 'root' })
export class CatalogosArrendamientosService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private readonly http: HttpClient) {}
  proveedores(): Observable<HistorialProveedoresProductosServiciosI[]> { return this.http.get<HistorialProveedoresProductosServiciosI[]>(`${this.baseUrl}/historialesProveedoresProductosOServicios/lista`, { params: new HttpParams().set('orderBy', 'nombresProvProdOServ').set('orderMode', 'ASC') }); }
  tiposEstructura(): Observable<TipoEstructuraInfraestructuraArrendadaI[]> { return this.http.get<TipoEstructuraInfraestructuraArrendadaI[]>(`${this.baseUrl}/tiposEstructurasInfraestructurasArrendadas/lista`, { params: new HttpParams().set('orderBy', 'nombreTipoEstructuraInfraestructuraArrendada').set('orderMode', 'ASC') }); }
}
