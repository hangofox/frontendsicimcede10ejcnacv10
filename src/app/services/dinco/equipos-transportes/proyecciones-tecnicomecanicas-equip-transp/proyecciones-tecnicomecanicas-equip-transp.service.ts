import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseProyeccionTecnicomecanicaEquipTranspDTO } from '../../../../interfaces/dinco/equipos-transportes/proyecciones-tecnicomecanicas-equip-transp/responseProyeccionTecnicomecanicaEquipTranspDTO.interface';
import { ProyeccionesTecnicomecanicasEquipTranspI, ProyeccionesTecnicomecanicasEquipTranspMsj } from '../../../../interfaces/dinco/equipos-transportes/proyecciones-tecnicomecanicas-equip-transp/proyecciones-tecnicomecanicas-equip-transp.interface';

//ENDPOINTS DE ProyeccionTecnicomecanicaEquipTranspController (/proyeccionesTecnicomecanicasEquipsTransps). LA PALABRA CLAVE DEL
//BACKEND SOLO BUSCA EN EL NOMBRE Y NÚMERO DEL RUBRO:
@Injectable({
  providedIn: 'root'
})
export class ProyeccionesTecnicomecanicasEquipTranspService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private filtros(params: HttpParams, idProyeccionTecnicomecanicaEquipTransp?: number, idEquipoIngeniero?: number, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp?: string, valorSolicitadoProyeccionTecnicomecanicaEquipTransp?: string, keyword?: string): HttpParams {
    if (idProyeccionTecnicomecanicaEquipTransp !== undefined) params = params.set('idProyeccionTecnicomecanicaEquipTransp', idProyeccionTecnicomecanicaEquipTransp.toString());
    if (idEquipoIngeniero !== undefined) params = params.set('idEquipoIngeniero', idEquipoIngeniero.toString());
    if (nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp) params = params.set('nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp', nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp);
    if (valorSolicitadoProyeccionTecnicomecanicaEquipTransp) params = params.set('valorSolicitadoProyeccionTecnicomecanicaEquipTransp', valorSolicitadoProyeccionTecnicomecanicaEquipTransp);
    if (keyword) params = params.set('keyword', keyword);
    return params;
  }

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idProyeccionTecnicomecanicaEquipTransp?: number, idEquipoIngeniero?: number, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp?: string, valorSolicitadoProyeccionTecnicomecanicaEquipTransp?: string, keyword?: string): Observable<number> {
    const params = this.filtros(new HttpParams(), idProyeccionTecnicomecanicaEquipTransp, idEquipoIngeniero, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp, valorSolicitadoProyeccionTecnicomecanicaEquipTransp, keyword);
    return this.http.get<number>(`${this.baseUrl}/proyeccionesTecnicomecanicasEquipsTransps/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTechnicalMechanicalProjectionsOfTransportEquipment(idProyeccionTecnicomecanicaEquipTransp?: number, idEquipoIngeniero?: number, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp?: string, valorSolicitadoProyeccionTecnicomecanicaEquipTransp?: string, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ProyeccionesTecnicomecanicasEquipTranspI[]> {
    let params = this.filtros(new HttpParams().set('orderMode', orderMode), idProyeccionTecnicomecanicaEquipTransp, idEquipoIngeniero, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp, valorSolicitadoProyeccionTecnicomecanicaEquipTransp, keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<ProyeccionesTecnicomecanicasEquipTranspI[]>(`${this.baseUrl}/proyeccionesTecnicomecanicasEquipsTransps/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTechnicalMechanicalProjectionsOfTransportEquipmentPag(page: number = 0, size: number = 10, idProyeccionTecnicomecanicaEquipTransp?: number, idEquipoIngeniero?: number, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp?: string, valorSolicitadoProyeccionTecnicomecanicaEquipTransp?: string, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<ProyeccionesTecnicomecanicasEquipTranspI[]> {
    let params = this.filtros(new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode), idProyeccionTecnicomecanicaEquipTransp, idEquipoIngeniero, nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp, valorSolicitadoProyeccionTecnicomecanicaEquipTransp, keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/proyeccionesTecnicomecanicasEquipsTransps/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as ProyeccionesTecnicomecanicasEquipTranspI[])
    );
  }

  //CREAR REGISTRO.
  addTechnicalMechanicalProjectionOfTransportEquipment(proyeccion: ProyeccionesTecnicomecanicasEquipTranspI): Observable<ProyeccionesTecnicomecanicasEquipTranspMsj> {
    return this.http.post<ProyeccionesTecnicomecanicasEquipTranspMsj>(`${this.baseUrl}/proyeccionesTecnicomecanicasEquipsTransps`, proyeccion);
  }

  //CONSULTAR REGISTRO POR ID.
  getTechnicalMechanicalProjectionOfTransportEquipmentbyId(idProyeccionTecnicomecanicaEquipTransp: number): Observable<ResponseProyeccionTecnicomecanicaEquipTranspDTO> {
    return this.http.get<ResponseProyeccionTecnicomecanicaEquipTranspDTO>(`${this.baseUrl}/proyeccionesTecnicomecanicasEquipsTransps/${idProyeccionTecnicomecanicaEquipTransp}`);
  }

  //MODIFICAR REGISTRO.
  updateTechnicalMechanicalProjectionOfTransportEquipment(proyeccion: ProyeccionesTecnicomecanicasEquipTranspI): Observable<ProyeccionesTecnicomecanicasEquipTranspMsj> {
    return this.http.put<ProyeccionesTecnicomecanicasEquipTranspMsj>(`${this.baseUrl}/proyeccionesTecnicomecanicasEquipsTransps`, proyeccion);
  }

  //ELIMINAR REGISTRO.
  deleteTechnicalMechanicalProjectionOfTransportEquipment(idProyeccionTecnicomecanicaEquipTransp: number): Observable<ProyeccionesTecnicomecanicasEquipTranspMsj> {
    return this.http.delete<ProyeccionesTecnicomecanicasEquipTranspMsj>(`${this.baseUrl}/proyeccionesTecnicomecanicasEquipsTransps/${idProyeccionTecnicomecanicaEquipTransp}`);
  }

}
