import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HistorialMantenimientosInfraestI } from '../../../../../../interfaces/digei/mantenimientos-infraestructuras/historial-mantenimientos-infraest/historial-mantenimientos-infraest.interface';
import { TiposMantenimientosInfraestructurasI } from '../../../../../../interfaces/digei/mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras.interface';
import { InfraestructurasI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';
import { TiposFuentesFinanciacionI } from '../../../../../../interfaces/tipos-fuentes-financiacion/tipos-fuentes-financiacion.interface';

import { HistorialMantenimientosInfraestService } from '../../../../../../services/digei/mantenimientos-infraestructuras/historial-mantenimientos-infraest/historial-mantenimientos-infraest.service';
import { TiposMantenimientosInfraestructurasService } from '../../../../../../services/digei/mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras/tipos-mantenimientos-infraestructuras.service';
import { InfraestructurasService } from '../../../../../../services/digei/finca-raiz/infraestructuras/infraestructuras.service';
import { TiposFuentesFinanciacionService } from '../../../../../../services/tipos-fuentes-financiacion/tipos-fuentes-financiacion.service';

type ModoMantenimiento = 'guardar' | 'modificar' | 'eliminar';

//DIRECCIONES A LAS QUE SE REGRESA: AL CREAR, A MANTENIMIENTOS DE INFRAESTRUCTURAS (DE DONDE SE ABRE CON EL ROMBO DE MANTENIMIENTO);
//AL MODIFICAR O ELIMINAR, AL LISTADO DEL HISTORIAL (DE DONDE SE ABRE CON LOS BOTONES MODIFICAR / ELIMINAR DE CADA REGISTRO):
const RUTA_MANTENIMIENTOS_INFRAESTRUCTURAS = '/digei/construcciones-mantenimientos/mantenimientos-infraestructuras';
const RUTA_LISTADO_HISTORIAL = RUTA_MANTENIMIENTOS_INFRAESTRUCTURAS + '/historial-mantenimientos-infraest/listado-hist-mttos-infraest';

//FORMULARIO DE MANTENIMIENTO DE INFRAESTRUCTURA COMO PÁGINA (YA NO COMO MODAL DEL LISTADO). A PEDIDO DE LA DUEÑA DEL SISTEMA,
//historial-mantenimientos-infraest SOLO MANEJA LA LISTA Y AQUÍ (mantenimientos-infraest) SE CREA, MODIFICA Y ELIMINA:
// - SIN PARÁMETROS (ROMBO DE MANTENIMIENTO DE INFRAESTRUCTURA): FORMULARIO VACÍO PARA CREAR. TRAS GUARDAR SE LIMPIA PARA EL SIGUIENTE.
// - ?modo=modificar&id=N O ?modo=eliminar&id=N (BOTONES DEL LISTADO DEL HISTORIAL): CARGA EL REGISTRO DEL BACKEND (ASÍ TAMBIÉN
//   FUNCIONA AL RECARGAR LA PÁGINA) Y, AL TERMINAR, REGRESA AL LISTADO CON EL MENSAJE DEL RESULTADO EN EL ESTADO DE NAVEGACIÓN.
@Component({
  selector: 'app-add-upd-del-hist-mtto-infraest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-hist-mtto-infraest.component.html',
  styleUrl: './add-upd-del-hist-mtto-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelHistorialMantenimientoInfraestComponent implements OnInit, OnDestroy {

  modo: ModoMantenimiento = 'guardar';
  historialMantenimientoInfraestructuraData: HistorialMantenimientosInfraestI | null = null;

  //CATÁLOGOS DE LOS COMBOS DEL FORMULARIO:
  infraestructuras: InfraestructurasI[] = [];
  tiposMantenimientosInfraestructuras: TiposMantenimientosInfraestructurasI[] = [];
  tiposFuentesFinanciacion: TiposFuentesFinanciacionI[] = [];

  historialesMantenimientosInfraestructurasForm!: FormGroup;

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
    private historialMantenimientosInfraestService: HistorialMantenimientosInfraestService,
    private tiposMantenimientosInfraestructurasService: TiposMantenimientosInfraestructurasService,
    private infraestructurasService: InfraestructurasService,
    private tiposFuentesFinanciacionService: TiposFuentesFinanciacionService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.cargarInfraestructuras();
    this.cargarTiposMantenimientosInfraestructuras();
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

  private cargarRegistro(idHistorialMantenimientoInfraestructura: number): void {
    this.cargandoRegistro = true;
    this.historialMantenimientosInfraestService.getInfrastructureMaintenanceHistorybyId(idHistorialMantenimientoInfraestructura).subscribe({
      next: (respuesta) => {
        this.historialMantenimientoInfraestructuraData = respuesta?.historialMantenimientoInfraestructuraDTO ?? null;
        this.registroNoEncontrado = !this.historialMantenimientoInfraestructuraData;
        this.cargandoRegistro = false;
        this.initForm();
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        console.error('ERROR AL CONSULTAR EL HISTORIAL DE MANTENIMIENTO DE INFRAESTRUCTURA: ', err);
        this.cargandoRegistro = false;
        this.registroNoEncontrado = true;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  //CARGA EL CATÁLOGO DE INFRAESTRUCTURAS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarInfraestructuras(): void {
    this.infraestructurasService.findAllInfrastructures(undefined, undefined, undefined, 'denominacionInfraestructura', 'ASC')
      .subscribe({
        next: (infraestructuras) => {
          this.infraestructuras = infraestructuras;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR INFRAESTRUCTURAS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE MANTENIMIENTO DE INFRAESTRUCTURA (COMBO DEL FORMULARIO):
  private cargarTiposMantenimientosInfraestructuras(): void {
    this.tiposMantenimientosInfraestructurasService.findAllTypesOfInfrastructureMaintenance(undefined, undefined, 'nombreTipoMantenimientoInfraestructura', 'ASC')
      .subscribe({
        next: (tiposMantenimientosInfraestructuras) => {
          this.tiposMantenimientosInfraestructuras = tiposMantenimientosInfraestructuras;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE MANTENIMIENTO DE INFRAESTRUCTURA: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE FUENTES DE FINANCIACIÓN (COMBO DEL FORMULARIO):
  private cargarTiposFuentesFinanciacion(): void {
    this.tiposFuentesFinanciacionService.findAllTypesOfFundingSources(undefined, undefined, 'nombreTipoFuenteFinanciacion', 'ASC')
      .subscribe({
        next: (tiposFuentesFinanciacion) => {
          this.tiposFuentesFinanciacion = tiposFuentesFinanciacion;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE FUENTES DE FINANCIACIÓN: ', err)
      });
  }

  private initForm(): void {
    const historial = this.historialMantenimientoInfraestructuraData;
    this.historialesMantenimientosInfraestructurasForm = this.formBuilder.group({
      idHistorialMantenimientoInfraestructura: [historial?.idHistorialMantenimientoInfraestructura ?? null],
      numRegHistorialMantenimientoInfraestructura: [historial?.numRegHistorialMantenimientoInfraestructura ?? '', Validators.required],
      infraestructuraSeleccionada: [historial?.infraestructuraDTO?.idInfraestructura ?? '', Validators.required],
      tipoMantenimientoInfraestructuraSeleccionado: [historial?.tipoMantenimientoInfraestructuraDTO?.idTipoMantenimientoInfraestructura ?? '', Validators.required],
      fechaHMSMantenimientoInfraestructura: [this.formatearFechaParaInput(historial?.fechaHMSMantenimientoInfraestructura) || this.obtenerFechaHoraActual(), Validators.required],
      asuntoMantenimientoInfraestructura: [historial?.asuntoMantenimientoInfraestructura ?? '', Validators.required],
      descripcionMantenimientoInfraestructura: [historial?.descripcionMantenimientoInfraestructura ?? ''],
      valorCostoMantenimientoInfraestructura: [historial?.valorCostoMantenimientoInfraestructura ?? '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      tipoFuenteFinanciacionSeleccionado: [historial?.tipoFuenteFinanciacionDTO?.idTipoFuenteFinanciacion ?? '', Validators.required]
    });
    if (this.banderaCrudEliminar) {
      this.historialesMantenimientosInfraestructurasForm.disable();
    }
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. A PROPÓSITO NO SE
  //USA Date.toISOString() (DEVUELVE LA HORA EN UTC Y EN COLOMBIA QUEDARÍA 5 HORAS ADELANTADA). MISMO PATRÓN DE
  //AddUpdDelSolicitudMantenimientoComponent.obtenerFechaHoraActual():
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
    //CON ZONA HORARIA (EJ. "...T19:30:00.000+00:00" O "...Z") SE PASA A LA HORA LOCAL:
    if (/([+-]\d{2}:?\d{2}|Z)$/.test(texto)) {
      const local = new Date(texto);
      if (!isNaN(local.getTime())) return this.fechaLocalParaInput(local);
    }
    const sinEspacio = texto.replace(' ', 'T');
    return sinEspacio.length > 16 ? sinEspacio.slice(0, 16) : sinEspacio;
  }

  //JACKSON EXIGE SEGUNDOS EN EL TEXTO ISO DE UN java.util.Date (yyyy-MM-ddTHH:mm:ss) Y EL <input type="datetime-local"> SOLO
  //ENVÍA MINUTOS; SE AGREGAN ANTES DE ENVIARLO. MISMO PATRÓN DE AddUpdDelSolicitudMantenimientoComponent.agregarSegundosParaBackend():
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  //ARMA EL HISTORIAL CON LOS VALORES DEL FORMULARIO Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID). EL BACKEND
  //PUEDE RESPONDER HTTP 200 SIN GUARDAR (banderaexito = false), EN CUYO CASO SE MUESTRA SU MENSAJE COMO ERROR Y EL FORMULARIO SIGUE:
  guardarModificar(): void {
    if (this.historialesMantenimientosInfraestructurasForm.invalid || this.enviando) {
      this.historialesMantenimientosInfraestructurasForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.historialesMantenimientosInfraestructurasForm.getRawValue();
    const infraestructura = this.infraestructuras.find(i => i.idInfraestructura === Number(valoresFormulario.infraestructuraSeleccionada));
    const tipoMantenimiento = this.tiposMantenimientosInfraestructuras.find(t => t.idTipoMantenimientoInfraestructura === Number(valoresFormulario.tipoMantenimientoInfraestructuraSeleccionado));
    const tipoFuenteFinanciacion = this.tiposFuentesFinanciacion.find(t => t.idTipoFuenteFinanciacion === Number(valoresFormulario.tipoFuenteFinanciacionSeleccionado));
    if (!infraestructura || !tipoMantenimiento || !tipoFuenteFinanciacion) return;

    const historial: HistorialMantenimientosInfraestI = {
      idHistorialMantenimientoInfraestructura: valoresFormulario.idHistorialMantenimientoInfraestructura ?? undefined,
      numRegHistorialMantenimientoInfraestructura: String(valoresFormulario.numRegHistorialMantenimientoInfraestructura).trim().toUpperCase(),
      asuntoMantenimientoInfraestructura: String(valoresFormulario.asuntoMantenimientoInfraestructura).trim().toUpperCase(),
      descripcionMantenimientoInfraestructura: String(valoresFormulario.descripcionMantenimientoInfraestructura ?? '').trim(),
      fechaHMSMantenimientoInfraestructura: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSMantenimientoInfraestructura),
      valorCostoMantenimientoInfraestructura: String(valoresFormulario.valorCostoMantenimientoInfraestructura).trim(),
      infraestructuraDTO: infraestructura,
      tipoMantenimientoInfraestructuraDTO: tipoMantenimiento,
      tipoFuenteFinanciacionDTO: tipoFuenteFinanciacion
    };

    const esModificacion = !!historial.idHistorialMantenimientoInfraestructura;
    const peticion = esModificacion
      ? this.historialMantenimientosInfraestService.updateInfrastructureMaintenanceHistory(historial)
      : this.historialMantenimientosInfraestService.addInfrastructureMaintenanceHistory(historial);
    this.enviando = true;
    peticion.subscribe({
      next: (respuesta) => {
        this.enviando = false;
        if (respuesta?.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No se pudo guardar el mantenimiento de infraestructura.');
          return;
        }
        if (esModificacion) {
          this.regresarAlListado(respuesta?.mensaje || 'Mantenimiento de infraestructura modificado correctamente.');
          return;
        }
        //CREACIÓN: SE QUEDA EN EL FORMULARIO, LIMPIO, PARA REGISTRAR EL SIGUIENTE MANTENIMIENTO:
        this.mostrarToast('exito', respuesta?.mensaje || 'Mantenimiento de infraestructura creado correctamente.');
        this.historialMantenimientoInfraestructuraData = null;
        this.initForm();
      },
      error: (err) => {
        this.enviando = false;
        console.error(esModificacion ? 'ERROR AL MODIFICAR HISTORIAL DE MANTENIMIENTO DE INFRAESTRUCTURA: ' : 'ERROR AL CREAR HISTORIAL DE MANTENIMIENTO DE INFRAESTRUCTURA: ', err);
        this.mostrarToast('error', err.error?.mensaje || (esModificacion ? 'Error al modificar el mantenimiento de infraestructura.' : 'Error al crear el mantenimiento de infraestructura.'));
      }
    });
  }

  //ELIMINA EL REGISTRO CARGADO Y REGRESA AL LISTADO DEL HISTORIAL:
  confirmarEliminar(): void {
    const idHistorialMantenimientoInfraestructura = Number(this.historialesMantenimientosInfraestructurasForm.getRawValue().idHistorialMantenimientoInfraestructura);
    if (!idHistorialMantenimientoInfraestructura || this.enviando) return;
    this.enviando = true;
    this.historialMantenimientosInfraestService.deleteInfrastructureMaintenanceHistory(idHistorialMantenimientoInfraestructura).subscribe({
      next: (respuesta) => {
        this.enviando = false;
        if (respuesta?.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No se pudo eliminar el mantenimiento de infraestructura.');
          return;
        }
        this.regresarAlListado(respuesta?.mensaje || 'Mantenimiento de infraestructura eliminado correctamente.');
      },
      error: (err) => {
        this.enviando = false;
        console.error('ERROR AL ELIMINAR HISTORIAL DE MANTENIMIENTO DE INFRAESTRUCTURA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el mantenimiento de infraestructura.');
      }
    });
  }

  //BOTÓN CANCELAR: AL CREAR VUELVE A MANTENIMIENTOS DE INFRAESTRUCTURAS; AL MODIFICAR / ELIMINAR, AL LISTADO DEL HISTORIAL:
  cancelar(): void {
    this.router.navigateByUrl(this.banderaCrudGuardar ? RUTA_MANTENIMIENTOS_INFRAESTRUCTURAS : RUTA_LISTADO_HISTORIAL);
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
