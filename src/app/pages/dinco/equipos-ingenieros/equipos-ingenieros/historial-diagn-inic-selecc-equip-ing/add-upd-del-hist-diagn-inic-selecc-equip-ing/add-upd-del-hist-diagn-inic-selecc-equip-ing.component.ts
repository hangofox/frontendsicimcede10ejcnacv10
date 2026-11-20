import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EquiposIngenierosI } from '../../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { EstadosDiagnosticosEquiposIngenierosI } from '../../../../../../interfaces/dinco/estados-diagnosticos-equipos-ingenieros/estados-diagnosticos-equipos-ingenieros.interface';
import { UnidadesMilitaresRealizadorasMantenimientosI } from '../../../../../../interfaces/panel-control/unidades-militares-realiz-mttos/unidades-militares-realiz-mttos.interface';
import { HistorialDiagnInicSeleccEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-diagn-inic-selecc-equip-ing/historial-diagn-inic-selecc-equip-ing.interface';

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

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialDiagnInicSeleccEquipIngI>();
  @Output() eliminar = new EventEmitter<number>();

  historialesDiagnosticosInicialesSeleccMttoEquipIngForm!: FormGroup;

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
    this.historialesDiagnosticosInicialesSeleccMttoEquipIngForm = this.formBuilder.group({
      idHistorialDiagnosticoInicialSeleccMttoEquipIng: [registro?.idHistorialDiagnosticoInicialSeleccMttoEquipIng ?? null],
      //EL N.° DE REGISTRO LO GENERA EL BACKEND AL CREAR (HIST-DIAG-INIC-SELECC-MTTO-EQUIP-ING-{ID}-{FECHA}); AQUÍ SOLO SE MUESTRA, NUNCA SE
      //DIGITA NI SE EDITA (MISMO PATRÓN QUE AddUpdDelHistMaqPesadApoyAtPrevDesComponent):
      numRegHistorialDiagnosticoInicialSeleccMttoEquipIng: [{ value: registro?.numRegHistorialDiagnosticoInicialSeleccMttoEquipIng ?? '', disabled: true }],
      //EL COMBO GUARDA EL ID DE LA REALIZADORA (CATÁLOGO TABLA_UNIDADES_MILITARES_REALIZADORAS_MANTENIMIENTOS), QUE ES LO QUE GUARDA LA TABLA:
      idUnidadMilitarRealizadoraMantenimiento: [registro?.unidadMilitarRealizadoraMantenimientoDTO?.idUnidadMilitarRealizadoraMantenimiento ?? '', Validators.required],
      idEstadoDiagnosticoEquipoIngeniero: [registro?.estadoDiagnosticoEquipoIngenieroDTO?.idEstadoDiagnosticoEquipoIngeniero ?? '', Validators.required],
      descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng: [registro?.descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng ?? ''],
      nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng: [registro?.nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng ?? '']
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
    this.guardar.emit({
      idHistorialDiagnosticoInicialSeleccMttoEquipIng: valoresFormulario.idHistorialDiagnosticoInicialSeleccMttoEquipIng ?? undefined,
      //AL CREAR VA VACÍO (EL BACKEND LO ASIGNA; NO SE ENVÍA null PORQUE EL BACKEND LE APLICA toUpperCase()); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialDiagnosticoInicialSeleccMttoEquipIng: this.historialDiagnosticoData?.numRegHistorialDiagnosticoInicialSeleccMttoEquipIng ?? '',
      descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng: this.aMayusculas(valoresFormulario.descripcionObjetivoHistorialDiagnosticoInicialSeleccMttoEquipIng),
      nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng: String(valoresFormulario.nombreArchivoDocumentoAnexoHistDiagInicSeleccMttoEquipIng ?? '').trim(),
      unidadMilitarDTO: unidadRealizadora.unidadMilitarDTO,
      unidadMilitarRealizadoraMantenimientoDTO: unidadRealizadora,
      equipoIngenieroDTO: this.equipoIngeniero,
      estadoDiagnosticoEquipoIngenieroDTO: estadoDiagnostico
    });
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
