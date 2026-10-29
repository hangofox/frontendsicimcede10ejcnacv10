import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-eq_tr-obr-red-mitig/responseHistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO.interface';
import { HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI, HistorialEquipTranspApoyObrRedMitigGestRiesgDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-eq_tr-obr-red-mitig/historial-eq_tr-obr-red-mitig.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast?: number, keyword?: string, nombreClasificacionEquipoIngeniero?: string, nombreSubclasificacionEquipoIngeniero?: string, nombreElementoSubclasificacionEquipoIngeniero?: string, idEquipoIngeniero?: number): Observable<number> {
    let params = new HttpParams();
    if (idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast', idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero);
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero);
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero);
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    return this.http.get<number>(`${this.baseUrl}/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTransportEquipmentHistoriesOfSupports(idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast?: number, keyword?: string, nombreClasificacionEquipoIngeniero?: string, nombreSubclasificacionEquipoIngeniero?: string, nombreElementoSubclasificacionEquipoIngeniero?: string, idEquipoIngeniero?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast', idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero);
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero);
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero);
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI[]>(`${this.baseUrl}/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTransportEquipmentHistoriesOfSupportsPag(page: number = 0, size: number = 10, idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast?: number, keyword?: string, nombreClasificacionEquipoIngeniero?: string, nombreSubclasificacionEquipoIngeniero?: string, nombreElementoSubclasificacionEquipoIngeniero?: string, idEquipoIngeniero?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast', idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero);
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero);
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero);
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI[])
    );
  }

  //CREAR REGISTRO.
  addTransportEquipmentHistoryOfSupport(historial: HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI): Observable<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.post<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getTransportEquipmentHistoryOfSupportbyId(idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast: number): Observable<ResponseHistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseHistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/${idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO (VA COMO PARÁMETRO DE CONSULTA, NO EN LA RUTA).
  getTransportEquipmentHistoryOfSupportbyNumeroRegistro(numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast: string): Observable<ResponseHistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO> {
    const params = new HttpParams().set('numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast', numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast);
    return this.http.get<ResponseHistorialEquipTranspApoyObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/numReg`, { params });
  }

  //MODIFICAR REGISTRO.
  updateTransportEquipmentHistoryOfSupport(historial: HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI): Observable<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.put<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteTransportEquipmentHistoryOfSupport(idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast: number): Observable<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.delete<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/historialesEquipsTranspsApoyObrRedMitigGestRiesgDesast/${idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast}`);
  }

}
