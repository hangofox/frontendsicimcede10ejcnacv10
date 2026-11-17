import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistorialMantenimientosInfraestI, HistorialMantenimientosInfraestMsj } from '../../../../interfaces/digei/mantenimientos-infraestructuras/historial-mantenimientos-infraest/historial-mantenimientos-infraest.interface';
import { ResponseHistorialMantenimientoInfraestructuraDTO } from '../../../../interfaces/digei/mantenimientos-infraestructuras/historial-mantenimientos-infraest/responseHistorialMantenimientoInfraestructuraDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialMantenimientosInfraestService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialMantenimientoInfraestructura?: number, keyword?: string): Observable<number> {
    const params = this.buildParams(idHistorialMantenimientoInfraestructura, keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesMantenimientosInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllInfrastructureMaintenanceHistories(idHistorialMantenimientoInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialMantenimientosInfraestI[]> {
    let params = this.buildParams(idHistorialMantenimientoInfraestructura, keyword)
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<HistorialMantenimientosInfraestI[]>(
      `${this.baseUrl}/historialesMantenimientosInfraestructuras/lista`,
      { params }
    );
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllInfrastructureMaintenanceHistoriesPag(page: number = 0, size: number = 10, idHistorialMantenimientoInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialMantenimientosInfraestI[]> {
    let params = this.buildParams(idHistorialMantenimientoInfraestructura, keyword)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);

    return this.http.get<{ content: HistorialMantenimientosInfraestI[] }>(
      `${this.baseUrl}/historialesMantenimientosInfraestructuras/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addInfrastructureMaintenanceHistory(historial: HistorialMantenimientosInfraestI): Observable<HistorialMantenimientosInfraestMsj> {
    return this.http.post<HistorialMantenimientosInfraestMsj>(
      `${this.baseUrl}/historialesMantenimientosInfraestructuras`,
      historial
    );
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureMaintenanceHistorybyId(idHistorialMantenimientoInfraestructura: number): Observable<ResponseHistorialMantenimientoInfraestructuraDTO> {
    return this.http.get<ResponseHistorialMantenimientoInfraestructuraDTO>(
      `${this.baseUrl}/historialesMantenimientosInfraestructuras/${idHistorialMantenimientoInfraestructura}`
    );
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO (EL CONTROLADOR LO RECIBE COMO QUERY PARAM EN /numReg).
  getInfrastructureMaintenanceHistorybyNumeroRegistro(numRegHistorialMantenimientoInfraestructura: string): Observable<ResponseHistorialMantenimientoInfraestructuraDTO> {
    const params = new HttpParams().set('numRegHistorialMantenimientoInfraestructura', numRegHistorialMantenimientoInfraestructura);
    return this.http.get<ResponseHistorialMantenimientoInfraestructuraDTO>(
      `${this.baseUrl}/historialesMantenimientosInfraestructuras/numReg`,
      { params }
    );
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureMaintenanceHistory(historial: HistorialMantenimientosInfraestI): Observable<HistorialMantenimientosInfraestMsj> {
    return this.http.put<HistorialMantenimientosInfraestMsj>(
      `${this.baseUrl}/historialesMantenimientosInfraestructuras`,
      historial
    );
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureMaintenanceHistory(idHistorialMantenimientoInfraestructura: number): Observable<HistorialMantenimientosInfraestMsj> {
    return this.http.delete<HistorialMantenimientosInfraestMsj>(
      `${this.baseUrl}/historialesMantenimientosInfraestructuras/${idHistorialMantenimientoInfraestructura}`
    );
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA.
  private buildParams(idHistorialMantenimientoInfraestructura?: number, keyword?: string): HttpParams {
    let params = new HttpParams();
    if (idHistorialMantenimientoInfraestructura !== undefined) {
      params = params.set('idHistorialMantenimientoInfraestructura', idHistorialMantenimientoInfraestructura.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    return params;
  }
}
