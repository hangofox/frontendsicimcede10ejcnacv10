import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDocumentosAnexosSolicInfraestI, TiposDocumentosAnexosSolicInfraestMsj } from '../../../../interfaces/digei/solicitudes-infraestructuras/tipos-documentacion-anex-solic-infraest/tipos-documentacion-anex-solic-infraest.interface';
import { ResponseTipoDocumentoAnexoSolicInfraestDTO } from '../../../../interfaces/digei/solicitudes-infraestructuras/tipos-documentacion-anex-solic-infraest/responseTipoDocumentoAnexoSolicInfraestDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposDocumentosAnexosSolicInfraestService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoDocumentoAnexoSolicInfraest?: number, keyword?: string): Observable<number> {
    const params = this.buildParams(idTipoDocumentoAnexoSolicInfraest, keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposDocumentosAnexosSolicInfraest/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN (PARA SELECTS). EL CONTROLLER NO TRAE orderMode POR DEFECTO, POR ESO SIEMPRE SE ENVÍA.
  findAllTypesOfAttachedDocumentsOfInfrastructureRequests(idTipoDocumentoAnexoSolicInfraest?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposDocumentosAnexosSolicInfraestI[]> {
    let params = this.buildParams(idTipoDocumentoAnexoSolicInfraest, keyword).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposDocumentosAnexosSolicInfraestI[]>(`${this.baseUrl}/tiposDocumentosAnexosSolicInfraest/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfAttachedDocumentsOfInfrastructureRequestsPag(page: number = 0, size: number = 10, idTipoDocumentoAnexoSolicInfraest?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposDocumentosAnexosSolicInfraestI[]> {
    let params = this.buildParams(idTipoDocumentoAnexoSolicInfraest, keyword)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: TiposDocumentosAnexosSolicInfraestI[] }>(
      `${this.baseUrl}/tiposDocumentosAnexosSolicInfraest/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addTypeOfAttachedDocumentOfInfrastructureRequest(tipoDocumento: TiposDocumentosAnexosSolicInfraestI): Observable<TiposDocumentosAnexosSolicInfraestMsj> {
    return this.http.post<TiposDocumentosAnexosSolicInfraestMsj>(`${this.baseUrl}/tiposDocumentosAnexosSolicInfraest`, tipoDocumento);
  }

  //CONSULTAR REGISTRO POR ID.
  getTypeOfAttachedDocumentOfInfrastructureRequestbyId(idTipoDocumentoAnexoSolicInfraest: number): Observable<ResponseTipoDocumentoAnexoSolicInfraestDTO> {
    return this.http.get<ResponseTipoDocumentoAnexoSolicInfraestDTO>(`${this.baseUrl}/tiposDocumentosAnexosSolicInfraest/${idTipoDocumentoAnexoSolicInfraest}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTypeOfAttachedDocumentOfInfrastructureRequestbyNombre(nombreTipoDocumentoAnexoSolicInfraest: string): Observable<ResponseTipoDocumentoAnexoSolicInfraestDTO> {
    return this.http.get<ResponseTipoDocumentoAnexoSolicInfraestDTO>(`${this.baseUrl}/tiposDocumentosAnexosSolicInfraest/nombre/${encodeURIComponent(nombreTipoDocumentoAnexoSolicInfraest)}`);
  }

  //MODIFICAR REGISTRO.
  updateTypeOfAttachedDocumentOfInfrastructureRequest(tipoDocumento: TiposDocumentosAnexosSolicInfraestI): Observable<TiposDocumentosAnexosSolicInfraestMsj> {
    return this.http.put<TiposDocumentosAnexosSolicInfraestMsj>(`${this.baseUrl}/tiposDocumentosAnexosSolicInfraest`, tipoDocumento);
  }

  //ELIMINAR REGISTRO.
  deleteTypeOfAttachedDocumentOfInfrastructureRequest(idTipoDocumentoAnexoSolicInfraest: number): Observable<TiposDocumentosAnexosSolicInfraestMsj> {
    return this.http.delete<TiposDocumentosAnexosSolicInfraestMsj>(`${this.baseUrl}/tiposDocumentosAnexosSolicInfraest/${idTipoDocumentoAnexoSolicInfraest}`);
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA (MISMO ORDEN QUE EN EL CONTROLLER).
  private buildParams(idTipoDocumentoAnexoSolicInfraest?: number, keyword?: string): HttpParams {
    let params = new HttpParams();
    if (idTipoDocumentoAnexoSolicInfraest !== undefined) {
      params = params.set('idTipoDocumentoAnexoSolicInfraest', idTipoDocumentoAnexoSolicInfraest.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    return params;
  }
}
