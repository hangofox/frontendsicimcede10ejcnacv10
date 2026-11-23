import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EquiposIngenierosI } from '../../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { HistorialDemerDesgastEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/historial-demer-desgast-equip-ing.interface';

//VALORES NUMÉRICOS OPCIONALES (VALOR PRESUPUESTAL, HORAS Y KILÓMETROS): ENTEROS O CON HASTA DOS DECIMALES SEPARADOS POR PUNTO:
const PATRON_NUMERICO = /^\d+(\.\d{1,2})?$/;

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

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialDemerDesgastEquipIngI>();
  @Output() eliminar = new EventEmitter<number>();

  historialesDemeritosYDesgastesEquiposIngenierosForm!: FormGroup;

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
    this.historialesDemeritosYDesgastesEquiposIngenierosForm = this.formBuilder.group({
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

  private aTexto(valor: unknown): string {
    return String(valor ?? '').trim();
  }

  guardarModificar(): void {
    if (this.historialesDemeritosYDesgastesEquiposIngenierosForm.invalid) {
      this.historialesDemeritosYDesgastesEquiposIngenierosForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.historialesDemeritosYDesgastesEquiposIngenierosForm.getRawValue();
    this.guardar.emit({
      idHistorialDemeritoYDesgasteEquipoIngeniero: valoresFormulario.idHistorialDemeritoYDesgasteEquipoIngeniero ?? undefined,
      //AL CREAR VA VACÍO (EL BACKEND LO ASIGNA; NO SE ENVÍA null PORQUE EL BACKEND LE APLICA toUpperCase()); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialDemeritoYDesgasteEquipoIngeniero: this.historialDemeritoDesgasteData?.numRegHistorialDemeritoYDesgasteEquipoIngeniero ?? '',
      nombreProyectoHistorialDemeritoYDesgasteEquipoIngeniero: this.aTexto(valoresFormulario.nombreProyectoHistorialDemeritoYDesgasteEquipoIngeniero).toUpperCase(),
      valorPresupuestalProyectoHistorialDemeritoYDesgasteEquipoIngeniero: this.aTexto(valoresFormulario.valorPresupuestalProyectoHistorialDemeritoYDesgasteEquipoIngeniero),
      horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero: this.aTexto(valoresFormulario.horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero),
      kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero: this.aTexto(valoresFormulario.kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero),
      equipoIngenieroDTO: this.equipoIngeniero
    });
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
