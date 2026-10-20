import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialIntegrantesSolicInfraestI } from '../../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/construcciones-mantenimientos/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { UnidadesMilitaresI } from '../../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { CargosIntegrantesDocumentosI } from '../../../../../../interfaces/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.interface';
import { HistorialIntegrantesDocumentosI } from '../../../../../../interfaces/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.interface';
import { CargosIntegrantesDocumentosService } from '../../../../../../services/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.service';
import { HistorialIntegrantesDocumentosService } from '../../../../../../services/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.service';

@Component({
  selector: 'app-add-upd-del-historial-integrante-solic-infraest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-historial-integrante-solic-infraest.component.html',
  styleUrl: './add-upd-del-historial-integrante-solic-infraest.component.scss'
})
export class AddUpdDelHistorialIntegranteSolicInfraestComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: HistorialIntegrantesSolicInfraestI | null = null;
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;
  //CARGOS YA REGISTRADOS EN EL HISTORIAL DE ESTA SOLICITUD (EN MAYÚSCULA), PARA AVISAR ANTES DE GUARDAR UN CARGO REPETIDO.
  //LA VALIDACIÓN DEFINITIVA LA HACE EL BACKEND (MSG_REGISTRO_CARGO_YA_EXISTE_EN_SOLICITUD_INFRAESTRUCTURA):
  @Input() cargosRegistrados: string[] = [];
  //PASOS (SIGLAS DE UNIDADES MILITARES) DE LA LÍNEA DE MANDO DE LA SOLICITUD, EJ. [CAOCC, JEMOP, SECEJ, COEJC]. LOS CARGA
  //ListadoHistorialIntegrantesSolicInfraestComponent (QUE LOS USA TAMBIÉN EN SU COMBO DE FILTRO); SI LA UNIDAD DE LA
  //SOLICITUD NO TIENE LÍNEA DE MANDO REGISTRADA, SOLO TRAE LA PROPIA UNIDAD DE LA SOLICITUD:
  @Input() pasosLineaMando: string[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialIntegrantesSolicInfraestI>();
  @Output() eliminar = new EventEmitter<number>();

  form: FormGroup;
  busquedaForm: FormGroup;
  cargosIntegrantesDocumentos: CargosIntegrantesDocumentosI[] = [];
  //HISTORIAL DE INTEGRANTES DE DOCUMENTOS DE LA UNIDAD MILITAR DEL PASO SELECCIONADO, SOLO LOS MARCADOS COMO "SI" EN
  //"PREDETERMINADO ACTUAL" (MISMA REGLA QUE USABA EL ASISTENTE DE INTEGRANTES DE LA SOLICITUD):
  historialesPredeterminados: HistorialIntegrantesDocumentosI[] = [];
  historialesDelCargo: HistorialIntegrantesDocumentosI[] = [];
  //UNIDAD MILITAR DEL INTEGRANTE (SE GUARDA EN ID_UNIDAD_MILITAR; EN PANTALLA SOLO SE MUESTRA SU SIGLA O ACRÓNIMO):
  unidadMilitarIntegrante: UnidadesMilitaresI | null = null;
  mensajeBusqueda = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly cargosIntegrantesDocumentosService: CargosIntegrantesDocumentosService,
    private readonly historialIntegrantesDocumentosService: HistorialIntegrantesDocumentosService
  ) {
    this.form = this.crearFormulario();
    this.busquedaForm = this.crearFormularioBusqueda();
    this.cargosIntegrantesDocumentosService.findAllDocumentMemberPositions(undefined, undefined, 'nombreCargoIntegranteDocumentos', 'ASC').subscribe(
      cargos => this.cargosIntegrantesDocumentos = cargos
    );
  }

  //SOLO SE REINICIAN LOS FORMULARIOS CUANDO CAMBIA EL MODO, EL REGISTRO O LA SOLICITUD; ASÍ UNA ACTUALIZACIÓN DE
  //cargosRegistrados (QUE LLEGA DESPUÉS DESDE EL LISTADO) NO BORRA LA BÚSQUEDA EN CURSO. AL REINICIAR SE DEJA SELECCIONADO
  //EL PRIMER PASO DE LA LÍNEA DE MANDO (LA UNIDAD QUE CREÓ LA SOLICITUD):
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['data'] || changes['solicitudInfraestructura']) {
      this.form = this.crearFormulario();
      this.busquedaForm = this.crearFormularioBusqueda();
      this.historialesDelCargo = [];
      this.mensajeBusqueda = '';
      if (this.modo === 'eliminar') this.form.disable();
      this.seleccionarPaso(this.pasosLineaMando[0] ?? '');
      return;
    }
    //SI LA LÍNEA DE MANDO LLEGA DESPUÉS (CONSULTA DEL LISTADO AÚN EN CURSO) Y NO HAY PASO ELEGIDO, SE SELECCIONA EL PRIMERO:
    if (changes['pasosLineaMando'] && !this.busquedaForm.get('pasoSeleccionado')?.value) {
      this.seleccionarPaso(this.pasosLineaMando[0] ?? '');
    }
  }

  //AL CAMBIAR EL PASO (UNIDAD MILITAR) DE LA LÍNEA DE MANDO SE REINICIA LA BÚSQUEDA Y SE CARGAN SUS INTEGRANTES PREDETERMINADOS:
  onCambioPaso(): void {
    this.seleccionarPaso(String(this.busquedaForm.get('pasoSeleccionado')?.value || ''));
  }

  private seleccionarPaso(sigla: string): void {
    this.busquedaForm.patchValue({ pasoSeleccionado: sigla, cargoSeleccionado: '', integranteSeleccionado: '' });
    this.historialesDelCargo = [];
    this.mensajeBusqueda = '';
    this.cargarHistorialesPredeterminados(sigla);
  }

  //CARGA EL HISTORIAL DE INTEGRANTES DE DOCUMENTOS DE LA UNIDAD MILITAR DEL PASO SELECCIONADO (SOLO PREDETERMINADOS "SI"):
  private cargarHistorialesPredeterminados(sigla: string): void {
    if (!sigla) {
      this.historialesPredeterminados = [];
      return;
    }
    this.historialIntegrantesDocumentosService.findAllDocumentMemberHistories(undefined, sigla, undefined, 'nombresIntegranteDocumentos', 'ASC').subscribe({
      next: historiales => this.historialesPredeterminados = historiales.filter(h => h.siONoActualIntegranteDocumentosPredeterminado === 'SI'),
      error: () => {
        this.historialesPredeterminados = [];
        this.mensajeBusqueda = 'No fue posible consultar el historial de integrantes de documentos.';
      }
    });
  }

  //FILTRA LOS INTEGRANTES PREDETERMINADOS DE LA UNIDAD MILITAR DEL PASO SEGÚN EL CARGO SELECCIONADO:
  onCambioCargo(): void {
    const idCargo = Number(this.busquedaForm.get('cargoSeleccionado')?.value);
    this.busquedaForm.get('integranteSeleccionado')?.setValue('');
    this.historialesDelCargo = idCargo
      ? this.historialesPredeterminados.filter(h => h.cargoIntegranteDocumentosDTO?.idCargoIntegranteDocumentos === idCargo)
      : [];
    this.mensajeBusqueda = idCargo && !this.historialesDelCargo.length
      ? 'No hay integrantes predeterminados de la unidad militar seleccionada con ese cargo.'
      : '';
  }

  //CARGA EN EL FORMULARIO LOS DATOS DEL INTEGRANTE SELECCIONADO DEL HISTORIAL DE INTEGRANTES DE DOCUMENTOS (NOMBRES,
  //PRIMER Y SEGUNDO APELLIDO VIENEN EN CAMPOS SEPARADOS Y SE COPIAN TAL CUAL), INCLUIDA SU UNIDAD MILITAR:
  cargarIntegranteSeleccionado(): void {
    const id = Number(this.busquedaForm.get('integranteSeleccionado')?.value);
    const historial = this.historialesDelCargo.find(item => item.idHistorialIntegranteDocumentos === id);
    if (!historial) return;
    this.unidadMilitarIntegrante = historial.unidadMilitarDTO ?? null;
    this.form.patchValue({
      unidad: historial.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '',
      grado: historial.gradoIntegranteDocumentos ?? '',
      nombres: historial.nombresIntegranteDocumentos ?? '',
      apellido1: historial.primerApellidoIntegranteDocumentos ?? '',
      apellido2: historial.segundoApellidoIntegranteDocumentos ?? '',
      cargo: historial.cargoIntegranteDocumentos ?? '',
      firma: historial.nombreArchivoFotoFirmaIntegranteDocumentos ?? ''
    });
    this.mensajeBusqueda = this.cargoRepetido
      ? 'El cargo de este integrante ya está registrado para su unidad militar en el historial de esta solicitud.'
      : 'Datos del integrante cargados correctamente.';
  }

  //CLAVE "SIGLA|CARGO" (EN MAYÚSCULA) CON LA QUE EL LISTADO ENVÍA LOS CARGOS YA REGISTRADOS DE CADA UNIDAD MILITAR:
  static claveCargoUnidadMilitar(sigla: unknown, cargo: unknown): string {
    return `${String(sigla ?? '').trim().toUpperCase()}|${String(cargo ?? '').trim().toUpperCase()}`;
  }

  //INDICA SI EL CARGO DEL FORMULARIO YA ESTÁ REGISTRADO PARA LA MISMA UNIDAD MILITAR EN OTRO REGISTRO DEL HISTORIAL DE
  //ESTA SOLICITUD (LA MISMA DENOMINACIÓN DE CARGO SÍ PUEDE REPETIRSE EN OTRA UNIDAD DE LA LÍNEA DE MANDO):
  get cargoRepetido(): boolean {
    const cargo = String(this.form.get('cargo')?.value || '').trim();
    const sigla = this.unidadMilitarIntegrante?.siglaoAcronimoUnidadMilitar;
    if (!cargo || !sigla) return false;
    const clave = AddUpdDelHistorialIntegranteSolicInfraestComponent.claveCargoUnidadMilitar(sigla, cargo);
    const claveActual = AddUpdDelHistorialIntegranteSolicInfraestComponent.claveCargoUnidadMilitar(this.data?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar, this.data?.cargoIntegranteSolicitudInfraestructura);
    if (this.modo === 'modificar' && clave === claveActual) return false;
    return this.cargosRegistrados.includes(clave);
  }

  //TODAS LAS COLUMNAS DE LA TABLA SON NOT NULL: LA UNIDAD MILITAR Y LA FIRMA SE TOMAN DEL HISTORIAL DE INTEGRANTES DE
  //DOCUMENTOS (NO SE ESCRIBEN A MANO), ASÍ QUE SE EXIGE HABER CARGADO UN INTEGRANTE QUE LAS TENGA:
  get faltanDatosIntegrante(): boolean {
    return !this.unidadMilitarIntegrante || !String(this.form.get('firma')?.value || '').trim();
  }

  enviar(): void {
    if (this.form.invalid || this.cargoRepetido || this.faltanDatosIntegrante || !this.solicitudInfraestructura || !this.unidadMilitarIntegrante) {
      this.form.markAllAsTouched();
      return;
    }
    const valor = this.form.getRawValue();
    this.guardar.emit({
      idHistorialIntegranteSolicitudInfraestructura: valor.id ?? undefined,
      numRegHistorialIntegranteSolicitudInfraestructura: valor.registro,
      solicitudInfraestructuraDTO: this.solicitudInfraestructura,
      unidadMilitarDTO: this.unidadMilitarIntegrante,
      gradoIntegranteSolicitudInfraestructura: valor.grado,
      nombresIntegranteSolicitudInfraestructura: valor.nombres,
      primerApellidoIntegranteSolicitudInfraestructura: valor.apellido1,
      segundoApellidoIntegranteSolicitudInfraestructura: valor.apellido2,
      nombreArchivoFotoFirmaIntegranteSolicitudInfraestructura: valor.firma,
      cargoIntegranteSolicitudInfraestructura: valor.cargo
    });
  }

  confirmar(): void {
    const id = this.form.getRawValue().id;
    if (id) this.eliminar.emit(Number(id));
  }

  private crearFormularioBusqueda(): FormGroup {
    return this.fb.group({ pasoSeleccionado: [''], cargoSeleccionado: [''], integranteSeleccionado: [''] });
  }

  private crearFormulario(): FormGroup {
    const item = this.data;
    this.unidadMilitarIntegrante = item?.unidadMilitarDTO ?? null;
    return this.fb.group({
      id: [item?.idHistorialIntegranteSolicitudInfraestructura ?? null],
      //EL NUMERO DE REGISTRO LO GENERA EL BACKEND Y NO DEBE SER MODIFICADO DESDE EL FRONTEND.
      registro: [{ value: item?.numRegHistorialIntegranteSolicitudInfraestructura ?? '', disabled: true }],
      //LA UNIDAD MILITAR SE TOMA DEL INTEGRANTE CARGADO DEL HISTORIAL DE INTEGRANTES DE DOCUMENTOS; SOLO SE MUESTRA SU SIGLA.
      unidad: [{ value: item?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '', disabled: true }],
      grado: [item?.gradoIntegranteSolicitudInfraestructura ?? '', Validators.required],
      nombres: [item?.nombresIntegranteSolicitudInfraestructura ?? '', Validators.required],
      apellido1: [item?.primerApellidoIntegranteSolicitudInfraestructura ?? '', Validators.required],
      apellido2: [item?.segundoApellidoIntegranteSolicitudInfraestructura ?? '', Validators.required],
      cargo: [item?.cargoIntegranteSolicitudInfraestructura ?? '', Validators.required],
      //EL NOMBRE DEL ARCHIVO DE LA FIRMA SE TOMA DEL HISTORIAL DE INTEGRANTES DE DOCUMENTOS Y NO SE EDITA A MANO.
      firma: [{ value: item?.nombreArchivoFotoFirmaIntegranteSolicitudInfraestructura ?? '', disabled: true }]
    });
  }
}
