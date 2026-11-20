import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubclasificacionesEquiposIngenierosI, SubclasificacionesEquiposIngenierosMsj } from '../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface';
import { ResponseSubclasificacionEquipoIngenieroDTO } from '../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/responseSubclasificacionEquipoIngenieroDTO.interface';

//SERVICE DE SUBCLASIFICACIONES DE EQUIPOS DE INGENIEROS (CATÁLOGO DE DINCO; ENDPOINT /subclasificacionesEquiposIngenieros).
@Injectable({
  providedIn: 'root'
})
export class SubclasificacionesEquiposIngenierosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idSubclasificacionEquipoIngeniero?: number, keyword?: String, nombreSubclasificacionEquipoIngeniero?: String): Observable<number> {
    let params = new HttpParams();
    if (idSubclasificacionEquipoIngeniero !== undefined) params = params.set('idSubclasificacionEquipoIngeniero', idSubclasificacionEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero.toString());
    return this.http.get<number>(`${this.baseUrl}/subclasificacionesEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentSubclassifications(idSubclasificacionEquipoIngeniero?: number, keyword?: String, nombreSubclasificacionEquipoIngeniero?: String, nombreClasificacionEquipoIngeniero?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<SubclasificacionesEquiposIngenierosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idSubclasificacionEquipoIngeniero !== undefined) params = params.set('idSubclasificacionEquipoIngeniero', idSubclasificacionEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero.toString());
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<SubclasificacionesEquiposIngenierosI[]>(`${this.baseUrl}/subclasificacionesEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentSubclassificationsPag(page: number = 0, size: number = 10, idSubclasificacionEquipoIngeniero?: number, keyword?: String, nombreSubclasificacionEquipoIngeniero?: String, nombreClasificacionEquipoIngeniero?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<SubclasificacionesEquiposIngenierosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idSubclasificacionEquipoIngeniero !== undefined) params = params.set('idSubclasificacionEquipoIngeniero', idSubclasificacionEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero.toString());
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/subclasificacionesEquiposIngenieros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as SubclasificacionesEquiposIngenierosI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentSubclassification(registro: SubclasificacionesEquiposIngenierosI): Observable<SubclasificacionesEquiposIngenierosMsj> {
    return this.http.post<SubclasificacionesEquiposIngenierosMsj>(`${this.baseUrl}/subclasificacionesEquiposIngenieros`, registro);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentSubclassificationbyId(idSubclasificacionEquipoIngeniero: number): Observable<ResponseSubclasificacionEquipoIngenieroDTO> {
    return this.http.get<ResponseSubclasificacionEquipoIngenieroDTO>(`${this.baseUrl}/subclasificacionesEquiposIngenieros/${idSubclasificacionEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NOMBRES COMBINADOS (VALIDAR REPETIDOS).
  getEngineerEquipmentSubclassificationbyNombres(nombreSubclasificacionEquipoIngeniero: String, nombreClasificacionEquipoIngeniero: String): Observable<ResponseSubclasificacionEquipoIngenieroDTO> {
    return this.http.get<ResponseSubclasificacionEquipoIngenieroDTO>(`${this.baseUrl}/subclasificacionesEquiposIngenieros/subclasificacionEquipoIngeniero/${encodeURIComponent(nombreSubclasificacionEquipoIngeniero.toString())}/${encodeURIComponent(nombreClasificacionEquipoIngeniero.toString())}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentSubclassification(registro: SubclasificacionesEquiposIngenierosI): Observable<SubclasificacionesEquiposIngenierosMsj> {
    return this.http.put<SubclasificacionesEquiposIngenierosMsj>(`${this.baseUrl}/subclasificacionesEquiposIngenieros`, registro);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentSubclassification(idSubclasificacionEquipoIngeniero: number): Observable<SubclasificacionesEquiposIngenierosMsj> {
    return this.http.delete<SubclasificacionesEquiposIngenierosMsj>(`${this.baseUrl}/subclasificacionesEquiposIngenieros/${idSubclasificacionEquipoIngeniero}`);
  }

}
