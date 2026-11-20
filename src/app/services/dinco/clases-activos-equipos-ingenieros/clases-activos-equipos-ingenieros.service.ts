import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClasesActivosEquiposIngenierosI, ClasesActivosEquiposIngenierosMsj } from '../../../interfaces/dinco/clases-activos-equipos-ingenieros/clases-activos-equipos-ingenieros.interface';
import { ResponseClaseActivoEquipoIngenieroDTO } from '../../../interfaces/dinco/clases-activos-equipos-ingenieros/responseClaseActivoEquipoIngenieroDTO.interface';

//SERVICE DE CLASES DE ACTIVOS DE EQUIPOS DE INGENIEROS (CATÁLOGO DE DINCO; ENDPOINT /clasesActivosEquiposIngenieros).
@Injectable({
  providedIn: 'root'
})
export class ClasesActivosEquiposIngenierosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idClaseActivoEquipoIngeniero?: number, keyword?: String, nombreClaseActivoEquipoIngeniero?: String): Observable<number> {
    let params = new HttpParams();
    if (idClaseActivoEquipoIngeniero !== undefined) params = params.set('idClaseActivoEquipoIngeniero', idClaseActivoEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreClaseActivoEquipoIngeniero) params = params.set('nombreClaseActivoEquipoIngeniero', nombreClaseActivoEquipoIngeniero.toString());
    return this.http.get<number>(`${this.baseUrl}/clasesActivosEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentAssetClasses(idClaseActivoEquipoIngeniero?: number, keyword?: String, nombreClaseActivoEquipoIngeniero?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<ClasesActivosEquiposIngenierosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idClaseActivoEquipoIngeniero !== undefined) params = params.set('idClaseActivoEquipoIngeniero', idClaseActivoEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreClaseActivoEquipoIngeniero) params = params.set('nombreClaseActivoEquipoIngeniero', nombreClaseActivoEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<ClasesActivosEquiposIngenierosI[]>(`${this.baseUrl}/clasesActivosEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentAssetClassesPag(page: number = 0, size: number = 10, idClaseActivoEquipoIngeniero?: number, keyword?: String, nombreClaseActivoEquipoIngeniero?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<ClasesActivosEquiposIngenierosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idClaseActivoEquipoIngeniero !== undefined) params = params.set('idClaseActivoEquipoIngeniero', idClaseActivoEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreClaseActivoEquipoIngeniero) params = params.set('nombreClaseActivoEquipoIngeniero', nombreClaseActivoEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/clasesActivosEquiposIngenieros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as ClasesActivosEquiposIngenierosI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentAssetClass(registro: ClasesActivosEquiposIngenierosI): Observable<ClasesActivosEquiposIngenierosMsj> {
    return this.http.post<ClasesActivosEquiposIngenierosMsj>(`${this.baseUrl}/clasesActivosEquiposIngenieros`, registro);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentAssetClassbyId(idClaseActivoEquipoIngeniero: number): Observable<ResponseClaseActivoEquipoIngenieroDTO> {
    return this.http.get<ResponseClaseActivoEquipoIngenieroDTO>(`${this.baseUrl}/clasesActivosEquiposIngenieros/${idClaseActivoEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getEngineerEquipmentAssetClassbyNombre(nombreClaseActivoEquipoIngeniero: String): Observable<ResponseClaseActivoEquipoIngenieroDTO> {
    return this.http.get<ResponseClaseActivoEquipoIngenieroDTO>(`${this.baseUrl}/clasesActivosEquiposIngenieros/nombre/${encodeURIComponent(nombreClaseActivoEquipoIngeniero.toString())}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO.
  getEngineerEquipmentAssetClassbyNumero(numeroClaseActivoEquipoIngeniero: String): Observable<ResponseClaseActivoEquipoIngenieroDTO> {
    return this.http.get<ResponseClaseActivoEquipoIngenieroDTO>(`${this.baseUrl}/clasesActivosEquiposIngenieros/numero/${encodeURIComponent(numeroClaseActivoEquipoIngeniero.toString())}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentAssetClass(registro: ClasesActivosEquiposIngenierosI): Observable<ClasesActivosEquiposIngenierosMsj> {
    return this.http.put<ClasesActivosEquiposIngenierosMsj>(`${this.baseUrl}/clasesActivosEquiposIngenieros`, registro);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentAssetClass(idClaseActivoEquipoIngeniero: number): Observable<ClasesActivosEquiposIngenierosMsj> {
    return this.http.delete<ClasesActivosEquiposIngenierosMsj>(`${this.baseUrl}/clasesActivosEquiposIngenieros/${idClaseActivoEquipoIngeniero}`);
  }

}
