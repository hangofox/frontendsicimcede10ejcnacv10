import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HistorialDiagnInicSeleccEquipIngI, HistorialDiagnInicSeleccEquipIngMsj } from '../../../../interfaces/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/historial-diagn-inic-selecc-equip-ing.interface';
import { ResponseHistorialDiagnosticoInicialSeleccMttoEquipIngDTO } from '../../../../interfaces/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/responseHistorialDiagnosticoInicialSeleccMttoEquipIngDTO.interface';

//SERVICE DEL HISTORIAL DE DIAGNÓSTICOS INICIALES DE SELECCIÓN DE MANTENIMIENTOS DE EQUIPOS DE INGENIEROS
//(ENDPOINT /historialesDiagnosticosInicialesSeleccMttoEquipIng). EL BACKEND SOLO FILTRA POR ID Y POR N.° DE REGISTRO (keyword).
@Injectable({
  providedIn: 'root'
})
export class HistorialDiagnInicSeleccEquipIngService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialDiagnosticoInicialSeleccMttoEquipIng?: number, keyword?: String): Observable<number> {
    let params = new HttpParams();
    if (idHistorialDiagnosticoInicialSeleccMttoEquipIng !== undefined) params = params.set('idHistorialDiagnosticoInicialSeleccMttoEquipIng', idHistorialDiagnosticoInicialSeleccMttoEquipIng.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    return this.http.get<number>(`${this.baseUrl}/historialesDiagnosticosInicialesSeleccMttoEquipIng/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentInitialDiagnosisHistories(idHistorialDiagnosticoInicialSeleccMttoEquipIng?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<HistorialDiagnInicSeleccEquipIngI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idHistorialDiagnosticoInicialSeleccMttoEquipIng !== undefined) params = params.set('idHistorialDiagnosticoInicialSeleccMttoEquipIng', idHistorialDiagnosticoInicialSeleccMttoEquipIng.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<HistorialDiagnInicSeleccEquipIngI[]>(`${this.baseUrl}/historialesDiagnosticosInicialesSeleccMttoEquipIng/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentInitialDiagnosisHistoriesPag(page: number = 0, size: number = 10, idHistorialDiagnosticoInicialSeleccMttoEquipIng?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<HistorialDiagnInicSeleccEquipIngI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idHistorialDiagnosticoInicialSeleccMttoEquipIng !== undefined) params = params.set('idHistorialDiagnosticoInicialSeleccMttoEquipIng', idHistorialDiagnosticoInicialSeleccMttoEquipIng.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/historialesDiagnosticosInicialesSeleccMttoEquipIng/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialDiagnInicSeleccEquipIngI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentInitialDiagnosisHistory(historial: HistorialDiagnInicSeleccEquipIngI): Observable<HistorialDiagnInicSeleccEquipIngMsj> {
    return this.http.post<HistorialDiagnInicSeleccEquipIngMsj>(`${this.baseUrl}/historialesDiagnosticosInicialesSeleccMttoEquipIng`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentInitialDiagnosisHistorybyId(idHistorialDiagnosticoInicialSeleccMttoEquipIng: number): Observable<ResponseHistorialDiagnosticoInicialSeleccMttoEquipIngDTO> {
    return this.http.get<ResponseHistorialDiagnosticoInicialSeleccMttoEquipIngDTO>(`${this.baseUrl}/historialesDiagnosticosInicialesSeleccMttoEquipIng/${idHistorialDiagnosticoInicialSeleccMttoEquipIng}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO (CAMPO ÚNICO).
  getEngineerEquipmentInitialDiagnosisHistorybyNumeroRegistro(numRegHistorialDiagnosticoInicialSeleccMttoEquipIng: String): Observable<ResponseHistorialDiagnosticoInicialSeleccMttoEquipIngDTO> {
    const params = new HttpParams().set('numRegHistorialDiagnosticoInicialSeleccMttoEquipIng', numRegHistorialDiagnosticoInicialSeleccMttoEquipIng.toString());
    return this.http.get<ResponseHistorialDiagnosticoInicialSeleccMttoEquipIngDTO>(`${this.baseUrl}/historialesDiagnosticosInicialesSeleccMttoEquipIng/numReg`, { params });
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentInitialDiagnosisHistory(historial: HistorialDiagnInicSeleccEquipIngI): Observable<HistorialDiagnInicSeleccEquipIngMsj> {
    return this.http.put<HistorialDiagnInicSeleccEquipIngMsj>(`${this.baseUrl}/historialesDiagnosticosInicialesSeleccMttoEquipIng`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentInitialDiagnosisHistory(idHistorialDiagnosticoInicialSeleccMttoEquipIng: number): Observable<HistorialDiagnInicSeleccEquipIngMsj> {
    return this.http.delete<HistorialDiagnInicSeleccEquipIngMsj>(`${this.baseUrl}/historialesDiagnosticosInicialesSeleccMttoEquipIng/${idHistorialDiagnosticoInicialSeleccMttoEquipIng}`);
  }

}
