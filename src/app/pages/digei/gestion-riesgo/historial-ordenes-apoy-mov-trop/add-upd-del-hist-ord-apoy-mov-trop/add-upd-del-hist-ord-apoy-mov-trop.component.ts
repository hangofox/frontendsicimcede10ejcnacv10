import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialOrdenApoyoMovimientoTropaI } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/historial-ordenes-apoy-mov-trop/historial-ordenes-apoy-mov-trop.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';

@Component({
  selector: 'app-add-upd-del-hist-ord-apoy-mov-trop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-ord-apoy-mov-trop.component.html',
  styleUrl: './add-upd-del-hist-ord-apoy-mov-trop.component.scss'
})
export class AddUpdDelHistOrdApoyMovTropComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialOrdenApoyoMovimientoTropaI | null = null;
  //APOYO AL QUE PERTENECE LA ORDEN DE APOYO DE MOVIMIENTO DE TROPAS (EL DEL MODAL DESDE EL QUE SE ABRIÓ EL HISTORIAL):
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialOrdenApoyoMovimientoTropaI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EL NÚMERO DE REGISTRO LO GENERA EL BACKEND AL CREAR ("HIST-ORD-APOY-MOV-TROP-ID-FECHA"), POR ESO SOLO SE MUESTRA (BLOQUEADO):
  form = this.fb.group({
    registro: [{ value: '', disabled: true }],
    oficio: ['', Validators.required],
    asunto: ['', Validators.required]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      const x = this.data;
      this.form.reset({
        registro: String(x?.numRegHistorialOrdenApoyoMovimientoTropa ?? ''),
        oficio: String(x?.numeroOficioHrOrdenApoyoMovimientoTropa ?? ''),
        asunto: String(x?.asuntoOrdenApoyoMovimientoTropa ?? '')
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
    if (this.form.invalid || !this.apoyoAtencPrevEmergDesast) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idHistorialOrdenApoyoMovimientoTropa: this.data?.idHistorialOrdenApoyoMovimientoTropa,
      //AL CREAR SE ENVÍA VACÍO (EL BACKEND LO REEMPLAZA POR EL GENERADO); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialOrdenApoyoMovimientoTropa: this.data?.numRegHistorialOrdenApoyoMovimientoTropa ?? '',
      apoyoAtencPrevEmergDesastDTO: this.apoyoAtencPrevEmergDesast,
      numeroOficioHrOrdenApoyoMovimientoTropa: String(valores.oficio || '').trim().toUpperCase(),
      asuntoOrdenApoyoMovimientoTropa: String(valores.asunto || '').trim()
    });
  }

  confirmar(): void {
    if (this.data?.idHistorialOrdenApoyoMovimientoTropa) this.eliminar.emit(this.data.idHistorialOrdenApoyoMovimientoTropa);
  }
}
