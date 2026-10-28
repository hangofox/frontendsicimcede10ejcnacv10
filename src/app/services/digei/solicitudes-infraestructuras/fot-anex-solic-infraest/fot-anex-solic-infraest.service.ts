import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseFotografiaAnexaSolicInfraestDTO } from '../../../../interfaces/digei/solicitudes-infraestructuras/fot-anex-solic-infraest/responseFotografiaAnexaSolicInfraestDTO.interface';
import { FotografiasAnexasSolicInfraestI, FotografiasAnexasSolicInfraestMsj } from '../../../../interfaces/digei/solicitudes-infraestructuras/fot-anex-solic-infraest/fot-anex-solic-infraest.interface';

@Injectable({
  providedIn: 'root'
})
export class FotografiasAnexasSolicInfraestService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idFotografiasAnexasSolicInfraest?: number, idSolicitudInfraestructura?: number): Observable<number> {
    let params = new HttpParams();
    if (idFotografiasAnexasSolicInfraest !== undefined) params = params.set('idFotografiasAnexasSolicInfraest', idFotografiasAnexasSolicInfraest.toString());
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    return this.http.get<number>(`${this.baseUrl}/fotografiasAnexasSolicInfraest/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllAttachedPhotographsOfInfrastructureRequests(idFotografiasAnexasSolicInfraest?: number, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<FotografiasAnexasSolicInfraestI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idFotografiasAnexasSolicInfraest !== undefined) params = params.set('idFotografiasAnexasSolicInfraest', idFotografiasAnexasSolicInfraest.toString());
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<FotografiasAnexasSolicInfraestI[]>(`${this.baseUrl}/fotografiasAnexasSolicInfraest/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllAttachedPhotographsOfInfrastructureRequestsPag(page: number = 0, size: number = 10, idFotografiasAnexasSolicInfraest?: number, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<FotografiasAnexasSolicInfraestI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idFotografiasAnexasSolicInfraest !== undefined) params = params.set('idFotografiasAnexasSolicInfraest', idFotografiasAnexasSolicInfraest.toString());
    if (idSolicitudInfraestructura !== undefined) params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/fotografiasAnexasSolicInfraest/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as FotografiasAnexasSolicInfraestI[])
    );
  }

  //CREAR REGISTRO (EL BACKEND SOLO PERMITE UN REGISTRO DE FOTOGRAFÍAS ANEXAS POR SOLICITUD).
  addAttachedPhotographsOfInfrastructureRequest(fotografiasAnexas: FotografiasAnexasSolicInfraestI): Observable<FotografiasAnexasSolicInfraestMsj> {
    return this.http.post<FotografiasAnexasSolicInfraestMsj>(`${this.baseUrl}/fotografiasAnexasSolicInfraest`, fotografiasAnexas);
  }

  //CONSULTAR REGISTRO POR ID.
  getAttachedPhotographsOfInfrastructureRequestbyId(idFotografiasAnexasSolicInfraest: number): Observable<ResponseFotografiaAnexaSolicInfraestDTO> {
    return this.http.get<ResponseFotografiaAnexaSolicInfraestDTO>(`${this.baseUrl}/fotografiasAnexasSolicInfraest/${idFotografiasAnexasSolicInfraest}`);
  }

  //MODIFICAR REGISTRO.
  updateAttachedPhotographsOfInfrastructureRequest(fotografiasAnexas: FotografiasAnexasSolicInfraestI): Observable<FotografiasAnexasSolicInfraestMsj> {
    return this.http.put<FotografiasAnexasSolicInfraestMsj>(`${this.baseUrl}/fotografiasAnexasSolicInfraest`, fotografiasAnexas);
  }

  //ELIMINAR REGISTRO.
  deleteAttachedPhotographsOfInfrastructureRequest(idFotografiasAnexasSolicInfraest: number): Observable<FotografiasAnexasSolicInfraestMsj> {
    return this.http.delete<FotografiasAnexasSolicInfraestMsj>(`${this.baseUrl}/fotografiasAnexasSolicInfraest/${idFotografiasAnexasSolicInfraest}`);
  }

}
