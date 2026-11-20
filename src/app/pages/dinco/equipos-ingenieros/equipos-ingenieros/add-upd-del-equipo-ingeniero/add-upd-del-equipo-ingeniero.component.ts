import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EquiposIngenierosI } from '../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { SociedadesUnidadesCentralizadorasI } from '../../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';
import { ClasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface';
import { SubclasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface';
import { ElementosSubclasificacionesEquiposIngenierosI } from '../../../../../interfaces/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface';
import { TiposAltasEquiposIngenierosI } from '../../../../../interfaces/dinco/tipos-altas-equipos-ingenieros/tipos-altas-equipos-ingenieros.interface';

//ESTADOS DE USO QUE PUEDE TENER UN EQUIPO DE INGENIEROS (ESTADO_EQUIPO_INGENIERO EN EL COMPLEMENTO DE TABLAS DE DINCO).
//MISMO PATRÓN QUE ESTADOS_USO_CANINOS (AddUpdDelCaninoComponent):
export const ESTADOS_USO_EQUIPOS_INGENIEROS = [
  'MÁQUINA TOTALMENTE LISTA',
  'MÁQUINA PARCIALMENTE LISTA',
  'MÁQUINA MANTENIMIENTO PROGRAMADO',
  'MÁQUINA MANTENIMIENTO IMPREVISTO',
  'MÁQUINA FUERA DE SERVICIO',
  'MÁQUINA EN TRASLADO DE UNIDAD',
  'MÁQUINA ESPERA INFORMATIVO',
  'MÁQUINA EN RECESO',
  'MÁQUINA EN PROCESO DE BAJA',
  'MÁQUINA DADA DE BAJA',
  'MÁQUINA EN MUSEO'
] as const;

const PATRON_VALOR = /^\d+(\.\d{1,2})?$/;

@Component({
  selector: 'app-add-upd-del-equipo-ingeniero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-equipo-ingeniero.component.html',
  styleUrl: './add-upd-del-equipo-ingeniero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelEquipoIngenieroComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() equipoIngenieroData: EquiposIngenierosI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];
  @Input() sociedadesUnidadesCentralizadoras: SociedadesUnidadesCentralizadorasI[] = [];
  @Input() clasificacionesEquiposIngenieros: ClasificacionesEquiposIngenierosI[] = [];
  @Input() subclasificacionesEquiposIngenieros: SubclasificacionesEquiposIngenierosI[] = [];
  @Input() elementosSubclasificacionesEquiposIngenieros: ElementosSubclasificacionesEquiposIngenierosI[] = [];
  @Input() tiposAltasEquiposIngenieros: TiposAltasEquiposIngenierosI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<EquiposIngenierosI>();
  @Output() eliminar = new EventEmitter<number>();

  equiposIngenierosForm!: FormGroup;
  //OPCIONES DEL COMBO DE ESTADO: LAS DEL CATÁLOGO FIJO MÁS, SI EL REGISTRO TRAE UN ESTADO QUE NO ESTÁ EN ÉL, ESE ESTADO
  //(PARA QUE EL COMBO LO MUESTRE SELECCIONADO Y NO SE PIERDA AL MODIFICAR):
  estados: string[] = [...ESTADOS_USO_EQUIPOS_INGENIEROS];

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['equipoIngenieroData']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const registro = this.equipoIngenieroData;
    this.equiposIngenierosForm = this.formBuilder.group({
      idEquipoIngeniero: [registro?.idEquipoIngeniero ?? null],
      denominacionEquipoIngeniero: [registro?.denominacionEquipoIngeniero ?? '', Validators.required],
      numeroInventarioEquipoIngeniero: [registro?.numeroInventarioEquipoIngeniero ?? ''],
      numeroActivoFijoEquipoIngeniero: [registro?.numeroActivoFijoEquipoIngeniero ?? ''],
      estadoUsoEquipoIngeniero: [this.prepararEstado(registro?.estadoUsoEquipoIngeniero), Validators.required],
      tipoAltaEquipoIngenieroSeleccionado: [registro?.tipoAltaEquipoIngenieroDTO?.idTipoAltaEquipoIngeniero ?? '', Validators.required],
      //CLASIFICACIÓN → SUBCLASIFICACIÓN → ELEMENTO (COMBOS EN CASCADA):
      clasificacionEquipoIngenieroSeleccionada: [registro?.clasificacionEquipoIngenieroDTO?.idClasificacionEquipoIngeniero ?? '', Validators.required],
      subclasificacionEquipoIngenieroSeleccionada: [registro?.subclasificacionEquipoIngenieroDTO?.idSubclasificacionEquipoIngeniero ?? '', Validators.required],
      elementoSubclasificacionEquipoIngenieroSeleccionado: [registro?.elementoSubclasificacionEquipoIngenieroDTO?.idElementoSubclasificacionEquipoIngeniero ?? '', Validators.required],
      //CARACTERÍSTICAS:
      marcaEquipoIngeniero: [registro?.marcaEquipoIngeniero ?? '', Validators.required],
      modeloEquipoIngeniero: [registro?.modeloEquipoIngeniero ?? '', Validators.required],
      capacidadEquipoIngeniero: [registro?.capacidadEquipoIngeniero ?? '', Validators.required],
      empadronamientoEquipoIngeniero: [registro?.empadronamientoEquipoIngeniero ?? '', Validators.required],
      numeroPlacaEquipoIngeniero: [registro?.numeroPlacaEquipoIngeniero ?? ''],
      fechaHMSMatriculaEquipoIngeniero: [this.formatearFechaParaInput(registro?.fechaHMSMatriculaEquipoIngeniero)],
      //ASIGNACIÓN:
      unidadMilitarSeleccionada: [registro?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required],
      sociedadUnidadCentralizadoraSeleccionada: [registro?.sociedadUnidadCentralizadoraDTO?.idSociedadUnidadCentralizadora ?? '', Validators.required],
      centroCostoUnidadMilitarEquipoIngeniero: [registro?.centroCostoUnidadMilitarEquipoIngeniero ?? '', Validators.required],
      //DATOS CONTABLES:
      valorAdquisicionEquipoIngeniero: [registro?.valorAdquisicionEquipoIngeniero ?? '', Validators.pattern(PATRON_VALOR)],
      valorContableEquipoIngeniero: [registro?.valorContableEquipoIngeniero ?? '', Validators.pattern(PATRON_VALOR)],
      valorDepreciacionEquipoIngeniero: [registro?.valorDepreciacionEquipoIngeniero ?? '', Validators.pattern(PATRON_VALOR)],
      fechaHMSAltaEquipoIngeniero: [this.formatearFechaParaInput(registro?.fechaHMSAltaEquipoIngeniero), Validators.required],
      fechaHMSIngresoEquipoIngeniero: [{ value: this.formatearFechaParaInput(registro?.fechaHMSIngresoEquipoIngeniero) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR); AL CREAR AÚN NO EXISTE:
      fechaHMSModificacionEquipoIngeniero: [{ value: registro ? this.obtenerFechaHoraActual() : '', disabled: true }],
      observacionesEquipoIngeniero: [registro?.observacionesEquipoIngeniero ?? ''],
    });
    if (this.banderaCrudEliminar) {
      this.equiposIngenierosForm.disable();
    }
  }

  //SUBCLASIFICACIONES DE LA CLASIFICACIÓN ELEGIDA:
  get subclasificacionesFiltradas(): SubclasificacionesEquiposIngenierosI[] {
    const idClasificacion = Number(this.equiposIngenierosForm.get('clasificacionEquipoIngenieroSeleccionada')?.value);
    if (!idClasificacion) return [];
    return this.subclasificacionesEquiposIngenieros.filter(item => item.clasificacionEquipoIngenieroDTO?.idClasificacionEquipoIngeniero === idClasificacion);
  }

  //ELEMENTOS DE LA SUBCLASIFICACIÓN ELEGIDA:
  get elementosFiltrados(): ElementosSubclasificacionesEquiposIngenierosI[] {
    const idSubclasificacion = Number(this.equiposIngenierosForm.get('subclasificacionEquipoIngenieroSeleccionada')?.value);
    if (!idSubclasificacion) return [];
    return this.elementosSubclasificacionesEquiposIngenieros.filter(item => item.subclasificacionEquipoIngenieroDTO?.idSubclasificacionEquipoIngeniero === idSubclasificacion);
  }

  //ELEMENTO ELEGIDO: DE ÉL SE MUESTRAN (SOLO LECTURA) SU LÍNEA, CUENTA Y CLASE DE ACTIVO:
  get elementoSeleccionado(): ElementosSubclasificacionesEquiposIngenierosI | undefined {
    const idElemento = Number(this.equiposIngenierosForm.get('elementoSubclasificacionEquipoIngenieroSeleccionado')?.value);
    return this.elementosSubclasificacionesEquiposIngenieros.find(item => item.idElementoSubclasificacionEquipoIngeniero === idElemento);
  }

  //TEXTOS DE SOLO LECTURA DEL ELEMENTO ELEGIDO (LÍNEA, CUENTA Y CLASE DE ACTIVO):
  get textoLineaElemento(): string {
    return String(this.elementoSeleccionado?.lineaEquipoIngenieroDTO?.nombreLineaEquipoIngeniero ?? '');
  }

  get textoCuentaElemento(): string {
    const cuenta = this.elementoSeleccionado?.cuentaEquipoIngenieroDTO;
    return cuenta ? `${cuenta.numeroCuentaEquipoIngeniero} - ${cuenta.nombreCuentaEquipoIngeniero}` : '';
  }

  get textoClaseActivoElemento(): string {
    const claseActivo = this.elementoSeleccionado?.claseActivoEquipoIngenieroDTO;
    return claseActivo ? `${claseActivo.numeroClaseActivoEquipoIngeniero} - ${claseActivo.nombreClaseActivoEquipoIngeniero}` : '';
  }

  cambiarClasificacion(): void {
    this.equiposIngenierosForm.patchValue({ subclasificacionEquipoIngenieroSeleccionada: '', elementoSubclasificacionEquipoIngenieroSeleccionado: '' });
  }

  cambiarSubclasificacion(): void {
    this.equiposIngenierosForm.patchValue({ elementoSubclasificacionEquipoIngenieroSeleccionado: '' });
  }

  //AL EDITAR, EL <select> SOLO MARCA LA OPCIÓN SI EL VALOR COINCIDE EXACTAMENTE CON UNA DE ELLAS. EL ESTADO QUE LLEGA DEL
  //BACKEND PUEDE VENIR EN MINÚSCULAS, CON ESPACIOS O SIN TILDES, ASÍ QUE SE NORMALIZA Y SE DEVUELVE LA OPCIÓN EQUIVALENTE
  //DEL CATÁLOGO. SI NO EXISTE EN EL CATÁLOGO, SE AGREGA COMO OPCIÓN PARA QUE QUEDE SELECCIONADO TAL COMO ESTÁ GUARDADO:
  private prepararEstado(valor: unknown): string {
    this.estados = [...ESTADOS_USO_EQUIPOS_INGENIEROS];
    const estadoNormalizado = this.normalizarTexto(valor);
    if (!estadoNormalizado) return '';
    const estadoCatalogo = this.estados.find(estado => this.normalizarTexto(estado) === estadoNormalizado);
    if (estadoCatalogo) return estadoCatalogo;
    const estadoGuardado = String(valor).trim().toUpperCase();
    this.estados = [...this.estados, estadoGuardado];
    return estadoGuardado;
  }

  private normalizarTexto(valor: unknown): string {
    return String(valor ?? '').trim().replace(/\s+/g, ' ').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  //VERDADERO CUANDO EL CAMPO YA FUE TOCADO Y NO CUMPLE SU VALIDACIÓN (PARA MOSTRAR EL MENSAJE DE ERROR):
  campoInvalido(nombreCampo: string): boolean {
    const control = this.equiposIngenierosForm.get(nombreCampo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. NO SE USA
  //Date.toISOString() PORQUE DEVUELVE LA HORA EN UTC (5 HORAS ADELANTADA EN COLOMBIA) — MISMO PATRÓN QUE AddUpdDelCaninoComponent:
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
  //SOLO ENVÍA MINUTOS, ASÍ QUE SE LE AGREGAN LOS SEGUNDOS ANTES DE ENVIARLO:
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  private aMayusculas(valor: unknown): string {
    return String(valor ?? '').trim().toUpperCase();
  }

  guardarModificar(): void {
    if (this.equiposIngenierosForm.invalid) {
      this.equiposIngenierosForm.markAllAsTouched();
      return;
    }
    const v = this.equiposIngenierosForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(item => item.idUnidadMilitar === Number(v.unidadMilitarSeleccionada));
    const sociedadUnidadCentralizadora = this.sociedadesUnidadesCentralizadoras.find(item => item.idSociedadUnidadCentralizadora === Number(v.sociedadUnidadCentralizadoraSeleccionada));
    const clasificacion = this.clasificacionesEquiposIngenieros.find(item => item.idClasificacionEquipoIngeniero === Number(v.clasificacionEquipoIngenieroSeleccionada));
    const subclasificacion = this.subclasificacionesEquiposIngenieros.find(item => item.idSubclasificacionEquipoIngeniero === Number(v.subclasificacionEquipoIngenieroSeleccionada));
    const elemento = this.elementosSubclasificacionesEquiposIngenieros.find(item => item.idElementoSubclasificacionEquipoIngeniero === Number(v.elementoSubclasificacionEquipoIngenieroSeleccionado));
    const tipoAlta = this.tiposAltasEquiposIngenieros.find(item => item.idTipoAltaEquipoIngeniero === Number(v.tipoAltaEquipoIngenieroSeleccionado));
    if (!unidadMilitar || !sociedadUnidadCentralizadora || !clasificacion || !subclasificacion || !elemento || !tipoAlta) {
      this.equiposIngenierosForm.markAllAsTouched();
      return;
    }

    const equipoIngeniero: EquiposIngenierosI = {
      idEquipoIngeniero: v.idEquipoIngeniero ?? undefined,
      denominacionEquipoIngeniero: this.aMayusculas(v.denominacionEquipoIngeniero),
      numeroInventarioEquipoIngeniero: this.aMayusculas(v.numeroInventarioEquipoIngeniero),
      numeroActivoFijoEquipoIngeniero: this.aMayusculas(v.numeroActivoFijoEquipoIngeniero),
      centroCostoUnidadMilitarEquipoIngeniero: this.aMayusculas(v.centroCostoUnidadMilitarEquipoIngeniero),
      marcaEquipoIngeniero: this.aMayusculas(v.marcaEquipoIngeniero),
      modeloEquipoIngeniero: this.aMayusculas(v.modeloEquipoIngeniero),
      capacidadEquipoIngeniero: this.aMayusculas(v.capacidadEquipoIngeniero),
      empadronamientoEquipoIngeniero: this.aMayusculas(v.empadronamientoEquipoIngeniero),
      numeroPlacaEquipoIngeniero: this.aMayusculas(v.numeroPlacaEquipoIngeniero),
      fechaHMSMatriculaEquipoIngeniero: this.agregarSegundosParaBackend(v.fechaHMSMatriculaEquipoIngeniero),
      fechaHMSAltaEquipoIngeniero: this.agregarSegundosParaBackend(v.fechaHMSAltaEquipoIngeniero),
      valorAdquisicionEquipoIngeniero: v.valorAdquisicionEquipoIngeniero,
      valorContableEquipoIngeniero: v.valorContableEquipoIngeniero,
      valorDepreciacionEquipoIngeniero: v.valorDepreciacionEquipoIngeniero,
      observacionesEquipoIngeniero: this.aMayusculas(v.observacionesEquipoIngeniero),
      fechaHMSIngresoEquipoIngeniero: this.agregarSegundosParaBackend(v.fechaHMSIngresoEquipoIngeniero),
      fechaHMSModificacionEquipoIngeniero: this.agregarSegundosParaBackend(v.fechaHMSModificacionEquipoIngeniero),
      estadoUsoEquipoIngeniero: this.aMayusculas(v.estadoUsoEquipoIngeniero),
      unidadMilitarDTO: unidadMilitar,
      sociedadUnidadCentralizadoraDTO: sociedadUnidadCentralizadora,
      clasificacionEquipoIngenieroDTO: clasificacion,
      subclasificacionEquipoIngenieroDTO: subclasificacion,
      elementoSubclasificacionEquipoIngenieroDTO: elemento,
      tipoAltaEquipoIngenieroDTO: tipoAlta,
    };
    this.guardar.emit(equipoIngeniero);
  }

  confirmarEliminar(): void {
    const idEquipoIngeniero = this.equiposIngenierosForm.getRawValue().idEquipoIngeniero;
    if (idEquipoIngeniero) {
      this.eliminar.emit(Number(idEquipoIngeniero));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
