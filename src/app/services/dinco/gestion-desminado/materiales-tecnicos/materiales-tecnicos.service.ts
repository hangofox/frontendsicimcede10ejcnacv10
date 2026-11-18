import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MaterialesTecnicosI, MaterialesTecnicosMsj } from '../../../../interfaces/dinco/gestion-desminado/materiales-tecnicos/materiales-tecnicos.interface';
import { ResponseMaterialTecnicoDTO } from '../../../../interfaces/dinco/gestion-desminado/materiales-tecnicos/responseMaterialTecnicoDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialesTecnicosService {

  //SI EL PROYECTO SE DESPLIEGA EN DESARROLLO ASIGNA LA IP DEL SERVIDOR DE DESARROLLO, SI EL PROYECTO SE DESPLIEGA EN PRUEBAS O PRODUCCIÓN TRAE LA IP DEL SERVIDOR DE PRUEBAS O PRODUCCIÓN:
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idMaterialTecnico?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, nombreTipoDespejeMilitarArtefactoExplosivo?: String): Observable<number> {
    let params = new HttpParams();
    if (idMaterialTecnico !== undefined) params = params.set('idMaterialTecnico', idMaterialTecnico.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (nombreTipoDespejeMilitarArtefactoExplosivo) params = params.set('nombreTipoDespejeMilitarArtefactoExplosivo', nombreTipoDespejeMilitarArtefactoExplosivo.toString());
    return this.http.get<number>(`${this.baseUrl}/materialesTecnicos/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllTechnicalMaterials(idMaterialTecnico?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, nombreTipoDespejeMilitarArtefactoExplosivo?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<MaterialesTecnicosI[]> {
    let params = new HttpParams().set('orderMode', orderMode.toString());
    if (idMaterialTecnico !== undefined) params = params.set('idMaterialTecnico', idMaterialTecnico.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (nombreTipoDespejeMilitarArtefactoExplosivo) params = params.set('nombreTipoDespejeMilitarArtefactoExplosivo', nombreTipoDespejeMilitarArtefactoExplosivo.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<MaterialesTecnicosI[]>(`${this.baseUrl}/materialesTecnicos/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllTechnicalMaterialsPag(page: number = 0, size: number = 10, idMaterialTecnico?: number, keyword?: String, siglaoAcronimoUnidadMilitar?: String, nombreTipoDespejeMilitarArtefactoExplosivo?: String, orderBy?: String, orderMode: String = 'ASC'): Observable<MaterialesTecnicosI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode.toString());
    if (idMaterialTecnico !== undefined) params = params.set('idMaterialTecnico', idMaterialTecnico.toString());
    if (keyword) params = params.set('keyword', keyword.toString());
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar.toString());
    if (nombreTipoDespejeMilitarArtefactoExplosivo) params = params.set('nombreTipoDespejeMilitarArtefactoExplosivo', nombreTipoDespejeMilitarArtefactoExplosivo.toString());
    if (orderBy) params = params.set('orderBy', orderBy.toString());
    return this.http.get<any>(`${this.baseUrl}/materialesTecnicos/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as MaterialesTecnicosI[])
    );
  }

  //CREAR REGISTRO.
  addTechnicalMaterial(materialTecnico: MaterialesTecnicosI): Observable<MaterialesTecnicosMsj> {
    return this.http.post<MaterialesTecnicosMsj>(`${this.baseUrl}/materialesTecnicos`, materialTecnico);
  }

  //CONSULTAR REGISTRO POR ID.
  getTechnicalMaterialbyId(idMaterialTecnico: number): Observable<ResponseMaterialTecnicoDTO> {
    return this.http.get<ResponseMaterialTecnicoDTO>(`${this.baseUrl}/materialesTecnicos/${idMaterialTecnico}`);
  }

  //CONSULTAR REGISTRO POR CAMPOS ÚNICOS COMBINADOS (N.° DE INVENTARIO Y/O N.° DE ACTIVO FIJO).
  getTechnicalMaterialbyNumero(numeroInventarioMaterialTecnico?: String, numeroActivoFijoMaterialTecnico?: String): Observable<ResponseMaterialTecnicoDTO> {
    let params = new HttpParams();
    if (numeroInventarioMaterialTecnico) params = params.set('numeroInventarioMaterialTecnico', numeroInventarioMaterialTecnico.toString());
    if (numeroActivoFijoMaterialTecnico) params = params.set('numeroActivoFijoMaterialTecnico', numeroActivoFijoMaterialTecnico.toString());
    return this.http.get<ResponseMaterialTecnicoDTO>(`${this.baseUrl}/materialesTecnicos/numero`, { params });
  }

  //MODIFICAR REGISTRO.
  updateTechnicalMaterial(materialTecnico: MaterialesTecnicosI): Observable<MaterialesTecnicosMsj> {
    return this.http.put<MaterialesTecnicosMsj>(`${this.baseUrl}/materialesTecnicos`, materialTecnico);
  }

  //ELIMINAR REGISTRO.
  deleteTechnicalMaterial(idMaterialTecnico: number): Observable<MaterialesTecnicosMsj> {
    return this.http.delete<MaterialesTecnicosMsj>(`${this.baseUrl}/materialesTecnicos/${idMaterialTecnico}`);
  }

}
