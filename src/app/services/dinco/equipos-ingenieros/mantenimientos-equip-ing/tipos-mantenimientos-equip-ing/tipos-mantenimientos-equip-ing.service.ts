import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposMantenimientosEquipIngI } from '../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/tipos-mantenimientos-equip-ing/tipos-mantenimientos-equip-ing.interface';

//CATÁLOGO DE TIPOS DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS (TipoMantenimientoEquipoIngenieroController): SOLO LAS CONSULTAS QUE
//USAN LOS COMBOS Y EL SEMÁFORO DEL HISTORIAL DE MANTENIMIENTOS DE EQUIPOS DE INGENIEROS (MISMO PATRÓN DE TiposMantenimientosInfraestructurasService).
@Injectable({
  providedIn: 'root'
})
export class TiposMantenimientosEquipIngService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoMantenimientoEquipoIngeniero?: number, keyword?: string): Observable<number> {
    const params = this.buildParams(idTipoMantenimientoEquipoIngeniero, keyword);
    return this.http.get<number>(`${this.baseUrl}/tiposMantenimientosEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTypesOfEngineerEquipmentMaintenance(idTipoMantenimientoEquipoIngeniero?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposMantenimientosEquipIngI[]> {
    let params = this.buildParams(idTipoMantenimientoEquipoIngeniero, keyword).set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<TiposMantenimientosEquipIngI[]>(`${this.baseUrl}/tiposMantenimientosEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfEngineerEquipmentMaintenancePag(page: number = 0, size: number = 10, idTipoMantenimientoEquipoIngeniero?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<TiposMantenimientosEquipIngI[]> {
    let params = this.buildParams(idTipoMantenimientoEquipoIngeniero, keyword)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: TiposMantenimientosEquipIngI[] }>(
      `${this.baseUrl}/tiposMantenimientosEquiposIngenieros/listaPag`,
      { params }
    ).pipe(map(slice => slice.content));
  }

  //CONSTRUYE LOS PARÁMETROS OPCIONALES COMPARTIDOS POR LOS ENDPOINTS DE CONSULTA.
  private buildParams(idTipoMantenimientoEquipoIngeniero?: number, keyword?: string): HttpParams {
    let params = new HttpParams();
    if (idTipoMantenimientoEquipoIngeniero !== undefined) {
      params = params.set('idTipoMantenimientoEquipoIngeniero', idTipoMantenimientoEquipoIngeniero.toString());
    }
    if (keyword) params = params.set('keyword', keyword);
    return params;
  }
}
