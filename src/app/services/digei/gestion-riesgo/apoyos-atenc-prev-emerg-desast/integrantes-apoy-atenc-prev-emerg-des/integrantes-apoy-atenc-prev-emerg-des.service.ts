import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseIntegrantesApoyosAtencPrevEmergDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/integrantes-apoy-atenc-prev-emerg-des/responseIntegrantesApoyosAtencPrevEmergDesastDTO.interface';
import { IntegrantesApoyosAtencPrevEmergDesastI, IntegrantesApoyosAtencPrevEmergDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/integrantes-apoy-atenc-prev-emerg-des/integrantes-apoy-atenc-prev-emerg-des.interface';

@Injectable({
  providedIn: 'root'
})
export class IntegrantesApoyosAtencPrevEmergDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idIntegrantesApoyosAtencPrevEmergDesast?: number, idApoyoAtencPrevEmergDesast?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idIntegrantesApoyosAtencPrevEmergDesast !== undefined) params = params.set('idIntegrantesApoyosAtencPrevEmergDesast', idIntegrantesApoyosAtencPrevEmergDesast.toString());
    if (idApoyoAtencPrevEmergDesast !== undefined) params = params.set('idApoyoAtencPrevEmergDesast', idApoyoAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/integrantesApoyosAtencPrevEmergDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllMembersOfSupports(idIntegrantesApoyosAtencPrevEmergDesast?: number, idApoyoAtencPrevEmergDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<IntegrantesApoyosAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idIntegrantesApoyosAtencPrevEmergDesast !== undefined) params = params.set('idIntegrantesApoyosAtencPrevEmergDesast', idIntegrantesApoyosAtencPrevEmergDesast.toString());
    if (idApoyoAtencPrevEmergDesast !== undefined) params = params.set('idApoyoAtencPrevEmergDesast', idApoyoAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<IntegrantesApoyosAtencPrevEmergDesastI[]>(`${this.baseUrl}/integrantesApoyosAtencPrevEmergDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllMembersOfSupportsPag(page: number = 0, size: number = 10, idIntegrantesApoyosAtencPrevEmergDesast?: number, idApoyoAtencPrevEmergDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<IntegrantesApoyosAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idIntegrantesApoyosAtencPrevEmergDesast !== undefined) params = params.set('idIntegrantesApoyosAtencPrevEmergDesast', idIntegrantesApoyosAtencPrevEmergDesast.toString());
    if (idApoyoAtencPrevEmergDesast !== undefined) params = params.set('idApoyoAtencPrevEmergDesast', idApoyoAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/integrantesApoyosAtencPrevEmergDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as IntegrantesApoyosAtencPrevEmergDesastI[])
    );
  }

  //CREAR REGISTRO (EL BACKEND SOLO PERMITE UN REGISTRO DE INTEGRANTES POR APOYO).
  addMembersOfSupport(integrantes: IntegrantesApoyosAtencPrevEmergDesastI): Observable<IntegrantesApoyosAtencPrevEmergDesastMsj> {
    return this.http.post<IntegrantesApoyosAtencPrevEmergDesastMsj>(`${this.baseUrl}/integrantesApoyosAtencPrevEmergDesast`, integrantes);
  }

  //CONSULTAR REGISTRO POR ID.
  getMembersOfSupportbyId(idIntegrantesApoyosAtencPrevEmergDesast: number): Observable<ResponseIntegrantesApoyosAtencPrevEmergDesastDTO> {
    return this.http.get<ResponseIntegrantesApoyosAtencPrevEmergDesastDTO>(`${this.baseUrl}/integrantesApoyosAtencPrevEmergDesast/${idIntegrantesApoyosAtencPrevEmergDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateMembersOfSupport(integrantes: IntegrantesApoyosAtencPrevEmergDesastI): Observable<IntegrantesApoyosAtencPrevEmergDesastMsj> {
    return this.http.put<IntegrantesApoyosAtencPrevEmergDesastMsj>(`${this.baseUrl}/integrantesApoyosAtencPrevEmergDesast`, integrantes);
  }

  //ELIMINAR REGISTRO.
  deleteMembersOfSupport(idIntegrantesApoyosAtencPrevEmergDesast: number): Observable<IntegrantesApoyosAtencPrevEmergDesastMsj> {
    return this.http.delete<IntegrantesApoyosAtencPrevEmergDesastMsj>(`${this.baseUrl}/integrantesApoyosAtencPrevEmergDesast/${idIntegrantesApoyosAtencPrevEmergDesast}`);
  }

}
