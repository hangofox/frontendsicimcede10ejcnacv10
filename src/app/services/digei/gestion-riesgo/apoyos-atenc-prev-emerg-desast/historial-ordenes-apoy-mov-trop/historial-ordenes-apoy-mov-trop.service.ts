import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHistorialOrdenApoyoMovimientoTropaDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-ordenes-apoy-mov-trop/responseHistorialOrdenApoyoMovimientoTropaDTO.interface';
import { HistorialOrdenApoyoMovimientoTropaI, HistorialOrdenApoyoMovimientoTropaMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-ordenes-apoy-mov-trop/historial-ordenes-apoy-mov-trop.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialOrdenApoyoMovimientoTropaService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialOrdenApoyoMovimientoTropa?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idHistorialOrdenApoyoMovimientoTropa !== undefined) params = params.set('idHistorialOrdenApoyoMovimientoTropa', idHistorialOrdenApoyoMovimientoTropa.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesOrdenesApoyosMovimientosTropas/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTroopMovementSupportOrderHistories(idHistorialOrdenApoyoMovimientoTropa?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialOrdenApoyoMovimientoTropaI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialOrdenApoyoMovimientoTropa !== undefined) params = params.set('idHistorialOrdenApoyoMovimientoTropa', idHistorialOrdenApoyoMovimientoTropa.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialOrdenApoyoMovimientoTropaI[]>(`${this.baseUrl}/historialesOrdenesApoyosMovimientosTropas/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTroopMovementSupportOrderHistoriesPag(page: number = 0, size: number = 10, idHistorialOrdenApoyoMovimientoTropa?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialOrdenApoyoMovimientoTropaI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialOrdenApoyoMovimientoTropa !== undefined) params = params.set('idHistorialOrdenApoyoMovimientoTropa', idHistorialOrdenApoyoMovimientoTropa.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesOrdenesApoyosMovimientosTropas/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialOrdenApoyoMovimientoTropaI[])
    );
  }

  //CREAR REGISTRO.
  addTroopMovementSupportOrderHistory(historial: HistorialOrdenApoyoMovimientoTropaI): Observable<HistorialOrdenApoyoMovimientoTropaMsj> {
    return this.http.post<HistorialOrdenApoyoMovimientoTropaMsj>(`${this.baseUrl}/historialesOrdenesApoyosMovimientosTropas`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getTroopMovementSupportOrderHistorybyId(idHistorialOrdenApoyoMovimientoTropa: number): Observable<ResponseHistorialOrdenApoyoMovimientoTropaDTO> {
    return this.http.get<ResponseHistorialOrdenApoyoMovimientoTropaDTO>(`${this.baseUrl}/historialesOrdenesApoyosMovimientosTropas/${idHistorialOrdenApoyoMovimientoTropa}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO.
  getTroopMovementSupportOrderHistorybyNumeroRegistro(numRegHistorialOrdenApoyoMovimientoTropa: string): Observable<ResponseHistorialOrdenApoyoMovimientoTropaDTO> {
    return this.http.get<ResponseHistorialOrdenApoyoMovimientoTropaDTO>(`${this.baseUrl}/historialesOrdenesApoyosMovimientosTropas/numeroRegistro/${numRegHistorialOrdenApoyoMovimientoTropa}`);
  }

  //MODIFICAR REGISTRO.
  updateTroopMovementSupportOrderHistory(historial: HistorialOrdenApoyoMovimientoTropaI): Observable<HistorialOrdenApoyoMovimientoTropaMsj> {
    return this.http.put<HistorialOrdenApoyoMovimientoTropaMsj>(`${this.baseUrl}/historialesOrdenesApoyosMovimientosTropas`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteTroopMovementSupportOrderHistory(idHistorialOrdenApoyoMovimientoTropa: number): Observable<HistorialOrdenApoyoMovimientoTropaMsj> {
    return this.http.delete<HistorialOrdenApoyoMovimientoTropaMsj>(`${this.baseUrl}/historialesOrdenesApoyosMovimientosTropas/${idHistorialOrdenApoyoMovimientoTropa}`);
  }

}
