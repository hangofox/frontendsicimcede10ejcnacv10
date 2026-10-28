import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialTipoPersonalApoyAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-tip-pers-apoy-atenc-prev-des/historial-tip-pers-apoy-atenc-prev-des.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { TiposPersonalApoyosI } from '../../../../../../interfaces/digei/gestion-riesgo/tipos-personal-apoyos/tipos-personal-apoyos.interface';

@Component({
  selector: 'app-add-upd-del-hist-tip-pers-apoy-atenc-prev-des',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-tip-pers-apoy-at-prev-des.component.html',
  styleUrl: './add-upd-del-hist-tip-pers-apoy-at-prev-des.component.scss'
})
export class AddUpdDelHistTipPersApoyAtencPrevDesComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialTipoPersonalApoyAtencPrevEmergDesastI | null = null;
  //APOYO AL QUE PERTENECE EL TIPO DE PERSONAL (EL DEL MODAL DESDE EL QUE SE ABRIÓ EL HISTORIAL):
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;
  @Input() tiposPersonalApoyos: TiposPersonalApoyosI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialTipoPersonalApoyAtencPrevEmergDesastI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EL NÚMERO DE REGISTRO LO GENERA EL BACKEND AL CREAR ("HIST-TIP-PERS-APOY-ATENC-PREV-EMERG-DESAST-ID-FECHA"), POR ESO SOLO SE
  //MUESTRA (BLOQUEADO); LA CANTIDAD DE PERSONAL Y LOS DÍAS EMPLEADOS SON OBLIGATORIOS EN LA TABLA (NOT NULL):
  form = this.fb.group({
    registro: [{ value: '', disabled: true }],
    tipoPersonalApoyoSeleccionado: ['', Validators.required],
    cantidad: [null as number | null, [Validators.required, Validators.min(1)]],
    dias: [null as number | null, [Validators.required, Validators.min(0)]]
  });

  //TIPO DE PERSONAL ELEGIDO EN EL COMBO; AL MODIFICAR, SI AÚN NO LLEGA EL CATÁLOGO, SE USA EL DEL REGISTRO:
  get tipoPersonalApoyoSeleccionado(): TiposPersonalApoyosI | null {
    const idTipoPersonalApoyo = Number(this.form.getRawValue().tipoPersonalApoyoSeleccionado);
    if (!idTipoPersonalApoyo) return null;
    return this.tiposPersonalApoyos.find(tipo => tipo.idTipoPersonalApoyo === idTipoPersonalApoyo)
      ?? (this.data?.tipoPersonalApoyoDTO?.idTipoPersonalApoyo === idTipoPersonalApoyo ? this.data.tipoPersonalApoyoDTO : null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      const x = this.data;
      this.form.reset({
        registro: String(x?.numRegHistorialTipoPersonalApoyAtencPrevEmergDesast ?? ''),
        tipoPersonalApoyoSeleccionado: x?.tipoPersonalApoyoDTO?.idTipoPersonalApoyo ? String(x.tipoPersonalApoyoDTO.idTipoPersonalApoyo) : '',
        cantidad: x?.cantidadPersonalApoyo ?? null,
        dias: x?.diasEmpleadosTipoPersonalApoyAtencPrevEmergDesast ?? null
      });
      if (this.modo === 'eliminar') {
        this.form.disable();
      } else {
        this.form.enable();
        this.form.controls.registro.disable();
      }
    }
  }

  enviar(): void {
    const tipoPersonalApoyo = this.tipoPersonalApoyoSeleccionado;
    if (this.form.invalid || !tipoPersonalApoyo || !this.apoyoAtencPrevEmergDesast) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idHistorialTipoPersonalApoyAtencPrevEmergDesast: this.data?.idHistorialTipoPersonalApoyAtencPrevEmergDesast,
      //AL CREAR SE ENVÍA VACÍO (EL BACKEND LO REEMPLAZA POR EL GENERADO); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialTipoPersonalApoyAtencPrevEmergDesast: this.data?.numRegHistorialTipoPersonalApoyAtencPrevEmergDesast ?? '',
      apoyoAtencPrevEmergDesastDTO: this.apoyoAtencPrevEmergDesast,
      tipoPersonalApoyoDTO: tipoPersonalApoyo,
      cantidadPersonalApoyo: Number(valores.cantidad),
      diasEmpleadosTipoPersonalApoyAtencPrevEmergDesast: Number(valores.dias)
    });
  }

  confirmar(): void {
    if (this.data?.idHistorialTipoPersonalApoyAtencPrevEmergDesast) this.eliminar.emit(this.data.idHistorialTipoPersonalApoyAtencPrevEmergDesast);
  }
}
