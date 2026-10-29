import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO } from '../../../../interfaces/digei/gestion-riesgo/tipos-em-desast-gen-obr-red-mitig/responseTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO.interface';
import { TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI, TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastMsj } from '../../../../interfaces/digei/gestion-riesgo/tipos-em-desast-gen-obr-red-mitig/tipos-em-desast-gen-obr-red-mitig.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast', idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTypesOfEmergenciesDisastersGeneratingWorks(idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast', idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI[]>(`${this.baseUrl}/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfEmergenciesDisastersGeneratingWorksPag(page: number = 0, size: number = 10, idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast !== undefined) params = params.set('idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast', idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI[])
    );
  }

  //CREAR REGISTRO.
  addTypeOfEmergencyDisasterGeneratingWorks(tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast: TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI): Observable<TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastMsj> {
    return this.http.post<TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast`, tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast);
  }

  //CONSULTAR REGISTRO POR ID.
  getTypeOfEmergencyDisasterGeneratingWorksbyId(idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast: number): Observable<ResponseTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/${idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTypeOfEmergencyDisasterGeneratingWorksbyNombre(nombreTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast: string): Observable<ResponseTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO> {
    return this.http.get<ResponseTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO>(`${this.baseUrl}/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/nombre/${nombreTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast}`);
  }

  //MODIFICAR REGISTRO.
  updateTypeOfEmergencyDisasterGeneratingWorks(tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast: TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI): Observable<TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastMsj> {
    return this.http.put<TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast`, tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast);
  }

  //ELIMINAR REGISTRO.
  deleteTypeOfEmergencyDisasterGeneratingWorks(idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast: number): Observable<TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastMsj> {
    return this.http.delete<TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastMsj>(`${this.baseUrl}/tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast/${idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast}`);
  }

}
