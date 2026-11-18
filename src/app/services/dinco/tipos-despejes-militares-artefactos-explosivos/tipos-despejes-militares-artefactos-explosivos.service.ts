import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TiposDespejesMilitaresArtefactosExplosivosI, TiposDespejesMilitaresArtefactosExplosivosMsj } from '../../../interfaces/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';
import { ResponseTipoDespejeMilitarArtefactoExplosivoDTO } from '../../../interfaces/dinco/tipos-despejes-militares-artefactos-explosivos/responseTipoDespejeMilitarArtefactoExplosivoDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposDespejesMilitaresArtefactosExplosivosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idTipoDespejeMilitarArtefactoExplosivo?: number, keyword?: String): Observable<number> {
    let params = new HttpParams();
    if (idTipoDespejeMilitarArtefactoExplosivo !== undefined) params = params.set('idTipoDespejeMilitarArtefactoExplosivo', idTipoDespejeMilitarArtefactoExplosivo.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    return this.http.get<number>(`${this.baseUrl}/tiposDespejesMilitaresArtefactosExplosivos/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTypesOfMilitaryClearanceOfExplosiveDevices(idTipoDespejeMilitarArtefactoExplosivo?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<TiposDespejesMilitaresArtefactosExplosivosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idTipoDespejeMilitarArtefactoExplosivo !== undefined) params = params.set('idTipoDespejeMilitarArtefactoExplosivo', idTipoDespejeMilitarArtefactoExplosivo.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<TiposDespejesMilitaresArtefactosExplosivosI[]>(`${this.baseUrl}/tiposDespejesMilitaresArtefactosExplosivos/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTypesOfMilitaryClearanceOfExplosiveDevicesPag(page: number = 0, size: number = 10, idTipoDespejeMilitarArtefactoExplosivo?: number, keyword?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<TiposDespejesMilitaresArtefactosExplosivosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idTipoDespejeMilitarArtefactoExplosivo !== undefined) params = params.set('idTipoDespejeMilitarArtefactoExplosivo', idTipoDespejeMilitarArtefactoExplosivo.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/tiposDespejesMilitaresArtefactosExplosivos/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as TiposDespejesMilitaresArtefactosExplosivosI[])
    );
  }

  //CREAR REGISTRO.
  addTypeOfMilitaryClearanceOfExplosiveDevice(tipoDespejeMilitarArtefactoExplosivo: TiposDespejesMilitaresArtefactosExplosivosI): Observable<TiposDespejesMilitaresArtefactosExplosivosMsj> {
    return this.http.post<TiposDespejesMilitaresArtefactosExplosivosMsj>(`${this.baseUrl}/tiposDespejesMilitaresArtefactosExplosivos`, tipoDespejeMilitarArtefactoExplosivo);
  }

  //CONSULTAR REGISTRO POR ID.
  getTypeOfMilitaryClearanceOfExplosiveDevicebyId(idTipoDespejeMilitarArtefactoExplosivo: number): Observable<ResponseTipoDespejeMilitarArtefactoExplosivoDTO> {
    return this.http.get<ResponseTipoDespejeMilitarArtefactoExplosivoDTO>(`${this.baseUrl}/tiposDespejesMilitaresArtefactosExplosivos/${idTipoDespejeMilitarArtefactoExplosivo}`);
  }

  //CONSULTAR REGISTRO POR NOMBRE.
  getTypeOfMilitaryClearanceOfExplosiveDevicebyNombre(nombreTipoDespejeMilitarArtefactoExplosivo: String): Observable<ResponseTipoDespejeMilitarArtefactoExplosivoDTO> {
    return this.http.get<ResponseTipoDespejeMilitarArtefactoExplosivoDTO>(`${this.baseUrl}/tiposDespejesMilitaresArtefactosExplosivos/nombre/${nombreTipoDespejeMilitarArtefactoExplosivo}`);
  }

  //MODIFICAR REGISTRO.
  updateTypeOfMilitaryClearanceOfExplosiveDevice(tipoDespejeMilitarArtefactoExplosivo: TiposDespejesMilitaresArtefactosExplosivosI): Observable<TiposDespejesMilitaresArtefactosExplosivosMsj> {
    return this.http.put<TiposDespejesMilitaresArtefactosExplosivosMsj>(`${this.baseUrl}/tiposDespejesMilitaresArtefactosExplosivos`, tipoDespejeMilitarArtefactoExplosivo);
  }

  //ELIMINAR REGISTRO.
  deleteTypeOfMilitaryClearanceOfExplosiveDevice(idTipoDespejeMilitarArtefactoExplosivo: number): Observable<TiposDespejesMilitaresArtefactosExplosivosMsj> {
    return this.http.delete<TiposDespejesMilitaresArtefactosExplosivosMsj>(`${this.baseUrl}/tiposDespejesMilitaresArtefactosExplosivos/${idTipoDespejeMilitarArtefactoExplosivo}`);
  }

}
