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
  findCountTotalRegisters(idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    let params = new HttpParams();
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/solicitudesInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSolicitudesInfraestructuras(idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<SolicitudesInfraestructurasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<SolicitudesInfraestructurasI[]>(`${this.baseUrl}/solicitudesInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSolicitudesInfraestructurasPag(page: number = 0, size: number = 10, idSolicitudInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<SolicitudesInfraestructurasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/solicitudesInfraestructuras/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as SolicitudesInfraestructurasI[])
    );
  }

  //CREAR REGISTRO.
  addSolicitudInfraestructura(solicitudInfraestructura: SolicitudesInfraestructurasI): Observable<SolicitudesInfraestructurasMsj> {
    return this.http.post<SolicitudesInfraestructurasMsj>(`${this.baseUrl}/solicitudesInfraestructuras`, solicitudInfraestructura);
  }

  //CONSULTAR REGISTRO POR ID.
  getSolicitudInfraestructurabyId(idSolicitudInfraestructura: number): Observable<ResponseSolicitudInfraestructuraDTO> {
    return this.http.get<ResponseSolicitudInfraestructuraDTO>(`${this.baseUrl}/solicitudesInfraestructuras/${idSolicitudInfraestructura}`);
  }

  //CONSULTAR REGISTRO POR CÓDIGO RADICADO.
  getSolicitudInfraestructurabyCodigoRadicado(codigoRadicadoSolicitudInfraestructura: string): Observable<ResponseSolicitudInfraestructuraDTO> {
    return this.http.get<ResponseSolicitudInfraestructuraDTO>(`${this.baseUrl}/solicitudesInfraestructuras/codigoRadicado/${codigoRadicadoSolicitudInfraestructura}`);
  }

  //MODIFICAR REGISTRO.
  updateSolicitudInfraestructura(solicitudInfraestructura: SolicitudesInfraestructurasI): Observable<SolicitudesInfraestructurasMsj> {
    return this.http.put<SolicitudesInfraestructurasMsj>(`${this.baseUrl}/solicitudesInfraestructuras`, solicitudInfraestructura);
  }

  //ELIMINAR REGISTRO.
  deleteSolicitudInfraestructura(idSolicitudInfraestructura: number): Observable<SolicitudesInfraestructurasMsj> {
    return this.http.delete<SolicitudesInfraestructurasMsj>(`${this.baseUrl}/solicitudesInfraestructuras/${idSolicitudInfraestructura}`);
  }

}
