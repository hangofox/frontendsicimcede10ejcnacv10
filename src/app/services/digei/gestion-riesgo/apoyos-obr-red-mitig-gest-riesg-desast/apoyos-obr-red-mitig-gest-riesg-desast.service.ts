import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseApoyoObrRedMitigGestRiesgDesastDTO } from '../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/responseApoyoObrRedMitigGestRiesgDesastDTO.interface';
import { ApoyosObrRedMitigGestRiesgDesastI, ApoyosObrRedMitigGestRiesgDesastMsj } from '../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.interface';

@Injectable({
  providedIn: 'root'
})
export class ApoyosObrRedMitigGestRiesgDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idApoyoObrRedMitigGestRiesgDesast?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    let params = new HttpParams();
    if (idApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idApoyoObrRedMitigGestRiesgDesast', idApoyoObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/apoyosObrRedMitigGestRiesgDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSupportsWorksReductionMitigationRiskManagementDisasters(idApoyoObrRedMitigGestRiesgDesast?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ApoyosObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idApoyoObrRedMitigGestRiesgDesast', idApoyoObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<ApoyosObrRedMitigGestRiesgDesastI[]>(`${this.baseUrl}/apoyosObrRedMitigGestRiesgDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSupportsWorksReductionMitigationRiskManagementDisastersPag(page: number = 0, size: number = 10, idApoyoObrRedMitigGestRiesgDesast?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ApoyosObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idApoyoObrRedMitigGestRiesgDesast', idApoyoObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/apoyosObrRedMitigGestRiesgDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as ApoyosObrRedMitigGestRiesgDesastI[])
    );
  }

  //CREAR REGISTRO.
  addSupportWorkReductionMitigationRiskManagementDisaster(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): Observable<ApoyosObrRedMitigGestRiesgDesastMsj> {
    return this.http.post<ApoyosObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/apoyosObrRedMitigGestRiesgDesast`, apoyoObrRedMitigGestRiesgDesast);
  }

  //CONSULTAR REGISTRO POR ID.
  getSupportWorkReductionMitigationRiskManagementDisasterbyId(idApoyoObrRedMitigGestRiesgDesast: number): Observable<ResponseApoyoObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseApoyoObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/apoyosObrRedMitigGestRiesgDesast/${idApoyoObrRedMitigGestRiesgDesast}`);
  }

  //CONSULTAR REGISTRO POR CÓDIGO RADICADO.
  getSupportWorkReductionMitigationRiskManagementDisasterbyCodigoRadicado(codigoRadicadoApoyoObrRedMitigGestRiesgDesast: string): Observable<ResponseApoyoObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseApoyoObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/apoyosObrRedMitigGestRiesgDesast/codigoRadicado/${codigoRadicadoApoyoObrRedMitigGestRiesgDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateSupportWorkReductionMitigationRiskManagementDisaster(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): Observable<ApoyosObrRedMitigGestRiesgDesastMsj> {
    return this.http.put<ApoyosObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/apoyosObrRedMitigGestRiesgDesast`, apoyoObrRedMitigGestRiesgDesast);
  }

  //ELIMINAR REGISTRO.
  deleteSupportWorkReductionMitigationRiskManagementDisaster(idApoyoObrRedMitigGestRiesgDesast: number): Observable<ApoyosObrRedMitigGestRiesgDesastMsj> {
    return this.http.delete<ApoyosObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/apoyosObrRedMitigGestRiesgDesast/${idApoyoObrRedMitigGestRiesgDesast}`);
  }

}
