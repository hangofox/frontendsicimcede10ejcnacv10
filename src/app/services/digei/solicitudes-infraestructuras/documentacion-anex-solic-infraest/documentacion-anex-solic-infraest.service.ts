import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentacionAnexaSolicInfraestI, DocumentacionAnexaSolicInfraestMsj } from '../../../../interfaces/digei/solicitudes-infraestructuras/documentacion-anex-solic-infraest/documentacion-anex-solic-infraest.interface';
import { ResponseDocumentacionAnexaSolicInfraestDTO } from '../../../../interfaces/digei/solicitudes-infraestructuras/documentacion-anex-solic-infraest/responseDocumentacionAnexaSolicInfraestDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentacionAnexaSolicInfraestService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idDocumentacionAnexaSolicInfraest?: number, keyword?: string, idSolicitudInfraestructura?: number): Observable<number> {
    const params = this.buildParams(idDocumentacionAnexaSolicInfraest, keyword, idSolicitudInfraestructura);
    return this.http.get<number>(`${this.baseUrl}/documentacionAnexasSolicInfraest/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllAttachedDocumentationOfInfrastructureRequests(idDocumentacionAnexaSolicInfraest?: number, keyword?: string, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<DocumentacionAnexaSolicInfraestI[]> {
    let params = this.buildParams(idDocumentacionAnexaSolicInfraest, keyword, idSolicitudInfraestructura).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<DocumentacionAnexaSolicInfraestI[]>(`${this.baseUrl}/documentacionAnexasSolicInfraest/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllAttachedDocumentationOfInfrastructureRequestsPag(page: number = 0, size: number = 10, idDocumentacionAnexaSolicInfraest?: number, keyword?: string, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<DocumentacionAnexaSolicInfraestI[]> {
    let params = this.buildParams(idDocumentacionAnexaSolicInfraest, keyword, idSolicitudInfraestructura)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: DocumentacionAnexaSolicInfraestI[] }>(
      `${this.baseUrl}/documentacionAnexasSolicInfraest/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addAttachedDocumentationOfInfrastructureRequest(documentacion: DocumentacionAnexaSolicInfraestI): Observable<DocumentacionAnexaSolicInfraestMsj> {
    return this.http.post<DocumentacionAnexaSolicInfraestMsj>(`${this.baseUrl}/documentacionAnexasSolicInfraest`, documentacion);
  }

  //CONSULTAR REGISTRO POR ID.
  getAttachedDocumentationOfInfrastructureRequestbyId(idDocumentacionAnexaSolicInfraest: number): Observable<ResponseDocumentacionAnexaSolicInfraestDTO> {
    return this.http.get<ResponseDocumentacionAnexaSolicInfraestDTO>(`${this.baseUrl}/documentacionAnexasSolicInfraest/${idDocumentacionAnexaSolicInfraest}`);
  }

  //MODIFICAR REGISTRO.
  updateAttachedDocumentationOfInfrastructureRequest(documentacion: DocumentacionAnexaSolicInfraestI): Observable<DocumentacionAnexaSolicInfraestMsj> {
    return this.http.put<DocumentacionAnexaSolicInfraestMsj>(`${this.baseUrl}/documentacionAnexasSolicInfraest`, documentacion);
  }

  //ELIMINAR REGISTRO.
  deleteAttachedDocumentationOfInfrastructureRequest(idDocumentacionAnexaSolicInfraest: number): Observable<DocumentacionAnexaSolicInfraestMsj> {
    return this.http.delete<DocumentacionAnexaSolicInfraestMsj>(`${this.baseUrl}/documentacionAnexasSolicInfraest/${idDocumentacionAnexaSolicInfraest}`);
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA (MISMO ORDEN QUE EN EL CONTROLLER).
  private buildParams(idDocumentacionAnexaSolicInfraest?: number, keyword?: string, idSolicitudInfraestructura?: number): HttpParams {
    let params = new HttpParams();
    if (idDocumentacionAnexaSolicInfraest !== undefined) {
      params = params.set('idDocumentacionAnexaSolicInfraest', idDocumentacionAnexaSolicInfraest.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    if (idSolicitudInfraestructura !== undefined) {
      params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    }
    return params;
  }
}
