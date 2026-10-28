import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InformacionFinancieraSolicInfraestI, InformacionFinancieraSolicInfraestMsj } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/informacion-financiera-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { TiposFuentesFinanciacionI } from '../../../../../../interfaces/tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface';
import { ActividadesProductosInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/activ-prod-infraest/actividades-productos-infraestructuras.interface';
import { UnidadesMedidasI } from '../../../../../../interfaces/unidades-medidas/unidades-medidas.interface';
import { InformacionFinancieraSolicInfraestService } from '../../../../../../services/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/informacion-financiera-solic-infraest.service';
import { TiposFuentesFinanciacionService } from '../../../../../../services/tipos-fuentes-financiacion/tipos-fuentes-financiacion.service';
import { ActividadesProductosInfraestructurasService } from '../../../../../../services/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/activ-prod-infraest/actividades-productos-infraestructuras.service';
import { UnidadesMedidasService } from '../../../../../../services/unidades-medidas/unidades-medidas.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelInformacionFinancieraSolicConstNuevComponent } from '../add-upd-del-info-fin-solic-const-nuev/add-upd-del-info-fin-solic-const-nuev.component';
import { VistaInformacionFinancieraSolicConstNuevComponent } from '../vista-info-fin-solic-const-nuev/vista-info-fin-solic-const-nuev.component';

@Component({
  selector: 'app-listado-inf-fin-solic-const-nuev',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelInformacionFinancieraSolicConstNuevComponent, VistaInformacionFinancieraSolicConstNuevComponent],
  templateUrl: './listado-info-fin-solic-const-nuev.component.html',
  styleUrl: './listado-info-fin-solic-const-nuev.component.scss'
})
export class ListadoInformacionFinancieraSolicConstNuevComponent implements OnInit, OnChanges {
  //SOLICITUD DE INFRAESTRUCTURA DESDE LA QUE SE ABRE EL LISTADO (MODAL DEL LISTADO DE SOLICITUDES); SOLO SE LISTAN
  //Y SE CREAN REGISTROS DE INFORMACIÓN FINANCIERA DE ESTA SOLICITUD:
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cantidad: ['10'] });
  registros: InformacionFinancieraSolicInfraestI[] = [];
  //VALOR TOTAL DE TODA LA SOLICITUD (SUMA DE CANTIDAD × VALOR DEL COSTO UNITARIO DE TODOS SUS REGISTROS, SIN FILTROS NI PAGINACIÓN):
  valorTotalSolicitud = 0;
  //CATÁLOGOS PARA LOS COMBOS DEL FORMULARIO:
  tiposFuentesFinanciacion: TiposFuentesFinanciacionI[] = [];
  actividadesProductosInfraestructuras: ActividadesProductosInfraestructurasI[] = [];
  unidadesMedidas: UnidadesMedidasI[] = [];
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: InformacionFinancieraSolicInfraestI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: InformacionFinancieraSolicInfraestService,
    private readonly tiposFuentesFinanciacionService: TiposFuentesFinanciacionService,
    private readonly actividadesProductosInfraestructurasService: ActividadesProductosInfraestructurasService,
    private readonly unidadesMedidasService: UnidadesMedidasService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  //LOS CATÁLOGOS SE CARGAN UNA SOLA VEZ:
  ngOnInit(): void {
    this.tiposFuentesFinanciacionService.findAllTypesOfFundingSources(undefined, undefined, 'idTipoFuenteFinanciacion', 'ASC').subscribe({
      next: tipos => { this.tiposFuentesFinanciacion = tipos; this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR LOS TIPOS DE FUENTES DE FINANCIACIÓN: ', err)
    });
    this.actividadesProductosInfraestructurasService.findAllInfrastructureProductActivities(undefined, undefined, undefined, 'idActividadProductoInfraestructura', 'ASC').subscribe({
      next: actividades => { this.actividadesProductosInfraestructuras = actividades; this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR LAS ACTIVIDADES DE PRODUCTOS DE INFRAESTRUCTURAS: ', err)
    });
    this.unidadesMedidasService.findAllUnitsOfMeasurement(undefined, 'nombreUnidadMedida', 'ASC').subscribe({
      next: unidades => { this.unidadesMedidas = unidades; this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR LAS UNIDADES DE MEDIDAS: ', err)
    });
  }

  //AL CAMBIAR LA SOLICITUD SE VUELVE A LISTAR:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitudInfraestructura']) this.buscar();
  }

  //VALOR TOTAL DE UN REGISTRO (CANTIDAD × VALOR DEL COSTO UNITARIO); null SI NO TIENE VALOR DEL COSTO UNITARIO:
  valorTotal(registro: InformacionFinancieraSolicInfraestI): number | null {
    const valorUnitario = Number(registro.valorCostoUnitarioCapituloProductoInfraestructura);
    if (!String(registro.valorCostoUnitarioCapituloProductoInfraestructura ?? '').trim() || isNaN(valorUnitario)) return null;
    return Number(registro.cantidadActividadProductoInfraestructura ?? 0) * valorUnitario;
  }

  //SE LISTA LA PÁGINA DE LA SOLICITUD (EL BACKEND FILTRA POR idSolicitudInfraestructura), SE CUENTA EL TOTAL FILTRADO Y SE
  //SUMA EL VALOR TOTAL DE TODA LA SOLICITUD:
  listar(): void {
    const idSolicitudInfraestructura = this.solicitudInfraestructura?.idSolicitudInfraestructura;
    if (!idSolicitudInfraestructura) {
      this.registros = [];
      this.total = 0;
      this.valorTotalSolicitud = 0;
      return;
    }
    const keyword = this.form.value.keyword?.trim() || undefined;
    this.service.findAllInfrastructureRequestFinancialInformationPag(this.pagina, this.cantidad, keyword, idSolicitudInfraestructura, 'idInformacionFinancieraSolicitudInfraestructura', 'ASC').subscribe(registros => {
      this.registros = registros;
      this.cdr.markForCheck();
    });
    this.service.findCountTotalRegisters(keyword, idSolicitudInfraestructura).subscribe(total => {
      this.total = total;
      this.cdr.markForCheck();
    });
    this.service.findAllInfrastructureRequestFinancialInformation(undefined, idSolicitudInfraestructura).subscribe(todos => {
      this.valorTotalSolicitud = todos.reduce((suma, registro) => suma + (this.valorTotal(registro) ?? 0), 0);
      this.cdr.markForCheck();
    });
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: InformacionFinancieraSolicInfraestI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: InformacionFinancieraSolicInfraestI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: InformacionFinancieraSolicInfraestI): void {
    const modificar = !!registro.idInformacionFinancieraSolicitudInfraestructura;
    (modificar ? this.service.updateInfrastructureRequestFinancialInformation(registro) : this.service.addInfrastructureRequestFinancialInformation(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Información financiera modificada correctamente.' : 'Información financiera agregada correctamente.', modificar ? 'Error al modificar la información financiera.' : 'Error al agregar la información financiera.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar la información financiera.' : 'Error al agregar la información financiera.'))
    });
  }

  eliminar(id: number): void {
    this.service.deleteInfrastructureRequestFinancialInformation(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Información financiera eliminada correctamente.', 'Error al eliminar la información financiera.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la información financiera.')
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA; EN ESE CASO SE MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuesta(respuesta: InformacionFinancieraSolicInfraestMsj, mensajeExito: string, mensajeError: string): void {
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
