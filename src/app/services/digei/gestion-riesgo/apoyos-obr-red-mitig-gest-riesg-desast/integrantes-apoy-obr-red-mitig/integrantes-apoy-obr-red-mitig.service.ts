import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseIntegrantesApoyosObrRedMitigGestRiesgDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/integrantes-apoy-obr-red-mitig/responseIntegrantesApoyosObrRedMitigGestRiesgDesastDTO.interface';
import { IntegrantesApoyosObrRedMitigGestRiesgDesastI, IntegrantesApoyosObrRedMitigGestRiesgDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/integrantes-apoy-obr-red-mitig/integrantes-apoy-obr-red-mitig.interface';

@Injectable({
  providedIn: 'root'
})
export class IntegrantesApoyosObrRedMitigGestRiesgDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idIntegrantesApoyosObrRedMitigGestRiesgDesast?: number, idApoyoObrRedMitigGestRiesgDesast?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idIntegrantesApoyosObrRedMitigGestRiesgDesast !== undefined) params = params.set('idIntegrantesApoyosObrRedMitigGestRiesgDesast', idIntegrantesApoyosObrRedMitigGestRiesgDesast.toString());
    if (idApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idApoyoObrRedMitigGestRiesgDesast', idApoyoObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/integrantesApoyosObrRedMitigGestRiesgDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllMembersOfSupports(idIntegrantesApoyosObrRedMitigGestRiesgDesast?: number, idApoyoObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<IntegrantesApoyosObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idIntegrantesApoyosObrRedMitigGestRiesgDesast !== undefined) params = params.set('idIntegrantesApoyosObrRedMitigGestRiesgDesast', idIntegrantesApoyosObrRedMitigGestRiesgDesast.toString());
    if (idApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idApoyoObrRedMitigGestRiesgDesast', idApoyoObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<IntegrantesApoyosObrRedMitigGestRiesgDesastI[]>(`${this.baseUrl}/integrantesApoyosObrRedMitigGestRiesgDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllMembersOfSupportsPag(page: number = 0, size: number = 10, idIntegrantesApoyosObrRedMitigGestRiesgDesast?: number, idApoyoObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<IntegrantesApoyosObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idIntegrantesApoyosObrRedMitigGestRiesgDesast !== undefined) params = params.set('idIntegrantesApoyosObrRedMitigGestRiesgDesast', idIntegrantesApoyosObrRedMitigGestRiesgDesast.toString());
    if (idApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idApoyoObrRedMitigGestRiesgDesast', idApoyoObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/integrantesApoyosObrRedMitigGestRiesgDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as IntegrantesApoyosObrRedMitigGestRiesgDesastI[])
    );
  }

  //CREAR REGISTRO (EL BACKEND SOLO PERMITE UN REGISTRO DE INTEGRANTES POR APOYO).
  addMembersOfSupport(integrantes: IntegrantesApoyosObrRedMitigGestRiesgDesastI): Observable<IntegrantesApoyosObrRedMitigGestRiesgDesastMsj> {
    return this.http.post<IntegrantesApoyosObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/integrantesApoyosObrRedMitigGestRiesgDesast`, integrantes);
  }

  //CONSULTAR REGISTRO POR ID.
  getMembersOfSupportbyId(idIntegrantesApoyosObrRedMitigGestRiesgDesast: number): Observable<ResponseIntegrantesApoyosObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseIntegrantesApoyosObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/integrantesApoyosObrRedMitigGestRiesgDesast/${idIntegrantesApoyosObrRedMitigGestRiesgDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateMembersOfSupport(integrantes: IntegrantesApoyosObrRedMitigGestRiesgDesastI): Observable<IntegrantesApoyosObrRedMitigGestRiesgDesastMsj> {
    return this.http.put<IntegrantesApoyosObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/integrantesApoyosObrRedMitigGestRiesgDesast`, integrantes);
  }

  //ELIMINAR REGISTRO.
  deleteMembersOfSupport(idIntegrantesApoyosObrRedMitigGestRiesgDesast: number): Observable<IntegrantesApoyosObrRedMitigGestRiesgDesastMsj> {
    return this.http.delete<IntegrantesApoyosObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/integrantesApoyosObrRedMitigGestRiesgDesast/${idIntegrantesApoyosObrRedMitigGestRiesgDesast}`);
  }

}
