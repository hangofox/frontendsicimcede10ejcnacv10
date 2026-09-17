import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { InfraestructurasI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';
import { HistorialResponsablesInfraestI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/historial-responsables-infraest/historial-responsables-infraest.interface';
import { ResponsablesI } from '../../../../../../interfaces/panel-control/responsables/responsables.interface';

import { HistorialResponsablesInfraestService } from '../../../../../../services/digei/finca-raiz/infraestructuras/historial-responsables-infraest/historial-responsables-infraest.service';
import { ResponsablesService } from '../../../../../../services/panel-control/responsables/responsables.service';
import { UnidadesMilitaresService } from '../../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { ParametrosSistemaService } from '../../../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';
import { SpinnerService } from '../../../../../../services/spinner/spinner.service';

import { VistaHistorialResponsablesInfraestComponent } from '../vista-historial-responsables-infraest/vista-historial-responsables-infraest.component';
import { MicrolistadoResponsablesComponent } from '../../../../../panel-control/responsables/microlistado-responsables/microlistado-responsables.component';

@Component({
  selector: 'app-listado-add-upd-del-responsables-infraest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, VistaHistorialResponsablesInfraestComponent, MicrolistadoResponsablesComponent],
  templateUrl: './listado-add-upd-del-responsables-infraest.component.html',
  styleUrl: './listado-add-upd-del-responsables-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoAddUpdDelResponsablesInfraestComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) infraestructura!: InfraestructurasI;

  historiales: HistorialResponsablesInfraestI[] = [];
  totalRegistros = 0;
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //CONSULTA DEL RESPONSABLE POR NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN: SE MUESTRAN SUS DATOS Y SU FOTOGRAFÍA ANTES
  //DE AGREGARLO A LA INFRAESTRUCTURA — MISMO PATRÓN QUE
  //ListadoAddUpdDelResponsablesHardySoftComponent.cargarDatosResponsableHardySoftporNumeroDocumentoIdentificacion()
  //DEL PROYECTO DE REFERENCIA PortalSiadmecEjcNacionalV20:
  responsableConsultado: ResponsablesI | null = null;
  fotoResponsableConsultado: string | null = null;
  mensajeConsultaResponsable = '';
  consultandoResponsable = false;
  //EL NÚMERO DE DOCUMENTO SE ELIGE EN EL MICROLISTADO DE RESPONSABLES, QUE SE ABRE COMO UNA VENTANA SOBRE ESTE
  //FORMULARIO — MISMO PATRÓN QUE MicrolistadoResponsablesComponent DEL PROYECTO DE REFERENCIA:
  modalMicrolistadoVisible = false;
  private subscriptionsFoto = new Subscription();

  form: FormGroup;
  responsablesInfraestForm!: FormGroup;

  modalCrudVisible = false;
  modalVistaVisible = false;
  modo: 'guardar' | 'modificar' | 'eliminar' | 'predeterminar' = 'guardar';
  seleccionado: HistorialResponsablesInfraestI | null = null;
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudPredeterminar(): boolean { return this.modo === 'predeterminar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private service: HistorialResponsablesInfraestService,
    private responsablesService: ResponsablesService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService,
    private spinnerService: SpinnerService
  ) {
    //EL CAMPO DEL DOCUMENTO VIVE EN EL FORMULARIO DEL PANEL, NO EN EL DEL CRUD: LA CONSULTA DEL RESPONSABLE SE HACE
    //EN LA MISMA PANTALLA DEL HISTORIAL, ENCIMA DEL LISTADO:
    this.form = this.formBuilder.group({
      palabraClave: new FormControl(''),
      registrosPagina: new FormControl('10'),
      numeroDocumentoIdentificacionResponsableConsultado: new FormControl('')
    });
    this.initResponsablesInfraestForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['infraestructura'] && this.infraestructura?.idInfraestructura) {
      this.buscar();
    }
  }

  buscar(): void {
    this.paginaActual = 0;
    this.listar();
  }

  //EL BACKEND NO EXPONE UN FILTRO POR idInfraestructura EN /historialesResponsablesInfraestructuras (EL CONTROLADOR
  //SOLO RECIBE idHistorialResponsableInfraestructura Y keyword), ASÍ QUE SE TRAE EL LISTADO FILTRADO POR PALABRA
  //CLAVE Y EL RECORTE POR INFRAESTRUCTURA Y LA PAGINACIÓN SE HACEN AQUÍ:
  //irAUltimaPagina SE USA DESPUÉS DE AGREGAR: EL REGISTRO NUEVO ENTRA AL FINAL POR ORDEN DE ID, ASÍ QUE HAY QUE
  //POSICIONARSE EN LA ÚLTIMA PÁGINA PARA QUE QUEDE A LA VISTA DE INMEDIATO.
  listar(irAUltimaPagina = false): void {
    const keyword = String(this.form.value.palabraClave || '').trim().toUpperCase() || undefined;
    this.service.findAllInfrastructureResponsibleHistories(undefined, keyword, 'idHistorialResponsableInfraestructura', 'ASC').subscribe({
      next: registros => {
        const historialesInfraestructura = registros.filter(historial =>
          Number(historial.infraestructuraDTO?.idInfraestructura) === Number(this.infraestructura.idInfraestructura)
        );
        this.totalRegistros = historialesInfraestructura.length;
        const ultimaPagina = Math.max(0, this.totalPaginas() - 1);
        this.paginaActual = irAUltimaPagina ? ultimaPagina : Math.min(this.paginaActual, ultimaPagina);
        const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
        this.historiales = historialesInfraestructura.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
        this.changeDetectorRef.markForCheck();
      },
      error: error => console.error('ERROR AL LISTAR HISTORIAL DE RESPONSABLES DE LA INFRAESTRUCTURA: ', error)
    });
  }

  //INICIALIZA EL FORMULARIO DEL CRUD CON LOS DATOS DEL REGISTRO SELECCIONADO (O VACÍO AL CREAR UNO NUEVO):
  private initResponsablesInfraestForm(): void {
    const historial = this.seleccionado;
    this.responsablesInfraestForm = this.formBuilder.group({
      idHistorialResponsableInfraestructura: [historial?.idHistorialResponsableInfraestructura ?? null],
      //EL NÚMERO DE REGISTRO LO GENERA EL BACKEND Y NO DEBE SER MODIFICADO DESDE EL FRONTEND.
      numRegHistorialResponsableInfraestructura: [{ value: historial?.numRegHistorialResponsableInfraestructura ?? '', disabled: true }],
      numeroDocumentoIdentificacionResponsableSeleccionado: [historial?.numeroDocumentoIdentificacionResponsable ?? '', Validators.required],
      siglaOAcronimoUnidadMilitar: [{ value: historial?.siglaOAcronimoUnidadMilitar ?? this.infraestructura?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '', disabled: true }],
      nombreTipoDocumentoIdentificacion: [{ value: historial?.nombreTipoDocumentoIdentificacion ?? '', disabled: true }],
      lugarExpedicionDocumentoIdentificacionResponsable: [{ value: historial?.lugarExpedicionDocumentoIdentificacionResponsable ?? '', disabled: true }],
      gradoResponsable: [{ value: historial?.gradoResponsable ?? '', disabled: true }],
      nombresResponsable: [{ value: historial?.nombresResponsable ?? '', disabled: true }],
      primerApellidoResponsable: [{ value: historial?.primerApellidoResponsable ?? '', disabled: true }],
      segundoApellidoResponsable: [{ value: historial?.segundoApellidoResponsable ?? '', disabled: true }],
      numeroCursoResponsable: [{ value: historial?.numeroCursoResponsable ?? '', disabled: true }],
      puestoCursoResponsable: [{ value: historial?.puestoCursoResponsable ?? '', disabled: true }],
      escalafonAntiguedadResponsable: [{ value: historial?.escalafonAntiguedadResponsable ?? '', disabled: true }],
      siONoActualResponsablePredeterminado: [historial?.siONoActualResponsablePredeterminado ?? 'NO', Validators.required],
      fechaHMSIngresoResponsable: [{ value: this.formatearFechaParaInput(historial?.fechaHMSIngresoResponsable) || this.obtenerFechaHoraActual(), disabled: true }],
      //ORACLE EXIGE LA FECHA DE MODIFICACIÓN (NOT NULL), INCLUSO AL CREAR EL REGISTRO.
      fechaHMSModificacionResponsable: [{ value: this.obtenerFechaHoraActual(), disabled: true }]
    });
    if (this.banderaCrudEliminar) this.responsablesInfraestForm.disable();
  }

  //ABRE EL MICROLISTADO DE RESPONSABLES, PRESELECCIONADO EN LA UNIDAD MILITAR DE LA INFRAESTRUCTURA:
  abrirMicrolistadoResponsables(): void {
    this.modalMicrolistadoVisible = true;
    this.changeDetectorRef.markForCheck();
  }

  cerrarMicrolistadoResponsables(): void {
    this.modalMicrolistadoVisible = false;
    this.changeDetectorRef.markForCheck();
  }

  //RECIBE EL RESPONSABLE ELEGIDO EN EL MICROLISTADO Y DEJA SU NÚMERO DE DOCUMENTO EN EL CAMPO, SIN CONSULTARLO
  //TODAVÍA: LOS DATOS Y LA FOTOGRAFÍA SE CARGAN AL OPRIMIR "CONSULTAR":
  responsableSeleccionadoDelMicrolistado(responsable: ResponsablesI): void {
    this.limpiarConsultaResponsable();
    this.form.controls['numeroDocumentoIdentificacionResponsableConsultado']
      .setValue(responsable.numeroDocumentoIdentificacionResponsable ?? '');
    this.cerrarMicrolistadoResponsables();
  }

  //CONSULTA EL RESPONSABLE POR SU NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN Y DEJA SUS DATOS Y SU FOTOGRAFÍA A LA
  //VISTA, SIN GUARDAR NADA TODAVÍA: EL REGISTRO SOLO SE CREA AL OPRIMIR "AGREGAR":
  consultarPorNumeroDocumentoIdentificacion(): void {
    const numeroDocumentoIdentificacionResponsable = String(this.form.getRawValue().numeroDocumentoIdentificacionResponsableConsultado || '').trim();
    this.limpiarConsultaResponsable();
    if (!numeroDocumentoIdentificacionResponsable) {
      this.mensajeConsultaResponsable = 'Seleccione un número de documento de identificación para consultar el responsable.';
      return;
    }

    this.consultandoResponsable = true;
    this.responsablesService.getResponsiblebyNumeroDocumentoIdentificacion(numeroDocumentoIdentificacionResponsable).subscribe({
      next: ({ responsableDTO }) => {
        this.consultandoResponsable = false;
        if (!responsableDTO) {
          this.mensajeConsultaResponsable = 'No se encontró un responsable con ese número de documento de identificación.';
          this.changeDetectorRef.markForCheck();
          return;
        }
        this.responsableConsultado = responsableDTO;
        this.cargarFotoResponsableConsultado(responsableDTO);
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.consultandoResponsable = false;
        this.mensajeConsultaResponsable = 'No fue posible consultar el responsable.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  //RESUELVE LA FOTOGRAFÍA DEL RESPONSABLE: RUTA BASE DE PARÁMETROS DEL SISTEMA + CARPETA DE ALMACENAMIENTO DE SU
  //UNIDAD MILITAR + NOMBRE DEL ARCHIVO. LOS BYTES SE PIDEN POR EL PROXY AUTENTICADO, PORQUE UN <img [src]> DIRECTO
  //NO ENVÍA EL TOKEN — MISMO PATRÓN QUE ListadoResponsablesComponent.cargarMiniaturasFotos():
  private cargarFotoResponsableConsultado(responsable: ResponsablesI): void {
    const nombreArchivo = String(responsable.nombreArchivoFotoExtensionoFormatoResponsable || '').trim();
    const siglaoAcronimoUnidadMilitar = String(responsable.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
    if (!nombreArchivo || !siglaoAcronimoUnidadMilitar) return;

    this.subscriptionsFoto.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosResponsables).trim();
        this.subscriptionsFoto.add(this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(siglaoAcronimoUnidadMilitar).subscribe({
          next: ({ unidadMilitarDTO }) => {
            const carpeta = String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
            if (!carpeta) return;
            const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
            const carpetaNormalizada = carpeta.replace(/^[\\/]+|[\\/]+$/g, '');
            const ruta = `${baseNormalizada}${carpetaNormalizada}/${nombreArchivo}`;
            this.subscriptionsFoto.add(this.gestionArchivosService.getFile(ruta).subscribe({
              next: ({ rutaEstatica }) => this.subscriptionsFoto.add(this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
                next: blob => {
                  this.liberarFotoResponsable();
                  this.fotoResponsableConsultado = URL.createObjectURL(blob);
                  this.changeDetectorRef.markForCheck();
                },
                error: () => this.liberarFotoResponsable()
              })),
              error: () => this.liberarFotoResponsable()
            }));
          },
          error: () => this.liberarFotoResponsable()
        }));
      },
      error: () => this.liberarFotoResponsable()
    }));
  }

  //AGREGA AL HISTORIAL EL RESPONSABLE CONSULTADO. EL REGISTRO SE ARMA DIRECTAMENTE CON SUS DATOS, SIN PASAR POR EL
  //FORMULARIO DEL CRUD, PORQUE LA CONSULTA VIVE EN EL PANEL DEL HISTORIAL Y NO EN UN MODAL:
  agregarResponsableConsultado(): void {
    const responsable = this.responsableConsultado;
    if (!responsable) return;

    const fechaActual = this.obtenerFechaHoraActual();
    const historial: HistorialResponsablesInfraestI = {
      siglaOAcronimoUnidadMilitar: responsable.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '',
      nombreTipoDocumentoIdentificacion: responsable.tipoDocumentoIdentificacionDTO?.nombreTipoDocumentoIdentificacion ?? '',
      numeroDocumentoIdentificacionResponsable: responsable.numeroDocumentoIdentificacionResponsable ?? '',
      lugarExpedicionDocumentoIdentificacionResponsable: responsable.lugarExpedicionDocumentoIdentificacionResponsable ?? '',
      gradoResponsable: responsable.gradoResponsable ?? '',
      nombresResponsable: responsable.nombresResponsable ?? '',
      primerApellidoResponsable: responsable.primerApellidoResponsable ?? '',
      segundoApellidoResponsable: responsable.segundoApellidoResponsable ?? '',
      //EL RESPONSABLE ENTRA SIN LA MARCA DE PREDETERMINADO: ESA SE ASIGNA DESPUÉS CON EL BOTÓN DE PREDETERMINAR.
      siONoActualResponsablePredeterminado: 'NO',
      numeroCursoResponsable: responsable.numeroCursoResponsable ?? '',
      puestoCursoResponsable: responsable.puestoCursoResponsable ?? '',
      escalafonAntiguedadResponsable: responsable.escalafonAntiguedadResponsable ?? '',
      fechaHMSIngresoResponsable: this.agregarSegundosParaBackend(fechaActual),
      fechaHMSModificacionResponsable: this.agregarSegundosParaBackend(fechaActual),
      infraestructuraDTO: this.infraestructura
    };

    this.service.addInfrastructureResponsibleHistory(historial).subscribe({
      next: respuesta => {
        this.mostrarToast('exito', respuesta.mensaje || 'Responsable agregado al historial correctamente.');
        this.limpiarDatosResponsable();
        //SE LIMPIA LA PALABRA CLAVE PARA QUE UN FILTRO ACTIVO NO DEJE FUERA AL REGISTRO RECIÉN CREADO:
        this.form.controls['palabraClave'].setValue('');
        this.listar(true);
      },
      error: error => this.mostrarToast('error', error.error?.mensaje || 'Error al agregar el responsable al historial.')
    });
  }

  //REPETIR BÚSQUEDA: DESCARTA EL RESPONSABLE CONSULTADO Y DEJA EL CAMPO LIBRE PARA ELEGIR OTRO — MISMO PATRÓN QUE
  //ListadoAddUpdDelResponsablesHardySoftComponent.limpiarDatosResponsableHardySoft() DEL PROYECTO DE REFERENCIA:
  limpiarDatosResponsable(): void {
    this.limpiarConsultaResponsable();
    this.form.controls['numeroDocumentoIdentificacionResponsableConsultado'].setValue('');
    this.changeDetectorRef.markForCheck();
  }

  onErrorFotoResponsable(): void { this.liberarFotoResponsable(); this.changeDetectorRef.markForCheck(); }

  private limpiarConsultaResponsable(): void {
    this.responsableConsultado = null;
    this.mensajeConsultaResponsable = '';
    this.liberarFotoResponsable();
  }

  private liberarFotoResponsable(): void {
    if (this.fotoResponsableConsultado) URL.revokeObjectURL(this.fotoResponsableConsultado);
    this.fotoResponsableConsultado = null;
  }

  ngOnDestroy(): void {
    this.subscriptionsFoto.unsubscribe();
    this.liberarFotoResponsable();
  }

  //VUELCA EN EL FORMULARIO LOS DATOS DEL RESPONSABLE CONSULTADO — MISMO PATRÓN QUE
  //ListadoAddUpdDelResponsablesHardySoftComponent.cargarDatosResponsableHardySoftporNumeroDocumentoIdentificacion()
  //DEL PROYECTO DE REFERENCIA PortalSiadmecEjcNacionalV20:
  private volcarResponsableEnFormulario(responsable: ResponsablesI): void {
    this.responsablesInfraestForm.patchValue({
      numeroDocumentoIdentificacionResponsableSeleccionado: responsable.numeroDocumentoIdentificacionResponsable ?? '',
      siglaOAcronimoUnidadMilitar: responsable.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '',
      nombreTipoDocumentoIdentificacion: responsable.tipoDocumentoIdentificacionDTO?.nombreTipoDocumentoIdentificacion ?? '',
      lugarExpedicionDocumentoIdentificacionResponsable: responsable.lugarExpedicionDocumentoIdentificacionResponsable ?? '',
      gradoResponsable: responsable.gradoResponsable ?? '',
      nombresResponsable: responsable.nombresResponsable ?? '',
      primerApellidoResponsable: responsable.primerApellidoResponsable ?? '',
      segundoApellidoResponsable: responsable.segundoApellidoResponsable ?? '',
      numeroCursoResponsable: responsable.numeroCursoResponsable ?? '',
      puestoCursoResponsable: responsable.puestoCursoResponsable ?? '',
      escalafonAntiguedadResponsable: responsable.escalafonAntiguedadResponsable ?? ''
    });
    this.changeDetectorRef.markForCheck();
  }

  //DEVUELVE LA FECHA Y HORA LOCAL EN EL FORMATO REQUERIDO POR datetime-local, SIN CONVERTIRLA A UTC:
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA LAS FECHAS RECIBIDAS DEL BACKEND PARA MOSTRARLAS EN UN INPUT datetime-local:
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) return `${texto}T00:00`;
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //EL DTO DEL BACKEND MAPEA LAS FECHAS COMO java.util.Date Y JACKSON EXIGE SEGUNDOS EN EL STRING ISO, MIENTRAS QUE
  //<input type="datetime-local"> SOLO ENVÍA MINUTOS: SE LE AGREGAN LOS SEGUNDOS ANTES DE ENVIARLO.
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  //ARMA EL OBJETO QUE VIAJA AL BACKEND A PARTIR DE LOS VALORES DEL FORMULARIO:
  private construirHistorial(siONoActualResponsablePredeterminado: string): HistorialResponsablesInfraestI {
    const valoresFormulario = this.responsablesInfraestForm.getRawValue();
    return {
      idHistorialResponsableInfraestructura: valoresFormulario.idHistorialResponsableInfraestructura ?? undefined,
      numRegHistorialResponsableInfraestructura: this.seleccionado?.numRegHistorialResponsableInfraestructura,
      siglaOAcronimoUnidadMilitar: valoresFormulario.siglaOAcronimoUnidadMilitar,
      nombreTipoDocumentoIdentificacion: valoresFormulario.nombreTipoDocumentoIdentificacion,
      numeroDocumentoIdentificacionResponsable: valoresFormulario.numeroDocumentoIdentificacionResponsableSeleccionado,
      lugarExpedicionDocumentoIdentificacionResponsable: valoresFormulario.lugarExpedicionDocumentoIdentificacionResponsable,
      gradoResponsable: valoresFormulario.gradoResponsable,
      nombresResponsable: valoresFormulario.nombresResponsable,
      primerApellidoResponsable: valoresFormulario.primerApellidoResponsable,
      segundoApellidoResponsable: valoresFormulario.segundoApellidoResponsable,
      siONoActualResponsablePredeterminado,
      numeroCursoResponsable: valoresFormulario.numeroCursoResponsable,
      puestoCursoResponsable: valoresFormulario.puestoCursoResponsable,
      escalafonAntiguedadResponsable: valoresFormulario.escalafonAntiguedadResponsable,
      fechaHMSIngresoResponsable: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoResponsable),
      fechaHMSModificacionResponsable: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionResponsable),
      infraestructuraDTO: this.infraestructura
    };
  }

  abrirCrud(modo: 'guardar' | 'modificar' | 'eliminar' | 'predeterminar', historial: HistorialResponsablesInfraestI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modo = modo;
      this.seleccionado = historial;
      this.initResponsablesInfraestForm();
      this.modalCrudVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirVista(historial: HistorialResponsablesInfraestI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.seleccionado = historial;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarCrud(): void { this.modalCrudVisible = false; this.seleccionado = null; this.limpiarConsultaResponsable(); }
  cerrarVista(): void { this.modalVistaVisible = false; this.seleccionado = null; }

  //MODIFICAR Y PREDETERMINAR PASAN POR AQUÍ. CUANDO EL REGISTRO QUEDA EN "SI" HAY QUE BAJAR ANTES A "NO" LOS QUE YA
  //ESTÉN PREDETERMINADOS EN ESTA INFRAESTRUCTURA: EL PUT DEL BACKEND MARCA EL REGISTRO ENVIADO PERO NO RETIRA LA
  //MARCA A LOS DEMÁS, ASÍ QUE AL PREDETERMINAR UN SEGUNDO RESPONSABLE QUEDABAN DOS EN "SI".
  enviar(): void {
    if (this.responsablesInfraestForm.invalid) { this.responsablesInfraestForm.markAllAsTouched(); return; }

    const siONoActualResponsablePredeterminado = this.banderaCrudPredeterminar
      ? 'SI'
      : String(this.responsablesInfraestForm.getRawValue().siONoActualResponsablePredeterminado || 'NO').toUpperCase();
    const historial = this.construirHistorial(siONoActualResponsablePredeterminado);
    const mensajeExito = this.banderaCrudPredeterminar ? 'Registro predeterminado con éxito.' : 'Registro actualizado con éxito.';

    const guardarRegistro = () => historial.idHistorialResponsableInfraestructura
      ? this.service.updateInfrastructureResponsibleHistory(historial)
      : this.service.addInfrastructureResponsibleHistory(historial);

    //EL REGISTRO ELEGIDO SIEMPRE SE GUARDA DE ÚLTIMO, PARA QUE EL MENSAJE DEL TOAST SEA EL DE SU PROPIA RESPUESTA Y
    //NO EL DE UNA DE LAS ACTUALIZACIONES INTERMEDIAS:
    const solicitud = siONoActualResponsablePredeterminado === 'SI'
      ? this.bajarPredeterminadosActuales(Number(historial.idHistorialResponsableInfraestructura)).pipe(switchMap(() => guardarRegistro()))
      : guardarRegistro();

    solicitud.subscribe({
      //EL MENSAJE QUE SE MUESTRA ES EL QUE DEVUELVE EL BACKEND (RespuestaDTO.mensaje); EL TEXTO LOCAL SOLO ACTÚA DE
      //RESPALDO SI LA RESPUESTA LLEGARA SIN ÉL — MISMO PATRÓN QUE
      //ListadoAddUpdDelResponsablesHardySoftComponent.siConfirmacionPredeterminacion() DEL PROYECTO DE REFERENCIA:
      next: respuesta => {
        this.cerrarCrud();
        this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
        this.listar();
      },
      error: error => this.mostrarToast('error', error.error?.mensaje || 'Error al guardar el registro.')
    });
  }

  //BAJA A "NO" LOS RESPONSABLES QUE HOY ESTÉN PREDETERMINADOS EN ESTA INFRAESTRUCTURA, SALVO EL QUE SE VA A
  //CONSERVAR. SE RESUELVE ANTES DE MARCAR EL NUEVO, PARA QUE NUNCA QUEDEN DOS EN "SI" A LA VEZ:
  private bajarPredeterminadosActuales(idHistorialConservado: number) {
    return this.service.findAllInfrastructureResponsibleHistories(undefined, undefined, 'idHistorialResponsableInfraestructura', 'ASC').pipe(
      switchMap(registros => {
        const predeterminadosActuales = registros.filter(historial =>
          Number(historial.infraestructuraDTO?.idInfraestructura) === Number(this.infraestructura.idInfraestructura) &&
          Number(historial.idHistorialResponsableInfraestructura) !== idHistorialConservado &&
          String(historial.siONoActualResponsablePredeterminado).toUpperCase() === 'SI'
        );
        if (!predeterminadosActuales.length) return of([]);
        return forkJoin(predeterminadosActuales.map(historial =>
          this.service.updateInfrastructureResponsibleHistory({ ...historial, siONoActualResponsablePredeterminado: 'NO' })
        ));
      })
    );
  }

  confirmarEliminar(): void {
    const idHistorialResponsableInfraestructura = this.responsablesInfraestForm.getRawValue().idHistorialResponsableInfraestructura;
    if (!idHistorialResponsableInfraestructura) return;
    this.service.deleteInfrastructureResponsibleHistory(Number(idHistorialResponsableInfraestructura)).subscribe({
      next: respuesta => { this.mostrarToast('exito', respuesta.mensaje || 'Registro eliminado correctamente.'); this.listar(); this.cerrarCrud(); },
      error: error => this.mostrarToast('error', error.error?.mensaje || 'Error al eliminar el registro.')
    });
  }

  //ARMA EL RÓTULO DEL RESPONSABLE POR GRADO, NOMBRES Y APELLIDOS:
  nombreCompletoResponsable(historial: HistorialResponsablesInfraestI): string {
    return [
      historial.gradoResponsable,
      historial.nombresResponsable,
      historial.primerApellidoResponsable,
      historial.segundoApellidoResponsable
    ].map(valor => String(valor || '').trim()).filter(Boolean).join(' ');
  }

  esPredeterminado(historial: HistorialResponsablesInfraestI): boolean {
    return String(historial.siONoActualResponsablePredeterminado).toUpperCase() === 'SI';
  }

  cambiarPagina(pagina: number): void { this.paginaActual = pagina; this.listar(); }
  cambiarTanda(): void { this.tandaNumeroRegistrosporPagina = Number(this.form.value.registrosPagina); this.buscar(); }
  totalPaginas(): number { return Math.max(Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina), 1); }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    this.toastTipo = tipo; this.toastMensaje = mensaje; this.changeDetectorRef.markForCheck();
    setTimeout(() => { this.toastMensaje = ''; this.changeDetectorRef.markForCheck(); }, 4000);
  }
}
