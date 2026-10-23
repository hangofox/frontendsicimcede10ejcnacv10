import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialIntegrantesSolicInfraestI } from '../../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { CargosIntegrantesDocumentosI } from '../../../../../../interfaces/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.interface';
import { HistorialIntegrantesDocumentosI } from '../../../../../../interfaces/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.interface';
import { CargosIntegrantesDocumentosService } from '../../../../../../services/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.service';
import { HistorialIntegrantesDocumentosService } from '../../../../../../services/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.service';
import { EstructuraLineaMando, obtenerIndicesFinalesVigentes } from '../../../../../../shared/lineas-mando/linea-mando.util';

//OPCIÓN DEL COMBO "UNIDAD MILITAR (PASO DE LA LÍNEA DE MANDO)". EL VALOR DE LOS PASOS DEL TRAMO COMÚN ES SU SIGLA O ACRÓNIMO; EL DE LOS
//PASOS DE UN FINAL ALTERNATIVO LLEVA EL NÚMERO DEL FINAL ("F2|CEDE10"), PORQUE UNA MISMA SIGLA O ACRÓNIMO PUEDE ESTAR EN VARIOS FINALES:
export interface OpcionPasoLineaMando {
  valor: string;
  siglaoAcronimo: string;
  numero: number;
  numeroFinal: number | null;
}

//GRUPO DEL COMBO CON LOS PASOS DE UN FINAL ALTERNATIVO (CAMINO) DE LA LÍNEA DE MANDO, EJ. "Final alternativo 1: JEMPP → CEDE10":
export interface GrupoFinalAlternativoLineaMando {
  numeroFinal: number;
  etiqueta: string;
  opciones: OpcionPasoLineaMando[];
}

@Component({
  selector: 'app-add-upd-del-hist-integ-solic-inf',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-integ-solic-inf.component.html',
  styleUrl: './add-upd-del-hist-integ-solic-inf.component.scss'
})
export class AddUpdDelHistorialIntegranteSolicInfraestComponent implements OnChanges, OnInit {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialIntegrantesSolicInfraestI | null = null;
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;
  //CARGOS YA REGISTRADOS EN EL HISTORIAL DE ESTA SOLICITUD (EN MAYÚSCULA), PARA AVISAR ANTES DE GUARDAR UN CARGO REPETIDO.
  //LA VALIDACIÓN DEFINITIVA LA HACE EL BACKEND (MSG_REGISTRO_CARGO_YA_EXISTE_EN_SOLICITUD_INFRAESTRUCTURA):
  @Input() cargosRegistrados: string[] = [];
  //PASOS (SIGLAS O ACRÓNIMOS DE UNIDADES MILITARES) DE LA LÍNEA DE MANDO DE LA SOLICITUD, EJ. [CAOCC, JEMOP, SECEJ, COEJC]. LOS CARGA
  //ListadoHistorialIntegrantesSolicInfraestComponent (QUE LOS USA TAMBIÉN EN SU COMBO DE FILTRO); SI LA UNIDAD MILITAR DE LA
  //SOLICITUD NO TIENE LÍNEA DE MANDO REGISTRADA, SOLO TRAE LA PROPIA UNIDAD MILITAR DE LA SOLICITUD:
  @Input() pasosLineaMando: string[] = [];
  //TRAMO COMÚN Y FINALES ALTERNATIVOS DE LA LÍNEA DE MANDO (EJ. BAICC->BRICC->CAOCC->SECEJ->[JEMPP->CEDE10][CEDE10][JEMGF->COING]).
  //SI TIENE FINALES, EL COMBO MUESTRA PRIMERO LOS PASOS DEL TRAMO COMÚN Y LUEGO UN GRUPO POR CADA FINAL ALTERNATIVO:
  @Input() estructuraLineaMando: EstructuraLineaMando | null = null;
  //TODOS LOS REGISTROS DEL HISTORIAL DE INTEGRANTES DE ESTA SOLICITUD (SIN FILTROS), PARA SABER QUÉ INTEGRANTES PREDETERMINADOS
  //YA ESTÁN REGISTRADOS Y OCULTAR LOS PASOS (UNIDADES MILITARES) DE LA LÍNEA DE MANDO QUE YA NO TIENEN INTEGRANTES PENDIENTES:
  @Input() registrosSolicitud: HistorialIntegrantesSolicInfraestI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialIntegrantesSolicInfraestI>();
  @Output() eliminar = new EventEmitter<number>();

