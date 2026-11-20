import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClasificacionesEquiposIngenierosI, ClasificacionesEquiposIngenierosMsj } from '../../../interfaces/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface';
import { ResponseClasificacionEquipoIngenieroDTO } from '../../../interfaces/dinco/clasificaciones-equipos-ingenieros/responseClasificacionEquipoIngenieroDTO.interface';

//SERVICE DE CLASIFICACIONES DE EQUIPOS DE INGENIEROS (CATÁLOGO DE DINCO; ENDPOINT /clasificacionesEquiposIngenieros).
@Injectable({
  providedIn: 'root'
})
export class ClasificacionesEquiposIngenierosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idClasificacionEquipoIngeniero?: number, keyword?: String): Observable<number> {
    let params = new HttpParams();
    if (idClasificacionEquipoIngeniero !== undefined) params = params.set('idClasificacionEquipoIngeniero', idClasificacionEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    return this.http.get<number>(`${this.baseUrl}/clasificacionesEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentClassifications(idClasificacionEquipoIngeniero?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<ClasificacionesEquiposIngenierosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idClasificacionEquipoIngeniero !== undefined) params = params.set('idClasificacionEquipoIngeniero', idClasificacionEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<ClasificacionesEquiposIngenierosI[]>(`${this.baseUrl}/clasificacionesEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentClassificationsPag(page: number = 0, size: number = 10, idClasificacionEquipoIngeniero?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<ClasificacionesEquiposIngenierosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idClasificacionEquipoIngeniero !== undefined) params = params.set('idClasificacionEquipoIngeniero', idClasificacionEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/clasificacionesEquiposIngenieros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as ClasificacionesEquiposIngenierosI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentClassification(registro: ClasificacionesEquiposIngenierosI): Observable<ClasificacionesEquiposIngenierosMsj> {
    return this.http.post<ClasificacionesEquiposIngenierosMsj>(`${this.baseUrl}/clasificacionesEquiposIngenieros`, registro);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentClassificationbyId(idClasificacionEquipoIngeniero: number): Observable<ResponseClasificacionEquipoIngenieroDTO> {
    return this.http.get<ResponseClasificacionEquipoIngenieroDTO>(`${this.baseUrl}/clasificacionesEquiposIngenieros/${idClasificacionEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getEngineerEquipmentClassificationbyNombre(nombreClasificacionEquipoIngeniero: String): Observable<ResponseClasificacionEquipoIngenieroDTO> {
    return this.http.get<ResponseClasificacionEquipoIngenieroDTO>(`${this.baseUrl}/clasificacionesEquiposIngenieros/nombre/${encodeURIComponent(nombreClasificacionEquipoIngeniero.toString())}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentClassification(registro: ClasificacionesEquiposIngenierosI): Observable<ClasificacionesEquiposIngenierosMsj> {
    return this.http.put<ClasificacionesEquiposIngenierosMsj>(`${this.baseUrl}/clasificacionesEquiposIngenieros`, registro);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentClassification(idClasificacionEquipoIngeniero: number): Observable<ClasificacionesEquiposIngenierosMsj> {
    return this.http.delete<ClasificacionesEquiposIngenierosMsj>(`${this.baseUrl}/clasificacionesEquiposIngenieros/${idClasificacionEquipoIngeniero}`);
  }

}
