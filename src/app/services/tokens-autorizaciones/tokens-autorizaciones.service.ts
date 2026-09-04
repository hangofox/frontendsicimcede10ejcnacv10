import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginCredencialesI } from '../../interfaces/login-credenciales/login-credenciales.interface';
import { ResponseTokenAutorizacionDTO } from '../../interfaces/tokens-autorizaciones/responseTokenAutorizacionDTO.interface';

@Injectable({ providedIn: 'root' })
export class TokensAutorizacionesService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //OBTIENE EL TOKEN DE AUTORIZACIÓN DEL USUARIO FIRMADO POR EL BACKEND A PARTIR DEL NICKNAME Y LA CONTRASEÑA.
  tokenAuthorizationByNicknameAndPassword(
    loginCredencialesI: LoginCredencialesI
  ): Observable<ResponseTokenAutorizacionDTO> {
    return this.http.post<ResponseTokenAutorizacionDTO>(
      `${this.baseUrl}/login`,
      loginCredencialesI
    );
  }
}
