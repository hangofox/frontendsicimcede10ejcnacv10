import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HistorialResponsablesInfraestI, HistorialResponsablesInfraestMsj } from '../../../../../interfaces/digei/finca-raiz/infraestructuras/historial-responsables-infraest/historial-responsables-infraest.interface';
import { ResponseHistorialResponsableInfraestDTO } from '../../../../../interfaces/digei/finca-raiz/infraestructuras/historial-responsables-infraest/responseHistorialResponsableInfraestDTO.interface';

@Injectable({ providedIn: 'root' })
export class HistorialResponsablesInfraestService {

  //IP DEL SERVIDOR SEGÚN EL ENTORNO EN EL QUE SE DESPLIEGUE EL PROYECTO:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADOR DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idHistorialResponsableInfraestructura?: number, keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (idHistorialResponsableInfraestructura !== undefined) params = params.set('idHistorialResponsableInfraestructura', idHistorialResponsableInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/historialesResponsablesInfraestructuras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllInfrastructureResponsibleHistories(idHistorialResponsableInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialResponsablesInfraestI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idHistorialResponsableInfraestructura !== undefined) params = params.set('idHistorialResponsableInfraestructura', idHistorialResponsableInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<HistorialResponsablesInfraestI[]>(`${this.baseUrl}/historialesResponsablesInfraestructuras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllInfrastructureResponsibleHistoriesPag(page: number = 0, size: number = 10, idHistorialResponsableInfraestructura?: number, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<HistorialResponsablesInfraestI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idHistorialResponsableInfraestructura !== undefined) params = params.set('idHistorialResponsableInfraestructura', idHistorialResponsableInfraestructura.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/historialesResponsablesInfraestructuras/listaPag`, { params }).pipe(map(slice => slice.content as HistorialResponsablesInfraestI[]));
  }

  //CREAR REGISTRO.
  addInfrastructureResponsibleHistory(historial: HistorialResponsablesInfraestI): Observable<HistorialResponsablesInfraestMsj> {
    return this.http.post<HistorialResponsablesInfraestMsj>(`${this.baseUrl}/historialesResponsablesInfraestructuras`, historial);
  }

  //CONSULTAR REGISTRO POR ID.
  getInfrastructureResponsibleHistorybyId(id: number): Observable<ResponseHistorialResponsableInfraestDTO> {
    return this.http.get<ResponseHistorialResponsableInfraestDTO>(`${this.baseUrl}/historialesResponsablesInfraestructuras/${id}`);
  }

  //CONSULTAR REGISTRO POR NÚMERO DE REGISTRO.
  getInfrastructureResponsibleHistorybyNumeroRegistro(numeroRegistro: string): Observable<ResponseHistorialResponsableInfraestDTO> {
    return this.http.get<ResponseHistorialResponsableInfraestDTO>(`${this.baseUrl}/historialesResponsablesInfraestructuras/numeroRegistro/${numeroRegistro}`);
  }

  //MODIFICAR REGISTRO.
  updateInfrastructureResponsibleHistory(historial: HistorialResponsablesInfraestI): Observable<HistorialResponsablesInfraestMsj> {
    return this.http.put<HistorialResponsablesInfraestMsj>(`${this.baseUrl}/historialesResponsablesInfraestructuras`, historial);
  }

  //ELIMINAR REGISTRO.
  deleteInfrastructureResponsibleHistory(id: number): Observable<HistorialResponsablesInfraestMsj> {
    return this.http.delete<HistorialResponsablesInfraestMsj>(`${this.baseUrl}/historialesResponsablesInfraestructuras/${id}`);
  }
}
