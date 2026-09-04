import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ResponsablesI } from '../../../../interfaces/panel-control/responsables/responsables.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposDocumentosIdentificacionI } from '../../../../interfaces/tipos-documentos-identificacion/tipos-documentos-identificacion.interface';
import { PaisesMundoI } from '../../../../interfaces/paises-mundo/paises-mundo.interface';
import { DepartamentosoEstadosMundoI } from '../../../../interfaces/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { ResponsablesService } from '../../../../services/panel-control/responsables/responsables.service';

export interface OperacionFotoResponsable {
  tipo: 'subir' | 'mover' | 'renombrar' | 'eliminar';
  nombreAnterior: string;
  nombreNuevo: string;
  carpetaAnterior: string;
  carpetaNueva: string;
  siglaAnterior: string;
  siglaNueva: string;
  archivo?: File;
}

export interface GuardadoResponsableEvent {
  responsable: ResponsablesI;
  operacionFoto: OperacionFotoResponsable | null;
}

//DATOS SIMULADOS DE EMPLEADOS DE LA INSTITUCIÓN (CATÁLOGO EXTERNO — SOLO SE USAN PARA PRECARGAR EL FORMULARIO
//EN MODO GUARDAR, MISMO PATRÓN QUE AddUpdDelUsuarioComponent):
interface EmpleadoSimuladoI {
  numeroDocumentoIdentificacion: string;
  idTipoDocumentoIdentificacion: number;
  lugarExpedicionDocumentoIdentificacion: string;
  grado: string;
  arma: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  fechaHMSNacimiento: string;
  sexo: string;
  direccion: string;
  telefono: string;
  movil: string;
  correoElectronicoPersonal: string;
  correoElectronicoInstitucional: string;
  paisOrigen: string;
  departamentooEstadoOrigen: string;
  ciudadOrigen: string;
  usuarioRed: string;
  numeroCurso: string;
  puestoCurso: string;
  escalafonAntiguedad: string;
  fechaHMSIncorporacionFFMM: string;
}

const EMPLEADOS_SIMULADOS: EmpleadoSimuladoI[] = [
  {
    numeroDocumentoIdentificacion: '1030500010',
    idTipoDocumentoIdentificacion: 1,
    lugarExpedicionDocumentoIdentificacion: 'BOGOTÁ D.C.',
    grado: 'SM',
    arma: 'INFANTERÍA',
    nombres: 'Camilo Andrés',
    primerApellido: 'Torres',
    segundoApellido: 'Herrera',
    fechaHMSNacimiento: '1985-04-18T00:00',
    sexo: 'MASCULINO',
    direccion: 'Cra 20 # 45-12',
    telefono: '',
    movil: '3101234567',
    correoElectronicoPersonal: 'camilo.torres@example.com',
    correoElectronicoInstitucional: 'camilo.torres@ejercito.mil.co',
    paisOrigen: 'COLOMBIA',
    departamentooEstadoOrigen: 'CUNDINAMARCA',
    ciudadOrigen: 'BOGOTÁ D.C.',
    usuarioRed: 'ctorres',
    numeroCurso: '45',
    puestoCurso: '3',
    escalafonAntiguedad: '15',
    fechaHMSIncorporacionFFMM: '2005-02-01T00:00'
  },
  {
    numeroDocumentoIdentificacion: '1030500011',
    idTipoDocumentoIdentificacion: 1,
    lugarExpedicionDocumentoIdentificacion: 'TUNJA',
    grado: 'SS',
    arma: 'INGENIEROS',
    nombres: 'Laura Ximena',
    primerApellido: 'Pardo',
    segundoApellido: 'Rincón',
    fechaHMSNacimiento: '1990-09-02T00:00',
    sexo: 'FEMENINO',
    direccion: 'Calle 30 # 12-40',
    telefono: '',
    movil: '3112345678',
    correoElectronicoPersonal: 'laura.pardo@example.com',
    correoElectronicoInstitucional: 'laura.pardo@ejercito.mil.co',
    paisOrigen: 'COLOMBIA',
    departamentooEstadoOrigen: 'BOYACÁ',
    ciudadOrigen: 'TUNJA',
    usuarioRed: 'lpardo',
    numeroCurso: '52',
    puestoCurso: '1',
    escalafonAntiguedad: '9',
    fechaHMSIncorporacionFFMM: '2011-07-15T00:00'
  },
  {
    numeroDocumentoIdentificacion: '1030500012',
    idTipoDocumentoIdentificacion: 1,
    lugarExpedicionDocumentoIdentificacion: 'IBAGUÉ',
    grado: 'SV',
    arma: 'ARTILLERÍA',
    nombres: 'Jorge Iván',
    primerApellido: 'Gómez',
    segundoApellido: 'Peña',
    fechaHMSNacimiento: '1993-01-27T00:00',
    sexo: 'MASCULINO',
    direccion: 'Av 5 # 8-33',
    telefono: '',
    movil: '3123456789',
    correoElectronicoPersonal: 'jorge.gomez@example.com',
    correoElectronicoInstitucional: 'jorge.gomez@ejercito.mil.co',
    paisOrigen: 'COLOMBIA',
    departamentooEstadoOrigen: 'TOLIMA',
    ciudadOrigen: 'IBAGUÉ',
    usuarioRed: 'jgomez',
    numeroCurso: '58',
    puestoCurso: '5',
    escalafonAntiguedad: '6',
    fechaHMSIncorporacionFFMM: '2014-11-20T00:00'
  }
];

