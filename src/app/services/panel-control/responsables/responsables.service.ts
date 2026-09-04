import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseResponsableDTO } from '../../../interfaces/panel-control/responsables/responseResponsableDTO.interface';
import { ResponsablesI, ResponsablesMsj } from '../../../interfaces/panel-control/responsables/responsables.interface';

@Injectable({
  providedIn: 'root'
})
export class ResponsablesService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idResponsable?: number, siglaoAcronimoUnidadMilitar?: string, estado?: string, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idResponsable !== undefined) params = params.set('idResponsable', idResponsable.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (estado) params = params.set('estado', estado);
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/responsables/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllResponsibles(idResponsable?: number, siglaoAcronimoUnidadMilitar?: string, estado?: string, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ResponsablesI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idResponsable !== undefined) params = params.set('idResponsable', idResponsable.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (estado) params = params.set('estado', estado);
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<ResponsablesI[]>(`${this.baseUrl}/responsables/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllResponsiblesPag(page: number = 0, size: number = 10, idResponsable?: number, siglaoAcronimoUnidadMilitar?: string, estado?: string, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ResponsablesI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idResponsable !== undefined) params = params.set('idResponsable', idResponsable.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (estado) params = params.set('estado', estado);
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/responsables/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as ResponsablesI[])
    );
  }

  //CREAR REGISTRO.
  addResponsible(responsable: ResponsablesI): Observable<ResponsablesMsj> {
    return this.http.post<ResponsablesMsj>(`${this.baseUrl}/responsables`, responsable);
  }

  //CONSULTAR REGISTRO POR ID.
  getResponsiblebyId(idResponsable: number): Observable<ResponseResponsableDTO> {
    return this.http.get<ResponseResponsableDTO>(`${this.baseUrl}/responsables/${idResponsable}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN.
  getResponsiblebyNumeroDocumentoIdentificacion(numeroDocumentoIdentificacionResponsable: string): Observable<ResponseResponsableDTO> {
    return this.http.get<ResponseResponsableDTO>(`${this.baseUrl}/responsables/numeroDocumento/${numeroDocumentoIdentificacionResponsable}`);
  }

  //MODIFICAR REGISTRO.
  updateResponsible(responsable: ResponsablesI): Observable<ResponsablesMsj> {
    return this.http.put<ResponsablesMsj>(`${this.baseUrl}/responsables`, responsable);
  }

  //ELIMINAR REGISTRO.
  deleteResponsible(idResponsable: number): Observable<ResponsablesMsj> {
    return this.http.delete<ResponsablesMsj>(`${this.baseUrl}/responsables/${idResponsable}`);
  }

}
