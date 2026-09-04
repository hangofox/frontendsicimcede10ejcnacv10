import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  //MÉTODO QUE INTERCEPTA TODAS LAS SOLICITUDES HTTP SALIENTES DEL CLIENTE DE ANGULAR QUE ES EL USUARIO:
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    //OBTENEMOS LA VARIABLE DE SESIÓN Y/O VARIABLE LOCAL DE ALMACENAMIENTO DEL TOKEN DE AUTORIZACIÓN DEL USUARIO:
    const tokenAurizacion = localStorage.getItem('tokenAutorizacion');
    
    //SE VERIFICA SI EL TOKEN DE AUTORIZACIÓN DEL USUARIO ES DIFERENTE DE NULO (NULL):
    if (!(tokenAurizacion==null)) {//EN CASO DE QUE EL TOKEN DE AUTORIZACIÓN SEA DIFERENTE DE NULO (NULL) SE REGISTRA EN LA CABECERA DE TODAS LAS PÁGINAS.
       const clonedRequest = req.clone({
         setHeaders: {
           //Authorization: `Bearer ${tokenAurizacion}`//SE ASIGNA EL TOKEN DE AUTORIZACIÓN EN LA CABECERA DE TODAS LAS PÁGINAS.
           Authorization: `${tokenAurizacion}`//SE ASIGNA EL TOKEN DE AUTORIZACIÓN EN LA CABECERA DE TODAS LAS PÁGINAS.
         }
       });
       
       //RETORNA LA SOLICITUD MODIFICADA (CON TOKEN DE AUTORIZACIÓN) AL SIGUIENTE MANEJADOR EN LA CADENA DE INTERCEPTORES:
       return next.handle(clonedRequest);
    }
    
    //SI NO HAY TOKEN DE AUTENTICACIÓN, SE CONTINÚA LA SOLICITUD ORIGINAL SIN MODIFICARLA:
    return next.handle(req);
  }
}