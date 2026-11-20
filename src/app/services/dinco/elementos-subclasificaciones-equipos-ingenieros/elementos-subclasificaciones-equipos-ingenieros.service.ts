import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ElementosSubclasificacionesEquiposIngenierosI, ElementosSubclasificacionesEquiposIngenierosMsj } from '../../../interfaces/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface';
import { ResponseElementoSubclasificacionEquipoIngenieroDTO } from '../../../interfaces/dinco/elementos-subclasificaciones-equipos-ingenieros/responseElementoSubclasificacionEquipoIngenieroDTO.interface';

//SERVICE DE ELEMENTOS DE SUBCLASIFICACIONES DE EQUIPOS DE INGENIEROS (CATÁLOGO DE DINCO; ENDPOINT /elementosSubclasificacionesEquiposIngenieros).
@Injectable({
  providedIn: 'root'
})
export class ElementosSubclasificacionesEquiposIngenierosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idElementoSubclasificacionEquipoIngeniero?: number, keyword?: String, nombreElementoSubclasificacionEquipoIngeniero?: String): Observable<number> {
    let params = new HttpParams();
    if (idElementoSubclasificacionEquipoIngeniero !== undefined) params = params.set('idElementoSubclasificacionEquipoIngeniero', idElementoSubclasificacionEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero.toString());
    return this.http.get<number>(`${this.baseUrl}/elementosSubclasificacionesEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentSubclassificationElements(idElementoSubclasificacionEquipoIngeniero?: number, keyword?: String, nombreElementoSubclasificacionEquipoIngeniero?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<ElementosSubclasificacionesEquiposIngenierosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idElementoSubclasificacionEquipoIngeniero !== undefined) params = params.set('idElementoSubclasificacionEquipoIngeniero', idElementoSubclasificacionEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<ElementosSubclasificacionesEquiposIngenierosI[]>(`${this.baseUrl}/elementosSubclasificacionesEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentSubclassificationElementsPag(page: number = 0, size: number = 10, idElementoSubclasificacionEquipoIngeniero?: number, keyword?: String, nombreElementoSubclasificacionEquipoIngeniero?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<ElementosSubclasificacionesEquiposIngenierosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idElementoSubclasificacionEquipoIngeniero !== undefined) params = params.set('idElementoSubclasificacionEquipoIngeniero', idElementoSubclasificacionEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/elementosSubclasificacionesEquiposIngenieros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as ElementosSubclasificacionesEquiposIngenierosI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentSubclassificationElement(registro: ElementosSubclasificacionesEquiposIngenierosI): Observable<ElementosSubclasificacionesEquiposIngenierosMsj> {
    return this.http.post<ElementosSubclasificacionesEquiposIngenierosMsj>(`${this.baseUrl}/elementosSubclasificacionesEquiposIngenieros`, registro);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentSubclassificationElementbyId(idElementoSubclasificacionEquipoIngeniero: number): Observable<ResponseElementoSubclasificacionEquipoIngenieroDTO> {
    return this.http.get<ResponseElementoSubclasificacionEquipoIngenieroDTO>(`${this.baseUrl}/elementosSubclasificacionesEquiposIngenieros/${idElementoSubclasificacionEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NOMBRES COMBINADOS (VALIDAR REPETIDOS).
  getEngineerEquipmentSubclassificationElementbyNombres(nombreElementoSubclasificacionEquipoIngeniero: String, nombreClasificacionEquipoIngeniero: String, nombreSubclasificacionEquipoIngeniero: String, nombreCuentaEquipoIngeniero: String, nombreClaseActivoEquipoIngeniero: String): Observable<ResponseElementoSubclasificacionEquipoIngenieroDTO> {
    return this.http.get<ResponseElementoSubclasificacionEquipoIngenieroDTO>(`${this.baseUrl}/elementosSubclasificacionesEquiposIngenieros/elementoSubclasificacionEquipoIngeniero/${encodeURIComponent(nombreElementoSubclasificacionEquipoIngeniero.toString())}/${encodeURIComponent(nombreClasificacionEquipoIngeniero.toString())}/${encodeURIComponent(nombreSubclasificacionEquipoIngeniero.toString())}/${encodeURIComponent(nombreCuentaEquipoIngeniero.toString())}/${encodeURIComponent(nombreClaseActivoEquipoIngeniero.toString())}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentSubclassificationElement(registro: ElementosSubclasificacionesEquiposIngenierosI): Observable<ElementosSubclasificacionesEquiposIngenierosMsj> {
    return this.http.put<ElementosSubclasificacionesEquiposIngenierosMsj>(`${this.baseUrl}/elementosSubclasificacionesEquiposIngenieros`, registro);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentSubclassificationElement(idElementoSubclasificacionEquipoIngeniero: number): Observable<ElementosSubclasificacionesEquiposIngenierosMsj> {
    return this.http.delete<ElementosSubclasificacionesEquiposIngenierosMsj>(`${this.baseUrl}/elementosSubclasificacionesEquiposIngenieros/${idElementoSubclasificacionEquipoIngeniero}`);
  }

}
