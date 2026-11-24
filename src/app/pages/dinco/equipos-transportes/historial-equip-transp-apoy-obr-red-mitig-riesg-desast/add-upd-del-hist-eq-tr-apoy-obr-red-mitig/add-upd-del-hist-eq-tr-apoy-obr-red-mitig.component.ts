import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI } from '../../../../../interfaces/dinco/equipos-transportes/historial-equip-transp-apoy-obr-red-mitig-riesg-desast/historial-equip-transp-apoy-obr-red-mitig-riesg-desast.interface';
import { ApoyosObrRedMitigGestRiesgDesastI } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.interface';
import { EquiposIngenierosI } from '../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { CLASIFICACION_EQUIPOS_TRANSPORTES, SUBCLASIFICACION_EQUIPOS_TRANSPORTES, esEquipoTransporte } from '../../equipos-transportes.constantes';

//MISMO FORMULARIO DEL HISTORIAL DE DIGEI, CON UN COMBO MÁS PARA EL APOYO (DESDE DINCO NO SE ENTRA POR UN APOYO EN PARTICULAR):
@Component({
  selector: 'app-add-upd-del-hist-eq-tr-apoy-obr-red-mitig',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-eq-tr-apoy-obr-red-mitig.component.html',
  styleUrl: './add-upd-del-hist-eq-tr-apoy-obr-red-mitig.component.scss'
})
export class AddUpdDelHistEqTrApoyObrRedMitigComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI | null = null;
  @Input() apoyos: ApoyosObrRedMitigGestRiesgDesastI[] = [];
  @Input() equiposIngenieros: EquiposIngenierosI[] = [];
  @Input() guardando = false;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialEquipTranspApoyObrRedMitigGestRiesgDesastI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EL NÚMERO DE REGISTRO LO GENERA EL BACKEND AL CREAR; LA CLASIFICACIÓN, LA SUBCLASIFICACIÓN Y EL ELEMENTO SE TOMAN DEL EQUIPO DE
  //INGENIEROS ELEGIDO, POR ESO SOLO SE MUESTRAN (BLOQUEADOS):
  form = this.fb.group({
    registro: [{ value: '', disabled: true }],
    apoyoSeleccionado: ['', Validators.required],
    equipoIngenieroSeleccionado: ['', Validators.required],
    clasificacion: [{ value: '', disabled: true }],
    subclasificacion: [{ value: '', disabled: true }],
    elemento: [{ value: '', disabled: true }],
    placa: ['', Validators.required],
    horas: [null as number | null, [Validators.required, Validators.min(0)]]
  });

  //APOYO ELEGIDO; AL MODIFICAR, SI AÚN NO LLEGA EL CATÁLOGO, SE USA EL DEL REGISTRO:
  get apoyoSeleccionado(): ApoyosObrRedMitigGestRiesgDesastI | null {
    const idApoyo = Number(this.form.getRawValue().apoyoSeleccionado);
    if (!idApoyo) return null;
    return this.apoyos.find(apoyo => apoyo.idApoyoObrRedMitigGestRiesgDesast === idApoyo)
      ?? (this.data?.apoyoObrRedMitigGestRiesgDesastDTO?.idApoyoObrRedMitigGestRiesgDesast === idApoyo ? this.data.apoyoObrRedMitigGestRiesgDesastDTO : null);
  }

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
      this.form.reset({
        registro: String(x?.numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast ?? ''),
        apoyoSeleccionado: x?.apoyoObrRedMitigGestRiesgDesastDTO?.idApoyoObrRedMitigGestRiesgDesast ? String(x.apoyoObrRedMitigGestRiesgDesastDTO.idApoyoObrRedMitigGestRiesgDesast) : '',
        equipoIngenieroSeleccionado: x?.equipoIngenieroDTO?.idEquipoIngeniero ? String(x.equipoIngenieroDTO.idEquipoIngeniero) : '',
        //POR DEFECTO, LA CLASIFICACIÓN Y LA SUBCLASIFICACIÓN DE LOS EQUIPOS DE TRANSPORTE:
        clasificacion: String(x?.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? CLASIFICACION_EQUIPOS_TRANSPORTES),
        subclasificacion: String(x?.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero ?? SUBCLASIFICACION_EQUIPOS_TRANSPORTES),
        elemento: String(x?.elementoSubclasificacionEquipoIngenieroDTO?.nombreElementoSubclasificacionEquipoIngeniero ?? ''),
        placa: String(x?.numeroPlacaEquipoTransporte ?? ''),
        horas: x?.totalHorasEmpleadasEquipTranspApoyObrRedMitigGestRiesgDesast ?? null
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

  //AL ELEGIR EL EQUIPO SE MUESTRAN SU CLASIFICACIÓN, SUBCLASIFICACIÓN Y ELEMENTO, Y SE PRECARGA SU PLACA (SI LA TIENE):
  onCambioEquipoIngeniero(): void {
    const equipo = this.equipoIngenieroSeleccionado;
    this.form.patchValue({
      clasificacion: String(equipo?.clasificacionEquipoIngenieroDTO?.nombreClasificacionEquipoIngeniero ?? CLASIFICACION_EQUIPOS_TRANSPORTES),
      subclasificacion: String(equipo?.subclasificacionEquipoIngenieroDTO?.nombreSubclasificacionEquipoIngeniero ?? SUBCLASIFICACION_EQUIPOS_TRANSPORTES),
      elemento: String(equipo?.elementoSubclasificacionEquipoIngenieroDTO?.nombreElementoSubclasificacionEquipoIngeniero ?? ''),
      placa: String(equipo?.numeroPlacaEquipoIngeniero ?? '')
    });
  }

  campoInvalido(nombreCampo: string): boolean {
    const control = this.form.get(nombreCampo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  enviar(): void {
    const apoyo = this.apoyoSeleccionado;
    const equipo = this.equipoIngenieroSeleccionado;
    if (this.guardando || this.form.invalid || !apoyo || !equipo || !esEquipoTransporte(equipo)) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast: this.data?.idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast,
      //AL CREAR SE ENVÍA VACÍO (EL BACKEND LO REEMPLAZA POR EL GENERADO); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast: this.data?.numRegHistorialEquipTranspApoyObrRedMitigGestRiesgDesast ?? '',
      apoyoObrRedMitigGestRiesgDesastDTO: apoyo,
      clasificacionEquipoIngenieroDTO: equipo.clasificacionEquipoIngenieroDTO,
      subclasificacionEquipoIngenieroDTO: equipo.subclasificacionEquipoIngenieroDTO,
      elementoSubclasificacionEquipoIngenieroDTO: equipo.elementoSubclasificacionEquipoIngenieroDTO,
      equipoIngenieroDTO: equipo,
      numeroPlacaEquipoTransporte: String(valores.placa || '').trim().toUpperCase(),
      totalHorasEmpleadasEquipTranspApoyObrRedMitigGestRiesgDesast: Number(valores.horas)
    });
  }

  confirmar(): void {
    if (this.guardando) return;
    if (this.data?.idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast) this.eliminar.emit(this.data.idHistorialEquipTranspApoyObrRedMitigGestRiesgDesast);
  }
}
