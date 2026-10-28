import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CapitulosInfraestructurasI, CapitulosInfraestructurasMsj } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/activ-prod-infraest/capit-infraest/capitulos-infraestructuras.interface';
import { ResponseCapituloInfraestructuraDTO } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/activ-prod-infraest/capit-infraest/responseCapituloInfraestructuraDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CapitulosInfraestructurasService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //EL CONTROLLER NO TIENE CONTADOR NI FILTROS: SOLO ORDENA (EL BACKEND ORDENA SIEMPRE POR ID, SEGÚN orderMode).

  //LISTADO DE REGISTROS SIN PAGINACIÓN (PARA SELECTS).
  findAllInfrastructureChapters(orderBy: string = 'idCapituloInfraestructura', orderMode: string = 'ASC'): Observable<CapitulosInfraestructurasI[]> {
    const params = new HttpParams().set('orderBy', orderBy).set('orderMode', orderMode);
    return this.http.get<CapitulosInfraestructurasI[]>(`${this.baseUrl}/capitulosInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS CON PAGINACIÓN.
  findAllInfrastructureChaptersPag(page: number = 0, size: number = 10, orderBy: string = 'idCapituloInfraestructura', orderMode: string = 'ASC'): Observable<CapitulosInfraestructurasI[]> {
    const params = new HttpParams()
      .set('orderBy', orderBy)
      .set('orderMode', orderMode)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{ content: CapitulosInfraestructurasI[] }>(
      `${this.baseUrl}/capitulosInfraestructuras/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addInfrastructureChapter(capitulo: CapitulosInfraestructurasI): Observable<CapitulosInfraestructurasMsj> {
    return this.http.post<CapitulosInfraestructurasMsj>(`${this.baseUrl}/capitulosInfraestructuras`, capitulo);
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureChapterbyId(idCapituloInfraestructura: number): Observable<ResponseCapituloInfraestructuraDTO> {
    return this.http.get<ResponseCapituloInfraestructuraDTO>(`${this.baseUrl}/capitulosInfraestructuras/${idCapituloInfraestructura}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getInfrastructureChapterbyNombre(nombreCapituloInfraestructura: string): Observable<ResponseCapituloInfraestructuraDTO> {
    return this.http.get<ResponseCapituloInfraestructuraDTO>(`${this.baseUrl}/capitulosInfraestructuras/nombre/${encodeURIComponent(nombreCapituloInfraestructura)}`);
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureChapter(capitulo: CapitulosInfraestructurasI): Observable<CapitulosInfraestructurasMsj> {
    return this.http.put<CapitulosInfraestructurasMsj>(`${this.baseUrl}/capitulosInfraestructuras`, capitulo);
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureChapter(idCapituloInfraestructura: number): Observable<CapitulosInfraestructurasMsj> {
    return this.http.delete<CapitulosInfraestructurasMsj>(`${this.baseUrl}/capitulosInfraestructuras/${idCapituloInfraestructura}`);
  }
}
