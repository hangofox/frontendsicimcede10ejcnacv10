import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTerrenoDTO } from '../../interfaces/terrenos/responseTerrenoDTO.interface';
import { TerrenosI, TerrenosMsj } from '../../interfaces/terrenos/terrenos.interface';

@Injectable({
  providedIn: 'root'
})
export class TerrenosService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTerreno?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    let params = new HttpParams();
    if (idTerreno !== undefined) params = params.set('idTerreno', idTerreno.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/terrenos/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTerrenos(idTerreno?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TerrenosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idTerreno !== undefined) params = params.set('idTerreno', idTerreno.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TerrenosI[]>(`${this.baseUrl}/terrenos/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTerrenosPag(page: number = 0, size: number = 10, idTerreno?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TerrenosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idTerreno !== undefined) params = params.set('idTerreno', idTerreno.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/terrenos/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TerrenosI[])
    );
  }

  //CREAR REGISTRO.
  addTerreno(terreno: TerrenosI): Observable<TerrenosMsj> {
    return this.http.post<TerrenosMsj>(`${this.baseUrl}/terrenos`, terreno);
  }

  //CONSULTAR REGISTRO POR ID.
  getTerrenobyId(idTerreno: number): Observable<ResponseTerrenoDTO> {
    return this.http.get<ResponseTerrenoDTO>(`${this.baseUrl}/terrenos/${idTerreno}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE INVENTARIO Y NÚMERO DE ACTIVO FIJO.
  getTerrenobyNumeroInventarioNumeroActivoFijo(numeroInventarioTerreno?: string, numeroActivoFijoTerreno?: string): Observable<ResponseTerrenoDTO> {
    let params = new HttpParams();
    if (numeroInventarioTerreno) params = params.set('numeroInventarioTerreno', numeroInventarioTerreno);
    if (numeroActivoFijoTerreno) params = params.set('numeroActivoFijoTerreno', numeroActivoFijoTerreno);
    return this.http.get<ResponseTerrenoDTO>(`${this.baseUrl}/terrenos/numero`, { params });
  }

  //MODIFICAR REGISTRO.
  updateTerreno(terreno: TerrenosI): Observable<TerrenosMsj> {
    return this.http.put<TerrenosMsj>(`${this.baseUrl}/terrenos`, terreno);
  }

  //ELIMINAR REGISTRO.
  deleteTerreno(idTerreno: number): Observable<TerrenosMsj> {
    return this.http.delete<TerrenosMsj>(`${this.baseUrl}/terrenos/${idTerreno}`);
  }

}
