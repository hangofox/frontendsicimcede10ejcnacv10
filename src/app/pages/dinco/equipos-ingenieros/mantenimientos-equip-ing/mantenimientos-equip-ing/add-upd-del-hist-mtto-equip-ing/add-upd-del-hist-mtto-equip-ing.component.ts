import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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
import { ParametrosSistemaService } from '../../../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { UnidadesMilitaresService } from '../../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';

type ModoMantenimiento = 'guardar' | 'modificar' | 'eliminar';

//CARPETA DEL SERVIDOR DE ARCHIVOS DONDE VAN LOS DOCUMENTOS ANEXOS DE CONTRATOS DE UN EQUIPO: CARPETA PRINCIPAL + RUTA DE DOCUMENTACIÓN ANEXA
//DE CONTRATOS DE MANTENIMIENTOS (PARÁMETROS DEL SISTEMA) + CARPETA DE LA UNIDAD MILITAR DEL EQUIPO — MISMO PATRÓN QUE
//ListadoDocumentacionAnexaSolicMttoComponent. SI EL EQUIPO NO TRAE LA CARPETA DE SU UNIDAD MILITAR, SE CONSULTA POR SU SIGLA O ACRÓNIMO.
//SE EXPORTA PARA QUE EL LISTADO DEL HISTORIAL LA USE AL ABRIR EL DOCUMENTO:
export function obtenerCarpetaDocumentosContratosMttoEquipIng(
  equipoIngeniero: EquiposIngenierosI | null | undefined,
  parametrosSistemaService: ParametrosSistemaService,
  unidadesMilitaresService: UnidadesMilitaresService
): Observable<string> {
  const unidadMilitar = equipoIngeniero?.unidadMilitarDTO;
  const carpetaUnidad$ = String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim()
    ? of(String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar).trim())
    : unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(String(unidadMilitar?.siglaoAcronimoUnidadMilitar || '').trim()).pipe(
        map(({ unidadMilitarDTO }) => String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim())
      );
  return forkJoin({ parametros: parametrosSistemaService.getSystemParameterbyId(1), carpetaUnidad: carpetaUnidad$ }).pipe(
    map(({ parametros, carpetaUnidad }) => {
      const parametrosSistemaDTO = parametros.parametrosSistemaDTO;
      const rutaContratos = String(parametrosSistemaDTO?.rutaDestinoArchivosDocumentacionAnexaContratosMantenimientosEquiposIngenieros || '').trim();
      if (!rutaContratos) throw new Error('SIN RUTA DE DOCUMENTACIÓN ANEXA DE CONTRATOS DE MANTENIMIENTOS EN LOS PARÁMETROS DEL SISTEMA');
      if (!carpetaUnidad) throw new Error('SIN CARPETA DE ALMACENAMIENTO DE LA UNIDAD MILITAR DEL EQUIPO');
      const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim() + rutaContratos;
      const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
      return `${baseNormalizada}${carpetaUnidad.replace(/^[\\/]+|[\\/]+$/g, '')}/`;
    })
  );
}

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
  //EVITA DOBLE ENVÍO MIENTRAS SE SUBE EL ARCHIVO Y EL BACKEND RESPONDE:
  enviando = false;

  //DOCUMENTO ANEXO DEL CONTRATO (MISMO PATRÓN QUE AddUpdDelDocumentacionAnexaSolicMttoComponent): TIPO PERMITIDO Y TAMAÑO MÁXIMO
  //(SOLO PDF, HASTA 2.0 MB; EL BACKEND ADMITE HASTA 5MB):
  static readonly EXTENSIONES_PERMITIDAS = ['pdf'];
  private static readonly TAMANO_MAXIMO_BYTES = 2 * 1024 * 1024;
  readonly extensionesPermitidas = AddUpdDelHistMttoEquipIngComponent.EXTENSIONES_PERMITIDAS;
  readonly acceptArchivos = AddUpdDelHistMttoEquipIngComponent.EXTENSIONES_PERMITIDAS.map(extension => '.' + extension).join(',');
  archivoSeleccionado: File | null = null;
  mensajeErrorArchivo = '';
  //AL MODIFICAR: true SI SE QUITÓ EL DOCUMENTO GUARDADO (SE BORRA AL GUARDAR) Y true MIENTRAS SE MUESTRA LA CONFIRMACIÓN — MISMO PATRÓN
  //QUE "QUITAR FIRMA" DE AddUpdDelIntegApoyObrRedMitigComponent:
  archivoEliminado = false;
  confirmandoQuitarArchivo = false;

  //NOMBRE DEL ARCHIVO YA GUARDADO EN EL REGISTRO (VACÍO AL CREAR O SI NO TIENE). EL ARCHIVO ES OPCIONAL (LA COLUMNA ES CLOB NULL):
  get nombreArchivoActual(): string {
    return String(this.historialMantenimientoEquipoIngenieroData?.nombreArchivoDocumentoAnexoContratoMttoEquipIng ?? '').trim();
  }

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
    private tiposFuentesFinanciacionService: TiposFuentesFinanciacionService,
    private parametrosSistemaService: ParametrosSistemaService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private gestionArchivosService: GestionArchivosService
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
    this.archivoSeleccionado = null;
    this.mensajeErrorArchivo = '';
    this.archivoEliminado = false;
    this.confirmandoQuitarArchivo = false;
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
      //DOCUMENTO ANEXO DEL CONTRATO: EL NOMBRE Y EL ARCHIVO SON OPCIONALES (VARCHAR2 NULL Y CLOB NULL); EL ARCHIVO SE ELIGE CON
      //EL BOTÓN DE ARCHIVO (NO ES UN CAMPO DEL FORMULARIO):
      nombreDocumentoAnexoContratoMttoEquipIng: [historial?.nombreDocumentoAnexoContratoMttoEquipIng ?? '']
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

  //VALIDA EL ARCHIVO ELEGIDO (EXTENSIÓN Y TAMAÑO), IGUAL QUE LA DOCUMENTACIÓN ANEXA DE SOLICITUDES:
  onSeleccionarArchivo(event: Event): void {
    this.mensajeErrorArchivo = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    if (file.size > AddUpdDelHistMttoEquipIngComponent.TAMANO_MAXIMO_BYTES) {
      this.mensajeErrorArchivo = 'El archivo excede el tamaño máximo permitido de 2.0 MB.';
      return;
    }
    if (!AddUpdDelHistMttoEquipIngComponent.EXTENSIONES_PERMITIDAS.includes(extension)) {
      this.mensajeErrorArchivo = `El archivo debe tener una extensión válida (${AddUpdDelHistMttoEquipIngComponent.EXTENSIONES_PERMITIDAS.join(', ')}).`;
      return;
    }
    this.archivoSeleccionado = file;
  }

  onQuitarArchivoSeleccionado(): void {
    this.archivoSeleccionado = null;
    this.mensajeErrorArchivo = '';
  }

  //QUITAR EL DOCUMENTO YA GUARDADO: SE PIDE CONFIRMACIÓN Y SOLO SE MARCA; EL ARCHIVO SE BORRA DEL SERVIDOR AL GUARDAR:
  confirmarQuitarArchivo(): void { this.confirmandoQuitarArchivo = true; }
  noQuitarArchivo(): void { this.confirmandoQuitarArchivo = false; }
  siQuitarArchivo(): void {
    this.confirmandoQuitarArchivo = false;
    this.archivoEliminado = true;
  }

  //NOMBRE DEL ARCHIVO: ID DEL REGISTRO ENCRIPTADO (DOBLE base64) + EXTENSIÓN — MISMO PATRÓN QUE AddUpdDelHistorialIntegranteDocumentosComponent
  //Y ListadoUnidadesMilitaresComponent (encriptarIdUnidad). CON DÍGITOS EL RESULTADO SOLO TIENE LETRAS, NÚMEROS E "=" (VÁLIDO COMO NOMBRE):
  private encriptarId(id: number): string {
    let valor = String(id);
    for (let i = 0; i < 2; i++) valor = btoa(valor);
    return valor;
  }

  private nombreArchivoEncriptado(id: number, archivo: File): string {
    const extension = (archivo.name.split('.').pop() || '').toLowerCase();
    return `${this.encriptarId(id)}.${extension}`;
  }

  //CARPETA DE LOS DOCUMENTOS DEL EQUIPO; SI NO SE PUEDE RESOLVER DEVUELVE null (EL LLAMADOR DECIDE SI PUEDE SEGUIR SIN ELLA):
  private carpetaDeEquipo(equipoIngeniero: EquiposIngenierosI | null | undefined): Observable<string | null> {
    if (!equipoIngeniero) return of(null);
    return obtenerCarpetaDocumentosContratosMttoEquipIng(equipoIngeniero, this.parametrosSistemaService, this.unidadesMilitaresService).pipe(
      catchError(err => {
        console.error('ERROR AL OBTENER LA CARPETA DE LOS DOCUMENTOS ANEXOS DE CONTRATOS DE MANTENIMIENTOS: ', err);
        return of(null);
      })
    );
  }

  //ARMA EL HISTORIAL CON LOS VALORES DEL FORMULARIO Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID). EL BACKEND
  //PUEDE RESPONDER HTTP 200 SIN GUARDAR (banderaexito = false), EN CUYO CASO SE MUESTRA SU MENSAJE COMO ERROR Y EL FORMULARIO SIGUE.
  //DOCUMENTO ANEXO (MISMO ORDEN QUE LA DOCUMENTACIÓN ANEXA DE SOLICITUDES): 1) SE SUBE EL ARCHIVO NUEVO (SI SE ELIGIÓ), 2) SE GUARDA EL
  //REGISTRO CON EL NOMBRE FINAL Y 3) SE BORRA EL ARCHIVO REEMPLAZADO O QUITADO. SI EL REGISTRO NO SE GUARDA, SE BORRA EL ARCHIVO RECIÉN
  //SUBIDO. SI AL MODIFICAR SE CAMBIA EL EQUIPO A OTRO DE OTRA UNIDAD MILITAR Y SE CONSERVA EL ARCHIVO, ÉSTE SE MUEVE A LA CARPETA NUEVA:
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

    const nombreActual = this.nombreArchivoActual;
    const archivo = this.archivoSeleccionado;
    const quitarArchivo = this.archivoEliminado && !!nombreActual;
    const conservarArchivo = !!nombreActual && !archivo && !quitarArchivo;
    const equipoAnterior = this.historialMantenimientoEquipoIngenieroData?.equipoIngenieroDTO ?? equipoIngeniero;

    const historial: HistorialMantenimientosEquipIngI = {
      idHistorialMantenimientoEquipoIngeniero: valoresFormulario.idHistorialMantenimientoEquipoIngeniero ?? undefined,
      //AL CREAR VA VACÍO (EL BACKEND LO ASIGNA; NO SE ENVÍA null PORQUE EL BACKEND LE APLICA toUpperCase()); AL MODIFICAR SE CONSERVA EL QUE YA TIENE:
      numRegHistorialMantenimientoEquipoIngeniero: this.historialMantenimientoEquipoIngenieroData?.numRegHistorialMantenimientoEquipoIngeniero ?? '',
      asuntoMantenimientoEquipoIngeniero: String(valoresFormulario.asuntoMantenimientoEquipoIngeniero).trim().toUpperCase(),
      descripcionMantenimientoEquipoIngeniero: String(valoresFormulario.descripcionMantenimientoEquipoIngeniero ?? '').trim().toUpperCase(),
      fechaHMSMantenimientoEquipoIngeniero: this.agregarSegundosParaBackend(valoresFormulario.fechaHMSMantenimientoEquipoIngeniero),
      valorCostoMantenimientoEquipoIngeniero: String(valoresFormulario.valorCostoMantenimientoEquipoIngeniero ?? '').trim(),
      //VACÍO SE ENVÍA null (LA COLUMNA ES OPCIONAL):
      nombreDocumentoAnexoContratoMttoEquipIng: String(valoresFormulario.nombreDocumentoAnexoContratoMttoEquipIng ?? '').trim().toUpperCase() || null,
      //SE CONSERVA EL QUE YA TIENE, QUEDA SIN ARCHIVO SI SE QUITÓ, O SE REEMPLAZA ABAJO POR EL NOMBRE DEL ARCHIVO SUBIDO:
      nombreArchivoDocumentoAnexoContratoMttoEquipIng: conservarArchivo ? nombreActual : null,
      equipoIngenieroDTO: equipoIngeniero,
      nivelMantenimientoEquipoIngenieroDTO: nivelMantenimiento,
      tipoMantenimientoEquipoIngenieroDTO: tipoMantenimiento,
      tipoFuenteFinanciacionDTO: tipoFuenteFinanciacion
    };

    const esModificacion = !!historial.idHistorialMantenimientoEquipoIngeniero;
    this.enviando = true;
    this.changeDetectorRef.markForCheck();
    //AL CREAR, EL ARCHIVO SE SUBE DESPUÉS DE CREAR EL REGISTRO (SU NOMBRE ES EL ID ENCRIPTADO, QUE LO ASIGNA EL BACKEND):
    if (!esModificacion) {
      this.crearConArchivo(historial, equipoIngeniero, archivo);
      return;
    }
    let rutaSubida: string | null = null;
    let nombreNuevo = '';

    //SE RESUELVEN LAS CARPETAS QUE HACEN FALTA (LA DEL EQUIPO ELEGIDO PARA SUBIR O MOVER Y LA DEL EQUIPO ANTERIOR PARA BORRAR O MOVER):
    forkJoin({
      carpetaNueva: archivo || conservarArchivo ? this.carpetaDeEquipo(equipoIngeniero) : of(null),
      carpetaAnterior: nombreActual ? this.carpetaDeEquipo(equipoAnterior) : of(null)
    }).pipe(
      switchMap(({ carpetaNueva, carpetaAnterior }) => {
        if (archivo && !carpetaNueva) throw new Error('SIN CARPETA');
        let subida$: Observable<unknown> = of(null);
        if (archivo && carpetaNueva) {
          //NOMBRE DEL ARCHIVO: ID DEL REGISTRO ENCRIPTADO + EXTENSIÓN (SI YA TENÍA UNO CON ESE NOMBRE EN LA MISMA CARPETA, SE SOBRESCRIBE):
          nombreNuevo = this.nombreArchivoEncriptado(Number(historial.idHistorialMantenimientoEquipoIngeniero), archivo);
          historial.nombreArchivoDocumentoAnexoContratoMttoEquipIng = nombreNuevo;
          const ruta = carpetaNueva + nombreNuevo;
          const sobrescribe = nombreNuevo === nombreActual && carpetaNueva === carpetaAnterior;
          subida$ = this.gestionArchivosService.uploadFile(archivo, ruta).pipe(map(() => { if (!sobrescribe) rutaSubida = ruta; }));
        }
        return subida$.pipe(map(() => ({ carpetaNueva, carpetaAnterior })));
      })
    ).subscribe({
      next: ({ carpetaNueva, carpetaAnterior }) => {
        this.historialMantenimientosEquipIngService.updateEngineerEquipmentMaintenanceHistory(historial).subscribe({
          next: (respuesta) => {
            if (respuesta?.banderaexito === false) {
              this.revertirSubida(rutaSubida);
              this.enviando = false;
              this.mostrarToast('error', respuesta.mensaje || 'No se pudo guardar el mantenimiento del equipo de ingenieros.');
              return;
            }
            //ARCHIVO ANTERIOR: SE BORRA SI SE QUITÓ O SI SE REEMPLAZÓ POR UNO EN OTRA RUTA (CON LA MISMA RUTA YA QUEDÓ SOBRESCRITO); SE
            //MUEVE SI SE CONSERVÓ PERO CAMBIÓ LA CARPETA DE LA UNIDAD MILITAR:
            const mismaRuta = !!archivo && nombreNuevo === nombreActual && carpetaNueva === carpetaAnterior;
            let ajusteArchivo$: Observable<unknown> = of(null);
            if ((archivo || quitarArchivo) && carpetaAnterior && !mismaRuta) {
              ajusteArchivo$ = this.borrarArchivoSinUso(carpetaAnterior, nombreActual);
            } else if (conservarArchivo && carpetaAnterior && carpetaNueva && carpetaAnterior !== carpetaNueva) {
              ajusteArchivo$ = this.gestionArchivosService.moveFile({ sourcePath: carpetaAnterior + nombreActual, destinationPath: carpetaNueva + nombreActual }).pipe(
                catchError(err => {
                  console.error('ERROR AL MOVER EL DOCUMENTO ANEXO A LA CARPETA DE LA NUEVA UNIDAD MILITAR: ', err);
                  return of(null);
                })
              );
            }
            ajusteArchivo$.subscribe(() => this.terminarGuardado(respuesta?.mensaje, esModificacion));
          },
          error: (err) => {
            this.revertirSubida(rutaSubida);
            this.enviando = false;
            console.error('ERROR AL MODIFICAR HISTORIAL DE MANTENIMIENTO DE EQUIPO DE INGENIEROS: ', err);
            this.mostrarToast('error', err.error?.mensaje || 'Error al modificar el mantenimiento del equipo de ingenieros.');
          }
        });
      },
      error: (err) => {
        console.error('ERROR AL SUBIR EL DOCUMENTO ANEXO DEL CONTRATO DE MANTENIMIENTO: ', err);
        this.enviando = false;
        this.mostrarToast('error', err?.message === 'SIN CARPETA'
          ? 'No se pudo determinar la carpeta de los documentos (revise los parámetros del sistema y la carpeta de la unidad militar).'
          : 'No se pudo subir el documento anexo al servidor de archivos.');
      }
    });
  }

  //CREACIÓN CON DOCUMENTO ANEXO — MISMO ORDEN QUE LA FOTO DE UNA UNIDAD MILITAR NUEVA: 1) SE CREA EL REGISTRO SIN ARCHIVO, 2) SE OBTIENE
  //SU ID, 3) SE SUBE EL ARCHIVO CON EL ID ENCRIPTADO COMO NOMBRE Y 4) SE ACTUALIZA EL REGISTRO CON ESE NOMBRE:
  private crearConArchivo(historial: HistorialMantenimientosEquipIngI, equipoIngeniero: EquiposIngenierosI, archivo: File | null): void {
    historial.nombreArchivoDocumentoAnexoContratoMttoEquipIng = null;
    this.historialMantenimientosEquipIngService.addEngineerEquipmentMaintenanceHistory(historial).subscribe({
      next: (respuesta) => {
        if (respuesta?.banderaexito === false) {
          this.enviando = false;
          this.mostrarToast('error', respuesta.mensaje || 'No se pudo guardar el mantenimiento del equipo de ingenieros.');
          return;
        }
        if (!archivo) {
          this.terminarGuardado(respuesta?.mensaje, false);
          return;
        }
        let rutaSubida = '';
        forkJoin({ carpeta: this.carpetaDeEquipo(equipoIngeniero), creado: this.obtenerRegistroCreado(equipoIngeniero) }).pipe(
          switchMap(({ carpeta, creado }) => {
            if (!carpeta) throw new Error('SIN CARPETA');
            const nombre = this.nombreArchivoEncriptado(Number(creado.idHistorialMantenimientoEquipoIngeniero), archivo);
            rutaSubida = carpeta + nombre;
            return this.gestionArchivosService.uploadFile(archivo, rutaSubida).pipe(
              switchMap(() => this.historialMantenimientosEquipIngService.updateEngineerEquipmentMaintenanceHistory({ ...creado, nombreArchivoDocumentoAnexoContratoMttoEquipIng: nombre })),
              map(actualizado => { if (actualizado?.banderaexito === false) throw new Error(actualizado.mensaje); })
            );
          })
        ).subscribe({
          next: () => this.terminarGuardado(respuesta?.mensaje, false),
          error: (err) => {
            console.error('ERROR AL ASOCIAR EL DOCUMENTO ANEXO AL MANTENIMIENTO CREADO: ', err);
            if (rutaSubida) this.revertirSubida(rutaSubida);
            this.terminarGuardado('El mantenimiento se creó, pero no se pudo guardar su documento anexo. Modifíquelo desde el historial para adjuntarlo de nuevo.', false, 'error');
          }
        });
      },
      error: (err) => {
        this.enviando = false;
        console.error('ERROR AL CREAR HISTORIAL DE MANTENIMIENTO DE EQUIPO DE INGENIEROS: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al crear el mantenimiento del equipo de ingenieros.');
      }
    });
  }

  //EL BACKEND NO DEVUELVE EL REGISTRO CREADO: SE BUSCA EL ÚLTIMO MANTENIMIENTO DEL EQUIPO (EL DE MAYOR ID), QUE ES EL QUE SE ACABA DE CREAR:
  private obtenerRegistroCreado(equipoIngeniero: EquiposIngenierosI): Observable<HistorialMantenimientosEquipIngI> {
    const idEquipoIngeniero = Number(equipoIngeniero.idEquipoIngeniero);
    return this.historialMantenimientosEquipIngService.findAllEngineerEquipmentMaintenanceHistories(undefined, undefined, 'idHistorialMantenimientoEquipoIngeniero', 'DESC').pipe(
      map(registros => {
        const creado = (registros ?? []).find(registro => Number(registro.equipoIngenieroDTO?.idEquipoIngeniero) === idEquipoIngeniero);
        if (!creado?.idHistorialMantenimientoEquipoIngeniero) throw new Error('NO SE ENCONTRÓ EL REGISTRO CREADO');
        return creado;
      })
    );
  }

  private terminarGuardado(mensaje: string | undefined, esModificacion: boolean, tipo: 'exito' | 'error' = 'exito'): void {
    this.enviando = false;
    if (esModificacion) {
      this.regresarAlListado(mensaje || 'Mantenimiento de equipo de ingenieros modificado correctamente.');
      return;
    }
    //CREACIÓN: SE QUEDA EN EL FORMULARIO, LIMPIO, PARA REGISTRAR EL SIGUIENTE MANTENIMIENTO:
    this.mostrarToast(tipo, mensaje || 'Mantenimiento de equipo de ingenieros creado correctamente.');
    this.historialMantenimientoEquipoIngenieroData = null;
    this.initForm();
  }

  //ANTES DE BORRAR UN ARCHIVO SE VERIFICA QUE NINGÚN OTRO MANTENIMIENTO LO SIGA USANDO; SI NO SE PUEDE VERIFICAR, NO SE BORRA
  //— MISMO CRITERIO QUE LA DOCUMENTACIÓN ANEXA DE SOLICITUDES:
  private borrarArchivoSinUso(carpeta: string, nombre: string): Observable<unknown> {
    if (!nombre) return of(null);
    return this.historialMantenimientosEquipIngService.findAllEngineerEquipmentMaintenanceHistories().pipe(
      switchMap(registros => {
        const enUso = (registros ?? []).some(registro => String(registro.nombreArchivoDocumentoAnexoContratoMttoEquipIng ?? '').trim() === nombre);
        return enUso ? of(null) : this.gestionArchivosService.deleteFile({ filePath: carpeta + nombre });
      }),
      catchError(err => {
        console.error('ERROR AL BORRAR EL DOCUMENTO ANEXO DEL CONTRATO DE MANTENIMIENTO: ', nombre, err);
        return of(null);
      })
    );
  }

  private revertirSubida(ruta: string | null): void {
    if (!ruta) return;
    this.gestionArchivosService.deleteFile({ filePath: ruta }).subscribe({
      error: err => console.error('ERROR AL LIMPIAR EL DOCUMENTO ANEXO NO ASOCIADO: ', ruta, err)
    });
  }

  //ELIMINA EL REGISTRO CARGADO (Y SU DOCUMENTO ANEXO DEL SERVIDOR DE ARCHIVOS) Y REGRESA AL LISTADO DEL HISTORIAL:
  confirmarEliminar(): void {
    const idHistorialMantenimientoEquipoIngeniero = Number(this.historialesMantenimientosEquiposIngenierosForm.getRawValue().idHistorialMantenimientoEquipoIngeniero);
    if (!idHistorialMantenimientoEquipoIngeniero || this.enviando) return;
    const nombreActual = this.nombreArchivoActual;
    const equipoAnterior = this.historialMantenimientoEquipoIngenieroData?.equipoIngenieroDTO;
    this.enviando = true;
    this.changeDetectorRef.markForCheck();
    this.historialMantenimientosEquipIngService.deleteEngineerEquipmentMaintenanceHistory(idHistorialMantenimientoEquipoIngeniero).subscribe({
      next: (respuesta) => {
        if (respuesta?.banderaexito === false) {
          this.enviando = false;
          this.mostrarToast('error', respuesta.mensaje || 'No se pudo eliminar el mantenimiento del equipo de ingenieros.');
          return;
        }
        const borrado$ = nombreActual
          ? this.carpetaDeEquipo(equipoAnterior).pipe(switchMap(carpeta => carpeta ? this.borrarArchivoSinUso(carpeta, nombreActual) : of(null)))
          : of(null);
        borrado$.subscribe(() => {
          this.enviando = false;
          this.regresarAlListado(respuesta?.mensaje || 'Mantenimiento de equipo de ingenieros eliminado correctamente.');
        });
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
