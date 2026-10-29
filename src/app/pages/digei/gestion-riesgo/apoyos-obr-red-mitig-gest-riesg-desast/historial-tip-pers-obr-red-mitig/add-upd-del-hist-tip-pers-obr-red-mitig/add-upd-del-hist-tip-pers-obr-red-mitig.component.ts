import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-tip-pers-obr-red-mitig/historial-tip-pers-obr-red-mitig.interface';
import { ApoyosObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.interface';
import { TiposPersonalApoyosI } from '../../../../../../interfaces/digei/gestion-riesgo/tipos-personal-apoyos/tipos-personal-apoyos.interface';

@Component({
  selector: 'app-add-upd-del-hist-tip-pers-obr-red-mitig',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-tip-pers-obr-red-mitig.component.html',
  styleUrl: './add-upd-del-hist-tip-pers-obr-red-mitig.component.scss'
})
export class AddUpdDelHistTipPersObrRedMitigComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI | null = null;
  //APOYO AL QUE PERTENECE EL TIPO DE PERSONAL (EL DEL MODAL DESDE EL QUE SE ABRIÓ EL HISTORIAL):
  @Input() apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI | null = null;
  @Input() tiposPersonalApoyos: TiposPersonalApoyosI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EL NÚMERO DE REGISTRO LO GENERA EL BACKEND AL CREAR ("HIST-TIP-PERS-APOY-OBR-RED-MITIG-GEST-RIESG-DESAST-ID-FECHA"), POR ESO SOLO SE
  //MUESTRA (BLOQUEADO); LA CANTIDAD DE PERSONAL Y EL NOMBRE DE LA ESPECIALIDAD SON OBLIGATORIOS EN LA TABLA (NOT NULL):
  form = this.fb.group({
    registro: [{ value: '', disabled: true }],
    tipoPersonalApoyoSeleccionado: ['', Validators.required],
    cantidad: [null as number | null, [Validators.required, Validators.min(1)]],
    especialidad: ['', [Validators.required, Validators.maxLength(150)]]
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
        registro: String(x?.numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast ?? ''),
        tipoPersonalApoyoSeleccionado: x?.tipoPersonalApoyoDTO?.idTipoPersonalApoyo ? String(x.tipoPersonalApoyoDTO.idTipoPersonalApoyo) : '',
        cantidad: x?.cantidadPersonalApoyo ?? null,
        especialidad: String(x?.nombreEspecialidadTipoPersonalApoyObrRedMitigGestRiesgDesast ?? '')
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
    if (this.form.invalid || !tipoPersonalApoyo || !this.apoyoObrRedMitigGestRiesgDesast) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast: this.data?.idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast,
      //AL CREAR SE ENVÍA VACÍO (EL BACKEND LO REEMPLAZA POR EL GENERADO); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast: this.data?.numRegHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast ?? '',
      apoyoObrRedMitigGestRiesgDesastDTO: this.apoyoObrRedMitigGestRiesgDesast,
      tipoPersonalApoyoDTO: tipoPersonalApoyo,
      cantidadPersonalApoyo: Number(valores.cantidad),
      nombreEspecialidadTipoPersonalApoyObrRedMitigGestRiesgDesast: String(valores.especialidad ?? '').trim().toUpperCase()
    });
  }

  confirmar(): void {
    if (this.data?.idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast) this.eliminar.emit(this.data.idHistorialTipoPersonalApoyObrRedMitigGestRiesgDesast);
  }
}
