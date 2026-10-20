import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistorialIntegrantesSolicInfraestI, HistorialIntegrantesSolicInfraestMsj } from '../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.interface';
import { ResponseHistorialIntegranteSolicitudInfraestructuraDTO } from '../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/historial-integrantes-solic-infraest/responseHistorialIntegranteSolicitudInfraestructuraDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialIntegrantesSolicInfraestService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialIntegranteSolicitudInfraestructura?: number, idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    const params = this.buildParams(idHistorialIntegranteSolicitudInfraestructura, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/historialesIntegrantesSolicitudesInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllInfrastructureRequestMemberHistories(idHistorialIntegranteSolicitudInfraestructura?: number, idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialIntegrantesSolicInfraestI[]> {
    let params = this.buildParams(idHistorialIntegranteSolicitudInfraestructura, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar)
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<HistorialIntegrantesSolicInfraestI[]>(
      `${this.baseUrl}/historialesIntegrantesSolicitudesInfraestructuras/lista`,
      { params }
    );
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllInfrastructureRequestMemberHistoriesPag(page: number = 0, size: number = 10, idHistorialIntegranteSolicitudInfraestructura?: number, idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialIntegrantesSolicInfraestI[]> {
    let params = this.buildParams(idHistorialIntegranteSolicitudInfraestructura, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<{ content: HistorialIntegrantesSolicInfraestI[] }>(
      `${this.baseUrl}/historialesIntegrantesSolicitudesInfraestructuras/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addInfrastructureRequestMemberHistory(historial: HistorialIntegrantesSolicInfraestI): Observable<HistorialIntegrantesSolicInfraestMsj> {
    return this.http.post<HistorialIntegrantesSolicInfraestMsj>(
      `${this.baseUrl}/historialesIntegrantesSolicitudesInfraestructuras`,
      historial
    );
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureRequestMemberHistorybyId(idHistorialIntegranteSolicitudInfraestructura: number): Observable<ResponseHistorialIntegranteSolicitudInfraestructuraDTO> {
    return this.http.get<ResponseHistorialIntegranteSolicitudInfraestructuraDTO>(
      `${this.baseUrl}/historialesIntegrantesSolicitudesInfraestructuras/${idHistorialIntegranteSolicitudInfraestructura}`
    );
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO.
  getInfrastructureRequestMemberHistorybyNumeroRegistro(numRegHistorialIntegranteSolicitudInfraestructura: string): Observable<ResponseHistorialIntegranteSolicitudInfraestructuraDTO> {
    return this.http.get<ResponseHistorialIntegranteSolicitudInfraestructuraDTO>(
      `${this.baseUrl}/historialesIntegrantesSolicitudesInfraestructuras/numeroRegistro/${numRegHistorialIntegranteSolicitudInfraestructura}`
    );
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureRequestMemberHistory(historial: HistorialIntegrantesSolicInfraestI): Observable<HistorialIntegrantesSolicInfraestMsj> {
    return this.http.put<HistorialIntegrantesSolicInfraestMsj>(
      `${this.baseUrl}/historialesIntegrantesSolicitudesInfraestructuras`,
      historial
    );
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureRequestMemberHistory(idHistorialIntegranteSolicitudInfraestructura: number): Observable<HistorialIntegrantesSolicInfraestMsj> {
    return this.http.delete<HistorialIntegrantesSolicInfraestMsj>(
      `${this.baseUrl}/historialesIntegrantesSolicitudesInfraestructuras/${idHistorialIntegranteSolicitudInfraestructura}`
    );
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA.
  private buildParams(idHistorialIntegranteSolicitudInfraestructura?: number, idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): HttpParams {
    let params = new HttpParams();
    if (idHistorialIntegranteSolicitudInfraestructura !== undefined) {
      params = params.set('idHistorialIntegranteSolicitudInfraestructura', idHistorialIntegranteSolicitudInfraestructura.toString());
    }
    if (idSolicitudInfraestructura !== undefined) {
      params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return params;
  }
}
