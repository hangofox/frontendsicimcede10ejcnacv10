import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyeccionesTecnicomecanicasEquipTranspI } from '../../../../../interfaces/dinco/equipos-transportes/proyecciones-tecnicomecanicas-equip-transp/proyecciones-tecnicomecanicas-equip-transp.interface';
import { EquiposIngenierosI } from '../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { CLASIFICACION_EQUIPOS_TRANSPORTES, SUBCLASIFICACION_EQUIPOS_TRANSPORTES, esEquipoTransporte } from '../../equipos-transportes.constantes';

const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');

function fechaLocalParaInput(fecha: Date): string {
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}T${dosDigitos(fecha.getHours())}:${dosDigitos(fecha.getMinutes())}`;
}

//NORMALIZA LA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm DE <input type="datetime-local">. COMO ES java.util.Date PUEDE LLEGAR
//COMO MILISEGUNDOS, COMO TEXTO ISO CON ZONA HORARIA O COMO TEXTO DE ORACLE (MISMO CRITERIO DEL FORMULARIO DE MANTENIMIENTOS):
export function fechaProyeccionParaInput(fecha: unknown): string {
  if (fecha === null || fecha === undefined || fecha === '') return '';
  if (typeof fecha === 'number' || /^\d+$/.test(String(fecha))) return fechaLocalParaInput(new Date(Number(fecha)));
  const texto = String(fecha);
  if (/([+-]\d{2}:?\d{2}|Z)$/.test(texto)) {
    const local = new Date(texto);
    if (!isNaN(local.getTime())) return fechaLocalParaInput(local);
  }
  const sinEspacio = texto.replace(' ', 'T');
  return sinEspacio.length > 16 ? sinEspacio.slice(0, 16) : sinEspacio;
}

//FECHA PARA MOSTRAR EN TABLA Y VISTA: dd/MM/yyyy HH:mm.
export function formatearFechaProyeccion(fecha: unknown): string {
  const valor = fechaProyeccionParaInput(fecha);
  const partes = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(valor);
  return partes ? `${partes[3]}/${partes[2]}/${partes[1]} ${partes[4]}:${partes[5]}` : (valor || '-');
}

//AÑO DE LA PROYECCIÓN (PARA EL COMBO DE FILTRO DEL LISTADO):
export function anioProyeccion(fecha: unknown): string {
  return fechaProyeccionParaInput(fecha).slice(0, 4);
}

//VALOR SOLICITADO EN PESOS (LA COLUMNA ES TEXTO, EJ. "280000.00"):
export function formatearValorProyeccion(valor: unknown): string {
  const numero = Number(String(valor ?? '').replace(/,/g, ''));
  if (valor === null || valor === undefined || String(valor).trim() === '' || isNaN(numero)) return String(valor ?? '') || '-';
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(numero);
}

@Component({
  selector: 'app-add-upd-del-proy-tecnicomec-equip-transp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-proy-tecnicomec-equip-transp.component.html',
  styleUrl: './add-upd-del-proy-tecnicomec-equip-transp.component.scss'
})
export class AddUpdDelProyTecnicomecEquipTranspComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: ProyeccionesTecnicomecanicasEquipTranspI | null = null;
  @Input() equiposIngenieros: EquiposIngenierosI[] = [];
  @Input() guardando = false;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<ProyeccionesTecnicomecanicasEquipTranspI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //LA CLASIFICACIÓN, LA SUBCLASIFICACIÓN Y EL ELEMENTO SE TOMAN DEL EQUIPO ELEGIDO, POR ESO SOLO SE MUESTRAN (BLOQUEADOS). EL VALOR
  //SOLICITADO ADMITE DECIMALES CON PUNTO, COMO LOS DEMÁS VALORES GUARDADOS COMO TEXTO:
  form = this.fb.group({
    equipoIngenieroSeleccionado: ['', Validators.required],
    clasificacion: [{ value: '', disabled: true }],
    subclasificacion: [{ value: '', disabled: true }],
    elemento: [{ value: '', disabled: true }],
    rubro: ['', [Validators.required, Validators.maxLength(255)]],
    valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    fecha: ['', Validators.required]
  });

  //EQUIPO DE INGENIEROS ELEGIDO; AL MODIFICAR, SI AÚN NO LLEGA EL CATÁLOGO, SE USA EL DEL REGISTRO:
  get equipoIngenieroSeleccionado(): EquiposIngenierosI | null {
    const idEquipoIngeniero = Number(this.form.getRawValue().equipoIngenieroSeleccionado);
    if (!idEquipoIngeniero) return null;
    return this.equiposIngenieros.find(equipo => equipo.idEquipoIngeniero === idEquipoIngeniero)
      ?? (this.data?.equipoIngenieroDTO?.idEquipoIngeniero === idEquipoIngeniero ? this.data.equipoIngenieroDTO : null);
  }

  //SOLO SE ADMITEN EQUIPOS DE TRANSPORTE (EQUIPO DE COMBATE / EQUIPO DE TRANSPORTE); UN REGISTRO ANTERIOR CON OTRO EQUIPO NO SE DEJA
  //GUARDAR HASTA ELEGIR UNO DE TRANSPORTE:
  get equipoNoEsTransporte(): boolean {
    const equipo = this.equipoIngenieroSeleccionado;
    return !!equipo && !esEquipoTransporte(equipo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      const x = this.data;
      const equipo = x?.equipoIngenieroDTO;
      this.form.reset({
        equipoIngenieroSeleccionado: equipo?.idEquipoIngeniero ? String(equipo.idEquipoIngeniero) : '',
        //POR DEFECTO, LA CLASIFICACIÓN Y LA SUBCLASIFICACIÓN DE LOS EQUIPOS DE TRANSPORTE:
        clasificacion: String(equipo?.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? CLASIFICACION_EQUIPOS_TRANSPORTES),
        subclasificacion: String(equipo?.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero ?? SUBCLASIFICACION_EQUIPOS_TRANSPORTES),
        elemento: String(equipo?.elementoSubclasificacionEquipoIngenieroDTO?.nombreElementoSubclasificacionEquipoIngeniero ?? ''),
        rubro: String(x?.nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp ?? ''),
        valor: String(x?.valorSolicitadoProyeccionTecnicomecanicaEquipTransp ?? ''),
        fecha: fechaProyeccionParaInput(x?.fechaHMSProyeccionTecnicomecanicaEquipTransp) || fechaLocalParaInput(new Date())
      });
      if (this.modo === 'eliminar') {
        this.form.disable();
      } else {
        this.form.enable();
        this.form.controls.clasificacion.disable();
        this.form.controls.subclasificacion.disable();
        this.form.controls.elemento.disable();
      }
    }
  }

  onCambioEquipoIngeniero(): void {
    const equipo = this.equipoIngenieroSeleccionado;
    this.form.patchValue({
      clasificacion: String(equipo?.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? CLASIFICACION_EQUIPOS_TRANSPORTES),
      subclasificacion: String(equipo?.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero ?? SUBCLASIFICACION_EQUIPOS_TRANSPORTES),
      elemento: String(equipo?.elementoSubclasificacionEquipoIngenieroDTO?.nombreElementoSubclasificacionEquipoIngeniero ?? '')
    });
  }

  campoInvalido(nombreCampo: string): boolean {
    const control = this.form.get(nombreCampo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  enviar(): void {
    const equipo = this.equipoIngenieroSeleccionado;
    if (this.guardando || this.form.invalid || !equipo || !esEquipoTransporte(equipo)) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    const fecha = String(valores.fecha || '');
    this.guardar.emit({
      idProyeccionTecnicomecanicaEquipTransp: this.data?.idProyeccionTecnicomecanicaEquipTransp,
      equipoIngenieroDTO: equipo,
      nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp: String(valores.rubro || '').trim().toUpperCase(),
      valorSolicitadoProyeccionTecnicomecanicaEquipTransp: String(valores.valor || '').trim(),
      //JACKSON EXIGE SEGUNDOS EN EL TEXTO ISO DE UN java.util.Date Y EL <input type="datetime-local"> SOLO ENVÍA MINUTOS:
      fechaHMSProyeccionTecnicomecanicaEquipTransp: fecha.length === 16 ? `${fecha}:00` : fecha
    });
  }

  confirmar(): void {
    if (this.guardando) return;
    if (this.data?.idProyeccionTecnicomecanicaEquipTransp) this.eliminar.emit(this.data.idProyeccionTecnicomecanicaEquipTransp);
  }
}
