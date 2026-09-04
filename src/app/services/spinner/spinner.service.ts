import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//SERVICIO GLOBAL DEL SPINNER (PIÑÓN GIRATORIO) QUE SE MUESTRA ANTES DE ABRIR CUALQUIER MODAL/POPUP DEL PROYECTO
//(VER, CREAR, MODIFICAR, ELIMINAR, ETC.). EL COMPONENTE VISUAL (SpinnerModalComponent) SE MONTA UNA SOLA VEZ EN LA
//RAÍZ DE LA APLICACIÓN (app.component.html) Y REACCIONA AL ESTADO DE ESTE SERVICIO, ASÍ QUE NO HAY QUE REPETIR EL
//OVERLAY NI EL CSS EN CADA COMPONENTE QUE ABRE UN MODAL.
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  //DURACIÓN POR DEFECTO DEL SPINNER — LO SUFICIENTE PARA QUE SE ALCANCE A VER LA ROTACIÓN DEL PIÑÓN:
  private readonly duracionPorDefectoMs = 900;

  private readonly visibleSubject = new BehaviorSubject<boolean>(false);
  readonly visible$ = this.visibleSubject.asObservable();

  //MUESTRA EL SPINNER DURANTE duracionMs Y LUEGO EJECUTA accion() (NORMALMENTE, LA APERTURA DEL MODAL):
  mostrarAntesDeAbrir(accion: () => void, duracionMs: number = this.duracionPorDefectoMs): void {
    this.visibleSubject.next(true);
    setTimeout(() => {
      accion();
      this.visibleSubject.next(false);
    }, duracionMs);
  }
}
