import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CentrosCostosOficinasI, CentrosCostosOficinasMsj } from '../../../../interfaces/panel-control/oficinas/centros-costos-oficinas/centros-costos-oficinas.interface';
import { ResponseCentroCostoOficinaDTO } from '../../../../interfaces/panel-control/oficinas/centros-costos-oficinas/responseCentroCostoOficinaDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CentrosCostosOficinasService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR CORRESPONDIENTE:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idCentroCostoOficina?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, nombreOficina?: String): Observable<number> {
    let params = new HttpParams();
    if (idCentroCostoOficina !== undefined) params = params.set('idCentroCostoOficina', idCentroCostoOficina.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (nombreOficina) params = params.set('nombreOficina', nombreOficina.toString());
    return this.http.get<number>(`${this.baseUrl}/centrosCostosOficinas/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllCentrosCostosOficinas(idCentroCostoOficina?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, nombreOficina?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CentrosCostosOficinasI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idCentroCostoOficina !== undefined) params = params.set('idCentroCostoOficina', idCentroCostoOficina.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (nombreOficina) params = params.set('nombreOficina', nombreOficina.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<CentrosCostosOficinasI[]>(`${this.baseUrl}/centrosCostosOficinas/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllCentrosCostosOficinasPag(page: number = 0, size: number = 10, idCentroCostoOficina?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, nombreOficina?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CentrosCostosOficinasI[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode.toString());
    if (idCentroCostoOficina !== undefined) params = params.set('idCentroCostoOficina', idCentroCostoOficina.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (nombreOficina) params = params.set('nombreOficina', nombreOficina.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/centrosCostosOficinas/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as CentrosCostosOficinasI[])
    );
  }

  //CREAR REGISTRO.
  addCentroCostoOficina(centroCostoOficina: CentrosCostosOficinasI): Observable<CentrosCostosOficinasMsj> {
    return this.http.post<CentrosCostosOficinasMsj>(`${this.baseUrl}/centrosCostosOficinas`, centroCostoOficina);
  }

  //CONSULTAR REGISTRO POR ID.
  getCentroCostoOficinabyId(idCentroCostoOficina: number): Observable<ResponseCentroCostoOficinaDTO> {
    return this.http.get<ResponseCentroCostoOficinaDTO>(`${this.baseUrl}/centrosCostosOficinas/${idCentroCostoOficina}`);
  }

  //CONSULTAR REGISTRO POR CENTRO DE COSTO Y NOMBRE DE LA OFICINA.
  getCentroCostoOficinabyCentroCostoyNombreOficina(centroCostoOficina: String, nombreOficina: String): Observable<ResponseCentroCostoOficinaDTO> {
    return this.http.get<ResponseCentroCostoOficinaDTO>(`${this.baseUrl}/centrosCostosOficinas/centroCosto/${centroCostoOficina}/${nombreOficina}`);
  }

  //MODIFICAR REGISTRO.
  updateCentroCostoOficina(centroCostoOficina: CentrosCostosOficinasI): Observable<CentrosCostosOficinasMsj> {
    return this.http.put<CentrosCostosOficinasMsj>(`${this.baseUrl}/centrosCostosOficinas`, centroCostoOficina);
  }

  //ELIMINAR REGISTRO.
  deleteCentroCostoOficina(idCentroCostoOficina: number): Observable<CentrosCostosOficinasMsj> {
    return this.http.delete<CentrosCostosOficinasMsj>(`${this.baseUrl}/centrosCostosOficinas/${idCentroCostoOficina}`);
  }
}
