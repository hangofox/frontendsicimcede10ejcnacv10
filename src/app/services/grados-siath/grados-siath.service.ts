import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseGradoSiathDTO } from '../../interfaces/grados-siath/responseGradoSiathDTO.interface';
import { GradosSiathI, GradosSiathMsj } from '../../interfaces/grados-siath/grados-siath.interface';

@Injectable({
  providedIn: 'root'
})
export class GradosSiathService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //LISTADO DE REGISTROS SIN PAGINACIÓN (PARA COMBOS DEL FRONTEND).
  findAllSiathGrades(idGradoSiath?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<GradosSiathI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idGradoSiath !== undefined) params = params.set('idGradoSiath', idGradoSiath.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<GradosSiathI[]>(`${this.baseUrl}/gradosSiath/lista`, { params });
  }

  //LISTADO DE REGISTROS CON PAGINACIÓN.
  findAllSiathGradesPag(page: number = 0, size: number = 10, idGradoSiath?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<GradosSiathI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idGradoSiath !== undefined) params = params.set('idGradoSiath', idGradoSiath.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/gradosSiath/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as GradosSiathI[])
    );
  }

  //CREAR REGISTRO.
  addSiathGrade(gradoSiath: GradosSiathI): Observable<GradosSiathMsj> {
    return this.http.post<GradosSiathMsj>(`${this.baseUrl}/gradosSiath`, gradoSiath);
  }

  //CONSULTAR REGISTRO POR ID.
  getSiathGradebyId(idGradoSiath: number): Observable<ResponseGradoSiathDTO> {
    return this.http.get<ResponseGradoSiathDTO>(`${this.baseUrl}/gradosSiath/${idGradoSiath}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE Y FUERZA SIATH.
  getSiathGradebyNombreAndFuerzaSiath(nombreGradoSiath: string, fuerzaSiath: number): Observable<ResponseGradoSiathDTO> {
    return this.http.get<ResponseGradoSiathDTO>(`${this.baseUrl}/gradosSiath/nombre/${nombreGradoSiath}/fuerzaSiath/${fuerzaSiath}`);
  }

  //MODIFICAR REGISTRO.
  updateSiathGrade(gradoSiath: GradosSiathI): Observable<GradosSiathMsj> {
    return this.http.put<GradosSiathMsj>(`${this.baseUrl}/gradosSiath`, gradoSiath);
  }

  //ELIMINAR REGISTRO.
  deleteSiathGrade(idGradoSiath: number): Observable<GradosSiathMsj> {
    return this.http.delete<GradosSiathMsj>(`${this.baseUrl}/gradosSiath/${idGradoSiath}`);
  }

}
