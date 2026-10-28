import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

//ESTADOS QUE PUEDE TENER UNA SOLICITUD DE INFRAESTRUCTURA AVALADA (LOS ÚNICOS QUE SE ASIGNAN EN ESTE FORMULARIO); EL BACKEND
//TAMBIÉN LOS VALIDA (MSG_ESTADO_SOLICITUD_INFRAESTRUCTURA_AVALADA_NO_PERMITIDO):
export const ESTADOS_SOLICITUDES_INFRAESTRUCTURAS_AVALADAS = ['ASIGNACION', 'APROBACION', 'RECHAZADO'] as const;

@Component({
  selector: 'app-upd-solic-const-nuev-avalada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upd-solic-const-nuev-avalada.component.html',
  styleUrl: './upd-solic-const-nuev-avalada.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdSolicitudConstruccionNuevaAvaladaComponent implements OnChanges {

  @Input() solicitudInfraestructuraData: SolicitudesInfraestructurasI | null = null;

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<SolicitudesInfraestructurasI>();

  readonly estadosSolicitudInfraestructuraAvalada = ESTADOS_SOLICITUDES_INFRAESTRUCTURAS_AVALADAS;

  solicitudesInfraestructurasAvaladasForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitudInfraestructuraData']) {
      this.initForm();
    }
  }

  //TODOS LOS DATOS DE LA SOLICITUD SE MUESTRAN DESHABILITADOS (SOLO DE CONSULTA); SOLO QUEDAN HABILITADOS LAS OBSERVACIONES
  //JURÍDICAS DEL ESTADO DEL PREDIO, LAS OBSERVACIONES DEL ESTADO AMBIENTAL, LA JUSTIFICACIÓN DE LA NECESIDAD, LA DESCRIPCIÓN
  //GENERAL DE LA NECESIDAD, LA DESCRIPCIÓN DEL IMPACTO ESPERADO Y EL ESTADO DE LA SOLICITUD:
  private initForm(): void {
    const solicitudInfraestructura = this.solicitudInfraestructuraData;
    const deshabilitado = (valor: unknown) => [{ value: valor ?? '', disabled: true }];
    this.solicitudesInfraestructurasAvaladasForm = this.formBuilder.group({
      idSolicitudInfraestructura: [solicitudInfraestructura?.idSolicitudInfraestructura ?? null],
      codigoRadicadoSolicitudInfraestructura: deshabilitado(solicitudInfraestructura?.codigoRadicadoSolicitudInfraestructura),
      unidadMilitar: deshabilitado(solicitudInfraestructura?.unidadMilitarDTO ? `${solicitudInfraestructura.unidadMilitarDTO.nombreUnidadMilitar} (${solicitudInfraestructura.unidadMilitarDTO.siglaoAcronimoUnidadMilitar})` : ''),
      tipoSolicitudInfraestructura: deshabilitado(solicitudInfraestructura?.tipoSolicitudInfraestructuraDTO?.nombreTipoSolicitudInfraestructura),
      infraestructura: deshabilitado(solicitudInfraestructura?.infraestructuraDTO ? `${solicitudInfraestructura.infraestructuraDTO.denominacionInfraestructura} (${solicitudInfraestructura.infraestructuraDTO.numeroInventarioInfraestructura})` : ''),
      nombreSolicitudInfraestructura: deshabilitado(solicitudInfraestructura?.nombreSolicitudInfraestructura),
      fechaHMSSolicitudInfraestructura: deshabilitado(this.formatearFechaParaInput(solicitudInfraestructura?.fechaHMSSolicitudInfraestructura)),
      nombreDependenciaSolicitudInfraestructura: deshabilitado(solicitudInfraestructura?.nombreDependenciaSolicitudInfraestructura),
      numeroFuncionariosSolicitudInfraestructura: deshabilitado(solicitudInfraestructura?.numeroFuncionariosSolicitudInfraestructura),
      numeroUsuariosSolicitudInfraestructura: deshabilitado(solicitudInfraestructura?.numeroUsuariosSolicitudInfraestructura),
      observacionesJuridicasEstadoPredioInfraestructura: [solicitudInfraestructura?.observacionesJuridicasEstadoPredioInfraestructura ?? ''],
      observacionesEstadoAmbientalInfraestructura: [solicitudInfraestructura?.observacionesEstadoAmbientalInfraestructura ?? ''],
      justificacionNecesidadInfraestructura: [solicitudInfraestructura?.justificacionNecesidadInfraestructura ?? ''],
      descripcionGeneralNecesidadInfraestructura: [solicitudInfraestructura?.descripcionGeneralNecesidadInfraestructura ?? ''],
      descripcionImpactoEsperadoInfraestructura: [solicitudInfraestructura?.descripcionImpactoEsperadoInfraestructura ?? ''],
      estadoSolicitudInfraestructura: [String(solicitudInfraestructura?.estadoSolicitudInfraestructura ?? '').toUpperCase(), Validators.required],
      fechaHMSIngresoSolicitudInfraestructura: deshabilitado(this.formatearFechaParaInput(solicitudInfraestructura?.fechaHMSIngresoSolicitudInfraestructura)),
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR), IGUAL QUE EN AddUpdDelSolicitudConstruccionNuevaComponent:
      fechaHMSModificacionSolicitudInfraestructura: deshabilitado(this.obtenerFechaHoraActual())
    });
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local"> (NO SE USA
  //Date.toISOString() PORQUE DEVUELVE LA HORA EN UTC). MISMO PATRÓN QUE AddUpdDelSolicitudConstruccionNuevaComponent.obtenerFechaHoraActual():
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA UNA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. MISMO PATRÓN QUE
  //AddUpdDelSolicitudConstruccionNuevaComponent.formatearFechaParaInput():
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //JACKSON EXIGE SEGUNDOS EN LAS FECHAS (yyyy-MM-ddTHH:mm:ss); EL <input type="datetime-local"> SOLO ENVÍA MINUTOS. MISMO PATRÓN QUE
  //AddUpdDelSolicitudConstruccionNuevaComponent.agregarSegundosParaBackend():
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  //SE ENVÍA LA SOLICITUD COMPLETA (TAL COMO LLEGÓ DEL LISTADO) CON LOS CAMPOS HABILITADOS ACTUALIZADOS; EL BACKEND SOLO GUARDA
  //ESOS CAMPOS Y CONSERVA LOS DEMÁS COMO ESTÁN ALMACENADOS:
  modificar(): void {
    if (this.solicitudesInfraestructurasAvaladasForm.invalid || !this.solicitudInfraestructuraData) {
      this.solicitudesInfraestructurasAvaladasForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.solicitudesInfraestructurasAvaladasForm.getRawValue();
    this.guardar.emit({
      ...this.solicitudInfraestructuraData,
      observacionesJuridicasEstadoPredioInfraestructura: valoresFormulario.observacionesJuridicasEstadoPredioInfraestructura,
      observacionesEstadoAmbientalInfraestructura: valoresFormulario.observacionesEstadoAmbientalInfraestructura,
      justificacionNecesidadInfraestructura: valoresFormulario.justificacionNecesidadInfraestructura,
      descripcionGeneralNecesidadInfraestructura: valoresFormulario.descripcionGeneralNecesidadInfraestructura,
      descripcionImpactoEsperadoInfraestructura: valoresFormulario.descripcionImpactoEsperadoInfraestructura,
      estadoSolicitudInfraestructura: valoresFormulario.estadoSolicitudInfraestructura,
      fechaHMSModificacionSolicitudInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionSolicitudInfraestructura)
    });
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
