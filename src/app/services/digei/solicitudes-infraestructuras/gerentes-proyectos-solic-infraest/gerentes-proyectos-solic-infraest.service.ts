import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GerentesProyectosSolicInfraestI, GerentesProyectosSolicInfraestMsj } from '../../../../interfaces/digei/solicitudes-infraestructuras/gerentes-proyectos-solic-infraest/gerentes-proyectos-solic-infraest.interface';
import { ResponseGerenteProyectoSolicInfraestDTO } from '../../../../interfaces/digei/solicitudes-infraestructuras/gerentes-proyectos-solic-infraest/responseGerenteProyectoSolicInfraestDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class GerentesProyectosSolicInfraestService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idGerenteProyectoSolicInfraest?: number, keyword?: string, idSolicitudInfraestructura?: number): Observable<number> {
    const params = this.buildParams(idGerenteProyectoSolicInfraest, keyword, idSolicitudInfraestructura);
    return this.http.get<number>(`${this.baseUrl}/gerentesProyectosSolicInfraest/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllInfrastructureRequestProjectManagers(idGerenteProyectoSolicInfraest?: number, keyword?: string, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<GerentesProyectosSolicInfraestI[]> {
    let params = this.buildParams(idGerenteProyectoSolicInfraest, keyword, idSolicitudInfraestructura)
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<GerentesProyectosSolicInfraestI[]>(
      `${this.baseUrl}/gerentesProyectosSolicInfraest/lista`,
      { params }
    );
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllInfrastructureRequestProjectManagersPag(page: number = 0, size: number = 10, idGerenteProyectoSolicInfraest?: number, keyword?: string, idSolicitudInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<GerentesProyectosSolicInfraestI[]> {
    let params = this.buildParams(idGerenteProyectoSolicInfraest, keyword, idSolicitudInfraestructura)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<{ content: GerentesProyectosSolicInfraestI[] }>(
      `${this.baseUrl}/gerentesProyectosSolicInfraest/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addInfrastructureRequestProjectManager(gerenteProyecto: GerentesProyectosSolicInfraestI): Observable<GerentesProyectosSolicInfraestMsj> {
    return this.http.post<GerentesProyectosSolicInfraestMsj>(
      `${this.baseUrl}/gerentesProyectosSolicInfraest`,
      gerenteProyecto
    );
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureRequestProjectManagerbyId(idGerenteProyectoSolicInfraest: number): Observable<ResponseGerenteProyectoSolicInfraestDTO> {
    return this.http.get<ResponseGerenteProyectoSolicInfraestDTO>(
      `${this.baseUrl}/gerentesProyectosSolicInfraest/${idGerenteProyectoSolicInfraest}`
    );
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureRequestProjectManager(gerenteProyecto: GerentesProyectosSolicInfraestI): Observable<GerentesProyectosSolicInfraestMsj> {
    return this.http.put<GerentesProyectosSolicInfraestMsj>(
      `${this.baseUrl}/gerentesProyectosSolicInfraest`,
      gerenteProyecto
    );
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureRequestProjectManager(idGerenteProyectoSolicInfraest: number): Observable<GerentesProyectosSolicInfraestMsj> {
    return this.http.delete<GerentesProyectosSolicInfraestMsj>(
      `${this.baseUrl}/gerentesProyectosSolicInfraest/${idGerenteProyectoSolicInfraest}`
    );
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA (MISMO ORDEN QUE EN EL CONTROLLER).
  private buildParams(idGerenteProyectoSolicInfraest?: number, keyword?: string, idSolicitudInfraestructura?: number): HttpParams {
    let params = new HttpParams();
    if (idGerenteProyectoSolicInfraest !== undefined) {
      params = params.set('idGerenteProyectoSolicInfraest', idGerenteProyectoSolicInfraest.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    if (idSolicitudInfraestructura !== undefined) {
      params = params.set('idSolicitudInfraestructura', idSolicitudInfraestructura.toString());
    }
    return params;
  }
}
