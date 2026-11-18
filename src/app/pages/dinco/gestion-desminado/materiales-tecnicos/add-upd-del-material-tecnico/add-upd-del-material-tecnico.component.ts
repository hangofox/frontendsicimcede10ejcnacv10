import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MaterialesTecnicosI } from '../../../../../interfaces/dinco/gestion-desminado/materiales-tecnicos/materiales-tecnicos.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposDespejesMilitaresArtefactosExplosivosI } from '../../../../../interfaces/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';

//ESTADOS DE USO QUE PUEDE TENER UN MATERIAL TÉCNICO. MISMO PATRÓN QUE ESTADOS_SOLICITUDES_INFRAESTRUCTURAS_AVALADAS (UpdSolicConstNuevAvaladaComponent):
export const ESTADOS_USO_MATERIALES_TECNICOS = ['BUENO', 'REGULAR', 'MALO', 'MANTENIMIENTO', 'FUERA DE SERVICIO', 'DADO DE BAJA'] as const;

@Component({
  selector: 'app-add-upd-del-material-tecnico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-material-tecnico.component.html',
  styleUrl: './add-upd-del-material-tecnico.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelMaterialTecnicoComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() materialTecnicoData: MaterialesTecnicosI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];
  @Input() tiposDespejesMilitaresArtefactosExplosivos: TiposDespejesMilitaresArtefactosExplosivosI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<MaterialesTecnicosI>();
  @Output() eliminar = new EventEmitter<number>();

  materialesTecnicosForm!: FormGroup;
  //OPCIONES DEL COMBO DE ESTADO: LAS DEL CATÁLOGO FIJO MÁS, SI EL REGISTRO TRAE UN ESTADO QUE NO ESTÁ EN ÉL, ESE ESTADO
  //(PARA QUE EL COMBO LO MUESTRE SELECCIONADO Y NO SE PIERDA AL MODIFICAR):
  estados: string[] = [...ESTADOS_USO_MATERIALES_TECNICOS];

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
    if (changes['modo'] || changes['materialTecnicoData']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const registro = this.materialTecnicoData;
    this.materialesTecnicosForm = this.formBuilder.group({
      idMaterialTecnico: [registro?.idMaterialTecnico ?? null],
      nombreMaterialTecnico: [registro?.nombreMaterialTecnico ?? '', Validators.required],
      serialMaterialTecnico: [registro?.serialMaterialTecnico ?? '', Validators.required],
      numeroInventarioMaterialTecnico: [registro?.numeroInventarioMaterialTecnico ?? '', Validators.required],
      numeroActivoFijoMaterialTecnico: [registro?.numeroActivoFijoMaterialTecnico ?? '', Validators.required],
      estadoUsoMaterialTecnico: [this.prepararEstado(registro?.estadoUsoMaterialTecnico), Validators.required],
      unidadMilitarSeleccionada: [registro?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required],
      tipoDespejeMilitarArtefactoExplosivoSeleccionado: [registro?.tipoDespejeMilitarArtefactoExplosivoDTO?.idTipoDespejeMilitarArtefactoExplosivo ?? '', Validators.required],
      centroCostoUnidadMilitar: [registro?.centroCostoUnidadMilitar ?? '', Validators.required],
      codigoContableMaterialTecnico: [registro?.codigoContableMaterialTecnico ?? ''],
      valorAdquisicionMaterialTecnico: [registro?.valorAdquisicionMaterialTecnico ?? '', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      valorContableMaterialTecnico: [registro?.valorContableMaterialTecnico ?? '', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      valorCostoUnitarioMaterialTecnico: [registro?.valorCostoUnitarioMaterialTecnico ?? '', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      tiempoAnualVidaUtilMaterialTecnico: [registro?.tiempoAnualVidaUtilMaterialTecnico ?? ''],
      fechaHMSAltaMaterialTecnico: [this.formatearFechaParaInput(registro?.fechaHMSAltaMaterialTecnico)],
      fechaHMSIngresoMaterialTecnico: [{ value: this.formatearFechaParaInput(registro?.fechaHMSIngresoMaterialTecnico) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR); AL CREAR AÚN NO EXISTE:
      fechaHMSModificacionMaterialTecnico: [{ value: registro ? this.obtenerFechaHoraActual() : '', disabled: true }],
    });
    if (this.banderaCrudEliminar) {
      this.materialesTecnicosForm.disable();
    }
  }

  //AL EDITAR, EL <select> SOLO MARCA LA OPCIÓN SI EL VALOR COINCIDE EXACTAMENTE CON UNA DE ELLAS. EL ESTADO QUE LLEGA DEL
  //BACKEND PUEDE VENIR EN MINÚSCULAS, CON ESPACIOS O SIN TILDES, ASÍ QUE SE NORMALIZA (MAYÚSCULAS, SIN TILDES NI ESPACIOS
  //SOBRANTES) Y SE DEVUELVE LA OPCIÓN EQUIVALENTE DEL CATÁLOGO. SI EL ESTADO NO EXISTE EN EL CATÁLOGO, SE AGREGA COMO OPCIÓN
  //PARA QUE QUEDE SELECCIONADO TAL COMO ESTÁ GUARDADO:
  private prepararEstado(valor: unknown): string {
    this.estados = [...ESTADOS_USO_MATERIALES_TECNICOS];
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
    const control = this.materialesTecnicosForm.get(nombreCampo);
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
    if (this.materialesTecnicosForm.invalid) {
      this.materialesTecnicosForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.materialesTecnicosForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(item => item.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));
    const tipoDespejeMilitarArtefactoExplosivo = this.tiposDespejesMilitaresArtefactosExplosivos.find(item => item.idTipoDespejeMilitarArtefactoExplosivo === Number(valoresFormulario.tipoDespejeMilitarArtefactoExplosivoSeleccionado));

    const materialTecnico: MaterialesTecnicosI = {
      idMaterialTecnico: valoresFormulario.idMaterialTecnico ?? undefined,
      nombreMaterialTecnico: this.aMayusculas(valoresFormulario.nombreMaterialTecnico),
      serialMaterialTecnico: this.aMayusculas(valoresFormulario.serialMaterialTecnico),
      numeroInventarioMaterialTecnico: this.aMayusculas(valoresFormulario.numeroInventarioMaterialTecnico),
      numeroActivoFijoMaterialTecnico: this.aMayusculas(valoresFormulario.numeroActivoFijoMaterialTecnico),
      estadoUsoMaterialTecnico: this.aMayusculas(valoresFormulario.estadoUsoMaterialTecnico),
      centroCostoUnidadMilitar: this.aMayusculas(valoresFormulario.centroCostoUnidadMilitar),
      codigoContableMaterialTecnico: this.aMayusculas(valoresFormulario.codigoContableMaterialTecnico),
      valorAdquisicionMaterialTecnico: valoresFormulario.valorAdquisicionMaterialTecnico,
      valorContableMaterialTecnico: valoresFormulario.valorContableMaterialTecnico,
      valorCostoUnitarioMaterialTecnico: valoresFormulario.valorCostoUnitarioMaterialTecnico,
      tiempoAnualVidaUtilMaterialTecnico: this.aMayusculas(valoresFormulario.tiempoAnualVidaUtilMaterialTecnico),
      fechaHMSAltaMaterialTecnico: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSAltaMaterialTecnico),
      fechaHMSIngresoMaterialTecnico: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoMaterialTecnico),
      fechaHMSModificacionMaterialTecnico: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionMaterialTecnico),
      unidadMilitarDTO: unidadMilitar ?? this.unidadesMilitares[0],
      tipoDespejeMilitarArtefactoExplosivoDTO: tipoDespejeMilitarArtefactoExplosivo ?? this.tiposDespejesMilitaresArtefactosExplosivos[0],
    };
    this.guardar.emit(materialTecnico);
  }

  confirmarEliminar(): void {
    const idMaterialTecnico = this.materialesTecnicosForm.getRawValue().idMaterialTecnico;
    if (idMaterialTecnico) {
      this.eliminar.emit(Number(idMaterialTecnico));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
