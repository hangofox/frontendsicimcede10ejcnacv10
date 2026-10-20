import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseLineaMandoUnidadMilitarSolicInfraestDTO } from '../../../interfaces/panel-control/lineas-mandos-unid-mil-solic-infraest/responseLineaMandoUnidadMilitarSolicInfraestDTO.interface';
import { LineasMandosUnidadesMilitaresSolicInfraestI, LineasMandosUnidadesMilitaresSolicInfraestMsj } from '../../../interfaces/panel-control/lineas-mandos-unid-mil-solic-infraest/lineas-mandos-unid-mil-solic-infraest.interface';

@Injectable({
  providedIn: 'root'
})
export class LineasMandosUnidadesMilitaresSolicInfraestService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idLineaMandoUnidadMilitarSolicInfraest?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    let params = new HttpParams();
    if (idLineaMandoUnidadMilitarSolicInfraest !== undefined) params = params.set('idLineaMandoUnidadMilitarSolicInfraest', idLineaMandoUnidadMilitarSolicInfraest.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/lineasMandosUnidadesMilitaresSolicInfraest/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllInfrastructureRequestMilitaryUnitChainsOfCommand(idLineaMandoUnidadMilitarSolicInfraest?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<LineasMandosUnidadesMilitaresSolicInfraestI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idLineaMandoUnidadMilitarSolicInfraest !== undefined) params = params.set('idLineaMandoUnidadMilitarSolicInfraest', idLineaMandoUnidadMilitarSolicInfraest.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<LineasMandosUnidadesMilitaresSolicInfraestI[]>(`${this.baseUrl}/lineasMandosUnidadesMilitaresSolicInfraest/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllInfrastructureRequestMilitaryUnitChainsOfCommandPag(page: number = 0, size: number = 10, idLineaMandoUnidadMilitarSolicInfraest?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<LineasMandosUnidadesMilitaresSolicInfraestI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idLineaMandoUnidadMilitarSolicInfraest !== undefined) params = params.set('idLineaMandoUnidadMilitarSolicInfraest', idLineaMandoUnidadMilitarSolicInfraest.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/lineasMandosUnidadesMilitaresSolicInfraest/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as LineasMandosUnidadesMilitaresSolicInfraestI[])
    );
  }

  //CREAR REGISTRO.
  addInfrastructureRequestMilitaryUnitChainOfCommand(lineaMandoUnidadMilitarSolicInfraest: LineasMandosUnidadesMilitaresSolicInfraestI): Observable<LineasMandosUnidadesMilitaresSolicInfraestMsj> {
    return this.http.post<LineasMandosUnidadesMilitaresSolicInfraestMsj>(`${this.baseUrl}/lineasMandosUnidadesMilitaresSolicInfraest`, lineaMandoUnidadMilitarSolicInfraest);
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureRequestMilitaryUnitChainOfCommandbyId(idLineaMandoUnidadMilitarSolicInfraest: number): Observable<ResponseLineaMandoUnidadMilitarSolicInfraestDTO> {
    return this.http.get<ResponseLineaMandoUnidadMilitarSolicInfraestDTO>(`${this.baseUrl}/lineasMandosUnidadesMilitaresSolicInfraest/${idLineaMandoUnidadMilitarSolicInfraest}`);
  }

  //CONSULTAR REGISTRO POR LÍNEA DE MANDO Y SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR (VARIABLES DE RUTA EN EL BACKEND, POR ESO SE CODIFICAN):
  getInfrastructureRequestMilitaryUnitChainOfCommandbyChainOfCommandAndAcronym(lineaMandoUnidadMilitarSolicInfraest: string, siglaoAcronimoUnidadMilitar: string): Observable<ResponseLineaMandoUnidadMilitarSolicInfraestDTO> {
    return this.http.get<ResponseLineaMandoUnidadMilitarSolicInfraestDTO>(`${this.baseUrl}/lineasMandosUnidadesMilitaresSolicInfraest/lineaMando/${encodeURIComponent(lineaMandoUnidadMilitarSolicInfraest)}/${encodeURIComponent(siglaoAcronimoUnidadMilitar)}`);
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureRequestMilitaryUnitChainOfCommand(lineaMandoUnidadMilitarSolicInfraest: LineasMandosUnidadesMilitaresSolicInfraestI): Observable<LineasMandosUnidadesMilitaresSolicInfraestMsj> {
    return this.http.put<LineasMandosUnidadesMilitaresSolicInfraestMsj>(`${this.baseUrl}/lineasMandosUnidadesMilitaresSolicInfraest`, lineaMandoUnidadMilitarSolicInfraest);
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureRequestMilitaryUnitChainOfCommand(idLineaMandoUnidadMilitarSolicInfraest: number): Observable<LineasMandosUnidadesMilitaresSolicInfraestMsj> {
    return this.http.delete<LineasMandosUnidadesMilitaresSolicInfraestMsj>(`${this.baseUrl}/lineasMandosUnidadesMilitaresSolicInfraest/${idLineaMandoUnidadMilitarSolicInfraest}`);
  }

}
