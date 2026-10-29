import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { ApoyosObrRedMitigGestRiesgDesastI } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposEntidadesInstitucionalesI } from '../../../../../interfaces/tipos-entidades-institucionales/tipos-entidades-institucionales.interface';
import { TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI } from '../../../../../interfaces/digei/gestion-riesgo/tipos-em-desast-gen-obr-red-mitig/tipos-em-desast-gen-obr-red-mitig.interface';
import { PaisesMundoI } from '../../../../../interfaces/paises-mundo/paises-mundo.interface';
import { DepartamentosoEstadosMundoI } from '../../../../../interfaces/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface';

@Component({
  selector: 'app-add-upd-del-apoyo-obr-red-mitig-gest-riesg-desast',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upd-del-apoyo-obr-red-mitig-gest-riesg-desast.component.html',
  styleUrl: './add-upd-del-apoyo-obr-red-mitig-gest-riesg-desast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelApoyoObrRedMitigGestRiesgDesastComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() apoyoObrRedMitigGestRiesgDesastData: ApoyosObrRedMitigGestRiesgDesastI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];
  @Input() tiposEntidadesInstitucionales: TiposEntidadesInstitucionalesI[] = [];
  @Input() tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast: TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI[] = [];
  @Input() paisesMundo: PaisesMundoI[] = [];
  @Input() departamentosoEstadosMundo: DepartamentosoEstadosMundoI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<ApoyosObrRedMitigGestRiesgDesastI>();
  @Output() eliminar = new EventEmitter<number>();

  apoyosObrRedMitigGestRiesgDesastForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['apoyoObrRedMitigGestRiesgDesastData']) {
      this.initForm();
    }
    //LOS CATÁLOGOS DE PAÍSES Y DEPARTAMENTOS O ESTADOS PUEDEN LLEGAR DESPUÉS DE ABRIR EL MODAL; AL LLEGAR SE VUELVEN A
    //PRESELECCIONAR EN LOS BUSCADORES EL PAÍS Y EL DEPARTAMENTO O ESTADO YA ALMACENADOS:
    else if (changes['paisesMundo'] || changes['departamentosoEstadosMundo']) {
      this.inicializarBusquedasOrigen();
    }
  }

  private initForm(): void {
    const apoyoObrRedMitigGestRiesgDesast = this.apoyoObrRedMitigGestRiesgDesastData;
    const numeroNoNegativo = [Validators.required, Validators.min(0)];
    this.apoyosObrRedMitigGestRiesgDesastForm = this.formBuilder.group({
      idApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.idApoyoObrRedMitigGestRiesgDesast ?? null],
      //EL CÓDIGO RADICADO LO GENERA EL BACKEND AL CREAR ("APOY-OBR-ID-SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR-FECHA DE INICIACIÓN"), ASÍ QUE
      //SOLO SE MUESTRA (BLOQUEADO) AL MODIFICAR O ELIMINAR:
      codigoRadicadoApoyoObrRedMitigGestRiesgDesast: [{ value: apoyoObrRedMitigGestRiesgDesast?.codigoRadicadoApoyoObrRedMitigGestRiesgDesast ?? '', disabled: true }],
      unidadMilitarSeleccionada: [apoyoObrRedMitigGestRiesgDesast?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required],
      paisOrigenApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.paisOrigenApoyoObrRedMitigGestRiesgDesast ?? '', Validators.required],
      departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast ?? '', Validators.required],
      ciudadOrigenApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.ciudadOrigenApoyoObrRedMitigGestRiesgDesast ?? '', Validators.required],
      latitudApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.latitudApoyoObrRedMitigGestRiesgDesast ?? '', Validators.required],
      longitudApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.longitudApoyoObrRedMitigGestRiesgDesast ?? '', Validators.required],
      fechaHMSIniciacionApoyoObrRedMitigGestRiesgDesast: [this.formatearFechaParaInput(apoyoObrRedMitigGestRiesgDesast?.fechaHMSIniciacionApoyoObrRedMitigGestRiesgDesast) || this.obtenerFechaHoraActual(), Validators.required],
      fechaHMSFinalizacionApoyoObrRedMitigGestRiesgDesast: [this.formatearFechaParaInput(apoyoObrRedMitigGestRiesgDesast?.fechaHMSFinalizacionApoyoObrRedMitigGestRiesgDesast) || this.obtenerFechaHoraActual(), Validators.required],
      tipoEntidadInstitucionalSeleccionada: [apoyoObrRedMitigGestRiesgDesast?.tipoEntidadInstitucionalDTO?.idTipoEntidadInstitucional ?? '', Validators.required],
      nombreEntidadInstitucionalSolicApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.nombreEntidadInstitucionalSolicApoyoObrRedMitigGestRiesgDesast ?? '', Validators.required],
      codigoRadicadoHrOficioAutorizacionCdoIngApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.codigoRadicadoHrOficioAutorizacionCdoIngApoyoObrRedMitigGestRiesgDesast ?? '', Validators.required],
      tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastSeleccionado: [apoyoObrRedMitigGestRiesgDesast?.tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO?.idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast ?? '', Validators.required],
      //LA COLUMNA DE POBLACIÓN BENEFICIADA ES NOT NULL EN ORACLE: AL CREAR ARRANCA EN CERO (0):
      numeroPobBenefApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.numeroPobBenefApoyoObrRedMitigGestRiesgDesast ?? 0, numeroNoNegativo],
      descripcionObrApoyoObrRedMitigGestRiesgDesast: [apoyoObrRedMitigGestRiesgDesast?.descripcionObrApoyoObrRedMitigGestRiesgDesast ?? '']
    }, { validators: this.validarFechasApoyo });
    this.inicializarBusquedasOrigen();
    if (this.banderaCrudEliminar) {
      this.apoyosObrRedMitigGestRiesgDesastForm.disable();
    }
  }

  //LA FECHA DE FINALIZACIÓN DEL APOYO NO PUEDE SER ANTERIOR A LA DE INICIACIÓN (AMBAS VIENEN EN FORMATO YYYY-MM-DDTHH:mm, QUE SE
  //PUEDE COMPARAR COMO TEXTO):
  private validarFechasApoyo(formulario: AbstractControl): ValidationErrors | null {
    const fechaIniciacion = formulario.get('fechaHMSIniciacionApoyoObrRedMitigGestRiesgDesast')?.value;
    const fechaFinalizacion = formulario.get('fechaHMSFinalizacionApoyoObrRedMitigGestRiesgDesast')?.value;
    if (fechaIniciacion && fechaFinalizacion && fechaFinalizacion < fechaIniciacion) {
      return { fechaFinalizacionAnterior: true };
    }
    return null;
  }

  //INICIALIZA LOS BUSCADORES DE PAÍS Y DEPARTAMENTO O ESTADO DE ORIGEN CON LOS NOMBRES YA ALMACENADOS — MISMO PATRÓN QUE
  //AddUpdDelResponsableComponent:
  private inicializarBusquedasOrigen(): void {
    const paisOrigenActual = String(this.apoyosObrRedMitigGestRiesgDesastForm.get('paisOrigenApoyoObrRedMitigGestRiesgDesast')?.value ?? '');
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
    const departamentoOrigenActual = String(this.apoyosObrRedMitigGestRiesgDesastForm.get('departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast')?.value ?? '');
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
  //A PROPÓSITO NO SE USA Date.toISOString() (DEVUELVE LA HORA EN UTC) — MISMO PATRÓN QUE AddUpdDelSolicitudConstruccionNuevaComponent:
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA UNA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local"> — MISMO PATRÓN QUE
  //AddUpdDelSolicitudConstruccionNuevaComponent:
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //JACKSON EXIGE SEGUNDOS EN EL STRING ISO (yyyy-MM-ddTHH:mm:ss) Y EL <input type="datetime-local"> SOLO ENVÍA MINUTOS; SE LE
  //AGREGAN LOS SEGUNDOS ANTES DE ENVIARLO — MISMO PATRÓN QUE AddUpdDelSolicitudConstruccionNuevaComponent:
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
      this.apoyosObrRedMitigGestRiesgDesastForm.controls['paisOrigenApoyoObrRedMitigGestRiesgDesast'].setValue('');
      this.limpiarBusquedaDepartamentoOrigen();
    }
  }

  //AL CAMBIAR EL PAÍS SE LIMPIA EL DEPARTAMENTO O ESTADO YA ELEGIDO (SI HABÍA UNO), YA QUE EL COMBO DE DEPARTAMENTO SE FILTRA POR EL
  //PAÍS SELECCIONADO Y EL VALOR ANTERIOR PODRÍA YA NO PERTENECER A ESTE PAÍS:
  seleccionarPaisOrigen(pais: PaisesMundoI): void {
    this.paisOrigenBusquedaSeleccionado = pais;
    this.terminoBusquedaPaisOrigen = String(pais.nombrePaisMundo);
    this.apoyosObrRedMitigGestRiesgDesastForm.controls['paisOrigenApoyoObrRedMitigGestRiesgDesast'].setValue(pais.nombrePaisMundo);
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
    this.apoyosObrRedMitigGestRiesgDesastForm.controls['paisOrigenApoyoObrRedMitigGestRiesgDesast'].setValue('');
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
      this.apoyosObrRedMitigGestRiesgDesastForm.controls['departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast'].setValue('');
    }
  }

  seleccionarDepartamentoOrigen(departamento: DepartamentosoEstadosMundoI): void {
    this.departamentoOrigenBusquedaSeleccionado = departamento;
    this.terminoBusquedaDepartamentoOrigen = String(departamento.nombreDepartamentooEstadoMundo);
    this.apoyosObrRedMitigGestRiesgDesastForm.controls['departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast'].setValue(departamento.nombreDepartamentooEstadoMundo);
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
    this.apoyosObrRedMitigGestRiesgDesastForm.controls['departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast'].setValue('');
  }

  guardarModificar(): void {
    if (this.apoyosObrRedMitigGestRiesgDesastForm.invalid) {
      this.apoyosObrRedMitigGestRiesgDesastForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.apoyosObrRedMitigGestRiesgDesastForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));
    const tipoEntidadInstitucional = this.tiposEntidadesInstitucionales.find(t => t.idTipoEntidadInstitucional === Number(valoresFormulario.tipoEntidadInstitucionalSeleccionada));
    const tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast = this.tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast.find(t => t.idTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast === Number(valoresFormulario.tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastSeleccionado));

    const apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI = {
      idApoyoObrRedMitigGestRiesgDesast: valoresFormulario.idApoyoObrRedMitigGestRiesgDesast ?? undefined,
      codigoRadicadoApoyoObrRedMitigGestRiesgDesast: valoresFormulario.codigoRadicadoApoyoObrRedMitigGestRiesgDesast,
      unidadMilitarDTO: unidadMilitar ?? this.unidadesMilitares[0],
      paisOrigenApoyoObrRedMitigGestRiesgDesast: valoresFormulario.paisOrigenApoyoObrRedMitigGestRiesgDesast,
      departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast: valoresFormulario.departamentoOEstadoOrigenApoyoObrRedMitigGestRiesgDesast,
      ciudadOrigenApoyoObrRedMitigGestRiesgDesast: valoresFormulario.ciudadOrigenApoyoObrRedMitigGestRiesgDesast,
      latitudApoyoObrRedMitigGestRiesgDesast: valoresFormulario.latitudApoyoObrRedMitigGestRiesgDesast,
      longitudApoyoObrRedMitigGestRiesgDesast: valoresFormulario.longitudApoyoObrRedMitigGestRiesgDesast,
      fechaHMSIniciacionApoyoObrRedMitigGestRiesgDesast: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIniciacionApoyoObrRedMitigGestRiesgDesast),
      fechaHMSFinalizacionApoyoObrRedMitigGestRiesgDesast: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSFinalizacionApoyoObrRedMitigGestRiesgDesast),
      tipoEntidadInstitucionalDTO: tipoEntidadInstitucional ?? this.tiposEntidadesInstitucionales[0],
      nombreEntidadInstitucionalSolicApoyoObrRedMitigGestRiesgDesast: valoresFormulario.nombreEntidadInstitucionalSolicApoyoObrRedMitigGestRiesgDesast,
      codigoRadicadoHrOficioAutorizacionCdoIngApoyoObrRedMitigGestRiesgDesast: valoresFormulario.codigoRadicadoHrOficioAutorizacionCdoIngApoyoObrRedMitigGestRiesgDesast,
      tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesastDTO: tipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast ?? this.tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast[0],
      numeroPobBenefApoyoObrRedMitigGestRiesgDesast: valoresFormulario.numeroPobBenefApoyoObrRedMitigGestRiesgDesast,
      descripcionObrApoyoObrRedMitigGestRiesgDesast: valoresFormulario.descripcionObrApoyoObrRedMitigGestRiesgDesast
    };
    this.guardar.emit(apoyoObrRedMitigGestRiesgDesast);
  }

  confirmarEliminar(): void {
    const idApoyoObrRedMitigGestRiesgDesast = this.apoyosObrRedMitigGestRiesgDesastForm.getRawValue().idApoyoObrRedMitigGestRiesgDesast;
    if (idApoyoObrRedMitigGestRiesgDesast) {
      this.eliminar.emit(Number(idApoyoObrRedMitigGestRiesgDesast));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
