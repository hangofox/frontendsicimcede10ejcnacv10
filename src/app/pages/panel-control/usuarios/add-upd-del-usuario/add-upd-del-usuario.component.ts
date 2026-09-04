import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { UsuariosI } from '../../../../interfaces/panel-control/usuarios/usuarios.interface';
import { TiposUsuariosI } from '../../../../interfaces/panel-control/tipos-usuarios/tipos-usuarios.interface';
import { TiposDocumentosIdentificacionI } from '../../../../interfaces/tipos-documentos-identificacion/tipos-documentos-identificacion.interface';
import { GradosSiathI } from '../../../../interfaces/grados-siath/grados-siath.interface';
import { PaisesMundoI } from '../../../../interfaces/paises-mundo/paises-mundo.interface';
import { DepartamentosoEstadosMundoI } from '../../../../interfaces/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

export interface OperacionFotoUsuario {
  tipo: 'subir' | 'renombrar' | 'eliminar';
  nombreAnterior: string;
  nombreNuevo: string;
  archivo?: File;
}

export interface GuardadoUsuarioEvent {
  usuario: UsuariosI;
  operacionFoto: OperacionFotoUsuario | null;
}

//DATOS SIMULADOS DE EMPLEADOS DE LA INSTITUCIÓN — SOLO SE USAN PARA PRECARGAR EL FORMULARIO EN MODO GUARDAR,
//IGUAL QUE cargarDatosSiathEmpleadoporNumeroDocumentoIdentificacion() EN PortalSiadmecEjcNacionalV20, PERO CON
//UN CATÁLOGO EN MEMORIA MIENTRAS NO EXISTA UN ENDPOINT REAL DE EMPLEADOS SIATH EN EL BACKEND (SE BUSCÓ EN EL
//BACKEND REAL Y NO HAY NINGÚN Controller/Service/Repository/Entity DE EMPLEADOS SIATH):
interface EmpleadoSimuladoI {
  numeroDocumentoIdentificacion: string;
  idTipoDocumentoIdentificacion: number;
  lugarExpedicionDocumentoIdentificacion: string;
  grado: string;
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
}

const EMPLEADOS_SIMULADOS: EmpleadoSimuladoI[] = [
  {
    numeroDocumentoIdentificacion: '1030500007',
    idTipoDocumentoIdentificacion: 1,
    lugarExpedicionDocumentoIdentificacion: 'BOGOTÁ D.C.',
    grado: 'SV',
    nombres: 'Diego Alejandro',
    primerApellido: 'Ramirez',
    segundoApellido: 'Vargas',
    fechaHMSNacimiento: '1992-03-10T00:00',
    sexo: 'MASCULINO',
    direccion: 'Cra 12 # 34-56',
    telefono: '',
    movil: '3077890123',
    correoElectronicoPersonal: 'diego.ramirez@example.com',
    correoElectronicoInstitucional: 'diego.ramirez@ejercito.mil.co',
    paisOrigen: 'COLOMBIA',
    departamentooEstadoOrigen: 'CUNDINAMARCA',
    ciudadOrigen: 'BOGOTÁ D.C.'
  },
  {
    numeroDocumentoIdentificacion: '1030500008',
    idTipoDocumentoIdentificacion: 1,
    lugarExpedicionDocumentoIdentificacion: 'MEDELLÍN',
    grado: 'ST',
    nombres: 'Paula Andrea',
    primerApellido: 'Moreno',
    segundoApellido: 'Salazar',
    fechaHMSNacimiento: '1994-08-25T00:00',
    sexo: 'FEMENINO',
    direccion: 'Calle 45 # 67-89',
    telefono: '',
    movil: '3088901234',
    correoElectronicoPersonal: 'paula.moreno@example.com',
    correoElectronicoInstitucional: 'paula.moreno@ejercito.mil.co',
    paisOrigen: 'COLOMBIA',
    departamentooEstadoOrigen: 'ANTIOQUIA',
    ciudadOrigen: 'MEDELLÍN'
  },
  {
    numeroDocumentoIdentificacion: '1030500009',
    idTipoDocumentoIdentificacion: 1,
    lugarExpedicionDocumentoIdentificacion: 'CALI',
    grado: 'CT',
    nombres: 'Julian Esteban',
    primerApellido: 'Vargas',
    segundoApellido: 'Castaño',
    fechaHMSNacimiento: '1989-12-05T00:00',
    sexo: 'MASCULINO',
    direccion: 'Av 3 # 10-20',
    telefono: '',
    movil: '3099012345',
    correoElectronicoPersonal: 'julian.vargas@example.com',
    correoElectronicoInstitucional: 'julian.vargas@ejercito.mil.co',
    paisOrigen: 'COLOMBIA',
    departamentooEstadoOrigen: 'VALLE DEL CAUCA',
    ciudadOrigen: 'CALI'
  }
];

