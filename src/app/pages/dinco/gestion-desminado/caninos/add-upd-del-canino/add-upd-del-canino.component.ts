import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CaninosI } from '../../../../../interfaces/dinco/gestion-desminado/caninos/caninos.interface';
import { CompaniasUnidadesMilitaresI } from '../../../../../interfaces/panel-control/companias-unidades-militares/companias-unidades-militares.interface';
import { TiposDespejesMilitaresArtefactosExplosivosI } from '../../../../../interfaces/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';
import { RazasCaninosI } from '../../../../../interfaces/panel-control/razas-caninos/razas-caninos.interface';

//ESTADOS DE USO QUE PUEDE TENER UN CANINO. MISMO PATRÓN QUE ESTADOS_SOLICITUDES_INFRAESTRUCTURAS_AVALADAS (UpdSolicConstNuevAvaladaComponent):
export const ESTADOS_USO_CANINOS = ['APTO', 'EN ENTRENAMIENTO', 'EN TRATAMIENTO VETERINARIO', 'NO APTO', 'RETIRADO', 'DADO DE BAJA'] as const;

@Component({
  selector: 'app-add-upd-del-canino',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upd-del-canino.component.html',
  styleUrl: './add-upd-del-canino.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelCaninoComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() caninoData: CaninosI | null = null;
  @Input() companiasUnidadesMilitares: CompaniasUnidadesMilitaresI[] = [];
  @Input() tiposDespejesMilitaresArtefactosExplosivos: TiposDespejesMilitaresArtefactosExplosivosI[] = [];
  @Input() razasCaninos: RazasCaninosI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<CaninosI>();
  @Output() eliminar = new EventEmitter<number>();

  caninosForm!: FormGroup;
  //OPCIONES DEL COMBO DE ESTADO: LAS DEL CATÁLOGO FIJO MÁS, SI EL REGISTRO TRAE UN ESTADO QUE NO ESTÁ EN ÉL, ESE ESTADO
  //(PARA QUE EL COMBO LO MUESTRE SELECCIONADO Y NO SE PIERDA AL MODIFICAR):
  estados: string[] = [...ESTADOS_USO_CANINOS];

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['caninoData']) {
      this.initForm();
    }
    //SI EL CATÁLOGO DE RAZAS LLEGA DESPUÉS DEL REGISTRO, SE VUELVE A ENLAZAR LA RAZA SELECCIONADA CON SU ÍTEM DEL CATÁLOGO:
    if (changes['razasCaninos'] && !changes['modo'] && !changes['caninoData']) {
      this.inicializarBuscadorRazaCanino();
    }
  }

  private initForm(): void {
    const registro = this.caninoData;
    this.caninosForm = this.formBuilder.group({
      idCanino: [registro?.idCanino ?? null],
      nombreCanino: [registro?.nombreCanino ?? '', Validators.required],
      denominacionCanino: [registro?.denominacionCanino ?? '', Validators.required],
      nombreRazaCanino: [registro?.nombreRazaCanino ?? '', Validators.required],
      colorCanino: [registro?.colorCanino ?? '', Validators.required],
      numeroChipCanino: [registro?.numeroChipCanino ?? '', Validators.required],
      numeroInventarioCanino: [registro?.numeroInventarioCanino ?? '', Validators.required],
      numeroActivoFijoCanino: [registro?.numeroActivoFijoCanino ?? '', Validators.required],
      estadoUsoCanino: [this.prepararEstado(registro?.estadoUsoCanino), Validators.required],
      companiaUnidadMilitarSeleccionada: [registro?.companiaUnidadMilitarDTO?.idCompaniaUnidadMilitar ?? '', Validators.required],
      tipoDespejeMilitarArtefactoExplosivoSeleccionado: [registro?.tipoDespejeMilitarArtefactoExplosivoDTO?.idTipoDespejeMilitarArtefactoExplosivo ?? '', Validators.required],
      centroCostoCompaniaUnidadMilitar: [registro?.centroCostoCompaniaUnidadMilitar ?? '', Validators.required],
      valorAdquisicionCanino: [registro?.valorAdquisicionCanino ?? '', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      valorContableCanino: [registro?.valorContableCanino ?? '', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      valorCostoUnitarioCanino: [registro?.valorCostoUnitarioCanino ?? '', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      tiempoAnualVidaUtilCanino: [registro?.tiempoAnualVidaUtilCanino ?? ''],
      fechaHMSAltaCanino: [this.formatearFechaParaInput(registro?.fechaHMSAltaCanino)],
      fechaHMSIngresoCanino: [{ value: this.formatearFechaParaInput(registro?.fechaHMSIngresoCanino) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR); AL CREAR AÚN NO EXISTE:
      fechaHMSModificacionCanino: [{ value: registro ? this.obtenerFechaHoraActual() : '', disabled: true }],
      descripcionCanino: [registro?.descripcionCanino ?? ''],
    });
    if (this.banderaCrudEliminar) {
      this.caninosForm.disable();
    }
    this.inicializarBuscadorRazaCanino();
  }

  //AL EDITAR, EL <select> SOLO MARCA LA OPCIÓN SI EL VALOR COINCIDE EXACTAMENTE CON UNA DE ELLAS. EL ESTADO QUE LLEGA DEL
  //BACKEND PUEDE VENIR EN MINÚSCULAS, CON ESPACIOS O SIN TILDES, ASÍ QUE SE NORMALIZA (MAYÚSCULAS, SIN TILDES NI ESPACIOS
  //SOBRANTES) Y SE DEVUELVE LA OPCIÓN EQUIVALENTE DEL CATÁLOGO. SI EL ESTADO NO EXISTE EN EL CATÁLOGO, SE AGREGA COMO OPCIÓN
  //PARA QUE QUEDE SELECCIONADO TAL COMO ESTÁ GUARDADO:
  private prepararEstado(valor: unknown): string {
    this.estados = [...ESTADOS_USO_CANINOS];
    const estadoNormalizado = this.normalizarTexto(valor);
    if (!estadoNormalizado) return '';
    const estadoCatalogo = this.estados.find(estado => this.normalizarTexto(estado) === estadoNormalizado);
    if (estadoCatalogo) return estadoCatalogo;
    const estadoGuardado = String(valor).trim().toUpperCase();
    this.estados = [...this.estados, estadoGuardado];
    return estadoGuardado;
  }

  private normalizarTexto(valor: unknown): string {
    return String(valor ?? '').trim().replace(/\s+/g, ' ').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  //VERDADERO CUANDO EL CAMPO YA FUE TOCADO Y NO CUMPLE SU VALIDACIÓN (PARA MOSTRAR EL MENSAJE DE ERROR):
  campoInvalido(nombreCampo: string): boolean {
    const control = this.caninosForm.get(nombreCampo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. NO SE USA
  //Date.toISOString() PORQUE DEVUELVE LA HORA EN UTC (5 HORAS ADELANTADA EN COLOMBIA) — MISMO PATRÓN QUE AddUpdDelInfraestructuraComponent:
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA UNA FECHA DEL BACKEND (EJ. "2024-05-12 14:30:00.0") AL FORMATO YYYY-MM-DDTHH:mm DEL <input type="datetime-local">:
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //LAS FECHAS DEL DTO SON java.util.Date Y JACKSON EXIGE SEGUNDOS (yyyy-MM-ddTHH:mm:ss); EL <input type="datetime-local">
  //SOLO ENVÍA MINUTOS, ASÍ QUE SE LE AGREGAN LOS SEGUNDOS ANTES DE ENVIARLO — MISMO PATRÓN QUE AddUpdDelInfraestructuraComponent:
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  private aMayusculas(valor: unknown): string {
    return String(valor ?? '').trim().toUpperCase();
  }

  guardarModificar(): void {
    if (this.caninosForm.invalid) {
      this.caninosForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.caninosForm.getRawValue();
    const companiaUnidadMilitar = this.companiasUnidadesMilitares.find(item => item.idCompaniaUnidadMilitar === Number(valoresFormulario.companiaUnidadMilitarSeleccionada));
    const tipoDespejeMilitarArtefactoExplosivo = this.tiposDespejesMilitaresArtefactosExplosivos.find(item => item.idTipoDespejeMilitarArtefactoExplosivo === Number(valoresFormulario.tipoDespejeMilitarArtefactoExplosivoSeleccionado));

    const canino: CaninosI = {
      idCanino: valoresFormulario.idCanino ?? undefined,
      nombreCanino: this.aMayusculas(valoresFormulario.nombreCanino),
      denominacionCanino: this.aMayusculas(valoresFormulario.denominacionCanino),
      nombreRazaCanino: this.aMayusculas(valoresFormulario.nombreRazaCanino),
      colorCanino: this.aMayusculas(valoresFormulario.colorCanino),
      numeroChipCanino: this.aMayusculas(valoresFormulario.numeroChipCanino),
      numeroInventarioCanino: this.aMayusculas(valoresFormulario.numeroInventarioCanino),
      numeroActivoFijoCanino: this.aMayusculas(valoresFormulario.numeroActivoFijoCanino),
      estadoUsoCanino: this.aMayusculas(valoresFormulario.estadoUsoCanino),
      centroCostoCompaniaUnidadMilitar: this.aMayusculas(valoresFormulario.centroCostoCompaniaUnidadMilitar),
      valorAdquisicionCanino: valoresFormulario.valorAdquisicionCanino,
      valorContableCanino: valoresFormulario.valorContableCanino,
      valorCostoUnitarioCanino: valoresFormulario.valorCostoUnitarioCanino,
      tiempoAnualVidaUtilCanino: this.aMayusculas(valoresFormulario.tiempoAnualVidaUtilCanino),
      fechaHMSAltaCanino: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSAltaCanino),
      fechaHMSIngresoCanino: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoCanino),
      fechaHMSModificacionCanino: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionCanino),
      descripcionCanino: this.aMayusculas(valoresFormulario.descripcionCanino),
      companiaUnidadMilitarDTO: companiaUnidadMilitar ?? this.companiasUnidadesMilitares[0],
      tipoDespejeMilitarArtefactoExplosivoDTO: tipoDespejeMilitarArtefactoExplosivo ?? this.tiposDespejesMilitaresArtefactosExplosivos[0],
    };
    this.guardar.emit(canino);
  }

  confirmarEliminar(): void {
    const idCanino = this.caninosForm.getRawValue().idCanino;
    if (idCanino) {
      this.eliminar.emit(Number(idCanino));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }

  //BÚSQUEDA DE RAZA DEL CANINO (CAJA DE TEXTO BUSCADORA SOBRE EL CATÁLOGO PARAMÉTRICO DE RAZAS DE CANINOS DEL PANEL DE
  //CONTROL) — MIENTRAS SE ESCRIBE, SE FILTRA EL CATÁLOGO HASTA ENCONTRAR LA COINCIDENCIA; UNA VEZ SELECCIONADA, EL CAMPO
  //QUEDA BLOQUEADO MOSTRANDO LA RAZA ELEGIDA. MISMO PATRÓN QUE EL BUSCADOR DE PAÍS DE ORIGEN DE AddUpdDelResponsableComponent:
  terminoBusquedaRazaCanino = '';
  razaCaninoBusquedaSeleccionada: RazasCaninosI | null = null;
  mostrarSugerenciasRazaCanino = false;
  banderaRazaCaninoSeleccionada = false;

  get razasCaninosFiltradas(): RazasCaninosI[] {
    const termino = this.terminoBusquedaRazaCanino.trim().toUpperCase();
    if (!termino) return this.razasCaninos;
    return this.razasCaninos.filter(raza => String(raza.nombreRazaCanino).toUpperCase().includes(termino));
  }

  onEscribirBusquedaRazaCanino(): void {
    this.mostrarSugerenciasRazaCanino = true;
    if (this.razaCaninoBusquedaSeleccionada && String(this.razaCaninoBusquedaSeleccionada.nombreRazaCanino) !== this.terminoBusquedaRazaCanino) {
      this.razaCaninoBusquedaSeleccionada = null;
      this.caninosForm.controls['nombreRazaCanino'].setValue('');
    }
  }

  seleccionarRazaCanino(raza: RazasCaninosI): void {
    this.razaCaninoBusquedaSeleccionada = raza;
    this.terminoBusquedaRazaCanino = String(raza.nombreRazaCanino);
    this.caninosForm.controls['nombreRazaCanino'].setValue(raza.nombreRazaCanino);
    this.caninosForm.controls['nombreRazaCanino'].markAsTouched();
    this.mostrarSugerenciasRazaCanino = false;
    this.banderaRazaCaninoSeleccionada = true;
  }

  ocultarSugerenciasRazaCaninoConRetraso(): void {
    setTimeout(() => {
      this.mostrarSugerenciasRazaCanino = false;
      this.changeDetectorRef.markForCheck();
    }, 150);
  }

  limpiarBusquedaRazaCanino(): void {
    this.terminoBusquedaRazaCanino = '';
    this.razaCaninoBusquedaSeleccionada = null;
    this.banderaRazaCaninoSeleccionada = false;
    this.caninosForm.controls['nombreRazaCanino'].setValue('');
  }

  //INICIALIZA EL BUSCADOR DE RAZA: SI EL CANINO YA TIENE RAZA ASIGNADA, EL CAMPO QUEDA BLOQUEADO CON ELLA:
  private inicializarBuscadorRazaCanino(): void {
    const razaActual = String(this.caninoData?.nombreRazaCanino ?? '').trim();
    if (razaActual) {
      this.razaCaninoBusquedaSeleccionada = this.razasCaninos.find(raza => String(raza.nombreRazaCanino).toUpperCase() === razaActual.toUpperCase()) ?? null;
      this.terminoBusquedaRazaCanino = razaActual;
      this.banderaRazaCaninoSeleccionada = true;
    } else {
      this.razaCaninoBusquedaSeleccionada = null;
      this.terminoBusquedaRazaCanino = '';
      this.banderaRazaCaninoSeleccionada = false;
    }
    this.mostrarSugerenciasRazaCanino = false;
  }
}
