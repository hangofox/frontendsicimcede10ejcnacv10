import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTipoSolicitudInfraestructuraDTO } from '../../../interfaces/digei/tipos-solicitudes-infraestructuras/responseTipoSolicitudInfraestructuraDTO.interface';
import { TiposSolicitudesInfraestructurasI, TiposSolicitudesInfraestructurasMsj } from '../../../interfaces/digei/tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposSolicitudesInfraestructurasService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoSolicitudInfraestructura?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idTipoSolicitudInfraestructura !== undefined) params = params.set('idTipoSolicitudInfraestructura', idTipoSolicitudInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposSolicitudesInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTiposSolicitudesInfraestructuras(idTipoSolicitudInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposSolicitudesInfraestructurasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idTipoSolicitudInfraestructura !== undefined) params = params.set('idTipoSolicitudInfraestructura', idTipoSolicitudInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposSolicitudesInfraestructurasI[]>(`${this.baseUrl}/tiposSolicitudesInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTiposSolicitudesInfraestructurasPag(page: number = 0, size: number = 10, idTipoSolicitudInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposSolicitudesInfraestructurasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idTipoSolicitudInfraestructura !== undefined) params = params.set('idTipoSolicitudInfraestructura', idTipoSolicitudInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/tiposSolicitudesInfraestructuras/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposSolicitudesInfraestructurasI[])
    );
  }

  //CREAR REGISTRO.
  addTipoSolicitudInfraestructura(tipoSolicitudInfraestructura: TiposSolicitudesInfraestructurasI): Observable<TiposSolicitudesInfraestructurasMsj> {
    return this.http.post<TiposSolicitudesInfraestructurasMsj>(`${this.baseUrl}/tiposSolicitudesInfraestructuras`, tipoSolicitudInfraestructura);
  }

  //CONSULTAR REGISTRO POR ID.
  getTipoSolicitudInfraestructurabyId(idTipoSolicitudInfraestructura: number): Observable<ResponseTipoSolicitudInfraestructuraDTO> {
    return this.http.get<ResponseTipoSolicitudInfraestructuraDTO>(`${this.baseUrl}/tiposSolicitudesInfraestructuras/${idTipoSolicitudInfraestructura}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTipoSolicitudInfraestructurabyNombre(nombreTipoSolicitudInfraestructura: string): Observable<ResponseTipoSolicitudInfraestructuraDTO> {
    return this.http.get<ResponseTipoSolicitudInfraestructuraDTO>(`${this.baseUrl}/tiposSolicitudesInfraestructuras/nombre/${nombreTipoSolicitudInfraestructura}`);
  }

  //MODIFICAR REGISTRO.
  updateTipoSolicitudInfraestructura(tipoSolicitudInfraestructura: TiposSolicitudesInfraestructurasI): Observable<TiposSolicitudesInfraestructurasMsj> {
    return this.http.put<TiposSolicitudesInfraestructurasMsj>(`${this.baseUrl}/tiposSolicitudesInfraestructuras`, tipoSolicitudInfraestructura);
  }

  //ELIMINAR REGISTRO.
  deleteTipoSolicitudInfraestructura(idTipoSolicitudInfraestructura: number): Observable<TiposSolicitudesInfraestructurasMsj> {
    return this.http.delete<TiposSolicitudesInfraestructurasMsj>(`${this.baseUrl}/tiposSolicitudesInfraestructuras/${idTipoSolicitudInfraestructura}`);
  }

}
