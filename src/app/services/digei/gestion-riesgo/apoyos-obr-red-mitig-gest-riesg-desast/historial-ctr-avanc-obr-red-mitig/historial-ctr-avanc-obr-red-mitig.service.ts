import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHistorialControlAvancObrRedMitigGestRiesgDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-ctr-avanc-obr-red-mitig/responseHistorialControlAvancObrRedMitigGestRiesgDesastDTO.interface';
import { HistorialControlAvancObrRedMitigGestRiesgDesastI, HistorialControlAvancObrRedMitigGestRiesgDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-ctr-avanc-obr-red-mitig/historial-ctr-avanc-obr-red-mitig.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialControlAvancObrRedMitigGestRiesgDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialControlAvancObrRedMitigGestRiesgDesast?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idHistorialControlAvancObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialControlAvancObrRedMitigGestRiesgDesast', idHistorialControlAvancObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesControlesAvancsObrRedMitigGestRiesgDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllProgressControlHistoriesOfWorks(idHistorialControlAvancObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialControlAvancObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialControlAvancObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialControlAvancObrRedMitigGestRiesgDesast', idHistorialControlAvancObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialControlAvancObrRedMitigGestRiesgDesastI[]>(`${this.baseUrl}/historialesControlesAvancsObrRedMitigGestRiesgDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllProgressControlHistoriesOfWorksPag(page: number = 0, size: number = 10, idHistorialControlAvancObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialControlAvancObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialControlAvancObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialControlAvancObrRedMitigGestRiesgDesast', idHistorialControlAvancObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesControlesAvancsObrRedMitigGestRiesgDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialControlAvancObrRedMitigGestRiesgDesastI[])
    );
  }

  //CREAR REGISTRO.
  addProgressControlHistoryOfWork(historial: HistorialControlAvancObrRedMitigGestRiesgDesastI): Observable<HistorialControlAvancObrRedMitigGestRiesgDesastMsj> {
    return this.http.post<HistorialControlAvancObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesControlesAvancsObrRedMitigGestRiesgDesast`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getProgressControlHistoryOfWorkbyId(idHistorialControlAvancObrRedMitigGestRiesgDesast: number): Observable<ResponseHistorialControlAvancObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseHistorialControlAvancObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/historialesControlesAvancsObrRedMitigGestRiesgDesast/${idHistorialControlAvancObrRedMitigGestRiesgDesast}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO.
  getProgressControlHistoryOfWorkbyNumeroRegistro(numRegHistorialControlAvancObrRedMitigGestRiesgDesast: string): Observable<ResponseHistorialControlAvancObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseHistorialControlAvancObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/historialesControlesAvancsObrRedMitigGestRiesgDesast/numeroRegistro/${numRegHistorialControlAvancObrRedMitigGestRiesgDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateProgressControlHistoryOfWork(historial: HistorialControlAvancObrRedMitigGestRiesgDesastI): Observable<HistorialControlAvancObrRedMitigGestRiesgDesastMsj> {
    return this.http.put<HistorialControlAvancObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesControlesAvancsObrRedMitigGestRiesgDesast`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteProgressControlHistoryOfWork(idHistorialControlAvancObrRedMitigGestRiesgDesast: number): Observable<HistorialControlAvancObrRedMitigGestRiesgDesastMsj> {
    return this.http.delete<HistorialControlAvancObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesControlesAvancsObrRedMitigGestRiesgDesast/${idHistorialControlAvancObrRedMitigGestRiesgDesast}`);
  }

}
