import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseProcesoApoyoAtencionPrevencionDTO } from '../../../../interfaces/digei/gestion-riesgo/procesos-apoyos-atenc-prev/responseProcesoApoyoAtencionPrevencionDTO.interface';
import { ProcesosApoyosAtencionPrevencionI, ProcesosApoyosAtencionPrevencionMsj } from '../../../../interfaces/digei/gestion-riesgo/procesos-apoyos-atenc-prev/procesos-apoyos-atenc-prev.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcesosApoyosAtencionPrevencionService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idProcesoApoyoAtencionPrevencion?: number, keyword?: string, nombreTipoRequerimientoApoyoAtencionPrevencion?: string): Observable<number> {
    let params = new HttpParams();
    if (idProcesoApoyoAtencionPrevencion !== undefined) params = params.set('idProcesoApoyoAtencionPrevencion', idProcesoApoyoAtencionPrevencion.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (nombreTipoRequerimientoApoyoAtencionPrevencion) params = params.set('nombreTipoRequerimientoApoyoAtencionPrevencion', nombreTipoRequerimientoApoyoAtencionPrevencion);
    return this.http.get<number>(`${this.baseUrl}/procesosApoyosAtencionPrevencion/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSupportProcessesAttentionPrevention(idProcesoApoyoAtencionPrevencion?: number, keyword?: string, nombreTipoRequerimientoApoyoAtencionPrevencion?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ProcesosApoyosAtencionPrevencionI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idProcesoApoyoAtencionPrevencion !== undefined) params = params.set('idProcesoApoyoAtencionPrevencion', idProcesoApoyoAtencionPrevencion.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (nombreTipoRequerimientoApoyoAtencionPrevencion) params = params.set('nombreTipoRequerimientoApoyoAtencionPrevencion', nombreTipoRequerimientoApoyoAtencionPrevencion);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<ProcesosApoyosAtencionPrevencionI[]>(`${this.baseUrl}/procesosApoyosAtencionPrevencion/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSupportProcessesAttentionPreventionPag(page: number = 0, size: number = 10, idProcesoApoyoAtencionPrevencion?: number, keyword?: string, nombreTipoRequerimientoApoyoAtencionPrevencion?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ProcesosApoyosAtencionPrevencionI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idProcesoApoyoAtencionPrevencion !== undefined) params = params.set('idProcesoApoyoAtencionPrevencion', idProcesoApoyoAtencionPrevencion.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (nombreTipoRequerimientoApoyoAtencionPrevencion) params = params.set('nombreTipoRequerimientoApoyoAtencionPrevencion', nombreTipoRequerimientoApoyoAtencionPrevencion);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/procesosApoyosAtencionPrevencion/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as ProcesosApoyosAtencionPrevencionI[])
    );
  }

  //CREAR REGISTRO.
  addSupportProcessAttentionPrevention(procesoApoyoAtencionPrevencion: ProcesosApoyosAtencionPrevencionI): Observable<ProcesosApoyosAtencionPrevencionMsj> {
    return this.http.post<ProcesosApoyosAtencionPrevencionMsj>(`${this.baseUrl}/procesosApoyosAtencionPrevencion`, procesoApoyoAtencionPrevencion);
  }

  //CONSULTAR REGISTRO POR ID.
  getSupportProcessAttentionPreventionbyId(idProcesoApoyoAtencionPrevencion: number): Observable<ResponseProcesoApoyoAtencionPrevencionDTO> {
    return this.http.get<ResponseProcesoApoyoAtencionPrevencionDTO>(`${this.baseUrl}/procesosApoyosAtencionPrevencion/${idProcesoApoyoAtencionPrevencion}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE Y NOMBRE DEL TIPO DE REQUERIMIENTO.
  getSupportProcessAttentionPreventionbyNombreYNombreTipoRequerimiento(nombreProcesoApoyoAtencionPrevencion: string, nombreTipoRequerimientoApoyoAtencionPrevencion: string): Observable<ResponseProcesoApoyoAtencionPrevencionDTO> {
    return this.http.get<ResponseProcesoApoyoAtencionPrevencionDTO>(`${this.baseUrl}/procesosApoyosAtencionPrevencion/nombre/${nombreProcesoApoyoAtencionPrevencion}/tipoRequerimientoApoyoAtencionPrevencion/${nombreTipoRequerimientoApoyoAtencionPrevencion}`);
  }

  //MODIFICAR REGISTRO.
  updateSupportProcessAttentionPrevention(procesoApoyoAtencionPrevencion: ProcesosApoyosAtencionPrevencionI): Observable<ProcesosApoyosAtencionPrevencionMsj> {
    return this.http.put<ProcesosApoyosAtencionPrevencionMsj>(`${this.baseUrl}/procesosApoyosAtencionPrevencion`, procesoApoyoAtencionPrevencion);
  }

  //ELIMINAR REGISTRO.
  deleteSupportProcessAttentionPrevention(idProcesoApoyoAtencionPrevencion: number): Observable<ProcesosApoyosAtencionPrevencionMsj> {
    return this.http.delete<ProcesosApoyosAtencionPrevencionMsj>(`${this.baseUrl}/procesosApoyosAtencionPrevencion/${idProcesoApoyoAtencionPrevencion}`);
  }

}
