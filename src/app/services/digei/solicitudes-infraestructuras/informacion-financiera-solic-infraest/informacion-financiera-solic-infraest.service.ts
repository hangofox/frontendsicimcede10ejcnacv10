import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InformacionFinancieraSolicInfraestI, InformacionFinancieraSolicInfraestMsj } from '../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/informacion-financiera-solic-infraest.interface';
import { ResponseInformacionFinancieraSolicitudInfraestructuraDTO } from '../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/responseInformacionFinancieraSolicitudInfraestructuraDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class InformacionFinancieraSolicInfraestService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS (EL CONTROLLER SOLO RECIBE keyword E idSolicitudInfraestructura).
  findCountTotalRegisters(keyword?: string, idSolicitudInfraestructura?: number): Observable<number> {
    const params = this.buildParams(keyword, idSolicitudInfraestructura);
    return this.http.get<number>(`${this.baseUrl}/informacionesFinancierasSolicitudesInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllInfrastructureRequestFinancialInformation(keyword?: string, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<InformacionFinancieraSolicInfraestI[]> {
    let params = this.buildParams(keyword, idSolicitudInfraestructura).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<InformacionFinancieraSolicInfraestI[]>(
      `${this.baseUrl}/informacionesFinancierasSolicitudesInfraestructuras/lista`,
      { params }
    );
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllInfrastructureRequestFinancialInformationPag(page: number = 0, size: number = 10, keyword?: string, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<InformacionFinancieraSolicInfraestI[]> {
    let params = this.buildParams(keyword, idSolicitudInfraestructura)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<{ content: InformacionFinancieraSolicInfraestI[] }>(
      `${this.baseUrl}/informacionesFinancierasSolicitudesInfraestructuras/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addInfrastructureRequestFinancialInformation(informacionFinanciera: InformacionFinancieraSolicInfraestI): Observable<InformacionFinancieraSolicInfraestMsj> {
    return this.http.post<InformacionFinancieraSolicInfraestMsj>(
      `${this.baseUrl}/informacionesFinancierasSolicitudesInfraestructuras`,
      informacionFinanciera
    );
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureRequestFinancialInformationbyId(idInformacionFinancieraSolicitudInfraestructura: number): Observable<ResponseInformacionFinancieraSolicitudInfraestructuraDTO> {
    return this.http.get<ResponseInformacionFinancieraSolicitudInfraestructuraDTO>(
      `${this.baseUrl}/informacionesFinancierasSolicitudesInfraestructuras/${idInformacionFinancieraSolicitudInfraestructura}`
    );
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureRequestFinancialInformation(informacionFinanciera: InformacionFinancieraSolicInfraestI): Observable<InformacionFinancieraSolicInfraestMsj> {
    return this.http.put<InformacionFinancieraSolicInfraestMsj>(
      `${this.baseUrl}/informacionesFinancierasSolicitudesInfraestructuras`,
      informacionFinanciera
    );
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureRequestFinancialInformation(idInformacionFinancieraSolicitudInfraestructura: number): Observable<InformacionFinancieraSolicInfraestMsj> {
    return this.http.delete<InformacionFinancieraSolicInfraestMsj>(
      `${this.baseUrl}/informacionesFinancierasSolicitudesInfraestructuras/${idInformacionFinancieraSolicitudInfraestructura}`
    );
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA (MISMO ORDEN QUE EN EL CONTROLLER).
  private buildParams(keyword?: string, idSolicitudInfraestructura?: number): HttpParams {
    let params = new HttpParams();
    if (keyword) params = params.set('keyword', keyword);
    if (idSolicitudInfraestructura !== undefined) {
      params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    }
    return params;
  }
}
