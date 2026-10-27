import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTipoEntidadInstitucionalDTO } from '../../interfaces/tipos-entidades-institucionales/responseTipoEntidadInstitucionalDTO.interface';
import { TiposEntidadesInstitucionalesI, TiposEntidadesInstitucionalesMsj } from '../../interfaces/tipos-entidades-institucionales/tipos-entidades-institucionales.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposEntidadesInstitucionalesService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoEntidadInstitucional?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idTipoEntidadInstitucional !== undefined) params = params.set('idTipoEntidadInstitucional', idTipoEntidadInstitucional.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposEntidadesInstitucionales/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTypesOfInstitutionalEntities(idTipoEntidadInstitucional?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposEntidadesInstitucionalesI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idTipoEntidadInstitucional !== undefined) params = params.set('idTipoEntidadInstitucional', idTipoEntidadInstitucional.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposEntidadesInstitucionalesI[]>(`${this.baseUrl}/tiposEntidadesInstitucionales/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfInstitutionalEntitiesPag(page: number = 0, size: number = 10, idTipoEntidadInstitucional?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposEntidadesInstitucionalesI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idTipoEntidadInstitucional !== undefined) params = params.set('idTipoEntidadInstitucional', idTipoEntidadInstitucional.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/tiposEntidadesInstitucionales/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposEntidadesInstitucionalesI[])
    );
  }

  //CREAR REGISTRO.
  addTypeOfInstitutionalEntity(tipoEntidadInstitucional: TiposEntidadesInstitucionalesI): Observable<TiposEntidadesInstitucionalesMsj> {
    return this.http.post<TiposEntidadesInstitucionalesMsj>(`${this.baseUrl}/tiposEntidadesInstitucionales`, tipoEntidadInstitucional);
  }

  //CONSULTAR REGISTRO POR ID.
  getTypeOfInstitutionalEntitybyId(idTipoEntidadInstitucional: number): Observable<ResponseTipoEntidadInstitucionalDTO> {
    return this.http.get<ResponseTipoEntidadInstitucionalDTO>(`${this.baseUrl}/tiposEntidadesInstitucionales/${idTipoEntidadInstitucional}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTypeOfInstitutionalEntitybyNombre(nombreTipoEntidadInstitucional: string): Observable<ResponseTipoEntidadInstitucionalDTO> {
    return this.http.get<ResponseTipoEntidadInstitucionalDTO>(`${this.baseUrl}/tiposEntidadesInstitucionales/nombre/${nombreTipoEntidadInstitucional}`);
  }

  //MODIFICAR REGISTRO.
  updateTypeOfInstitutionalEntity(tipoEntidadInstitucional: TiposEntidadesInstitucionalesI): Observable<TiposEntidadesInstitucionalesMsj> {
    return this.http.put<TiposEntidadesInstitucionalesMsj>(`${this.baseUrl}/tiposEntidadesInstitucionales`, tipoEntidadInstitucional);
  }

  //ELIMINAR REGISTRO.
  deleteTypeOfInstitutionalEntity(idTipoEntidadInstitucional: number): Observable<TiposEntidadesInstitucionalesMsj> {
    return this.http.delete<TiposEntidadesInstitucionalesMsj>(`${this.baseUrl}/tiposEntidadesInstitucionales/${idTipoEntidadInstitucional}`);
  }

}
