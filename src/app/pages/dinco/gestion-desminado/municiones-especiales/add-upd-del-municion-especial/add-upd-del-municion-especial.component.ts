import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MunicionesEspecialesI } from '../../../../../interfaces/dinco/gestion-desminado/municiones-especiales/municiones-especiales.interface';
import { PelotonesUnidadesMilitaresI } from '../../../../../interfaces/panel-control/pelotones-unidades-militares/pelotones-unidades-militares.interface';
import { TiposDespejesMilitaresArtefactosExplosivosI } from '../../../../../interfaces/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';

//ESTADOS QUE PUEDE TENER UNA MUNICIÓN ESPECIAL. MISMO PATRÓN QUE ESTADOS_SOLICITUDES_INFRAESTRUCTURAS_AVALADAS (UpdSolicConstNuevAvaladaComponent):
export const ESTADOS_MUNICIONES_ESPECIALES = ['DISPONIBLE', 'EN USO', 'EN REVISIÓN', 'VENCIDA', 'AGOTADA', 'DADA DE BAJA'] as const;

@Component({
  selector: 'app-add-upd-del-municion-especial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-municion-especial.component.html',
  styleUrl: './add-upd-del-municion-especial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelMunicionEspecialComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() municionEspecialData: MunicionesEspecialesI | null = null;
  @Input() pelotonesUnidadesMilitares: PelotonesUnidadesMilitaresI[] = [];
  @Input() tiposDespejesMilitaresArtefactosExplosivos: TiposDespejesMilitaresArtefactosExplosivosI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<MunicionesEspecialesI>();
  @Output() eliminar = new EventEmitter<number>();

  municionesEspecialesForm!: FormGroup;
  //OPCIONES DEL COMBO DE ESTADO: LAS DEL CATÁLOGO FIJO MÁS, SI EL REGISTRO TRAE UN ESTADO QUE NO ESTÁ EN ÉL, ESE ESTADO
  //(PARA QUE EL COMBO LO MUESTRE SELECCIONADO Y NO SE PIERDA AL MODIFICAR):
  estados: string[] = [...ESTADOS_MUNICIONES_ESPECIALES];

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
    if (changes['modo'] || changes['municionEspecialData']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const registro = this.municionEspecialData;
    this.municionesEspecialesForm = this.formBuilder.group({
      idMunicionEspecial: [registro?.idMunicionEspecial ?? null],
      nombreMunicionEspecial: [registro?.nombreMunicionEspecial ?? '', Validators.required],
      loteMunicionEspecial: [registro?.loteMunicionEspecial ?? '', Validators.required],
      cantidadMunicionEspecial: [registro?.cantidadMunicionEspecial ?? '', [Validators.required, Validators.pattern(/^\d+$/)]],
      estadoMunicionEspecial: [this.prepararEstado(registro?.estadoMunicionEspecial), Validators.required],
      pelotonUnidadMilitarSeleccionado: [registro?.pelotonUnidadMilitarDTO?.idPelotonUnidadMilitar ?? '', Validators.required],
      tipoDespejeMilitarArtefactoExplosivoSeleccionado: [registro?.tipoDespejeMilitarArtefactoExplosivoDTO?.idTipoDespejeMilitarArtefactoExplosivo ?? '', Validators.required],
      centroCostoPelotonUnidadMilitar: [registro?.centroCostoPelotonUnidadMilitar ?? '', Validators.required],
      valorAdquisicionMunicionEspecial: [registro?.valorAdquisicionMunicionEspecial ?? '', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      valorContableMunicionEspecial: [registro?.valorContableMunicionEspecial ?? '', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      fechaHMSAltaMunicionEspecial: [this.formatearFechaParaInput(registro?.fechaHMSAltaMunicionEspecial)],
      fechaHMSIngresoMunicionEspecial: [{ value: this.formatearFechaParaInput(registro?.fechaHMSIngresoMunicionEspecial) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR); AL CREAR AÚN NO EXISTE:
      fechaHMSModificacionMunicionEspecial: [{ value: registro ? this.obtenerFechaHoraActual() : '', disabled: true }],
    });
    if (this.banderaCrudEliminar) {
      this.municionesEspecialesForm.disable();
    }
  }

  //AL EDITAR, EL <select> SOLO MARCA LA OPCIÓN SI EL VALOR COINCIDE EXACTAMENTE CON UNA DE ELLAS. EL ESTADO QUE LLEGA DEL
  //BACKEND PUEDE VENIR EN MINÚSCULAS, CON ESPACIOS O SIN TILDES, ASÍ QUE SE NORMALIZA (MAYÚSCULAS, SIN TILDES NI ESPACIOS
  //SOBRANTES) Y SE DEVUELVE LA OPCIÓN EQUIVALENTE DEL CATÁLOGO. SI EL ESTADO NO EXISTE EN EL CATÁLOGO, SE AGREGA COMO OPCIÓN
  //PARA QUE QUEDE SELECCIONADO TAL COMO ESTÁ GUARDADO:
  private prepararEstado(valor: unknown): string {
    this.estados = [...ESTADOS_MUNICIONES_ESPECIALES];
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
    const control = this.municionesEspecialesForm.get(nombreCampo);
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
    if (this.municionesEspecialesForm.invalid) {
      this.municionesEspecialesForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.municionesEspecialesForm.getRawValue();
    const pelotonUnidadMilitar = this.pelotonesUnidadesMilitares.find(item => item.idPelotonUnidadMilitar === Number(valoresFormulario.pelotonUnidadMilitarSeleccionado));
    const tipoDespejeMilitarArtefactoExplosivo = this.tiposDespejesMilitaresArtefactosExplosivos.find(item => item.idTipoDespejeMilitarArtefactoExplosivo === Number(valoresFormulario.tipoDespejeMilitarArtefactoExplosivoSeleccionado));

    const municionEspecial: MunicionesEspecialesI = {
      idMunicionEspecial: valoresFormulario.idMunicionEspecial ?? undefined,
      nombreMunicionEspecial: this.aMayusculas(valoresFormulario.nombreMunicionEspecial),
      loteMunicionEspecial: this.aMayusculas(valoresFormulario.loteMunicionEspecial),
      cantidadMunicionEspecial: valoresFormulario.cantidadMunicionEspecial,
      estadoMunicionEspecial: this.aMayusculas(valoresFormulario.estadoMunicionEspecial),
      centroCostoPelotonUnidadMilitar: this.aMayusculas(valoresFormulario.centroCostoPelotonUnidadMilitar),
      valorAdquisicionMunicionEspecial: valoresFormulario.valorAdquisicionMunicionEspecial,
      valorContableMunicionEspecial: valoresFormulario.valorContableMunicionEspecial,
      fechaHMSAltaMunicionEspecial: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSAltaMunicionEspecial),
      fechaHMSIngresoMunicionEspecial: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoMunicionEspecial),
      fechaHMSModificacionMunicionEspecial: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionMunicionEspecial),
      pelotonUnidadMilitarDTO: pelotonUnidadMilitar ?? this.pelotonesUnidadesMilitares[0],
      tipoDespejeMilitarArtefactoExplosivoDTO: tipoDespejeMilitarArtefactoExplosivo ?? this.tiposDespejesMilitaresArtefactosExplosivos[0],
    };
    this.guardar.emit(municionEspecial);
  }

  confirmarEliminar(): void {
    const idMunicionEspecial = this.municionesEspecialesForm.getRawValue().idMunicionEspecial;
    if (idMunicionEspecial) {
      this.eliminar.emit(Number(idMunicionEspecial));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