@Component({
  selector: 'app-add-upd-del-responsable',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upd-del-responsable.component.html',
  styleUrl: './add-upd-del-responsable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelResponsableComponent implements OnChanges, OnDestroy {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() responsableData: ResponsablesI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];
  @Input() tiposDocumentos: TiposDocumentosIdentificacionI[] = [];
  @Input() paisesMundo: PaisesMundoI[] = [];
  @Input() departamentosoEstadosMundo: DepartamentosoEstadosMundoI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<GuardadoResponsableEvent>();
  @Output() eliminar = new EventEmitter<number>();

  responsablesForm!: FormGroup;

  //FOTO DEL RESPONSABLE — SIMULADA CON UNA VISTA PREVIA LOCAL (FileReader), SIN SUBIRSE A NINGÚN SERVIDOR DE
  //ARCHIVOS (MISMO PATRÓN QUE MiPerfilComponent Y AddUpdDelUsuarioComponent):
  previewUrlFotoResponsable: string | null = null;
  selectedFileResponsablePhoto: File | null = null;
  isSelectedFileResponsablePhoto = false;
  banderaConfirmacionEliminacionFoto = false;
  mensajeErrorFoto = '';
  nombreArchivoFotoResponsable = '';
  siglaUnidadMilitarFotoExistente = '';
  fotoExistenteEliminada = false;

  //BÚSQUEDA DE EMPLEADO (SOLO EN MODO GUARDAR) — PRECARGA EL FORMULARIO DESDE EL CATÁLOGO SIMULADO DE EMPLEADOS:
  mensajeBusquedaEmpleado = '';

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private responsablesService: ResponsablesService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['responsableData']) {
      this.initForm();
      this.previewUrlFotoResponsable = null;
      this.selectedFileResponsablePhoto = null;
      this.isSelectedFileResponsablePhoto = false;
      this.nombreArchivoFotoResponsable = String(this.responsableData?.nombreArchivoFotoExtensionoFormatoResponsable || '');
      this.siglaUnidadMilitarFotoExistente = String(this.responsableData?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
      this.fotoExistenteEliminada = false;
      if (this.modo === 'modificar' && this.responsableData?.idResponsable) {
        this.cargarFotoResponsableParaModificar(Number(this.responsableData.idResponsable));
      } else if (this.nombreArchivoFotoResponsable.trim() && this.siglaUnidadMilitarFotoExistente) {
        this.resolverUnidadMilitarYPreview(this.nombreArchivoFotoResponsable.trim(), this.siglaUnidadMilitarFotoExistente);
      }
    }
  }

  private cargarFotoResponsableParaModificar(idResponsable: number): void {
    this.responsablesService.getResponsiblebyId(idResponsable).subscribe({
      next: ({ responsableDTO }) => {
        const nombreArchivo = String(responsableDTO?.nombreArchivoFotoExtensionoFormatoResponsable || '').trim();
        const siglaUnidad = String(responsableDTO?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
        this.nombreArchivoFotoResponsable = nombreArchivo;
        this.siglaUnidadMilitarFotoExistente = siglaUnidad;
        this.changeDetectorRef.markForCheck();
        if (nombreArchivo && siglaUnidad) this.resolverUnidadMilitarYPreview(nombreArchivo, siglaUnidad);
      },
      error: () => {
        const nombreArchivo = this.nombreArchivoFotoResponsable.trim();
        if (nombreArchivo && this.siglaUnidadMilitarFotoExistente) {
          this.resolverUnidadMilitarYPreview(nombreArchivo, this.siglaUnidadMilitarFotoExistente);
        } else {
          this.onErrorPreviewFotoResponsable();
        }
      }
    });
  }

  private resolverUnidadMilitarYPreview(nombreArchivo: string, siglaUnidad: string): void {
    this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(siglaUnidad.trim()).subscribe({
      next: ({ unidadMilitarDTO }) => {
        const carpeta = String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
        if (carpeta) this.resolverPreviewFotoResponsable(nombreArchivo.trim(), carpeta);
      },
      error: () => this.onErrorPreviewFotoResponsable()
    });
  }

  private resolverPreviewFotoResponsable(nombreArchivo: string, carpetaUnidad: string): void {
    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosResponsables).trim();
        const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
        const carpetaNormalizada = carpetaUnidad.trim().replace(/^[\\/]+|[\\/]+$/g, '');
        const ruta = `${baseNormalizada}${carpetaNormalizada}/${nombreArchivo.trim()}`;
        this.gestionArchivosService.getFile(ruta).subscribe({
          next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
            next: (blob) => {
              this.liberarPreviewFotoResponsable();
              this.previewUrlFotoResponsable = URL.createObjectURL(blob);
              this.changeDetectorRef.markForCheck();
            },
            error: () => this.onErrorPreviewFotoResponsable()
          }),
          error: () => this.onErrorPreviewFotoResponsable()
        });
      },
      error: () => this.onErrorPreviewFotoResponsable()
    });
  }

  private liberarPreviewFotoResponsable(): void {
    if (this.previewUrlFotoResponsable?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoResponsable);
  }

  onErrorPreviewFotoResponsable(): void {
    this.liberarPreviewFotoResponsable();
    this.previewUrlFotoResponsable = null;
    this.changeDetectorRef.markForCheck();
  }

  private initForm(): void {
    const responsable = this.responsableData;
    this.responsablesForm = this.formBuilder.group({
      palabraClaveNumeroDocumentoIdentificacionResponsable: [''],
      idResponsable: [responsable?.idResponsable ?? null],
      usuarioRedResponsable: [responsable?.usuarioRedResponsable ?? '', Validators.required],
      tipoDocumentoIdentificacionSeleccionado: [responsable?.tipoDocumentoIdentificacionDTO?.idTipoDocumentoIdentificacion ?? '', Validators.required],
      numeroDocumentoIdentificacionResponsable: [responsable?.numeroDocumentoIdentificacionResponsable ?? '', Validators.required],
      lugarExpedicionDocumentoIdentificacionResponsable: [responsable?.lugarExpedicionDocumentoIdentificacionResponsable ?? '', Validators.required],
      gradoResponsable: [responsable?.gradoResponsable ?? '', Validators.required],
      nombresResponsable: [responsable?.nombresResponsable ?? '', Validators.required],
      primerApellidoResponsable: [responsable?.primerApellidoResponsable ?? '', Validators.required],
      segundoApellidoResponsable: [responsable?.segundoApellidoResponsable ?? ''],
      armaResponsable: [responsable?.armaResponsable ?? ''],
      fechaHMSNacimientoResponsable: [this.formatearFechaParaInput(responsable?.fechaHMSNacimientoResponsable), Validators.required],
      sexoResponsable: [responsable?.sexoResponsable ?? '', Validators.required],
      direccionResponsable: [responsable?.direccionResponsable ?? '', Validators.required],
      telefonoResponsable: [responsable?.telefonoResponsable ?? ''],
      movilResponsable: [responsable?.movilResponsable ?? '', Validators.required],
      correoElectronicoPersonalResponsable: [responsable?.correoElectronicoPersonalResponsable ?? '', [Validators.required, Validators.email]],
      correoElectronicoInstitucionalResponsable: [responsable?.correoElectronicoInstitucionalResponsable ?? ''],
      paisOrigenResponsable: [responsable?.paisOrigenResponsable ?? '', Validators.required],
      departamentooEstadoOrigenResponsable: [responsable?.departamentooEstadoOrigenResponsable ?? '', Validators.required],
      ciudadOrigenResponsable: [responsable?.ciudadOrigenResponsable ?? '', Validators.required],
      numeroCursoResponsable: [responsable?.numeroCursoResponsable ?? ''],
      puestoCursoResponsable: [responsable?.puestoCursoResponsable ?? ''],
      escalafonAntiguedadResponsable: [responsable?.escalafonAntiguedadResponsable ?? ''],
      fechaHMSIncorporacionFFMMResponsable: [this.formatearFechaParaInput(responsable?.fechaHMSIncorporacionFFMMResponsable)],
      unidadMilitarSeleccionada: [responsable?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required],
      fechaHMSIngresoResponsable: [{ value: this.formatearFechaParaInput(responsable?.fechaHMSIngresoResponsable) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR). LA COLUMNA
      //FECHA_H_M_S_MODIFICACION_RESPONSABLE ES NOT NULL EN ORACLE, ASÍ QUE TAMBIÉN DEBE ENVIARSE AL CREAR UN
      //RESPONSABLE NUEVO (NO SOLO AL MODIFICAR) — MISMO PATRÓN QUE AddUpdDelUsuarioComponent:
      fechaHMSModificacionResponsable: [{ value: this.obtenerFechaHoraActual(), disabled: true }],
      estadoResponsable: [responsable?.estadoResponsable ?? 'ACTIVO', Validators.required]
    });
    if (this.banderaCrudEliminar) {
      this.responsablesForm.disable();
    }

    //INICIALIZA EL BUSCADOR DE PAÍS DE ORIGEN: SI EL RESPONSABLE YA TIENE UN PAÍS ASIGNADO, EL CAMPO BLOQUEADO
    //MUESTRA DIRECTAMENTE EL NOMBRE YA ALMACENADO EN paisOrigenResponsable — MISMO PATRÓN QUE AddUpdDelUsuarioComponent:
    const paisOrigenActual = responsable?.paisOrigenResponsable ? String(responsable.paisOrigenResponsable) : '';
    if (paisOrigenActual) {
      this.paisOrigenBusquedaSeleccionado = this.paisesMundo.find(pais => String(pais.nombrePaisMundo).toUpperCase() === paisOrigenActual.toUpperCase()) ?? null;
      this.terminoBusquedaPaisOrigen = paisOrigenActual;
      this.banderaPaisOrigenSeleccionado = true;
    } else {
      this.paisOrigenBusquedaSeleccionado = null;
      this.terminoBusquedaPaisOrigen = '';
      this.banderaPaisOrigenSeleccionado = false;
    }
    this.mostrarSugerenciasPaisOrigen = false;

    //INICIALIZA EL BUSCADOR DE DEPARTAMENTO O ESTADO DE ORIGEN — SOLO QUEDA PRESELECCIONADO EN EL CATÁLOGO SI
    //PERTENECE AL PAÍS YA CARGADO ARRIBA (departamentosoEstadosMundoDelPaisSeleccionado YA DEPENDE DE
    //paisOrigenBusquedaSeleccionado, ASIGNADO JUSTO ANTES):
    const departamentoOrigenActual = responsable?.departamentooEstadoOrigenResponsable ? String(responsable.departamentooEstadoOrigenResponsable) : '';
    if (departamentoOrigenActual) {
      this.departamentoOrigenBusquedaSeleccionado = this.departamentosoEstadosMundoDelPaisSeleccionado.find(depto => String(depto.nombreDepartamentooEstadoMundo).toUpperCase() === departamentoOrigenActual.toUpperCase()) ?? null;
      this.terminoBusquedaDepartamentoOrigen = departamentoOrigenActual;
      this.banderaDepartamentoOrigenSeleccionado = true;
    } else {
      this.departamentoOrigenBusquedaSeleccionado = null;
      this.terminoBusquedaDepartamentoOrigen = '';
      this.banderaDepartamentoOrigenSeleccionado = false;
    }
    this.mostrarSugerenciasDepartamentoOrigen = false;
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">.
  //A PROPÓSITO NO SE USA Date.toISOString() (DEVUELVE LA HORA EN UTC): EN COLOMBIA (UTC-5) EL CAMPO QUEDABA
  //MOSTRANDO/ENVIANDO LA HORA 5 HORAS ADELANTADA RESPECTO A LA HORA REAL DE BOGOTÁ. MISMO PATRÓN QUE
  //AddUpdDelUsuarioComponent.obtenerFechaHoraActual():
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA UNA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. LOS
  //CAMPOS TIMESTAMP DE ORACLE LLEGAN CON ESPACIO EN VEZ DE "T" Y, MUCHAS VECES, CON SEGUNDOS/FRACCIÓN DE SEGUNDOS
  //(EJ. "2024-05-12 14:30:00.0") — SIN ESTA NORMALIZACIÓN EL INPUT QUEDA VACÍO AUNQUE EL DATO SÍ LLEGÓ:
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //EL BACKEND MAPEA LAS FECHAS DE RESPONSABLE COMO java.util.Date (ResponsableDTO), Y AL NO TENER NINGÚN
  //@JsonFormat NI spring.jackson.date-format CONFIGURADO, JACKSON EXIGE SEGUNDOS EN EL STRING ISO
  //(yyyy-MM-ddTHH:mm:ss). EL <input type="datetime-local"> SOLO ENVÍA MINUTOS (yyyy-MM-ddTHH:mm), ASÍ QUE JACKSON
  //NO LOGRA PARSEARLO Y EL CAMPO QUEDA EN null EN EL BACKEND (SIN LANZAR ERROR 400, POR ESO SOLO SE NOTA CUANDO LA
  //COLUMNA DE ORACLE ES NOT NULL). SE LE AGREGAN LOS SEGUNDOS ANTES DE ENVIARLO, SIN CAMBIAR LO QUE VE O EDITA EL
  //USUARIO EN EL FORMULARIO — MISMO PATRÓN QUE AddUpdDelUsuarioComponent:
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  //BÚSQUEDA DE PAÍS DE ORIGEN (COMBO BOX CON CAMPO DE TEXTO) — MIENTRAS SE ESCRIBE, SE FILTRA EL CATÁLOGO REAL DE
  //PAÍSES; UNA VEZ SELECCIONADO, EL CAMPO QUEDA BLOQUEADO MOSTRANDO EL NOMBRE ELEGIDO — MISMO PATRÓN QUE EL
  //BUSCADOR DE GRADO SIATH DE AddUpdDelUsuarioComponent:
  terminoBusquedaPaisOrigen = '';
  paisOrigenBusquedaSeleccionado: PaisesMundoI | null = null;
  mostrarSugerenciasPaisOrigen = false;
  banderaPaisOrigenSeleccionado = false;

  get paisesMundoFiltrados(): PaisesMundoI[] {
    const termino = this.terminoBusquedaPaisOrigen.trim().toUpperCase();
    if (!termino) return this.paisesMundo;
    return this.paisesMundo.filter(pais => String(pais.nombrePaisMundo).toUpperCase().includes(termino));
  }

  onEscribirBusquedaPaisOrigen(): void {
    this.mostrarSugerenciasPaisOrigen = true;
    if (this.paisOrigenBusquedaSeleccionado && String(this.paisOrigenBusquedaSeleccionado.nombrePaisMundo) !== this.terminoBusquedaPaisOrigen) {
      this.paisOrigenBusquedaSeleccionado = null;
      this.responsablesForm.controls['paisOrigenResponsable'].setValue('');
      this.limpiarBusquedaDepartamentoOrigen();
    }
  }

  //AL CAMBIAR EL PAÍS SE LIMPIA EL DEPARTAMENTO O ESTADO YA ELEGIDO (SI HABÍA UNO), YA QUE EL COMBO DE DEPARTAMENTO
  //SE FILTRA POR EL PAÍS SELECCIONADO Y EL VALOR ANTERIOR PODRÍA YA NO PERTENECER A ESTE PAÍS:
  seleccionarPaisOrigen(pais: PaisesMundoI): void {
    this.paisOrigenBusquedaSeleccionado = pais;
    this.terminoBusquedaPaisOrigen = String(pais.nombrePaisMundo);
    this.responsablesForm.controls['paisOrigenResponsable'].setValue(pais.nombrePaisMundo);
    this.mostrarSugerenciasPaisOrigen = false;
    this.banderaPaisOrigenSeleccionado = true;
    this.limpiarBusquedaDepartamentoOrigen();
  }

  ocultarSugerenciasPaisOrigenConRetraso(): void {
    setTimeout(() => { this.mostrarSugerenciasPaisOrigen = false; }, 150);
  }

  limpiarBusquedaPaisOrigen(): void {
    this.terminoBusquedaPaisOrigen = '';
    this.paisOrigenBusquedaSeleccionado = null;
    this.banderaPaisOrigenSeleccionado = false;
    this.responsablesForm.controls['paisOrigenResponsable'].setValue('');
    this.limpiarBusquedaDepartamentoOrigen();
  }

  //BÚSQUEDA DE DEPARTAMENTO O ESTADO DE ORIGEN (COMBO BOX CON CAMPO DE TEXTO) — FILTRADO POR EL PAÍS DE ORIGEN YA
  //SELECCIONADO (SOLO MUESTRA LOS DEPARTAMENTOS/ESTADOS QUE PERTENECEN A ESE PAÍS EN departamentosoEstadosMundo.paisMundoDTO):
  terminoBusquedaDepartamentoOrigen = '';
  departamentoOrigenBusquedaSeleccionado: DepartamentosoEstadosMundoI | null = null;
  mostrarSugerenciasDepartamentoOrigen = false;
  banderaDepartamentoOrigenSeleccionado = false;

  get departamentosoEstadosMundoDelPaisSeleccionado(): DepartamentosoEstadosMundoI[] {
    const idPaisSeleccionado = this.paisOrigenBusquedaSeleccionado?.idPaisMundo;
    if (!idPaisSeleccionado) return [];
    return this.departamentosoEstadosMundo.filter(depto => depto.paisMundoDTO?.idPaisMundo === idPaisSeleccionado);
  }

  get departamentosoEstadosMundoFiltrados(): DepartamentosoEstadosMundoI[] {
    const termino = this.terminoBusquedaDepartamentoOrigen.trim().toUpperCase();
    const departamentosDelPais = this.departamentosoEstadosMundoDelPaisSeleccionado;
    if (!termino) return departamentosDelPais;
    return departamentosDelPais.filter(depto => String(depto.nombreDepartamentooEstadoMundo).toUpperCase().includes(termino));
  }

  onEscribirBusquedaDepartamentoOrigen(): void {
    this.mostrarSugerenciasDepartamentoOrigen = true;
    if (this.departamentoOrigenBusquedaSeleccionado && String(this.departamentoOrigenBusquedaSeleccionado.nombreDepartamentooEstadoMundo) !== this.terminoBusquedaDepartamentoOrigen) {
      this.departamentoOrigenBusquedaSeleccionado = null;
      this.responsablesForm.controls['departamentooEstadoOrigenResponsable'].setValue('');
    }
  }

  seleccionarDepartamentoOrigen(departamento: DepartamentosoEstadosMundoI): void {
    this.departamentoOrigenBusquedaSeleccionado = departamento;
    this.terminoBusquedaDepartamentoOrigen = String(departamento.nombreDepartamentooEstadoMundo);
    this.responsablesForm.controls['departamentooEstadoOrigenResponsable'].setValue(departamento.nombreDepartamentooEstadoMundo);
    this.mostrarSugerenciasDepartamentoOrigen = false;
    this.banderaDepartamentoOrigenSeleccionado = true;
  }

  ocultarSugerenciasDepartamentoOrigenConRetraso(): void {
    setTimeout(() => { this.mostrarSugerenciasDepartamentoOrigen = false; }, 150);
  }

  limpiarBusquedaDepartamentoOrigen(): void {
    this.terminoBusquedaDepartamentoOrigen = '';
    this.departamentoOrigenBusquedaSeleccionado = null;
    this.banderaDepartamentoOrigenSeleccionado = false;
    this.responsablesForm.controls['departamentooEstadoOrigenResponsable'].setValue('');
  }

  //BUSCA AL EMPLEADO EN EL CATÁLOGO SIMULADO POR NÚMERO DE DOCUMENTO Y PRECARGA SUS DATOS EN EL FORMULARIO:
  buscarEmpleado(): void {
    this.mensajeBusquedaEmpleado = '';
    const numeroDocumento = String(this.responsablesForm.get('palabraClaveNumeroDocumentoIdentificacionResponsable')?.value || '').trim();
    if (!numeroDocumento) {
      this.mensajeBusquedaEmpleado = 'Ingrese el número de documento de identificación.';
      return;
    }

    const empleado = EMPLEADOS_SIMULADOS.find(e => e.numeroDocumentoIdentificacion === numeroDocumento);
    if (!empleado) {
      this.mensajeBusquedaEmpleado = 'No se encontró ningún empleado con ese número de documento.';
      return;
    }

    this.responsablesForm.patchValue({
      usuarioRedResponsable: empleado.usuarioRed,
      tipoDocumentoIdentificacionSeleccionado: empleado.idTipoDocumentoIdentificacion,
      numeroDocumentoIdentificacionResponsable: empleado.numeroDocumentoIdentificacion,
      lugarExpedicionDocumentoIdentificacionResponsable: empleado.lugarExpedicionDocumentoIdentificacion,
      gradoResponsable: empleado.grado,
      armaResponsable: empleado.arma,
      nombresResponsable: empleado.nombres,
      primerApellidoResponsable: empleado.primerApellido,
      segundoApellidoResponsable: empleado.segundoApellido,
      fechaHMSNacimientoResponsable: empleado.fechaHMSNacimiento,
      sexoResponsable: empleado.sexo,
      direccionResponsable: empleado.direccion,
      telefonoResponsable: empleado.telefono,
      movilResponsable: empleado.movil,
      correoElectronicoPersonalResponsable: empleado.correoElectronicoPersonal,
      correoElectronicoInstitucionalResponsable: empleado.correoElectronicoInstitucional,
      paisOrigenResponsable: empleado.paisOrigen,
      departamentooEstadoOrigenResponsable: empleado.departamentooEstadoOrigen,
      ciudadOrigenResponsable: empleado.ciudadOrigen,
      numeroCursoResponsable: empleado.numeroCurso,
      puestoCursoResponsable: empleado.puestoCurso,
      escalafonAntiguedadResponsable: empleado.escalafonAntiguedad,
      fechaHMSIncorporacionFFMMResponsable: empleado.fechaHMSIncorporacionFFMM
    });

    //EL PAÍS Y EL DEPARTAMENTO O ESTADO DEL EMPLEADO SE SINCRONIZAN CON SUS BUSCADORES: SI EXISTEN EN EL CATÁLOGO
    //REAL YA CARGADO, QUEDAN BLOQUEADOS IGUAL QUE SI SE HUBIERAN SELECCIONADO A MANO; SI NO, SE MUESTRAN TAL CUAL:
    this.paisOrigenBusquedaSeleccionado = this.paisesMundo.find(pais => String(pais.nombrePaisMundo).toUpperCase() === empleado.paisOrigen.toUpperCase()) ?? null;
    this.terminoBusquedaPaisOrigen = empleado.paisOrigen;
    this.responsablesForm.controls['paisOrigenResponsable'].setValue(empleado.paisOrigen);
    this.banderaPaisOrigenSeleccionado = true;

    this.departamentoOrigenBusquedaSeleccionado = this.departamentosoEstadosMundoDelPaisSeleccionado.find(depto => String(depto.nombreDepartamentooEstadoMundo).toUpperCase() === empleado.departamentooEstadoOrigen.toUpperCase()) ?? null;
    this.terminoBusquedaDepartamentoOrigen = empleado.departamentooEstadoOrigen;
    this.responsablesForm.controls['departamentooEstadoOrigenResponsable'].setValue(empleado.departamentooEstadoOrigen);
    this.banderaDepartamentoOrigenSeleccionado = true;

    this.mensajeBusquedaEmpleado = 'Datos del empleado cargados correctamente.';
  }

  onSelectFileResponsablePhoto(event: Event): void {
    this.mensajeErrorFoto = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const extension = (file.name.split('.').pop() || '').toLowerCase();
    const extensionesPermitidas = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
    const tamanoMaximoBytes = 2_000_000; //2.0 MB.

    if (file.size > tamanoMaximoBytes) {
      this.mensajeErrorFoto = 'El archivo excede el tamaño máximo permitido de 2.0 MB.';
      input.value = '';
      return;
    }
    if (!extensionesPermitidas.includes(extension)) {
      this.mensajeErrorFoto = 'El archivo debe tener una extensión válida (jpg, jpeg, bmp, png o gif).';
      input.value = '';
      return;
    }

    this.selectedFileResponsablePhoto = file;
    this.isSelectedFileResponsablePhoto = true;
    this.fotoExistenteEliminada = false;

    const lector = new FileReader();
    lector.onload = () => {
      this.liberarPreviewFotoResponsable();
      this.previewUrlFotoResponsable = lector.result as string;
      this.changeDetectorRef.markForCheck();
    };
    lector.readAsDataURL(file);
  }

  onRemoveFileResponsablePhoto(): void {
    this.selectedFileResponsablePhoto = null;
    this.isSelectedFileResponsablePhoto = false;
    this.onErrorPreviewFotoResponsable();
    const sigla = this.siglaUnidadMilitarFotoExistente
      || String(this.responsableData?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
    if (this.nombreArchivoFotoResponsable && sigla && !this.fotoExistenteEliminada) {
      this.resolverUnidadMilitarYPreview(this.nombreArchivoFotoResponsable, sigla);
    }
  }

  confirmarEliminarFotoResponsable(): void {
    if (!this.nombreArchivoFotoResponsable) return;
    this.banderaConfirmacionEliminacionFoto = true;
  }

  noEliminarFotoResponsable(): void {
    this.banderaConfirmacionEliminacionFoto = false;
  }

  siEliminarFotoResponsable(): void {
    this.banderaConfirmacionEliminacionFoto = false;
    this.fotoExistenteEliminada = true;
    this.onErrorPreviewFotoResponsable();
    this.selectedFileResponsablePhoto = null;
    this.isSelectedFileResponsablePhoto = false;
  }

  private obtenerNumeroDocumentoEncriptado(numeroDocumento: string): string {
    let numeroEncriptado = numeroDocumento;
    for (let i = 0; i < 2; i++) numeroEncriptado = btoa(numeroEncriptado);
    return numeroEncriptado;
  }

  guardarModificar(): void {
    if (this.responsablesForm.invalid) {
      this.responsablesForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.responsablesForm.getRawValue();
    const tipoDocumento = this.tiposDocumentos.find(t => t.idTipoDocumentoIdentificacion === Number(valoresFormulario.tipoDocumentoIdentificacionSeleccionado));
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));

    const nombreAnterior = this.nombreArchivoFotoResponsable.trim();
    const carpetaAnterior = String(this.responsableData?.unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '');
    const carpetaNueva = String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar || '');
    const siglaAnterior = this.siglaUnidadMilitarFotoExistente
      || String(this.responsableData?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
    const siglaNueva = String(unidadMilitar?.siglaoAcronimoUnidadMilitar || '');
    const documentoAnterior = String(this.responsableData?.numeroDocumentoIdentificacionResponsable || '');
    const documentoNuevo = String(valoresFormulario.numeroDocumentoIdentificacionResponsable);
    let nombreArchivoFoto = this.fotoExistenteEliminada ? '' : nombreAnterior;
    let operacionFoto: OperacionFotoResponsable | null = null;

    if (this.selectedFileResponsablePhoto) {
      const extension = (this.selectedFileResponsablePhoto.name.split('.').pop() || '').toLowerCase();
      nombreArchivoFoto = `${this.obtenerNumeroDocumentoEncriptado(documentoNuevo)}.${extension}`;
      operacionFoto = { tipo: 'subir', nombreAnterior, nombreNuevo: nombreArchivoFoto, carpetaAnterior, carpetaNueva, siglaAnterior, siglaNueva, archivo: this.selectedFileResponsablePhoto };
    } else if (this.fotoExistenteEliminada && nombreAnterior) {
      operacionFoto = { tipo: 'eliminar', nombreAnterior, nombreNuevo: '', carpetaAnterior, carpetaNueva, siglaAnterior, siglaNueva };
    } else if (nombreAnterior && (siglaAnterior !== siglaNueva || documentoAnterior !== documentoNuevo)) {
      const extension = nombreAnterior.split('.').pop() || '';
      nombreArchivoFoto = `${this.obtenerNumeroDocumentoEncriptado(documentoNuevo)}.${extension}`;
      operacionFoto = {
        tipo: siglaAnterior !== siglaNueva ? 'mover' : 'renombrar',
        nombreAnterior, nombreNuevo: nombreArchivoFoto, carpetaAnterior, carpetaNueva, siglaAnterior, siglaNueva
      };
    }

    const responsable: ResponsablesI = {
      idResponsable: valoresFormulario.idResponsable ?? undefined,
      unidadMilitarDTO: unidadMilitar ?? this.unidadesMilitares[0],
      usuarioRedResponsable: valoresFormulario.usuarioRedResponsable,
      tipoDocumentoIdentificacionDTO: tipoDocumento ?? this.tiposDocumentos[0],
      numeroDocumentoIdentificacionResponsable: valoresFormulario.numeroDocumentoIdentificacionResponsable,
      lugarExpedicionDocumentoIdentificacionResponsable: valoresFormulario.lugarExpedicionDocumentoIdentificacionResponsable,
      gradoResponsable: valoresFormulario.gradoResponsable,
      nombresResponsable: valoresFormulario.nombresResponsable,
      primerApellidoResponsable: valoresFormulario.primerApellidoResponsable,
      segundoApellidoResponsable: valoresFormulario.segundoApellidoResponsable ?? '',
      armaResponsable: valoresFormulario.armaResponsable ?? '',
      nombreArchivoFotoExtensionoFormatoResponsable: nombreArchivoFoto,
      fechaHMSNacimientoResponsable: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSNacimientoResponsable),
      sexoResponsable: valoresFormulario.sexoResponsable,
      direccionResponsable: valoresFormulario.direccionResponsable,
      telefonoResponsable: valoresFormulario.telefonoResponsable ?? '',
      movilResponsable: valoresFormulario.movilResponsable,
      correoElectronicoPersonalResponsable: valoresFormulario.correoElectronicoPersonalResponsable,
      correoElectronicoInstitucionalResponsable: valoresFormulario.correoElectronicoInstitucionalResponsable ?? '',
      paisOrigenResponsable: valoresFormulario.paisOrigenResponsable,
      departamentooEstadoOrigenResponsable: valoresFormulario.departamentooEstadoOrigenResponsable,
      ciudadOrigenResponsable: valoresFormulario.ciudadOrigenResponsable,
      numeroCursoResponsable: valoresFormulario.numeroCursoResponsable ?? '',
      puestoCursoResponsable: valoresFormulario.puestoCursoResponsable ?? '',
      escalafonAntiguedadResponsable: valoresFormulario.escalafonAntiguedadResponsable ?? '',
      fechaHMSIncorporacionFFMMResponsable: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIncorporacionFFMMResponsable) ?? '',
      fechaHMSIngresoResponsable: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoResponsable),
      fechaHMSModificacionResponsable: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionResponsable),
      estadoResponsable: valoresFormulario.estadoResponsable
    };
    this.guardar.emit({ responsable, operacionFoto });
  }

  confirmarEliminar(): void {
    const idResponsable = this.responsablesForm.getRawValue().idResponsable;
    if (idResponsable) {
      this.eliminar.emit(Number(idResponsable));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }

  ngOnDestroy(): void {
    this.liberarPreviewFotoResponsable();
  }
}
