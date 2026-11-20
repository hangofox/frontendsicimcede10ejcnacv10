import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TiposAltasEquiposIngenierosI, TiposAltasEquiposIngenierosMsj } from '../../../interfaces/dinco/tipos-altas-equipos-ingenieros/tipos-altas-equipos-ingenieros.interface';
import { ResponseTipoAltaEquipoIngenieroDTO } from '../../../interfaces/dinco/tipos-altas-equipos-ingenieros/responseTipoAltaEquipoIngenieroDTO.interface';

//SERVICE DE TIPOS DE ALTAS DE EQUIPOS DE INGENIEROS (CATÁLOGO DE DINCO; ENDPOINT /tiposAltasEquiposIngenieros).
@Injectable({
  providedIn: 'root'
})
export class TiposAltasEquiposIngenierosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoAltaEquipoIngeniero?: number, keyword?: String): Observable<number> {
    let params = new HttpParams();
    if (idTipoAltaEquipoIngeniero !== undefined) params = params.set('idTipoAltaEquipoIngeniero', idTipoAltaEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    return this.http.get<number>(`${this.baseUrl}/tiposAltasEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentRegistrationTypes(idTipoAltaEquipoIngeniero?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<TiposAltasEquiposIngenierosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idTipoAltaEquipoIngeniero !== undefined) params = params.set('idTipoAltaEquipoIngeniero', idTipoAltaEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<TiposAltasEquiposIngenierosI[]>(`${this.baseUrl}/tiposAltasEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentRegistrationTypesPag(page: number = 0, size: number = 10, idTipoAltaEquipoIngeniero?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<TiposAltasEquiposIngenierosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idTipoAltaEquipoIngeniero !== undefined) params = params.set('idTipoAltaEquipoIngeniero', idTipoAltaEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/tiposAltasEquiposIngenieros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposAltasEquiposIngenierosI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentRegistrationType(registro: TiposAltasEquiposIngenierosI): Observable<TiposAltasEquiposIngenierosMsj> {
    return this.http.post<TiposAltasEquiposIngenierosMsj>(`${this.baseUrl}/tiposAltasEquiposIngenieros`, registro);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentRegistrationTypebyId(idTipoAltaEquipoIngeniero: number): Observable<ResponseTipoAltaEquipoIngenieroDTO> {
    return this.http.get<ResponseTipoAltaEquipoIngenieroDTO>(`${this.baseUrl}/tiposAltasEquiposIngenieros/${idTipoAltaEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getEngineerEquipmentRegistrationTypebyNombre(nombreTipoAltaEquipoIngeniero: String): Observable<ResponseTipoAltaEquipoIngenieroDTO> {
    return this.http.get<ResponseTipoAltaEquipoIngenieroDTO>(`${this.baseUrl}/tiposAltasEquiposIngenieros/nombre/${encodeURIComponent(nombreTipoAltaEquipoIngeniero.toString())}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentRegistrationType(registro: TiposAltasEquiposIngenierosI): Observable<TiposAltasEquiposIngenierosMsj> {
    return this.http.put<TiposAltasEquiposIngenierosMsj>(`${this.baseUrl}/tiposAltasEquiposIngenieros`, registro);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentRegistrationType(idTipoAltaEquipoIngeniero: number): Observable<TiposAltasEquiposIngenierosMsj> {
    return this.http.delete<TiposAltasEquiposIngenierosMsj>(`${this.baseUrl}/tiposAltasEquiposIngenieros/${idTipoAltaEquipoIngeniero}`);
  }

}
