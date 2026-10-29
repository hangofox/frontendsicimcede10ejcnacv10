import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialControlAvancObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-ctr-avanc-obr-red-mitig/historial-ctr-avanc-obr-red-mitig.interface';
import { ApoyosObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.interface';

@Component({
  selector: 'app-add-upd-del-hist-ctr-avanc-obr-red-mitig',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-ctr-avanc-obr-red-mitig.component.html',
  styleUrl: './add-upd-del-hist-ctr-avanc-obr-red-mitig.component.scss'
})
export class AddUpdDelHistCtrAvancObrRedMitigComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialControlAvancObrRedMitigGestRiesgDesastI | null = null;
  //APOYO AL QUE PERTENECE EL CONTROL DE AVANCE (EL DEL MODAL DESDE EL QUE SE ABRIÓ EL HISTORIAL):
  @Input() apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialControlAvancObrRedMitigGestRiesgDesastI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EL NÚMERO DE REGISTRO LO GENERA EL BACKEND AL CREAR ("HIST-CTR-AVANC-OBR-RED-MITIG-GEST-RIESG-DESAST-ID-FECHA"), POR ESO SOLO SE
  //MUESTRA (BLOQUEADO); EL NOMBRE ES OBLIGATORIO EN LA TABLA (NOT NULL) Y LOS PORCENTAJES Y LAS OBSERVACIONES SON OPCIONALES (NULL):
  form = this.fb.group({
    registro: [{ value: '', disabled: true }],
    nombre: ['', [Validators.required, Validators.maxLength(255)]],
    porcentajeProgramado: ['', Validators.maxLength(150)],
    porcentajeEjecutado: ['', Validators.maxLength(150)],
    porcentajeFaltante: ['', Validators.maxLength(150)],
    observaciones: ['']
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      const x = this.data;
      this.form.reset({
        registro: String(x?.numRegHistorialControlAvancObrRedMitigGestRiesgDesast ?? ''),
        nombre: String(x?.nombreHistorialControlAvancObrRedMitigGestRiesgDesast ?? ''),
        porcentajeProgramado: String(x?.numeroPorcentajeActProgAvancObrRedMitigGestRiesgDesast ?? ''),
        porcentajeEjecutado: String(x?.numeroPorcentajeActEjecAvancObrRedMitigGestRiesgDesast ?? ''),
        porcentajeFaltante: String(x?.numeroPorcentajeActFaltAvancObrRedMitigGestRiesgDesast ?? ''),
        observaciones: String(x?.observacionesHistorialControlAvancObrRedMitigGestRiesgDesast ?? '')
      });
      if (this.modo === 'eliminar') {
        this.form.disable();
      } else {
        this.form.enable();
        this.form.controls.registro.disable();
      }
    }
  }

  //LOS CAMPOS OPCIONALES VACÍOS SE ENVÍAN COMO null (LAS COLUMNAS SON NULL EN ORACLE):
  private textoOpcional(valor: unknown): string | null {
    const texto = String(valor ?? '').trim();
    return texto ? texto : null;
  }

  enviar(): void {
    if (this.form.invalid || !this.apoyoObrRedMitigGestRiesgDesast) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idHistorialControlAvancObrRedMitigGestRiesgDesast: this.data?.idHistorialControlAvancObrRedMitigGestRiesgDesast,
      //AL CREAR SE ENVÍA VACÍO (EL BACKEND LO REEMPLAZA POR EL GENERADO); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialControlAvancObrRedMitigGestRiesgDesast: this.data?.numRegHistorialControlAvancObrRedMitigGestRiesgDesast ?? '',
      apoyoObrRedMitigGestRiesgDesastDTO: this.apoyoObrRedMitigGestRiesgDesast,
      nombreHistorialControlAvancObrRedMitigGestRiesgDesast: String(valores.nombre ?? '').trim().toUpperCase(),
      numeroPorcentajeActProgAvancObrRedMitigGestRiesgDesast: this.textoOpcional(valores.porcentajeProgramado),
      numeroPorcentajeActEjecAvancObrRedMitigGestRiesgDesast: this.textoOpcional(valores.porcentajeEjecutado),
      numeroPorcentajeActFaltAvancObrRedMitigGestRiesgDesast: this.textoOpcional(valores.porcentajeFaltante),
      observacionesHistorialControlAvancObrRedMitigGestRiesgDesast: this.textoOpcional(valores.observaciones)
    });
  }

  confirmar(): void {
    if (this.data?.idHistorialControlAvancObrRedMitigGestRiesgDesast) this.eliminar.emit(this.data.idHistorialControlAvancObrRedMitigGestRiesgDesast);
  }
}
