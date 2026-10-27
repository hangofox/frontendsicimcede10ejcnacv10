import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { ApoyosAtencPrevEmergDesastI } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposEntidadesInstitucionalesI } from '../../../../../interfaces/tipos-entidades-institucionales/tipos-entidades-institucionales.interface';
import { TiposRequerimientosApoyosAtencionPrevencionI } from '../../../../../interfaces/digei/gestion-riesgo/tipos-requerimientos-apoy-atenc-prev/tipos-requerimientos-apoy-atenc-prev.interface';
import { ProcesosApoyosAtencionPrevencionI } from '../../../../../interfaces/digei/gestion-riesgo/procesos-apoyos-atenc-prev/procesos-apoyos-atenc-prev.interface';
import { TiposEventosApoyosRealizadosI } from '../../../../../interfaces/digei/gestion-riesgo/tipos-eventos-apoyos-realizados/tipos-eventos-apoyos-realizados.interface';
import { PaisesMundoI } from '../../../../../interfaces/paises-mundo/paises-mundo.interface';
import { DepartamentosoEstadosMundoI } from '../../../../../interfaces/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface';

@Component({
  selector: 'app-add-upd-del-apoyo-atenc-prev-emerg-desast',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upd-del-apoyo-atenc-prev-emerg-desast.component.html',
  styleUrl: './add-upd-del-apoyo-atenc-prev-emerg-desast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelApoyoAtencPrevEmergDesastComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() apoyoAtencPrevEmergDesastData: ApoyosAtencPrevEmergDesastI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];
  @Input() tiposEntidadesInstitucionales: TiposEntidadesInstitucionalesI[] = [];
  @Input() tiposRequerimientosApoyosAtencionPrevencion: TiposRequerimientosApoyosAtencionPrevencionI[] = [];
  @Input() procesosApoyosAtencionPrevencion: ProcesosApoyosAtencionPrevencionI[] = [];
  @Input() tiposEventosApoyosRealizados: TiposEventosApoyosRealizadosI[] = [];
  @Input() paisesMundo: PaisesMundoI[] = [];
  @Input() departamentosoEstadosMundo: DepartamentosoEstadosMundoI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<ApoyosAtencPrevEmergDesastI>();
  @Output() eliminar = new EventEmitter<number>();

  apoyosAtencPrevEmergDesastForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['apoyoAtencPrevEmergDesastData']) {
      this.initForm();
    }
    //LOS CATÁLOGOS DE PAÍSES Y DEPARTAMENTOS O ESTADOS PUEDEN LLEGAR DESPUÉS DE ABRIR EL MODAL; AL LLEGAR SE VUELVEN A
    //PRESELECCIONAR EN LOS BUSCADORES EL PAÍS Y EL DEPARTAMENTO O ESTADO YA ALMACENADOS:
    else if (changes['paisesMundo'] || changes['departamentosoEstadosMundo']) {
      this.inicializarBusquedasOrigen();
    }
  }

  private initForm(): void {
    const apoyoAtencPrevEmergDesast = this.apoyoAtencPrevEmergDesastData;
    const numeroNoNegativo = [Validators.required, Validators.min(0)];
    this.apoyosAtencPrevEmergDesastForm = this.formBuilder.group({
      idApoyoAtencPrevEmergDesast: [apoyoAtencPrevEmergDesast?.idApoyoAtencPrevEmergDesast ?? null],
      //EL CÓDIGO RADICADO LO GENERA EL BACKEND AL CREAR ("APOY-ATENC-ID-SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR-FECHA DE INICIACIÓN"), ASÍ QUE
      //SOLO SE MUESTRA (BLOQUEADO) AL MODIFICAR O ELIMINAR:
      codigoRadicadoApoyoAtencPrevEmergDesast: [{ value: apoyoAtencPrevEmergDesast?.codigoRadicadoApoyoAtencPrevEmergDesast ?? '', disabled: true }],
      unidadMilitarSeleccionada: [apoyoAtencPrevEmergDesast?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required],
      paisOrigenApoyoAtencPrevEmergDesast: [apoyoAtencPrevEmergDesast?.paisOrigenApoyoAtencPrevEmergDesast ?? '', Validators.required],
      departamentoOEstadoOrigenApoyoAtencPrevEmergDesast: [apoyoAtencPrevEmergDesast?.departamentoOEstadoOrigenApoyoAtencPrevEmergDesast ?? '', Validators.required],
      ciudadOrigenApoyoAtencPrevEmergDesast: [apoyoAtencPrevEmergDesast?.ciudadOrigenApoyoAtencPrevEmergDesast ?? '', Validators.required],
      latitudApoyoAtencPrevEmergDesast: [apoyoAtencPrevEmergDesast?.latitudApoyoAtencPrevEmergDesast ?? '', Validators.required],
      longitudApoyoAtencPrevEmergDesast: [apoyoAtencPrevEmergDesast?.longitudApoyoAtencPrevEmergDesast ?? '', Validators.required],
      fechaHMSIniciacionApoyoAtencPrevEmergDesast: [this.formatearFechaParaInput(apoyoAtencPrevEmergDesast?.fechaHMSIniciacionApoyoAtencPrevEmergDesast) || this.obtenerFechaHoraActual(), Validators.required],
      fechaHMSFinalizacionApoyoAtencPrevEmergDesast: [this.formatearFechaParaInput(apoyoAtencPrevEmergDesast?.fechaHMSFinalizacionApoyoAtencPrevEmergDesast) || this.obtenerFechaHoraActual(), Validators.required],
      tipoEntidadInstitucionalSeleccionada: [apoyoAtencPrevEmergDesast?.tipoEntidadInstitucionalDTO?.idTipoEntidadInstitucional ?? '', Validators.required],
      nombreEntidadInstitucionalSolicApoyoAtencPrevEmergDesast: [apoyoAtencPrevEmergDesast?.nombreEntidadInstitucionalSolicApoyoAtencPrevEmergDesast ?? '', Validators.required],
      tipoRequerimientoApoyoAtencionPrevencionSeleccionado: [apoyoAtencPrevEmergDesast?.tipoRequerimientoApoyoAtencionPrevencionDTO?.idTipoRequerimientoApoyoAtencionPrevencion ?? '', Validators.required],
      procesoApoyoAtencionPrevencionSeleccionado: [apoyoAtencPrevEmergDesast?.procesoApoyoAtencionPrevencionDTO?.idProcesoApoyoAtencionPrevencion ?? '', Validators.required],
      codigoRadicadoTipoRequerimientoApoyoAtencionPrevencion: [apoyoAtencPrevEmergDesast?.codigoRadicadoTipoRequerimientoApoyoAtencionPrevencion ?? '', Validators.required],
      tipoEventoApoyoRealizadoSeleccionado: [apoyoAtencPrevEmergDesast?.tipoEventoApoyoRealizadoDTO?.idTipoEventoApoyoRealizado ?? '', Validators.required],
      //LAS COLUMNAS DE AFECTACIONES SON NOT NULL EN ORACLE: AL CREAR ARRANCAN EN CERO (0):
      numeroHeridosRequerimientoApoyoAtencionPrevencion: [apoyoAtencPrevEmergDesast?.numeroHeridosRequerimientoApoyoAtencionPrevencion ?? 0, numeroNoNegativo],
      numeroMuertosRequerimientoApoyoAtencionPrevencion: [apoyoAtencPrevEmergDesast?.numeroMuertosRequerimientoApoyoAtencionPrevencion ?? 0, numeroNoNegativo],
      numeroDesaparecidosRequerimientoApoyoAtencionPrevencion: [apoyoAtencPrevEmergDesast?.numeroDesaparecidosRequerimientoApoyoAtencionPrevencion ?? 0, numeroNoNegativo],
      numeroViviendasAfectadasRequerimientoApoyoAtencionPrevencion: [apoyoAtencPrevEmergDesast?.numeroViviendasAfectadasRequerimientoApoyoAtencionPrevencion ?? 0, numeroNoNegativo],
      numeroPuentesAfectadosRequerimientoApoyoAtencionPrevencion: [apoyoAtencPrevEmergDesast?.numeroPuentesAfectadosRequerimientoApoyoAtencionPrevencion ?? 0, numeroNoNegativo],
      numeroViasAfectadasRequerimientoApoyoAtencionPrevencion: [apoyoAtencPrevEmergDesast?.numeroViasAfectadasRequerimientoApoyoAtencionPrevencion ?? 0, numeroNoNegativo],
      numeroHectareasAfectadasRequerimientoApoyoAtencionPrevencion: [apoyoAtencPrevEmergDesast?.numeroHectareasAfectadasRequerimientoApoyoAtencionPrevencion ?? 0, numeroNoNegativo],
      descripcionAfectacionApoyoAtencPrevEmergDesast: [apoyoAtencPrevEmergDesast?.descripcionAfectacionApoyoAtencPrevEmergDesast ?? '']
    }, { validators: this.validarFechasApoyo });
    this.inicializarBusquedasOrigen();
    if (this.banderaCrudEliminar) {
      this.apoyosAtencPrevEmergDesastForm.disable();
    }
  }

  //LA FECHA DE FINALIZACIÓN DEL APOYO NO PUEDE SER ANTERIOR A LA DE INICIACIÓN (AMBAS VIENEN EN FORMATO YYYY-MM-DDTHH:mm, QUE SE
  //PUEDE COMPARAR COMO TEXTO):
  private validarFechasApoyo(formulario: AbstractControl): ValidationErrors | null {
    const fechaIniciacion = formulario.get('fechaHMSIniciacionApoyoAtencPrevEmergDesast')?.value;
    const fechaFinalizacion = formulario.get('fechaHMSFinalizacionApoyoAtencPrevEmergDesast')?.value;
    if (fechaIniciacion && fechaFinalizacion && fechaFinalizacion < fechaIniciacion) {
      return { fechaFinalizacionAnterior: true };
    }
    return null;
  }

  //PROCESOS DEL TIPO DE REQUERIMIENTO SELECCIONADO (CADA PROCESO PERTENECE A UN TIPO DE REQUERIMIENTO EN tipoRequerimientoApoyoAtencionPrevencionDTO):
  get procesosApoyosAtencionPrevencionDelTipoSeleccionado(): ProcesosApoyosAtencionPrevencionI[] {
    const idTipoRequerimientoSeleccionado = Number(this.apoyosAtencPrevEmergDesastForm.get('tipoRequerimientoApoyoAtencionPrevencionSeleccionado')?.value);
    if (!idTipoRequerimientoSeleccionado) return [];
    return this.procesosApoyosAtencionPrevencion.filter(proceso => proceso.tipoRequerimientoApoyoAtencionPrevencionDTO?.idTipoRequerimientoApoyoAtencionPrevencion === idTipoRequerimientoSeleccionado);
  }

  //AL CAMBIAR EL TIPO DE REQUERIMIENTO SE LIMPIA EL PROCESO YA ELEGIDO, YA QUE EL COMBO DE PROCESOS SE FILTRA POR EL TIPO SELECCIONADO
  //Y EL VALOR ANTERIOR PODRÍA YA NO PERTENECER A ESTE TIPO:
  onCambiarTipoRequerimientoApoyoAtencionPrevencion(): void {
    this.apoyosAtencPrevEmergDesastForm.controls['procesoApoyoAtencionPrevencionSeleccionado'].setValue('');
  }

  //INICIALIZA LOS BUSCADORES DE PAÍS Y DEPARTAMENTO O ESTADO DE ORIGEN CON LOS NOMBRES YA ALMACENADOS — MISMO PATRÓN QUE
  //AddUpdDelResponsableComponent:
  private inicializarBusquedasOrigen(): void {
    const paisOrigenActual = String(this.apoyosAtencPrevEmergDesastForm.get('paisOrigenApoyoAtencPrevEmergDesast')?.value ?? '');
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

    //EL DEPARTAMENTO O ESTADO SOLO QUEDA PRESELECCIONADO EN EL CATÁLOGO SI PERTENECE AL PAÍS YA CARGADO ARRIBA:
    const departamentoOrigenActual = String(this.apoyosAtencPrevEmergDesastForm.get('departamentoOEstadoOrigenApoyoAtencPrevEmergDesast')?.value ?? '');
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
  //A PROPÓSITO NO SE USA Date.toISOString() (DEVUELVE LA HORA EN UTC) — MISMO PATRÓN QUE AddUpdDelSolicitudInfraestructuraComponent:
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA UNA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local"> — MISMO PATRÓN QUE
  //AddUpdDelSolicitudInfraestructuraComponent:
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //JACKSON EXIGE SEGUNDOS EN EL STRING ISO (yyyy-MM-ddTHH:mm:ss) Y EL <input type="datetime-local"> SOLO ENVÍA MINUTOS; SE LE
  //AGREGAN LOS SEGUNDOS ANTES DE ENVIARLO — MISMO PATRÓN QUE AddUpdDelSolicitudInfraestructuraComponent:
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  //BÚSQUEDA DE PAÍS DE ORIGEN (COMBO BOX CON CAMPO DE TEXTO) — MIENTRAS SE ESCRIBE, SE FILTRA EL CATÁLOGO REAL DE PAÍSES; UNA VEZ
  //SELECCIONADO, EL CAMPO QUEDA BLOQUEADO MOSTRANDO EL NOMBRE ELEGIDO — MISMO PATRÓN QUE AddUpdDelResponsableComponent:
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
      this.apoyosAtencPrevEmergDesastForm.controls['paisOrigenApoyoAtencPrevEmergDesast'].setValue('');
      this.limpiarBusquedaDepartamentoOrigen();
    }
  }

  //AL CAMBIAR EL PAÍS SE LIMPIA EL DEPARTAMENTO O ESTADO YA ELEGIDO (SI HABÍA UNO), YA QUE EL COMBO DE DEPARTAMENTO SE FILTRA POR EL
  //PAÍS SELECCIONADO Y EL VALOR ANTERIOR PODRÍA YA NO PERTENECER A ESTE PAÍS:
  seleccionarPaisOrigen(pais: PaisesMundoI): void {
    this.paisOrigenBusquedaSeleccionado = pais;
    this.terminoBusquedaPaisOrigen = String(pais.nombrePaisMundo);
    this.apoyosAtencPrevEmergDesastForm.controls['paisOrigenApoyoAtencPrevEmergDesast'].setValue(pais.nombrePaisMundo);
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
    this.apoyosAtencPrevEmergDesastForm.controls['paisOrigenApoyoAtencPrevEmergDesast'].setValue('');
    this.limpiarBusquedaDepartamentoOrigen();
  }

  //BÚSQUEDA DE DEPARTAMENTO O ESTADO DE ORIGEN (COMBO BOX CON CAMPO DE TEXTO) — FILTRADO POR EL PAÍS DE ORIGEN YA SELECCIONADO:
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
      this.apoyosAtencPrevEmergDesastForm.controls['departamentoOEstadoOrigenApoyoAtencPrevEmergDesast'].setValue('');
    }
  }

  seleccionarDepartamentoOrigen(departamento: DepartamentosoEstadosMundoI): void {
    this.departamentoOrigenBusquedaSeleccionado = departamento;
    this.terminoBusquedaDepartamentoOrigen = String(departamento.nombreDepartamentooEstadoMundo);
    this.apoyosAtencPrevEmergDesastForm.controls['departamentoOEstadoOrigenApoyoAtencPrevEmergDesast'].setValue(departamento.nombreDepartamentooEstadoMundo);
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
    this.apoyosAtencPrevEmergDesastForm.controls['departamentoOEstadoOrigenApoyoAtencPrevEmergDesast'].setValue('');
  }

  guardarModificar(): void {
    if (this.apoyosAtencPrevEmergDesastForm.invalid) {
      this.apoyosAtencPrevEmergDesastForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.apoyosAtencPrevEmergDesastForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));
    const tipoEntidadInstitucional = this.tiposEntidadesInstitucionales.find(t => t.idTipoEntidadInstitucional === Number(valoresFormulario.tipoEntidadInstitucionalSeleccionada));
    const tipoRequerimientoApoyoAtencionPrevencion = this.tiposRequerimientosApoyosAtencionPrevencion.find(t => t.idTipoRequerimientoApoyoAtencionPrevencion === Number(valoresFormulario.tipoRequerimientoApoyoAtencionPrevencionSeleccionado));
    const procesoApoyoAtencionPrevencion = this.procesosApoyosAtencionPrevencion.find(p => p.idProcesoApoyoAtencionPrevencion === Number(valoresFormulario.procesoApoyoAtencionPrevencionSeleccionado));
    const tipoEventoApoyoRealizado = this.tiposEventosApoyosRealizados.find(t => t.idTipoEventoApoyoRealizado === Number(valoresFormulario.tipoEventoApoyoRealizadoSeleccionado));

    const apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI = {
      idApoyoAtencPrevEmergDesast: valoresFormulario.idApoyoAtencPrevEmergDesast ?? undefined,
      codigoRadicadoApoyoAtencPrevEmergDesast: valoresFormulario.codigoRadicadoApoyoAtencPrevEmergDesast,
      unidadMilitarDTO: unidadMilitar ?? this.unidadesMilitares[0],
      paisOrigenApoyoAtencPrevEmergDesast: valoresFormulario.paisOrigenApoyoAtencPrevEmergDesast,
      departamentoOEstadoOrigenApoyoAtencPrevEmergDesast: valoresFormulario.departamentoOEstadoOrigenApoyoAtencPrevEmergDesast,
      ciudadOrigenApoyoAtencPrevEmergDesast: valoresFormulario.ciudadOrigenApoyoAtencPrevEmergDesast,
      latitudApoyoAtencPrevEmergDesast: valoresFormulario.latitudApoyoAtencPrevEmergDesast,
      longitudApoyoAtencPrevEmergDesast: valoresFormulario.longitudApoyoAtencPrevEmergDesast,
      fechaHMSIniciacionApoyoAtencPrevEmergDesast: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIniciacionApoyoAtencPrevEmergDesast),
      fechaHMSFinalizacionApoyoAtencPrevEmergDesast: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSFinalizacionApoyoAtencPrevEmergDesast),
      tipoEntidadInstitucionalDTO: tipoEntidadInstitucional ?? this.tiposEntidadesInstitucionales[0],
      nombreEntidadInstitucionalSolicApoyoAtencPrevEmergDesast: valoresFormulario.nombreEntidadInstitucionalSolicApoyoAtencPrevEmergDesast,
      tipoRequerimientoApoyoAtencionPrevencionDTO: tipoRequerimientoApoyoAtencionPrevencion ?? this.tiposRequerimientosApoyosAtencionPrevencion[0],
      procesoApoyoAtencionPrevencionDTO: procesoApoyoAtencionPrevencion ?? this.procesosApoyosAtencionPrevencion[0],
      codigoRadicadoTipoRequerimientoApoyoAtencionPrevencion: valoresFormulario.codigoRadicadoTipoRequerimientoApoyoAtencionPrevencion,
      tipoEventoApoyoRealizadoDTO: tipoEventoApoyoRealizado ?? this.tiposEventosApoyosRealizados[0],
      numeroHeridosRequerimientoApoyoAtencionPrevencion: valoresFormulario.numeroHeridosRequerimientoApoyoAtencionPrevencion,
      numeroMuertosRequerimientoApoyoAtencionPrevencion: valoresFormulario.numeroMuertosRequerimientoApoyoAtencionPrevencion,
      numeroDesaparecidosRequerimientoApoyoAtencionPrevencion: valoresFormulario.numeroDesaparecidosRequerimientoApoyoAtencionPrevencion,
      numeroViviendasAfectadasRequerimientoApoyoAtencionPrevencion: valoresFormulario.numeroViviendasAfectadasRequerimientoApoyoAtencionPrevencion,
      numeroPuentesAfectadosRequerimientoApoyoAtencionPrevencion: valoresFormulario.numeroPuentesAfectadosRequerimientoApoyoAtencionPrevencion,
      numeroViasAfectadasRequerimientoApoyoAtencionPrevencion: valoresFormulario.numeroViasAfectadasRequerimientoApoyoAtencionPrevencion,
      numeroHectareasAfectadasRequerimientoApoyoAtencionPrevencion: valoresFormulario.numeroHectareasAfectadasRequerimientoApoyoAtencionPrevencion,
      descripcionAfectacionApoyoAtencPrevEmergDesast: valoresFormulario.descripcionAfectacionApoyoAtencPrevEmergDesast
    };
    this.guardar.emit(apoyoAtencPrevEmergDesast);
  }

  confirmarEliminar(): void {
    const idApoyoAtencPrevEmergDesast = this.apoyosAtencPrevEmergDesastForm.getRawValue().idApoyoAtencPrevEmergDesast;
    if (idApoyoAtencPrevEmergDesast) {
      this.eliminar.emit(Number(idApoyoAtencPrevEmergDesast));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
