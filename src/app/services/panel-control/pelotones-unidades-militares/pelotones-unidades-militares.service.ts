import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PelotonesUnidadesMilitaresI } from '../../../interfaces/panel-control/pelotones-unidades-militares/pelotones-unidades-militares.interface';

@Injectable({
  providedIn: 'root'
})
export class PelotonesUnidadesMilitaresService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //SERVICIO DE SOLO CONSULTA: SE USA COMO CATÁLOGO EN LOS COMBOS DE OTROS MÓDULOS (DINCO - GESTIÓN DE DESMINADO).

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idPelotonUnidadMilitar?: number, keyword?: String, nombreCompaniaUnidadMilitar?: String): Observable<number> {
    let params = new HttpParams();
    if (idPelotonUnidadMilitar !== undefined) params = params.set('idPelotonUnidadMilitar', idPelotonUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreCompaniaUnidadMilitar) params = params.set('nombreCompaniaUnidadMilitar', nombreCompaniaUnidadMilitar.toString());
    return this.http.get<number>(`${this.baseUrl}/pelotonesUnidadesMilitares/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllMilitaryUnitPlatoons(idPelotonUnidadMilitar?: number, keyword?: String, nombreCompaniaUnidadMilitar?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<PelotonesUnidadesMilitaresI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idPelotonUnidadMilitar !== undefined) params = params.set('idPelotonUnidadMilitar', idPelotonUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreCompaniaUnidadMilitar) params = params.set('nombreCompaniaUnidadMilitar', nombreCompaniaUnidadMilitar.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<PelotonesUnidadesMilitaresI[]>(`${this.baseUrl}/pelotonesUnidadesMilitares/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllMilitaryUnitPlatoonsPag(page: number = 0, size: number = 10, idPelotonUnidadMilitar?: number, keyword?: String, nombreCompaniaUnidadMilitar?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<PelotonesUnidadesMilitaresI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idPelotonUnidadMilitar !== undefined) params = params.set('idPelotonUnidadMilitar', idPelotonUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreCompaniaUnidadMilitar) params = params.set('nombreCompaniaUnidadMilitar', nombreCompaniaUnidadMilitar.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/pelotonesUnidadesMilitares/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as PelotonesUnidadesMilitaresI[])
    );
  }

}
