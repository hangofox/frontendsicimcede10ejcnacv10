import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseFotografiaAnexaApoyAtencPrevEmergDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/fot_anex_apoy_atenc_prev_emerg_des/responseFotografiaAnexaApoyAtencPrevEmergDesastDTO.interface';
import { FotografiasAnexasApoyAtencPrevEmergDesastI, FotografiasAnexasApoyAtencPrevEmergDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/fot_anex_apoy_atenc_prev_emerg_des/fot_anex_apoy_atenc_prev_emerg_des.interface';

@Injectable({
  providedIn: 'root'
})
export class FotografiasAnexasApoyAtencPrevEmergDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idFotografiasAnexasApoyAtencPrevEmergDesast?: number, idApoyoAtencPrevEmergDesast?: number): Observable<number> {
    let params = new HttpParams();
    if (idFotografiasAnexasApoyAtencPrevEmergDesast !== undefined) params = params.set('idFotografiasAnexasApoyAtencPrevEmergDesast', idFotografiasAnexasApoyAtencPrevEmergDesast.toString());
    if (idApoyoAtencPrevEmergDesast !== undefined) params = params.set('idApoyoAtencPrevEmergDesast', idApoyoAtencPrevEmergDesast.toString());
    return this.http.get<number>(`${this.baseUrl}/fotografiasAnexasApoyosAtencPrevEmergDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllAttachedPhotographsOfSupports(idFotografiasAnexasApoyAtencPrevEmergDesast?: number, idApoyoAtencPrevEmergDesast?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<FotografiasAnexasApoyAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idFotografiasAnexasApoyAtencPrevEmergDesast !== undefined) params = params.set('idFotografiasAnexasApoyAtencPrevEmergDesast', idFotografiasAnexasApoyAtencPrevEmergDesast.toString());
    if (idApoyoAtencPrevEmergDesast !== undefined) params = params.set('idApoyoAtencPrevEmergDesast', idApoyoAtencPrevEmergDesast.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<FotografiasAnexasApoyAtencPrevEmergDesastI[]>(`${this.baseUrl}/fotografiasAnexasApoyosAtencPrevEmergDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllAttachedPhotographsOfSupportsPag(page: number = 0, size: number = 10, idFotografiasAnexasApoyAtencPrevEmergDesast?: number, idApoyoAtencPrevEmergDesast?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<FotografiasAnexasApoyAtencPrevEmergDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idFotografiasAnexasApoyAtencPrevEmergDesast !== undefined) params = params.set('idFotografiasAnexasApoyAtencPrevEmergDesast', idFotografiasAnexasApoyAtencPrevEmergDesast.toString());
    if (idApoyoAtencPrevEmergDesast !== undefined) params = params.set('idApoyoAtencPrevEmergDesast', idApoyoAtencPrevEmergDesast.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/fotografiasAnexasApoyosAtencPrevEmergDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as FotografiasAnexasApoyAtencPrevEmergDesastI[])
    );
  }

  //CREAR REGISTRO (EL BACKEND SOLO PERMITE UN REGISTRO DE FOTOGRAFÍAS ANEXAS POR APOYO).
  addAttachedPhotographsOfSupport(fotografiasAnexas: FotografiasAnexasApoyAtencPrevEmergDesastI): Observable<FotografiasAnexasApoyAtencPrevEmergDesastMsj> {
    return this.http.post<FotografiasAnexasApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/fotografiasAnexasApoyosAtencPrevEmergDesast`, fotografiasAnexas);
  }

  //CONSULTAR REGISTRO POR ID.
  getAttachedPhotographsOfSupportbyId(idFotografiasAnexasApoyAtencPrevEmergDesast: number): Observable<ResponseFotografiaAnexaApoyAtencPrevEmergDesastDTO> {
    return this.http.get<ResponseFotografiaAnexaApoyAtencPrevEmergDesastDTO>(`${this.baseUrl}/fotografiasAnexasApoyosAtencPrevEmergDesast/${idFotografiasAnexasApoyAtencPrevEmergDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateAttachedPhotographsOfSupport(fotografiasAnexas: FotografiasAnexasApoyAtencPrevEmergDesastI): Observable<FotografiasAnexasApoyAtencPrevEmergDesastMsj> {
    return this.http.put<FotografiasAnexasApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/fotografiasAnexasApoyosAtencPrevEmergDesast`, fotografiasAnexas);
  }

  //ELIMINAR REGISTRO.
  deleteAttachedPhotographsOfSupport(idFotografiasAnexasApoyAtencPrevEmergDesast: number): Observable<FotografiasAnexasApoyAtencPrevEmergDesastMsj> {
    return this.http.delete<FotografiasAnexasApoyAtencPrevEmergDesastMsj>(`${this.baseUrl}/fotografiasAnexasApoyosAtencPrevEmergDesast/${idFotografiasAnexasApoyAtencPrevEmergDesast}`);
  }

}
