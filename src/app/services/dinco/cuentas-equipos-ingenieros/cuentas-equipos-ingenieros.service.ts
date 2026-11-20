import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CuentasEquiposIngenierosI, CuentasEquiposIngenierosMsj } from '../../../interfaces/dinco/cuentas-equipos-ingenieros/cuentas-equipos-ingenieros.interface';
import { ResponseCuentaEquipoIngenieroDTO } from '../../../interfaces/dinco/cuentas-equipos-ingenieros/responseCuentaEquipoIngenieroDTO.interface';

//SERVICE DE CUENTAS DE EQUIPOS DE INGENIEROS (CATÁLOGO DE DINCO; ENDPOINT /cuentasEquiposIngenieros).
@Injectable({
  providedIn: 'root'
})
export class CuentasEquiposIngenierosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idCuentaEquipoIngeniero?: number, keyword?: String, nombreCuentaEquipoIngeniero?: String): Observable<number> {
    let params = new HttpParams();
    if (idCuentaEquipoIngeniero !== undefined) params = params.set('idCuentaEquipoIngeniero', idCuentaEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreCuentaEquipoIngeniero) params = params.set('nombreCuentaEquipoIngeniero', nombreCuentaEquipoIngeniero.toString());
    return this.http.get<number>(`${this.baseUrl}/cuentasEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentAccounts(idCuentaEquipoIngeniero?: number, keyword?: String, nombreCuentaEquipoIngeniero?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CuentasEquiposIngenierosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idCuentaEquipoIngeniero !== undefined) params = params.set('idCuentaEquipoIngeniero', idCuentaEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreCuentaEquipoIngeniero) params = params.set('nombreCuentaEquipoIngeniero', nombreCuentaEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<CuentasEquiposIngenierosI[]>(`${this.baseUrl}/cuentasEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentAccountsPag(page: number = 0, size: number = 10, idCuentaEquipoIngeniero?: number, keyword?: String, nombreCuentaEquipoIngeniero?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CuentasEquiposIngenierosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idCuentaEquipoIngeniero !== undefined) params = params.set('idCuentaEquipoIngeniero', idCuentaEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (nombreCuentaEquipoIngeniero) params = params.set('nombreCuentaEquipoIngeniero', nombreCuentaEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/cuentasEquiposIngenieros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as CuentasEquiposIngenierosI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentAccount(registro: CuentasEquiposIngenierosI): Observable<CuentasEquiposIngenierosMsj> {
    return this.http.post<CuentasEquiposIngenierosMsj>(`${this.baseUrl}/cuentasEquiposIngenieros`, registro);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentAccountbyId(idCuentaEquipoIngeniero: number): Observable<ResponseCuentaEquipoIngenieroDTO> {
    return this.http.get<ResponseCuentaEquipoIngenieroDTO>(`${this.baseUrl}/cuentasEquiposIngenieros/${idCuentaEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getEngineerEquipmentAccountbyNombre(nombreCuentaEquipoIngeniero: String): Observable<ResponseCuentaEquipoIngenieroDTO> {
    return this.http.get<ResponseCuentaEquipoIngenieroDTO>(`${this.baseUrl}/cuentasEquiposIngenieros/nombre/${encodeURIComponent(nombreCuentaEquipoIngeniero.toString())}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO.
  getEngineerEquipmentAccountbyNumero(numeroCuentaEquipoIngeniero: String): Observable<ResponseCuentaEquipoIngenieroDTO> {
    return this.http.get<ResponseCuentaEquipoIngenieroDTO>(`${this.baseUrl}/cuentasEquiposIngenieros/numero/${encodeURIComponent(numeroCuentaEquipoIngeniero.toString())}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentAccount(registro: CuentasEquiposIngenierosI): Observable<CuentasEquiposIngenierosMsj> {
    return this.http.put<CuentasEquiposIngenierosMsj>(`${this.baseUrl}/cuentasEquiposIngenieros`, registro);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentAccount(idCuentaEquipoIngeniero: number): Observable<CuentasEquiposIngenierosMsj> {
    return this.http.delete<CuentasEquiposIngenierosMsj>(`${this.baseUrl}/cuentasEquiposIngenieros/${idCuentaEquipoIngeniero}`);
  }

}
