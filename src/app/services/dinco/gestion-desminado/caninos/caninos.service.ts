import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CaninosI, CaninosMsj } from '../../../../interfaces/dinco/gestion-desminado/caninos/caninos.interface';
import { ResponseCaninoDTO } from '../../../../interfaces/dinco/gestion-desminado/caninos/responseCaninoDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CaninosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idCanino?: number, keyword?: String, nombreCompaniaUnidadMilitar?: String, nombreTipoDespejeMilitarArtefactoExplosivo?: String): Observable<number> {
    let params = new HttpParams();
    if (idCanino !== undefined) params = params.set('idCanino', idCanino.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreCompaniaUnidadMilitar) params = params.set('nombreCompaniaUnidadMilitar', nombreCompaniaUnidadMilitar.toString());
    if (nombreTipoDespejeMilitarArtefactoExplosivo) params = params.set('nombreTipoDespejeMilitarArtefactoExplosivo', nombreTipoDespejeMilitarArtefactoExplosivo.toString());
    return this.http.get<number>(`${this.baseUrl}/caninos/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllCanines(idCanino?: number, keyword?: String, nombreCompaniaUnidadMilitar?: String, nombreTipoDespejeMilitarArtefactoExplosivo?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CaninosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idCanino !== undefined) params = params.set('idCanino', idCanino.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreCompaniaUnidadMilitar) params = params.set('nombreCompaniaUnidadMilitar', nombreCompaniaUnidadMilitar.toString());
    if (nombreTipoDespejeMilitarArtefactoExplosivo) params = params.set('nombreTipoDespejeMilitarArtefactoExplosivo', nombreTipoDespejeMilitarArtefactoExplosivo.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<CaninosI[]>(`${this.baseUrl}/caninos/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllCaninesPag(page: number = 0, size: number = 10, idCanino?: number, keyword?: String, nombreCompaniaUnidadMilitar?: String, nombreTipoDespejeMilitarArtefactoExplosivo?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CaninosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idCanino !== undefined) params = params.set('idCanino', idCanino.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreCompaniaUnidadMilitar) params = params.set('nombreCompaniaUnidadMilitar', nombreCompaniaUnidadMilitar.toString());
    if (nombreTipoDespejeMilitarArtefactoExplosivo) params = params.set('nombreTipoDespejeMilitarArtefactoExplosivo', nombreTipoDespejeMilitarArtefactoExplosivo.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/caninos/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as CaninosI[])
    );
  }

  //CREAR REGISTRO.
  addCanine(canino: CaninosI): Observable<CaninosMsj> {
    return this.http.post<CaninosMsj>(`${this.baseUrl}/caninos`, canino);
  }

  //CONSULTAR REGISTRO POR ID.
  getCaninebyId(idCanino: number): Observable<ResponseCaninoDTO> {
    return this.http.get<ResponseCaninoDTO>(`${this.baseUrl}/caninos/${idCanino}`);
  }

  //CONSULTAR REGISTRO POR CAMPOS ÚNICOS COMBINADOS (N.° DE CHIP, N.° DE INVENTARIO Y/O N.° DE ACTIVO FIJO).
  getCaninebyNumero(numeroChipCanino?: String, numeroInventarioCanino?: String, numeroActivoFijoCanino?: String): Observable<ResponseCaninoDTO> {
    let params = new HttpParams();
    if (numeroChipCanino) params = params.set('numeroChipCanino', numeroChipCanino.toString());
    if (numeroInventarioCanino) params = params.set('numeroInventarioCanino', numeroInventarioCanino.toString());
    if (numeroActivoFijoCanino) params = params.set('numeroActivoFijoCanino', numeroActivoFijoCanino.toString());
    return this.http.get<ResponseCaninoDTO>(`${this.baseUrl}/caninos/numero`, { params });
  }

  //MODIFICAR REGISTRO.
  updateCanine(canino: CaninosI): Observable<CaninosMsj> {
    return this.http.put<CaninosMsj>(`${this.baseUrl}/caninos`, canino);
  }

  //ELIMINAR REGISTRO.
  deleteCanine(idCanino: number): Observable<CaninosMsj> {
    return this.http.delete<CaninosMsj>(`${this.baseUrl}/caninos/${idCanino}`);
  }

}
