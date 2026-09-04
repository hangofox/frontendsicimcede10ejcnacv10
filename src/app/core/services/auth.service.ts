import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuariosI } from '../../interfaces/panel-control/usuarios/usuarios.interface';

export interface UsuarioSesion {
  idUsuario: number;
  grado: string;
  nombreCompleto: string;
  rol: string;
  usuario: string;
  nombreArchivoFoto: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionKey = 'sicim-sesion';
  private readonly usuarioSubject = new BehaviorSubject<UsuarioSesion | null>(this.leerSesion());
  readonly usuario$ = this.usuarioSubject.asObservable();

  estaAutenticado(): boolean {
    return this.usuarioSubject.value !== null;
  }

  usuarioActual(): UsuarioSesion | null {
    return this.usuarioSubject.value;
  }

  //PERSISTE LA SESIÓN DEL USUARIO YA VALIDADO POR EL BACKEND (TOKEN DE /login + REGISTRO DE tabla_usuarios) EN
  //LOCALSTORAGE, USANDO LAS MISMAS LLAVES QUE YA CONSUMEN SessionService Y AuthInterceptor (tokenAutorizacion,
  //isLoggedIn, idUsuario), Y LA PUBLICA POR usuario$ PARA QUE EL CABEZOTE REACCIONE DE INMEDIATO:
  establecerSesion(usuario: UsuariosI, tokenAutorizacion: string): void {
    const segundoApellido = usuario.segundoApellidoUsuario ? ` ${usuario.segundoApellidoUsuario}` : '';
    const usuarioSesion: UsuarioSesion = {
      idUsuario: usuario.idUsuario ?? 0,
      grado: String(usuario.gradoUsuario ?? ''),
      nombreCompleto: `${usuario.nombresUsuario} ${usuario.primerApellidoUsuario}${segundoApellido}`,
      rol: String(usuario.tipoUsuarioDTO?.nombreTipoUsuario ?? ''),
      usuario: String(usuario.nicknameUsuario),
      nombreArchivoFoto: String(usuario.nombreArchivoFotoExtensionoFormatoUsuario ?? '')
    };

    localStorage.setItem('tokenAutorizacion', tokenAutorizacion);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('idUsuario', String(usuarioSesion.idUsuario));
    localStorage.setItem(this.sessionKey, JSON.stringify(usuarioSesion));
    this.usuarioSubject.next(usuarioSesion);
  }

  cerrarSesion(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.usuarioSubject.next(null);
  }

  private leerSesion(): UsuarioSesion | null {
    try {
      const valor = localStorage.getItem(this.sessionKey);
      return valor ? JSON.parse(valor) as UsuarioSesion : null;
    } catch {
      localStorage.removeItem(this.sessionKey);
      return null;
    }
  }
}
