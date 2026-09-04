import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHistorialIntegranteDocumentosDTO } from '../../../interfaces/panel-control/historial-integrantes-documentos/responseHistorialIntegranteDocumentosDTO.interface';
import { HistorialIntegrantesDocumentosI, HistorialIntegrantesDocumentosMsj } from '../../../interfaces/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialIntegrantesDocumentosService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialIntegranteDocumentos?: number, siglaoAcronimoUnidadMilitar?: string, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idHistorialIntegranteDocumentos !== undefined) params = params.set('idHistorialIntegranteDocumentos', idHistorialIntegranteDocumentos.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesIntegrantesDocumentos/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllHistorialesIntegrantesDocumentos(idHistorialIntegranteDocumentos?: number, siglaoAcronimoUnidadMilitar?: string, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialIntegrantesDocumentosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialIntegranteDocumentos !== undefined) params = params.set('idHistorialIntegranteDocumentos', idHistorialIntegranteDocumentos.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialIntegrantesDocumentosI[]>(`${this.baseUrl}/historialesIntegrantesDocumentos/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllHistorialesIntegrantesDocumentosPag(page: number = 0, size: number = 10, idHistorialIntegranteDocumentos?: number, siglaoAcronimoUnidadMilitar?: string, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialIntegrantesDocumentosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialIntegranteDocumentos !== undefined) params = params.set('idHistorialIntegranteDocumentos', idHistorialIntegranteDocumentos.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesIntegrantesDocumentos/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialIntegrantesDocumentosI[])
    );
  }

  //CREAR REGISTRO.
  addHistorialIntegranteDocumentos(historialIntegranteDocumentos: HistorialIntegrantesDocumentosI): Observable<HistorialIntegrantesDocumentosMsj> {
    return this.http.post<HistorialIntegrantesDocumentosMsj>(`${this.baseUrl}/historialesIntegrantesDocumentos`, historialIntegranteDocumentos);
  }

  //CONSULTAR REGISTRO POR ID.
  getHistorialIntegranteDocumentosbyId(idHistorialIntegranteDocumentos: number): Observable<ResponseHistorialIntegranteDocumentosDTO> {
    return this.http.get<ResponseHistorialIntegranteDocumentosDTO>(`${this.baseUrl}/historialesIntegrantesDocumentos/${idHistorialIntegranteDocumentos}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO.
  getHistorialIntegranteDocumentosbyNumReg(numRegHistorialIntegranteDocumentos: string): Observable<ResponseHistorialIntegranteDocumentosDTO> {
    return this.http.get<ResponseHistorialIntegranteDocumentosDTO>(`${this.baseUrl}/historialesIntegrantesDocumentos/numeroRegistro/${numRegHistorialIntegranteDocumentos}`);
  }

  //MODIFICAR REGISTRO.
  updateHistorialIntegranteDocumentos(historialIntegranteDocumentos: HistorialIntegrantesDocumentosI): Observable<HistorialIntegrantesDocumentosMsj> {
    return this.http.put<HistorialIntegrantesDocumentosMsj>(`${this.baseUrl}/historialesIntegrantesDocumentos`, historialIntegranteDocumentos);
  }

  //ELIMINAR REGISTRO.
  deleteHistorialIntegranteDocumentos(idHistorialIntegranteDocumentos: number): Observable<HistorialIntegrantesDocumentosMsj> {
    return this.http.delete<HistorialIntegrantesDocumentosMsj>(`${this.baseUrl}/historialesIntegrantesDocumentos/${idHistorialIntegranteDocumentos}`);
  }

}
