import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EquiposIngenierosI } from '../../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { HistorialDemerDesgastEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/historial-demer-desgast-equip-ing.interface';

//VALORES NUMÉRICOS OPCIONALES (VALOR PRESUPUESTAL, HORAS Y KILÓMETROS): ENTEROS O CON HASTA DOS DECIMALES SEPARADOS POR PUNTO:
const PATRON_NUMERICO = /^\d+(\.\d{1,2})?$/;

//LO QUE EL FORMULARIO ENTREGA AL LISTADO: EL REGISTRO Y, SI SE ELIGIÓ, EL ARCHIVO NUEVO DEL DOCUMENTO ANEXO (EL LISTADO LO SUBE AL
//SERVIDOR DE ARCHIVOS ANTES DE GUARDAR EL REGISTRO — MISMO PATRÓN QUE AddUpdDelDocumentacionAnexaSolicMttoComponent):
export interface GuardadoHistorialDemeritoDesgasteEvent {
  historial: HistorialDemerDesgastEquipIngI;
  archivo: File | null;
  //true CUANDO AL MODIFICAR SE QUITÓ EL DOCUMENTO GUARDADO (EL LISTADO LO BORRA DEL SERVIDOR DE ARCHIVOS SI EL REGISTRO SE GUARDA BIEN):
  quitarArchivo: boolean;
}

