import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActividadesProductosInfraestructurasI, ActividadesProductosInfraestructurasMsj } from '../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/activ-prod-infraest/actividades-productos-infraestructuras.interface';
import { ResponseActividadProductoInfraestructuraDTO } from '../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/activ-prod-infraest/responseActividadProductoInfraestructuraDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class ActividadesProductosInfraestructurasService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idActividadProductoInfraestructura?: number, keyword?: string, nombreCapituloInfraestructura?: string): Observable<number> {
    const params = this.buildParams(idActividadProductoInfraestructura, keyword, nombreCapituloInfraestructura);
    return this.http.get<number>(`${this.baseUrl}/actividadesProductosInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN (PARA SELECTS).
  findAllInfrastructureProductActivities(idActividadProductoInfraestructura?: number, keyword?: string, nombreCapituloInfraestructura?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ActividadesProductosInfraestructurasI[]> {
    let params = this.buildParams(idActividadProductoInfraestructura, keyword, nombreCapituloInfraestructura).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<ActividadesProductosInfraestructurasI[]>(`${this.baseUrl}/actividadesProductosInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllInfrastructureProductActivitiesPag(page: number = 0, size: number = 10, idActividadProductoInfraestructura?: number, keyword?: string, nombreCapituloInfraestructura?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ActividadesProductosInfraestructurasI[]> {
    let params = this.buildParams(idActividadProductoInfraestructura, keyword, nombreCapituloInfraestructura)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: ActividadesProductosInfraestructurasI[] }>(
      `${this.baseUrl}/actividadesProductosInfraestructuras/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addInfrastructureProductActivity(actividad: ActividadesProductosInfraestructurasI): Observable<ActividadesProductosInfraestructurasMsj> {
    return this.http.post<ActividadesProductosInfraestructurasMsj>(`${this.baseUrl}/actividadesProductosInfraestructuras`, actividad);
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureProductActivitybyId(idActividadProductoInfraestructura: number): Observable<ResponseActividadProductoInfraestructuraDTO> {
    return this.http.get<ResponseActividadProductoInfraestructuraDTO>(`${this.baseUrl}/actividadesProductosInfraestructuras/${idActividadProductoInfraestructura}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE DE LA ACTIVIDAD Y NOMBRE DEL CAPÍTULO.
  getInfrastructureProductActivitybyNombre(nombreActividadProductoInfraestructura: string, nombreCapituloInfraestructura: string): Observable<ResponseActividadProductoInfraestructuraDTO> {
    return this.http.get<ResponseActividadProductoInfraestructuraDTO>(
      `${this.baseUrl}/actividadesProductosInfraestructuras/nombre/${encodeURIComponent(nombreActividadProductoInfraestructura)}/capituloProductoInfraestructura/${encodeURIComponent(nombreCapituloInfraestructura)}`
    );
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureProductActivity(actividad: ActividadesProductosInfraestructurasI): Observable<ActividadesProductosInfraestructurasMsj> {
    return this.http.put<ActividadesProductosInfraestructurasMsj>(`${this.baseUrl}/actividadesProductosInfraestructuras`, actividad);
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureProductActivity(idActividadProductoInfraestructura: number): Observable<ActividadesProductosInfraestructurasMsj> {
    return this.http.delete<ActividadesProductosInfraestructurasMsj>(`${this.baseUrl}/actividadesProductosInfraestructuras/${idActividadProductoInfraestructura}`);
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA (MISMO ORDEN QUE EN EL CONTROLLER).
  private buildParams(idActividadProductoInfraestructura?: number, keyword?: string, nombreCapituloInfraestructura?: string): HttpParams {
    let params = new HttpParams();
    if (idActividadProductoInfraestructura !== undefined) {
      params = params.set('idActividadProductoInfraestructura', idActividadProductoInfraestructura.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    if (nombreCapituloInfraestructura) params = params.set('nombreCapituloInfraestructura', nombreCapituloInfraestructura);
    return params;
  }
}
