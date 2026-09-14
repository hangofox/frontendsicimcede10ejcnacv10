import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InfraestructurasArrendadasI, InfraestructurasArrendadasMsj } from '../../../../interfaces/digei/finca-raiz/infraestructuras-arrendadas/infraestructuras-arrendadas.interface';
import { ResponseInfraestructuraArrendadaDTO } from '../../../../interfaces/digei/finca-raiz/infraestructuras-arrendadas/responseInfraestructuraArrendadaDTO.interface';

@Injectable({ providedIn: 'root' })
export class InfraestructurasArrendadasService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private readonly http: HttpClient) {}
  findCountTotalRegisters(id?: number, keyword?: string): Observable<number> { return this.http.get<number>(`${this.baseUrl}/infraestructurasArrendadas/count`, { params: this.params(id, keyword) }); }
  findAllInfraestructurasArrendadas(id?: number, keyword?: string, orderBy?: string, orderMode = 'ASC'): Observable<InfraestructurasArrendadasI[]> { let params = this.params(id, keyword).set('orderMode', orderMode); if (orderBy) params = params.set('orderBy', orderBy); return this.http.get<InfraestructurasArrendadasI[]>(`${this.baseUrl}/infraestructurasArrendadas/lista`, { params }); }
  findAllInfraestructurasArrendadasPag(page = 0, size = 10, id?: number, keyword?: string, orderBy?: string, orderMode = 'ASC'): Observable<InfraestructurasArrendadasI[]> { let params = this.params(id, keyword).set('page', page).set('size', size).set('orderMode', orderMode); if (orderBy) params = params.set('orderBy', orderBy); return this.http.get<{content: InfraestructurasArrendadasI[]}>(`${this.baseUrl}/infraestructurasArrendadas/listaPag`, { params }).pipe(map(x => x.content)); }
  getById(id: number): Observable<ResponseInfraestructuraArrendadaDTO> { return this.http.get<ResponseInfraestructuraArrendadaDTO>(`${this.baseUrl}/infraestructurasArrendadas/${id}`); }
  add(value: InfraestructurasArrendadasI): Observable<InfraestructurasArrendadasMsj> { return this.http.post<InfraestructurasArrendadasMsj>(`${this.baseUrl}/infraestructurasArrendadas`, value); }
  update(value: InfraestructurasArrendadasI): Observable<InfraestructurasArrendadasMsj> { return this.http.put<InfraestructurasArrendadasMsj>(`${this.baseUrl}/infraestructurasArrendadas`, value); }
  delete(id: number): Observable<InfraestructurasArrendadasMsj> { return this.http.delete<InfraestructurasArrendadasMsj>(`${this.baseUrl}/infraestructurasArrendadas/${id}`); }
  private params(id?: number, keyword?: string): HttpParams { let p = new HttpParams(); if (id !== undefined) p = p.set('idInfraestructuraArrendada', id); if (keyword) p = p.set('keyword', keyword); return p; }
}
