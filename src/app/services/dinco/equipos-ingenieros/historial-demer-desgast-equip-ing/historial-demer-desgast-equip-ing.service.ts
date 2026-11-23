import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HistorialDemerDesgastEquipIngI, HistorialDemerDesgastEquipIngMsj } from '../../../../interfaces/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/historial-demer-desgast-equip-ing.interface';
import { ResponseHistorialDemeritoYDesgasteEquipoIngenieroDTO } from '../../../../interfaces/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/responseHistorialDemeritoYDesgasteEquipoIngenieroDTO.interface';

//SERVICE DEL HISTORIAL DE DEMÉRITOS Y DESGASTES DE EQUIPOS DE INGENIEROS (ENDPOINT /historialesDemeritosYDesgastesEquiposIngenieros).
//EL BACKEND SOLO FILTRA POR ID Y POR PALABRA CLAVE (keyword: N.° DE REGISTRO O NOMBRE DEL PROYECTO).
@Injectable({
  providedIn: 'root'
})
export class HistorialDemerDesgastEquipIngService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialDemeritoYDesgasteEquipoIngeniero?: number, keyword?: String): Observable<number> {
    let params = new HttpParams();
    if (idHistorialDemeritoYDesgasteEquipoIngeniero !== undefined) params = params.set('idHistorialDemeritoYDesgasteEquipoIngeniero', idHistorialDemeritoYDesgasteEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    return this.http.get<number>(`${this.baseUrl}/historialesDemeritosYDesgastesEquiposIngenieros/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentDemeritAndWearHistories(idHistorialDemeritoYDesgasteEquipoIngeniero?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<HistorialDemerDesgastEquipIngI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idHistorialDemeritoYDesgasteEquipoIngeniero !== undefined) params = params.set('idHistorialDemeritoYDesgasteEquipoIngeniero', idHistorialDemeritoYDesgasteEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<HistorialDemerDesgastEquipIngI[]>(`${this.baseUrl}/historialesDemeritosYDesgastesEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentDemeritAndWearHistoriesPag(page: number = 0, size: number = 10, idHistorialDemeritoYDesgasteEquipoIngeniero?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<HistorialDemerDesgastEquipIngI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idHistorialDemeritoYDesgasteEquipoIngeniero !== undefined) params = params.set('idHistorialDemeritoYDesgasteEquipoIngeniero', idHistorialDemeritoYDesgasteEquipoIngeniero.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/historialesDemeritosYDesgastesEquiposIngenieros/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as HistorialDemerDesgastEquipIngI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentDemeritAndWearHistory(historial: HistorialDemerDesgastEquipIngI): Observable<HistorialDemerDesgastEquipIngMsj> {
    return this.http.post<HistorialDemerDesgastEquipIngMsj>(`${this.baseUrl}/historialesDemeritosYDesgastesEquiposIngenieros`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentDemeritAndWearHistorybyId(idHistorialDemeritoYDesgasteEquipoIngeniero: number): Observable<ResponseHistorialDemeritoYDesgasteEquipoIngenieroDTO> {
    return this.http.get<ResponseHistorialDemeritoYDesgasteEquipoIngenieroDTO>(`${this.baseUrl}/historialesDemeritosYDesgastesEquiposIngenieros/${idHistorialDemeritoYDesgasteEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO (CAMPO ÚNICO; ESTE CONTROLADOR LO RECIBE EN LA RUTA, NO COMO QUERY PARAM).
  getEngineerEquipmentDemeritAndWearHistorybyNumeroRegistro(numRegHistorialDemeritoYDesgasteEquipoIngeniero: String): Observable<ResponseHistorialDemeritoYDesgasteEquipoIngenieroDTO> {
    return this.http.get<ResponseHistorialDemeritoYDesgasteEquipoIngenieroDTO>(`${this.baseUrl}/historialesDemeritosYDesgastesEquiposIngenieros/numeroRegistro/${encodeURIComponent(numRegHistorialDemeritoYDesgasteEquipoIngeniero.toString())}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentDemeritAndWearHistory(historial: HistorialDemerDesgastEquipIngI): Observable<HistorialDemerDesgastEquipIngMsj> {
    return this.http.put<HistorialDemerDesgastEquipIngMsj>(`${this.baseUrl}/historialesDemeritosYDesgastesEquiposIngenieros`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentDemeritAndWearHistory(idHistorialDemeritoYDesgasteEquipoIngeniero: number): Observable<HistorialDemerDesgastEquipIngMsj> {
    return this.http.delete<HistorialDemerDesgastEquipIngMsj>(`${this.baseUrl}/historialesDemeritosYDesgastesEquiposIngenieros/${idHistorialDemeritoYDesgasteEquipoIngeniero}`);
  }

}
