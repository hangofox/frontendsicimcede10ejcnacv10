import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseEquipoIngenieroDTO } from '../../interfaces/equipos-ingenieros/responseEquipoIngenieroDTO.interface';
import { EquiposIngenierosI, EquiposIngenierosMsj } from '../../interfaces/equipos-ingenieros/equipos-ingenieros.interface';

@Injectable({
  providedIn: 'root'
})
export class EquiposIngenierosService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idEquipoIngeniero?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, nombreClasificacionEquipoIngeniero?: string, nombreSubclasificacionEquipoIngeniero?: string, nombreElementoSubclasificacionEquipoIngeniero?: string, estado?: string): Observable<number> {
    let params = new HttpParams();
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero);
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero);
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero);
    if (estado) params = params.set('estado', estado);
    return this.http.get<number>(`${this.baseUrl}/equiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipments(idEquipoIngeniero?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, nombreClasificacionEquipoIngeniero?: string, nombreSubclasificacionEquipoIngeniero?: string, nombreElementoSubclasificacionEquipoIngeniero?: string, estado?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<EquiposIngenierosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero);
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero);
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero);
    if (estado) params = params.set('estado', estado);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<EquiposIngenierosI[]>(`${this.baseUrl}/equiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentsPag(page: number = 0, size: number = 10, idEquipoIngeniero?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, nombreClasificacionEquipoIngeniero?: string, nombreSubclasificacionEquipoIngeniero?: string, nombreElementoSubclasificacionEquipoIngeniero?: string, estado?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<EquiposIngenierosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (nombreClasificacionEquipoIngeniero) params = params.set('nombreClasificacionEquipoIngeniero', nombreClasificacionEquipoIngeniero);
    if (nombreSubclasificacionEquipoIngeniero) params = params.set('nombreSubclasificacionEquipoIngeniero', nombreSubclasificacionEquipoIngeniero);
    if (nombreElementoSubclasificacionEquipoIngeniero) params = params.set('nombreElementoSubclasificacionEquipoIngeniero', nombreElementoSubclasificacionEquipoIngeniero);
    if (estado) params = params.set('estado', estado);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/equiposIngenieros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as EquiposIngenierosI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipment(equipoIngeniero: EquiposIngenierosI): Observable<EquiposIngenierosMsj> {
    return this.http.post<EquiposIngenierosMsj>(`${this.baseUrl}/equiposIngenieros`, equipoIngeniero);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentbyId(idEquipoIngeniero: number): Observable<ResponseEquipoIngenieroDTO> {
    return this.http.get<ResponseEquipoIngenieroDTO>(`${this.baseUrl}/equiposIngenieros/${idEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE INVENTARIO Y NÚMERO DE ACTIVO FIJO.
  getEngineerEquipmentbyNumeroInventarioNumeroActivoFijo(numeroInventarioEquipoIngeniero: string, numeroActivoFijoEquipoIngeniero: string): Observable<ResponseEquipoIngenieroDTO> {
    return this.http.get<ResponseEquipoIngenieroDTO>(`${this.baseUrl}/equiposIngenieros/numeroInventario/${numeroInventarioEquipoIngeniero}/numeroActivoFijo/${numeroActivoFijoEquipoIngeniero}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipment(equipoIngeniero: EquiposIngenierosI): Observable<EquiposIngenierosMsj> {
    return this.http.put<EquiposIngenierosMsj>(`${this.baseUrl}/equiposIngenieros`, equipoIngeniero);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipment(idEquipoIngeniero: number): Observable<EquiposIngenierosMsj> {
    return this.http.delete<EquiposIngenierosMsj>(`${this.baseUrl}/equiposIngenieros/${idEquipoIngeniero}`);
  }

}
