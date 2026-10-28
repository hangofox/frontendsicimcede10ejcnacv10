import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseMaquinariaPesadaDTO } from '../../../../interfaces/digei/gestion-riesgo/maquinarias-pesadas/responseMaquinariaPesadaDTO.interface';
import { MaquinariasPesadasI, MaquinariasPesadasMsj } from '../../../../interfaces/digei/gestion-riesgo/maquinarias-pesadas/maquinarias-pesadas.interface';

@Injectable({
  providedIn: 'root'
})
export class MaquinariasPesadasService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN (EL BACKEND NO TIENE CONTADOR NI PALABRA CLAVE PARA ESTA ENTIDAD).
  findAllHeavyMachinery(idMaquinariaPesada?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<MaquinariasPesadasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idMaquinariaPesada !== undefined) params = params.set('idMaquinariaPesada', idMaquinariaPesada.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<MaquinariasPesadasI[]>(`${this.baseUrl}/maquinariasPesadas/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllHeavyMachineryPag(page: number = 0, size: number = 10, idMaquinariaPesada?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<MaquinariasPesadasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idMaquinariaPesada !== undefined) params = params.set('idMaquinariaPesada', idMaquinariaPesada.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/maquinariasPesadas/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as MaquinariasPesadasI[])
    );
  }

  //CREAR REGISTRO.
  addHeavyMachinery(maquinariaPesada: MaquinariasPesadasI): Observable<MaquinariasPesadasMsj> {
    return this.http.post<MaquinariasPesadasMsj>(`${this.baseUrl}/maquinariasPesadas`, maquinariaPesada);
  }

  //CONSULTAR REGISTRO POR ID.
  getHeavyMachinerybyId(idMaquinariaPesada: number): Observable<ResponseMaquinariaPesadaDTO> {
    return this.http.get<ResponseMaquinariaPesadaDTO>(`${this.baseUrl}/maquinariasPesadas/${idMaquinariaPesada}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getHeavyMachinerybyNombre(nombreMaquinariaPesada: string): Observable<ResponseMaquinariaPesadaDTO> {
    return this.http.get<ResponseMaquinariaPesadaDTO>(`${this.baseUrl}/maquinariasPesadas/nombre/${nombreMaquinariaPesada}`);
  }

  //MODIFICAR REGISTRO.
  updateHeavyMachinery(maquinariaPesada: MaquinariasPesadasI): Observable<MaquinariasPesadasMsj> {
    return this.http.put<MaquinariasPesadasMsj>(`${this.baseUrl}/maquinariasPesadas`, maquinariaPesada);
  }

  //ELIMINAR REGISTRO.
  deleteHeavyMachinery(idMaquinariaPesada: number): Observable<MaquinariasPesadasMsj> {
    return this.http.delete<MaquinariasPesadasMsj>(`${this.baseUrl}/maquinariasPesadas/${idMaquinariaPesada}`);
  }

}
