import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SolicitudesInfraestructurasI } from '../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposSolicitudesInfraestructurasI } from '../../../../interfaces/digei/tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.interface';
import { InfraestructurasI } from '../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';
import { GRUPOS_NIVEL_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST, IntegrantesDocumentosSolicInfraestI, NIVELES_JERARQUIA_UNIDAD_MILITAR } from '../../../../interfaces/digei/solicitudes-infraestructuras/integrantes-documentos-solic-infraest/integrantes-documentos-solic-infraest.interface';

import { SolicitudesInfraestructurasService } from '../../../../services/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposSolicitudesInfraestructurasService } from '../../../../services/digei/tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.service';
import { InfraestructurasService } from '../../../../services/digei/finca-raiz/infraestructuras/infraestructuras.service';
import { IntegrantesDocumentosSolicInfraestService } from '../../../../services/digei/solicitudes-infraestructuras/integrantes-documentos-solic-infraest/integrantes-documentos-solic-infraest.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';

import { AddUpdDelSolicitudInfraestructuraComponent } from '../add-upd-del-solicitud-infraestructura/add-upd-del-solicitud-infraestructura.component';
import { VistaSolicitudInfraestructuraComponent } from '../vista-solicitud-infraestructura/vista-solicitud-infraestructura.component';
import { ListadoIntegrantesDocumentosSolicInfraestComponent } from '../integrantes-documentos-solic-infraest/listado-integrantes-documentos-solic-infraest/listado-integrantes-documentos-solic-infraest.component';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-solicitudes-infraestructuras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelSolicitudInfraestructuraComponent, VistaSolicitudInfraestructuraComponent, ListadoIntegrantesDocumentosSolicInfraestComponent, SemaforoContadoresComponent],
  templateUrl: './listado-solicitudes-infraestructuras.component.html',
  styleUrl: './listado-solicitudes-infraestructuras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoSolicitudesInfraestructurasComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBO DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposSolicitudesInfraestructuras: TiposSolicitudesInfraestructurasI[] = [];
  infraestructuras: InfraestructurasI[] = [];

  //REGISTROS DE INTEGRANTES DE CADA SOLICITUD (COMITÉ COMPLETO), INDEXADOS POR idSolicitudInfraestructura, PARA
  //SABER SI CADA NIVEL YA TIENE TODAS SUS FIRMAS ADJUNTADAS Y ASÍ DECIDIR SI SE MUESTRA CHULO O X EN LA TABLA:
  private integrantesPorSolicitud = new Map<number, IntegrantesDocumentosSolicInfraestI>();

  //PÁGINA ACTUAL DE SOLICITUDES DE INFRAESTRUCTURAS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE RECORTA EN EL CLIENTE):
  solicitudesInfraestructuras: SolicitudesInfraestructurasI[] = [];
  totalRegistros = 0;

  solicitudesInfraestructurasForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  solicitudInfraestructuraSeleccionada: SolicitudesInfraestructurasI | null = null;

  //ESTADO DEL MODAL DE INTEGRANTES DE LA SOLICITUD (COMITÉ ASOCIADO A LA SOLICITUD SELECCIONADA):
  modalIntegrantesVisible = false;
  solicitudInfraestructuraParaIntegrantes: SolicitudesInfraestructurasI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private solicitudesInfraestructurasService: SolicitudesInfraestructurasService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private tiposSolicitudesInfraestructurasService: TiposSolicitudesInfraestructurasService,
    private infraestructurasService: InfraestructurasService,
    private integrantesDocumentosSolicInfraestService: IntegrantesDocumentosSolicInfraestService,
    private spinnerService: SpinnerService
  ) {
    this.solicitudesInfraestructurasForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarTiposSolicitudesInfraestructuras();
    this.cargarInfraestructuras();
    this.cargarIntegrantesDocumentosSolicInfraest();
    this.accionListar();
  }

  //CARGA TODOS LOS REGISTROS DE INTEGRANTES DE SOLICITUDES DE INFRAESTRUCTURAS Y LOS INDEXA POR
  //idSolicitudInfraestructura, PARA PODER DETERMINAR SI CADA NIVEL DE CADA SOLICITUD YA TIENE TODAS SUS FIRMAS:
  private cargarIntegrantesDocumentosSolicInfraest(): void {
    this.integrantesDocumentosSolicInfraestService.findAllIntegrantesDocumentosSolicInfraest()
      .subscribe({
        next: (integrantes) => {
          this.integrantesPorSolicitud = new Map(
            integrantes
              .filter(i => i.solicitudInfraestructuraDTO?.idSolicitudInfraestructura !== undefined)
              .map(i => [i.solicitudInfraestructuraDTO.idSolicitudInfraestructura as number, i])
          );
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR INTEGRANTES DE SOLICITUDES DE INFRAESTRUCTURAS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
  private cargarUnidadesMilitares(): void {
    this.unidadesMilitaresService.findAllMilitaryUnits(undefined, undefined, 'nombreUnidadMilitar', 'ASC')
      .subscribe({
        next: (unidadesMilitares) => {
          this.unidadesMilitares = unidadesMilitares;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR UNIDADES MILITARES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE SOLICITUD DE INFRAESTRUCTURA DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposSolicitudesInfraestructuras(): void {
    this.tiposSolicitudesInfraestructurasService.findAllTiposSolicitudesInfraestructuras(undefined, undefined, 'nombreTipoSolicitudInfraestructura', 'ASC')
      .subscribe({
        next: (tiposSolicitudesInfraestructuras) => {
          this.tiposSolicitudesInfraestructuras = tiposSolicitudesInfraestructuras;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE SOLICITUD DE INFRAESTRUCTURA: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE INFRAESTRUCTURAS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarInfraestructuras(): void {
    this.infraestructurasService.findAllInfraestructuras(undefined, undefined, undefined, 'denominacionInfraestructura', 'ASC')
      .subscribe({
        next: (infraestructuras) => {
          this.infraestructuras = infraestructuras;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR INFRAESTRUCTURAS: ', err)
      });
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE Y LA UNIDAD MILITAR SELECCIONADAS:
  accionListar(): void {
    const valoresFormulario = this.solicitudesInfraestructurasForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;

    this.solicitudesInfraestructurasService.findAllSolicitudesInfraestructurasPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      'idSolicitudInfraestructura',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.solicitudesInfraestructuras = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR SOLICITUDES DE INFRAESTRUCTURAS: ', err)
    });

    this.solicitudesInfraestructurasService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE SOLICITUDES DE INFRAESTRUCTURAS: ', err)
      });
  }

  calcularTotalPaginas(): number {
    const total = Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina);
    return total > 0 ? total : 1;
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.accionListar();
  }

  seleccionarTandaNumeroRegistrosporPagina(): void {
    this.tandaNumeroRegistrosporPagina = Number(this.solicitudesInfraestructurasForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //DETERMINA SI LA COLUMNA DE CHULEO (DISPENSARIO/BATALLON/BRIGADA/DIVISION/JEFATURA) APLICA PARA UNA SOLICITUD:
  //EL CHULEO EMPIEZA EN LA COLUMNA CORRESPONDIENTE AL NIVEL DE LA UNIDAD MILITAR DE LA SOLICITUD Y CONTINÚA HACIA
  //LOS NIVELES SUPERIORES; LAS COLUMNAS DE NIVELES INFERIORES AL DE LA UNIDAD MILITAR DE ORIGEN NO APLICAN:
  aplicaChuleoNivel(solicitudInfraestructura: SolicitudesInfraestructurasI, nivelColumna: string): boolean {
    const nivelUnidadMilitar = String(solicitudInfraestructura.unidadMilitarDTO?.nivelUnidadMilitar || '').toUpperCase().trim();
    const indiceUnidadMilitar = NIVELES_JERARQUIA_UNIDAD_MILITAR.indexOf(nivelUnidadMilitar);
    const indiceColumna = NIVELES_JERARQUIA_UNIDAD_MILITAR.indexOf(nivelColumna);
    if (indiceUnidadMilitar === -1 || indiceColumna === -1) return false;
    return indiceColumna >= indiceUnidadMilitar;
  }

  //DEVUELVE EL ESTADO DE LA COLUMNA DE CHULEO PARA UNA SOLICITUD: "no-aplica" SI EL NIVEL NO APLICA SEGÚN EL NIVEL
  //DE LA UNIDAD MILITAR DE LA SOLICITUD; "chulo" SI APLICA Y YA ESTÁN ADJUNTADOS TODOS LOS INTEGRANTES DE ESE
  //NIVEL (O SI EL NIVEL NO TIENE ROLES DE COMITÉ PROPIOS, COMO DISPENSARIO Y COMANDO); "x" SI APLICA PERO AÚN
  //FALTA ADJUNTAR ALGUNO DE LOS INTEGRANTES DE ESE NIVEL:
  obtenerEstadoNivelListado(solicitudInfraestructura: SolicitudesInfraestructurasI, nivelColumna: string): 'chulo' | 'x' | 'no-aplica' {
    if (!this.aplicaChuleoNivel(solicitudInfraestructura, nivelColumna)) return 'no-aplica';

    const grupo = GRUPOS_NIVEL_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST.find(g => g.nivel === nivelColumna);
    if (!grupo) return 'chulo';

    const idSolicitudInfraestructura = solicitudInfraestructura.idSolicitudInfraestructura;
    const registro = idSolicitudInfraestructura !== undefined ? this.integrantesPorSolicitud.get(idSolicitudInfraestructura) : undefined;
    const registroAny = registro as any;
    const completo = !!registro && grupo.roles.every(rol => !!(registroAny[`nombres${rol.clave}`] || registroAny[`grado${rol.clave}`]));
    return completo ? 'chulo' : 'x';
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', solicitudInfraestructura: SolicitudesInfraestructurasI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.solicitudInfraestructuraSeleccionada = solicitudInfraestructura;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(solicitudInfraestructura: SolicitudesInfraestructurasI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.solicitudInfraestructuraSeleccionada = solicitudInfraestructura;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.solicitudInfraestructuraSeleccionada = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.solicitudInfraestructuraSeleccionada = null;
  }

  //ABRE EL MODAL CON EL LISTADO DE INTEGRANTES DEL COMITÉ ASOCIADO A LA SOLICITUD DE INFRAESTRUCTURA SELECCIONADA:
  abrirModalIntegrantes(solicitudInfraestructura: SolicitudesInfraestructurasI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.solicitudInfraestructuraParaIntegrantes = solicitudInfraestructura;
      this.modalIntegrantesVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalIntegrantes(): void {
    this.modalIntegrantesVisible = false;
    this.solicitudInfraestructuraParaIntegrantes = null;
    //VUELVE A CARGAR LOS INTEGRANTES POR SI SE ADJUNTÓ, MODIFICÓ O ELIMINÓ ALGO MIENTRAS EL MODAL ESTUVO ABIERTO,
    //PARA QUE LAS COLUMNAS DE CHULEO/X DE LA TABLA QUEDEN ACTUALIZADAS:
    this.cargarIntegrantesDocumentosSolicInfraest();
  }

  //RECIBE LA SOLICITUD DE INFRAESTRUCTURA NUEVA O MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (POST SI ES NUEVA, PUT SI YA TIENE ID):
  guardarSolicitudInfraestructura(solicitudInfraestructura: SolicitudesInfraestructurasI): void {
    if (solicitudInfraestructura.idSolicitudInfraestructura) {
      this.solicitudesInfraestructurasService.updateSolicitudInfraestructura(solicitudInfraestructura).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Solicitud de infraestructura modificada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL MODIFICAR SOLICITUD DE INFRAESTRUCTURA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar la solicitud de infraestructura.');
        }
      });
    } else {
      this.solicitudesInfraestructurasService.addSolicitudInfraestructura(solicitudInfraestructura).subscribe({
        next: (respuesta) => {
          this.mostrarToast('exito', respuesta.mensaje || 'Solicitud de infraestructura creada correctamente.');
          this.accionListar();
          this.cerrarModalAddUpdDel();
        },
        error: (err) => {
          console.error('ERROR AL CREAR SOLICITUD DE INFRAESTRUCTURA: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear la solicitud de infraestructura.');
        }
      });
    }
  }

  //RECIBE EL ID DE LA SOLICITUD DE INFRAESTRUCTURA A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarSolicitudInfraestructura(idSolicitudInfraestructura: number): void {
    this.solicitudesInfraestructurasService.deleteSolicitudInfraestructura(idSolicitudInfraestructura).subscribe({
      next: (respuesta) => {
        this.mostrarToast('exito', respuesta.mensaje || 'Solicitud de infraestructura eliminada correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR SOLICITUD DE INFRAESTRUCTURA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la solicitud de infraestructura.');
      }
    });
  }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTipo = tipo;
    this.toastMensaje = mensaje;
    this.changeDetectorRef.markForCheck();
    this.toastTimer = setTimeout(() => {
      this.toastMensaje = '';
      this.changeDetectorRef.markForCheck();
    }, 4000);
  }
}
