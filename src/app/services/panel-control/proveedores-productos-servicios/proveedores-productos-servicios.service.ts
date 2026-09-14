import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProveedoresProductosServiciosI, ProveedoresProductosServiciosMsj } from '../../../interfaces/panel-control/proveedores-productos-servicios/proveedores-productos-servicios.interface';
import { ResponseProveedorProductoOServicioDTO } from '../../../interfaces/panel-control/proveedores-productos-servicios/responseProveedorProductoOServicioDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresProductosServiciosService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idProveedorProductoOServicio?: number, estado?: string, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idProveedorProductoOServicio !== undefined) params = params.set('idProveedorProductoOServicio', idProveedorProductoOServicio.toString());
    if (estado) params = params.set('estado', estado);
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/proveedoresProductosOServicios/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllProveedoresProductosServicios(idProveedorProductoOServicio?: number, estado?: string, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ProveedoresProductosServiciosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idProveedorProductoOServicio !== undefined) params = params.set('idProveedorProductoOServicio', idProveedorProductoOServicio.toString());
    if (estado) params = params.set('estado', estado);
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<ProveedoresProductosServiciosI[]>(`${this.baseUrl}/proveedoresProductosOServicios/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllProveedoresProductosServiciosPag(page: number = 0, size: number = 10, idProveedorProductoOServicio?: number, estado?: string, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ProveedoresProductosServiciosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idProveedorProductoOServicio !== undefined) params = params.set('idProveedorProductoOServicio', idProveedorProductoOServicio.toString());
    if (estado) params = params.set('estado', estado);
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/proveedoresProductosOServicios/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as ProveedoresProductosServiciosI[])
    );
  }

  //CREAR REGISTRO.
  addProveedorProductoOServicio(proveedorProductoOServicio: ProveedoresProductosServiciosI): Observable<ProveedoresProductosServiciosMsj> {
    return this.http.post<ProveedoresProductosServiciosMsj>(`${this.baseUrl}/proveedoresProductosOServicios`, proveedorProductoOServicio);
  }

  //CONSULTAR REGISTRO POR ID.
  getProveedorProductoOServiciobyId(idProveedorProductoOServicio: number): Observable<ResponseProveedorProductoOServicioDTO> {
    return this.http.get<ResponseProveedorProductoOServicioDTO>(`${this.baseUrl}/proveedoresProductosOServicios/${idProveedorProductoOServicio}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN.
  getProveedorProductoOServiciobyNumeroDocumento(numeroDocumentoIdentificacionProveedorProductoOServicio: string): Observable<ResponseProveedorProductoOServicioDTO> {
    return this.http.get<ResponseProveedorProductoOServicioDTO>(`${this.baseUrl}/proveedoresProductosOServicios/numeroDocumento/${numeroDocumentoIdentificacionProveedorProductoOServicio}`);
  }

  //MODIFICAR REGISTRO.
  updateProveedorProductoOServicio(proveedorProductoOServicio: ProveedoresProductosServiciosI): Observable<ProveedoresProductosServiciosMsj> {
    return this.http.put<ProveedoresProductosServiciosMsj>(`${this.baseUrl}/proveedoresProductosOServicios`, proveedorProductoOServicio);
  }

  //ELIMINAR REGISTRO.
  deleteProveedorProductoOServicio(idProveedorProductoOServicio: number): Observable<ProveedoresProductosServiciosMsj> {
    return this.http.delete<ProveedoresProductosServiciosMsj>(`${this.baseUrl}/proveedoresProductosOServicios/${idProveedorProductoOServicio}`);
  }

}
