import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EquiposIngenierosI } from '../../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { EstadosDiagnosticosEquiposIngenierosI } from '../../../../../../interfaces/dinco/estados-diagnosticos-equipos-ingenieros/estados-diagnosticos-equipos-ingenieros.interface';
import { UnidadesMilitaresRealizadorasMantenimientosI } from '../../../../../../interfaces/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.interface';
import { HistorialDiagnInicSeleccEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/historial-diagn-inic-selecc-equip-ing.interface';

//LO QUE EL FORMULARIO ENTREGA AL LISTADO: EL REGISTRO, EL ARCHIVO NUEVO DEL DOCUMENTO ANEXO (SI SE ELIGIÓ) Y SI SE QUITÓ EL GUARDADO (EL
//LISTADO SUBE / BORRA EL ARCHIVO Y GUARDA EL REGISTRO — MISMO PATRÓN QUE GuardadoHistorialDemeritoDesgasteEvent):
export interface GuardadoHistorialDiagnosticoEvent {
  historial: HistorialDiagnInicSeleccEquipIngI;
  archivo: File | null;
  quitarArchivo: boolean;
}

@Component({
  selector: 'app-add-upd-del-hist-diagn-inic-selecc-equip-ing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-diagn-inic-selecc-equip-ing.component.html',
  styleUrl: './add-upd-del-hist-diagn-inic-selecc-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelHistDiagnInicSeleccEquipIngComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() historialDiagnosticoData: HistorialDiagnInicSeleccEquipIngI | null = null;
  //EL DIAGNÓSTICO SIEMPRE QUEDA ASOCIADO AL EQUIPO DESDE EL QUE SE ABRIÓ EL HISTORIAL (NO SE ELIGE EN EL FORMULARIO):
  @Input({ required: true }) equipoIngeniero!: EquiposIngenierosI;
  //CATÁLOGO DE UNIDADES MILITARES REALIZADORAS DE MANTENIMIENTOS: SOLO ESTAS SE PUEDEN ELEGIR COMO UNIDAD REALIZADORA:
  @Input() unidadesMilitaresRealizadorasMantenimientos: UnidadesMilitaresRealizadorasMantenimientosI[] = [];
  @Input() estadosDiagnosticosEquiposIngenieros: EstadosDiagnosticosEquiposIngenierosI[] = [];

  //EL LISTADO LO PONE EN true MIENTRAS SUBE EL ARCHIVO Y GUARDA EL REGISTRO:
  @Input() guardando = false;

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<GuardadoHistorialDiagnosticoEvent>();
  @Output() eliminar = new EventEmitter<number>();

  //TIPO DE ARCHIVO PERMITIDO PARA EL DOCUMENTO ANEXO Y TAMAÑO MÁXIMO (SOLO PDF, HASTA 2.0 MB; EL BACKEND ADMITE HASTA 5MB) — MISMOS VALORES
  //QUE LOS DOCUMENTOS ANEXOS DE MANTENIMIENTOS Y DE DEMÉRITOS Y DESGASTES:
  static readonly EXTENSIONES_PERMITIDAS = ['pdf'];
  private static readonly TAMANO_MAXIMO_BYTES = 2 * 1024 * 1024;
  readonly extensionesPermitidas = AddUpdDelHistDiagnInicSeleccEquipIngComponent.EXTENSIONES_PERMITIDAS;
  readonly acceptArchivos = AddUpdDelHistDiagnInicSeleccEquipIngComponent.EXTENSIONES_PERMITIDAS.map(extension => '.' + extension).join(',');

  archivoSeleccionado: File | null = null;
  mensajeErrorArchivo = '';
  //AL MODIFICAR: true SI SE QUITÓ EL DOCUMENTO GUARDADO (SE BORRA AL GUARDAR) Y true MIENTRAS SE MUESTRA LA CONFIRMACIÓN — MISMO PATRÓN
  //QUE "QUITAR FIRMA" DE AddUpdDelIntegApoyObrRedMitigComponent:
  archivoEliminado = false;
  confirmandoQuitarArchivo = false;

  historialesDiagnosticosInicialesSeleccMttoEquipIngForm!: FormGroup;

  //NOMBRE DEL ARCHIVO YA GUARDADO EN EL REGISTRO (VACÍO AL CREAR O SI NO TIENE). EL ARCHIVO ES OPCIONAL (LA COLUMNA ES CLOB NULL):
  get nombreArchivoActual(): string {
    return String(this.historialDiagnosticoData?.nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng ?? '').trim();
  }

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['historialDiagnosticoData'] || changes['equipoIngeniero']) {
      this.initForm();
    }
  }

  //LOS COMBOS GUARDAN EL ID; AL CREAR, LA UNIDAD MILITAR ARRANCA CON LA UNIDAD DEL EQUIPO:
  private initForm(): void {
    const registro = this.historialDiagnosticoData;
    this.archivoSeleccionado = null;
    this.mensajeErrorArchivo = '';
    this.archivoEliminado = false;
    this.confirmandoQuitarArchivo = false;
    this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm = this.formBuilder.group({
      idHistorialDiagnosticoInicialSeleccMttoEquipIng: [registro?.idHistorialDiagnosticoInicialSeleccMttoEquipIng ?? null],
      //EL N.° DE REGISTRO LO GENERA EL BACKEND AL CREAR (HIST-DIAG-INIC-SELECC-MTTO-EQUIP-ING-{ID}-{FECHA}); AQUÍ SOLO SE MUESTRA, NUNCA SE
      //DIGITA NI SE EDITA (MISMO PATRÓN QUE AddUpdDelHistMaqPesadApoyAtPrevDesComponent):
      numRegHistorialDiagnosticoInicialSeleccMttoEquipIng: [{ value: registro?.numRegHistorialDiagnosticoInicialSeleccMttoEquipIng ?? '', disabled: true }],
      //EL COMBO GUARDA EL ID DE LA REALIZADORA (CATÁLOGO TABLA_UNIDADES_MILITARES_REALIZADORAS_MANTENIMIENTOS), QUE ES LO QUE GUARDA LA TABLA:
      idUnidadMilitarRealizadoraMantenimiento: [registro?.unidadMilitarRealizadoraMantenimientoDTO?.idUnidadMilitarRealizadoraMantenimiento ?? '', Validators.required],
      idEstadoDiagnosticoEquipoIngeniero: [registro?.estadoDiagnosticoEquipoIngenieroDTO?.idEstadoDiagnosticoEquipoIngeniero ?? '', Validators.required],
      //EL ARCHIVO DEL DOCUMENTO ANEXO SE ELIGE CON EL BOTÓN DE ARCHIVO (NO ES UN CAMPO DEL FORMULARIO):
      descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng: [registro?.descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng ?? '']
    });
    if (this.banderaCrudEliminar) {
      this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm.disable();
    }
  }

  //VERDADERO CUANDO EL CAMPO YA FUE TOCADO Y NO CUMPLE SU VALIDACIÓN (PARA MOSTRAR EL MENSAJE DE ERROR):
  campoInvalido(nombreCampo: string): boolean {
    const control = this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm.get(nombreCampo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  //VALIDA EL ARCHIVO ELEGIDO (EXTENSIÓN Y TAMAÑO), IGUAL QUE LOS DOCUMENTOS ANEXOS DE DEMÉRITOS Y DESGASTES:
  onSeleccionarArchivo(event: Event): void {
    this.mensajeErrorArchivo = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    if (file.size > AddUpdDelHistDiagnInicSeleccEquipIngComponent.TAMANO_MAXIMO_BYTES) {
      this.mensajeErrorArchivo = 'El archivo excede el tamaño máximo permitido de 2.0 MB.';
      return;
    }
    if (!AddUpdDelHistDiagnInicSeleccEquipIngComponent.EXTENSIONES_PERMITIDAS.includes(extension)) {
      this.mensajeErrorArchivo = `El archivo debe tener una extensión válida (${AddUpdDelHistDiagnInicSeleccEquipIngComponent.EXTENSIONES_PERMITIDAS.join(', ')}).`;
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

  private aMayusculas(valor: unknown): string {
    return String(valor ?? '').trim().toUpperCase();
  }

  guardarModificar(): void {
    if (this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm.invalid) {
      this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm.getRawValue();
    //LA REALIZADORA ELEGIDA VA EN ID_UNIDAD_MILITAR_REALIZADORA_MANTENIMIENTO, Y DE SU RELACIÓN unidadMilitarDTO SE OBTIENE EL
    //idUnidadMilitar QUE VA EN ID_UNIDAD_MILITAR (AMBAS SON OBLIGATORIAS EN LA TABLA):
    const unidadRealizadora = this.unidadesMilitaresRealizadorasMantenimientos.find(item =>
      Number(item.idUnidadMilitarRealizadoraMantenimiento) === Number(valoresFormulario.idUnidadMilitarRealizadoraMantenimiento));
    const estadoDiagnostico = this.estadosDiagnosticosEquiposIngenieros.find(estado =>
      Number(estado.idEstadoDiagnosticoEquipoIngeniero) === Number(valoresFormulario.idEstadoDiagnosticoEquipoIngeniero));
    if (!unidadRealizadora?.unidadMilitarDTO || !estadoDiagnostico) {
      this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm.markAllAsTouched();
      return;
    }
    this.guardar.emit({ historial: {
      idHistorialDiagnosticoInicialSeleccMttoEquipIng: valoresFormulario.idHistorialDiagnosticoInicialSeleccMttoEquipIng ?? undefined,
      //AL CREAR VA VACÍO (EL BACKEND LO ASIGNA; NO SE ENVÍA null PORQUE EL BACKEND LE APLICA toUpperCase()); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialDiagnosticoInicialSeleccMttoEquipIng: this.historialDiagnosticoData?.numRegHistorialDiagnosticoInicialSeleccMttoEquipIng ?? '',
      descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng: this.aMayusculas(valoresFormulario.descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng),
      //SE CONSERVA EL QUE YA TIENE, QUEDA SIN ARCHIVO SI SE QUITÓ, O EL LISTADO LO REEMPLAZA POR EL NOMBRE DEL ARCHIVO SUBIDO:
      nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng: (this.archivoEliminado ? '' : this.nombreArchivoActual) || null,
      unidadMilitarDTO: unidadRealizadora.unidadMilitarDTO,
      unidadMilitarRealizadoraMantenimientoDTO: unidadRealizadora,
      equipoIngenieroDTO: this.equipoIngeniero,
      estadoDiagnosticoEquipoIngenieroDTO: estadoDiagnostico
    }, archivo: this.archivoSeleccionado, quitarArchivo: this.archivoEliminado && !!this.nombreArchivoActual });
  }

  confirmarEliminar(): void {
    const idHistorial = this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm.getRawValue().idHistorialDiagnosticoInicialSeleccMttoEquipIng;
    if (idHistorial) {
      this.eliminar.emit(Number(idHistorial));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
