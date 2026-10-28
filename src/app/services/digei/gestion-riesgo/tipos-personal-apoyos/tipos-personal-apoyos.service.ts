import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTipoPersonalApoyoDTO } from '../../../../interfaces/digei/gestion-riesgo/tipos-personal-apoyos/responseTipoPersonalApoyoDTO.interface';
import { TiposPersonalApoyosI, TiposPersonalApoyosMsj } from '../../../../interfaces/digei/gestion-riesgo/tipos-personal-apoyos/tipos-personal-apoyos.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposPersonalApoyosService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoPersonalApoyo?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idTipoPersonalApoyo !== undefined) params = params.set('idTipoPersonalApoyo', idTipoPersonalApoyo.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposPersonalApoyos/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTypesOfSupportStaff(idTipoPersonalApoyo?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposPersonalApoyosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idTipoPersonalApoyo !== undefined) params = params.set('idTipoPersonalApoyo', idTipoPersonalApoyo.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposPersonalApoyosI[]>(`${this.baseUrl}/tiposPersonalApoyos/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfSupportStaffPag(page: number = 0, size: number = 10, idTipoPersonalApoyo?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposPersonalApoyosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idTipoPersonalApoyo !== undefined) params = params.set('idTipoPersonalApoyo', idTipoPersonalApoyo.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/tiposPersonalApoyos/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposPersonalApoyosI[])
    );
  }

  //CREAR REGISTRO.
  addTypeOfSupportStaff(tipoPersonalApoyo: TiposPersonalApoyosI): Observable<TiposPersonalApoyosMsj> {
    return this.http.post<TiposPersonalApoyosMsj>(`${this.baseUrl}/tiposPersonalApoyos`, tipoPersonalApoyo);
  }

  //CONSULTAR REGISTRO POR ID.
  getTypeOfSupportStaffbyId(idTipoPersonalApoyo: number): Observable<ResponseTipoPersonalApoyoDTO> {
    return this.http.get<ResponseTipoPersonalApoyoDTO>(`${this.baseUrl}/tiposPersonalApoyos/${idTipoPersonalApoyo}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTypeOfSupportStaffbyNombre(nombreTipoPersonalApoyo: string): Observable<ResponseTipoPersonalApoyoDTO> {
    return this.http.get<ResponseTipoPersonalApoyoDTO>(`${this.baseUrl}/tiposPersonalApoyos/nombre/${nombreTipoPersonalApoyo}`);
  }

  //MODIFICAR REGISTRO.
  updateTypeOfSupportStaff(tipoPersonalApoyo: TiposPersonalApoyosI): Observable<TiposPersonalApoyosMsj> {
    return this.http.put<TiposPersonalApoyosMsj>(`${this.baseUrl}/tiposPersonalApoyos`, tipoPersonalApoyo);
  }

  //ELIMINAR REGISTRO.
  deleteTypeOfSupportStaff(idTipoPersonalApoyo: number): Observable<TiposPersonalApoyosMsj> {
    return this.http.delete<TiposPersonalApoyosMsj>(`${this.baseUrl}/tiposPersonalApoyos/${idTipoPersonalApoyo}`);
  }

}
