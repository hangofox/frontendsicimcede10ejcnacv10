import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GerentesProyectosSolicInfraestI, GerentesProyectosSolicInfraestMsj } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/gerentes-proyectos-solic-infraest/gerentes-proyectos-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { GerentesProyectosSolicInfraestService } from '../../../../../../services/digei/solicitudes-infraestructuras/gerentes-proyectos-solic-infraest/gerentes-proyectos-solic-infraest.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelGerenteProyectoSolicConstNuevComponent } from '../add-upd-del-ger-proy-solic-const-nuev/add-upd-del-ger-proy-solic-const-nuev.component';
import { VistaGerenteProyectoSolicConstNuevComponent } from '../vista-ger-proy-solic-const-nuev/vista-ger-proy-solic-const-nuev.component';

@Component({
  selector: 'app-listado-ger-proy-solic-const-nuev',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelGerenteProyectoSolicConstNuevComponent, VistaGerenteProyectoSolicConstNuevComponent],
  templateUrl: './listado-ger-proy-solic-const-nuev.component.html',
  styleUrl: './listado-ger-proy-solic-const-nuev.component.scss'
})
export class ListadoGerentesProyectosSolicConstNuevComponent implements OnChanges {
  //SOLICITUD DE INFRAESTRUCTURA DESDE LA QUE SE ABRE EL LISTADO (MODAL DEL LISTADO DE SOLICITUDES); SOLO SE LISTAN
  //Y SE CREAN GERENTES DE PROYECTOS DE ESTA SOLICITUD:
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cantidad: ['10'] });
  registros: GerentesProyectosSolicInfraestI[] = [];
  //TOTAL DE GERENTES DE PROYECTOS DE LA SOLICITUD SIN FILTROS: EL BACKEND SOLO PERMITE UN GERENTE DE PROYECTO POR SOLICITUD,
  //ASÍ QUE CUANDO YA TIENE UNO SE BLOQUEA EL BOTÓN DE NUEVO:
  totalSolicitud = 0;
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: GerentesProyectosSolicInfraestI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: GerentesProyectosSolicInfraestService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  //AL CAMBIAR LA SOLICITUD SE VUELVE A LISTAR:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitudInfraestructura']) this.buscar();
  }

  //SE LISTA LA PÁGINA DE LA SOLICITUD (EL BACKEND FILTRA POR idSolicitudInfraestructura) Y SE CUENTA EL TOTAL FILTRADO:
  listar(): void {
    const idSolicitudInfraestructura = this.solicitudInfraestructura?.idSolicitudInfraestructura;
    if (!idSolicitudInfraestructura) {
      this.registros = [];
      this.total = 0;
      this.totalSolicitud = 0;
      return;
    }
    const keyword = this.form.value.keyword?.trim() || undefined;
    this.service.findAllInfrastructureRequestProjectManagersPag(this.pagina, this.cantidad, undefined, keyword, idSolicitudInfraestructura, 'idGerenteProyectoSolicInfraest', 'ASC').subscribe(registros => {
      this.registros = registros;
      this.cdr.markForCheck();
    });
    this.service.findCountTotalRegisters(undefined, keyword, idSolicitudInfraestructura).subscribe(total => {
      this.total = total;
      this.cdr.markForCheck();
    });
    this.service.findCountTotalRegisters(undefined, undefined, idSolicitudInfraestructura).subscribe(total => {
      this.totalSolicitud = total;
      this.cdr.markForCheck();
    });
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: GerentesProyectosSolicInfraestI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: GerentesProyectosSolicInfraestI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: GerentesProyectosSolicInfraestI): void {
    const modificar = !!registro.idGerenteProyectoSolicInfraest;
    (modificar ? this.service.updateInfrastructureRequestProjectManager(registro) : this.service.addInfrastructureRequestProjectManager(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Gerente de proyecto modificado correctamente.' : 'Gerente de proyecto agregado correctamente.', modificar ? 'Error al modificar el gerente de proyecto.' : 'Error al agregar el gerente de proyecto.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar el gerente de proyecto.' : 'Error al agregar el gerente de proyecto.'))
    });
  }

  eliminar(id: number): void {
    this.service.deleteInfrastructureRequestProjectManager(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Gerente de proyecto eliminado correctamente.', 'Error al eliminar el gerente de proyecto.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el gerente de proyecto.')
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. LA SOLICITUD YA TIENE GERENTE DE
  //PROYECTO); EN ESE CASO SE MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuesta(respuesta: GerentesProyectosSolicInfraestMsj, mensajeExito: string, mensajeError: string): void {
    if (respuesta.banderaexito === false) {
      this.mostrarToast('error', respuesta.mensaje || mensajeError);
      return;
    }
    this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
    this.cerrar();
    this.listar();
  }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTipo = tipo;
    this.toast = mensaje;
    this.cdr.markForCheck();
    this.toastTimer = setTimeout(() => {
      this.toast = '';
      this.cdr.markForCheck();
    }, 4000);
  }
}
