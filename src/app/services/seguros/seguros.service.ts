import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseSeguroDTO } from '../../interfaces/seguros/responseSeguroDTO.interface';
import { SegurosI, SegurosMsj } from '../../interfaces/seguros/seguros.interface';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idSeguro?: number, keyword?: string, estadoSeguro?: string): Observable<number> {
    let params = new HttpParams();
    if (idSeguro !== undefined) params = params.set('idSeguro', idSeguro.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (estadoSeguro) params = params.set('estadoSeguro', estadoSeguro);
    return this.http.get<number>(`${this.baseUrl}/seguros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSeguros(idSeguro?: number, keyword?: string, estadoSeguro?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<SegurosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idSeguro !== undefined) params = params.set('idSeguro', idSeguro.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (estadoSeguro) params = params.set('estadoSeguro', estadoSeguro);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<SegurosI[]>(`${this.baseUrl}/seguros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSegurosPag(page: number = 0, size: number = 10, idSeguro?: number, keyword?: string, estadoSeguro?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<SegurosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idSeguro !== undefined) params = params.set('idSeguro', idSeguro.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (estadoSeguro) params = params.set('estadoSeguro', estadoSeguro);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/seguros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as SegurosI[])
    );
  }

  //CREAR REGISTRO.
  addSeguro(seguro: SegurosI): Observable<SegurosMsj> {
    return this.http.post<SegurosMsj>(`${this.baseUrl}/seguros`, seguro);
  }

  //CONSULTAR REGISTRO POR ID.
  getSegurobyId(idSeguro: number): Observable<ResponseSeguroDTO> {
    return this.http.get<ResponseSeguroDTO>(`${this.baseUrl}/seguros/${idSeguro}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE DE ASEGURADORA Y NOMBRE DE TIPO DE SEGURO.
  getSegurobyNombreAseguradoraNombreTipoSeguro(nombreAseguradora: string, nombreTipoSeguro: string): Observable<ResponseSeguroDTO> {
    return this.http.get<ResponseSeguroDTO>(`${this.baseUrl}/seguros/aseguradora/${nombreAseguradora}/tipoSeguro/${nombreTipoSeguro}`);
  }

  //MODIFICAR REGISTRO.
  updateSeguro(seguro: SegurosI): Observable<SegurosMsj> {
    return this.http.put<SegurosMsj>(`${this.baseUrl}/seguros`, seguro);
  }

  //ELIMINAR REGISTRO.
  deleteSeguro(idSeguro: number): Observable<SegurosMsj> {
    return this.http.delete<SegurosMsj>(`${this.baseUrl}/seguros/${idSeguro}`);
  }

}
