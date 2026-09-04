import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { HistorialIntegrantesDocumentosI } from '../../../../interfaces/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposDocumentosIdentificacionI } from '../../../../interfaces/tipos-documentos-identificacion/tipos-documentos-identificacion.interface';
import { CargosIntegrantesDocumentosI } from '../../../../interfaces/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.interface';
import { ResponsablesI } from '../../../../interfaces/panel-control/responsables/responsables.interface';
import { GradosSiathI } from '../../../../interfaces/grados-siath/grados-siath.interface';

import { ResponsablesService } from '../../../../services/panel-control/responsables/responsables.service';
import { HistorialIntegrantesDocumentosService } from '../../../../services/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

export interface OperacionFirmaHistorial {
  tipo: 'subir' | 'mover' | 'renombrar' | 'eliminar';
  nombreAnterior: string;
  nombreNuevo: string;
  siglaAnterior: string;
  siglaNueva: string;
  carpetaAnterior: string;
  carpetaNueva: string;
  archivo?: File;
}

export interface GuardadoHistorialIntegranteDocumentosEvent {
  historialIntegranteDocumentos: HistorialIntegrantesDocumentosI;
  operacionFirma: OperacionFirmaHistorial | null;
}

@Component({
  selector: 'app-add-upd-del-historial-integrante-documentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upd-del-historial-integrante-documentos.component.html',
  styleUrl: './add-upd-del-historial-integrante-documentos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelHistorialIntegranteDocumentosComponent implements OnChanges, OnDestroy {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() historialIntegranteDocumentosData: HistorialIntegrantesDocumentosI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];
  @Input() tiposDocumentosIdentificacion: TiposDocumentosIdentificacionI[] = [];
  @Input() cargosIntegrantesDocumentos: CargosIntegrantesDocumentosI[] = [];
  @Input() gradosSiath: GradosSiathI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<GuardadoHistorialIntegranteDocumentosEvent>();
  @Output() eliminar = new EventEmitter<number>();

  historialesIntegrantesDocumentosForm!: FormGroup;

  //ARCHIVO DE FOTO/FIRMA DEL INTEGRANTE — SIMULADO CON UNA VISTA PREVIA LOCAL (FileReader), SIN SUBIRSE A NINGÚN
  //SERVIDOR DE ARCHIVOS (MISMO PATRÓN QUE AddUpdDelResponsableComponent):
  previewUrlFotoFirmaIntegranteDocumentos: string | null = null;
  selectedFileFotoFirmaIntegranteDocumentos: File | null = null;
  isSelectedFileFotoFirmaIntegranteDocumentos = false;
  banderaConfirmacionEliminacionFotoFirma = false;
  mensajeErrorFotoFirma = '';
  nombreArchivoFotoFirma = '';
  siglaUnidadMilitarFirmaExistente = '';
  fotoFirmaExistenteEliminada = false;

  //FORMULARIO DE BÚSQUEDA DE RESPONSABLES (POR UNIDAD MILITAR Y NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN) PARA CARGAR
  //SUS DATOS EN EL FORMULARIO PRINCIPAL AL CREAR UN REGISTRO NUEVO — MISMO PATRÓN DEL FORMULARIO DE RESPONSABLES DE
  //HARDWARE Y SOFTWARE (ListadoAddUpdDelResponsablesHardySoftComponent.cargarDatosResponsableHardySoftporNumeroDocumentoIdentificacion())
  //DEL PROYECTO DE REFERENCIA PortalSiadmecEjcNacionalV20:
  busquedaResponsableForm!: FormGroup;
  responsablesUnidadMilitarBusqueda: ResponsablesI[] = [];

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private responsablesService: ResponsablesService,
    private historialService: HistorialIntegrantesDocumentosService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService
  ) {
    this.initForm();
    this.initBusquedaResponsableForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['historialIntegranteDocumentosData']) {
      this.initForm();
      this.initBusquedaResponsableForm();
      this.previewUrlFotoFirmaIntegranteDocumentos = null;
      this.selectedFileFotoFirmaIntegranteDocumentos = null;
      this.isSelectedFileFotoFirmaIntegranteDocumentos = false;
      this.nombreArchivoFotoFirma = String(this.historialIntegranteDocumentosData?.nombreArchivoFotoFirmaIntegranteDocumentos || '').trim();
      this.siglaUnidadMilitarFirmaExistente = String(this.historialIntegranteDocumentosData?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
      this.fotoFirmaExistenteEliminada = false;
      if (this.historialIntegranteDocumentosData?.idHistorialIntegranteDocumentos && this.modo !== 'guardar') {
        this.cargarFirmaExistente(Number(this.historialIntegranteDocumentosData.idHistorialIntegranteDocumentos));
      }
    }
  }

  private cargarFirmaExistente(id: number): void {
    this.historialService.getHistorialIntegranteDocumentosbyId(id).subscribe({
      next: ({ historialIntegranteDocumentosDTO }) => {
        this.nombreArchivoFotoFirma = String(historialIntegranteDocumentosDTO?.nombreArchivoFotoFirmaIntegranteDocumentos || '').trim();
        this.siglaUnidadMilitarFirmaExistente = String(historialIntegranteDocumentosDTO?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
        this.changeDetectorRef.markForCheck();
        if (this.nombreArchivoFotoFirma && this.siglaUnidadMilitarFirmaExistente) {
          this.resolverUnidadYPreview(this.nombreArchivoFotoFirma, this.siglaUnidadMilitarFirmaExistente);
        }
      },
      error: () => this.onErrorPreviewFirma()
    });
  }

  private resolverUnidadYPreview(nombre: string, sigla: string): void {
    this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(sigla).subscribe({
      next: ({ unidadMilitarDTO }) => {
        const carpeta = String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
        if (carpeta) this.resolverPreviewFirma(nombre, carpeta);
      },
      error: () => this.onErrorPreviewFirma()
    });
  }

  private resolverPreviewFirma(nombre: string, carpeta: string): void {
    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const carpetaConSeparador = /[\\/]$/.test(carpeta) ? carpeta : `${carpeta}/`;
        const ruta = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosHistorialIntegrantesDocumentos).trim()
          + carpetaConSeparador + nombre;
        this.gestionArchivosService.getFile(ruta).subscribe({
          next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
            next: (blob) => {
              this.liberarPreviewFirma();
              this.previewUrlFotoFirmaIntegranteDocumentos = URL.createObjectURL(blob);
              this.changeDetectorRef.markForCheck();
            },
            error: () => this.onErrorPreviewFirma()
          }),
          error: () => this.onErrorPreviewFirma()
        });
      },
      error: () => this.onErrorPreviewFirma()
    });
  }

  private liberarPreviewFirma(): void {
    if (this.previewUrlFotoFirmaIntegranteDocumentos?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoFirmaIntegranteDocumentos);
  }

  onErrorPreviewFirma(): void {
    this.liberarPreviewFirma();
    this.previewUrlFotoFirmaIntegranteDocumentos = null;
    this.changeDetectorRef.markForCheck();
  }

  //INICIALIZA/REINICIA EL FORMULARIO DE BÚSQUEDA DE RESPONSABLES Y LIMPIA EL LISTADO DE RESPONSABLES FILTRADOS:
  private initBusquedaResponsableForm(): void {
    this.busquedaResponsableForm = this.formBuilder.group({
      unidadMilitarBusquedaSeleccionada: [''],
      numeroDocumentoResponsableBusquedaSeleccionado: ['']
    });
    this.responsablesUnidadMilitarBusqueda = [];
  }

  //BÚSQUEDA DE GRADO SIATH (COMBO BOX CON CAMPO DE TEXTO) — MIENTRAS SE ESCRIBE, SE FILTRA POR LA DESCRIPCIÓN O LA
  //SIGLA; UNA VEZ SELECCIONADO, EL CAMPO QUEDA BLOQUEADO MOSTRANDO LA SIGLA O ACRÓNIMO (nombreGradoSiath) — MISMO
  //PATRÓN QUE AddUpdDelUsuarioComponent:
  terminoBusquedaGrado = '';
  gradoBusquedaSeleccionado: GradosSiathI | null = null;
  mostrarSugerenciasGrado = false;
  banderaGradoSeleccionado = false;

  //CATÁLOGO DE GRADOS SIN DESCRIPCIONES REPETIDAS (VARIOS REGISTROS PUEDEN COMPARTIR LA MISMA DESCRIPCIÓN POR
  //FUERZA/CATEGORÍA), IGUAL QUE AddUpdDelUsuarioComponent.gradosSiathUnicos:
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
      this.historialesIntegrantesDocumentosForm.controls['gradoIntegranteDocumentos'].setValue('');
    }
  }

  //AL SELECCIONAR UNA SUGERENCIA, EL CAMPO QUEDA BLOQUEADO MOSTRANDO LA SIGLA O ACRÓNIMO (nombreGradoSiath), QUE
  //ES TAMBIÉN EL VALOR QUE SE ALMACENA EN gradoIntegranteDocumentos:
  seleccionarGrado(grado: GradosSiathI): void {
    this.gradoBusquedaSeleccionado = grado;
    this.terminoBusquedaGrado = String(grado.nombreGradoSiath);
    this.historialesIntegrantesDocumentosForm.controls['gradoIntegranteDocumentos'].setValue(grado.nombreGradoSiath);
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
    this.historialesIntegrantesDocumentosForm.controls['gradoIntegranteDocumentos'].setValue('');
  }

  //CARGA LOS RESPONSABLES DE LA UNIDAD MILITAR SELECCIONADA PARA PODER ELEGIR SU NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN:
  cargarResponsablesporUnidadMilitarBusqueda(): void {
    this.busquedaResponsableForm.controls['numeroDocumentoResponsableBusquedaSeleccionado'].setValue('');
    const siglaoAcronimoUnidadMilitar = this.unidadesMilitares.find(
      u => u.idUnidadMilitar === Number(this.busquedaResponsableForm.value.unidadMilitarBusquedaSeleccionada)
    )?.siglaoAcronimoUnidadMilitar;
    if (!siglaoAcronimoUnidadMilitar) {
      this.responsablesUnidadMilitarBusqueda = [];
      return;
    }
    this.responsablesService.findAllResponsibles(undefined, String(siglaoAcronimoUnidadMilitar), undefined, undefined, 'nombresResponsable', 'ASC')
      .subscribe({
        next: (responsables) => this.responsablesUnidadMilitarBusqueda = responsables,
        error: (err) => console.error('ERROR AL CARGAR RESPONSABLES DE LA UNIDAD MILITAR: ', err)
      });
  }

  //CONSULTA EL RESPONSABLE SELECCIONADO POR NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN Y CARGA SUS DATOS EN EL FORMULARIO
  //PRINCIPAL (GRADO, NOMBRES Y APELLIDOS, TIPO Y NÚMERO DE DOCUMENTO, UNIDAD MILITAR, CURSO, PUESTO Y ESCALAFÓN):
  cargarDatosDesdeResponsableSeleccionado(): void {
    const numeroDocumentoIdentificacionResponsable = this.busquedaResponsableForm.value.numeroDocumentoResponsableBusquedaSeleccionado;
    if (!numeroDocumentoIdentificacionResponsable) return;
    this.responsablesService.getResponsiblebyNumeroDocumentoIdentificacion(numeroDocumentoIdentificacionResponsable).subscribe({
      next: (respuesta) => {
        const responsable = respuesta.responsableDTO;
        this.historialesIntegrantesDocumentosForm.patchValue({
          unidadMilitarSeleccionada: responsable.unidadMilitarDTO?.idUnidadMilitar ?? '',
          nombresYApellidosIntegranteDocumentos: `${responsable.nombresResponsable} ${responsable.primerApellidoResponsable} ${responsable.segundoApellidoResponsable}`,
          tipoDocumentoIdentificacionSeleccionada: responsable.tipoDocumentoIdentificacionDTO?.idTipoDocumentoIdentificacion ?? '',
          numeroDocumentoIdentificacionIntegranteDocumentos: responsable.numeroDocumentoIdentificacionResponsable,
          numeroCursoIntegranteDocumentos: responsable.numeroCursoResponsable,
          puestoCursoIntegranteDocumentos: responsable.puestoCursoResponsable,
          escalafonAntiguedadIntegranteDocumentos: responsable.escalafonAntiguedadResponsable
        });

        //EL GRADO DEL RESPONSABLE SE SINCRONIZA CON EL BUSCADOR DE GRADO SIATH: SI SU SIGLA EXISTE EN EL CATÁLOGO
        //REAL YA CARGADO, QUEDA BLOQUEADO IGUAL QUE SI SE HUBIERA SELECCIONADO A MANO; SI NO, SE MUESTRA TAL CUAL:
        const gradoResponsable = String(responsable.gradoResponsable ?? '');
        this.gradoBusquedaSeleccionado = this.gradosSiath.find(grado => String(grado.nombreGradoSiath) === gradoResponsable) ?? null;
        this.terminoBusquedaGrado = gradoResponsable;
        this.historialesIntegrantesDocumentosForm.controls['gradoIntegranteDocumentos'].setValue(gradoResponsable);
        this.banderaGradoSeleccionado = true;
      },
      error: (err) => console.error('ERROR AL CARGAR DATOS DEL RESPONSABLE: ', err)
    });
  }

  private initForm(): void {
    const historialIntegranteDocumentos = this.historialIntegranteDocumentosData;
    this.historialesIntegrantesDocumentosForm = this.formBuilder.group({
      idHistorialIntegranteDocumentos: [historialIntegranteDocumentos?.idHistorialIntegranteDocumentos ?? null],
      numRegHistorialIntegranteDocumentos: [historialIntegranteDocumentos?.numRegHistorialIntegranteDocumentos ?? '', Validators.required],
      unidadMilitarSeleccionada: [historialIntegranteDocumentos?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required],
      gradoIntegranteDocumentos: [historialIntegranteDocumentos?.gradoIntegranteDocumentos ?? '', Validators.required],
      nombresYApellidosIntegranteDocumentos: [historialIntegranteDocumentos?.nombresYApellidosIntegranteDocumentos ?? '', Validators.required],
      cargoIntegranteDocumentos: [historialIntegranteDocumentos?.cargoIntegranteDocumentos ?? '', Validators.required],
      tipoDocumentoIdentificacionSeleccionada: [historialIntegranteDocumentos?.tipoDocumentoIdentificacionDTO?.idTipoDocumentoIdentificacion ?? '', Validators.required],
      numeroDocumentoIdentificacionIntegranteDocumentos: [historialIntegranteDocumentos?.numeroDocumentoIdentificacionIntegranteDocumentos ?? '', Validators.required],
      cargoIntegranteDocumentosSeleccionado: [historialIntegranteDocumentos?.cargoIntegranteDocumentosDTO?.idCargoIntegranteDocumentos ?? '', Validators.required],
      siONoIntegranteDocumentos: [historialIntegranteDocumentos?.siONoIntegranteDocumentos ?? '', Validators.required],
      siONoActualIntegranteDocumentosPredeterminado: [historialIntegranteDocumentos?.siONoActualIntegranteDocumentosPredeterminado ?? '', Validators.required],
      numeroCursoIntegranteDocumentos: [historialIntegranteDocumentos?.numeroCursoIntegranteDocumentos ?? '', Validators.required],
      puestoCursoIntegranteDocumentos: [historialIntegranteDocumentos?.puestoCursoIntegranteDocumentos ?? '', Validators.required],
      escalafonAntiguedadIntegranteDocumentos: [historialIntegranteDocumentos?.escalafonAntiguedadIntegranteDocumentos ?? '', Validators.required],
      fechaHMSIngresoIntegranteDocumentos: [{ value: this.formatearFechaParaInput(historialIntegranteDocumentos?.fechaHMSIngresoIntegranteDocumentos) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR). SI LA COLUMNA
      //DE ORACLE ES NOT NULL, TAMBIÉN DEBE ENVIARSE AL CREAR UN REGISTRO NUEVO (NO SOLO AL MODIFICAR); DEJARLA
      //VACÍA EN ESE CASO PROVOCABA ORA-01400 AL INSERTAR — MISMO PATRÓN QUE AddUpdDelUsuarioComponent:
      fechaHMSModificacionIntegranteDocumentos: [{ value: this.obtenerFechaHoraActual(), disabled: true }]
    });
    if (this.banderaCrudEliminar) {
      this.historialesIntegrantesDocumentosForm.disable();
    }

    //INICIALIZA EL BUSCADOR DE GRADO: SI EL REGISTRO YA TIENE UN GRADO ASIGNADO, EL CAMPO BLOQUEADO MUESTRA
    //DIRECTAMENTE LA SIGLA O ACRÓNIMO YA ALMACENADA EN gradoIntegranteDocumentos — MISMO PATRÓN QUE
    //AddUpdDelUsuarioComponent:
    const gradoActual = historialIntegranteDocumentos?.gradoIntegranteDocumentos ? String(historialIntegranteDocumentos.gradoIntegranteDocumentos) : '';
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
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">.
  //A PROPÓSITO NO SE USA Date.toISOString() (DEVUELVE LA HORA EN UTC): EN COLOMBIA (UTC-5) EL CAMPO QUEDABA
  //MOSTRANDO/ENVIANDO LA HORA 5 HORAS ADELANTADA RESPECTO A LA HORA REAL DE BOGOTÁ. MISMO PATRÓN QUE
  //AddUpdDelSolicitudInfraestructuraComponent.obtenerFechaHoraActual():
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA UNA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. LOS
  //CAMPOS TIMESTAMP DE ORACLE LLEGAN CON ESPACIO EN VEZ DE "T" Y, MUCHAS VECES, CON SEGUNDOS/FRACCIÓN DE SEGUNDOS
  //(EJ. "2024-05-12 14:30:00.0") — MISMO PATRÓN QUE AddUpdDelSolicitudInfraestructuraComponent.formatearFechaParaInput():
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //EL BACKEND MAPEA LAS FECHAS DEL HISTORIAL DE INTEGRANTE DE DOCUMENTOS COMO java.util.Date
  //(HistorialIntegranteDocumentosDTO), Y AL NO TENER NINGÚN @JsonFormat NI spring.jackson.date-format CONFIGURADO,
  //JACKSON EXIGE SEGUNDOS EN EL STRING ISO (yyyy-MM-ddTHH:mm:ss). EL <input type="datetime-local"> SOLO ENVÍA
  //MINUTOS (yyyy-MM-ddTHH:mm), ASÍ QUE JACKSON NO LOGRA PARSEARLO Y EL CAMPO QUEDA EN null EN EL BACKEND (SIN
  //LANZAR ERROR 400, POR ESO SOLO SE NOTA CUANDO LA COLUMNA DE ORACLE ES NOT NULL). SE LE AGREGAN LOS SEGUNDOS
  //ANTES DE ENVIARLO, SIN CAMBIAR LO QUE VE O EDITA EL USUARIO EN EL FORMULARIO — MISMO PATRÓN QUE
  //AddUpdDelSolicitudInfraestructuraComponent.agregarSegundosParaBackend():
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  onSelectFileFotoFirmaIntegranteDocumentos(event: Event): void {
    this.mensajeErrorFotoFirma = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const extension = (file.name.split('.').pop() || '').toLowerCase();
    const extensionesPermitidas = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
    const tamanoMaximoBytes = 2_000_000; //2.0 MB.

    if (file.size > tamanoMaximoBytes) {
      this.mensajeErrorFotoFirma = 'El archivo excede el tamaño máximo permitido de 2.0 MB.';
      input.value = '';
      return;
    }
    if (!extensionesPermitidas.includes(extension)) {
      this.mensajeErrorFotoFirma = 'El archivo debe tener una extensión válida (jpg, jpeg, bmp, png o gif).';
      input.value = '';
      return;
    }

    this.selectedFileFotoFirmaIntegranteDocumentos = file;
    this.isSelectedFileFotoFirmaIntegranteDocumentos = true;

    const lector = new FileReader();
    lector.onload = () => {
      this.liberarPreviewFirma();
      this.previewUrlFotoFirmaIntegranteDocumentos = lector.result as string;
      this.changeDetectorRef.markForCheck();
    };
    lector.readAsDataURL(file);
  }

  onRemoveFileFotoFirmaIntegranteDocumentos(): void {
    this.selectedFileFotoFirmaIntegranteDocumentos = null;
    this.isSelectedFileFotoFirmaIntegranteDocumentos = false;
    this.previewUrlFotoFirmaIntegranteDocumentos = null;
    if (this.nombreArchivoFotoFirma && this.siglaUnidadMilitarFirmaExistente && !this.fotoFirmaExistenteEliminada) {
      this.resolverUnidadYPreview(this.nombreArchivoFotoFirma, this.siglaUnidadMilitarFirmaExistente);
    }
  }

  confirmarEliminarFotoFirmaIntegranteDocumentos(): void {
    if (!this.nombreArchivoFotoFirma) return;
    this.banderaConfirmacionEliminacionFotoFirma = true;
  }

  noEliminarFotoFirmaIntegranteDocumentos(): void {
    this.banderaConfirmacionEliminacionFotoFirma = false;
  }

  siEliminarFotoFirmaIntegranteDocumentos(): void {
    this.banderaConfirmacionEliminacionFotoFirma = false;
    this.previewUrlFotoFirmaIntegranteDocumentos = null;
    this.selectedFileFotoFirmaIntegranteDocumentos = null;
    this.isSelectedFileFotoFirmaIntegranteDocumentos = false;
    this.fotoFirmaExistenteEliminada = true;
  }

  guardarModificar(): void {
    if (this.historialesIntegrantesDocumentosForm.invalid) {
      this.historialesIntegrantesDocumentosForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.historialesIntegrantesDocumentosForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));
    const tipoDocumentoIdentificacion = this.tiposDocumentosIdentificacion.find(t => t.idTipoDocumentoIdentificacion === Number(valoresFormulario.tipoDocumentoIdentificacionSeleccionada));
    const cargoIntegranteDocumentos = this.cargosIntegrantesDocumentos.find(c => c.idCargoIntegranteDocumentos === Number(valoresFormulario.cargoIntegranteDocumentosSeleccionado));

    const nombreAnterior = this.nombreArchivoFotoFirma;
    const siglaAnterior = this.siglaUnidadMilitarFirmaExistente;
    const siglaNueva = String(unidadMilitar?.siglaoAcronimoUnidadMilitar || '').trim();
    const documentoAnterior = String(this.historialIntegranteDocumentosData?.numeroDocumentoIdentificacionIntegranteDocumentos || '').trim();
    const documentoNuevo = String(valoresFormulario.numeroDocumentoIdentificacionIntegranteDocumentos).trim();
    let nombreArchivoFotoFirma = this.fotoFirmaExistenteEliminada ? '' : nombreAnterior;
    let operacionFirma: OperacionFirmaHistorial | null = null;
    if (this.selectedFileFotoFirmaIntegranteDocumentos) {
      const extension = (this.selectedFileFotoFirmaIntegranteDocumentos.name.split('.').pop() || '').toLowerCase();
      nombreArchivoFotoFirma = `${this.encriptarDocumento(documentoNuevo)}.${extension}`;
      operacionFirma = { tipo: 'subir', nombreAnterior, nombreNuevo: nombreArchivoFotoFirma, siglaAnterior, siglaNueva, carpetaAnterior: '', carpetaNueva: '', archivo: this.selectedFileFotoFirmaIntegranteDocumentos };
    } else if (this.fotoFirmaExistenteEliminada && nombreAnterior) {
      operacionFirma = { tipo: 'eliminar', nombreAnterior, nombreNuevo: '', siglaAnterior, siglaNueva, carpetaAnterior: '', carpetaNueva: '' };
    } else if (nombreAnterior && (siglaAnterior !== siglaNueva || documentoAnterior !== documentoNuevo)) {
      const extension = nombreAnterior.split('.').pop() || '';
      nombreArchivoFotoFirma = `${this.encriptarDocumento(documentoNuevo)}.${extension}`;
      operacionFirma = { tipo: siglaAnterior !== siglaNueva ? 'mover' : 'renombrar', nombreAnterior, nombreNuevo: nombreArchivoFotoFirma, siglaAnterior, siglaNueva, carpetaAnterior: '', carpetaNueva: '' };
    }

    const historialIntegranteDocumentos: HistorialIntegrantesDocumentosI = {
      idHistorialIntegranteDocumentos: valoresFormulario.idHistorialIntegranteDocumentos ?? undefined,
      numRegHistorialIntegranteDocumentos: valoresFormulario.numRegHistorialIntegranteDocumentos,
      unidadMilitarDTO: unidadMilitar ?? this.unidadesMilitares[0],
      gradoIntegranteDocumentos: valoresFormulario.gradoIntegranteDocumentos,
      nombresYApellidosIntegranteDocumentos: valoresFormulario.nombresYApellidosIntegranteDocumentos,
      cargoIntegranteDocumentos: valoresFormulario.cargoIntegranteDocumentos,
      tipoDocumentoIdentificacionDTO: tipoDocumentoIdentificacion ?? this.tiposDocumentosIdentificacion[0],
      numeroDocumentoIdentificacionIntegranteDocumentos: valoresFormulario.numeroDocumentoIdentificacionIntegranteDocumentos,
      nombreArchivoFotoFirmaIntegranteDocumentos: nombreArchivoFotoFirma,
      cargoIntegranteDocumentosDTO: cargoIntegranteDocumentos ?? this.cargosIntegrantesDocumentos[0],
      siONoIntegranteDocumentos: valoresFormulario.siONoIntegranteDocumentos,
      siONoActualIntegranteDocumentosPredeterminado: valoresFormulario.siONoActualIntegranteDocumentosPredeterminado,
      numeroCursoIntegranteDocumentos: valoresFormulario.numeroCursoIntegranteDocumentos,
      puestoCursoIntegranteDocumentos: valoresFormulario.puestoCursoIntegranteDocumentos,
      escalafonAntiguedadIntegranteDocumentos: valoresFormulario.escalafonAntiguedadIntegranteDocumentos,
      fechaHMSIngresoIntegranteDocumentos: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoIntegranteDocumentos),
      fechaHMSModificacionIntegranteDocumentos: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionIntegranteDocumentos)
    };
    this.guardar.emit({ historialIntegranteDocumentos, operacionFirma });
  }

  private encriptarDocumento(documento: string): string {
    let valor = documento;
    for (let i = 0; i < 2; i++) valor = btoa(valor);
    return valor;
  }

  confirmarEliminar(): void {
    const idHistorialIntegranteDocumentos = this.historialesIntegrantesDocumentosForm.getRawValue().idHistorialIntegranteDocumentos;
    if (idHistorialIntegranteDocumentos) {
      this.eliminar.emit(Number(idHistorialIntegranteDocumentos));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }

  ngOnDestroy(): void { this.liberarPreviewFirma(); }
}
