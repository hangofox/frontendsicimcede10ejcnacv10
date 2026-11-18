import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RazasCaninosI, RazasCaninosMsj } from '../../../interfaces/panel-control/razas-caninos/razas-caninos.interface';
import { ResponseRazaCaninoDTO } from '../../../interfaces/panel-control/razas-caninos/responseRazaCaninoDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class RazasCaninosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //NOTA: RazaCaninoController NO EXPONE /razasCaninos/count; EL TOTAL DE REGISTROS FILTRADOS SE OBTIENE CON EL LISTADO SIN PAGINACIÓN.

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllCanineBreeds(idRazaCanino?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<RazasCaninosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idRazaCanino !== undefined) params = params.set('idRazaCanino', idRazaCanino.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<RazasCaninosI[]>(`${this.baseUrl}/razasCaninos/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllCanineBreedsPag(page: number = 0, size: number = 10, idRazaCanino?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<RazasCaninosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idRazaCanino !== undefined) params = params.set('idRazaCanino', idRazaCanino.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/razasCaninos/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as RazasCaninosI[])
    );
  }

  //CREAR REGISTRO.
  addCanineBreed(razaCanino: RazasCaninosI): Observable<RazasCaninosMsj> {
    return this.http.post<RazasCaninosMsj>(`${this.baseUrl}/razasCaninos`, razaCanino);
  }

  //CONSULTAR REGISTRO POR ID.
  getCanineBreedbyId(idRazaCanino: number): Observable<ResponseRazaCaninoDTO> {
    return this.http.get<ResponseRazaCaninoDTO>(`${this.baseUrl}/razasCaninos/${idRazaCanino}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getCanineBreedbyNombre(nombreRazaCanino: String): Observable<ResponseRazaCaninoDTO> {
    return this.http.get<ResponseRazaCaninoDTO>(`${this.baseUrl}/razasCaninos/nombre/${nombreRazaCanino}`);
  }

  //MODIFICAR REGISTRO.
  updateCanineBreed(razaCanino: RazasCaninosI): Observable<RazasCaninosMsj> {
    return this.http.put<RazasCaninosMsj>(`${this.baseUrl}/razasCaninos`, razaCanino);
  }

  //ELIMINAR REGISTRO.
  deleteCanineBreed(idRazaCanino: number): Observable<RazasCaninosMsj> {
    return this.http.delete<RazasCaninosMsj>(`${this.baseUrl}/razasCaninos/${idRazaCanino}`);
  }

}
