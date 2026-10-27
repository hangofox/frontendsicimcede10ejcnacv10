import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTipoRequerimientoApoyoAtencionPrevencionDTO } from '../../../../interfaces/digei/gestion-riesgo/tipos-requerimientos-apoy-atenc-prev/responseTipoRequerimientoApoyoAtencionPrevencionDTO.interface';
import { TiposRequerimientosApoyosAtencionPrevencionI, TiposRequerimientosApoyosAtencionPrevencionMsj } from '../../../../interfaces/digei/gestion-riesgo/tipos-requerimientos-apoy-atenc-prev/tipos-requerimientos-apoy-atenc-prev.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposRequerimientosApoyosAtencionPrevencionService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoRequerimientoApoyoAtencionPrevencion?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idTipoRequerimientoApoyoAtencionPrevencion !== undefined) params = params.set('idTipoRequerimientoApoyoAtencionPrevencion', idTipoRequerimientoApoyoAtencionPrevencion.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposRequerimientosApoyosAtencionPrevencion/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTypesOfSupportRequirementsAttentionPrevention(idTipoRequerimientoApoyoAtencionPrevencion?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposRequerimientosApoyosAtencionPrevencionI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idTipoRequerimientoApoyoAtencionPrevencion !== undefined) params = params.set('idTipoRequerimientoApoyoAtencionPrevencion', idTipoRequerimientoApoyoAtencionPrevencion.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposRequerimientosApoyosAtencionPrevencionI[]>(`${this.baseUrl}/tiposRequerimientosApoyosAtencionPrevencion/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfSupportRequirementsAttentionPreventionPag(page: number = 0, size: number = 10, idTipoRequerimientoApoyoAtencionPrevencion?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposRequerimientosApoyosAtencionPrevencionI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idTipoRequerimientoApoyoAtencionPrevencion !== undefined) params = params.set('idTipoRequerimientoApoyoAtencionPrevencion', idTipoRequerimientoApoyoAtencionPrevencion.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/tiposRequerimientosApoyosAtencionPrevencion/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposRequerimientosApoyosAtencionPrevencionI[])
    );
  }

  //CREAR REGISTRO.
  addTypeOfSupportRequirementAttentionPrevention(tipoRequerimientoApoyoAtencionPrevencion: TiposRequerimientosApoyosAtencionPrevencionI): Observable<TiposRequerimientosApoyosAtencionPrevencionMsj> {
    return this.http.post<TiposRequerimientosApoyosAtencionPrevencionMsj>(`${this.baseUrl}/tiposRequerimientosApoyosAtencionPrevencion`, tipoRequerimientoApoyoAtencionPrevencion);
  }

  //CONSULTAR REGISTRO POR ID.
  getTypeOfSupportRequirementAttentionPreventionbyId(idTipoRequerimientoApoyoAtencionPrevencion: number): Observable<ResponseTipoRequerimientoApoyoAtencionPrevencionDTO> {
    return this.http.get<ResponseTipoRequerimientoApoyoAtencionPrevencionDTO>(`${this.baseUrl}/tiposRequerimientosApoyosAtencionPrevencion/${idTipoRequerimientoApoyoAtencionPrevencion}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTypeOfSupportRequirementAttentionPreventionbyNombre(nombreTipoRequerimientoApoyoAtencionPrevencion: string): Observable<ResponseTipoRequerimientoApoyoAtencionPrevencionDTO> {
    return this.http.get<ResponseTipoRequerimientoApoyoAtencionPrevencionDTO>(`${this.baseUrl}/tiposRequerimientosApoyosAtencionPrevencion/nombre/${nombreTipoRequerimientoApoyoAtencionPrevencion}`);
  }

  //MODIFICAR REGISTRO.
  updateTypeOfSupportRequirementAttentionPrevention(tipoRequerimientoApoyoAtencionPrevencion: TiposRequerimientosApoyosAtencionPrevencionI): Observable<TiposRequerimientosApoyosAtencionPrevencionMsj> {
    return this.http.put<TiposRequerimientosApoyosAtencionPrevencionMsj>(`${this.baseUrl}/tiposRequerimientosApoyosAtencionPrevencion`, tipoRequerimientoApoyoAtencionPrevencion);
  }

  //ELIMINAR REGISTRO.
  deleteTypeOfSupportRequirementAttentionPrevention(idTipoRequerimientoApoyoAtencionPrevencion: number): Observable<TiposRequerimientosApoyosAtencionPrevencionMsj> {
    return this.http.delete<TiposRequerimientosApoyosAtencionPrevencionMsj>(`${this.baseUrl}/tiposRequerimientosApoyosAtencionPrevencion/${idTipoRequerimientoApoyoAtencionPrevencion}`);
  }

}
