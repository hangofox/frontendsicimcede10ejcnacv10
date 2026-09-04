import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseInfraestructuraDTO } from '../../../interfaces/digei/infraestructuras/responseInfraestructuraDTO.interface';
import { InfraestructurasI, InfraestructurasMsj } from '../../../interfaces/digei/infraestructuras/infraestructuras.interface';

@Injectable({
  providedIn: 'root'
})
export class InfraestructurasService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    let params = new HttpParams();
    if (idInfraestructura !== undefined) params = params.set('idInfraestructura', idInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/infraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllInfraestructuras(idInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<InfraestructurasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idInfraestructura !== undefined) params = params.set('idInfraestructura', idInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<InfraestructurasI[]>(`${this.baseUrl}/infraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllInfraestructurasPag(page: number = 0, size: number = 10, idInfraestructura?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<InfraestructurasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idInfraestructura !== undefined) params = params.set('idInfraestructura', idInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/infraestructuras/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as InfraestructurasI[])
    );
  }

  //CREAR REGISTRO.
  addInfraestructura(infraestructura: InfraestructurasI): Observable<InfraestructurasMsj> {
    return this.http.post<InfraestructurasMsj>(`${this.baseUrl}/infraestructuras`, infraestructura);
  }

  //CONSULTAR REGISTRO POR ID.
  getInfraestructurabyId(idInfraestructura: number): Observable<ResponseInfraestructuraDTO> {
    return this.http.get<ResponseInfraestructuraDTO>(`${this.baseUrl}/infraestructuras/${idInfraestructura}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE INVENTARIO Y NÚMERO DE ACTIVO FIJO.
  getInfraestructurabyNumeroInventarioNumeroActivoFijo(numeroInventarioInfraestructura: string, numeroActivoFijoInfraestructura: string): Observable<ResponseInfraestructuraDTO> {
    return this.http.get<ResponseInfraestructuraDTO>(`${this.baseUrl}/infraestructuras/numeroInventario/${numeroInventarioInfraestructura}/numeroActivoFijo/${numeroActivoFijoInfraestructura}`);
  }

  //MODIFICAR REGISTRO.
  updateInfraestructura(infraestructura: InfraestructurasI): Observable<InfraestructurasMsj> {
    return this.http.put<InfraestructurasMsj>(`${this.baseUrl}/infraestructuras`, infraestructura);
  }

  //ELIMINAR REGISTRO.
  deleteInfraestructura(idInfraestructura: number): Observable<InfraestructurasMsj> {
    return this.http.delete<InfraestructurasMsj>(`${this.baseUrl}/infraestructuras/${idInfraestructura}`);
  }

}
