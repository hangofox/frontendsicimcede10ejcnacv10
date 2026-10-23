import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposSolicitudesInfraestructurasI } from '../../../../../interfaces/digei/construcciones-mantenimientos/tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.interface';
import { InfraestructurasI } from '../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';

import { SolicitudesInfraestructurasService } from '../../../../../services/digei/construcciones-mantenimientos/solicitudes-infraestructuras/solicitudes-infraestructuras.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposSolicitudesInfraestructurasService } from '../../../../../services/digei/construcciones-mantenimientos/tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.service';
import { InfraestructurasService } from '../../../../../services/digei/finca-raiz/infraestructuras/infraestructuras.service';
import { HistorialIntegrantesSolicInfraestService } from '../../../../../services/digei/construcciones-mantenimientos/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.service';
import { LineasMandosUnidadesMilitaresService } from '../../../../../services/panel-control/lineas-mandos-unidades-militares/lineas-mandos-unidades-militares.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';

import { AddUpdDelSolicitudInfraestructuraComponent } from '../add-upd-del-solicitud-infraestructura/add-upd-del-solicitud-infraestructura.component';
import { VistaSolicitudInfraestructuraComponent } from '../vista-solicitud-infraestructura/vista-solicitud-infraestructura.component';
import { ListadoHistorialIntegrantesSolicInfraestComponent } from '../historial-integrantes-solic-infraest/listado-historial-integrantes-solic-infraest/listado-historial-integrantes-solic-infraest.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { OrdenarPorSiglaPipe } from '../../../../../shared/pipes/ordenar-por-sigla.pipe';
import { EstructuraLineaMando, analizarLineaMando, obtenerIndicesFinalesVigentes } from '../../../../../shared/lineas-mando/linea-mando.util';

//PASO DE LA LÍNEA DE MANDO QUE SE MUESTRA EN LA TABLA; "aprobado" ILUMINA LA UNIDAD MILITAR QUE YA TIENE INTEGRANTE EN EL HISTORIAL:
export interface PasoLineaMandoSolicitud {
  siglaoAcronimo: string;
  aprobado: boolean;
}

//LÍNEA DE MANDO DE UNA SOLICITUD: TRAMO COMÚN Y, SI LOS HAY, LOS FINALES ALTERNATIVOS (CAMINOS) DONDE TERMINA:
export interface LineaMandoSolicitud {
  tramoComun: PasoLineaMandoSolicitud[];
  finalesAlternativos: { pasos: PasoLineaMandoSolicitud[]; enCurso: boolean }[];
}

