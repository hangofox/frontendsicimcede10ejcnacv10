import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseFotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/fot-anex-apoy-obr-red-mitig-gest-des/responseFotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO.interface';
import { FotografiasAnexasApoyObrRedMitigGestRiesgDesastI, FotografiasAnexasApoyObrRedMitigGestRiesgDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/fot-anex-apoy-obr-red-mitig-gest-des/fot-anex-apoy-obr-red-mitig-gest-des.interface';

@Injectable({
  providedIn: 'root'
})
export class FotografiasAnexasApoyObrRedMitigGestRiesgDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idFotografiasAnexasApoyObrRedMitigGestRiesgDesast?: number, idApoyoObrRedMitigGestRiesgDesast?: number): Observable<number> {
    let params = new HttpParams();
    if (idFotografiasAnexasApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idFotografiasAnexasApoyObrRedMitigGestRiesgDesast', idFotografiasAnexasApoyObrRedMitigGestRiesgDesast.toString());
    if (idApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idApoyoObrRedMitigGestRiesgDesast', idApoyoObrRedMitigGestRiesgDesast.toString());
    return this.http.get<number>(`${this.baseUrl}/fotografiasAnexasApoyosObrRedMitigGestRiesgDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllAttachedPhotographsOfSupports(idFotografiasAnexasApoyObrRedMitigGestRiesgDesast?: number, idApoyoObrRedMitigGestRiesgDesast?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<FotografiasAnexasApoyObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idFotografiasAnexasApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idFotografiasAnexasApoyObrRedMitigGestRiesgDesast', idFotografiasAnexasApoyObrRedMitigGestRiesgDesast.toString());
    if (idApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idApoyoObrRedMitigGestRiesgDesast', idApoyoObrRedMitigGestRiesgDesast.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<FotografiasAnexasApoyObrRedMitigGestRiesgDesastI[]>(`${this.baseUrl}/fotografiasAnexasApoyosObrRedMitigGestRiesgDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllAttachedPhotographsOfSupportsPag(page: number = 0, size: number = 10, idFotografiasAnexasApoyObrRedMitigGestRiesgDesast?: number, idApoyoObrRedMitigGestRiesgDesast?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<FotografiasAnexasApoyObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idFotografiasAnexasApoyObrRedMitigGestRiesgDesast !== undefined) params = params.set('idFotografiasAnexasApoyObrRedMitigGestRiesgDesast', idFotografiasAnexasApoyObrRedMitigGestRiesgDesast.toString());
    if (idApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idApoyoObrRedMitigGestRiesgDesast', idApoyoObrRedMitigGestRiesgDesast.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/fotografiasAnexasApoyosObrRedMitigGestRiesgDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as FotografiasAnexasApoyObrRedMitigGestRiesgDesastI[])
    );
  }

  //CREAR REGISTRO (EL BACKEND SOLO PERMITE UN REGISTRO DE FOTOGRAFÍAS ANEXAS POR APOYO).
  addAttachedPhotographsOfSupport(fotografiasAnexas: FotografiasAnexasApoyObrRedMitigGestRiesgDesastI): Observable<FotografiasAnexasApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.post<FotografiasAnexasApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/fotografiasAnexasApoyosObrRedMitigGestRiesgDesast`, fotografiasAnexas);
  }

  //CONSULTAR REGISTRO POR ID.
  getAttachedPhotographsOfSupportbyId(idFotografiasAnexasApoyObrRedMitigGestRiesgDesast: number): Observable<ResponseFotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseFotografiaAnexaApoyObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/fotografiasAnexasApoyosObrRedMitigGestRiesgDesast/${idFotografiasAnexasApoyObrRedMitigGestRiesgDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateAttachedPhotographsOfSupport(fotografiasAnexas: FotografiasAnexasApoyObrRedMitigGestRiesgDesastI): Observable<FotografiasAnexasApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.put<FotografiasAnexasApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/fotografiasAnexasApoyosObrRedMitigGestRiesgDesast`, fotografiasAnexas);
  }

  //ELIMINAR REGISTRO.
  deleteAttachedPhotographsOfSupport(idFotografiasAnexasApoyObrRedMitigGestRiesgDesast: number): Observable<FotografiasAnexasApoyObrRedMitigGestRiesgDesastMsj> {
    return this.http.delete<FotografiasAnexasApoyObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/fotografiasAnexasApoyosObrRedMitigGestRiesgDesast/${idFotografiasAnexasApoyObrRedMitigGestRiesgDesast}`);
  }

}
