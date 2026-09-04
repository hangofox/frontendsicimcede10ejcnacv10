import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseOficinaDTO } from '../../../interfaces/panel-control/oficinas/responseOficinaDTO.interface';
import { OficinasI, OficinasMsj } from '../../../interfaces/panel-control/oficinas/oficinas.interface';

@Injectable({
  providedIn: 'root'
})
export class OficinasService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idOficina?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    let params = new HttpParams();
    if (idOficina !== undefined) params = params.set('idOficina', idOficina.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/oficinas/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllOfficesLista(idOficina?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<OficinasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idOficina !== undefined) params = params.set('idOficina', idOficina.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<OficinasI[]>(`${this.baseUrl}/oficinas/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllOfficesPag(page: number = 0, size: number = 10, idOficina?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<OficinasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idOficina !== undefined) params = params.set('idOficina', idOficina.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/oficinas/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as OficinasI[])
    );
  }

  //CREAR REGISTRO.
  addOffice(oficina: OficinasI): Observable<OficinasMsj> {
    return this.http.post<OficinasMsj>(`${this.baseUrl}/oficinas`, oficina);
  }

  //CONSULTAR REGISTRO POR ID.
  getOfficebyId(idOficina: number): Observable<ResponseOficinaDTO> {
    return this.http.get<ResponseOficinaDTO>(`${this.baseUrl}/oficinas/${idOficina}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE Y SIGLA O ACRÓNIMO DE UNIDAD MILITAR.
  getOfficebyNombreAndSiglaoAcronimoUnidadMilitar(nombreOficina: string, siglaoAcronimoUnidadMilitar: string): Observable<ResponseOficinaDTO> {
    return this.http.get<ResponseOficinaDTO>(`${this.baseUrl}/oficinas/nombre/${nombreOficina}/${siglaoAcronimoUnidadMilitar}`);
  }

  //MODIFICAR REGISTRO.
  updateOffice(oficina: OficinasI): Observable<OficinasMsj> {
    return this.http.put<OficinasMsj>(`${this.baseUrl}/oficinas`, oficina);
  }

  //ELIMINAR REGISTRO.
  deleteOffice(idOficina: number): Observable<OficinasMsj> {
    return this.http.delete<OficinasMsj>(`${this.baseUrl}/oficinas/${idOficina}`);
  }

}
