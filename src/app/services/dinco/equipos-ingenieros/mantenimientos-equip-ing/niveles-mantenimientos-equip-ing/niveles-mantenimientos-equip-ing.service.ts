import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NivelesMantenimientosEquipIngI } from '../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/niveles-mantenimientos-equip-ing/niveles-mantenimientos-equip-ing.interface';

//CATÁLOGO DE NIVELES DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS (NivelMantenimientoEquipoIngenieroController): SOLO LAS CONSULTAS QUE
//USAN LOS COMBOS DEL HISTORIAL DE MANTENIMIENTOS DE EQUIPOS DE INGENIEROS (MISMO PATRÓN DE TiposMantenimientosInfraestructurasService).
@Injectable({
  providedIn: 'root'
})
export class NivelesMantenimientosEquipIngService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idNivelMantenimientoEquipoIngeniero?: number, keyword?: string): Observable<number> {
    const params = this.buildParams(idNivelMantenimientoEquipoIngeniero, keyword);
    return this.http.get<number>(`${this.baseUrl}/nivelesMantenimientosEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllLevelsOfEngineerEquipmentMaintenance(idNivelMantenimientoEquipoIngeniero?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<NivelesMantenimientosEquipIngI[]> {
    let params = this.buildParams(idNivelMantenimientoEquipoIngeniero, keyword).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<NivelesMantenimientosEquipIngI[]>(`${this.baseUrl}/nivelesMantenimientosEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllLevelsOfEngineerEquipmentMaintenancePag(page: number = 0, size: number = 10, idNivelMantenimientoEquipoIngeniero?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<NivelesMantenimientosEquipIngI[]> {
    let params = this.buildParams(idNivelMantenimientoEquipoIngeniero, keyword)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: NivelesMantenimientosEquipIngI[] }>(
      `${this.baseUrl}/nivelesMantenimientosEquiposIngenieros/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA.
  private buildParams(idNivelMantenimientoEquipoIngeniero?: number, keyword?: string): HttpParams {
    let params = new HttpParams();
    if (idNivelMantenimientoEquipoIngeniero !== undefined) {
      params = params.set('idNivelMantenimientoEquipoIngeniero', idNivelMantenimientoEquipoIngeniero.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    return params;
  }
}
