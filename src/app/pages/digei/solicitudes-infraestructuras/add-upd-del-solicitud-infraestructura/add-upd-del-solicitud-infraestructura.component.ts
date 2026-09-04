import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SolicitudesInfraestructurasI } from '../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposSolicitudesInfraestructurasI } from '../../../../interfaces/digei/tipos-solicitudes-infraestructuras/tipos-solicitudes-infraestructuras.interface';
import { InfraestructurasI } from '../../../../interfaces/digei/infraestructuras/infraestructuras.interface';

@Component({
  selector: 'app-add-upd-del-solicitud-infraestructura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-solicitud-infraestructura.component.html',
  styleUrl: './add-upd-del-solicitud-infraestructura.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelSolicitudInfraestructuraComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];
  @Input() tiposSolicitudesInfraestructuras: TiposSolicitudesInfraestructurasI[] = [];
  @Input() infraestructuras: InfraestructurasI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<SolicitudesInfraestructurasI>();
  @Output() eliminar = new EventEmitter<number>();

  solicitudesInfraestructurasForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['solicitudInfraestructuraData']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const solicitudInfraestructura = this.solicitudInfraestructuraData;
    this.solicitudesInfraestructurasForm = this.formBuilder.group({
      idSolicitudInfraestructura: [solicitudInfraestructura?.idSolicitudInfraestructura ?? null],
      codigoRadicadoSolicitudInfraestructura: [solicitudInfraestructura?.codigoRadicadoSolicitudInfraestructura ?? '', Validators.required],
      unidadMilitarSeleccionada: [solicitudInfraestructura?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required],
      tipoSolicitudInfraestructuraSeleccionada: [solicitudInfraestructura?.tipoSolicitudInfraestructuraDTO?.idTipoSolicitudInfraestructura ?? '', Validators.required],
      infraestructuraSeleccionada: [solicitudInfraestructura?.infraestructuraDTO?.idInfraestructura ?? '', Validators.required],
      fechaHMSSolicitudInfraestructura: [this.formatearFechaParaInput(solicitudInfraestructura?.fechaHMSSolicitudInfraestructura) || this.obtenerFechaHoraActual(), Validators.required],
      nombreSolicitudInfraestructura: [solicitudInfraestructura?.nombreSolicitudInfraestructura ?? '', Validators.required],
      nombreDependenciaSolicitudInfraestructura: [solicitudInfraestructura?.nombreDependenciaSolicitudInfraestructura ?? '', Validators.required],
      numeroFuncionariosSolicitudInfraestructura: [solicitudInfraestructura?.numeroFuncionariosSolicitudInfraestructura ?? '', Validators.required],
      numeroUsuariosSolicitudInfraestructura: [solicitudInfraestructura?.numeroUsuariosSolicitudInfraestructura ?? '', Validators.required],
      observacionesJuridicasEstadoPredioInfraestructura: [solicitudInfraestructura?.observacionesJuridicasEstadoPredioInfraestructura ?? ''],
      observacionesEstadoAmbientalInfraestructura: [solicitudInfraestructura?.observacionesEstadoAmbientalInfraestructura ?? ''],
      justificacionNecesidadInfraestructura: [solicitudInfraestructura?.justificacionNecesidadInfraestructura ?? ''],
      descripcionGeneralNecesidadInfraestructura: [solicitudInfraestructura?.descripcionGeneralNecesidadInfraestructura ?? ''],
      descripcionImpactoEsperadoInfraestructura: [solicitudInfraestructura?.descripcionImpactoEsperadoInfraestructura ?? ''],
      fechaHMSIngresoSolicitudInfraestructura: [{ value: this.formatearFechaParaInput(solicitudInfraestructura?.fechaHMSIngresoSolicitudInfraestructura) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR); AL CREAR UNA
      //SOLICITUD NUEVA AÚN NO EXISTE, POR LO QUE QUEDA VACÍA (MISMO PATRÓN QUE AddUpdDelInfraestructuraComponent):
      fechaHMSModificacionSolicitudInfraestructura: [{ value: solicitudInfraestructura ? this.obtenerFechaHoraActual() : '', disabled: true }]
    });
    if (this.banderaCrudEliminar) {
      this.solicitudesInfraestructurasForm.disable();
    }
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">.
  //A PROPÓSITO NO SE USA Date.toISOString() (DEVUELVE LA HORA EN UTC): EN COLOMBIA (UTC-5) EL CAMPO QUEDABA
  //MOSTRANDO/ENVIANDO LA HORA 5 HORAS ADELANTADA RESPECTO A LA HORA REAL DE BOGOTÁ. MISMO PATRÓN QUE
  //AddUpdDelInfraestructuraComponent.obtenerFechaHoraActual():
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA UNA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. LOS
  //CAMPOS TIMESTAMP DE ORACLE LLEGAN CON ESPACIO EN VEZ DE "T" Y, MUCHAS VECES, CON SEGUNDOS/FRACCIÓN DE SEGUNDOS
  //(EJ. "2024-05-12 14:30:00.0") — MISMO PATRÓN QUE AddUpdDelInfraestructuraComponent.formatearFechaParaInput():
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //EL BACKEND MAPEA LAS FECHAS DE SOLICITUD DE INFRAESTRUCTURA COMO java.util.Date (SolicitudInfraestructuraDTO), Y
  //AL NO TENER NINGÚN @JsonFormat NI spring.jackson.date-format CONFIGURADO, JACKSON EXIGE SEGUNDOS EN EL STRING ISO
  //(yyyy-MM-ddTHH:mm:ss). EL <input type="datetime-local"> SOLO ENVÍA MINUTOS (yyyy-MM-ddTHH:mm), ASÍ QUE JACKSON
  //NO LOGRA PARSEARLO Y EL CAMPO QUEDA EN null EN EL BACKEND (SIN LANZAR ERROR 400, POR ESO SOLO SE NOTA CUANDO LA
  //COLUMNA DE ORACLE ES NOT NULL). SE LE AGREGAN LOS SEGUNDOS ANTES DE ENVIARLO, SIN CAMBIAR LO QUE VE O EDITA EL
  //USUARIO EN EL FORMULARIO — MISMO PATRÓN QUE AddUpdDelInfraestructuraComponent.agregarSegundosParaBackend():
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  guardarModificar(): void {
    if (this.solicitudesInfraestructurasForm.invalid) {
      this.solicitudesInfraestructurasForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.solicitudesInfraestructurasForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));
    const tipoSolicitudInfraestructura = this.tiposSolicitudesInfraestructuras.find(t => t.idTipoSolicitudInfraestructura === Number(valoresFormulario.tipoSolicitudInfraestructuraSeleccionada));
    const infraestructura = this.infraestructuras.find(i => i.idInfraestructura === Number(valoresFormulario.infraestructuraSeleccionada));

    const solicitudInfraestructura: SolicitudesInfraestructurasI = {
      idSolicitudInfraestructura: valoresFormulario.idSolicitudInfraestructura ?? undefined,
      codigoRadicadoSolicitudInfraestructura: valoresFormulario.codigoRadicadoSolicitudInfraestructura,
      unidadMilitarDTO: unidadMilitar ?? this.unidadesMilitares[0],
      fechaHMSSolicitudInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSSolicitudInfraestructura),
      tipoSolicitudInfraestructuraDTO: tipoSolicitudInfraestructura ?? this.tiposSolicitudesInfraestructuras[0],
      nombreSolicitudInfraestructura: valoresFormulario.nombreSolicitudInfraestructura,
      infraestructuraDTO: infraestructura ?? this.infraestructuras[0],
      nombreDependenciaSolicitudInfraestructura: valoresFormulario.nombreDependenciaSolicitudInfraestructura,
      numeroFuncionariosSolicitudInfraestructura: valoresFormulario.numeroFuncionariosSolicitudInfraestructura,
      numeroUsuariosSolicitudInfraestructura: valoresFormulario.numeroUsuariosSolicitudInfraestructura,
      observacionesJuridicasEstadoPredioInfraestructura: valoresFormulario.observacionesJuridicasEstadoPredioInfraestructura,
      observacionesEstadoAmbientalInfraestructura: valoresFormulario.observacionesEstadoAmbientalInfraestructura,
      justificacionNecesidadInfraestructura: valoresFormulario.justificacionNecesidadInfraestructura,
      descripcionGeneralNecesidadInfraestructura: valoresFormulario.descripcionGeneralNecesidadInfraestructura,
      descripcionImpactoEsperadoInfraestructura: valoresFormulario.descripcionImpactoEsperadoInfraestructura,
      fechaHMSIngresoSolicitudInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoSolicitudInfraestructura),
      fechaHMSModificacionSolicitudInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionSolicitudInfraestructura)
    };
    this.guardar.emit(solicitudInfraestructura);
  }

  confirmarEliminar(): void {
    const idSolicitudInfraestructura = this.solicitudesInfraestructurasForm.getRawValue().idSolicitudInfraestructura;
    if (idSolicitudInfraestructura) {
      this.eliminar.emit(Number(idSolicitudInfraestructura));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
