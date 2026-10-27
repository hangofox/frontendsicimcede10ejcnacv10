import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseApoyoAtencPrevEmergDesastDTO } from '../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/responseApoyoAtencPrevEmergDesastDTO.interface';
import { ApoyosAtencPrevEmergDesastI, ApoyosAtencPrevEmergDesastMsj } from '../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';

@Injectable({
  providedIn: 'root'
})
export class ApoyosAtencPrevEmergDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idApoyoAtencPrevEmergDesast?: number, keyword?: string, idUnidadMilitar?: number, idProcesoApoyoAtencionPrevencion?: number): Observable<number> {
    let params = new HttpParams();
    if (idApoyoAtencPrevEmergDesast !== undefined) params = params.set('idApoyoAtencPrevEmergDesast', idApoyoAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (idUnidadMilitar !== undefined) params = params.set('idUnidadMilitar', idUnidadMilitar.toString());
    if (idProcesoApoyoAtencionPrevencion !== undefined) params = params.set('idProcesoApoyoAtencionPrevencion', idProcesoApoyoAtencionPrevencion.toString());
    return this.http.get<number>(`${this.baseUrl}/apoyosAtencPrevEmergDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSupportsAttentionPreventionEmergenciesDisasters(idApoyoAtencPrevEmergDesast?: number, keyword?: string, idUnidadMilitar?: number, idProcesoApoyoAtencionPrevencion?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<ApoyosAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idApoyoAtencPrevEmergDesast !== undefined) params = params.set('idApoyoAtencPrevEmergDesast', idApoyoAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (idUnidadMilitar !== undefined) params = params.set('idUnidadMilitar', idUnidadMilitar.toString());
    if (idProcesoApoyoAtencionPrevencion !== undefined) params = params.set('idProcesoApoyoAtencionPrevencion', idProcesoApoyoAtencionPrevencion.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<ApoyosAtencPrevEmergDesastI[]>(`${this.baseUrl}/apoyosAtencPrevEmergDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSupportsAttentionPreventionEmergenciesDisastersPag(page: number = 0, size: number = 10, idApoyoAtencPrevEmergDesast?: number, keyword?: string, idUnidadMilitar?: number, idProcesoApoyoAtencionPrevencion?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<ApoyosAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idApoyoAtencPrevEmergDesast !== undefined) params = params.set('idApoyoAtencPrevEmergDesast', idApoyoAtencPrevEmergDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (idUnidadMilitar !== undefined) params = params.set('idUnidadMilitar', idUnidadMilitar.toString());
    if (idProcesoApoyoAtencionPrevencion !== undefined) params = params.set('idProcesoApoyoAtencionPrevencion', idProcesoApoyoAtencionPrevencion.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/apoyosAtencPrevEmergDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as ApoyosAtencPrevEmergDesastI[])
    );
  }

  //CREAR REGISTRO.
  addSupportAttentionPreventionEmergencyDisaster(apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI): Observable<ApoyosAtencPrevEmergDesastMsj> {
    return this.http.post<ApoyosAtencPrevEmergDesastMsj>(`${this.baseUrl}/apoyosAtencPrevEmergDesast`, apoyoAtencPrevEmergDesast);
  }

  //CONSULTAR REGISTRO POR ID.
  getSupportAttentionPreventionEmergencyDisasterbyId(idApoyoAtencPrevEmergDesast: number): Observable<ResponseApoyoAtencPrevEmergDesastDTO> {
    return this.http.get<ResponseApoyoAtencPrevEmergDesastDTO>(`${this.baseUrl}/apoyosAtencPrevEmergDesast/${idApoyoAtencPrevEmergDesast}`);
  }

  //CONSULTAR REGISTRO POR CÓDIGO RADICADO.
  getSupportAttentionPreventionEmergencyDisasterbyCodigoRadicado(codigoRadicadoApoyoAtencPrevEmergDesast: string): Observable<ResponseApoyoAtencPrevEmergDesastDTO> {
    return this.http.get<ResponseApoyoAtencPrevEmergDesastDTO>(`${this.baseUrl}/apoyosAtencPrevEmergDesast/codigoRadicado/${codigoRadicadoApoyoAtencPrevEmergDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateSupportAttentionPreventionEmergencyDisaster(apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI): Observable<ApoyosAtencPrevEmergDesastMsj> {
    return this.http.put<ApoyosAtencPrevEmergDesastMsj>(`${this.baseUrl}/apoyosAtencPrevEmergDesast`, apoyoAtencPrevEmergDesast);
  }

  //ELIMINAR REGISTRO.
  deleteSupportAttentionPreventionEmergencyDisaster(idApoyoAtencPrevEmergDesast: number): Observable<ApoyosAtencPrevEmergDesastMsj> {
    return this.http.delete<ApoyosAtencPrevEmergDesastMsj>(`${this.baseUrl}/apoyosAtencPrevEmergDesast/${idApoyoAtencPrevEmergDesast}`);
  }

}
