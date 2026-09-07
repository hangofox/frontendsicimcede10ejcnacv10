import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InfraestructurasI } from '../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { SociedadesUnidadesCentralizadorasI } from '../../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';
import { TiposEstructurasInfraestructurasI } from '../../../../../interfaces/digei/finca-raiz/tipos-estructuras-infraestructuras/tipos-estructuras-infraestructuras.interface';
import { FuncionalidadesInfraestructurasI } from '../../../../../interfaces/digei/finca-raiz/funcionalidades-infraestructuras/funcionalidades-infraestructuras.interface';
import { SegurosI } from '../../../../../interfaces/seguros/seguros.interface';
import { TerrenosI } from '../../../../../interfaces/digei/finca-raiz/terrenos/terrenos.interface';

@Component({
  selector: 'app-add-upd-del-infraestructura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-infraestructura.component.html',
  styleUrl: './add-upd-del-infraestructura.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelInfraestructuraComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() infraestructuraData: InfraestructurasI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];
  @Input() sociedadesUnidadesCentralizadoras: SociedadesUnidadesCentralizadorasI[] = [];
  @Input() tiposEstructurasInfraestructuras: TiposEstructurasInfraestructurasI[] = [];
  @Input() funcionalidadesInfraestructuras: FuncionalidadesInfraestructurasI[] = [];
  @Input() seguros: SegurosI[] = [];
  @Input() terrenos: TerrenosI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<InfraestructurasI>();
  @Output() eliminar = new EventEmitter<number>();

  infraestructurasForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['infraestructuraData']) {
      this.initForm();
    }
  }

  private initForm(): void {
    const infraestructura = this.infraestructuraData;
    this.infraestructurasForm = this.formBuilder.group({
      idInfraestructura: [infraestructura?.idInfraestructura ?? null],
      unidadMilitarSeleccionada: [infraestructura?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required],
      sociedadUnidadCentralizadoraSeleccionada: [infraestructura?.sociedadUnidadCentralizadoraDTO?.idSociedadUnidadCentralizadora ?? '', Validators.required],
      tipoEstructuraInfraestructuraSeleccionada: [infraestructura?.tipoEstructuraInfraestructuraDTO?.idTipoEstructuraInfraestructura ?? '', Validators.required],
      funcionalidadInfraestructuraSeleccionada: [infraestructura?.funcionalidadInfraestructuraDTO?.idFuncionalidadInfraestructura ?? '', Validators.required],
      seguroSeleccionado: [infraestructura?.seguroDTO?.idSeguro ?? '', Validators.required],
      terrenoSeleccionado: [infraestructura?.terrenoDTO?.idTerreno ?? '', Validators.required],
      denominacionInfraestructura: [infraestructura?.denominacionInfraestructura ?? '', Validators.required],
      numeroInventarioInfraestructura: [infraestructura?.numeroInventarioInfraestructura ?? '', Validators.required],
      numeroActivoFijoInfraestructura: [infraestructura?.numeroActivoFijoInfraestructura ?? '', Validators.required],
      centroCostoUnidadMilitarInfraestructura: [infraestructura?.centroCostoUnidadMilitarInfraestructura ?? '', Validators.required],
      estadoUsoInfraestructura: [infraestructura?.estadoUsoInfraestructura ?? '', Validators.required],
      paisOrigenInfraestructura: [infraestructura?.paisOrigenInfraestructura ?? '', Validators.required],
      departamentoOEstadoOrigenInfraestructura: [infraestructura?.departamentoOEstadoOrigenInfraestructura ?? '', Validators.required],
      ciudadOrigenInfraestructura: [infraestructura?.ciudadOrigenInfraestructura ?? '', Validators.required],
      direccionInfraestructura: [infraestructura?.direccionInfraestructura ?? '', Validators.required],
      latitudInfraestructura: [infraestructura?.latitudInfraestructura ?? ''],
      longitudInfraestructura: [infraestructura?.longitudInfraestructura ?? ''],
      numeroLargoInfraestructura: [infraestructura?.numeroLargoInfraestructura ?? ''],
      nombreUnidadMedidaLargoInfraestructura: [infraestructura?.nombreUnidadMedidaLargoInfraestructura ?? ''],
      numeroAnchuraInfraestructura: [infraestructura?.numeroAnchuraInfraestructura ?? ''],
      nombreUnidadMedidaAnchuraInfraestructura: [infraestructura?.nombreUnidadMedidaAnchuraInfraestructura ?? ''],
      numeroProfundidadInfraestructura: [infraestructura?.numeroProfundidadInfraestructura ?? ''],
      nombreUnidadMedidaProfundidadInfraestructura: [infraestructura?.nombreUnidadMedidaProfundidadInfraestructura ?? ''],
      numeroPisosInfraestructura: [infraestructura?.numeroPisosInfraestructura ?? ''],
      normaSismoresistenteInfraestructura: [infraestructura?.normaSismoresistenteInfraestructura ?? ''],
      propiedadHorizontalInfraestructura: [infraestructura?.propiedadHorizontalInfraestructura ?? ''],
      denominacionPosteriorInfraestructura: [infraestructura?.denominacionPosteriorInfraestructura ?? ''],
      estratoInfraestructura: [infraestructura?.estratoInfraestructura ?? ''],
      numeroCuentaInfraestructura: [infraestructura?.numeroCuentaInfraestructura ?? ''],
      numeroSubcuentaInfraestructura: [infraestructura?.numeroSubcuentaInfraestructura ?? ''],
      valorContableInfraestructura: [infraestructura?.valorContableInfraestructura ?? ''],
      fechaHMSAltaInfraestructura: [infraestructura?.fechaHMSAltaInfraestructura ?? ''],
      fechaHMSAmortizacionInfraestructura: [infraestructura?.fechaHMSAmortizacionInfraestructura ?? ''],
      fechaHMSIngresoInfraestructura: [{ value: this.formatearFechaParaInput(infraestructura?.fechaHMSIngresoInfraestructura) || this.obtenerFechaHoraActual(), disabled: true }],
      //LA FECHA DE MODIFICACIÓN SE MUESTRA COMO INFORMATIVA (LA QUE QUEDARÁ REGISTRADA AL GUARDAR); AL CREAR UNA
      //INFRAESTRUCTURA NUEVA AÚN NO EXISTE, POR LO QUE QUEDA VACÍA (MISMO PATRÓN QUE AddUpdDelUsuarioComponent):
      fechaHMSModificacionInfraestructura: [{ value: infraestructura ? this.obtenerFechaHoraActual() : '', disabled: true }]
    });
    if (this.banderaCrudEliminar) {
      this.infraestructurasForm.disable();
    }
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">.
  //A PROPÓSITO NO SE USA Date.toISOString() (DEVUELVE LA HORA EN UTC): EN COLOMBIA (UTC-5) EL CAMPO QUEDABA
  //MOSTRANDO/ENVIANDO LA HORA 5 HORAS ADELANTADA RESPECTO A LA HORA REAL DE BOGOTÁ. MISMO PATRÓN QUE
  //AddUpdDelUsuarioComponent.obtenerFechaHoraActual():
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA UNA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. LOS
  //CAMPOS TIMESTAMP DE ORACLE LLEGAN CON ESPACIO EN VEZ DE "T" Y, MUCHAS VECES, CON SEGUNDOS/FRACCIÓN DE SEGUNDOS
  //(EJ. "2024-05-12 14:30:00.0") — MISMO PATRÓN QUE AddUpdDelUsuarioComponent.formatearFechaParaInput():
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //EL BACKEND MAPEA LAS FECHAS DE INFRAESTRUCTURA COMO java.util.Date (InfraestructuraDTO), Y AL NO TENER NINGÚN
  //@JsonFormat NI spring.jackson.date-format CONFIGURADO, JACKSON EXIGE SEGUNDOS EN EL STRING ISO
  //(yyyy-MM-ddTHH:mm:ss). EL <input type="datetime-local"> SOLO ENVÍA MINUTOS (yyyy-MM-ddTHH:mm), ASÍ QUE JACKSON
  //NO LOGRA PARSEARLO Y EL CAMPO QUEDA EN null EN EL BACKEND (SIN LANZAR ERROR 400, POR ESO SOLO SE NOTA CUANDO LA
  //COLUMNA DE ORACLE ES NOT NULL, COMO fecha_h_m_s_ingreso_infraestructura). SE LE AGREGAN LOS SEGUNDOS ANTES DE
  //ENVIARLO, SIN CAMBIAR LO QUE VE O EDITA EL USUARIO EN EL FORMULARIO:
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  guardarModificar(): void {
    if (this.infraestructurasForm.invalid) {
      this.infraestructurasForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.infraestructurasForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));
    const sociedadUnidadCentralizadora = this.sociedadesUnidadesCentralizadoras.find(s => s.idSociedadUnidadCentralizadora === Number(valoresFormulario.sociedadUnidadCentralizadoraSeleccionada));
    const tipoEstructuraInfraestructura = this.tiposEstructurasInfraestructuras.find(t => t.idTipoEstructuraInfraestructura === Number(valoresFormulario.tipoEstructuraInfraestructuraSeleccionada));
    const funcionalidadInfraestructura = this.funcionalidadesInfraestructuras.find(f => f.idFuncionalidadInfraestructura === Number(valoresFormulario.funcionalidadInfraestructuraSeleccionada));
    const seguro = this.seguros.find(s => s.idSeguro === Number(valoresFormulario.seguroSeleccionado));
    const terreno = this.terrenos.find(t => t.idTerreno === Number(valoresFormulario.terrenoSeleccionado));

    const infraestructura: InfraestructurasI = {
      idInfraestructura: valoresFormulario.idInfraestructura ?? undefined,
      unidadMilitarDTO: unidadMilitar ?? this.unidadesMilitares[0],
      sociedadUnidadCentralizadoraDTO: sociedadUnidadCentralizadora ?? this.sociedadesUnidadesCentralizadoras[0],
      tipoEstructuraInfraestructuraDTO: tipoEstructuraInfraestructura ?? this.tiposEstructurasInfraestructuras[0],
      funcionalidadInfraestructuraDTO: funcionalidadInfraestructura ?? this.funcionalidadesInfraestructuras[0],
      seguroDTO: seguro ?? this.seguros[0],
      terrenoDTO: terreno ?? this.terrenos[0],
      denominacionInfraestructura: valoresFormulario.denominacionInfraestructura,
      numeroInventarioInfraestructura: valoresFormulario.numeroInventarioInfraestructura,
      numeroActivoFijoInfraestructura: valoresFormulario.numeroActivoFijoInfraestructura,
      centroCostoUnidadMilitarInfraestructura: valoresFormulario.centroCostoUnidadMilitarInfraestructura,
      estadoUsoInfraestructura: valoresFormulario.estadoUsoInfraestructura,
      paisOrigenInfraestructura: valoresFormulario.paisOrigenInfraestructura,
      departamentoOEstadoOrigenInfraestructura: valoresFormulario.departamentoOEstadoOrigenInfraestructura,
      ciudadOrigenInfraestructura: valoresFormulario.ciudadOrigenInfraestructura,
      direccionInfraestructura: valoresFormulario.direccionInfraestructura,
      latitudInfraestructura: valoresFormulario.latitudInfraestructura,
      longitudInfraestructura: valoresFormulario.longitudInfraestructura,
      numeroLargoInfraestructura: valoresFormulario.numeroLargoInfraestructura,
      nombreUnidadMedidaLargoInfraestructura: valoresFormulario.nombreUnidadMedidaLargoInfraestructura,
      numeroAnchuraInfraestructura: valoresFormulario.numeroAnchuraInfraestructura,
      nombreUnidadMedidaAnchuraInfraestructura: valoresFormulario.nombreUnidadMedidaAnchuraInfraestructura,
      numeroProfundidadInfraestructura: valoresFormulario.numeroProfundidadInfraestructura,
      nombreUnidadMedidaProfundidadInfraestructura: valoresFormulario.nombreUnidadMedidaProfundidadInfraestructura,
      numeroPisosInfraestructura: valoresFormulario.numeroPisosInfraestructura,
      normaSismoresistenteInfraestructura: valoresFormulario.normaSismoresistenteInfraestructura,
      propiedadHorizontalInfraestructura: valoresFormulario.propiedadHorizontalInfraestructura,
      denominacionPosteriorInfraestructura: valoresFormulario.denominacionPosteriorInfraestructura,
      estratoInfraestructura: valoresFormulario.estratoInfraestructura,
      numeroCuentaInfraestructura: valoresFormulario.numeroCuentaInfraestructura,
      numeroSubcuentaInfraestructura: valoresFormulario.numeroSubcuentaInfraestructura,
      valorContableInfraestructura: valoresFormulario.valorContableInfraestructura,
      fechaHMSAltaInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSAltaInfraestructura),
      fechaHMSAmortizacionInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSAmortizacionInfraestructura),
      fechaHMSIngresoInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSIngresoInfraestructura),
      fechaHMSModificacionInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSModificacionInfraestructura)
    };
    this.guardar.emit(infraestructura);
  }

  confirmarEliminar(): void {
    const idInfraestructura = this.infraestructurasForm.getRawValue().idInfraestructura;
    if (idInfraestructura) {
      this.eliminar.emit(Number(idInfraestructura));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
