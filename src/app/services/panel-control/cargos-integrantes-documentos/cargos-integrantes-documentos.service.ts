import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseCargoIntegranteDocumentosDTO } from '../../../interfaces/panel-control/cargos-integrantes-documentos/responseCargoIntegranteDocumentosDTO.interface';
import { CargosIntegrantesDocumentosI, CargosIntegrantesDocumentosMsj } from '../../../interfaces/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.interface';

@Injectable({
  providedIn: 'root'
})
export class CargosIntegrantesDocumentosService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idCargoIntegranteDocumentos?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idCargoIntegranteDocumentos !== undefined) params = params.set('idCargoIntegranteDocumentos', idCargoIntegranteDocumentos.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/cargosIntegrantesDocumentos/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllCargosIntegrantesDocumentos(idCargoIntegranteDocumentos?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<CargosIntegrantesDocumentosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idCargoIntegranteDocumentos !== undefined) params = params.set('idCargoIntegranteDocumentos', idCargoIntegranteDocumentos.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<CargosIntegrantesDocumentosI[]>(`${this.baseUrl}/cargosIntegrantesDocumentos/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllCargosIntegrantesDocumentosPag(page: number = 0, size: number = 10, idCargoIntegranteDocumentos?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<CargosIntegrantesDocumentosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idCargoIntegranteDocumentos !== undefined) params = params.set('idCargoIntegranteDocumentos', idCargoIntegranteDocumentos.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/cargosIntegrantesDocumentos/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as CargosIntegrantesDocumentosI[])
    );
  }

  //CREAR REGISTRO.
  addCargoIntegranteDocumentos(cargoIntegranteDocumentos: CargosIntegrantesDocumentosI): Observable<CargosIntegrantesDocumentosMsj> {
    return this.http.post<CargosIntegrantesDocumentosMsj>(`${this.baseUrl}/cargosIntegrantesDocumentos`, cargoIntegranteDocumentos);
  }

  //CONSULTAR REGISTRO POR ID.
  getCargoIntegranteDocumentosbyId(idCargoIntegranteDocumentos: number): Observable<ResponseCargoIntegranteDocumentosDTO> {
    return this.http.get<ResponseCargoIntegranteDocumentosDTO>(`${this.baseUrl}/cargosIntegrantesDocumentos/${idCargoIntegranteDocumentos}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getCargoIntegranteDocumentosbyNombre(nombreCargoIntegranteDocumentos: string): Observable<ResponseCargoIntegranteDocumentosDTO> {
    return this.http.get<ResponseCargoIntegranteDocumentosDTO>(`${this.baseUrl}/cargosIntegrantesDocumentos/nombre/${nombreCargoIntegranteDocumentos}`);
  }

  //MODIFICAR REGISTRO.
  updateCargoIntegranteDocumentos(cargoIntegranteDocumentos: CargosIntegrantesDocumentosI): Observable<CargosIntegrantesDocumentosMsj> {
    return this.http.put<CargosIntegrantesDocumentosMsj>(`${this.baseUrl}/cargosIntegrantesDocumentos`, cargoIntegranteDocumentos);
  }

  //ELIMINAR REGISTRO.
  deleteCargoIntegranteDocumentos(idCargoIntegranteDocumentos: number): Observable<CargosIntegrantesDocumentosMsj> {
    return this.http.delete<CargosIntegrantesDocumentosMsj>(`${this.baseUrl}/cargosIntegrantesDocumentos/${idCargoIntegranteDocumentos}`);
  }

}
