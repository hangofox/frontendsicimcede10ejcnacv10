import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-maq-pesad-obr-red-mitig/responseHistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO.interface';
import { HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI, HistorialMaqPesadApoyObrRedMitigGestRiesgDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-maq-pesad-obr-red-mitig/historial-maq-pesad-obr-red-mitig.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialMaqPesadApoyObrRedMitigGestRiesgDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast', idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllHeavyMachineryHistoriesOfSupports(idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast', idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI[]>(`${this.baseUrl}/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllHeavyMachineryHistoriesOfSupportsPag(page: number = 0, size: number = 10, idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast', idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI[])
    );
  }

  //CREAR REGISTRO.
  addHeavyMachineryHistoryOfSupport(historial: HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI): Observable<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.post<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesMaqPesadApoyObrRedMitigGestRiesgDesast`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getHeavyMachineryHistoryOfSupportbyId(idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast: number): Observable<ResponseHistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseHistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/${idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO.
  getHeavyMachineryHistoryOfSupportbyNumeroRegistro(numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast: string): Observable<ResponseHistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseHistorialMaqPesadApoyObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/numeroRegistro/${numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateHeavyMachineryHistoryOfSupport(historial: HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI): Observable<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.put<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesMaqPesadApoyObrRedMitigGestRiesgDesast`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteHeavyMachineryHistoryOfSupport(idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast: number): Observable<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.delete<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesMaqPesadApoyObrRedMitigGestRiesgDesast/${idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast}`);
  }

}
