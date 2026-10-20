import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposSolicitudesInfraestructurasI } from '../../../../../interfaces/digei/construcciones-mantenimientos/tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.interface';
import { InfraestructurasI } from '../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';

import { SolicitudesInfraestructurasService } from '../../../../../services/digei/construcciones-mantenimientos/solicitudes-infraestructuras/solicitudes-infraestructuras.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposSolicitudesInfraestructurasService } from '../../../../../services/digei/construcciones-mantenimientos/tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.service';
import { InfraestructurasService } from '../../../../../services/digei/finca-raiz/infraestructuras/infraestructuras.service';
import { HistorialIntegrantesSolicInfraestService } from '../../../../../services/digei/construcciones-mantenimientos/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.service';
import { LineasMandosUnidadesMilitaresSolicInfraestService } from '../../../../../services/panel-control/lineas-mandos-unid-mil-solic-infraest/lineas-mandos-unid-mil-solic-infraest.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';

import { AddUpdDelSolicitudInfraestructuraComponent } from '../add-upd-del-solicitud-infraestructura/add-upd-del-solicitud-infraestructura.component';
import { VistaSolicitudInfraestructuraComponent } from '../vista-solicitud-infraestructura/vista-solicitud-infraestructura.component';
import { ListadoHistorialIntegrantesSolicInfraestComponent } from '../historial-integrantes-solic-infraest/listado-historial-integrantes-solic-infraest/listado-historial-integrantes-solic-infraest.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-solicitudes-infraestructuras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelSolicitudInfraestructuraComponent, VistaSolicitudInfraestructuraComponent, ListadoHistorialIntegrantesSolicInfraestComponent, SemaforoContadoresComponent],
  templateUrl: './listado-solicitudes-infraestructuras.component.html',
  styleUrl: './listado-solicitudes-infraestructuras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoSolicitudesInfraestructurasComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBO DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposSolicitudesInfraestructuras: TiposSolicitudesInfraestructurasI[] = [];
  infraestructuras: InfraestructurasI[] = [];

  //PASOS (SIGLAS) DE CADA LÍNEA DE MANDO DE SOLICITUDES DE INFRAESTRUCTURAS, INDEXADOS POR LA PRIMERA SIGLA DE LA LÍNEA
  //(LA QUE VA ANTES DEL PRIMER "->", QUE ES LA UNIDAD MILITAR QUE CREA LA SOLICITUD). EJ. "CAOCC" → [CAOCC, JEMOP, SECEJ, COEJC]:
  private pasosLineaMandoPorSigla = new Map<string, string[]>();

  //SIGLAS DE LAS UNIDADES MILITARES QUE YA TIENEN INTEGRANTE REGISTRADO EN EL HISTORIAL DE CADA SOLICITUD (PASOS ILUMINADOS):
  private siglasConIntegrantePorSolicitud = new Map<number, Set<string>>();

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

  //ESTADO DEL MODAL DEL HISTORIAL DE INTEGRANTES DE LA SOLICITUD (ASOCIADO A LA SOLICITUD SELECCIONADA):
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
    private historialIntegrantesSolicInfraestService: HistorialIntegrantesSolicInfraestService,
    private lineasMandosUnidadesMilitaresSolicInfraestService: LineasMandosUnidadesMilitaresSolicInfraestService,
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
    this.cargarLineasMandoSolicInfraest();
    this.cargarHistorialIntegrantesSolicInfraest();
    this.accionListar();
  }

  //CARGA TODAS LAS LÍNEAS DE MANDO DE SOLICITUDES DE INFRAESTRUCTURAS Y LAS INDEXA POR SU PRIMERA SIGLA (ANTES DEL PRIMER "->"):
  private cargarLineasMandoSolicInfraest(): void {
    this.lineasMandosUnidadesMilitaresSolicInfraestService.findAllInfrastructureRequestMilitaryUnitChainsOfCommand()
      .subscribe({
        next: (lineasMando) => {
          const pasosPorSigla = new Map<string, string[]>();
          lineasMando.forEach(lineaMando => {
            const pasos = String(lineaMando.lineaMandoUnidadMilitarSolicInfraest || '')
              .split('->')
              .map(paso => this.normalizarTexto(paso))
              .filter(paso => !!paso);
            if (pasos.length) pasosPorSigla.set(pasos[0], pasos);
          });
          this.pasosLineaMandoPorSigla = pasosPorSigla;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR LÍNEAS DE MANDO DE SOLICITUDES DE INFRAESTRUCTURAS: ', err)
      });
  }

  //CARGA TODO EL HISTORIAL DE INTEGRANTES DE SOLICITUDES DE INFRAESTRUCTURAS Y AGRUPA POR SOLICITUD LAS SIGLAS DE LAS
  //UNIDADES MILITARES QUE YA TIENEN INTEGRANTE (unidadMilitarDTO DE CADA REGISTRO), PARA ILUMINAR LOS PASOS DE CADA LÍNEA DE MANDO:
  private cargarHistorialIntegrantesSolicInfraest(): void {
    this.historialIntegrantesSolicInfraestService.findAllInfrastructureRequestMemberHistories()
      .subscribe({
        next: (historiales) => {
          const siglasPorSolicitud = new Map<number, Set<string>>();
          historiales.forEach(historial => {
            const idSolicitudInfraestructura = historial.solicitudInfraestructuraDTO?.idSolicitudInfraestructura;
            const sigla = this.normalizarTexto(historial.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar);
            if (idSolicitudInfraestructura === undefined || !sigla) return;
            const siglas = siglasPorSolicitud.get(idSolicitudInfraestructura) ?? new Set<string>();
            siglas.add(sigla);
            siglasPorSolicitud.set(idSolicitudInfraestructura, siglas);
          });
          this.siglasConIntegrantePorSolicitud = siglasPorSolicitud;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR EL HISTORIAL DE INTEGRANTES DE SOLICITUDES DE INFRAESTRUCTURAS: ', err)
      });
  }

  //PASA EL TEXTO A MAYÚSCULA, LE QUITA LAS TILDES Y DEJA UN SOLO ESPACIO ENTRE PALABRAS (EJ. "Jemop " → "JEMOP"):
  private normalizarTexto(texto: unknown): string {
    return String(texto ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/\s+/g, ' ').trim();
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
    this.tiposSolicitudesInfraestructurasService.findAllTypesOfInfrastructureRequests(undefined, undefined, 'nombreTipoSolicitudInfraestructura', 'ASC')
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
    this.infraestructurasService.findAllInfrastructures(undefined, undefined, undefined, 'denominacionInfraestructura', 'ASC')
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

    this.solicitudesInfraestructurasService.findAllInfrastructureRequestsPag(
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

  //DEVUELVE LOS PASOS DE LA LÍNEA DE MANDO DE LA SOLICITUD (LA LÍNEA CUYA PRIMERA SIGLA ES LA DE LA UNIDAD MILITAR QUE
  //CREÓ LA SOLICITUD), MARCANDO COMO "aprobado" (ILUMINADO) CADA PASO CUYA UNIDAD MILITAR YA TIENE INTEGRANTE EN EL
  //HISTORIAL DE LA SOLICITUD. SI LA UNIDAD NO TIENE LÍNEA DE MANDO REGISTRADA DEVUELVE UNA LISTA VACÍA:
  obtenerPasosLineaMando(solicitudInfraestructura: SolicitudesInfraestructurasI): { sigla: string; aprobado: boolean }[] {
    const sigla = this.normalizarTexto(solicitudInfraestructura.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar);
    const pasos = this.pasosLineaMandoPorSigla.get(sigla) ?? [];
    const idSolicitudInfraestructura = solicitudInfraestructura.idSolicitudInfraestructura;
    const siglasConIntegrante = idSolicitudInfraestructura !== undefined ? this.siglasConIntegrantePorSolicitud.get(idSolicitudInfraestructura) : undefined;
    return pasos.map(paso => ({ sigla: paso, aprobado: !!siglasConIntegrante?.has(paso) }));
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', solicitudInfraestructura: SolicitudesInfraestructurasI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.solicitudInfraestructuraSeleccionada = solicitudInfraestructura;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(solicitudInfraestructura: SolicitudesInfraestructurasI): void {
    this.spinnerService.showBeforeOpening(() => {
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

  //ABRE EL MODAL CON EL HISTORIAL DE INTEGRANTES ASOCIADO A LA SOLICITUD DE INFRAESTRUCTURA SELECCIONADA:
  abrirModalIntegrantes(solicitudInfraestructura: SolicitudesInfraestructurasI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.solicitudInfraestructuraParaIntegrantes = solicitudInfraestructura;
      this.modalIntegrantesVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalIntegrantes(): void {
    this.modalIntegrantesVisible = false;
    this.solicitudInfraestructuraParaIntegrantes = null;
    //VUELVE A CARGAR EL HISTORIAL DE INTEGRANTES POR SI SE AGREGÓ, MODIFICÓ O ELIMINÓ ALGO MIENTRAS EL MODAL ESTUVO
    //ABIERTO, PARA QUE LAS COLUMNAS DE CHULEO/X DE LA TABLA QUEDEN ACTUALIZADAS:
    this.cargarHistorialIntegrantesSolicInfraest();
  }

  //RECIBE LA SOLICITUD DE INFRAESTRUCTURA NUEVA O MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (POST SI ES NUEVA, PUT SI YA TIENE ID):
  guardarSolicitudInfraestructura(solicitudInfraestructura: SolicitudesInfraestructurasI): void {
    if (solicitudInfraestructura.idSolicitudInfraestructura) {
      this.solicitudesInfraestructurasService.updateInfrastructureRequest(solicitudInfraestructura).subscribe({
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
      this.solicitudesInfraestructurasService.addInfrastructureRequest(solicitudInfraestructura).subscribe({
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
    this.solicitudesInfraestructurasService.deleteInfrastructureRequest(idSolicitudInfraestructura).subscribe({
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
