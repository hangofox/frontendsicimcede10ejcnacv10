import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-tip-pers-obr-red-mitig/responseHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO.interface';
import { HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI, HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-tip-pers-obr-red-mitig/historial-tip-pers-obr-red-mitig.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast', idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSupportStaffTypeHistories(idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast', idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI[]>(`${this.baseUrl}/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSupportStaffTypeHistoriesPag(page: number = 0, size: number = 10, idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast', idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI[])
    );
  }

  //CREAR REGISTRO.
  addSupportStaffTypeHistory(historial: HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI): Observable<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.post<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getSupportStaffTypeHistorybyId(idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast: number): Observable<ResponseHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/${idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO (EL BACKEND LO RECIBE COMO QUERY PARAM EN /numReg).
  getSupportStaffTypeHistorybyNumeroRegistro(numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast: string): Observable<ResponseHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO> {
    const params = new HttpParams().set('numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast', numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast);
    return this.http.get<ResponseHistorialTipoPersonalApoyObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/numReg`, { params });
  }

  //MODIFICAR REGISTRO.
  updateSupportStaffTypeHistory(historial: HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI): Observable<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.put<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteSupportStaffTypeHistory(idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast: number): Observable<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.delete<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesTiposPersonalApoyObrRedMitigGestRiesgDesast/${idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast}`);
  }

}
