import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CentrosCostosUnidadesMilitaresI, CentrosCostosUnidadesMilitaresMsj } from '../../../../interfaces/panel-control/unidades-militares/centros-costos-unidades-militares/centros-costos-unidades-militares.interface';
import { ResponseCentroCostoUnidadMilitarDTO } from '../../../../interfaces/panel-control/unidades-militares/centros-costos-unidades-militares/responseCentroCostoUnidadMilitarDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CentrosCostosUnidadesMilitaresService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR CORRESPONDIENTE:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idCentroCostoUnidadMilitar?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String): Observable<number> {
    let params = new HttpParams();
    if (idCentroCostoUnidadMilitar !== undefined) params = params.set('idCentroCostoUnidadMilitar', idCentroCostoUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    return this.http.get<number>(`${this.baseUrl}/centrosCostosUnidadesMilitares/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllMilitaryUnitCostCenters(idCentroCostoUnidadMilitar?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CentrosCostosUnidadesMilitaresI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idCentroCostoUnidadMilitar !== undefined) params = params.set('idCentroCostoUnidadMilitar', idCentroCostoUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<CentrosCostosUnidadesMilitaresI[]>(`${this.baseUrl}/centrosCostosUnidadesMilitares/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllMilitaryUnitCostCentersPag(page: number = 0, size: number = 10, idCentroCostoUnidadMilitar?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<CentrosCostosUnidadesMilitaresI[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderMode', orderMode.toString());
    if (idCentroCostoUnidadMilitar !== undefined) params = params.set('idCentroCostoUnidadMilitar', idCentroCostoUnidadMilitar.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/centrosCostosUnidadesMilitares/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as CentrosCostosUnidadesMilitaresI[])
    );
  }

  //CREAR REGISTRO.
  addMilitaryUnitCostCenter(centroCostoUnidadMilitar: CentrosCostosUnidadesMilitaresI): Observable<CentrosCostosUnidadesMilitaresMsj> {
    return this.http.post<CentrosCostosUnidadesMilitaresMsj>(`${this.baseUrl}/centrosCostosUnidadesMilitares`, centroCostoUnidadMilitar);
  }

  //CONSULTAR REGISTRO POR ID.
  getMilitaryUnitCostCenterbyId(idCentroCostoUnidadMilitar: number): Observable<ResponseCentroCostoUnidadMilitarDTO> {
    return this.http.get<ResponseCentroCostoUnidadMilitarDTO>(`${this.baseUrl}/centrosCostosUnidadesMilitares/${idCentroCostoUnidadMilitar}`);
  }

  //CONSULTAR REGISTRO POR CENTRO DE COSTO Y SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR.
  getMilitaryUnitCostCenterbyCentroCostoySiglaoAcronimoUnidadMilitar(centroCostoUnidadMilitar: String, siglaoAcronimoUnidadMilitar: String): Observable<ResponseCentroCostoUnidadMilitarDTO> {
    return this.http.get<ResponseCentroCostoUnidadMilitarDTO>(`${this.baseUrl}/centrosCostosUnidadesMilitares/centroCosto/${centroCostoUnidadMilitar}/${siglaoAcronimoUnidadMilitar}`);
  }

  //MODIFICAR REGISTRO.
  updateMilitaryUnitCostCenter(centroCostoUnidadMilitar: CentrosCostosUnidadesMilitaresI): Observable<CentrosCostosUnidadesMilitaresMsj> {
    return this.http.put<CentrosCostosUnidadesMilitaresMsj>(`${this.baseUrl}/centrosCostosUnidadesMilitares`, centroCostoUnidadMilitar);
  }

  //ELIMINAR REGISTRO.
  deleteMilitaryUnitCostCenter(idCentroCostoUnidadMilitar: number): Observable<CentrosCostosUnidadesMilitaresMsj> {
    return this.http.delete<CentrosCostosUnidadesMilitaresMsj>(`${this.baseUrl}/centrosCostosUnidadesMilitares/${idCentroCostoUnidadMilitar}`);
  }
}
