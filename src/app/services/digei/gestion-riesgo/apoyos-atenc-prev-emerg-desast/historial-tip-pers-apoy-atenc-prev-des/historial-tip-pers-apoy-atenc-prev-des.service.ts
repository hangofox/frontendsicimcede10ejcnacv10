import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHistorialTipoPersonalApoyAtencPrevEmergDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-tip-pers-apoy-atenc-prev-des/responseHistorialTipoPersonalApoyAtencPrevEmergDesastDTO.interface';
import { HistorialTipoPersonalApoyAtencPrevEmergDesastI, HistorialTipoPersonalApoyAtencPrevEmergDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-tip-pers-apoy-atenc-prev-des/historial-tip-pers-apoy-atenc-prev-des.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialTipoPersonalApoyAtencPrevEmergDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialTipoPersonalApoyAtencPrevEmergDesast?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idHistorialTipoPersonalApoyAtencPrevEmergDesast !== undefined) params = params.set('idHistorialTipoPersonalApoyAtencPrevEmergDesast', idHistorialTipoPersonalApoyAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesTiposPersonalApoyAtencPrevEmergDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSupportStaffTypeHistories(idHistorialTipoPersonalApoyAtencPrevEmergDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialTipoPersonalApoyAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialTipoPersonalApoyAtencPrevEmergDesast !== undefined) params = params.set('idHistorialTipoPersonalApoyAtencPrevEmergDesast', idHistorialTipoPersonalApoyAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialTipoPersonalApoyAtencPrevEmergDesastI[]>(`${this.baseUrl}/historialesTiposPersonalApoyAtencPrevEmergDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSupportStaffTypeHistoriesPag(page: number = 0, size: number = 10, idHistorialTipoPersonalApoyAtencPrevEmergDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialTipoPersonalApoyAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialTipoPersonalApoyAtencPrevEmergDesast !== undefined) params = params.set('idHistorialTipoPersonalApoyAtencPrevEmergDesast', idHistorialTipoPersonalApoyAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesTiposPersonalApoyAtencPrevEmergDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialTipoPersonalApoyAtencPrevEmergDesastI[])
    );
  }

  //CREAR REGISTRO.
  addSupportStaffTypeHistory(historial: HistorialTipoPersonalApoyAtencPrevEmergDesastI): Observable<HistorialTipoPersonalApoyAtencPrevEmergDesastMsj> {
    return this.http.post<HistorialTipoPersonalApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/historialesTiposPersonalApoyAtencPrevEmergDesast`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getSupportStaffTypeHistorybyId(idHistorialTipoPersonalApoyAtencPrevEmergDesast: number): Observable<ResponseHistorialTipoPersonalApoyAtencPrevEmergDesastDTO> {
    return this.http.get<ResponseHistorialTipoPersonalApoyAtencPrevEmergDesastDTO>(`${this.baseUrl}/historialesTiposPersonalApoyAtencPrevEmergDesast/${idHistorialTipoPersonalApoyAtencPrevEmergDesast}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO (EL BACKEND LO RECIBE COMO QUERY PARAM EN /numReg).
  getSupportStaffTypeHistorybyNumeroRegistro(numRegHistorialTipoPersonalApoyAtencPrevEmergDesast: string): Observable<ResponseHistorialTipoPersonalApoyAtencPrevEmergDesastDTO> {
    const params = new HttpParams().set('numRegHistorialTipoPersonalApoyAtencPrevEmergDesast', numRegHistorialTipoPersonalApoyAtencPrevEmergDesast);
    return this.http.get<ResponseHistorialTipoPersonalApoyAtencPrevEmergDesastDTO>(`${this.baseUrl}/historialesTiposPersonalApoyAtencPrevEmergDesast/numReg`, { params });
  }

  //MODIFICAR REGISTRO.
  updateSupportStaffTypeHistory(historial: HistorialTipoPersonalApoyAtencPrevEmergDesastI): Observable<HistorialTipoPersonalApoyAtencPrevEmergDesastMsj> {
    return this.http.put<HistorialTipoPersonalApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/historialesTiposPersonalApoyAtencPrevEmergDesast`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteSupportStaffTypeHistory(idHistorialTipoPersonalApoyAtencPrevEmergDesast: number): Observable<HistorialTipoPersonalApoyAtencPrevEmergDesastMsj> {
    return this.http.delete<HistorialTipoPersonalApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/historialesTiposPersonalApoyAtencPrevEmergDesast/${idHistorialTipoPersonalApoyAtencPrevEmergDesast}`);
  }

}
