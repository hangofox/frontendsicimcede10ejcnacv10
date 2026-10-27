import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTipoEventoApoyoRealizadoDTO } from '../../../../interfaces/digei/gestion-riesgo/tipos-eventos-apoyos-realizados/responseTipoEventoApoyoRealizadoDTO.interface';
import { TiposEventosApoyosRealizadosI, TiposEventosApoyosRealizadosMsj } from '../../../../interfaces/digei/gestion-riesgo/tipos-eventos-apoyos-realizados/tipos-eventos-apoyos-realizados.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposEventosApoyosRealizadosService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoEventoApoyoRealizado?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idTipoEventoApoyoRealizado !== undefined) params = params.set('idTipoEventoApoyoRealizado', idTipoEventoApoyoRealizado.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposEventosApoyosRealizados/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTypesOfSupportEventsCarriedOut(idTipoEventoApoyoRealizado?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposEventosApoyosRealizadosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idTipoEventoApoyoRealizado !== undefined) params = params.set('idTipoEventoApoyoRealizado', idTipoEventoApoyoRealizado.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposEventosApoyosRealizadosI[]>(`${this.baseUrl}/tiposEventosApoyosRealizados/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfSupportEventsCarriedOutPag(page: number = 0, size: number = 10, idTipoEventoApoyoRealizado?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposEventosApoyosRealizadosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idTipoEventoApoyoRealizado !== undefined) params = params.set('idTipoEventoApoyoRealizado', idTipoEventoApoyoRealizado.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/tiposEventosApoyosRealizados/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposEventosApoyosRealizadosI[])
    );
  }

  //CREAR REGISTRO.
  addTypeOfSupportEventCarriedOut(tipoEventoApoyoRealizado: TiposEventosApoyosRealizadosI): Observable<TiposEventosApoyosRealizadosMsj> {
    return this.http.post<TiposEventosApoyosRealizadosMsj>(`${this.baseUrl}/tiposEventosApoyosRealizados`, tipoEventoApoyoRealizado);
  }

  //CONSULTAR REGISTRO POR ID.
  getTypeOfSupportEventCarriedOutbyId(idTipoEventoApoyoRealizado: number): Observable<ResponseTipoEventoApoyoRealizadoDTO> {
    return this.http.get<ResponseTipoEventoApoyoRealizadoDTO>(`${this.baseUrl}/tiposEventosApoyosRealizados/${idTipoEventoApoyoRealizado}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTypeOfSupportEventCarriedOutbyNombre(nombreTipoEventoApoyoRealizado: string): Observable<ResponseTipoEventoApoyoRealizadoDTO> {
    return this.http.get<ResponseTipoEventoApoyoRealizadoDTO>(`${this.baseUrl}/tiposEventosApoyosRealizados/nombre/${nombreTipoEventoApoyoRealizado}`);
  }

  //MODIFICAR REGISTRO.
  updateTypeOfSupportEventCarriedOut(tipoEventoApoyoRealizado: TiposEventosApoyosRealizadosI): Observable<TiposEventosApoyosRealizadosMsj> {
    return this.http.put<TiposEventosApoyosRealizadosMsj>(`${this.baseUrl}/tiposEventosApoyosRealizados`, tipoEventoApoyoRealizado);
  }

  //ELIMINAR REGISTRO.
  deleteTypeOfSupportEventCarriedOut(idTipoEventoApoyoRealizado: number): Observable<TiposEventosApoyosRealizadosMsj> {
    return this.http.delete<TiposEventosApoyosRealizadosMsj>(`${this.baseUrl}/tiposEventosApoyosRealizados/${idTipoEventoApoyoRealizado}`);
  }

}
