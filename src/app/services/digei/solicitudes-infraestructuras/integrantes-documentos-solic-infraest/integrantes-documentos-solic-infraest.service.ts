import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseIntegrantesDocumentosSolicInfraestDTO } from '../../../../interfaces/digei/solicitudes-infraestructuras/integrantes-documentos-solic-infraest/responseIntegrantesDocumentosSolicInfraestDTO.interface';
import { IntegrantesDocumentosSolicInfraestI, IntegrantesDocumentosSolicInfraestMsj } from '../../../../interfaces/digei/solicitudes-infraestructuras/integrantes-documentos-solic-infraest/integrantes-documentos-solic-infraest.interface';

@Injectable({
  providedIn: 'root'
})
export class IntegrantesDocumentosSolicInfraestService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idIntegrantesSolicitudesInfraestructura?: number, idSolicitudInfraestructura?: number): Observable<number> {
    let params = new HttpParams();
    if (idIntegrantesSolicitudesInfraestructura !== undefined) params = params.set('idIntegrantesSolicitudesInfraestructura', idIntegrantesSolicitudesInfraestructura.toString());
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    return this.http.get<number>(`${this.baseUrl}/integrantesSolicitudesInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllIntegrantesDocumentosSolicInfraest(idIntegrantesSolicitudesInfraestructura?: number, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<IntegrantesDocumentosSolicInfraestI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idIntegrantesSolicitudesInfraestructura !== undefined) params = params.set('idIntegrantesSolicitudesInfraestructura', idIntegrantesSolicitudesInfraestructura.toString());
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<IntegrantesDocumentosSolicInfraestI[]>(`${this.baseUrl}/integrantesSolicitudesInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllIntegrantesDocumentosSolicInfraestPag(page: number = 0, size: number = 10, idIntegrantesSolicitudesInfraestructura?: number, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<IntegrantesDocumentosSolicInfraestI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idIntegrantesSolicitudesInfraestructura !== undefined) params = params.set('idIntegrantesSolicitudesInfraestructura', idIntegrantesSolicitudesInfraestructura.toString());
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/integrantesSolicitudesInfraestructuras/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as IntegrantesDocumentosSolicInfraestI[])
    );
  }

  //CREAR REGISTRO.
  addIntegrantesDocumentosSolicInfraest(integrantesDocumentosSolicInfraest: IntegrantesDocumentosSolicInfraestI): Observable<IntegrantesDocumentosSolicInfraestMsj> {
    return this.http.post<IntegrantesDocumentosSolicInfraestMsj>(`${this.baseUrl}/integrantesSolicitudesInfraestructuras`, integrantesDocumentosSolicInfraest);
  }

  //CONSULTAR REGISTRO POR ID.
  getIntegrantesDocumentosSolicInfraestbyId(idIntegrantesSolicitudesInfraestructura: number): Observable<ResponseIntegrantesDocumentosSolicInfraestDTO> {
    return this.http.get<ResponseIntegrantesDocumentosSolicInfraestDTO>(`${this.baseUrl}/integrantesSolicitudesInfraestructuras/${idIntegrantesSolicitudesInfraestructura}`);
  }

  //MODIFICAR REGISTRO.
  updateIntegrantesDocumentosSolicInfraest(integrantesDocumentosSolicInfraest: IntegrantesDocumentosSolicInfraestI): Observable<IntegrantesDocumentosSolicInfraestMsj> {
    return this.http.put<IntegrantesDocumentosSolicInfraestMsj>(`${this.baseUrl}/integrantesSolicitudesInfraestructuras`, integrantesDocumentosSolicInfraest);
  }

  //ELIMINAR REGISTRO.
  deleteIntegrantesDocumentosSolicInfraest(idIntegrantesSolicitudesInfraestructura: number): Observable<IntegrantesDocumentosSolicInfraestMsj> {
    return this.http.delete<IntegrantesDocumentosSolicInfraestMsj>(`${this.baseUrl}/integrantesSolicitudesInfraestructuras/${idIntegrantesSolicitudesInfraestructura}`);
  }

}
