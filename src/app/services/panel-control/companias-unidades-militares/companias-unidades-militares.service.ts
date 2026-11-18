import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CompaniasUnidadesMilitaresI } from '../../../interfaces/panel-control/companias-unidades-militares/companias-unidades-militares.interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniasUnidadesMilitaresService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //SERVICIO DE SOLO CONSULTA: SE USA COMO CATÁLOGO EN LOS COMBOS DE OTROS MÓDULOS (DINCO - GESTIÓN DE DESMINADO).

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idCompaniaUnidadMilitar?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String): Observable<number> {
    let params = new HttpParams();
    if (idCompaniaUnidadMilitar !== undefined) params = params.set('idCompaniaUnidadMilitar', idCompaniaUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    return this.http.get<number>(`${this.baseUrl}/companiasUnidadesMilitares/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllMilitaryUnitCompanies(idCompaniaUnidadMilitar?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CompaniasUnidadesMilitaresI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idCompaniaUnidadMilitar !== undefined) params = params.set('idCompaniaUnidadMilitar', idCompaniaUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<CompaniasUnidadesMilitaresI[]>(`${this.baseUrl}/companiasUnidadesMilitares/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllMilitaryUnitCompaniesPag(page: number = 0, size: number = 10, idCompaniaUnidadMilitar?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CompaniasUnidadesMilitaresI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idCompaniaUnidadMilitar !== undefined) params = params.set('idCompaniaUnidadMilitar', idCompaniaUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/companiasUnidadesMilitares/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as CompaniasUnidadesMilitaresI[])
    );
  }

}
