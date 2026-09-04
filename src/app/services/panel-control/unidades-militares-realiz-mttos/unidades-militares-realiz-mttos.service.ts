import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseUnidadMilitarRealizadoraMantenimientoDTO } from '../../../interfaces/panel-control/unidades-militares-realiz-mttos/responseUnidadMilitarRealizadoraMantenimientoDTO.interface';
import { UnidadesMilitaresRealizadorasMantenimientosI, UnidadesMilitaresRealizadorasMantenimientosMsj } from '../../../interfaces/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.interface';

@Injectable({
  providedIn: 'root'
})
export class UnidadesMilitaresRealizadorasMantenimientosService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idUnidadMilitarRealizadoraMantenimiento?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    let params = new HttpParams();
    if (idUnidadMilitarRealizadoraMantenimiento !== undefined) params = params.set('idUnidadMilitarRealizadoraMantenimiento', idUnidadMilitarRealizadoraMantenimiento.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/unidadesMilitaresRealizadorasMantenimientos/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllMaintenancePerformingMilitaryUnits(idUnidadMilitarRealizadoraMantenimiento?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<UnidadesMilitaresRealizadorasMantenimientosI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idUnidadMilitarRealizadoraMantenimiento !== undefined) params = params.set('idUnidadMilitarRealizadoraMantenimiento', idUnidadMilitarRealizadoraMantenimiento.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<UnidadesMilitaresRealizadorasMantenimientosI[]>(`${this.baseUrl}/unidadesMilitaresRealizadorasMantenimientos/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllMaintenancePerformingMilitaryUnitsPag(page: number = 0, size: number = 10, idUnidadMilitarRealizadoraMantenimiento?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<UnidadesMilitaresRealizadorasMantenimientosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idUnidadMilitarRealizadoraMantenimiento !== undefined) params = params.set('idUnidadMilitarRealizadoraMantenimiento', idUnidadMilitarRealizadoraMantenimiento.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/unidadesMilitaresRealizadorasMantenimientos/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as UnidadesMilitaresRealizadorasMantenimientosI[])
    );
  }

  //CREAR REGISTRO.
  addMaintenancePerformingMilitaryUnit(unidadMilitarRealizadoraMantenimiento: UnidadesMilitaresRealizadorasMantenimientosI): Observable<UnidadesMilitaresRealizadorasMantenimientosMsj> {
    return this.http.post<UnidadesMilitaresRealizadorasMantenimientosMsj>(`${this.baseUrl}/unidadesMilitaresRealizadorasMantenimientos`, unidadMilitarRealizadoraMantenimiento);
  }

  //CONSULTAR REGISTRO POR ID.
  getMaintenancePerformingMilitaryUnitbyId(idUnidadMilitarRealizadoraMantenimiento: number): Observable<ResponseUnidadMilitarRealizadoraMantenimientoDTO> {
    return this.http.get<ResponseUnidadMilitarRealizadoraMantenimientoDTO>(`${this.baseUrl}/unidadesMilitaresRealizadorasMantenimientos/${idUnidadMilitarRealizadoraMantenimiento}`);
  }

  //CONSULTAR REGISTRO POR CÓDIGO (CAMPO ÚNICO).
  getMaintenancePerformingMilitaryUnitbyCode(codigoUnidadMilitarRealizadoraMantenimiento: string): Observable<ResponseUnidadMilitarRealizadoraMantenimientoDTO> {
    let params = new HttpParams().set('codigoUnidadMilitarRealizadoraMantenimiento', codigoUnidadMilitarRealizadoraMantenimiento);
    return this.http.get<ResponseUnidadMilitarRealizadoraMantenimientoDTO>(`${this.baseUrl}/unidadesMilitaresRealizadorasMantenimientos/codigo`, { params });
  }

  //MODIFICAR REGISTRO.
  updateMaintenancePerformingMilitaryUnit(unidadMilitarRealizadoraMantenimiento: UnidadesMilitaresRealizadorasMantenimientosI): Observable<UnidadesMilitaresRealizadorasMantenimientosMsj> {
    return this.http.put<UnidadesMilitaresRealizadorasMantenimientosMsj>(`${this.baseUrl}/unidadesMilitaresRealizadorasMantenimientos`, unidadMilitarRealizadoraMantenimiento);
  }

  //ELIMINAR REGISTRO.
  deleteMaintenancePerformingMilitaryUnit(idUnidadMilitarRealizadoraMantenimiento: number): Observable<UnidadesMilitaresRealizadorasMantenimientosMsj> {
    return this.http.delete<UnidadesMilitaresRealizadorasMantenimientosMsj>(`${this.baseUrl}/unidadesMilitaresRealizadorasMantenimientos/${idUnidadMilitarRealizadoraMantenimiento}`);
  }

}
