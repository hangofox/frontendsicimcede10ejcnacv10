import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHistorialMaqPesadApoyAtencPrevEmergDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-maq-pesad-apoy-atenc-prev-des/responseHistorialMaqPesadApoyAtencPrevEmergDesastDTO.interface';
import { HistorialMaqPesadApoyAtencPrevEmergDesastI, HistorialMaqPesadApoyAtencPrevEmergDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-maq-pesad-apoy-atenc-prev-des/historial-maq-pesad-apoy-atenc-prev-des.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialMaqPesadApoyAtencPrevEmergDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialMaqPesadApoyAtencPrevEmergDesast?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idHistorialMaqPesadApoyAtencPrevEmergDesast !== undefined) params = params.set('idHistorialMaqPesadApoyAtencPrevEmergDesast', idHistorialMaqPesadApoyAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesMaqPesadApoyAtencPrevEmergDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllHeavyMachineryHistoriesOfSupports(idHistorialMaqPesadApoyAtencPrevEmergDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialMaqPesadApoyAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialMaqPesadApoyAtencPrevEmergDesast !== undefined) params = params.set('idHistorialMaqPesadApoyAtencPrevEmergDesast', idHistorialMaqPesadApoyAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialMaqPesadApoyAtencPrevEmergDesastI[]>(`${this.baseUrl}/historialesMaqPesadApoyAtencPrevEmergDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllHeavyMachineryHistoriesOfSupportsPag(page: number = 0, size: number = 10, idHistorialMaqPesadApoyAtencPrevEmergDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialMaqPesadApoyAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialMaqPesadApoyAtencPrevEmergDesast !== undefined) params = params.set('idHistorialMaqPesadApoyAtencPrevEmergDesast', idHistorialMaqPesadApoyAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesMaqPesadApoyAtencPrevEmergDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialMaqPesadApoyAtencPrevEmergDesastI[])
    );
  }

  //CREAR REGISTRO.
  addHeavyMachineryHistoryOfSupport(historial: HistorialMaqPesadApoyAtencPrevEmergDesastI): Observable<HistorialMaqPesadApoyAtencPrevEmergDesastMsj> {
    return this.http.post<HistorialMaqPesadApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/historialesMaqPesadApoyAtencPrevEmergDesast`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getHeavyMachineryHistoryOfSupportbyId(idHistorialMaqPesadApoyAtencPrevEmergDesast: number): Observable<ResponseHistorialMaqPesadApoyAtencPrevEmergDesastDTO> {
    return this.http.get<ResponseHistorialMaqPesadApoyAtencPrevEmergDesastDTO>(`${this.baseUrl}/historialesMaqPesadApoyAtencPrevEmergDesast/${idHistorialMaqPesadApoyAtencPrevEmergDesast}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO.
  getHeavyMachineryHistoryOfSupportbyNumeroRegistro(numRegHistorialMaqPesadApoyAtencPrevEmergDesast: string): Observable<ResponseHistorialMaqPesadApoyAtencPrevEmergDesastDTO> {
    return this.http.get<ResponseHistorialMaqPesadApoyAtencPrevEmergDesastDTO>(`${this.baseUrl}/historialesMaqPesadApoyAtencPrevEmergDesast/numeroRegistro/${numRegHistorialMaqPesadApoyAtencPrevEmergDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateHeavyMachineryHistoryOfSupport(historial: HistorialMaqPesadApoyAtencPrevEmergDesastI): Observable<HistorialMaqPesadApoyAtencPrevEmergDesastMsj> {
    return this.http.put<HistorialMaqPesadApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/historialesMaqPesadApoyAtencPrevEmergDesast`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteHeavyMachineryHistoryOfSupport(idHistorialMaqPesadApoyAtencPrevEmergDesast: number): Observable<HistorialMaqPesadApoyAtencPrevEmergDesastMsj> {
    return this.http.delete<HistorialMaqPesadApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/historialesMaqPesadApoyAtencPrevEmergDesast/${idHistorialMaqPesadApoyAtencPrevEmergDesast}`);
  }

}
