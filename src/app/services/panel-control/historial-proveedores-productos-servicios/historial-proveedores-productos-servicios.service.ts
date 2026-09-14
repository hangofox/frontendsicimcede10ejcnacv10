import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistorialProveedoresProductosServiciosI, HistorialProveedoresProductosServiciosMsj } from '../../../interfaces/panel-control/historial-proveedores-productos-servicios/historial-proveedores-productos-servicios.interface';
import { ResponseHistorialProveedorProductoOServicioDTO } from '../../../interfaces/panel-control/historial-proveedores-productos-servicios/responseHistorialProveedorProductoOServicioDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialProveedoresProductosServiciosService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialProveedorProductoOServicio?: number, keyword?: string): Observable<number> {
    const params = this.crearParams(idHistorialProveedorProductoOServicio, keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesProveedoresProductosOServicios/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllHistorialesProveedoresProductosServicios(
    idHistorialProveedorProductoOServicio?: number,
    keyword?: string,
    orderBy?: string,
    orderMode: string = 'ASC'
  ): Observable<HistorialProveedoresProductosServiciosI[]> {
    let params = this.crearParams(idHistorialProveedorProductoOServicio, keyword)
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<HistorialProveedoresProductosServiciosI[]>(
      `${this.baseUrl}/historialesProveedoresProductosOServicios/lista`,
      { params }
    );
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllHistorialesProveedoresProductosServiciosPag(
    page: number = 0,
    size: number = 10,
    idHistorialProveedorProductoOServicio?: number,
    keyword?: string,
    orderBy?: string,
    orderMode: string = 'ASC'
  ): Observable<HistorialProveedoresProductosServiciosI[]> {
    let params = this.crearParams(idHistorialProveedorProductoOServicio, keyword)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<{ content: HistorialProveedoresProductosServiciosI[] }>(
      `${this.baseUrl}/historialesProveedoresProductosOServicios/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addHistorialProveedorProductoOServicio(
    historial: HistorialProveedoresProductosServiciosI
  ): Observable<HistorialProveedoresProductosServiciosMsj> {
    return this.http.post<HistorialProveedoresProductosServiciosMsj>(
      `${this.baseUrl}/historialesProveedoresProductosOServicios`,
      historial
    );
  }

  //CONSULTAR REGISTRO POR ID.
  getHistorialProveedorProductoOServiciobyId(
    idHistorialProveedorProductoOServicio: number
  ): Observable<ResponseHistorialProveedorProductoOServicioDTO> {
    return this.http.get<ResponseHistorialProveedorProductoOServicioDTO>(
      `${this.baseUrl}/historialesProveedoresProductosOServicios/${idHistorialProveedorProductoOServicio}`
    );
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO.
  getHistorialProveedorProductoOServiciobyNumeroRegistro(
    numRegHistorialProveedorProductoOServicio: string
  ): Observable<ResponseHistorialProveedorProductoOServicioDTO> {
    return this.http.get<ResponseHistorialProveedorProductoOServicioDTO>(
      `${this.baseUrl}/historialesProveedoresProductosOServicios/numeroRegistro/${numRegHistorialProveedorProductoOServicio}`
    );
  }

  //MODIFICAR REGISTRO.
  updateHistorialProveedorProductoOServicio(
    historial: HistorialProveedoresProductosServiciosI
  ): Observable<HistorialProveedoresProductosServiciosMsj> {
    return this.http.put<HistorialProveedoresProductosServiciosMsj>(
      `${this.baseUrl}/historialesProveedoresProductosOServicios`,
      historial
    );
  }

  //ELIMINAR REGISTRO.
  deleteHistorialProveedorProductoOServicio(
    idHistorialProveedorProductoOServicio: number
  ): Observable<HistorialProveedoresProductosServiciosMsj> {
    return this.http.delete<HistorialProveedoresProductosServiciosMsj>(
      `${this.baseUrl}/historialesProveedoresProductosOServicios/${idHistorialProveedorProductoOServicio}`
    );
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA.
  private crearParams(idHistorialProveedorProductoOServicio?: number, keyword?: string): HttpParams {
    let params = new HttpParams();
    if (idHistorialProveedorProductoOServicio !== undefined) {
      params = params.set('idHistorialProveedorProductoOServicio', idHistorialProveedorProductoOServicio.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    return params;
  }
}
