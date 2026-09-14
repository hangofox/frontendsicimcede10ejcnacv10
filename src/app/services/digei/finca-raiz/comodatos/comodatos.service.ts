import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComodatosI, ComodatosMsj } from '../../../../interfaces/digei/finca-raiz/comodatos/comodatos.interface';
import { ResponseComodatoDTO } from '../../../../interfaces/digei/finca-raiz/comodatos/responseComodatoDTO.interface';

@Injectable({ providedIn: 'root' })
export class ComodatosService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private readonly http: HttpClient) {}

  findCountTotalRegisters(idComodatoTerreno?: number, keyword?: string, idTerreno?: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/comodatosTerrenos/count`, { params: this.crearParams(idComodatoTerreno, keyword, idTerreno) });
  }

  //EL CONTROLADOR NO RECIBE EL ESTADO COMO PARÁMETRO EN /count. POR ESO EL
  //CONTADOR DE ESTADO SE CALCULA SOBRE LA LISTA COMPLETA YA FILTRADA.
  findCountRegistersByState(estado: 'ACTIVO' | 'INACTIVO', idComodatoTerreno?: number, keyword?: string, idTerreno?: number): Observable<number> {
    return this.findAllComodatos(idComodatoTerreno, keyword, idTerreno, 'idComodatoTerreno', 'ASC').pipe(
      map(registros => registros.filter(registro => this.normalizarEstado(registro.estadoTerreno) === estado).length)
    );
  }

  findAllComodatos(idComodatoTerreno?: number, keyword?: string, idTerreno?: number, orderBy?: string, orderMode = 'ASC'): Observable<ComodatosI[]> {
    let params = this.crearParams(idComodatoTerreno, keyword, idTerreno).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<ComodatosI[]>(`${this.baseUrl}/comodatosTerrenos/lista`, { params });
  }

  findAllComodatosPag(page = 0, size = 10, idComodatoTerreno?: number, keyword?: string, idTerreno?: number, orderBy?: string, orderMode = 'ASC'): Observable<ComodatosI[]> {
    let params = this.crearParams(idComodatoTerreno, keyword, idTerreno)
      .set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: ComodatosI[] }>(`${this.baseUrl}/comodatosTerrenos/listaPag`, { params }).pipe(map(slice => slice.content));
  }

  getComodatobyId(idComodatoTerreno: number): Observable<ResponseComodatoDTO> {
    return this.http.get<ResponseComodatoDTO>(`${this.baseUrl}/comodatosTerrenos/${idComodatoTerreno}`);
  }

  addComodato(comodato: ComodatosI): Observable<ComodatosMsj> {
    return this.http.post<ComodatosMsj>(`${this.baseUrl}/comodatosTerrenos`, comodato);
  }

  updateComodato(comodato: ComodatosI): Observable<ComodatosMsj> {
    return this.http.put<ComodatosMsj>(`${this.baseUrl}/comodatosTerrenos`, comodato);
  }

  deleteComodato(idComodatoTerreno: number): Observable<ComodatosMsj> {
    return this.http.delete<ComodatosMsj>(`${this.baseUrl}/comodatosTerrenos/${idComodatoTerreno}`);
  }

  private crearParams(idComodatoTerreno?: number, keyword?: string, idTerreno?: number): HttpParams {
    let params = new HttpParams();
    if (idComodatoTerreno !== undefined) params = params.set('idComodatoTerreno', idComodatoTerreno.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (idTerreno !== undefined) params = params.set('idTerreno', idTerreno.toString());
    return params;
  }

  private normalizarEstado(estado: unknown): string {
    return String(estado ?? '').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
