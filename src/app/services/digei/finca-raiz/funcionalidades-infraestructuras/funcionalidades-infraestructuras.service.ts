import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseFuncionalidadInfraestructuraDTO } from '../../../../interfaces/digei/finca-raiz/funcionalidades-infraestructuras/responseFuncionalidadInfraestructuraDTO.interface';
import { FuncionalidadesInfraestructurasI, FuncionalidadesInfraestructurasMsj } from '../../../../interfaces/digei/finca-raiz/funcionalidades-infraestructuras/funcionalidades-infraestructuras.interface';

@Injectable({
  providedIn: 'root'
})
export class FuncionalidadesInfraestructurasService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //LISTADO DE REGISTROS SIN PAGINACIÓN.
  findAllInfrastructureFunctionalities(orderBy?: string, orderMode: string = 'ASC'): Observable<FuncionalidadesInfraestructurasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<FuncionalidadesInfraestructurasI[]>(`${this.baseUrl}/funcionalidadesInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS CON PAGINACIÓN.
  findAllInfrastructureFunctionalitiesPag(page: number = 0, size: number = 10, orderBy?: string, orderMode: string = 'ASC'): Observable<FuncionalidadesInfraestructurasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/funcionalidadesInfraestructuras/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as FuncionalidadesInfraestructurasI[])
    );
  }

  //CREAR REGISTRO.
  addInfrastructureFunctionality(funcionalidadInfraestructura: FuncionalidadesInfraestructurasI): Observable<FuncionalidadesInfraestructurasMsj> {
    return this.http.post<FuncionalidadesInfraestructurasMsj>(`${this.baseUrl}/funcionalidadesInfraestructuras`, funcionalidadInfraestructura);
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureFunctionalitybyId(idFuncionalidadInfraestructura: number): Observable<ResponseFuncionalidadInfraestructuraDTO> {
    return this.http.get<ResponseFuncionalidadInfraestructuraDTO>(`${this.baseUrl}/funcionalidadesInfraestructuras/${idFuncionalidadInfraestructura}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getInfrastructureFunctionalitybyNombre(nombreFuncionalidadInfraestructura: string): Observable<ResponseFuncionalidadInfraestructuraDTO> {
    return this.http.get<ResponseFuncionalidadInfraestructuraDTO>(`${this.baseUrl}/funcionalidadesInfraestructuras/nombre/${nombreFuncionalidadInfraestructura}`);
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureFunctionality(funcionalidadInfraestructura: FuncionalidadesInfraestructurasI): Observable<FuncionalidadesInfraestructurasMsj> {
    return this.http.put<FuncionalidadesInfraestructurasMsj>(`${this.baseUrl}/funcionalidadesInfraestructura`, funcionalidadInfraestructura);
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureFunctionality(idFuncionalidadInfraestructura: number): Observable<FuncionalidadesInfraestructurasMsj> {
    return this.http.delete<FuncionalidadesInfraestructurasMsj>(`${this.baseUrl}/funcionalidadesInfraestructuras/${idFuncionalidadInfraestructura}`);
  }

}
