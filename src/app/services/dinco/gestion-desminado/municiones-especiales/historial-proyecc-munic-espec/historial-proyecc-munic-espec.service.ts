import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HistorialProyeccMunicEspecI, HistorialProyeccMunicEspecMsj } from '../../../../../interfaces/dinco/gestion-desminado/municiones-especiales/historial-proyecc-munic-espec/historial-proyecc-munic-espec.interface';
import { ResponseHistorialProyeccionMunicionEspecialDTO } from '../../../../../interfaces/dinco/gestion-desminado/municiones-especiales/historial-proyecc-munic-espec/responseHistorialProyeccionMunicionEspecialDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialProyeccMunicEspecService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialProyeccionMunicionEspecial?: number, keyword?: String): Observable<number> {
    let params = new HttpParams();
    if (idHistorialProyeccionMunicionEspecial !== undefined) params = params.set('idHistorialProyeccionMunicionEspecial', idHistorialProyeccionMunicionEspecial.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    return this.http.get<number>(`${this.baseUrl}/historialesProyeccionesMunicionesEspeciales/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSpecialAmmunitionProjectionHistories(idHistorialProyeccionMunicionEspecial?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<HistorialProyeccMunicEspecI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idHistorialProyeccionMunicionEspecial !== undefined) params = params.set('idHistorialProyeccionMunicionEspecial', idHistorialProyeccionMunicionEspecial.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<HistorialProyeccMunicEspecI[]>(`${this.baseUrl}/historialesProyeccionesMunicionesEspeciales/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSpecialAmmunitionProjectionHistoriesPag(page: number = 0, size: number = 10, idHistorialProyeccionMunicionEspecial?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<HistorialProyeccMunicEspecI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idHistorialProyeccionMunicionEspecial !== undefined) params = params.set('idHistorialProyeccionMunicionEspecial', idHistorialProyeccionMunicionEspecial.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/historialesProyeccionesMunicionesEspeciales/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialProyeccMunicEspecI[])
    );
  }

  //CREAR REGISTRO.
  addSpecialAmmunitionProjectionHistory(historialProyeccionMunicionEspecial: HistorialProyeccMunicEspecI): Observable<HistorialProyeccMunicEspecMsj> {
    return this.http.post<HistorialProyeccMunicEspecMsj>(`${this.baseUrl}/historialesProyeccionesMunicionesEspeciales`, historialProyeccionMunicionEspecial);
  }

  //CONSULTAR REGISTRO POR ID.
  getSpecialAmmunitionProjectionHistorybyId(idHistorialProyeccionMunicionEspecial: number): Observable<ResponseHistorialProyeccionMunicionEspecialDTO> {
    return this.http.get<ResponseHistorialProyeccionMunicionEspecialDTO>(`${this.baseUrl}/historialesProyeccionesMunicionesEspeciales/${idHistorialProyeccionMunicionEspecial}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO (CAMPO ÚNICO).
  getSpecialAmmunitionProjectionHistorybyNumeroRegistro(numRegHistorialProyeccionMunicionEspecial: String): Observable<ResponseHistorialProyeccionMunicionEspecialDTO> {
    const params = new HttpParams().set('numRegHistorialProyeccionMunicionEspecial', numRegHistorialProyeccionMunicionEspecial.toString());
    return this.http.get<ResponseHistorialProyeccionMunicionEspecialDTO>(`${this.baseUrl}/historialesProyeccionesMunicionesEspeciales/numReg`, { params });
  }

  //MODIFICAR REGISTRO.
  updateSpecialAmmunitionProjectionHistory(historialProyeccionMunicionEspecial: HistorialProyeccMunicEspecI): Observable<HistorialProyeccMunicEspecMsj> {
    return this.http.put<HistorialProyeccMunicEspecMsj>(`${this.baseUrl}/historialesProyeccionesMunicionesEspeciales`, historialProyeccionMunicionEspecial);
  }

  //ELIMINAR REGISTRO.
  deleteSpecialAmmunitionProjectionHistory(idHistorialProyeccionMunicionEspecial: number): Observable<HistorialProyeccMunicEspecMsj> {
    return this.http.delete<HistorialProyeccMunicEspecMsj>(`${this.baseUrl}/historialesProyeccionesMunicionesEspeciales/${idHistorialProyeccionMunicionEspecial}`);
  }

}
