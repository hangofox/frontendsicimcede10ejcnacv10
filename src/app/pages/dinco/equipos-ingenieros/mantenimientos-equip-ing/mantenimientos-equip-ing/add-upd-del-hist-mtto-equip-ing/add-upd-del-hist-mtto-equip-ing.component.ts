import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HistorialMantenimientosEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/historial-mantenimientos-equip-ing/historial-mantenimientos-equip-ing.interface';
import { TiposMantenimientosEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/tipos-mantenimientos-equip-ing/tipos-mantenimientos-equip-ing.interface';
import { NivelesMantenimientosEquipIngI } from '../../../../../../interfaces/dinco/equipos-ingenieros/mantenimientos-equip-ing/niveles-mantenimientos-equip-ing/niveles-mantenimientos-equip-ing.interface';
import { EquiposIngenierosI } from '../../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { TiposFuentesFinanciacionI } from '../../../../../../interfaces/tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface';

import { HistorialMantenimientosEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/mantenimientos-equip-ing/historial-mantenimientos-equip-ing/historial-mantenimientos-equip-ing.service';
import { TiposMantenimientosEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/mantenimientos-equip-ing/tipos-mantenimientos-equip-ing/tipos-mantenimientos-equip-ing.service';
import { NivelesMantenimientosEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/mantenimientos-equip-ing/niveles-mantenimientos-equip-ing/niveles-mantenimientos-equip-ing.service';
import { EquiposIngenierosService } from '../../../../../../services/dinco/equipos-ingenieros/equipos-ingenieros.service';
import { TiposFuentesFinanciacionService } from '../../../../../../services/tipos-fuentes-financiacion/tipos-fuentes-financiacion.service';

type ModoMantenimiento = 'guardar' | 'modificar' | 'eliminar';

//DIRECCIONES A LAS QUE SE REGRESA: AL CREAR, A MANTENIMIENTOS DE EQUIPOS DE INGENIEROS (DE DONDE SE ABRE LA OPCIÓN DE MANTENIMIENTO);
//AL MODIFICAR O ELIMINAR, AL LISTADO DEL HISTORIAL (DE DONDE SE ABRE CON LOS BOTONES MODIFICAR / ELIMINAR DE CADA REGISTRO):
const RUTA_MANTENIMIENTOS_EQUIP_ING = '/dinco/equipos-ingenieros/mantenimientos-equip-ing';
const RUTA_LISTADO_HISTORIAL = RUTA_MANTENIMIENTOS_EQUIP_ING + '/historial-mantenimientos-equip-ing/listado-hist-mttos-equip-ing';

//FORMULARIO DE MANTENIMIENTO DE EQUIPO DE INGENIEROS COMO PÁGINA (MISMO PATRÓN DE AddUpdDelHistorialMantenimientoInfraestComponent):
//historial-mantenimientos-equip-ing SOLO MANEJA LA LISTA Y AQUÍ (mantenimientos-equip-ing) SE CREA, MODIFICA Y ELIMINA:
// - SIN PARÁMETROS: FORMULARIO VACÍO PARA CREAR. TRAS GUARDAR SE LIMPIA PARA EL SIGUIENTE.
// - ?modo=modificar&id=N O ?modo=eliminar&id=N (BOTONES DEL LISTADO DEL HISTORIAL): CARGA EL REGISTRO DEL BACKEND (ASÍ TAMBIÉN
//   FUNCIONA AL RECARGAR LA PÁGINA) Y, AL TERMINAR, REGRESA AL LISTADO CON EL MENSAJE DEL RESULTADO EN EL ESTADO DE NAVEGACIÓN.
@Component({
  selector: 'app-add-upd-del-hist-mtto-equip-ing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-mtto-equip-ing.component.html',
  styleUrl: './add-upd-del-hist-mtto-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelHistMttoEquipIngComponent implements OnInit, OnDestroy {

  modo: ModoMantenimiento = 'guardar';
  historialMantenimientoEquipoIngenieroData: HistorialMantenimientosEquipIngI | null = null;

  //CATÁLOGOS DE LOS COMBOS DEL FORMULARIO:
  equiposIngenieros: EquiposIngenierosI[] = [];
  nivelesMantenimientosEquipIng: NivelesMantenimientosEquipIngI[] = [];
  tiposMantenimientosEquipIng: TiposMantenimientosEquipIngI[] = [];
  tiposFuentesFinanciacion: TiposFuentesFinanciacionI[] = [];

  historialesMantenimientosEquiposIngenierosForm!: FormGroup;

  //MIENTRAS SE CARGA EL REGISTRO A MODIFICAR / ELIMINAR, O SI NO SE ENCONTRÓ:
  cargandoRegistro = false;
  registroNoEncontrado = false;
  //EVITA DOBLE ENVÍO MIENTRAS EL BACKEND RESPONDE:
  enviando = false;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private historialMantenimientosEquipIngService: HistorialMantenimientosEquipIngService,
    private tiposMantenimientosEquipIngService: TiposMantenimientosEquipIngService,
    private nivelesMantenimientosEquipIngService: NivelesMantenimientosEquipIngService,
    private equiposIngenierosService: EquiposIngenierosService,
    private tiposFuentesFinanciacionService: TiposFuentesFinanciacionService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.cargarEquiposIngenieros();
    this.cargarNivelesMantenimientosEquipIng();
    this.cargarTiposMantenimientosEquipIng();
    this.cargarTiposFuentesFinanciacion();
    this.leerParametros();
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  //LEE ?modo= E ?id= DE LA DIRECCIÓN. CUALQUIER COMBINACIÓN INVÁLIDA SE TRATA COMO CREACIÓN:
  private leerParametros(): void {
    const parametros = this.activatedRoute.snapshot.queryParamMap;
    const modo = parametros.get('modo');
    const id = Number(parametros.get('id'));
    if ((modo === 'modificar' || modo === 'eliminar') && id > 0) {
      this.modo = modo;
      this.cargarRegistro(id);
    } else {
      this.modo = 'guardar';
      this.initForm();
    }
  }

  private cargarRegistro(idHistorialMantenimientoEquipoIngeniero: number): void {
    this.cargandoRegistro = true;
    this.historialMantenimientosEquipIngService.getEngineerEquipmentMaintenanceHistorybyId(idHistorialMantenimientoEquipoIngeniero).subscribe({
      next: (respuesta) => {
        this.historialMantenimientoEquipoIngenieroData = respuesta?.historialMantenimientoEquipoIngenieroDTO ?? null;
        this.registroNoEncontrado = !this.historialMantenimientoEquipoIngenieroData;
        this.cargandoRegistro = false;
        this.initForm();
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        console.error('ERROR AL CONSULTAR EL HISTORIAL DE MANTENIMIENTO DE EQUIPO DE INGENIEROS: ', err);
        this.cargandoRegistro = false;
        this.registroNoEncontrado = true;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  //CARGA LOS EQUIPOS DE INGENIEROS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarEquiposIngenieros(): void {
    this.equiposIngenierosService.findAllEngineerEquipments(undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'denominacionEquipoIngeniero', 'ASC')
      .subscribe({
        next: (equiposIngenieros) => {
          this.equiposIngenieros = equiposIngenieros ?? [];
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE NIVELES DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS (COMBO DEL FORMULARIO):
  private cargarNivelesMantenimientosEquipIng(): void {
    this.nivelesMantenimientosEquipIngService.findAllLevelsOfEngineerEquipmentMaintenance(undefined, undefined, 'idNivelMantenimientoEquipoIngeniero', 'ASC')
      .subscribe({
        next: (niveles) => {
          this.nivelesMantenimientosEquipIng = niveles ?? [];
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR NIVELES DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS (COMBO DEL FORMULARIO):
  private cargarTiposMantenimientosEquipIng(): void {
    this.tiposMantenimientosEquipIngService.findAllTypesOfEngineerEquipmentMaintenance(undefined, undefined, 'nombreTipoMantenimientoEquipoIngeniero', 'ASC')
      .subscribe({
        next: (tipos) => {
          this.tiposMantenimientosEquipIng = tipos ?? [];
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE MANTENIMIENTO DE EQUIPOS DE INGENIEROS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE FUENTES DE FINANCIACIÓN (COMBO DEL FORMULARIO):
  private cargarTiposFuentesFinanciacion(): void {
    this.tiposFuentesFinanciacionService.findAllTypesOfFundingSources(undefined, undefined, 'nombreTipoFuenteFinanciacion', 'ASC')
      .subscribe({
        next: (tiposFuentesFinanciacion) => {
          this.tiposFuentesFinanciacion = tiposFuentesFinanciacion ?? [];
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE FUENTES DE FINANCIACIÓN: ', err)
      });
  }

  private initForm(): void {
    const historial = this.historialMantenimientoEquipoIngenieroData;
    this.historialesMantenimientosEquiposIngenierosForm = this.formBuilder.group({
      idHistorialMantenimientoEquipoIngeniero: [historial?.idHistorialMantenimientoEquipoIngeniero ?? null],
      //EL N.° DE REGISTRO LO GENERA EL BACKEND AL CREAR (HIST-MTTO-EQUIP-ING-{ID}-{FECHA}) Y LO CONSERVA AL MODIFICAR; AQUÍ SOLO SE
      //MUESTRA, NUNCA SE DIGITA NI SE EDITA (MISMO PATRÓN DE LOS DEMÁS HISTORIALES DE DINCO):
      numRegHistorialMantenimientoEquipoIngeniero: [{ value: historial?.numRegHistorialMantenimientoEquipoIngeniero ?? '', disabled: true }],
      equipoIngenieroSeleccionado: [historial?.equipoIngenieroDTO?.idEquipoIngeniero ?? '', Validators.required],
      nivelMantenimientoEquipoIngenieroSeleccionado: [historial?.nivelMantenimientoEquipoIngenieroDTO?.idNivelMantenimientoEquipoIngeniero ?? '', Validators.required],
      tipoMantenimientoEquipoIngenieroSeleccionado: [historial?.tipoMantenimientoEquipoIngenieroDTO?.idTipoMantenimientoEquipoIngeniero ?? '', Validators.required],
      fechaHMSMantenimientoEquipoIngeniero: [this.formatearFechaParaInput(historial?.fechaHMSMantenimientoEquipoIngeniero) || this.obtenerFechaHoraActual(), Validators.required],
      asuntoMantenimientoEquipoIngeniero: [historial?.asuntoMantenimientoEquipoIngeniero ?? '', Validators.required],
      //EN LA TABLA LA DESCRIPCIÓN ES CLOB NOT NULL:
      descripcionMantenimientoEquipoIngeniero: [historial?.descripcionMantenimientoEquipoIngeniero ?? '', Validators.required],
      //EN LA TABLA EL VALOR DEL COSTO ES OPCIONAL (VARCHAR2 NULL); SI SE DIGITA DEBE SER NUMÉRICO:
      valorCostoMantenimientoEquipoIngeniero: [historial?.valorCostoMantenimientoEquipoIngeniero ?? '', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      tipoFuenteFinanciacionSeleccionado: [historial?.tipoFuenteFinanciacionDTO?.idTipoFuenteFinanciacion ?? '', Validators.required],
      //DOCUMENTO ANEXO DEL CONTRATO: EL NOMBRE ES OBLIGATORIO (VARCHAR2 NOT NULL) Y EL NOMBRE DEL ARCHIVO OPCIONAL (CLOB NULL):
      nombreDocumentoAnexoContratoMttoEquipIng: [historial?.nombreDocumentoAnexoContratoMttoEquipIng ?? '', Validators.required],
      nombreArchivoDocumentoAnexoContratoMttoEquipIng: [historial?.nombreArchivoDocumentoAnexoContratoMttoEquipIng ?? '']
    });
    if (this.banderaCrudEliminar) {
      this.historialesMantenimientosEquiposIngenierosForm.disable();
    }
  }

  //VERDADERO CUANDO EL CAMPO YA FUE TOCADO Y NO CUMPLE SU VALIDACIÓN (PARA MOSTRAR EL MENSAJE DE ERROR):
  campoInvalido(nombreCampo: string): boolean {
    const control = this.historialesMantenimientosEquiposIngenierosForm.get(nombreCampo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. A PROPÓSITO NO SE
  //USA Date.toISOString() (DEVUELVE LA HORA EN UTC Y EN COLOMBIA QUEDARÍA 5 HORAS ADELANTADA):
  private obtenerFechaHoraActual(): string {
    return this.fechaLocalParaInput(new Date());
  }

  private fechaLocalParaInput(fecha: Date): string {
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}T${dosDigitos(fecha.getHours())}:${dosDigitos(fecha.getMinutes())}`;
  }

  //NORMALIZA LA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm DE <input type="datetime-local">. COMO ES java.util.Date PUEDE
  //LLEGAR COMO MILISEGUNDOS, COMO TEXTO ISO CON ZONA HORARIA O COMO TEXTO DE ORACLE ("2024-05-12 14:30:00.0"):
  private formatearFechaParaInput(fecha: unknown): string {
    if (fecha === null || fecha === undefined || fecha === '') return '';
    if (typeof fecha === 'number' || /^\d+$/.test(String(fecha))) return this.fechaLocalParaInput(new Date(Number(fecha)));
    const texto = String(fecha);
    //CON ZONA HORARIA (EJ. "...T08:00:00.000-05:00" O "...Z") SE PASA A LA HORA LOCAL:
    if (/([+-]\d{2}:?\d{2}|Z)$/.test(texto)) {
      const local = new Date(texto);
      if (!isNaN(local.getTime())) return this.fechaLocalParaInput(local);
    }
    const sinEspacio = texto.replace(' ', 'T');
    return sinEspacio.length > 16 ? sinEspacio.slice(0, 16) : sinEspacio;
  }

  //JACKSON EXIGE SEGUNDOS EN EL TEXTO ISO DE UN java.util.Date (yyyy-MM-ddTHH:mm:ss) Y EL <input type="datetime-local"> SOLO
  //ENVÍA MINUTOS; SE AGREGAN ANTES DE ENVIARLO:
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  //ARMA EL HISTORIAL CON LOS VALORES DEL FORMULARIO Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID). EL BACKEND
  //PUEDE RESPONDER HTTP 200 SIN GUARDAR (banderaexito = false), EN CUYO CASO SE MUESTRA SU MENSAJE COMO ERROR Y EL FORMULARIO SIGUE:
  guardarModificar(): void {
    if (this.historialesMantenimientosEquiposIngenierosForm.invalid || this.enviando) {
      this.historialesMantenimientosEquiposIngenierosForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.historialesMantenimientosEquiposIngenierosForm.getRawValue();
    const equipoIngeniero = this.equiposIngenieros.find(e => Number(e.idEquipoIngeniero) === Number(valoresFormulario.equipoIngenieroSeleccionado));
    const nivelMantenimiento = this.nivelesMantenimientosEquipIng.find(n => Number(n.idNivelMantenimientoEquipoIngeniero) === Number(valoresFormulario.nivelMantenimientoEquipoIngenieroSeleccionado));
    const tipoMantenimiento = this.tiposMantenimientosEquipIng.find(t => Number(t.idTipoMantenimientoEquipoIngeniero) === Number(valoresFormulario.tipoMantenimientoEquipoIngenieroSeleccionado));
    const tipoFuenteFinanciacion = this.tiposFuentesFinanciacion.find(t => Number(t.idTipoFuenteFinanciacion) === Number(valoresFormulario.tipoFuenteFinanciacionSeleccionado));
    if (!equipoIngeniero || !nivelMantenimiento || !tipoMantenimiento || !tipoFuenteFinanciacion) {
      this.historialesMantenimientosEquiposIngenierosForm.markAllAsTouched();
      return;
    }

    const historial: HistorialMantenimientosEquipIngI = {
      idHistorialMantenimientoEquipoIngeniero: valoresFormulario.idHistorialMantenimientoEquipoIngeniero ?? undefined,
      //AL CREAR VA VACÍO (EL BACKEND LO ASIGNA; NO SE ENVÍA null PORQUE EL BACKEND LE APLICA toUpperCase()); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialMantenimientoEquipoIngeniero: this.historialMantenimientoEquipoIngenieroData?.numRegHistorialMantenimientoEquipoIngeniero ?? '',
      asuntoMantenimientoEquipoIngeniero: String(valoresFormulario.asuntoMantenimientoEquipoIngeniero).trim().toUpperCase(),
      descripcionMantenimientoEquipoIngeniero: String(valoresFormulario.descripcionMantenimientoEquipoIngeniero ?? '').trim().toUpperCase(),
      fechaHMSMantenimientoEquipoIngeniero: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSMantenimientoEquipoIngeniero),
      valorCostoMantenimientoEquipoIngeniero: String(valoresFormulario.valorCostoMantenimientoEquipoIngeniero ?? '').trim(),
      nombreDocumentoAnexoContratoMttoEquipIng: String(valoresFormulario.nombreDocumentoAnexoContratoMttoEquipIng ?? '').trim().toUpperCase(),
      nombreArchivoDocumentoAnexoContratoMttoEquipIng: String(valoresFormulario.nombreArchivoDocumentoAnexoContratoMttoEquipIng ?? '').trim(),
      equipoIngenieroDTO: equipoIngeniero,
      nivelMantenimientoEquipoIngenieroDTO: nivelMantenimiento,
      tipoMantenimientoEquipoIngenieroDTO: tipoMantenimiento,
      tipoFuenteFinanciacionDTO: tipoFuenteFinanciacion
    };

    const esModificacion = !!historial.idHistorialMantenimientoEquipoIngeniero;
    const peticion = esModificacion
      ? this.historialMantenimientosEquipIngService.updateEngineerEquipmentMaintenanceHistory(historial)
      : this.historialMantenimientosEquipIngService.addEngineerEquipmentMaintenanceHistory(historial);
    this.enviando = true;
    peticion.subscribe({
      next: (respuesta) => {
        this.enviando = false;
        if (respuesta?.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No se pudo guardar el mantenimiento del equipo de ingenieros.');
          return;
        }
        if (esModificacion) {
          this.regresarAlListado(respuesta?.mensaje || 'Mantenimiento de equipo de ingenieros modificado correctamente.');
          return;
        }
        //CREACIÓN: SE QUEDA EN EL FORMULARIO, LIMPIO, PARA REGISTRAR EL SIGUIENTE MANTENIMIENTO:
        this.mostrarToast('exito', respuesta?.mensaje || 'Mantenimiento de equipo de ingenieros creado correctamente.');
        this.historialMantenimientoEquipoIngenieroData = null;
        this.initForm();
      },
      error: (err) => {
        this.enviando = false;
        console.error(esModificacion ? 'ERROR AL MODIFICAR HISTORIAL DE MANTENIMIENTO DE EQUIPO DE INGENIEROS: ' : 'ERROR AL CREAR HISTORIAL DE MANTENIMIENTO DE EQUIPO DE INGENIEROS: ', err);
        this.mostrarToast('error', err.error?.mensaje || (esModificacion ? 'Error al modificar el mantenimiento del equipo de ingenieros.' : 'Error al crear el mantenimiento del equipo de ingenieros.'));
      }
    });
  }

  //ELIMINA EL REGISTRO CARGADO Y REGRESA AL LISTADO DEL HISTORIAL:
  confirmarEliminar(): void {
    const idHistorialMantenimientoEquipoIngeniero = Number(this.historialesMantenimientosEquiposIngenierosForm.getRawValue().idHistorialMantenimientoEquipoIngeniero);
    if (!idHistorialMantenimientoEquipoIngeniero || this.enviando) return;
    this.enviando = true;
    this.historialMantenimientosEquipIngService.deleteEngineerEquipmentMaintenanceHistory(idHistorialMantenimientoEquipoIngeniero).subscribe({
      next: (respuesta) => {
        this.enviando = false;
        if (respuesta?.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No se pudo eliminar el mantenimiento del equipo de ingenieros.');
          return;
        }
        this.regresarAlListado(respuesta?.mensaje || 'Mantenimiento de equipo de ingenieros eliminado correctamente.');
      },
      error: (err) => {
        this.enviando = false;
        console.error('ERROR AL ELIMINAR HISTORIAL DE MANTENIMIENTO DE EQUIPO DE INGENIEROS: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el mantenimiento del equipo de ingenieros.');
      }
    });
  }

  //BOTÓN CANCELAR: AL CREAR VUELVE A MANTENIMIENTOS DE EQUIPOS DE INGENIEROS; AL MODIFICAR / ELIMINAR, AL LISTADO DEL HISTORIAL:
  cancelar(): void {
    this.router.navigateByUrl(this.banderaCrudGuardar ? RUTA_MANTENIMIENTOS_EQUIP_ING : RUTA_LISTADO_HISTORIAL);
  }

  //EL LISTADO LEE EL MENSAJE DEL ESTADO DE NAVEGACIÓN Y LO MUESTRA EN SU TOAST:
  private regresarAlListado(mensaje: string): void {
    this.router.navigateByUrl(RUTA_LISTADO_HISTORIAL, { state: { toastMensaje: mensaje, toastTipo: 'exito' } });
  }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTipo = tipo;
    this.toastMensaje = mensaje;
    this.changeDetectorRef.markForCheck();
    this.toastTimer = setTimeout(() => {
      this.toastMensaje = '';
      this.changeDetectorRef.markForCheck();
    }, 4000);
  }
}
