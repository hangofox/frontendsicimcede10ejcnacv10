import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseUnidadMilitarDTO } from '../../../interfaces/panel-control/unidades-militares/responseUnidadMilitarDTO.interface';
import { UnidadesMilitaresI, UnidadesMilitaresMsj } from '../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

@Injectable({
  providedIn: 'root'
})
export class UnidadesMilitaresService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idUnidadMilitar?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idUnidadMilitar !== undefined) params = params.set('idUnidadMilitar', idUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/unidadesMilitares/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllMilitaryUnits(idUnidadMilitar?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<UnidadesMilitaresI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idUnidadMilitar !== undefined) params = params.set('idUnidadMilitar', idUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<UnidadesMilitaresI[]>(`${this.baseUrl}/unidadesMilitares/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllMilitaryUnitsPag(page: number = 0, size: number = 10, idUnidadMilitar?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<UnidadesMilitaresI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idUnidadMilitar !== undefined) params = params.set('idUnidadMilitar', idUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/unidadesMilitares/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as UnidadesMilitaresI[])
    );
  }

  //CREAR REGISTRO.
  addMilitaryUnit(unidadMilitar: UnidadesMilitaresI): Observable<UnidadesMilitaresMsj> {
    return this.http.post<UnidadesMilitaresMsj>(`${this.baseUrl}/unidadesMilitares`, unidadMilitar);
  }

  //CONSULTAR REGISTRO POR ID.
  getMilitaryUnitbyId(idUnidadMilitar: number): Observable<ResponseUnidadMilitarDTO> {
    return this.http.get<ResponseUnidadMilitarDTO>(`${this.baseUrl}/unidadesMilitares/${idUnidadMilitar}`);
  }

  //CONSULTAR REGISTRO POR CÓDIGO.
  getMilitaryUnitbyCode(codigoUnidadMilitar: string): Observable<ResponseUnidadMilitarDTO> {
    return this.http.get<ResponseUnidadMilitarDTO>(`${this.baseUrl}/unidadesMilitares/codigo/${codigoUnidadMilitar}`);
  }

  //CONSULTAR REGISTRO POR SIGLA O ACRÓNIMO.
  getMilitaryUnitbySiglaoAcronimo(siglaoAcronimoUnidadMilitar: string): Observable<ResponseUnidadMilitarDTO> {
    return this.http.get<ResponseUnidadMilitarDTO>(`${this.baseUrl}/unidadesMilitares/siglaoAcronimo/${siglaoAcronimoUnidadMilitar}`);
  }

  //MODIFICAR REGISTRO.
  updateMilitaryUnit(unidadMilitar: UnidadesMilitaresI): Observable<UnidadesMilitaresMsj> {
    return this.http.put<UnidadesMilitaresMsj>(`${this.baseUrl}/unidadesMilitares`, unidadMilitar);
  }

  //ELIMINAR REGISTRO.
  deleteMilitaryUnit(idUnidadMilitar: number): Observable<UnidadesMilitaresMsj> {
    return this.http.delete<UnidadesMilitaresMsj>(`${this.baseUrl}/unidadesMilitares/${idUnidadMilitar}`);
  }

}
