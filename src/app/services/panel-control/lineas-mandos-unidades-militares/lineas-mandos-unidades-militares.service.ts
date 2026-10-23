import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseLineaMandoUnidadMilitarDTO } from '../../../interfaces/panel-control/lineas-mandos-unidades-militares/responseLineaMandoUnidadMilitarDTO.interface';
import { LineasMandosUnidadesMilitaresI, LineasMandosUnidadesMilitaresMsj } from '../../../interfaces/panel-control/lineas-mandos-unidades-militares/lineas-mandos-unidades-militares.interface';

@Injectable({
  providedIn: 'root'
})
export class LineasMandosUnidadesMilitaresService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idLineaMandoUnidadMilitar?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    let params = new HttpParams();
    if (idLineaMandoUnidadMilitar !== undefined) params = params.set('idLineaMandoUnidadMilitar', idLineaMandoUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/lineasMandosUnidadesMilitares/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllMilitaryUnitChainsOfCommand(idLineaMandoUnidadMilitar?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<LineasMandosUnidadesMilitaresI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idLineaMandoUnidadMilitar !== undefined) params = params.set('idLineaMandoUnidadMilitar', idLineaMandoUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<LineasMandosUnidadesMilitaresI[]>(`${this.baseUrl}/lineasMandosUnidadesMilitares/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllMilitaryUnitChainsOfCommandPag(page: number = 0, size: number = 10, idLineaMandoUnidadMilitar?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<LineasMandosUnidadesMilitaresI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idLineaMandoUnidadMilitar !== undefined) params = params.set('idLineaMandoUnidadMilitar', idLineaMandoUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/lineasMandosUnidadesMilitares/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as LineasMandosUnidadesMilitaresI[])
    );
  }

  //CREAR REGISTRO.
  addMilitaryUnitChainOfCommand(lineaMandoUnidadMilitar: LineasMandosUnidadesMilitaresI): Observable<LineasMandosUnidadesMilitaresMsj> {
    return this.http.post<LineasMandosUnidadesMilitaresMsj>(`${this.baseUrl}/lineasMandosUnidadesMilitares`, lineaMandoUnidadMilitar);
  }

  //CONSULTAR REGISTRO POR ID.
  getMilitaryUnitChainOfCommandbyId(idLineaMandoUnidadMilitar: number): Observable<ResponseLineaMandoUnidadMilitarDTO> {
    return this.http.get<ResponseLineaMandoUnidadMilitarDTO>(`${this.baseUrl}/lineasMandosUnidadesMilitares/${idLineaMandoUnidadMilitar}`);
  }

  //CONSULTAR REGISTRO POR LÍNEA DE MANDO Y SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR (VARIABLES DE RUTA EN EL BACKEND, POR ESO SE CODIFICAN):
  getMilitaryUnitChainOfCommandbyChainOfCommandAndAcronym(lineaMandoUnidadMilitar: string, siglaoAcronimoUnidadMilitar: string): Observable<ResponseLineaMandoUnidadMilitarDTO> {
    return this.http.get<ResponseLineaMandoUnidadMilitarDTO>(`${this.baseUrl}/lineasMandosUnidadesMilitares/lineaMando/${encodeURIComponent(lineaMandoUnidadMilitar)}/${encodeURIComponent(siglaoAcronimoUnidadMilitar)}`);
  }

  //MODIFICAR REGISTRO.
  updateMilitaryUnitChainOfCommand(lineaMandoUnidadMilitar: LineasMandosUnidadesMilitaresI): Observable<LineasMandosUnidadesMilitaresMsj> {
    return this.http.put<LineasMandosUnidadesMilitaresMsj>(`${this.baseUrl}/lineasMandosUnidadesMilitares`, lineaMandoUnidadMilitar);
  }

  //ELIMINAR REGISTRO.
  deleteMilitaryUnitChainOfCommand(idLineaMandoUnidadMilitar: number): Observable<LineasMandosUnidadesMilitaresMsj> {
    return this.http.delete<LineasMandosUnidadesMilitaresMsj>(`${this.baseUrl}/lineasMandosUnidadesMilitares/${idLineaMandoUnidadMilitar}`);
  }

}
