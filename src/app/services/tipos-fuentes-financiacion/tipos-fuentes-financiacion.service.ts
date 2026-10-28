import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTipoFuenteFinanciacionDTO } from '../../interfaces/tipos-fuentes-financiacion/responseTipoFuenteFinanciacionDTO.interface';
import { TiposFuentesFinanciacionI, TiposFuentesFinanciacionMsj } from '../../interfaces/tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposFuentesFinanciacionService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoFuenteFinanciacion?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idTipoFuenteFinanciacion !== undefined) params = params.set('idTipoFuenteFinanciacion', idTipoFuenteFinanciacion.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposFuentesFinanciaciones/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN (PARA SELECTS).
  findAllTypesOfFundingSources(idTipoFuenteFinanciacion?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposFuentesFinanciacionI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idTipoFuenteFinanciacion !== undefined) params = params.set('idTipoFuenteFinanciacion', idTipoFuenteFinanciacion.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposFuentesFinanciacionI[]>(`${this.baseUrl}/tiposFuentesFinanciaciones/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfFundingSourcesPag(page: number = 0, size: number = 10, idTipoFuenteFinanciacion?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposFuentesFinanciacionI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idTipoFuenteFinanciacion !== undefined) params = params.set('idTipoFuenteFinanciacion', idTipoFuenteFinanciacion.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/tiposFuentesFinanciaciones/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposFuentesFinanciacionI[])
    );
  }

  //CREAR REGISTRO.
  addTypeOfFundingSource(tipoFuenteFinanciacion: TiposFuentesFinanciacionI): Observable<TiposFuentesFinanciacionMsj> {
    return this.http.post<TiposFuentesFinanciacionMsj>(`${this.baseUrl}/tiposFuentesFinanciaciones`, tipoFuenteFinanciacion);
  }

  //CONSULTAR REGISTRO POR ID.
  getTypeOfFundingSourcebyId(idTipoFuenteFinanciacion: number): Observable<ResponseTipoFuenteFinanciacionDTO> {
    return this.http.get<ResponseTipoFuenteFinanciacionDTO>(`${this.baseUrl}/tiposFuentesFinanciaciones/${idTipoFuenteFinanciacion}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTypeOfFundingSourcebyNombre(nombreTipoFuenteFinanciacion: string): Observable<ResponseTipoFuenteFinanciacionDTO> {
    return this.http.get<ResponseTipoFuenteFinanciacionDTO>(`${this.baseUrl}/tiposFuentesFinanciaciones/nombre/${encodeURIComponent(nombreTipoFuenteFinanciacion)}`);
  }

  //MODIFICAR REGISTRO.
  updateTypeOfFundingSource(tipoFuenteFinanciacion: TiposFuentesFinanciacionI): Observable<TiposFuentesFinanciacionMsj> {
    return this.http.put<TiposFuentesFinanciacionMsj>(`${this.baseUrl}/tiposFuentesFinanciaciones`, tipoFuenteFinanciacion);
  }

  //ELIMINAR REGISTRO.
  deleteTypeOfFundingSource(idTipoFuenteFinanciacion: number): Observable<TiposFuentesFinanciacionMsj> {
    return this.http.delete<TiposFuentesFinanciacionMsj>(`${this.baseUrl}/tiposFuentesFinanciaciones/${idTipoFuenteFinanciacion}`);
  }

}
