import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHistorialEquipTranspApoyAtencPrevEmergDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-eq_tr-apoy-at-prev-em-des/responseHistorialEquipTranspApoyAtencPrevEmergDesastDTO.interface';
import { HistorialEquipTranspApoyAtencPrevEmergDesastI, HistorialEquipTranspApoyAtencPrevEmergDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-eq_tr-apoy-at-prev-em-des/historial-eq_tr-apoy-at-prev-em-des.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialEquipTranspApoyAtencPrevEmergDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialEquipTranspApoyAtencPrevEmergDesast?: number, keyword?: string, nombreClasificacionEquipoIngeniero?: string, nombreSubclasificacionEquipoIngeniero?: string, nombreElementoSubclasificacionEquipoIngeniero?: string, idEquipoIngeniero?: number): Observable<number> {
    let params = new HttpParams();
    if (idHistorialEquipTranspApoyAtencPrevEmergDesast !== undefined) params = params.set('idHistorialEquipTranspApoyAtencPrevEmergDesast', idHistorialEquipTranspApoyAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero);
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero);
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero);
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    return this.http.get<number>(`${this.baseUrl}/historialesEquipsTranspsApoyAtencPrevEmergDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTransportEquipmentHistoriesOfSupports(idHistorialEquipTranspApoyAtencPrevEmergDesast?: number, keyword?: string, nombreClasificacionEquipoIngeniero?: string, nombreSubclasificacionEquipoIngeniero?: string, nombreElementoSubclasificacionEquipoIngeniero?: string, idEquipoIngeniero?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialEquipTranspApoyAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialEquipTranspApoyAtencPrevEmergDesast !== undefined) params = params.set('idHistorialEquipTranspApoyAtencPrevEmergDesast', idHistorialEquipTranspApoyAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero);
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero);
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero);
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialEquipTranspApoyAtencPrevEmergDesastI[]>(`${this.baseUrl}/historialesEquipsTranspsApoyAtencPrevEmergDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTransportEquipmentHistoriesOfSupportsPag(page: number = 0, size: number = 10, idHistorialEquipTranspApoyAtencPrevEmergDesast?: number, keyword?: string, nombreClasificacionEquipoIngeniero?: string, nombreSubclasificacionEquipoIngeniero?: string, nombreElementoSubclasificacionEquipoIngeniero?: string, idEquipoIngeniero?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialEquipTranspApoyAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialEquipTranspApoyAtencPrevEmergDesast !== undefined) params = params.set('idHistorialEquipTranspApoyAtencPrevEmergDesast', idHistorialEquipTranspApoyAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero);
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero);
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero);
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesEquipsTranspsApoyAtencPrevEmergDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialEquipTranspApoyAtencPrevEmergDesastI[])
    );
  }

  //CREAR REGISTRO.
  addTransportEquipmentHistoryOfSupport(historial: HistorialEquipTranspApoyAtencPrevEmergDesastI): Observable<HistorialEquipTranspApoyAtencPrevEmergDesastMsj> {
    return this.http.post<HistorialEquipTranspApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/historialesEquipsTranspsApoyAtencPrevEmergDesast`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getTransportEquipmentHistoryOfSupportbyId(idHistorialEquipTranspApoyAtencPrevEmergDesast: number): Observable<ResponseHistorialEquipTranspApoyAtencPrevEmergDesastDTO> {
    return this.http.get<ResponseHistorialEquipTranspApoyAtencPrevEmergDesastDTO>(`${this.baseUrl}/historialesEquipsTranspsApoyAtencPrevEmergDesast/${idHistorialEquipTranspApoyAtencPrevEmergDesast}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO (VA COMO PARÁMETRO DE CONSULTA, NO EN LA RUTA).
  getTransportEquipmentHistoryOfSupportbyNumeroRegistro(numRegHistorialEquipTranspApoyAtencPrevEmergDesast: string): Observable<ResponseHistorialEquipTranspApoyAtencPrevEmergDesastDTO> {
    const params = new HttpParams().set('numRegHistorialEquipTranspApoyAtencPrevEmergDesast', numRegHistorialEquipTranspApoyAtencPrevEmergDesast);
    return this.http.get<ResponseHistorialEquipTranspApoyAtencPrevEmergDesastDTO>(`${this.baseUrl}/historialesEquipsTranspsApoyAtencPrevEmergDesast/numReg`, { params });
  }

  //MODIFICAR REGISTRO.
  updateTransportEquipmentHistoryOfSupport(historial: HistorialEquipTranspApoyAtencPrevEmergDesastI): Observable<HistorialEquipTranspApoyAtencPrevEmergDesastMsj> {
    return this.http.put<HistorialEquipTranspApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/historialesEquipsTranspsApoyAtencPrevEmergDesast`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteTransportEquipmentHistoryOfSupport(idHistorialEquipTranspApoyAtencPrevEmergDesast: number): Observable<HistorialEquipTranspApoyAtencPrevEmergDesastMsj> {
    return this.http.delete<HistorialEquipTranspApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/historialesEquipsTranspsApoyAtencPrevEmergDesast/${idHistorialEquipTranspApoyAtencPrevEmergDesast}`);
  }

}
