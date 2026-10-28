import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialMaqPesadApoyAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-maq-pesad-apoy-atenc-prev-des/historial-maq-pesad-apoy-atenc-prev-des.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { MaquinariasPesadasI } from '../../../../../../interfaces/digei/gestion-riesgo/maquinarias-pesadas/maquinarias-pesadas.interface';

@Component({
  selector: 'app-add-upd-del-hist-maq-pesad-apoy-atenc-prev-des',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-maq-pesad-apoy-at-prev-des.component.html',
  styleUrl: './add-upd-del-hist-maq-pesad-apoy-at-prev-des.component.scss'
})
export class AddUpdDelHistMaqPesadApoyAtencPrevDesComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialMaqPesadApoyAtencPrevEmergDesastI | null = null;
  //APOYO AL QUE PERTENECE LA MAQUINARIA PESADA (EL DEL MODAL DESDE EL QUE SE ABRIÓ EL HISTORIAL):
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;
  @Input() maquinariasPesadas: MaquinariasPesadasI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialMaqPesadApoyAtencPrevEmergDesastI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EL NÚMERO DE REGISTRO LO GENERA EL BACKEND AL CREAR ("HIST-MAQ-PESAD-APOY-ATENC-PREV-EMERG-DESAST-ID-FECHA") Y EL EMPADRONAMIENTO
  //SE TOMA DE LA MAQUINARIA PESADA ELEGIDA, POR ESO SOLO SE MUESTRAN (BLOQUEADOS):
  form = this.fb.group({
    registro: [{ value: '', disabled: true }],
    maquinariaPesadaSeleccionada: ['', Validators.required],
    empadronamiento: [{ value: '', disabled: true }],
    dias: [null as number | null, [Validators.required, Validators.min(0)]]
  });

  //MAQUINARIA PESADA ELEGIDA EN EL COMBO; AL MODIFICAR, SI AÚN NO LLEGA EL CATÁLOGO, SE USA LA DEL REGISTRO:
  get maquinariaPesadaSeleccionada(): MaquinariasPesadasI | null {
    const idMaquinariaPesada = Number(this.form.getRawValue().maquinariaPesadaSeleccionada);
    if (!idMaquinariaPesada) return null;
    return this.maquinariasPesadas.find(maquinaria => maquinaria.idMaquinariaPesada === idMaquinariaPesada)
      ?? (this.data?.maquinariaPesadaDTO?.idMaquinariaPesada === idMaquinariaPesada ? this.data.maquinariaPesadaDTO : null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      const x = this.data;
      this.form.reset({
        registro: String(x?.numRegHistorialMaqPesadApoyAtencPrevEmergDesast ?? ''),
        maquinariaPesadaSeleccionada: x?.maquinariaPesadaDTO?.idMaquinariaPesada ? String(x.maquinariaPesadaDTO.idMaquinariaPesada) : '',
        empadronamiento: String(x?.maquinariaPesadaDTO?.empadronamientoMaquinariaPesada ?? ''),
        dias: x?.diasEmpleadosMaqPesadApoyAtencPrevEmergDesast ?? null
      });
      if (this.modo === 'eliminar') {
        this.form.disable();
      } else {
        this.form.enable();
        this.form.controls.registro.disable();
        this.form.controls.empadronamiento.disable();
      }
    }
  }

  //AL ELEGIR LA MAQUINARIA PESADA SE MUESTRA SU EMPADRONAMIENTO:
  onCambioMaquinariaPesada(): void {
    this.form.patchValue({ empadronamiento: String(this.maquinariaPesadaSeleccionada?.empadronamientoMaquinariaPesada ?? '') });
  }

  enviar(): void {
    const maquinariaPesada = this.maquinariaPesadaSeleccionada;
    if (this.form.invalid || !maquinariaPesada || !this.apoyoAtencPrevEmergDesast) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idHistorialMaqPesadApoyAtencPrevEmergDesast: this.data?.idHistorialMaqPesadApoyAtencPrevEmergDesast,
      //AL CREAR SE ENVÍA VACÍO (EL BACKEND LO REEMPLAZA POR EL GENERADO); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialMaqPesadApoyAtencPrevEmergDesast: this.data?.numRegHistorialMaqPesadApoyAtencPrevEmergDesast ?? '',
      apoyoAtencPrevEmergDesastDTO: this.apoyoAtencPrevEmergDesast,
      maquinariaPesadaDTO: maquinariaPesada,
      diasEmpleadosMaqPesadApoyAtencPrevEmergDesast: Number(valores.dias)
    });
  }

  confirmar(): void {
    if (this.data?.idHistorialMaqPesadApoyAtencPrevEmergDesast) this.eliminar.emit(this.data.idHistorialMaqPesadApoyAtencPrevEmergDesast);
  }
}
