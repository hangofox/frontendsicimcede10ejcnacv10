import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialEquipTranspApoyAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-eq_tr-apoy-at-prev-em-des/historial-eq_tr-apoy-at-prev-em-des.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { EquiposIngenierosI } from '../../../../../../interfaces/equipos-ingenieros/equipos-ingenieros.interface';

@Component({
  selector: 'app-add-upd-del-hist-eq_tr-apoy-at-prev-em-des',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-eq_tr-apoy-at-prev-em-des.component.html',
  styleUrl: './add-upd-del-hist-eq_tr-apoy-at-prev-em-des.component.scss'
})
export class AddUpdDelHistEqTrApoyAtPrevEmDesComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialEquipTranspApoyAtencPrevEmergDesastI | null = null;
  //APOYO AL QUE PERTENECE EL EQUIPO DE TRANSPORTE (EL DEL MODAL DESDE EL QUE SE ABRIÓ EL HISTORIAL):
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;
  @Input() equiposIngenieros: EquiposIngenierosI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialEquipTranspApoyAtencPrevEmergDesastI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EL NÚMERO DE REGISTRO LO GENERA EL BACKEND AL CREAR ("HIST-EQUIP-TRANSP-APOY-ATENC-PREV-EMERG-DESAST-ID-FECHA"); LA CLASIFICACIÓN,
  //LA SUBCLASIFICACIÓN Y EL ELEMENTO SE TOMAN DEL EQUIPO DE INGENIEROS ELEGIDO, POR ESO SOLO SE MUESTRAN (BLOQUEADOS):
  form = this.fb.group({
    registro: [{ value: '', disabled: true }],
    equipoIngenieroSeleccionado: ['', Validators.required],
    clasificacion: [{ value: '', disabled: true }],
    subclasificacion: [{ value: '', disabled: true }],
    elemento: [{ value: '', disabled: true }],
    placa: ['', Validators.required],
    dias: [null as number | null, [Validators.required, Validators.min(0)]]
  });

  //EQUIPO DE INGENIEROS ELEGIDO EN EL COMBO; AL MODIFICAR, SI AÚN NO LLEGA EL CATÁLOGO, SE USA EL DEL REGISTRO:
  get equipoIngenieroSeleccionado(): EquiposIngenierosI | null {
    const idEquipoIngeniero = Number(this.form.getRawValue().equipoIngenieroSeleccionado);
    if (!idEquipoIngeniero) return null;
    return this.equiposIngenieros.find(equipo => equipo.idEquipoIngeniero === idEquipoIngeniero)
      ?? (this.data?.equipoIngenieroDTO?.idEquipoIngeniero === idEquipoIngeniero ? this.data.equipoIngenieroDTO : null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      const x = this.data;
      this.form.reset({
        registro: String(x?.numRegHistorialEquipTranspApoyAtencPrevEmergDesast ?? ''),
        equipoIngenieroSeleccionado: x?.equipoIngenieroDTO?.idEquipoIngeniero ? String(x.equipoIngenieroDTO.idEquipoIngeniero) : '',
        clasificacion: String(x?.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? ''),
        subclasificacion: String(x?.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero ?? ''),
        elemento: String(x?.elementoSubclasificacionEquipoIngenieroDTO?.nombreElementoSubclasificacionEquipoIngeniero ?? ''),
        placa: String(x?.numeroPlacaEquipoTransporte ?? ''),
        dias: x?.diasEmpleadosEquipoTransporte ?? null
      });
      if (this.modo === 'eliminar') {
        this.form.disable();
      } else {
        this.form.enable();
        this.form.controls.registro.disable();
        this.form.controls.clasificacion.disable();
        this.form.controls.subclasificacion.disable();
        this.form.controls.elemento.disable();
      }
    }
  }

  //AL ELEGIR EL EQUIPO SE MUESTRAN SU CLASIFICACIÓN, SUBCLASIFICACIÓN Y ELEMENTO, Y SE PRECARGA SU PLACA (SI LA TIENE; SI NO, SE
  //DEJA EL CAMPO PARA ESCRIBIRLA):
  onCambioEquipoIngeniero(): void {
    const equipo = this.equipoIngenieroSeleccionado;
    this.form.patchValue({
      clasificacion: String(equipo?.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? ''),
      subclasificacion: String(equipo?.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero ?? ''),
      elemento: String(equipo?.elementoSubclasificacionEquipoIngenieroDTO?.nombreElementoSubclasificacionEquipoIngeniero ?? ''),
      placa: String(equipo?.numeroPlacaEquipoIngeniero ?? '')
    });
  }

  enviar(): void {
    const equipo = this.equipoIngenieroSeleccionado;
    if (this.form.invalid || !equipo || !this.apoyoAtencPrevEmergDesast) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idHistorialEquipTranspApoyAtencPrevEmergDesast: this.data?.idHistorialEquipTranspApoyAtencPrevEmergDesast,
      //AL CREAR SE ENVÍA VACÍO (EL BACKEND LO REEMPLAZA POR EL GENERADO); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialEquipTranspApoyAtencPrevEmergDesast: this.data?.numRegHistorialEquipTranspApoyAtencPrevEmergDesast ?? '',
      apoyoAtencPrevEmergDesastDTO: this.apoyoAtencPrevEmergDesast,
      clasificacionEquipoIngenieroDTO: equipo.clasificacionEquipoIngenieroDTO,
      subclasificacionEquipoIngenieroDTO: equipo.subclasificacionEquipoIngenieroDTO,
      elementoSubclasificacionEquipoIngenieroDTO: equipo.elementoSubclasificacionEquipoIngenieroDTO,
      equipoIngenieroDTO: equipo,
      numeroPlacaEquipoTransporte: String(valores.placa || '').trim().toUpperCase(),
      diasEmpleadosEquipoTransporte: Number(valores.dias)
    });
  }

  confirmar(): void {
    if (this.data?.idHistorialEquipTranspApoyAtencPrevEmergDesast) this.eliminar.emit(this.data.idHistorialEquipTranspApoyAtencPrevEmergDesast);
  }
}
