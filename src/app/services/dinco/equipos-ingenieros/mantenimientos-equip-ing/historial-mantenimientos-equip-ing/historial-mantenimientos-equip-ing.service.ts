import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistorialMantenimientosEquipIngI, HistorialMantenimientosEquipIngMsj } from '../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/historial-mantenimientos-equip-ing/historial-mantenimientos-equip-ing.interface';
import { ResponseHistorialMantenimientoEquipoIngenieroDTO } from '../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/historial-mantenimientos-equip-ing/responseHistorialMantenimientoEquipoIngenieroDTO.interface';

//SERVICE DEL HISTORIAL DE MANTENIMIENTOS DE EQUIPOS DE INGENIEROS (HistorialMantenimientoEquipoIngenieroController; ENDPOINT
///historialesMantenimientosEquiposIngenieros). EL BACKEND SOLO FILTRA POR ID Y PALABRA CLAVE (NÚMERO DE REGISTRO).
@Injectable({
  providedIn: 'root'
})
export class HistorialMantenimientosEquipIngService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialMantenimientoEquipoIngeniero?: number, keyword?: string): Observable<number> {
    const params = this.buildParams(idHistorialMantenimientoEquipoIngeniero, keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesMantenimientosEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentMaintenanceHistories(idHistorialMantenimientoEquipoIngeniero?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialMantenimientosEquipIngI[]> {
    let params = this.buildParams(idHistorialMantenimientoEquipoIngeniero, keyword).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialMantenimientosEquipIngI[]>(`${this.baseUrl}/historialesMantenimientosEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentMaintenanceHistoriesPag(page: number = 0, size: number = 10, idHistorialMantenimientoEquipoIngeniero?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialMantenimientosEquipIngI[]> {
    let params = this.buildParams(idHistorialMantenimientoEquipoIngeniero, keyword)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: HistorialMantenimientosEquipIngI[] }>(
      `${this.baseUrl}/historialesMantenimientosEquiposIngenieros/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CREAR REGISTRO.
  addEngineerEquipmentMaintenanceHistory(historial: HistorialMantenimientosEquipIngI): Observable<HistorialMantenimientosEquipIngMsj> {
    return this.http.post<HistorialMantenimientosEquipIngMsj>(`${this.baseUrl}/historialesMantenimientosEquiposIngenieros`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentMaintenanceHistorybyId(idHistorialMantenimientoEquipoIngeniero: number): Observable<ResponseHistorialMantenimientoEquipoIngenieroDTO> {
    return this.http.get<ResponseHistorialMantenimientoEquipoIngenieroDTO>(`${this.baseUrl}/historialesMantenimientosEquiposIngenieros/${idHistorialMantenimientoEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO (EL CONTROLADOR LO RECIBE COMO QUERY PARAM EN /numReg).
  getEngineerEquipmentMaintenanceHistorybyNumeroRegistro(numRegHistorialMantenimientoEquipoIngeniero: string): Observable<ResponseHistorialMantenimientoEquipoIngenieroDTO> {
    const params = new HttpParams().set('numRegHistorialMantenimientoEquipoIngeniero', numRegHistorialMantenimientoEquipoIngeniero);
    return this.http.get<ResponseHistorialMantenimientoEquipoIngenieroDTO>(`${this.baseUrl}/historialesMantenimientosEquiposIngenieros/numReg`, { params });
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentMaintenanceHistory(historial: HistorialMantenimientosEquipIngI): Observable<HistorialMantenimientosEquipIngMsj> {
    return this.http.put<HistorialMantenimientosEquipIngMsj>(`${this.baseUrl}/historialesMantenimientosEquiposIngenieros`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentMaintenanceHistory(idHistorialMantenimientoEquipoIngeniero: number): Observable<HistorialMantenimientosEquipIngMsj> {
    return this.http.delete<HistorialMantenimientosEquipIngMsj>(`${this.baseUrl}/historialesMantenimientosEquiposIngenieros/${idHistorialMantenimientoEquipoIngeniero}`);
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA.
  private buildParams(idHistorialMantenimientoEquipoIngeniero?: number, keyword?: string): HttpParams {
    let params = new HttpParams();
    if (idHistorialMantenimientoEquipoIngeniero !== undefined) {
      params = params.set('idHistorialMantenimientoEquipoIngeniero', idHistorialMantenimientoEquipoIngeniero.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    return params;
  }
}
