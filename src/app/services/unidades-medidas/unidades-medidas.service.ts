import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseUnidadMedidaDTO } from '../../interfaces/unidades-medidas/responseUnidadMedidaDTO.interface';
import { UnidadesMedidasI, UnidadesMedidasMsj } from '../../interfaces/unidades-medidas/unidades-medidas.interface';

@Injectable({
  providedIn: 'root'
})
export class UnidadesMedidasService {

  //IP DEL SERVIDOR SEGÚN EL ENTORNO EN EL QUE SE DESPLIEGUE EL PROYECTO:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTAR TOTAL DE REGISTROS FILTRADOS:
  findCountTotalRegisters(keyword?: string): Observable<number> {
    let params = new HttpParams();
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<number>(`${this.baseUrl}/unidadesMedidas/count`, { params });
  }

  //LISTAR REGISTROS FILTRADOS SIN PAGINACIÓN:
  findAllUnitsOfMeasurement(keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<UnidadesMedidasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<UnidadesMedidasI[]>(`${this.baseUrl}/unidadesMedidas/lista`, { params });
  }

  //LISTAR REGISTROS FILTRADOS CON PAGINACIÓN:
  findAllUnitsOfMeasurementPag(page: number = 0, size: number = 10, keyword?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<UnidadesMedidasI[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode);
    if (keyword) params = params.set('keyword', keyword);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<{ content: UnidadesMedidasI[] }>(`${this.baseUrl}/unidadesMedidas/listaPag`, { params }).pipe(
      map(slice => slice.content)
    );
  }

  //CREAR REGISTRO:
  addUnitOfMeasurement(unidadMedida: UnidadesMedidasI): Observable<UnidadesMedidasMsj> {
    return this.http.post<UnidadesMedidasMsj>(`${this.baseUrl}/unidadesMedidas`, unidadMedida);
  }

  //CONSULTAR REGISTRO POR ID:
  getUnitOfMeasurementbyId(idUnidadMedida: number): Observable<ResponseUnidadMedidaDTO> {
    return this.http.get<ResponseUnidadMedidaDTO>(`${this.baseUrl}/unidadesMedidas/${idUnidadMedida}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE:
  getUnitOfMeasurementbyNombre(nombreUnidadMedida: string): Observable<ResponseUnidadMedidaDTO> {
    return this.http.get<ResponseUnidadMedidaDTO>(`${this.baseUrl}/unidadesMedidas/nombre/${encodeURIComponent(nombreUnidadMedida)}`);
  }

  //MODIFICAR REGISTRO:
  updateUnitOfMeasurement(unidadMedida: UnidadesMedidasI): Observable<UnidadesMedidasMsj> {
    return this.http.put<UnidadesMedidasMsj>(`${this.baseUrl}/unidadesMedidas`, unidadMedida);
  }

  //ELIMINAR REGISTRO:
  deleteUnitOfMeasurement(idUnidadMedida: number): Observable<UnidadesMedidasMsj> {
    return this.http.delete<UnidadesMedidasMsj>(`${this.baseUrl}/unidadesMedidas/${idUnidadMedida}`);
  }
}
