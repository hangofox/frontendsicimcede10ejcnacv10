import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EstadosDiagnosticosEquiposIngenierosI, EstadosDiagnosticosEquiposIngenierosMsj } from '../../../interfaces/dinco/estados-diagnosticos-equipos-ingenieros/estados-diagnosticos-equipos-ingenieros.interface';
import { ResponseEstadoDiagnosticoEquipoIngenieroDTO } from '../../../interfaces/dinco/estados-diagnosticos-equipos-ingenieros/responseEstadoDiagnosticoEquipoIngenieroDTO.interface';

//SERVICE DE ESTADOS DE DIAGNÓSTICOS DE EQUIPOS DE INGENIEROS (CATÁLOGO DE DINCO; ENDPOINT /estadosDiagnosticosEquiposIngenieros).
//EL CONTROLADOR NO TIENE /count NI PALABRA CLAVE, Y SU LISTADO PAGINADO ESTÁ EN LA RAÍZ DEL ENDPOINT (NO EN /listaPag).
@Injectable({
  providedIn: 'root'
})
export class EstadosDiagnosticosEquiposIngenierosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllEngineerEquipmentDiagnosticStates(idEstadoDiagnosticoEquipoIngeniero?: number, orderBy?: String, orderMode: String = 'ASC'): Observable<EstadosDiagnosticosEquiposIngenierosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idEstadoDiagnosticoEquipoIngeniero !== undefined) params = params.set('idEstadoDiagnosticoEquipoIngeniero', idEstadoDiagnosticoEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<EstadosDiagnosticosEquiposIngenierosI[]>(`${this.baseUrl}/estadosDiagnosticosEquiposIngenieros/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllEngineerEquipmentDiagnosticStatesPag(page: number = 0, size: number = 10, idEstadoDiagnosticoEquipoIngeniero?: number, orderBy?: String, orderMode: String = 'ASC'): Observable<EstadosDiagnosticosEquiposIngenierosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idEstadoDiagnosticoEquipoIngeniero !== undefined) params = params.set('idEstadoDiagnosticoEquipoIngeniero', idEstadoDiagnosticoEquipoIngeniero.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/estadosDiagnosticosEquiposIngenieros`, { params }).pipe(
      map((slice: any) => slice.content as EstadosDiagnosticosEquiposIngenierosI[])
    );
  }

  //CREAR REGISTRO.
  addEngineerEquipmentDiagnosticState(registro: EstadosDiagnosticosEquiposIngenierosI): Observable<EstadosDiagnosticosEquiposIngenierosMsj> {
    return this.http.post<EstadosDiagnosticosEquiposIngenierosMsj>(`${this.baseUrl}/estadosDiagnosticosEquiposIngenieros`, registro);
  }

  //CONSULTAR REGISTRO POR ID.
  getEngineerEquipmentDiagnosticStatebyId(idEstadoDiagnosticoEquipoIngeniero: number): Observable<ResponseEstadoDiagnosticoEquipoIngenieroDTO> {
    return this.http.get<ResponseEstadoDiagnosticoEquipoIngenieroDTO>(`${this.baseUrl}/estadosDiagnosticosEquiposIngenieros/${idEstadoDiagnosticoEquipoIngeniero}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getEngineerEquipmentDiagnosticStatebyNombre(nombreEstadoDiagnosticoEquipoIngeniero: String): Observable<ResponseEstadoDiagnosticoEquipoIngenieroDTO> {
    return this.http.get<ResponseEstadoDiagnosticoEquipoIngenieroDTO>(`${this.baseUrl}/estadosDiagnosticosEquiposIngenieros/nombre/${encodeURIComponent(nombreEstadoDiagnosticoEquipoIngeniero.toString())}`);
  }

  //MODIFICAR REGISTRO.
  updateEngineerEquipmentDiagnosticState(registro: EstadosDiagnosticosEquiposIngenierosI): Observable<EstadosDiagnosticosEquiposIngenierosMsj> {
    return this.http.put<EstadosDiagnosticosEquiposIngenierosMsj>(`${this.baseUrl}/estadosDiagnosticosEquiposIngenieros`, registro);
  }

  //ELIMINAR REGISTRO.
  deleteEngineerEquipmentDiagnosticState(idEstadoDiagnosticoEquipoIngeniero: number): Observable<EstadosDiagnosticosEquiposIngenierosMsj> {
    return this.http.delete<EstadosDiagnosticosEquiposIngenierosMsj>(`${this.baseUrl}/estadosDiagnosticosEquiposIngenieros/${idEstadoDiagnosticoEquipoIngeniero}`);
  }

}
