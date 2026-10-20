import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialIntegrantesSolicInfraestI, HistorialIntegrantesSolicInfraestMsj } from '../../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { HistorialIntegrantesSolicInfraestService } from '../../../../../../services/digei/construcciones-mantenimientos/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.service';
import { LineasMandosUnidadesMilitaresSolicInfraestService } from '../../../../../../services/panel-control/lineas-mandos-unid-mil-solic-infraest/lineas-mandos-unid-mil-solic-infraest.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelHistorialIntegranteSolicInfraestComponent } from '../add-upd-del-historial-integrante-solic-infraest/add-upd-del-historial-integrante-solic-infraest.component';
import { VistaHistorialIntegranteSolicInfraestComponent } from '../vista-historial-integrante-solic-infraest/vista-historial-integrante-solic-infraest.component';

@Component({
  selector: 'app-listado-historial-integrantes-solic-infraest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelHistorialIntegranteSolicInfraestComponent, VistaHistorialIntegranteSolicInfraestComponent],
  templateUrl: './listado-historial-integrantes-solic-infraest.component.html',
  styleUrl: './listado-historial-integrantes-solic-infraest.component.scss'
})
export class ListadoHistorialIntegrantesSolicInfraestComponent implements OnChanges {
  //SOLICITUD DE INFRAESTRUCTURA DESDE LA QUE SE ABRE EL HISTORIAL (MODAL DEL LISTADO DE SOLICITUDES); SOLO SE LISTAN
  //Y SE CREAN INTEGRANTES DE ESTA SOLICITUD:
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cboxSiglaoAcronimoUnidadMilitarSeleccionado: [''], cantidad: ['10'] });
  //PASOS (SIGLAS DE UNIDADES MILITARES) DE LA LÍNEA DE MANDO DE LA SOLICITUD, EJ. [CAOCC, JEMOP, SECEJ, COEJC]. SE USAN EN
  //EL COMBO DE FILTRO POR UNIDAD MILITAR DEL INTEGRANTE Y SE PASAN AL FORMULARIO (AddUpdDelHistorialIntegranteSolicInfraestComponent).
  //SI LA UNIDAD DE LA SOLICITUD NO TIENE LÍNEA DE MANDO REGISTRADA, SOLO CONTIENE LA PROPIA UNIDAD DE LA SOLICITUD:
  pasosLineaMando: string[] = [];
  registros: HistorialIntegrantesSolicInfraestI[] = [];
  //CARGOS YA REGISTRADOS POR UNIDAD MILITAR EN TODA LA SOLICITUD (NO SOLO EN LA PÁGINA ACTUAL), COMO CLAVES "SIGLA|CARGO",
  //PARA AVISAR EN EL FORMULARIO SI SE REPITE UN CARGO DE LA MISMA UNIDAD MILITAR:
  cargosRegistrados: string[] = [];
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialIntegrantesSolicInfraestI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: HistorialIntegrantesSolicInfraestService,
    private readonly lineasMandosUnidadesMilitaresSolicInfraestService: LineasMandosUnidadesMilitaresSolicInfraestService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  //AL CAMBIAR LA SOLICITUD SE LIMPIA EL FILTRO DE UNIDAD MILITAR, SE CARGA SU LÍNEA DE MANDO Y SE VUELVE A LISTAR:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitudInfraestructura']) {
      this.form.patchValue({ cboxSiglaoAcronimoUnidadMilitarSeleccionado: '' });
      this.cargarPasosLineaMando();
      this.buscar();
    }
  }

  //CARGA LA LÍNEA DE MANDO DE LA UNIDAD MILITAR DE LA SOLICITUD (LA QUE EMPIEZA CON SU SIGLA ANTES DEL PRIMER "->"):
  private cargarPasosLineaMando(): void {
    const sigla = String(this.solicitudInfraestructura?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim().toUpperCase();
    this.pasosLineaMando = sigla ? [sigla] : [];
    if (!sigla) return;
    this.lineasMandosUnidadesMilitaresSolicInfraestService.findAllInfrastructureRequestMilitaryUnitChainsOfCommand(undefined, undefined, sigla).subscribe({
      next: lineasMando => {
        const lineaMando = lineasMando.find(linea => String(linea.lineaMandoUnidadMilitarSolicInfraest || '').split('->')[0].trim().toUpperCase() === sigla);
        const pasos = String(lineaMando?.lineaMandoUnidadMilitarSolicInfraest || '').split('->').map(paso => paso.trim().toUpperCase()).filter(paso => !!paso);
        if (pasos.length) this.pasosLineaMando = pasos;
        this.cdr.markForCheck();
      },
      error: err => console.error('ERROR AL CARGAR LA LÍNEA DE MANDO DE LA SOLICITUD DE INFRAESTRUCTURA: ', err)
    });
  }

  //EL HISTORIAL NO TIENE COLUMNA DE ESTADO NI EN LA TABLA DE ORACLE NI EN HistorialIntegranteSolicitudInfraestructuraDTO,
  //ASÍ QUE AQUÍ SOLO SE LISTA LA PÁGINA DE LA SOLICITUD Y SE CUENTA EL TOTAL FILTRADO — MISMO PATRÓN QUE
  //ListadoHistorialProveedoresProductosServiciosComponent:
  listar(): void {
    const idSolicitudInfraestructura = this.solicitudInfraestructura?.idSolicitudInfraestructura;
    if (!idSolicitudInfraestructura) {
      this.registros = [];
      this.cargosRegistrados = [];
      this.total = 0;
      return;
    }
    const keyword = this.form.value.keyword?.trim() || undefined;
    const siglaoAcronimoUnidadMilitar = this.form.value.cboxSiglaoAcronimoUnidadMilitarSeleccionado || undefined;
    this.service.findAllInfrastructureRequestMemberHistoriesPag(this.pagina, this.cantidad, undefined, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar, 'idHistorialIntegranteSolicitudInfraestructura', 'ASC').subscribe(registros => {
      this.registros = registros;
      this.cdr.markForCheck();
    });
    this.service.findCountTotalRegisters(undefined, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar).subscribe(total => {
      this.total = total;
      this.cdr.markForCheck();
    });
    //LOS CARGOS REGISTRADOS SE CONSULTAN SIN EL FILTRO DE UNIDAD MILITAR, PORQUE LA VALIDACIÓN ES SOBRE TODA LA SOLICITUD:
    this.service.findAllInfrastructureRequestMemberHistories(undefined, idSolicitudInfraestructura).subscribe(todos => {
      this.cargosRegistrados = todos
        .filter(registro => !!String(registro.cargoIntegranteSolicitudInfraestructura || '').trim())
        .map(registro => AddUpdDelHistorialIntegranteSolicInfraestComponent.claveCargoUnidadMilitar(registro.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar, registro.cargoIntegranteSolicitudInfraestructura));
      this.cdr.markForCheck();
    });
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: HistorialIntegrantesSolicInfraestI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: HistorialIntegrantesSolicInfraestI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: HistorialIntegrantesSolicInfraestI): void {
    const modificar = !!registro.idHistorialIntegranteSolicitudInfraestructura;
    (modificar ? this.service.updateInfrastructureRequestMemberHistory(registro) : this.service.addInfrastructureRequestMemberHistory(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Integrante modificado correctamente.' : 'Integrante agregado correctamente.', modificar ? 'Error al modificar el integrante.' : 'Error al agregar el integrante.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar el integrante.' : 'Error al agregar el integrante.'))
    });
  }

  eliminar(id: number): void {
    this.service.deleteInfrastructureRequestMemberHistory(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Integrante eliminado correctamente.', 'Error al eliminar el integrante.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el integrante.')
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. EL CARGO YA ESTÁ REGISTRADO EN LA
  //SOLICITUD); EN ESE CASO SE MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO PARA CORREGIR EL CARGO:
  private procesarRespuesta(respuesta: HistorialIntegrantesSolicInfraestMsj, mensajeExito: string, mensajeError: string): void {
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
