import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LineasEquiposIngenierosI, LineasEquiposIngenierosMsj } from '../../../interfaces/dinco/lineas-equipos-ingenieros/lineas-equipos-ingenieros.interface';
import { ResponseLineaEquipoIngenieroDTO } from '../../../interfaces/dinco/lineas-equipos-ingenieros/responseLineaEquipoIngenieroDTO.interface';

//SERVICE DE LÍNEAS DE EQUIPOS DE INGENIEROS (CATÁLOGO DE DINCO; ENDPOINT /lineasEquiposIngenieros).
@Injectable({
  providedIn: 'root'
})
export class LineasEquiposIngenierosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idLineaEquipoIngeniero?: number, keyword?: String): Observable<number> {
    let params = new HttpParams();
    if (idLineaEquipoIngeniero !== undefined) params = params.set('idLineaEquipoIngeniero', idLineaEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    return this.http.get<number>(`${this.baseUrl}/lineasEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentLines(idLineaEquipoIngeniero?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<LineasEquiposIngenierosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idLineaEquipoIngeniero !== undefined) params = params.set('idLineaEquipoIngeniero', idLineaEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<LineasEquiposIngenierosI[]>(`${this.baseUrl}/lineasEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentLinesPag(page: number = 0, size: number = 10, idLineaEquipoIngeniero?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<LineasEquiposIngenierosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idLineaEquipoIngeniero !== undefined) params = params.set('idLineaEquipoIngeniero', idLineaEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/lineasEquiposIngenieros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as LineasEquiposIngenierosI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentLine(registro: LineasEquiposIngenierosI): Observable<LineasEquiposIngenierosMsj> {
    return this.http.post<LineasEquiposIngenierosMsj>(`${this.baseUrl}/lineasEquiposIngenieros`, registro);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentLinebyId(idLineaEquipoIngeniero: number): Observable<ResponseLineaEquipoIngenieroDTO> {
    return this.http.get<ResponseLineaEquipoIngenieroDTO>(`${this.baseUrl}/lineasEquiposIngenieros/${idLineaEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getEngineerEquipmentLinebyNombre(nombreLineaEquipoIngeniero: String): Observable<ResponseLineaEquipoIngenieroDTO> {
    return this.http.get<ResponseLineaEquipoIngenieroDTO>(`${this.baseUrl}/lineasEquiposIngenieros/nombre/${encodeURIComponent(nombreLineaEquipoIngeniero.toString())}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentLine(registro: LineasEquiposIngenierosI): Observable<LineasEquiposIngenierosMsj> {
    return this.http.put<LineasEquiposIngenierosMsj>(`${this.baseUrl}/lineasEquiposIngenieros`, registro);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentLine(idLineaEquipoIngeniero: number): Observable<LineasEquiposIngenierosMsj> {
    return this.http.delete<LineasEquiposIngenierosMsj>(`${this.baseUrl}/lineasEquiposIngenieros/${idLineaEquipoIngeniero}`);
  }

}
