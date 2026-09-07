import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTipoEstructuraInfraestructuraDTO } from '../../../../interfaces/digei/finca-raiz/tipos-estructuras-infraestructuras/responseTipoEstructuraInfraestructuraDTO.interface';
import { TiposEstructurasInfraestructurasI, TiposEstructurasInfraestructurasMsj } from '../../../../interfaces/digei/finca-raiz/tipos-estructuras-infraestructuras/tipos-estructuras-infraestructuras.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposEstructurasInfraestructurasService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoEstructuraInfraestructura?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idTipoEstructuraInfraestructura !== undefined) params = params.set('idTipoEstructuraInfraestructura', idTipoEstructuraInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposEstructurasInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTiposEstructurasInfraestructuras(idTipoEstructuraInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposEstructurasInfraestructurasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idTipoEstructuraInfraestructura !== undefined) params = params.set('idTipoEstructuraInfraestructura', idTipoEstructuraInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposEstructurasInfraestructurasI[]>(`${this.baseUrl}/tiposEstructurasInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTiposEstructurasInfraestructurasPag(page: number = 0, size: number = 10, idTipoEstructuraInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposEstructurasInfraestructurasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idTipoEstructuraInfraestructura !== undefined) params = params.set('idTipoEstructuraInfraestructura', idTipoEstructuraInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/tiposEstructurasInfraestructuras/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposEstructurasInfraestructurasI[])
    );
  }

  //CREAR REGISTRO.
  addTipoEstructuraInfraestructura(tipoEstructuraInfraestructura: TiposEstructurasInfraestructurasI): Observable<TiposEstructurasInfraestructurasMsj> {
    return this.http.post<TiposEstructurasInfraestructurasMsj>(`${this.baseUrl}/tiposEstructurasInfraestructuras`, tipoEstructuraInfraestructura);
  }

  //CONSULTAR REGISTRO POR ID.
  getTipoEstructuraInfraestructurabyId(idTipoEstructuraInfraestructura: number): Observable<ResponseTipoEstructuraInfraestructuraDTO> {
    return this.http.get<ResponseTipoEstructuraInfraestructuraDTO>(`${this.baseUrl}/tiposEstructurasInfraestructuras/${idTipoEstructuraInfraestructura}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTipoEstructuraInfraestructurabyNombre(nombreTipoEstructuraInfraestructura: string): Observable<ResponseTipoEstructuraInfraestructuraDTO> {
    return this.http.get<ResponseTipoEstructuraInfraestructuraDTO>(`${this.baseUrl}/tiposEstructurasInfraestructuras/nombre/${nombreTipoEstructuraInfraestructura}`);
  }

  //MODIFICAR REGISTRO.
  updateTipoEstructuraInfraestructura(tipoEstructuraInfraestructura: TiposEstructurasInfraestructurasI): Observable<TiposEstructurasInfraestructurasMsj> {
    return this.http.put<TiposEstructurasInfraestructurasMsj>(`${this.baseUrl}/tiposEstructurasInfraestructuras`, tipoEstructuraInfraestructura);
  }

  //ELIMINAR REGISTRO.
  deleteTipoEstructuraInfraestructura(idTipoEstructuraInfraestructura: number): Observable<TiposEstructurasInfraestructurasMsj> {
    return this.http.delete<TiposEstructurasInfraestructurasMsj>(`${this.baseUrl}/tiposEstructurasInfraestructuras/${idTipoEstructuraInfraestructura}`);
  }

}