@Component({
  selector: 'app-add-upd-del-hist-demer-desgast-equip-ing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-demer-desgast-equip-ing.component.html',
  styleUrl: './add-upd-del-hist-demer-desgast-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelHistDemerDesgastEquipIngComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() historialDemeritoDesgasteData: HistorialDemerDesgastEquipIngI | null = null;
  //EL DEMÉRITO Y DESGASTE SIEMPRE QUEDA ASOCIADO AL EQUIPO DESDE EL QUE SE ABRIÓ EL HISTORIAL (NO SE ELIGE EN EL FORMULARIO):
  @Input({ required: true }) equipoIngeniero!: EquiposIngenierosI;
  //EL LISTADO LO PONE EN true MIENTRAS SUBE EL ARCHIVO Y GUARDA EL REGISTRO:
  @Input() guardando = false;

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<GuardadoHistorialDemeritoDesgasteEvent>();
  @Output() eliminar = new EventEmitter<number>();

  //TIPO DE ARCHIVO PERMITIDO PARA EL DOCUMENTO ANEXO Y TAMAÑO MÁXIMO
  //(SOLO PDF, HASTA 2.0 MB; EL BACKEND ADMITE HASTA 5MB) — DEFINIDOS PARA ESTE FORMULARIO:
  static readonly EXTENSIONES_PERMITIDAS = ['pdf'];
  private static readonly TAMANO_MAXIMO_BYTES = 2 * 1024 * 1024;
  readonly extensionesPermitidas = AddUpdDelHistDemerDesgastEquipIngComponent.EXTENSIONES_PERMITIDAS;
  readonly acceptArchivos = AddUpdDelHistDemerDesgastEquipIngComponent.EXTENSIONES_PERMITIDAS.map(extension => '.' + extension).join(',');

  archivoSeleccionado: File | null = null;
  mensajeErrorArchivo = '';
  //AL MODIFICAR: true SI SE QUITÓ EL DOCUMENTO GUARDADO (SE BORRA AL GUARDAR) Y true MIENTRAS SE MUESTRA LA CONFIRMACIÓN — MISMO PATRÓN
  //QUE "QUITAR FIRMA" DE AddUpdDelIntegApoyObrRedMitigComponent:
  archivoEliminado = false;
  confirmandoQuitarArchivo = false;

  historialesDemeritosYDesgastesEquiposIngenierosForm!: FormGroup;

  //NOMBRE DEL ARCHIVO YA GUARDADO EN EL REGISTRO (VACÍO AL CREAR O SI NO TIENE). EL ARCHIVO ES OPCIONAL (LA COLUMNA ES NULL):
  get nombreArchivoActual(): string {
    return String(this.historialDemeritoDesgasteData?.nombreArchivoDocumentoAnexoHistDemerDesgastEquipIng ?? '').trim();
  }

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['historialDemeritoDesgasteData'] || changes['equipoIngeniero']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const registro = this.historialDemeritoDesgasteData;
    this.archivoSeleccionado = null;
    this.mensajeErrorArchivo = '';
    this.archivoEliminado = false;
    this.confirmandoQuitarArchivo = false;
    this.historialesDemeritosYDesgastesEquiposIngenierosForm =this.formBuilder.group({
      idHistorialDemeritoYDesgasteEquipoIngeniero: [registro?.idHistorialDemeritoYDesgasteEquipoIngeniero ?? null],
      //EL N.° DE REGISTRO LO GENERA EL BACKEND AL CREAR (HIST-DEMER-DESGAST-EQUIP-ING-{ID}-{FECHA}); AQUÍ SOLO SE MUESTRA, NUNCA SE
      //DIGITA NI SE EDITA (MISMO PATRÓN QUE AddUpdDelHistDiagnInicSeleccEquipIngComponent):
      numRegHistorialDemeritoYDesgasteEquipoIngeniero: [{ value: registro?.numRegHistorialDemeritoYDesgasteEquipoIngeniero ?? '', disabled: true }],
      nombreProyectoHistorialDemeritoYDesgasteEquipoIngeniero: [registro?.nombreProyectoHistorialDemeritoYDesgasteEquipoIngeniero ?? '', Validators.required],
      valorPresupuestalProyectoHistorialDemeritoYDesgasteEquipoIngeniero: [registro?.valorPresupuestalProyectoHistorialDemeritoYDesgasteEquipoIngeniero ?? '', Validators.pattern(PATRON_NUMERICO)],
      horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero: [registro?.horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero ?? '', Validators.pattern(PATRON_NUMERICO)],
      kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero: [registro?.kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero ?? '', Validators.pattern(PATRON_NUMERICO)]
    });
    if (this.banderaCrudEliminar) {
      this.historialesDemeritosYDesgastesEquiposIngenierosForm.disable();
    }
  }

  //VERDADERO CUANDO EL CAMPO YA FUE TOCADO Y NO CUMPLE SU VALIDACIÓN (PARA MOSTRAR EL MENSAJE DE ERROR):
  campoInvalido(nombreCampo: string): boolean {
    const control = this.historialesDemeritosYDesgastesEquiposIngenierosForm.get(nombreCampo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  //VALIDA EL ARCHIVO ELEGIDO (EXTENSIÓN Y TAMAÑO), IGUAL QUE LA DOCUMENTACIÓN ANEXA DE SOLICITUDES:
  onSeleccionarArchivo(event: Event): void {
    this.mensajeErrorArchivo = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    if (file.size > AddUpdDelHistDemerDesgastEquipIngComponent.TAMANO_MAXIMO_BYTES) {
      this.mensajeErrorArchivo = 'El archivo excede el tamaño máximo permitido de 2.0 MB.';
      return;
    }
    if (!AddUpdDelHistDemerDesgastEquipIngComponent.EXTENSIONES_PERMITIDAS.includes(extension)) {
      this.mensajeErrorArchivo = `El archivo debe tener una extensión válida (${AddUpdDelHistDemerDesgastEquipIngComponent.EXTENSIONES_PERMITIDAS.join(', ')}).`;
      return;
    }
    this.archivoSeleccionado = file;
  }

  onQuitarArchivoSeleccionado(): void {
    this.archivoSeleccionado = null;
    this.mensajeErrorArchivo = '';
  }

  //QUITAR EL DOCUMENTO YA GUARDADO: SE PIDE CONFIRMACIÓN Y SOLO SE MARCA; EL ARCHIVO SE BORRA DEL SERVIDOR AL GUARDAR:
  confirmarQuitarArchivo(): void { this.confirmandoQuitarArchivo = true; }
  noQuitarArchivo(): void { this.confirmandoQuitarArchivo = false; }
  siQuitarArchivo(): void {
    this.confirmandoQuitarArchivo = false;
    this.archivoEliminado = true;
  }

  private aTexto(valor: unknown): string {
    return String(valor ?? '').trim();
  }

  guardarModificar(): void {
    if (this.historialesDemeritosYDesgastesEquiposIngenierosForm.invalid) {
      this.historialesDemeritosYDesgastesEquiposIngenierosForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.historialesDemeritosYDesgastesEquiposIngenierosForm.getRawValue();
    this.guardar.emit({ historial: {
      idHistorialDemeritoYDesgasteEquipoIngeniero: valoresFormulario.idHistorialDemeritoYDesgasteEquipoIngeniero ?? undefined,
      //AL CREAR VA VACÍO (EL BACKEND LO ASIGNA; NO SE ENVÍA null PORQUE EL BACKEND LE APLICA toUpperCase()); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialDemeritoYDesgasteEquipoIngeniero: this.historialDemeritoDesgasteData?.numRegHistorialDemeritoYDesgasteEquipoIngeniero ?? '',
      nombreProyectoHistorialDemeritoYDesgasteEquipoIngeniero: this.aTexto(valoresFormulario.nombreProyectoHistorialDemeritoYDesgasteEquipoIngeniero).toUpperCase(),
      valorPresupuestalProyectoHistorialDemeritoYDesgasteEquipoIngeniero: this.aTexto(valoresFormulario.valorPresupuestalProyectoHistorialDemeritoYDesgasteEquipoIngeniero),
      horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero: this.aTexto(valoresFormulario.horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero),
      kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero: this.aTexto(valoresFormulario.kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero),
      //EL LISTADO LO REEMPLAZA POR EL NOMBRE DEL ARCHIVO SUBIDO CUANDO SE ELIGE UNO NUEVO:
      //SI SE QUITÓ EL DOCUMENTO GUARDADO, EL REGISTRO QUEDA SIN ARCHIVO:
      nombreArchivoDocumentoAnexoHistDemerDesgastEquipIng: (this.archivoEliminado ? '' : this.nombreArchivoActual) || null,
      equipoIngenieroDTO: this.equipoIngeniero
    }, archivo: this.archivoSeleccionado, quitarArchivo: this.archivoEliminado && !!this.nombreArchivoActual });
  }

  confirmarEliminar(): void {
    const idHistorial = this.historialesDemeritosYDesgastesEquiposIngenierosForm.getRawValue().idHistorialDemeritoYDesgasteEquipoIngeniero;
    if (idHistorial) {
      this.eliminar.emit(Number(idHistorial));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
