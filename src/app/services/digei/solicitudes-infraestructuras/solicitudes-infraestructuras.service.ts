import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseSolicitudInfraestructuraDTO } from '../../../interfaces/digei/solicitudes-infraestructuras/responseSolicitudInfraestructuraDTO.interface';
import { SolicitudesInfraestructurasI, SolicitudesInfraestructurasMsj } from '../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesInfraestructurasService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  //LOS ESTADOS SON OPCIONALES Y VAN AL FINAL: UNO O VARIOS SEPARADOS POR COMA (EJ. "VERIFICACION" PARA LA SEMAFORIZACIÓN O
  //"ASIGNACION,APROBACION,RECHAZADO" PARA LAS SOLICITUDES AVALADAS):
  findCountTotalRegisters(idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, estadosSolicitudInfraestructura?: string, idTipoSolicitudInfraestructura?: number): Observable<number> {
    let params = new HttpParams();
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (estadosSolicitudInfraestructura) params = params.set('estadosSolicitudInfraestructura', estadosSolicitudInfraestructura);
    if (idTipoSolicitudInfraestructura !== undefined) params = params.set('idTipoSolicitudInfraestructura', idTipoSolicitudInfraestructura.toString());
    return this.http.get<number>(`${this.baseUrl}/solicitudesInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllInfrastructureRequests(idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC', estadosSolicitudInfraestructura?: string, idTipoSolicitudInfraestructura?: number): Observable<SolicitudesInfraestructurasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    if (estadosSolicitudInfraestructura) params = params.set('estadosSolicitudInfraestructura', estadosSolicitudInfraestructura);
    if (idTipoSolicitudInfraestructura !== undefined) params = params.set('idTipoSolicitudInfraestructura', idTipoSolicitudInfraestructura.toString());
    return this.http.get<SolicitudesInfraestructurasI[]>(`${this.baseUrl}/solicitudesInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  //LOS ESTADOS SON OPCIONALES Y VAN AL FINAL (UNO O VARIOS SEPARADOS POR COMA, EJ. "ASIGNACION,APROBACION,RECHAZADO"):
  findAllInfrastructureRequestsPag(page: number = 0, size: number = 10, idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC', estadosSolicitudInfraestructura?: string, idTipoSolicitudInfraestructura?: number): Observable<SolicitudesInfraestructurasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    if (estadosSolicitudInfraestructura) params = params.set('estadosSolicitudInfraestructura', estadosSolicitudInfraestructura);
    if (idTipoSolicitudInfraestructura !== undefined) params = params.set('idTipoSolicitudInfraestructura', idTipoSolicitudInfraestructura.toString());
    return this.http.get<any>(`${this.baseUrl}/solicitudesInfraestructuras/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as SolicitudesInfraestructurasI[])
    );
  }

  //CREAR REGISTRO.
  addInfrastructureRequest(solicitudInfraestructura: SolicitudesInfraestructurasI): Observable<SolicitudesInfraestructurasMsj> {
    return this.http.post<SolicitudesInfraestructurasMsj>(`${this.baseUrl}/solicitudesInfraestructuras`, solicitudInfraestructura);
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureRequestbyId(idSolicitudInfraestructura: number): Observable<ResponseSolicitudInfraestructuraDTO> {
    return this.http.get<ResponseSolicitudInfraestructuraDTO>(`${this.baseUrl}/solicitudesInfraestructuras/${idSolicitudInfraestructura}`);
  }

  //CONSULTAR REGISTRO POR CÓDIGO RADICADO.
  getInfrastructureRequestbyCodigoRadicado(codigoRadicadoSolicitudInfraestructura: string): Observable<ResponseSolicitudInfraestructuraDTO> {
    return this.http.get<ResponseSolicitudInfraestructuraDTO>(`${this.baseUrl}/solicitudesInfraestructuras/codigoRadicado/${codigoRadicadoSolicitudInfraestructura}`);
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureRequest(solicitudInfraestructura: SolicitudesInfraestructurasI): Observable<SolicitudesInfraestructurasMsj> {
    return this.http.put<SolicitudesInfraestructurasMsj>(`${this.baseUrl}/solicitudesInfraestructuras`, solicitudInfraestructura);
  }

  //MODIFICAR REGISTRO DE UNA SOLICITUD AVALADA (SOLO OBSERVACIONES, JUSTIFICACIÓN, DESCRIPCIONES Y ESTADO ASIGNACION, APROBACION O RECHAZADO).
  updateEndorsedInfrastructureRequest(solicitudInfraestructura: SolicitudesInfraestructurasI): Observable<SolicitudesInfraestructurasMsj> {
    return this.http.put<SolicitudesInfraestructurasMsj>(`${this.baseUrl}/solicitudesInfraestructuras/avalada`, solicitudInfraestructura);
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureRequest(idSolicitudInfraestructura: number): Observable<SolicitudesInfraestructurasMsj> {
    return this.http.delete<SolicitudesInfraestructurasMsj>(`${this.baseUrl}/solicitudesInfraestructuras/${idSolicitudInfraestructura}`);
  }

}
