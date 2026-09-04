import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseSociedadUnidadCentralizadoraDTO } from '../../../interfaces/panel-control/sociedades-unidades-centralizadoras/responseSociedadUnidadCentralizadoraDTO.interface';
import { SociedadesUnidadesCentralizadorasI, SociedadesUnidadesCentralizadorasMsj } from '../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';

@Injectable({
  providedIn: 'root'
})
export class SociedadesUnidadesCentralizadorasService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //CONTADORES DE REGISTROS FILTRADOS.
  findCountTotalRegisters(idSociedadUnidadCentralizadora?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string): Observable<number> {
    let params = new HttpParams();
    if (idSociedadUnidadCentralizadora !== undefined) params = params.set('idSociedadUnidadCentralizadora', idSociedadUnidadCentralizadora.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    return this.http.get<number>(`${this.baseUrl}/sociedadesUnidadesCentralizadoras/count`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
  findAllSociedadesUnidadesCentralizadoras(idSociedadUnidadCentralizadora?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<SociedadesUnidadesCentralizadorasI[]> {
    let params = new HttpParams().set('orderMode', orderMode);
    if (idSociedadUnidadCentralizadora !== undefined) params = params.set('idSociedadUnidadCentralizadora', idSociedadUnidadCentralizadora.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<SociedadesUnidadesCentralizadorasI[]>(`${this.baseUrl}/sociedadesUnidadesCentralizadoras/lista`, { params });
  }

  //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
  findAllSociedadesUnidadesCentralizadorasPag(page: number = 0, size: number = 10, idSociedadUnidadCentralizadora?: number, keyword?: string, siglaoAcronimoUnidadMilitar?: string, orderBy?: string, orderMode: string = 'ASC'): Observable<SociedadesUnidadesCentralizadorasI[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('orderMode', orderMode);
    if (idSociedadUnidadCentralizadora !== undefined) params = params.set('idSociedadUnidadCentralizadora', idSociedadUnidadCentralizadora.toString());
    if (keyword) params = params.set('keyword', keyword);
    if (siglaoAcronimoUnidadMilitar) params = params.set('siglaoAcronimoUnidadMilitar', siglaoAcronimoUnidadMilitar);
    if (orderBy) params = params.set('orderBy', orderBy);
    return this.http.get<any>(`${this.baseUrl}/sociedadesUnidadesCentralizadoras/listaPag`, { params }).pipe(
      map((slice: any) => slice.content as SociedadesUnidadesCentralizadorasI[])
    );
  }

  //CREAR REGISTRO.
  addSociedadUnidadCentralizadora(sociedadUnidadCentralizadora: SociedadesUnidadesCentralizadorasI): Observable<SociedadesUnidadesCentralizadorasMsj> {
    return this.http.post<SociedadesUnidadesCentralizadorasMsj>(`${this.baseUrl}/sociedadesUnidadesCentralizadoras`, sociedadUnidadCentralizadora);
  }

  //CONSULTAR REGISTRO POR ID.
  getSociedadUnidadCentralizadorabyId(idSociedadUnidadCentralizadora: number): Observable<ResponseSociedadUnidadCentralizadoraDTO> {
    return this.http.get<ResponseSociedadUnidadCentralizadoraDTO>(`${this.baseUrl}/sociedadesUnidadesCentralizadoras/${idSociedadUnidadCentralizadora}`);
  }

  //CONSULTAR REGISTRO POR CÓDIGO.
  getSociedadUnidadCentralizadorabyCodigo(codigoSociedadUnidadCentralizadora: string): Observable<ResponseSociedadUnidadCentralizadoraDTO> {
    const params = new HttpParams().set('codigoSociedadUnidadCentralizadora', codigoSociedadUnidadCentralizadora);
    return this.http.get<ResponseSociedadUnidadCentralizadoraDTO>(`${this.baseUrl}/sociedadesUnidadesCentralizadoras/codigo`, { params });
  }

  //MODIFICAR REGISTRO.
  updateSociedadUnidadCentralizadora(sociedadUnidadCentralizadora: SociedadesUnidadesCentralizadorasI): Observable<SociedadesUnidadesCentralizadorasMsj> {
    return this.http.put<SociedadesUnidadesCentralizadorasMsj>(`${this.baseUrl}/sociedadesUnidadesCentralizadoras`, sociedadUnidadCentralizadora);
  }

  //ELIMINAR REGISTRO.
  deleteSociedadUnidadCentralizadora(idSociedadUnidadCentralizadora: number): Observable<SociedadesUnidadesCentralizadorasMsj> {
    return this.http.delete<SociedadesUnidadesCentralizadorasMsj>(`${this.baseUrl}/sociedadesUnidadesCentralizadoras/${idSociedadUnidadCentralizadora}`);
  }

}
