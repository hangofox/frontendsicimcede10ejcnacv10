import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-maq-pesad-obr-red-mitig/historial-maq-pesad-obr-red-mitig.interface';
import { ApoyosObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.interface';
import { MaquinariasPesadasI } from '../../../../../../interfaces/digei/gestion-riesgo/maquinarias-pesadas/maquinarias-pesadas.interface';

@Component({
  selector: 'app-add-upd-del-hist-maq-pesad-obr-red-mitig',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-maq-pesad-obr-red-mitig.component.html',
  styleUrl: './add-upd-del-hist-maq-pesad-obr-red-mitig.component.scss'
})
export class AddUpdDelHistMaqPesadObrRedMitigComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI | null = null;
  //APOYO AL QUE PERTENECE LA MAQUINARIA PESADA (EL DEL MODAL DESDE EL QUE SE ABRIÓ EL HISTORIAL):
  @Input() apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI | null = null;
  @Input() maquinariasPesadas: MaquinariasPesadasI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialMaqPesadApoyObrRedMitigGestRiesgDesastI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EL NÚMERO DE REGISTRO LO GENERA EL BACKEND AL CREAR ("HIST-MAQ-PESAD-APOY-OBR-RED-MITIG-GEST-RIESG-DESAST-ID-FECHA") Y EL EMPADRONAMIENTO
  //SE TOMA DE LA MAQUINARIA PESADA ELEGIDA, POR ESO SOLO SE MUESTRAN (BLOQUEADOS):
  form = this.fb.group({
    registro: [{ value: '', disabled: true }],
    maquinariaPesadaSeleccionada: ['', Validators.required],
    empadronamiento: [{ value: '', disabled: true }],
    horas: [null as number | null, [Validators.required, Validators.min(0)]]
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
        registro: String(x?.numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast ?? ''),
        maquinariaPesadaSeleccionada: x?.maquinariaPesadaDTO?.idMaquinariaPesada ? String(x.maquinariaPesadaDTO.idMaquinariaPesada) : '',
        empadronamiento: String(x?.maquinariaPesadaDTO?.empadronamientoMaquinariaPesada ?? ''),
        horas: x?.totalHorasEmpleadasMaqPesadApoyObrRedMitigGestRiesgDesast ?? null
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
    if (this.form.invalid || !maquinariaPesada || !this.apoyoObrRedMitigGestRiesgDesast) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast: this.data?.idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast,
      //AL CREAR SE ENVÍA VACÍO (EL BACKEND LO REEMPLAZA POR EL GENERADO); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast: this.data?.numRegHistorialMaqPesadApoyObrRedMitigGestRiesgDesast ?? '',
      apoyoObrRedMitigGestRiesgDesastDTO: this.apoyoObrRedMitigGestRiesgDesast,
      maquinariaPesadaDTO: maquinariaPesada,
      totalHorasEmpleadasMaqPesadApoyObrRedMitigGestRiesgDesast: Number(valores.horas)
    });
  }

  confirmar(): void {
    if (this.data?.idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast) this.eliminar.emit(this.data.idHistorialMaqPesadApoyObrRedMitigGestRiesgDesast);
  }
}
