import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposMantenimientosInfraestructurasI } from '../../../../interfaces/digei/mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras.interface';

//CATÁLOGO DE TIPOS DE MANTENIMIENTO DE INFRAESTRUCTURA (TipoMantenimientoInfraestructuraController): SOLO LAS CONSULTAS QUE USAN LOS
//COMBOS Y EL SEMÁFORO DEL HISTORIAL DE MANTENIMIENTOS DE INFRAESTRUCTURAS.
@Injectable({
  providedIn: 'root'
})
export class TiposMantenimientosInfraestructurasService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoMantenimientoInfraestructura?: number, keyword?: string): Observable<number> {
    const params = this.buildParams(idTipoMantenimientoInfraestructura, keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposMantenimientosInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTypesOfInfrastructureMaintenance(idTipoMantenimientoInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposMantenimientosInfraestructurasI[]> {
    let params = this.buildParams(idTipoMantenimientoInfraestructura, keyword).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposMantenimientosInfraestructurasI[]>(`${this.baseUrl}/tiposMantenimientosInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfInfrastructureMaintenancePag(page: number = 0, size: number = 10, idTipoMantenimientoInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposMantenimientosInfraestructurasI[]> {
    let params = this.buildParams(idTipoMantenimientoInfraestructura, keyword)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: TiposMantenimientosInfraestructurasI[] }>(
      `${this.baseUrl}/tiposMantenimientosInfraestructuras/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA.
  private buildParams(idTipoMantenimientoInfraestructura?: number, keyword?: string): HttpParams {
    let params = new HttpParams();
    if (idTipoMantenimientoInfraestructura !== undefined) {
      params = params.set('idTipoMantenimientoInfraestructura', idTipoMantenimientoInfraestructura.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    return params;
  }
}
