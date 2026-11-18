import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MunicionesEspecialesI, MunicionesEspecialesMsj } from '../../../../interfaces/dinco/gestion-desminado/municiones-especiales/municiones-especiales.interface';
import { ResponseMunicionEspecialDTO } from '../../../../interfaces/dinco/gestion-desminado/municiones-especiales/responseMunicionEspecialDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class MunicionesEspecialesService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idMunicionEspecial?: number, keyword?: String, nombrePelotonUnidadMilitar?: String, nombreTipoDespejeMilitarArtefactoExplosivo?: String): Observable<number> {
    let params = new HttpParams();
    if (idMunicionEspecial !== undefined) params = params.set('idMunicionEspecial', idMunicionEspecial.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombrePelotonUnidadMilitar) params = params.set('nombrePelotonUnidadMilitar', nombrePelotonUnidadMilitar.toString());
    if (nombreTipoDespejeMilitarArtefactoExplosivo) params = params.set('nombreTipoDespejeMilitarArtefactoExplosivo', nombreTipoDespejeMilitarArtefactoExplosivo.toString());
    return this.http.get<number>(`${this.baseUrl}/municionesEspeciales/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSpecialAmmunitions(idMunicionEspecial?: number, keyword?: String, nombrePelotonUnidadMilitar?: String, nombreTipoDespejeMilitarArtefactoExplosivo?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<MunicionesEspecialesI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idMunicionEspecial !== undefined) params = params.set('idMunicionEspecial', idMunicionEspecial.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombrePelotonUnidadMilitar) params = params.set('nombrePelotonUnidadMilitar', nombrePelotonUnidadMilitar.toString());
    if (nombreTipoDespejeMilitarArtefactoExplosivo) params = params.set('nombreTipoDespejeMilitarArtefactoExplosivo', nombreTipoDespejeMilitarArtefactoExplosivo.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<MunicionesEspecialesI[]>(`${this.baseUrl}/municionesEspeciales/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSpecialAmmunitionsPag(page: number = 0, size: number = 10, idMunicionEspecial?: number, keyword?: String, nombrePelotonUnidadMilitar?: String, nombreTipoDespejeMilitarArtefactoExplosivo?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<MunicionesEspecialesI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idMunicionEspecial !== undefined) params = params.set('idMunicionEspecial', idMunicionEspecial.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombrePelotonUnidadMilitar) params = params.set('nombrePelotonUnidadMilitar', nombrePelotonUnidadMilitar.toString());
    if (nombreTipoDespejeMilitarArtefactoExplosivo) params = params.set('nombreTipoDespejeMilitarArtefactoExplosivo', nombreTipoDespejeMilitarArtefactoExplosivo.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/municionesEspeciales/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as MunicionesEspecialesI[])
    );
  }

  //CREAR REGISTRO.
  addSpecialAmmunition(municionEspecial: MunicionesEspecialesI): Observable<MunicionesEspecialesMsj> {
    return this.http.post<MunicionesEspecialesMsj>(`${this.baseUrl}/municionesEspeciales`, municionEspecial);
  }

  //CONSULTAR REGISTRO POR ID.
  getSpecialAmmunitionbyId(idMunicionEspecial: number): Observable<ResponseMunicionEspecialDTO> {
    return this.http.get<ResponseMunicionEspecialDTO>(`${this.baseUrl}/municionesEspeciales/${idMunicionEspecial}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE Y LOTE.
  getSpecialAmmunitionbyNombreYLote(nombreMunicionEspecial: String, loteMunicionEspecial: String): Observable<ResponseMunicionEspecialDTO> {
    return this.http.get<ResponseMunicionEspecialDTO>(`${this.baseUrl}/municionesEspeciales/nombre/${nombreMunicionEspecial}/${loteMunicionEspecial}`);
  }

  //MODIFICAR REGISTRO.
  updateSpecialAmmunition(municionEspecial: MunicionesEspecialesI): Observable<MunicionesEspecialesMsj> {
    return this.http.put<MunicionesEspecialesMsj>(`${this.baseUrl}/municionesEspeciales`, municionEspecial);
  }

  //ELIMINAR REGISTRO.
  deleteSpecialAmmunition(idMunicionEspecial: number): Observable<MunicionesEspecialesMsj> {
    return this.http.delete<MunicionesEspecialesMsj>(`${this.baseUrl}/municionesEspeciales/${idMunicionEspecial}`);
  }

}
