import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadosTerrenosI, EstadosTerrenosMsj } from '../../../../interfaces/digei/finca-raiz/estados-terrenos/estados-terrenos.interface';
import { ResponseEstadoTerrenoDTO } from '../../../../interfaces/digei/finca-raiz/estados-terrenos/responseEstadoTerrenoDTO.interface';

@Injectable({ providedIn: 'root' })
export class EstadosTerrenosService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  findAllEstadosTerrenos(idEstadoTerreno?: number, orderBy?: string, orderMode = 'ASC'): Observable<EstadosTerrenosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idEstadoTerreno !== undefined) params = params.set('idEstadoTerreno', idEstadoTerreno);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<EstadosTerrenosI[]>(`${this.baseUrl}/estadosTerrenos/lista`, { params });
  }

  findAllEstadosTerrenosPag(page = 0, size = 10, idEstadoTerreno?: number, orderBy?: string, orderMode = 'ASC'): Observable<EstadosTerrenosI[]> {
    let params = new HttpParams().set('page', page).set('size', size).set('orderMode', orderMode);
    if (idEstadoTerreno !== undefined) params = params.set('idEstadoTerreno', idEstadoTerreno);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: EstadosTerrenosI[] }>(`${this.baseUrl}/estadosTerrenos/listaPag`, { params }).pipe(map(slice => slice.content));
  }

  addEstadoTerreno(estado: EstadosTerrenosI): Observable<EstadosTerrenosMsj> {
    return this.http.post<EstadosTerrenosMsj>(`${this.baseUrl}/estadosTerrenos`, estado);
  }

  getEstadoTerrenobyId(id: number): Observable<ResponseEstadoTerrenoDTO> {
    return this.http.get<ResponseEstadoTerrenoDTO>(`${this.baseUrl}/estadosTerrenos/${id}`);
  }

  getEstadoTerrenobyNombre(nombre: string): Observable<ResponseEstadoTerrenoDTO> {
    return this.http.get<ResponseEstadoTerrenoDTO>(`${this.baseUrl}/estadosTerrenos/nombre/${encodeURIComponent(nombre)}`);
  }

  updateEstadoTerreno(estado: EstadosTerrenosI): Observable<EstadosTerrenosMsj> {
    return this.http.put<EstadosTerrenosMsj>(`${this.baseUrl}/estadosTerrenos`, estado);
  }

  deleteEstadoTerreno(id: number): Observable<EstadosTerrenosMsj> {
    return this.http.delete<EstadosTerrenosMsj>(`${this.baseUrl}/estadosTerrenos/${id}`);
  }
}