@Component({
  selector: 'app-listado-solicitudes-infraestructuras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelSolicitudInfraestructuraComponent, VistaSolicitudInfraestructuraComponent, ListadoHistorialIntegrantesSolicInfraestComponent, SemaforoContadoresComponent, OrdenarPorSiglaPipe],
  templateUrl: './listado-solicitudes-infraestructuras.component.html',
  styleUrl: './listado-solicitudes-infraestructuras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoSolicitudesInfraestructurasComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBO DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposSolicitudesInfraestructuras: TiposSolicitudesInfraestructurasI[] = [];
  infraestructuras: InfraestructurasI[] = [];

  //TRAMO COMÚN Y FINALES ALTERNATIVOS DE CADA LÍNEA DE MANDO DE UNIDADES MILITARES, INDEXADOS POR LA PRIMERA SIGLA O ACRÓNIMO DE LA LÍNEA
  //(LA QUE VA ANTES DEL PRIMER "->", QUE ES LA UNIDAD MILITAR QUE CREA LA SOLICITUD). EJ. "BAICC" →
  //{ tramoComun: [BAICC, BRICC, CAOCC], finalesAlternativos: [[SECEJ, CEDE10], [CEDE10], [JEMGF, COING]] }:
  private lineasMandoPorSiglaoAcronimo = new Map<string, EstructuraLineaMando>();
  //SIGLAS O ACRÓNIMOS CUYA LÍNEA DE MANDO YA SE CONSULTÓ (TENGA O NO LÍNEA REGISTRADA) O ESTÁ EN CONSULTA, PARA NO REPETIR LA CONSULTA AL
  //CAMBIAR DE PÁGINA:
  private readonly siglasoAcronimosLineaMandoConsultados = new Set<string>();

  //SIGLAS O ACRÓNIMOS DE LAS UNIDADES MILITARES QUE YA TIENEN INTEGRANTE REGISTRADO EN EL HISTORIAL DE CADA SOLICITUD (PASOS ILUMINADOS):
  private siglasoAcronimosConIntegrantePorSolicitud = new Map<number, Set<string>>();

  //PÁGINA ACTUAL DE SOLICITUDES DE INFRAESTRUCTURAS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE RECORTA EN EL CLIENTE):
  solicitudesInfraestructuras: SolicitudesInfraestructurasI[] = [];
  totalRegistros = 0;

  //ESTADOS DE LAS SOLICITUDES DE INFRAESTRUCTURAS PARA LA SEMAFORIZACIÓN QUE VA AL LADO DEL TOTAL DE REGISTROS (MISMO PATRÓN DE
  //ListadoInfraestructurasComponent); EL TONO ES EL COLOR DE CADA ESTADO EN SemaforoContadoresComponent:
  readonly estadosSolicitud = [
    { etiqueta: 'CREACION', tono: 'creacion' },
    { etiqueta: 'VERIFICACION', tono: 'verificacion' },
    { etiqueta: 'VALIDACION', tono: 'validacion' },
    { etiqueta: 'ASIGNACION', tono: 'asignacion' },
    { etiqueta: 'APROBACION', tono: 'aprobacion' },
    { etiqueta: 'RECHAZADO', tono: 'rechazado' }
  ];
  estadosSolicitudContadores = this.estadosSolicitud.map(estado => ({ ...estado, valor: 0 }));

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
    private lineasMandosUnidadesMilitaresService: LineasMandosUnidadesMilitaresService,
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
    this.accionListar();
  }

  //CARGA LAS LÍNEAS DE MANDO SOLO DE LAS UNIDADES MILITARES DE LAS SOLICITUDES DE LA PÁGINA QUE AÚN NO SE HAN CONSULTADO, UNA
  //CONSULTA POR UNIDAD MILITAR Y TODAS EN PARALELO (forkJoin); CONSULTAR LAS 466 LÍNEAS TARDABA CERCA DE 3 SEGUNDOS. CADA LÍNEA SE
  //INDEXA POR SU PRIMERA SIGLA O ACRÓNIMO (ANTES DEL PRIMER "->"), SEPARANDO EL TRAMO COMÚN DE LOS FINALES ALTERNATIVOS ENTRE CORCHETES:
  private cargarLineasMandosUnidadesMilitares(solicitudesInfraestructuras: SolicitudesInfraestructurasI[]): void {
    const faltantes = [...new Set(solicitudesInfraestructuras.map(solicitud => this.normalizarTexto(solicitud.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar)))]
      .filter(siglaoAcronimo => !!siglaoAcronimo && !this.siglasoAcronimosLineaMandoConsultados.has(siglaoAcronimo));
    if (!faltantes.length) return;
    faltantes.forEach(siglaoAcronimo => this.siglasoAcronimosLineaMandoConsultados.add(siglaoAcronimo));
    forkJoin(faltantes.map(siglaoAcronimo =>
      this.lineasMandosUnidadesMilitaresService.findAllMilitaryUnitChainsOfCommand(undefined, undefined, siglaoAcronimo).pipe(catchError(() => of(null)))
    )).subscribe(resultados => {
      resultados.forEach((lineasMando, indice) => {
        //SI FALLÓ LA CONSULTA DE UNA UNIDAD MILITAR, SE PERMITE VOLVER A CONSULTARLA EN LA SIGUIENTE CARGA DE PÁGINA:
        if (lineasMando === null) {
          this.siglasoAcronimosLineaMandoConsultados.delete(faltantes[indice]);
          console.error('ERROR AL CARGAR LA LÍNEA DE MANDO DE LA UNIDAD MILITAR: ', faltantes[indice]);
          return;
        }
        lineasMando.forEach(lineaMando => {
          const { estructura } = analizarLineaMando(lineaMando.lineaMandoUnidadMilitar);
          const tramoComun = estructura.tramoComun.map(paso => this.normalizarTexto(paso)).filter(paso => !!paso);
          const finalesAlternativos = estructura.finalesAlternativos
            .map(final => final.map(paso => this.normalizarTexto(paso)).filter(paso => !!paso))
            .filter(final => final.length > 0);
          if (tramoComun.length) this.lineasMandoPorSiglaoAcronimo.set(tramoComun[0], { tramoComun, finalesAlternativos });
        });
      });
      this.changeDetectorRef.markForCheck();
    });
  }

  //CARGA EL HISTORIAL DE INTEGRANTES SOLO DE LAS SOLICITUDES DE LA PÁGINA, UNA CONSULTA POR SOLICITUD Y TODAS EN PARALELO
  //(CONSULTAR EL HISTORIAL DE TODAS LAS SOLICITUDES TARDABA CERCA DE 4 SEGUNDOS), Y GUARDA POR SOLICITUD LAS SIGLAS O ACRÓNIMOS DE LAS
  //UNIDADES MILITARES QUE YA TIENEN INTEGRANTE (unidadMilitarDTO DE CADA REGISTRO), PARA ILUMINAR LOS PASOS DE CADA LÍNEA DE MANDO:
  private cargarHistorialIntegrantesSolicInfraest(solicitudesInfraestructuras: SolicitudesInfraestructurasI[]): void {
    const idsSolicitudes = solicitudesInfraestructuras
      .map(solicitud => solicitud.idSolicitudInfraestructura)
      .filter((idSolicitudInfraestructura): idSolicitudInfraestructura is number => idSolicitudInfraestructura !== undefined);
    if (!idsSolicitudes.length) return;
    forkJoin(idsSolicitudes.map(idSolicitudInfraestructura =>
      this.historialIntegrantesSolicInfraestService.findAllInfrastructureRequestMemberHistories(undefined, idSolicitudInfraestructura).pipe(catchError(() => of(null)))
    )).subscribe(resultados => {
      resultados.forEach((historiales, indice) => {
        if (historiales === null) {
          console.error('ERROR AL CARGAR EL HISTORIAL DE INTEGRANTES DE LA SOLICITUD DE INFRAESTRUCTURA: ', idsSolicitudes[indice]);
          return;
        }
        const siglasoAcronimos = new Set<string>();
        historiales.forEach(historial => {
          const siglaoAcronimo = this.normalizarTexto(historial.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar);
          if (siglaoAcronimo) siglasoAcronimos.add(siglaoAcronimo);
        });
        this.siglasoAcronimosConIntegrantePorSolicitud.set(idsSolicitudes[indice], siglasoAcronimos);
      });
      this.changeDetectorRef.markForCheck();
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
        //CON LA PÁGINA YA CARGADA SE PIDEN SOLO LAS LÍNEAS DE MANDO Y EL HISTORIAL DE INTEGRANTES DE SUS SOLICITUDES:
        this.cargarLineasMandosUnidadesMilitares(data);
        this.cargarHistorialIntegrantesSolicInfraest(data);
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

    //TOTAL DE CADA ESTADO CON LOS MISMOS FILTROS DEL LISTADO (UN CONTEO POR ESTADO EN EL BACKEND, TODOS EN PARALELO); SI UN
    //CONTEO FALLA, ESE ESTADO QUEDA EN CERO:
    forkJoin(this.estadosSolicitud.map(estado =>
      this.solicitudesInfraestructurasService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar, estado.etiqueta).pipe(catchError(() => of(0)))
    )).subscribe(totales => {
      this.estadosSolicitudContadores = this.estadosSolicitud.map((estado, indice) => ({ ...estado, valor: Number(totales[indice]) || 0 }));
      this.changeDetectorRef.markForCheck();
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

  //DEVUELVE LA LÍNEA DE MANDO DE LA SOLICITUD (LA LÍNEA CUYA PRIMERA SIGLA O ACRÓNIMO ES LA DE LA UNIDAD MILITAR QUE CREÓ LA SOLICITUD)
  //CON SU TRAMO COMÚN Y SUS FINALES ALTERNATIVOS, MARCANDO COMO "aprobado" (ILUMINADO) CADA PASO CUYA UNIDAD MILITAR YA TIENE
  //INTEGRANTE EN EL HISTORIAL DE LA SOLICITUD. LOS FINALES ALTERNATIVOS SOLO SE MUESTRAN MIENTRAS NINGUNA DE SUS UNIDADES MILITARES
  //MILITARES TIENE INTEGRANTES REGISTRADOS EN LA SOLICITUD; CUANDO YA LOS TIENE, LA SOLICITUD TOMÓ ESE CAMINO Y SE MUESTRA
  //SEGUIDO DEL TRAMO COMÚN (SI VARIOS FINALES COMPARTEN LAS UNIDADES MILITARES APROBADAS, EJ. CEDE10 EN [JEMPP->CEDE10] Y [CEDE10], SE
  //DEJAN LOS QUE TIENEN MÁS PASOS APROBADOS, MARCADOS COMO "enCurso"). SI LA UNIDAD MILITAR NO TIENE LÍNEA DE MANDO DEVUELVE null:
  obtenerLineaMandoSolicitud(solicitudInfraestructura: SolicitudesInfraestructurasI): LineaMandoSolicitud | null {
    const siglaoAcronimo = this.normalizarTexto(solicitudInfraestructura.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar);
    const lineaMando = this.lineasMandoPorSiglaoAcronimo.get(siglaoAcronimo);
    if (!lineaMando) return null;
    const idSolicitudInfraestructura = solicitudInfraestructura.idSolicitudInfraestructura;
    const siglasoAcronimosConIntegrante = idSolicitudInfraestructura !== undefined ? this.siglasoAcronimosConIntegrantePorSolicitud.get(idSolicitudInfraestructura) : undefined;
    const marcarPasos = (pasos: string[]): PasoLineaMandoSolicitud[] => pasos.map(paso => ({ siglaoAcronimo: paso, aprobado: !!siglasoAcronimosConIntegrante?.has(paso) }));
    const tramoComun = marcarPasos(lineaMando.tramoComun);
    const indicesVigentes = obtenerIndicesFinalesVigentes(lineaMando, siglasoAcronimosConIntegrante ?? new Set<string>());
    const finalesVigentes = indicesVigentes.map(indice => marcarPasos(lineaMando.finalesAlternativos[indice]));
    const caminoTomado = indicesVigentes.length < lineaMando.finalesAlternativos.length || finalesVigentes.some(pasos => pasos.some(paso => paso.aprobado));
    if (caminoTomado && finalesVigentes.length === 1) {
      return { tramoComun: [...tramoComun, ...finalesVigentes[0]], finalesAlternativos: [] };
    }
    return { tramoComun, finalesAlternativos: finalesVigentes.map(pasos => ({ pasos, enCurso: caminoTomado })) };
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
    //VUELVE A CARGAR LA PÁGINA DE SOLICITUDES (Y CON ELLA EL HISTORIAL DE INTEGRANTES DE SUS SOLICITUDES) POR SI SE AGREGÓ,
    //MODIFICÓ O ELIMINÓ ALGO MIENTRAS EL MODAL ESTUVO ABIERTO: ASÍ QUEDAN ACTUALIZADOS LA LÍNEA DE MANDO Y EL ESTADO DE LA
    //SOLICITUD, QUE EL BACKEND RECALCULA AUTOMÁTICAMENTE CON CADA INTEGRANTE:
    this.accionListar();
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
