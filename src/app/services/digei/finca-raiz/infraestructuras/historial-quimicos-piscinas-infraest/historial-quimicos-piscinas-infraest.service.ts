import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HistorialQuimicosPiscinasInfraestI, HistorialQuimicosPiscinasInfraestMsj } from '../../../../../interfaces/digei/finca-raiz/infraestructuras/historial-quimicos-piscinas-infraest/historial-quimicos-piscinas-infraest.interface';
import { ResponseHistorialQuimicoPiscinaInfraestDTO } from '../../../../../interfaces/digei/finca-raiz/infraestructuras/historial-quimicos-piscinas-infraest/responseHistorialQuimicoPiscinaInfraestDTO.interface';

@Injectable({ providedIn: 'root' })
export class HistorialQuimicosPiscinasInfraestService {

  //IP DEL SERVIDOR SEGÚN EL ENTORNO EN EL QUE SE DESPLIEGUE EL PROYECTO:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADOR DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialQuimicoPiscinaInfraest?: number, keyword?: string, idInfraestructura?: number): Observable<number> {
    let params = new HttpParams();
    if (idHistorialQuimicoPiscinaInfraest !== undefined) params = params.set('idHistorialQuimicoPiscinaInfraest', idHistorialQuimicoPiscinaInfraest.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (idInfraestructura !== undefined) params = params.set('idInfraestructura', idInfraestructura.toString());
    return this.http.get<number>(`${this.baseUrl}/historialesQuimicosPiscinasInfraest/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllHistoriales(idHistorialQuimicoPiscinaInfraest?: number, keyword?: string, idInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialQuimicosPiscinasInfraestI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialQuimicoPiscinaInfraest !== undefined) params = params.set('idHistorialQuimicoPiscinaInfraest', idHistorialQuimicoPiscinaInfraest.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (idInfraestructura !== undefined) params = params.set('idInfraestructura', idInfraestructura.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialQuimicosPiscinasInfraestI[]>(`${this.baseUrl}/historialesQuimicosPiscinasInfraest/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllHistorialesPag(page: number = 0, size: number = 10, idHistorialQuimicoPiscinaInfraest?: number, keyword?: string, idInfraestructura?: number, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialQuimicosPiscinasInfraestI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialQuimicoPiscinaInfraest !== undefined) params = params.set('idHistorialQuimicoPiscinaInfraest', idHistorialQuimicoPiscinaInfraest.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (idInfraestructura !== undefined) params = params.set('idInfraestructura', idInfraestructura.toString());
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesQuimicosPiscinasInfraest/listaPag`, { params }).pipe(map(slice => slice.content as HistorialQuimicosPiscinasInfraestI[]));
  }

  //CREAR REGISTRO.
  addHistorial(historial: HistorialQuimicosPiscinasInfraestI): Observable<HistorialQuimicosPiscinasInfraestMsj> {
    return this.http.post<HistorialQuimicosPiscinasInfraestMsj>(`${this.baseUrl}/historialesQuimicosPiscinasInfraest`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getHistorialbyId(id: number): Observable<ResponseHistorialQuimicoPiscinaInfraestDTO> {
    return this.http.get<ResponseHistorialQuimicoPiscinaInfraestDTO>(`${this.baseUrl}/historialesQuimicosPiscinasInfraest/${id}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO.
  getHistorialbyNumeroRegistro(numeroRegistro: string): Observable<ResponseHistorialQuimicoPiscinaInfraestDTO> {
    return this.http.get<ResponseHistorialQuimicoPiscinaInfraestDTO>(`${this.baseUrl}/historialesQuimicosPiscinasInfraest/numeroRegistro/${numeroRegistro}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getHistorialbyNombre(nombre?: string): Observable<ResponseHistorialQuimicoPiscinaInfraestDTO> {
    let params = new HttpParams();
    if (nombre) params = params.set('nombreHistorialQuimicoPiscinaInfraest', nombre);
    return this.http.get<ResponseHistorialQuimicoPiscinaInfraestDTO>(`${this.baseUrl}/historialesQuimicosPiscinasInfraest/nombre`, { params });
  }

  //MODIFICAR REGISTRO.
  updateHistorial(historial: HistorialQuimicosPiscinasInfraestI): Observable<HistorialQuimicosPiscinasInfraestMsj> {
    return this.http.put<HistorialQuimicosPiscinasInfraestMsj>(`${this.baseUrl}/historialesQuimicosPiscinasInfraest`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteHistorial(id: number): Observable<HistorialQuimicosPiscinasInfraestMsj> {
    return this.http.delete<HistorialQuimicosPiscinasInfraestMsj>(`${this.baseUrl}/historialesQuimicosPiscinasInfraest/${id}`);
  }
}