  form: FormGroup;
  busquedaForm: FormGroup;
  cargosIntegrantesDocumentos: CargosIntegrantesDocumentosI[] = [];
  //INTEGRANTES DEL HISTORIAL DE INTEGRANTES DE DOCUMENTOS MARCADOS COMO "SI" EN "PREDETERMINADO ACTUAL" DE LAS UNIDADES MILITARES
  //MILITARES DE LA LÍNEA DE MANDO DE LA SOLICITUD (NO DE TODAS), PARA CALCULAR LOS PENDIENTES DE CADA PASO:
  predeterminadosTodos: HistorialIntegrantesDocumentosI[] = [];
  predeterminadosCargados = false;
  cargosCargados = false;
  //PREDETERMINADOS YA CONSULTADOS POR SIGLA O ACRÓNIMO DE UNIDAD MILITAR Y SIGLAS O ACRÓNIMOS QUE ESTÁN EN CONSULTA, PARA NO REPETIR
  //CONSULTAS CUANDO LA LÍNEA DE MANDO LLEGA DESPUÉS O CAMBIA:
  private readonly predeterminadosPorSiglaoAcronimo = new Map<string, HistorialIntegrantesDocumentosI[]>();
  private readonly siglasoAcronimosEnConsulta = new Set<string>();
  //INTEGRANTES PREDETERMINADOS ("SI") DE LA UNIDAD MILITAR DEL PASO SELECCIONADO QUE AÚN NO ESTÁN REGISTRADOS EN LA SOLICITUD:
  historialesPredeterminados: HistorialIntegrantesDocumentosI[] = [];
  historialesDelCargo: HistorialIntegrantesDocumentosI[] = [];
  //ID DEL INTEGRANTE PREDETERMINADO ("SI") CARGADO DESDE EL HISTORIAL DE INTEGRANTES DE DOCUMENTOS. AL CREAR UN REGISTRO ES
  //OBLIGATORIO, PORQUE SOLO SE PUEDEN AGREGAR INTEGRANTES PREDETERMINADOS PARA FIRMAR (SUS DATOS NO SE ESCRIBEN A MANO):
  idHistorialIntegranteCargado: number | null = null;
  //UNIDAD MILITAR DEL INTEGRANTE (SE GUARDA EN ID_UNIDAD_MILITAR; EN PANTALLA SOLO SE MUESTRA SU SIGLA O ACRÓNIMO):
  unidadMilitarIntegrante: UnidadesMilitaresI | null = null;
  mensajeBusqueda = '';
  //INDICA SI EL USUARIO YA ELIGIÓ UN PASO EN EL COMBO "UNIDAD MILITAR"; MIENTRAS NO LO HAGA, SE MANTIENE SELECCIONADO EL PASO SIGUIENTE:
  private pasoElegidoPorUsuario = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cargosIntegrantesDocumentosService: CargosIntegrantesDocumentosService,
    private readonly historialIntegrantesDocumentosService: HistorialIntegrantesDocumentosService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.form = this.crearFormulario();
    this.busquedaForm = this.crearFormularioBusqueda();
  }

  //AL ABRIR EL FORMULARIO SE CONSULTAN EL CATÁLOGO DE CARGOS Y LOS INTEGRANTES PREDETERMINADOS ("SI") DE LAS UNIDADES MILITARES DE LA
  //LÍNEA DE MANDO. EL PASO (UNIDAD MILITAR) SIGUIENTE YA QUEDÓ SELECCIONADO EN ngOnChanges; CUANDO LLEGAN LOS DATOS SE CONSERVA
  //ESE PASO Y SE LLENA SU COMBO "CARGO", QUE SOLO QUEDA VACÍO SI LA UNIDAD MILITAR NO TIENE INTEGRANTES PREDETERMINADOS EN EL HISTORIAL
  //DE INTEGRANTES DE DOCUMENTOS:
  ngOnInit(): void {
    this.cargosIntegrantesDocumentosService.findAllDocumentMemberPositions(undefined, undefined, 'nombreCargoIntegranteDocumentos', 'ASC').subscribe({
      next: cargos => {
        this.cargosIntegrantesDocumentos = cargos;
        this.cargosCargados = true;
        this.recalcularPredeterminados();
      },
      error: () => {
        this.cargosCargados = true;
        this.mensajeBusqueda = 'No fue posible consultar los cargos de integrantes de documentos.';
        this.recalcularPredeterminados();
      }
    });
    this.cargarPredeterminadosFaltantes();
  }

  //CONSULTA LOS PREDETERMINADOS SOLO DE LAS UNIDADES MILITARES DE LA LÍNEA DE MANDO QUE AÚN NO SE HAN CONSULTADO, UNA CONSULTA POR
  //UNIDAD MILITAR Y TODAS EN PARALELO (forkJoin). CONSULTAR TODO EL HISTORIAL DE INTEGRANTES DE DOCUMENTOS TARDABA CERCA DE 10 SEGUNDOS;
  //POR UNIDAD MILITAR SON MENOS DE 0,2 SEGUNDOS. SI UNA CONSULTA FALLA, ESA UNIDAD MILITAR QUEDA SIN PREDETERMINADOS Y SE AVISA:
  private cargarPredeterminadosFaltantes(): void {
    const faltantes = [...new Set(this.pasosLineaMando.map(paso => String(paso ?? '').trim().toUpperCase()))]
      .filter(siglaoAcronimo => !!siglaoAcronimo && !this.predeterminadosPorSiglaoAcronimo.has(siglaoAcronimo) && !this.siglasoAcronimosEnConsulta.has(siglaoAcronimo));
    if (!faltantes.length) {
      this.recalcularPredeterminados();
      return;
    }
    faltantes.forEach(siglaoAcronimo => this.siglasoAcronimosEnConsulta.add(siglaoAcronimo));
    this.predeterminadosCargados = false;
    forkJoin(faltantes.map(siglaoAcronimo =>
      this.historialIntegrantesDocumentosService.findAllDocumentMemberHistories(undefined, siglaoAcronimo, undefined, 'nombresIntegranteDocumentos', 'ASC')
        .pipe(catchError(() => of(null)))
    )).subscribe(resultados => {
      faltantes.forEach((siglaoAcronimo, indice) => {
        this.siglasoAcronimosEnConsulta.delete(siglaoAcronimo);
        this.predeterminadosPorSiglaoAcronimo.set(siglaoAcronimo, (resultados[indice] ?? []).filter(historial => this.esPredeterminado(historial)));
      });
      if (resultados.some(resultado => resultado === null)) {
        this.mensajeBusqueda = 'No fue posible consultar el historial de integrantes de documentos de algunas unidades militares.';
      }
      this.recalcularPredeterminados();
    });
  }

  //JUNTA LOS PREDETERMINADOS CONSULTADOS Y, CUANDO YA ESTÁN LOS CARGOS Y LOS DE TODAS LAS UNIDADES MILITARES DE LA LÍNEA DE MANDO,
  //ACTUALIZA EL PASO SELECCIONADO Y SU COMBO "CARGO". COMO ESTE FORMULARIO SE MUESTRA DENTRO DE
  //ListadoSolicitudesInfraestructurasComponent (ChangeDetectionStrategy.OnPush), SE PIDE REDIBUJAR (markForCheck):
  private recalcularPredeterminados(): void {
    this.predeterminadosTodos = [...this.predeterminadosPorSiglaoAcronimo.values()].flat();
    this.predeterminadosCargados = this.cargosCargados && this.siglasoAcronimosEnConsulta.size === 0;
    this.actualizarPasoSeleccionado();
    this.cdr.markForCheck();
  }

  //SOLO SE REINICIAN LOS FORMULARIOS CUANDO CAMBIA EL MODO, EL REGISTRO O LA SOLICITUD; ASÍ UNA ACTUALIZACIÓN DE
  //cargosRegistrados O registrosSolicitud (QUE LLEGAN DESPUÉS DESDE EL LISTADO) NO BORRA LA BÚSQUEDA EN CURSO. AL REINICIAR
  //SE DEJA SELECCIONADO EL PASO SIGUIENTE DE LA LÍNEA DE MANDO (VER pasoPorDefecto), SIN ESPERAR A LOS PREDETERMINADOS:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['data'] || changes['solicitudInfraestructura']) {
      this.form = this.crearFormulario();
      this.busquedaForm = this.crearFormularioBusqueda();
      this.historialesDelCargo = [];
      this.mensajeBusqueda = '';
      if (this.modo === 'eliminar') this.form.disable();
      this.pasoElegidoPorUsuario = false;
      this.seleccionarPaso(this.pasoPorDefecto);
      return;
    }
    //SI LA LÍNEA DE MANDO O LOS REGISTROS DE LA SOLICITUD LLEGAN DESPUÉS, SE REVISA QUE EL PASO ELEGIDO SIGA DISPONIBLE:
    if (changes['pasosLineaMando'] && !changes['pasosLineaMando'].firstChange) {
      this.cargarPredeterminadosFaltantes();
      return;
    }
    if (changes['pasosLineaMando'] || changes['estructuraLineaMando'] || changes['registrosSolicitud']) {
      this.actualizarPasoSeleccionado();
    }
  }

  //CLAVE PARA RECONOCER A UNA MISMA PERSONA DE UNA MISMA UNIDAD MILITAR EN AMBOS HISTORIALES (SIGLA O ACRÓNIMO + NOMBRES Y APELLIDOS):
  private claveIntegrante(siglaoAcronimo: unknown, nombres: unknown, primerApellido: unknown, segundoApellido: unknown): string {
    return [siglaoAcronimo, nombres, primerApellido, segundoApellido].map(valor => String(valor ?? '').trim().toUpperCase()).join('|');
  }

  //INDICA SI EL INTEGRANTE PREDETERMINADO YA ESTÁ REGISTRADO EN EL HISTORIAL DE INTEGRANTES DE ESTA SOLICITUD:
  private estaRegistradoEnSolicitud(historial: HistorialIntegrantesDocumentosI): boolean {
    const clave = this.claveIntegrante(historial.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar, historial.nombresIntegranteDocumentos, historial.primerApellidoIntegranteDocumentos, historial.segundoApellidoIntegranteDocumentos);
    return this.registrosSolicitud.some(registro =>
      this.claveIntegrante(registro.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar, registro.nombresIntegranteSolicitudInfraestructura, registro.primerApellidoIntegranteSolicitudInfraestructura, registro.segundoApellidoIntegranteSolicitudInfraestructura) === clave
    );
  }

  //INTEGRANTES PREDETERMINADOS ("SI") DE LA UNIDAD MILITAR DEL PASO QUE AÚN NO ESTÁN REGISTRADOS EN LA SOLICITUD:
  private pendientesDelPaso(siglaoAcronimo: string): HistorialIntegrantesDocumentosI[] {
    const siglaoAcronimoPaso = String(siglaoAcronimo ?? '').trim().toUpperCase();
    return this.predeterminadosTodos.filter(h =>
      String(h.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '').trim().toUpperCase() === siglaoAcronimoPaso && !this.estaRegistradoEnSolicitud(h)
    );
  }

  //INDICA SI LA UNIDAD MILITAR DEL PASO YA TIENE AL MENOS UN INTEGRANTE REGISTRADO EN EL HISTORIAL DE ESTA SOLICITUD:
  private tieneIntegrantesRegistrados(siglaoAcronimo: string): boolean {
    const siglaoAcronimoPaso = String(siglaoAcronimo ?? '').trim().toUpperCase();
    return this.registrosSolicitud.some(registro => String(registro.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '').trim().toUpperCase() === siglaoAcronimoPaso);
  }

  //UN PASO SE OFRECE EN EL COMBO "UNIDAD MILITAR" AL CREAR SI SU UNIDAD MILITAR AÚN NO TIENE NINGÚN INTEGRANTE REGISTRADO EN LA
  //SOLICITUD O SI TIENE AL MENOS UN INTEGRANTE PREDETERMINADO ("SI") PENDIENTE POR REGISTRAR. SOLO SE OCULTA LA SIGLA O ACRÓNIMO DE UNA
  //UNIDAD MILITAR CUANDO YA TIENE INTEGRANTES REGISTRADOS Y NO LE QUEDA NINGÚN PREDETERMINADO PENDIENTE:
  private estaDisponible(opcion: OpcionPasoLineaMando): boolean {
    return this.modo !== 'guardar' || !this.tieneIntegrantesRegistrados(opcion.siglaoAcronimo) || this.pendientesDelPaso(opcion.siglaoAcronimo).length > 0;
  }

  //SIGLAS O ACRÓNIMOS (EN MAYÚSCULA) DE LAS UNIDADES MILITARES QUE YA TIENEN INTEGRANTES REGISTRADOS EN EL HISTORIAL DE ESTA SOLICITUD:
  private get siglasoAcronimosConIntegrantes(): Set<string> {
    return new Set(this.registrosSolicitud.map(registro => String(registro.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '').trim().toUpperCase()));
  }

  //PASOS DEL TRAMO COMÚN DE LA LÍNEA DE MANDO (SI LA LÍNEA NO TIENE FINALES ALTERNATIVOS, SON TODOS SUS PASOS) QUE SE OFRECEN:
  get opcionesTramoComunDisponibles(): OpcionPasoLineaMando[] {
    const tramoComun = this.estructuraLineaMando?.finalesAlternativos.length ? this.estructuraLineaMando.tramoComun : this.pasosLineaMando;
    return tramoComun
      .map((siglaoAcronimo, indice) => ({ valor: siglaoAcronimo, siglaoAcronimo, numero: indice + 1, numeroFinal: null }))
      .filter(opcion => this.estaDisponible(opcion));
  }

  //UN GRUPO POR CADA FINAL ALTERNATIVO VIGENTE (MIENTRAS LA SOLICITUD NO TENGA INTEGRANTES EN NINGÚN FINAL SE OFRECEN TODOS;
  //CUANDO YA LOS TIENE, SOLO EL CAMINO TOMADO, IGUAL QUE EN LA LÍNEA DE MANDO DEL LISTADO DE SOLICITUDES). LOS PASOS SE
  //NUMERAN A CONTINUACIÓN DEL TRAMO COMÚN Y SE OCULTAN LOS GRUPOS QUE YA NO TIENEN PASOS DISPONIBLES:
  get gruposFinalesDisponibles(): GrupoFinalAlternativoLineaMando[] {
    const estructura = this.estructuraLineaMando;
    if (!estructura?.finalesAlternativos.length) return [];
    const totalTramoComun = estructura.tramoComun.length;
    return obtenerIndicesFinalesVigentes(estructura, this.siglasoAcronimosConIntegrantes)
      .map(indice => {
        const final = estructura.finalesAlternativos[indice];
        const numeroFinal = indice + 1;
        return {
          numeroFinal,
          etiqueta: `Final alternativo ${numeroFinal}: ${final.join(' → ')}`,
          opciones: final
            .map((siglaoAcronimo, posicion) => ({ valor: `F${numeroFinal}|${siglaoAcronimo}`, siglaoAcronimo, numero: totalTramoComun + posicion + 1, numeroFinal }))
            .filter(opcion => this.estaDisponible(opcion))
        };
      })
      .filter(grupo => grupo.opciones.length > 0);
  }

  //TODOS LOS PASOS DISPONIBLES DE LA LÍNEA DE MANDO (TRAMO COMÚN Y TODOS LOS FINALES ALTERNATIVOS VIGENTES), EN ORDEN; SE USA
  //PARA SABER SI LA LÍNEA DE MANDO YA ESTÁ COMPLETA:
  get pasosDisponibles(): OpcionPasoLineaMando[] {
    return [...this.opcionesTramoComunDisponibles, ...this.gruposFinalesDisponibles.flatMap(grupo => grupo.opciones)];
  }

  //PRIMERA UNIDAD MILITAR DEL TRAMO COMÚN QUE AÚN NO TIENE INTEGRANTES REGISTRADOS EN LA SOLICITUD (MIENTRAS EXISTA, LA LÍNEA DE MANDO
  //NO HA LLEGADO A SUS FINALES ALTERNATIVOS):
  private get siguienteDelTramoComun(): OpcionPasoLineaMando | undefined {
    return this.opcionesTramoComunDisponibles.find(opcion => !this.tieneIntegrantesRegistrados(opcion.siglaoAcronimo));
  }

  //LA LÍNEA DE MANDO LLEGÓ A SUS FINALES ALTERNATIVOS Y QUEDA MÁS DE UNO VIGENTE: NO SE SELECCIONA UNIDAD MILITAR POR DEFECTO HASTA QUE
  //SE ELIJA EN EL COMBO UNA UNIDAD MILITAR DE UNO DE LOS FINALES (ELEGIRLA ES ELEGIR ESE FINAL):
  get debeElegirFinal(): boolean {
    return this.gruposFinalesDisponibles.length > 1 && !this.siguienteDelTramoComun;
  }

  //PASO SIGUIENTE DE LA LÍNEA DE MANDO QUE SE SELECCIONA POR DEFECTO: LA PRIMERA UNIDAD MILITAR DEL TRAMO COMÚN QUE AÚN NO TIENE
  //INTEGRANTES REGISTRADOS EN LA SOLICITUD. SI EL TRAMO COMÚN YA LOS TIENE TODOS Y SOLO QUEDA UN FINAL (EL CAMINO TOMADO), SU
  //PRIMERA UNIDAD MILITAR SIN INTEGRANTES; SI QUEDAN VARIOS FINALES, NINGUNA HASTA QUE SE ELIJA UNA UNIDAD MILITAR DE UNO DE ELLOS:
  private get pasoPorDefecto(): string {
    const siguiente = this.siguienteDelTramoComun;
    if (siguiente) return siguiente.valor;
    const grupos = this.gruposFinalesDisponibles;
    if (grupos.length > 1) return '';
    if (grupos.length === 1) {
      const final = grupos[0].opciones;
      return (final.find(opcion => !this.tieneIntegrantesRegistrados(opcion.siglaoAcronimo)) ?? final[0]).valor;
    }
    return this.opcionesTramoComunDisponibles[0]?.valor ?? '';
  }

  //SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR DEL PASO ELEGIDO EN EL COMBO (SIN EL NÚMERO DEL FINAL ALTERNATIVO):
  get siglaoAcronimoPasoSeleccionado(): string {
    return this.siglaoAcronimoDeValorPaso(String(this.busquedaForm.get('pasoSeleccionado')?.value || ''));
  }

  private siglaoAcronimoDeValorPaso(valor: string): string {
    return valor.includes('|') ? valor.slice(valor.indexOf('|') + 1) : valor;
  }

  //INDICA QUE TODAS LAS UNIDADES MILITARES DE LA LÍNEA DE MANDO YA TIENEN INTEGRANTES REGISTRADOS Y NO LES QUEDA NINGÚN PREDETERMINADO POR REGISTRAR:
  get lineaMandoCompleta(): boolean {
    return this.modo === 'guardar' && this.predeterminadosCargados && this.pasosLineaMando.length > 0 && this.pasosDisponibles.length === 0;
  }

  //SI EL PASO ELEGIDO YA NO ESTÁ DISPONIBLE (O AÚN NO HAY PASO), SE SELECCIONA EL PASO SIGUIENTE; SI SIGUE DISPONIBLE, SOLO
  //SE ACTUALIZAN SUS INTEGRANTES PENDIENTES (Y CON ELLOS EL COMBO "CARGO") SIN BORRAR EL CARGO ELEGIDO:
  //MIENTRAS EL USUARIO NO HAYA ELEGIDO UN PASO, EL PASO POR DEFECTO SE VUELVE A CALCULAR CADA VEZ QUE LLEGAN DATOS (LÍNEA DE
  //MANDO, REGISTROS DE LA SOLICITUD O PREDETERMINADOS), PORQUE AL ABRIR EL FORMULARIO PUEDEN NO HABER LLEGADO TODOS:
  private actualizarPasoSeleccionado(): void {
    const valorActual = String(this.busquedaForm.get('pasoSeleccionado')?.value || '');
    if (!this.pasoElegidoPorUsuario && valorActual !== this.pasoPorDefecto) {
      this.seleccionarPaso(this.pasoPorDefecto);
      return;
    }
    if (!valorActual || !this.pasosDisponibles.some(opcion => opcion.valor === valorActual)) {
      this.pasoElegidoPorUsuario = false;
      this.seleccionarPaso(this.pasoPorDefecto);
      return;
    }
    const pasoActual = this.siglaoAcronimoDeValorPaso(valorActual);
    this.historialesPredeterminados = this.pendientesDelPaso(pasoActual);
    const idCargo = Number(this.busquedaForm.get('cargoSeleccionado')?.value);
    this.historialesDelCargo = idCargo ? this.historialesPredeterminados.filter(h => h.cargoIntegranteDocumentosDTO?.idCargoIntegranteDocumentos === idCargo) : [];
    if (this.predeterminadosCargados && !this.historialesPredeterminados.length) {
      this.mensajeBusqueda = `La unidad militar ${pasoActual} no tiene integrantes predeterminados para firmar (SI) en el historial de integrantes de documentos.`;
    }
  }

  //AL CAMBIAR EL PASO (UNIDAD MILITAR) DE LA LÍNEA DE MANDO SE REINICIA LA BÚSQUEDA Y SE CARGAN SUS INTEGRANTES PENDIENTES:
  onCambioPaso(): void {
    this.pasoElegidoPorUsuario = true;
    this.seleccionarPaso(String(this.busquedaForm.get('pasoSeleccionado')?.value || ''));
  }

  private seleccionarPaso(valorPaso: string): void {
    const siglaoAcronimo = this.siglaoAcronimoDeValorPaso(valorPaso);
    this.busquedaForm.patchValue({ pasoSeleccionado: valorPaso, cargoSeleccionado: '', integranteSeleccionado: '' });
    this.historialesDelCargo = [];
    this.historialesPredeterminados = siglaoAcronimo ? this.pendientesDelPaso(siglaoAcronimo) : [];
    if (this.lineaMandoCompleta) {
      this.mensajeBusqueda = 'Todos los integrantes predeterminados para firmar de la línea de mando ya están registrados en esta solicitud.';
    } else if (!siglaoAcronimo && this.debeElegirFinal) {
      this.mensajeBusqueda = 'La línea de mando llegó a sus finales alternativos: seleccione en el combo la unidad militar del final alternativo que seguirá la solicitud.';
    } else if (siglaoAcronimo && this.predeterminadosCargados && !this.historialesPredeterminados.length) {
      //UNIDAD MILITAR SIN INTEGRANTES REGISTRADOS QUE TAMPOCO TIENE PREDETERMINADOS EN EL HISTORIAL DE INTEGRANTES DE DOCUMENTOS:
      this.mensajeBusqueda = `La unidad militar ${siglaoAcronimo} no tiene integrantes predeterminados para firmar (SI) en el historial de integrantes de documentos.`;
    } else {
      this.mensajeBusqueda = '';
    }
  }

  //INDICA SI EL INTEGRANTE DEL HISTORIAL DE INTEGRANTES DE DOCUMENTOS ESTÁ PREDETERMINADO PARA FIRMAR ("SI"):
  private esPredeterminado(historial: HistorialIntegrantesDocumentosI): boolean {
    return String(historial.siONoActualIntegranteDocumentosPredeterminado ?? '').trim().toUpperCase() === 'SI';
  }

  //CARGOS DEL CATÁLOGO QUE TIENEN AL MENOS UN INTEGRANTE PREDETERMINADO ("SI") EN LA UNIDAD MILITAR DEL PASO SELECCIONADO;
  //SOLO ESTOS SE OFRECEN EN EL COMBO "CARGO":
  get cargosConIntegrantesPredeterminados(): CargosIntegrantesDocumentosI[] {
    return this.cargosIntegrantesDocumentos.filter(cargo =>
      this.historialesPredeterminados.some(h => h.cargoIntegranteDocumentosDTO?.idCargoIntegranteDocumentos === cargo.idCargoIntegranteDocumentos)
    );
  }

  //FILTRA LOS INTEGRANTES PREDETERMINADOS DE LA UNIDAD MILITAR DEL PASO SEGÚN EL CARGO SELECCIONADO:
  onCambioCargo(): void {
    const idCargo = Number(this.busquedaForm.get('cargoSeleccionado')?.value);
    this.busquedaForm.get('integranteSeleccionado')?.setValue('');
    this.historialesDelCargo = idCargo
      ? this.historialesPredeterminados.filter(h => h.cargoIntegranteDocumentosDTO?.idCargoIntegranteDocumentos === idCargo)
      : [];
    this.mensajeBusqueda = idCargo && !this.historialesDelCargo.length
      ? 'No hay integrantes predeterminados de la unidad militar seleccionada con ese cargo.'
      : '';
  }

  //CARGA EN EL FORMULARIO LOS DATOS DEL INTEGRANTE SELECCIONADO DEL HISTORIAL DE INTEGRANTES DE DOCUMENTOS (NOMBRES,
  //PRIMER Y SEGUNDO APELLIDO VIENEN EN CAMPOS SEPARADOS Y SE COPIAN TAL CUAL), INCLUIDA SU UNIDAD MILITAR:
  cargarIntegranteSeleccionado(): void {
    const id = Number(this.busquedaForm.get('integranteSeleccionado')?.value);
    const historial = this.historialesDelCargo.find(item => item.idHistorialIntegranteDocumentos === id);
    if (!historial || !this.esPredeterminado(historial)) return;
    this.idHistorialIntegranteCargado = historial.idHistorialIntegranteDocumentos ?? null;
    this.unidadMilitarIntegrante = historial.unidadMilitarDTO ?? null;
    this.form.patchValue({
      unidad: historial.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '',
      grado: historial.gradoIntegranteDocumentos ?? '',
      nombres: historial.nombresIntegranteDocumentos ?? '',
      apellido1: historial.primerApellidoIntegranteDocumentos ?? '',
      apellido2: historial.segundoApellidoIntegranteDocumentos ?? '',
      cargo: historial.cargoIntegranteDocumentos ?? '',
      firma: historial.nombreArchivoFotoFirmaIntegranteDocumentos ?? ''
    });
    this.mensajeBusqueda = this.cargoRepetido
      ? 'El cargo de este integrante ya está registrado para su unidad militar en el historial de esta solicitud.'
      : 'Datos del integrante cargados correctamente.';
  }

  //CLAVE "SIGLA O ACRÓNIMO|CARGO" (EN MAYÚSCULA) CON LA QUE EL LISTADO ENVÍA LOS CARGOS YA REGISTRADOS DE CADA UNIDAD MILITAR:
  static claveCargoUnidadMilitar(siglaoAcronimo: unknown, cargo: unknown): string {
    return `${String(siglaoAcronimo ?? '').trim().toUpperCase()}|${String(cargo ?? '').trim().toUpperCase()}`;
  }

  //INDICA SI EL CARGO DEL FORMULARIO YA ESTÁ REGISTRADO PARA LA MISMA UNIDAD MILITAR EN OTRO REGISTRO DEL HISTORIAL DE
  //ESTA SOLICITUD (LA MISMA DENOMINACIÓN DE CARGO SÍ PUEDE REPETIRSE EN OTRA UNIDAD MILITAR DE LA LÍNEA DE MANDO):
  get cargoRepetido(): boolean {
    const cargo = String(this.form.get('cargo')?.value || '').trim();
    const siglaoAcronimo = this.unidadMilitarIntegrante?.siglaoAcronimoUnidadMilitar;
    if (!cargo || !siglaoAcronimo) return false;
    const clave = AddUpdDelHistorialIntegranteSolicInfraestComponent.claveCargoUnidadMilitar(siglaoAcronimo, cargo);
    const claveActual = AddUpdDelHistorialIntegranteSolicInfraestComponent.claveCargoUnidadMilitar(this.data?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar, this.data?.cargoIntegranteSolicitudInfraestructura);
    if (this.modo === 'modificar' && clave === claveActual) return false;
    return this.cargosRegistrados.includes(clave);
  }

  //TODAS LAS COLUMNAS DE LA TABLA SON NOT NULL: LA UNIDAD MILITAR Y LA FIRMA SE TOMAN DEL HISTORIAL DE INTEGRANTES DE
  //DOCUMENTOS (NO SE ESCRIBEN A MANO), ASÍ QUE SE EXIGE HABER CARGADO UN INTEGRANTE QUE LAS TENGA. AL CREAR, ADEMÁS, EL
  //INTEGRANTE DEBE HABERSE CARGADO DESDE LA LISTA DE PREDETERMINADOS ("SI"):
  get faltanDatosIntegrante(): boolean {
    if (this.modo === 'guardar' && !this.idHistorialIntegranteCargado) return true;
    return !this.unidadMilitarIntegrante || !String(this.form.get('firma')?.value || '').trim();
  }

  enviar(): void {
    if (this.form.invalid || this.cargoRepetido || this.faltanDatosIntegrante || !this.solicitudInfraestructura || !this.unidadMilitarIntegrante) {
      this.form.markAllAsTouched();
      return;
    }
    const valor = this.form.getRawValue();
    this.guardar.emit({
      idHistorialIntegranteSolicitudInfraestructura: valor.id ?? undefined,
      numRegHistorialIntegranteSolicitudInfraestructura: valor.registro,
      solicitudInfraestructuraDTO: this.solicitudInfraestructura,
      unidadMilitarDTO: this.unidadMilitarIntegrante,
      gradoIntegranteSolicitudInfraestructura: valor.grado,
      nombresIntegranteSolicitudInfraestructura: valor.nombres,
      primerApellidoIntegranteSolicitudInfraestructura: valor.apellido1,
      segundoApellidoIntegranteSolicitudInfraestructura: valor.apellido2,
      nombreArchivoFotoFirmaIntegranteSolicitudInfraestructura: valor.firma,
      cargoIntegranteSolicitudInfraestructura: valor.cargo
    });
  }

  confirmar(): void {
    const id = this.form.getRawValue().id;
    if (id) this.eliminar.emit(Number(id));
  }

  private crearFormularioBusqueda(): FormGroup {
    return this.fb.group({ pasoSeleccionado: [''], cargoSeleccionado: [''], integranteSeleccionado: [''] });
  }

  private crearFormulario(): FormGroup {
    const item = this.data;
    this.unidadMilitarIntegrante = item?.unidadMilitarDTO ?? null;
    this.idHistorialIntegranteCargado = null;
    //AL CREAR, LOS DATOS DE LA PERSONA SOLO SE LLENAN ELIGIENDO UN INTEGRANTE PREDETERMINADO ("SI"), POR ESO QUEDAN DE SOLO LECTURA:
    const soloDesdePredeterminado = this.modo === 'guardar';
    return this.fb.group({
      id: [item?.idHistorialIntegranteSolicitudInfraestructura ?? null],
      //EL NUMERO DE REGISTRO LO GENERA EL BACKEND Y NO DEBE SER MODIFICADO DESDE EL FRONTEND.
      registro: [{ value: item?.numRegHistorialIntegranteSolicitudInfraestructura ?? '', disabled: true }],
      //LA UNIDAD MILITAR SE TOMA DEL INTEGRANTE CARGADO DEL HISTORIAL DE INTEGRANTES DE DOCUMENTOS; SOLO SE MUESTRA SU SIGLA.
      unidad: [{ value: item?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '', disabled: true }],
      grado: [{ value: item?.gradoIntegranteSolicitudInfraestructura ?? '', disabled: soloDesdePredeterminado }, Validators.required],
      nombres: [{ value: item?.nombresIntegranteSolicitudInfraestructura ?? '', disabled: soloDesdePredeterminado }, Validators.required],
      apellido1: [{ value: item?.primerApellidoIntegranteSolicitudInfraestructura ?? '', disabled: soloDesdePredeterminado }, Validators.required],
      apellido2: [{ value: item?.segundoApellidoIntegranteSolicitudInfraestructura ?? '', disabled: soloDesdePredeterminado }, Validators.required],
      cargo: [{ value: item?.cargoIntegranteSolicitudInfraestructura ?? '', disabled: soloDesdePredeterminado }, Validators.required],
      //EL NOMBRE DEL ARCHIVO DE LA FIRMA SE TOMA DEL HISTORIAL DE INTEGRANTES DE DOCUMENTOS Y NO SE EDITA A MANO.
      firma: [{ value: item?.nombreArchivoFotoFirmaIntegranteSolicitudInfraestructura ?? '', disabled: true }]
    });
  }
}