@Component({
  selector: 'app-add-upd-del-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upd-del-usuario.component.html',
  styleUrl: './add-upd-del-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelUsuarioComponent implements OnChanges, OnDestroy {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() usuarioData: UsuariosI | null = null;
  @Input() tiposUsuarios: TiposUsuariosI[] = [];
  @Input() tiposDocumentos: TiposDocumentosIdentificacionI[] = [];
  @Input() gradosSiath: GradosSiathI[] = [];
  @Input() paisesMundo: PaisesMundoI[] = [];
  @Input() departamentosoEstadosMundo: DepartamentosoEstadosMundoI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<GuardadoUsuarioEvent>();
  @Output() eliminar = new EventEmitter<number>();

  usuariosForm!: FormGroup;

  //FOTO DEL USUARIO — SIMULADA CON UNA VISTA PREVIA LOCAL (FileReader), SIN SUBIRSE A NINGÚN SERVIDOR DE ARCHIVOS
  //TODAVÍA (MISMO PATRÓN QUE AddUpdDelResponsableComponent):
  previewUrlFotoUsuario: string | null = null;
  selectedFileUsuarioPhoto: File | null = null;
  isSelectedFileUsuarioPhoto = false;
  banderaConfirmacionEliminacionFoto = false;
  mensajeErrorFoto = '';
  nombreArchivoFotoUsuario = '';
  fotoExistenteEliminada = false;

  //BÚSQUEDA DE EMPLEADO (SOLO EN MODO GUARDAR) — PRECARGA EL FORMULARIO DESDE EL CATÁLOGO SIMULADO DE EMPLEADOS:
  mensajeBusquedaEmpleado = '';

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  //EL SUPER ADMINISTRADOR (idUsuario === 1) SOLO PUEDE EXISTIR UNO — NUNCA SE LE CAMBIA EL TIPO DE USUARIO:
  get esSuperAdministrador(): boolean {
    return this.banderaCrudModificar && this.usuarioData?.idUsuario === 1;
  }

  //TIPOS DE USUARIO DISPONIBLES EN EL COMBO: PARA EL SUPER ADMINISTRADOR SE FILTRA POR EL ID DE SU TIPO DE USUARIO
  //ACTUAL (NO POR EL NOMBRE), YA QUE EL NOMBRE EXACTO DEL TIPO "SUPER ADMINISTRADOR" PUEDE VARIAR SEGÚN CÓMO ESTÉ
  //REGISTRADO EN LA BASE DE DATOS (POR EJEMPLO "SUPER ADMINISTRADOR DEL SISTEMA") — FILTRAR POR NOMBRE EXACTO
  //DEJABA EL COMBO SIN NINGUNA OPCIÓN VISIBLE SI EL NOMBRE NO COINCIDÍA LITERALMENTE. EL RESTO DE USUARIOS NUNCA
  //PUEDEN ELEGIR EL TIPO DE USUARIO DEL SUPER ADMINISTRADOR (SOLO PUEDE EXISTIR UNO):
  get tiposUsuariosDisponibles(): TiposUsuariosI[] {
    if (this.esSuperAdministrador) {
      const idTipoUsuarioActual = this.usuarioData?.tipoUsuarioDTO?.idTipoUsuario;
      return this.tiposUsuarios.filter(tipo => tipo.idTipoUsuario === idTipoUsuarioActual);
    }
    const idTipoUsuarioSuperAdministrador = this.tiposUsuarios.find(tipo => tipo.nombreTipoUsuario.toString().toUpperCase().includes('SUPER ADMINISTRADOR'))?.idTipoUsuario;
    return this.tiposUsuarios.filter(tipo => tipo.idTipoUsuario !== idTipoUsuarioSuperAdministrador);
  }

  //BÚSQUEDA DE GRADO SIATH (COMBO BOX CON CAMPO DE TEXTO) — MIENTRAS SE ESCRIBE, SE FILTRA POR LA DESCRIPCIÓN O LA
  //SIGLA (MÁS FÁCIL DE ENCONTRAR EL GRADO), PERO UNA VEZ SELECCIONADO, EL CAMPO QUEDA BLOQUEADO MOSTRANDO LA SIGLA
  //O ACRÓNIMO (nombreGradoSiath, EJ. "SV"), NO LA DESCRIPCIÓN — IGUAL QUE PortalSiadmecEjcNacionalV20, DONDE
  //onSiathGradeChange GUARDA label2 (nombreGradoSiath) EN ctextGradoUsuario Y ESE ES EL CAMPO QUE SE MUESTRA
  //BLOQUEADO (readonly) UNA VEZ SELECCIONADO, NO EL cboxGradoUsuarioSeleccionado (label1/descripción) QUE SOLO SE
  //USA MIENTRAS SE BUSCA. SE HABILITA DE NUEVO AL LIMPIARLO CON EL BOTÓN "×", REPLICANDO EL PATRÓN DE
  //banderaGradoSiathSeleccionado DEL PROYECTO DE REFERENCIA:
  terminoBusquedaGrado = '';
  gradoBusquedaSeleccionado: GradosSiathI | null = null;
  mostrarSugerenciasGrado = false;
  banderaGradoSeleccionado = false;

  //CATÁLOGO DE GRADOS SIN DESCRIPCIONES REPETIDAS (VARIOS REGISTROS PUEDEN COMPARTIR LA MISMA DESCRIPCIÓN POR
  //FUERZA/CATEGORÍA), IGUAL QUE EL filter POR label1 ÚNICO DEL PROYECTO DE REFERENCIA:
  private get gradosSiathUnicos(): GradosSiathI[] {
    const vistos = new Set<string>();
    return this.gradosSiath.filter(grado => {
      const descripcion = String(grado.descripcionGradoSiath);
      if (vistos.has(descripcion)) return false;
      vistos.add(descripcion);
      return true;
    });
  }

  get gradosSiathFiltrados(): GradosSiathI[] {
    const termino = this.terminoBusquedaGrado.trim().toUpperCase();
    if (!termino) return this.gradosSiathUnicos;
    return this.gradosSiathUnicos.filter(grado =>
      String(grado.descripcionGradoSiath).toUpperCase().includes(termino) || String(grado.nombreGradoSiath).toUpperCase().includes(termino)
    );
  }

  onEscribirBusquedaGrado(): void {
    this.mostrarSugerenciasGrado = true;
    if (this.gradoBusquedaSeleccionado && String(this.gradoBusquedaSeleccionado.nombreGradoSiath) !== this.terminoBusquedaGrado) {
      this.gradoBusquedaSeleccionado = null;
      this.usuariosForm.controls['gradoUsuario'].setValue('');
    }
  }

  //AL SELECCIONAR UNA SUGERENCIA, EL CAMPO QUEDA BLOQUEADO MOSTRANDO LA SIGLA O ACRÓNIMO (nombreGradoSiath), QUE
  //ES TAMBIÉN EL VALOR QUE SE ALMACENA EN gradoUsuario:
  seleccionarGrado(grado: GradosSiathI): void {
    this.gradoBusquedaSeleccionado = grado;
    this.terminoBusquedaGrado = String(grado.nombreGradoSiath);
    this.usuariosForm.controls['gradoUsuario'].setValue(grado.nombreGradoSiath);
    this.mostrarSugerenciasGrado = false;
    this.banderaGradoSeleccionado = true;
  }

  ocultarSugerenciasGradoConRetraso(): void {
    setTimeout(() => { this.mostrarSugerenciasGrado = false; }, 150);
  }

  limpiarBusquedaGrado(): void {
    this.terminoBusquedaGrado = '';
    this.gradoBusquedaSeleccionado = null;
    this.banderaGradoSeleccionado = false;
    this.usuariosForm.controls['gradoUsuario'].setValue('');
  }

  //BÚSQUEDA DE PAÍS DE ORIGEN (COMBO BOX CON CAMPO DE TEXTO) — MISMO PATRÓN QUE EL BUSCADOR DE GRADO SIATH:
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
      this.usuariosForm.controls['paisOrigenUsuario'].setValue('');
      this.limpiarBusquedaDepartamentoOrigen();
    }
  }

  //AL CAMBIAR EL PAÍS SE LIMPIA EL DEPARTAMENTO O ESTADO YA ELEGIDO (SI HABÍA UNO), YA QUE EL COMBO DE DEPARTAMENTO
  //SE FILTRA POR EL PAÍS SELECCIONADO Y EL VALOR ANTERIOR PODRÍA YA NO PERTENECER A ESTE PAÍS:
  seleccionarPaisOrigen(pais: PaisesMundoI): void {
    this.paisOrigenBusquedaSeleccionado = pais;
    this.terminoBusquedaPaisOrigen = String(pais.nombrePaisMundo);
    this.usuariosForm.controls['paisOrigenUsuario'].setValue(pais.nombrePaisMundo);
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
    this.usuariosForm.controls['paisOrigenUsuario'].setValue('');
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
      this.usuariosForm.controls['departamentooEstadoOrigenUsuario'].setValue('');
    }
  }

  seleccionarDepartamentoOrigen(departamento: DepartamentosoEstadosMundoI): void {
    this.departamentoOrigenBusquedaSeleccionado = departamento;
    this.terminoBusquedaDepartamentoOrigen = String(departamento.nombreDepartamentooEstadoMundo);
    this.usuariosForm.controls['departamentooEstadoOrigenUsuario'].setValue(departamento.nombreDepartamentooEstadoMundo);
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
    this.usuariosForm.controls['departamentooEstadoOrigenUsuario'].setValue('');
  }

  //BUSCA AL EMPLEADO EN EL CATÁLOGO SIMULADO POR NÚMERO DE DOCUMENTO Y PRECARGA SUS DATOS EN EL FORMULARIO —
  //TEMPORAL MIENTRAS NO EXISTA UN ENDPOINT REAL DE EMPLEADOS SIATH EN EL BACKEND (VER COMENTARIO JUNTO A
  //EMPLEADOS_SIMULADOS):
  buscarEmpleado(): void {
    this.mensajeBusquedaEmpleado = '';
    const numeroDocumento = String(this.usuariosForm.get('palabraClaveNumeroDocumentoIdentificacionUsuario')?.value || '').trim();
    if (!numeroDocumento) {
      this.mensajeBusquedaEmpleado = 'Ingrese el número de documento de identificación.';
      return;
    }

    const empleado = EMPLEADOS_SIMULADOS.find(e => e.numeroDocumentoIdentificacion === numeroDocumento);
    if (!empleado) {
      this.mensajeBusquedaEmpleado = 'No se encontró ningún empleado con ese número de documento.';
      return;
    }

    this.usuariosForm.patchValue({
      tipoDocumentoIdentificacionSeleccionado: empleado.idTipoDocumentoIdentificacion,
      numeroDocumentoIdentificacionUsuario: empleado.numeroDocumentoIdentificacion,
      lugarExpedicionDocumentoIdentificacionUsuario: empleado.lugarExpedicionDocumentoIdentificacion,
      nombresUsuario: empleado.nombres,
      primerApellidoUsuario: empleado.primerApellido,
      segundoApellidoUsuario: empleado.segundoApellido,
      fechaHMSNacimientoUsuario: empleado.fechaHMSNacimiento,
      sexoUsuario: empleado.sexo,
      direccionUsuario: empleado.direccion,
      telefonoUsuario: empleado.telefono,
      movilUsuario: empleado.movil,
      correoElectronicoPersonalUsuario: empleado.correoElectronicoPersonal,
      correoElectronicoInstitucionalUsuario: empleado.correoElectronicoInstitucional,
      paisOrigenUsuario: empleado.paisOrigen,
      departamentooEstadoOrigenUsuario: empleado.departamentooEstadoOrigen,
      ciudadOrigenUsuario: empleado.ciudadOrigen
    });

    //EL GRADO DEL EMPLEADO SE SINCRONIZA CON EL BUSCADOR DE GRADO SIATH: SI SU SIGLA EXISTE EN EL CATÁLOGO REAL
    //YA CARGADO, QUEDA BLOQUEADO IGUAL QUE SI SE HUBIERA SELECCIONADO A MANO; SI NO, SE MUESTRA TAL CUAL:
    this.gradoBusquedaSeleccionado = this.gradosSiath.find(grado => String(grado.nombreGradoSiath) === empleado.grado) ?? null;
    this.terminoBusquedaGrado = empleado.grado;
    this.usuariosForm.controls['gradoUsuario'].setValue(empleado.grado);
    this.banderaGradoSeleccionado = true;

    //EL PAÍS Y EL DEPARTAMENTO O ESTADO DEL EMPLEADO SE SINCRONIZAN CON SUS BUSCADORES DE LA MISMA FORMA:
    this.paisOrigenBusquedaSeleccionado = this.paisesMundo.find(pais => String(pais.nombrePaisMundo).toUpperCase() === empleado.paisOrigen.toUpperCase()) ?? null;
    this.terminoBusquedaPaisOrigen = empleado.paisOrigen;
    this.usuariosForm.controls['paisOrigenUsuario'].setValue(empleado.paisOrigen);
    this.banderaPaisOrigenSeleccionado = true;

    this.departamentoOrigenBusquedaSeleccionado = this.departamentosoEstadosMundoDelPaisSeleccionado.find(depto => String(depto.nombreDepartamentooEstadoMundo).toUpperCase() === empleado.departamentooEstadoOrigen.toUpperCase()) ?? null;
    this.terminoBusquedaDepartamentoOrigen = empleado.departamentooEstadoOrigen;
    this.usuariosForm.controls['departamentooEstadoOrigenUsuario'].setValue(empleado.departamentooEstadoOrigen);
    this.banderaDepartamentoOrigenSeleccionado = true;

    this.mensajeBusquedaEmpleado = 'Datos del empleado cargados correctamente.';
  }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['usuarioData']) {
      this.initForm();
      this.previewUrlFotoUsuario = null;
      this.selectedFileUsuarioPhoto = null;
      this.isSelectedFileUsuarioPhoto = false;
      this.nombreArchivoFotoUsuario = String(this.usuarioData?.nombreArchivoFotoExtensionoFormatoUsuario || '');
      this.fotoExistenteEliminada = false;
      if (this.nombreArchivoFotoUsuario) this.resolverPreviewFotoUsuario(this.nombreArchivoFotoUsuario);
    }
  }

  private resolverPreviewFotoUsuario(nombreArchivo: string): void {
    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const ruta = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones)
          + String(parametrosSistemaDTO.rutaDestinoArchivosUsuarios) + nombreArchivo;
        this.gestionArchivosService.getFile(ruta).subscribe({
          next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
            next: (blob) => {
              this.liberarPreviewFotoUsuario();
              this.previewUrlFotoUsuario = URL.createObjectURL(blob);
              this.changeDetectorRef.markForCheck();
            },
            error: () => this.onErrorPreviewFotoUsuario()
          }),
          error: () => this.onErrorPreviewFotoUsuario()
        });
      },
      error: () => this.onErrorPreviewFotoUsuario()
    });
  }

  private liberarPreviewFotoUsuario(): void {
    if (this.previewUrlFotoUsuario?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoUsuario);
  }

  onErrorPreviewFotoUsuario(): void {
    this.liberarPreviewFotoUsuario();
    this.previewUrlFotoUsuario = null;
    this.changeDetectorRef.markForCheck();
  }

  private initForm(): void {
    const usuario = this.usuarioData;
    this.usuariosForm = this.formBuilder.group({
      palabraClaveNumeroDocumentoIdentificacionUsuario: [''],
      idUsuario: [usuario?.idUsuario ?? null],
      nicknameUsuario: [usuario?.nicknameUsuario ?? '', Validators.required],
      passwordUsuario: ['', this.banderaCrudGuardar ? Validators.required : []],
      tipoDocumentoIdentificacionSeleccionado: [usuario?.tipoDocumentoIdentificacionDTO?.idTipoDocumentoIdentificacion ?? '', Validators.required],
      numeroDocumentoIdentificacionUsuario: [usuario?.numeroDocumentoIdentificacionUsuario ?? '', Validators.required],
      lugarExpedicionDocumentoIdentificacionUsuario: [usuario?.lugarExpedicionDocumentoIdentificacionUsuario ?? '', Validators.required],
      gradoUsuario: [usuario?.gradoUsuario ?? ''],
      nombresUsuario: [usuario?.nombresUsuario ?? '', Validators.required],
      primerApellidoUsuario: [usuario?.primerApellidoUsuario ?? '', Validators.required],
      segundoApellidoUsuario: [usuario?.segundoApellidoUsuario ?? ''],
      fechaHMSNacimientoUsuario: [this.formatearFechaParaInput(usuario?.fechaHMSNacimientoUsuario), Validators.required],
      sexoUsuario: [usuario?.sexoUsuario ?? '', Validators.required],
      direccionUsuario: [usuario?.direccionUsuario ?? '', Validators.required],
      telefonoUsuario: [usuario?.telefonoUsuario ?? ''],
      movilUsuario: [usuario?.movilUsuario ?? '', Validators.required],
      correoElectronicoPersonalUsuario: [usuario?.correoElectronicoPersonalUsuario ?? '', [Validators.required, Validators.email]],
      correoElectronicoInstitucionalUsuario: [usuario?.correoElectronicoInstitucionalUsuario ?? ''],
      paisOrigenUsuario: [usuario?.paisOrigenUsuario ?? '', Validators.required],
      departamentooEstadoOrigenUsuario: [usuario?.departamentooEstadoOrigenUsuario ?? '', Validators.required],
      ciudadOrigenUsuario: [usuario?.ciudadOrigenUsuario ?? '', Validators.required],
      tipoUsuarioSeleccionado: [usuario?.tipoUsuarioDTO?.idTipoUsuario ?? '', Validators.required],
      fechaHMSIngresoUsuario: [{ value: this.formatearFechaParaInput(usuario?.fechaHMSIngresoUsuario) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR). LA COLUMNA
      //FECHA_H_M_S_MODIFICACION_USUARIO ES NOT NULL EN ORACLE, ASÍ QUE TAMBIÉN DEBE ENVIARSE AL CREAR UN USUARIO
      //NUEVO (NO SOLO AL MODIFICAR); DEJARLA VACÍA EN ESE CASO PROVOCABA ORA-01400 AL INSERTAR:
      fechaHMSModificacionUsuario: [{ value: this.obtenerFechaHoraActual(), disabled: true }],
      estadoUsuario: [usuario?.estadoUsuario ?? 'ACTIVO', Validators.required]
    });
    if (this.banderaCrudEliminar) {
      this.usuariosForm.disable();
    }

    //INICIALIZA EL BUSCADOR DE GRADO: SI EL USUARIO YA TIENE UN GRADO ASIGNADO, EL CAMPO BLOQUEADO MUESTRA
    //DIRECTAMENTE LA SIGLA O ACRÓNIMO YA ALMACENADA EN gradoUsuario (IGUAL QUE chargueForm() EN EL PROYECTO DE
    //REFERENCIA, QUE REUTILIZA this.usuarios.gradoUsuario SIN BUSCAR NINGUNA DESCRIPCIÓN). ADEMÁS SE BUSCA EN EL
    //CATÁLOGO PARA QUE onEscribirBusquedaGrado SEPA DETECTAR CUÁNDO EL USUARIO EMPIEZA A ESCRIBIR UN VALOR NUEVO:
    const gradoActual = usuario?.gradoUsuario ? String(usuario.gradoUsuario) : '';
    if (gradoActual) {
      this.gradoBusquedaSeleccionado = this.gradosSiath.find(grado => String(grado.nombreGradoSiath) === gradoActual) ?? null;
      this.terminoBusquedaGrado = gradoActual;
      this.banderaGradoSeleccionado = true;
    } else {
      this.gradoBusquedaSeleccionado = null;
      this.terminoBusquedaGrado = '';
      this.banderaGradoSeleccionado = false;
    }
    this.mostrarSugerenciasGrado = false;

    //INICIALIZA EL BUSCADOR DE PAÍS DE ORIGEN: SI EL USUARIO YA TIENE UN PAÍS ASIGNADO, EL CAMPO BLOQUEADO MUESTRA
    //DIRECTAMENTE EL NOMBRE YA ALMACENADO EN paisOrigenUsuario, IGUAL QUE EL BUSCADOR DE GRADO:
    const paisOrigenActual = usuario?.paisOrigenUsuario ? String(usuario.paisOrigenUsuario) : '';
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
    const departamentoOrigenActual = usuario?.departamentooEstadoOrigenUsuario ? String(usuario.departamentooEstadoOrigenUsuario) : '';
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
  //AuditoriasSistemaService.obtenerFechaHoraLocalActual():
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

  //EL BACKEND MAPEA LAS FECHAS DE USUARIO COMO java.util.Date (UsuarioDTO), Y AL NO TENER NINGÚN @JsonFormat NI
  //spring.jackson.date-format CONFIGURADO, JACKSON EXIGE SEGUNDOS EN EL STRING ISO (yyyy-MM-ddTHH:mm:ss). EL
  //<input type="datetime-local"> SOLO ENVÍA MINUTOS (yyyy-MM-ddTHH:mm), ASÍ QUE JACKSON NO LOGRA PARSEARLO Y EL
  //CAMPO QUEDA EN null EN EL BACKEND (SIN LANZAR ERROR 400, POR ESO SOLO SE NOTA CUANDO LA COLUMNA DE ORACLE ES
  //NOT NULL, COMO fecha_h_m_s_modificacion_usuario). SE LE AGREGAN LOS SEGUNDOS ANTES DE ENVIARLO, SIN CAMBIAR LO
  //QUE VE O EDITA EL USUARIO EN EL FORMULARIO — MISMO PATRÓN QUE AddUpdDelInfraestructuraComponent:
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  onSelectFileUsuarioPhoto(event: Event): void {
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

    this.selectedFileUsuarioPhoto = file;
    this.isSelectedFileUsuarioPhoto = true;
    this.fotoExistenteEliminada = false;

    const lector = new FileReader();
    lector.onload = () => {
      this.liberarPreviewFotoUsuario();
      this.previewUrlFotoUsuario = lector.result as string;
      this.changeDetectorRef.markForCheck();
    };
    lector.readAsDataURL(file);
  }

  onRemoveFileUsuarioPhoto(): void {
    this.selectedFileUsuarioPhoto = null;
    this.isSelectedFileUsuarioPhoto = false;
    this.onErrorPreviewFotoUsuario();
    if (this.nombreArchivoFotoUsuario && !this.fotoExistenteEliminada) {
      this.resolverPreviewFotoUsuario(this.nombreArchivoFotoUsuario);
    }
  }

  confirmarEliminarFotoUsuario(): void {
    if (!this.nombreArchivoFotoUsuario) return;
    this.banderaConfirmacionEliminacionFoto = true;
  }

  noEliminarFotoUsuario(): void {
    this.banderaConfirmacionEliminacionFoto = false;
  }

  siEliminarFotoUsuario(): void {
    this.banderaConfirmacionEliminacionFoto = false;
    this.fotoExistenteEliminada = true;
    this.onErrorPreviewFotoUsuario();
    this.selectedFileUsuarioPhoto = null;
    this.isSelectedFileUsuarioPhoto = false;
  }

  //ENCRIPTA LA CONTRASEÑA CON EL MISMO ESQUEMA (BASE64 APLICADO 10 VECES) QUE ESPERA EL BACKEND, IGUAL QUE EN EL LOGIN:
  private obtenerPasswordUsuarioEncriptado(passwordUsuario: string): string {
    let passwordEncriptado = passwordUsuario;
    for (let i = 0; i < 10; i++) {
      passwordEncriptado = btoa(passwordEncriptado);
    }
    return passwordEncriptado;
  }

  private obtenerNumeroDocumentoEncriptado(numeroDocumento: string): string {
    let numeroEncriptado = numeroDocumento;
    for (let i = 0; i < 2; i++) numeroEncriptado = btoa(numeroEncriptado);
    return numeroEncriptado;
  }

  guardarModificar(): void {
    if (this.usuariosForm.invalid) {
      this.usuariosForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.usuariosForm.getRawValue();
    const tipoDocumento = this.tiposDocumentos.find(t => t.idTipoDocumentoIdentificacion === Number(valoresFormulario.tipoDocumentoIdentificacionSeleccionado));
    const tipoUsuario = this.tiposUsuarios.find(t => t.idTipoUsuario === Number(valoresFormulario.tipoUsuarioSeleccionado));

    //LA CONTRASEÑA SOLO SE VUELVE A ENCRIPTAR SI SE ESCRIBIÓ UNA NUEVA; SI SE DEJA VACÍA AL MODIFICAR, SE CONSERVA
    //LA QUE YA ESTABA ALMACENADA (YA VIENE ENCRIPTADA DESDE EL BACKEND):
    const passwordUsuario = valoresFormulario.passwordUsuario
      ? this.obtenerPasswordUsuarioEncriptado(valoresFormulario.passwordUsuario)
      : (this.usuarioData?.passwordUsuario ?? '');

    const nombreAnterior = String(this.usuarioData?.nombreArchivoFotoExtensionoFormatoUsuario || '');
    const documentoAnterior = String(this.usuarioData?.numeroDocumentoIdentificacionUsuario || '');
    const documentoNuevo = String(valoresFormulario.numeroDocumentoIdentificacionUsuario);
    let nombreArchivoFoto = this.fotoExistenteEliminada ? '' : nombreAnterior;
    let operacionFoto: OperacionFotoUsuario | null = null;

    if (this.selectedFileUsuarioPhoto) {
      const extension = (this.selectedFileUsuarioPhoto.name.split('.').pop() || '').toLowerCase();
      nombreArchivoFoto = `${this.obtenerNumeroDocumentoEncriptado(documentoNuevo)}.${extension}`;
      operacionFoto = { tipo: 'subir', nombreAnterior, nombreNuevo: nombreArchivoFoto, archivo: this.selectedFileUsuarioPhoto };
    } else if (this.fotoExistenteEliminada && nombreAnterior) {
      operacionFoto = { tipo: 'eliminar', nombreAnterior, nombreNuevo: '' };
    } else if (nombreAnterior && documentoAnterior !== documentoNuevo) {
      const extension = nombreAnterior.split('.').pop() || '';
      nombreArchivoFoto = `${this.obtenerNumeroDocumentoEncriptado(documentoNuevo)}.${extension}`;
      operacionFoto = { tipo: 'renombrar', nombreAnterior, nombreNuevo: nombreArchivoFoto };
    }

    const usuario: UsuariosI = {
      idUsuario: valoresFormulario.idUsuario ?? undefined,
      nicknameUsuario: valoresFormulario.nicknameUsuario,
      passwordUsuario,
      tipoDocumentoIdentificacionDTO: tipoDocumento ?? this.tiposDocumentos[0],
      numeroDocumentoIdentificacionUsuario: valoresFormulario.numeroDocumentoIdentificacionUsuario,
      lugarExpedicionDocumentoIdentificacionUsuario: valoresFormulario.lugarExpedicionDocumentoIdentificacionUsuario,
      gradoUsuario: valoresFormulario.gradoUsuario ?? '',
      nombresUsuario: valoresFormulario.nombresUsuario,
      primerApellidoUsuario: valoresFormulario.primerApellidoUsuario,
      segundoApellidoUsuario: valoresFormulario.segundoApellidoUsuario ?? '',
      nombreArchivoFotoExtensionoFormatoUsuario: nombreArchivoFoto,
      fechaHMSNacimientoUsuario: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSNacimientoUsuario),
      sexoUsuario: valoresFormulario.sexoUsuario,
      direccionUsuario: valoresFormulario.direccionUsuario,
      telefonoUsuario: valoresFormulario.telefonoUsuario ?? '',
      movilUsuario: valoresFormulario.movilUsuario,
      correoElectronicoPersonalUsuario: valoresFormulario.correoElectronicoPersonalUsuario,
      correoElectronicoInstitucionalUsuario: valoresFormulario.correoElectronicoInstitucionalUsuario ?? '',
      paisOrigenUsuario: valoresFormulario.paisOrigenUsuario,
      departamentooEstadoOrigenUsuario: valoresFormulario.departamentooEstadoOrigenUsuario,
      ciudadOrigenUsuario: valoresFormulario.ciudadOrigenUsuario,
      tipoUsuarioDTO: tipoUsuario ?? this.tiposUsuarios[0],
      fechaHMSIngresoUsuario: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoUsuario),
      fechaHMSModificacionUsuario: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionUsuario),
      estadoUsuario: valoresFormulario.estadoUsuario
    };
    this.guardar.emit({ usuario, operacionFoto });
  }

  confirmarEliminar(): void {
    const idUsuario = this.usuariosForm.getRawValue().idUsuario;
    if (idUsuario) {
      this.eliminar.emit(Number(idUsuario));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }

  ngOnDestroy(): void {
    this.liberarPreviewFotoUsuario();
  }
}
