import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

import { SolicitudesInfraestructurasService } from '../../../../../services/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposSolicitudesInfraestructurasService } from '../../../../../services/digei/tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.service';
import { HistorialIntegrantesSolicInfraestService } from '../../../../../services/digei/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.service';
import { LineasMandosUnidadesMilitaresService } from '../../../../../services/panel-control/lineas-mandos-unidades-militares/lineas-mandos-unidades-militares.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';

import { UpdSolicitudMantenimientoAvaladoComponent, ESTADOS_SOLICITUDES_INFRAESTRUCTURAS_AVALADAS } from '../upd-solicitud-mantenimiento-avalado/upd-solicitud-mantenimiento-avalado.component';
import { LineaMandoSolicitud, PasoLineaMandoSolicitud } from '../../solicitudes-mantenimientos/listado-solicitudes-mantenimientos/listado-solicitudes-mantenimientos.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { OrdenarPorSiglaPipe } from '../../../../../shared/pipes/ordenar-por-sigla.pipe';
import { EstructuraLineaMando, analizarLineaMando, obtenerIndicesFinalesVigentes } from '../../../../../shared/lineas-mando/linea-mando.util';

//LISTADO DE LAS SOLICITUDES DE INFRAESTRUCTURAS AVALADAS: LAS QUE YA LLEGARON AL ESTADO ASIGNACION (AUTOMÁTICAMENTE, AL REGISTRAR LOS
//INTEGRANTES DE SU LÍNEA DE MANDO) Y LAS QUE YA SE APROBARON O RECHAZARON. MISMO PATRÓN DE ListadoSolicitudesMantenimientosComponent,
//PERO SOLO CON LA ACCIÓN DE MODIFICAR (UpdSolicitudMantenimientoAvaladoComponent), DONDE SE ASIGNA EL ESTADO APROBACION O RECHAZADO:
@Component({
  selector: 'app-listado-solicitudes-mantenimientos-avalados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UpdSolicitudMantenimientoAvaladoComponent, SemaforoContadoresComponent, OrdenarPorSiglaPipe],
  templateUrl: './listado-solicitudes-mantenimientos-avalados.component.html',
  styleUrl: './listado-solicitudes-mantenimientos-avalados.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoSolicitudesMantenimientosAvaladosComponent implements OnInit {

  //ESTADOS DE LAS SOLICITUDES QUE SE LISTAN, SEPARADOS POR COMA COMO LOS RECIBE EL BACKEND ("ASIGNACION,APROBACION,RECHAZADO"):
  private readonly estadosSolicitudesAvaladas = ESTADOS_SOLICITUDES_INFRAESTRUCTURAS_AVALADAS.join(',');

  //TIPO DE SOLICITUD QUE MANEJA ESTE LISTADO (TABLA_TIPOS_SOLICITUDES_INFRAESTRUCTURAS): SOLO SE LISTAN Y CUENTAN LAS SOLICITUDES AVALADAS
  //DE ESTE TIPO. SU ID SE BUSCA POR EL NOMBRE AL CARGAR EL CATÁLOGO DE TIPOS:
  private static readonly NOMBRE_TIPO_SOLICITUD_INFRAESTRUCTURA = 'MANTENIMIENTO';
  private idTipoSolicitudInfraestructura: number | undefined = undefined;

  //CATÁLOGO DE UNIDADES MILITARES CARGADO DESDE EL BACKEND (COMBO DE FILTRO):
  unidadesMilitares: UnidadesMilitaresI[] = [];

  //TRAMO COMÚN Y FINALES ALTERNATIVOS DE CADA LÍNEA DE MANDO DE UNIDADES MILITARES, INDEXADOS POR LA PRIMERA SIGLA O ACRÓNIMO DE LA LÍNEA
  //(LA UNIDAD MILITAR QUE CREA LA SOLICITUD), IGUAL QUE EN ListadoSolicitudesMantenimientosComponent:
  private lineasMandoPorSiglaoAcronimo = new Map<string, EstructuraLineaMando>();
  //SIGLAS O ACRÓNIMOS CUYA LÍNEA DE MANDO YA SE CONSULTÓ O ESTÁ EN CONSULTA, PARA NO REPETIR LA CONSULTA AL CAMBIAR DE PÁGINA:
  private readonly siglasoAcronimosLineaMandoConsultados = new Set<string>();

  //SIGLAS O ACRÓNIMOS DE LAS UNIDADES MILITARES QUE YA TIENEN INTEGRANTE REGISTRADO EN EL HISTORIAL DE CADA SOLICITUD (PASOS ILUMINADOS):
  private siglasoAcronimosConIntegrantePorSolicitud = new Map<number, Set<string>>();

  //PÁGINA ACTUAL DE SOLICITUDES DE INFRAESTRUCTURAS AVALADAS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR):
  solicitudesInfraestructuras: SolicitudesInfraestructurasI[] = [];
  totalRegistros = 0;

  //ESTADOS DE LAS SOLICITUDES AVALADAS PARA LA SEMAFORIZACIÓN QUE VA AL LADO DEL TOTAL DE REGISTROS (MISMOS TONOS DE
  //ListadoSolicitudesMantenimientosComponent EN SemaforoContadoresComponent):
  readonly estadosSolicitud = [
    { etiqueta: 'ASIGNACION', tono: 'asignacion' },
    { etiqueta: 'APROBACION', tono: 'aprobacion' },
    { etiqueta: 'RECHAZADO', tono: 'rechazado' }
  ];
  estadosSolicitudContadores = this.estadosSolicitud.map(estado => ({ ...estado, valor: 0 }));

  solicitudesInfraestructurasForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DEL MODAL DE MODIFICAR:
  modalUpdVisible = false;
  solicitudInfraestructuraSeleccionada: SolicitudesInfraestructurasI | null = null;

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
    this.cargarTipoSolicitudInfraestructura();
  }

  //CARGA LAS LÍNEAS DE MANDO SOLO DE LAS UNIDADES MILITARES DE LAS SOLICITUDES DE LA PÁGINA QUE AÚN NO SE HAN CONSULTADO, UNA
  //CONSULTA POR UNIDAD MILITAR Y TODAS EN PARALELO (forkJoin), IGUAL QUE EN ListadoSolicitudesMantenimientosComponent:
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

  //CARGA EL HISTORIAL DE INTEGRANTES SOLO DE LAS SOLICITUDES DE LA PÁGINA, UNA CONSULTA POR SOLICITUD Y TODAS EN PARALELO, PARA
  //ILUMINAR LOS PASOS DE CADA LÍNEA DE MANDO (IGUAL QUE EN ListadoSolicitudesMantenimientosComponent):
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

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES DESDE EL BACKEND (COMBO DE FILTRO):
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

  //BUSCA EN EL CATÁLOGO DE TIPOS DE SOLICITUD EL ID DEL TIPO DE ESTE LISTADO POR SU NOMBRE Y CON ÉL CARGA LA PRIMERA PÁGINA. SI EL TIPO
  //NO EXISTE NO SE LISTA NADA (PARA NO MOSTRAR SOLICITUDES DE OTROS TIPOS):
  private cargarTipoSolicitudInfraestructura(): void {
    const nombreTipo = this.normalizarTexto(ListadoSolicitudesMantenimientosAvaladosComponent.NOMBRE_TIPO_SOLICITUD_INFRAESTRUCTURA);
    this.tiposSolicitudesInfraestructurasService.findAllTypesOfInfrastructureRequests(undefined, undefined, 'nombreTipoSolicitudInfraestructura', 'ASC')
      .subscribe({
        next: (tiposSolicitudesInfraestructuras) => {
          this.idTipoSolicitudInfraestructura = tiposSolicitudesInfraestructuras
            .find(tipo => this.normalizarTexto(tipo.nombreTipoSolicitudInfraestructura) === nombreTipo)?.idTipoSolicitudInfraestructura;
          if (this.idTipoSolicitudInfraestructura === undefined) {
            console.error('NO EXISTE EL TIPO DE SOLICITUD DE INFRAESTRUCTURA: ', ListadoSolicitudesMantenimientosAvaladosComponent.NOMBRE_TIPO_SOLICITUD_INFRAESTRUCTURA);
            this.mostrarToast('error', `No existe el tipo de solicitud ${ListadoSolicitudesMantenimientosAvaladosComponent.NOMBRE_TIPO_SOLICITUD_INFRAESTRUCTURA} en los tipos de solicitudes.`);
          }
          this.accionListar();
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE SOLICITUD DE INFRAESTRUCTURA: ', err)
      });
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE Y LA UNIDAD MILITAR SELECCIONADAS, SOLO DE LAS SOLICITUDES EN ESTADO
  //ASIGNACION, APROBACION O RECHAZADO:
  accionListar(): void {
    //SIN EL ID DEL TIPO DE SOLICITUD NO SE CONSULTA (EL BACKEND DEVOLVERÍA LAS SOLICITUDES DE TODOS LOS TIPOS):
    const idTipoSolicitudInfraestructura = this.idTipoSolicitudInfraestructura;
    if (idTipoSolicitudInfraestructura === undefined) return;
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
      'ASC',
      this.estadosSolicitudesAvaladas,
      idTipoSolicitudInfraestructura
    ).subscribe({
      next: (data) => {
        this.solicitudesInfraestructuras = data;
        //CON LA PÁGINA YA CARGADA SE PIDEN SOLO LAS LÍNEAS DE MANDO Y EL HISTORIAL DE INTEGRANTES DE SUS SOLICITUDES:
        this.cargarLineasMandosUnidadesMilitares(data);
        this.cargarHistorialIntegrantesSolicInfraest(data);
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR SOLICITUDES DE INFRAESTRUCTURAS AVALADAS: ', err)
    });

    this.solicitudesInfraestructurasService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar, this.estadosSolicitudesAvaladas, idTipoSolicitudInfraestructura)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE SOLICITUDES DE INFRAESTRUCTURAS AVALADAS: ', err)
      });

    //TOTAL DE CADA ESTADO CON LOS MISMOS FILTROS DEL LISTADO (UN CONTEO POR ESTADO EN EL BACKEND, TODOS EN PARALELO); SI UN
    //CONTEO FALLA, ESE ESTADO QUEDA EN CERO:
    forkJoin(this.estadosSolicitud.map(estado =>
      this.solicitudesInfraestructurasService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar, estado.etiqueta, idTipoSolicitudInfraestructura).pipe(catchError(() => of(0)))
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

  //DEVUELVE LA LÍNEA DE MANDO DE LA SOLICITUD CON SU TRAMO COMÚN Y SUS FINALES ALTERNATIVOS, MARCANDO COMO "aprobado" CADA PASO CUYA
  //UNIDAD MILITAR YA TIENE INTEGRANTE EN EL HISTORIAL; MISMA REGLA DE ListadoSolicitudesMantenimientosComponent.obtenerLineaMandoSolicitud():
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

  //ABRE EL MODAL DE MODIFICAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO (SpinnerModalComponent):
  abrirModalUpd(solicitudInfraestructura: SolicitudesInfraestructurasI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.solicitudInfraestructuraSeleccionada = solicitudInfraestructura;
      this.modalUpdVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalUpd(): void {
    this.modalUpdVisible = false;
    this.solicitudInfraestructuraSeleccionada = null;
  }

  //RECIBE LA SOLICITUD AVALADA MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (PUT /solicitudesInfraestructuras/avalada). EL BACKEND
  //RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. ESTADO NO PERMITIDO); EN ESE CASO SE DEJA EL MODAL ABIERTO:
  modificarSolicitudInfraestructuraAvalada(solicitudInfraestructura: SolicitudesInfraestructurasI): void {
    this.solicitudesInfraestructurasService.updateEndorsedInfrastructureRequest(solicitudInfraestructura).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No se modificó la solicitud de mantenimiento avalada.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || 'Solicitud de mantenimiento avalada modificada correctamente.');
        this.accionListar();
        this.cerrarModalUpd();
      },
      error: (err) => {
        console.error('ERROR AL MODIFICAR SOLICITUD DE INFRAESTRUCTURA AVALADA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al modificar la solicitud de mantenimiento avalada.');
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
