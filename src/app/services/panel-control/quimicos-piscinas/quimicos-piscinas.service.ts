import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { QuimicosPiscinasI, QuimicosPiscinasMsj } from '../../../interfaces/panel-control/quimicos-piscinas/quimicos-piscinas.interface';
import { ResponseQuimicoPiscinaDTO } from '../../../interfaces/panel-control/quimicos-piscinas/responseQuimicoPiscinaDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class QuimicosPiscinasService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idQuimicoPiscina?: number, keyword?: String): Observable<number> {
    let params = new HttpParams();
    if (idQuimicoPiscina !== undefined) params = params.set('idQuimicoPiscina', idQuimicoPiscina.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    return this.http.get<number>(`${this.baseUrl}/quimicosPiscinas/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllPoolChemicals(idQuimicoPiscina?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<QuimicosPiscinasI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idQuimicoPiscina !== undefined) params = params.set('idQuimicoPiscina', idQuimicoPiscina.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<QuimicosPiscinasI[]>(`${this.baseUrl}/quimicosPiscinas/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllPoolChemicalsPag(page: number = 0, size: number = 10, idQuimicoPiscina?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<QuimicosPiscinasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idQuimicoPiscina !== undefined) params = params.set('idQuimicoPiscina', idQuimicoPiscina.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/quimicosPiscinas/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as QuimicosPiscinasI[])
    );
  }

  //CREAR REGISTRO.
  addPoolChemical(quimicoPiscina: QuimicosPiscinasI): Observable<QuimicosPiscinasMsj> {
    return this.http.post<QuimicosPiscinasMsj>(`${this.baseUrl}/quimicosPiscinas`, quimicoPiscina);
  }

  //CONSULTAR REGISTRO POR ID.
  getPoolChemicalbyId(idQuimicoPiscina: number): Observable<ResponseQuimicoPiscinaDTO> {
    return this.http.get<ResponseQuimicoPiscinaDTO>(`${this.baseUrl}/quimicosPiscinas/${idQuimicoPiscina}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getPoolChemicalbyNombre(nombreQuimicoPiscina: String): Observable<ResponseQuimicoPiscinaDTO> {
    return this.http.get<ResponseQuimicoPiscinaDTO>(`${this.baseUrl}/quimicosPiscinas/nombre/${nombreQuimicoPiscina}`);
  }

  //MODIFICAR REGISTRO.
  updatePoolChemical(quimicoPiscina: QuimicosPiscinasI): Observable<QuimicosPiscinasMsj> {
    return this.http.put<QuimicosPiscinasMsj>(`${this.baseUrl}/quimicosPiscinas`, quimicoPiscina);
  }

  //ELIMINAR REGISTRO.
  deletePoolChemical(idQuimicoPiscina: number): Observable<QuimicosPiscinasMsj> {
    return this.http.delete<QuimicosPiscinasMsj>(`${this.baseUrl}/quimicosPiscinas/${idQuimicoPiscina}`);
  }

}
