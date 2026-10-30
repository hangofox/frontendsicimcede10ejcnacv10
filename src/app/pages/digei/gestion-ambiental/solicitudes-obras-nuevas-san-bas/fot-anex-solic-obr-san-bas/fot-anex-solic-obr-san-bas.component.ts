import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { FotografiasAnexasSolicInfraestI, FotografiasAnexasSolicInfraestMsj } from '../../../../../interfaces/digei/solicitudes-infraestructuras/fot-anex-solic-infraest/fot-anex-solic-infraest.interface';
import { FotografiasAnexasSolicInfraestService } from '../../../../../services/digei/solicitudes-infraestructuras/fot-anex-solic-infraest/fot-anex-solic-infraest.service';
import { ParametrosSistemaService } from '../../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { GestionArchivosService } from '../../../../../services/gestion-archivos/gestion-archivos.service';

//CAMPO DEL REGISTRO (COLUMNA DE LA TABLA TABLA_FOTOGRAFIAS_ANEXAS_SOLIC_INFRAEST) QUE GUARDA EL NOMBRE DE CADA FOTOGRAFÍA:
type CampoFotografia =
  'nombreArchivoFotoExtensionOFormatoPosibLocEdifSolicInfraest' |
  'nombreArchivoFotoExtensionOFormatoVistaPanGrSolicInfraest' |
  'nombreArchivoFotoExtensionOFormatoVistaSolicInfraest1' |
  'nombreArchivoFotoExtensionOFormatoVistaSolicInfraest2' |
  'nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest1' |
  'nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest2' |
  'nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest1' |
  'nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest2';

//DEFINICIÓN DE CADA UNA DE LAS OCHO FOTOGRAFÍAS, EN EL ORDEN DE LAS COLUMNAS DE LA TABLA:
interface DefinicionFotografia {
  numero: number;
  campo: CampoFotografia;
  titulo: string;
  //PARTE DEL NOMBRE DEL ARCHIVO QUE IDENTIFICA LA FOTOGRAFÍA (MISMO FORMATO DE LOS NOMBRES YA REGISTRADOS, EJ. "FOTO_UBIC_..."):
  codigo: string;
}

//ESTADO DE CADA RANURA DE FOTOGRAFÍA EN PANTALLA:
interface RanuraFotografia extends DefinicionFotografia {
  //NOMBRE DEL ARCHIVO YA GUARDADO EN EL REGISTRO (VACÍO SI LA RANURA NO TIENE FOTOGRAFÍA):
  nombreArchivo: string;
  //ARCHIVO ELEGIDO EN EL EQUIPO Y AÚN NO SUBIDO:
  archivoSeleccionado: File | null;
  //LA FOTOGRAFÍA GUARDADA SE MARCÓ PARA QUITARLA AL GUARDAR:
  eliminada: boolean;
  previewUrl: string | null;
  //LA FOTOGRAFÍA ESTÁ REGISTRADA PERO NO SE ENCONTRÓ EL ARCHIVO EN EL SERVIDOR DE ARCHIVOS:
  noEncontrada: boolean;
  mensajeError: string;
}

//ARCHIVO SUBIDO AL GUARDAR (PARA BORRARLO SI EL REGISTRO NO SE PUEDE GUARDAR):
interface FotografiaSubida {
  numero: number;
  ruta: string;
}

@Component({
  selector: 'app-fot-anex-solic-obr-san-bas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fot-anex-solic-obr-san-bas.component.html',
  styleUrl: './fot-anex-solic-obr-san-bas.component.scss'
})
export class FotAnexSolicObrSbComponent implements OnChanges, OnDestroy {
  //SOLICITUD DESDE LA QUE SE ABREN LAS FOTOGRAFÍAS ANEXAS (MODAL DEL LISTADO DE SOLICITUDES). EL BACKEND SOLO PERMITE UN REGISTRO
  //DE FOTOGRAFÍAS ANEXAS POR SOLICITUD, CON OCHO FOTOGRAFÍAS:
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;

  //MISMAS RESTRICCIONES DE ARCHIVO QUE LAS FOTOGRAFÍAS ANEXAS DE APOYOS (FotAnexApoyAtencPrevEmergDesComponent):
  private static readonly EXTENSIONES_PERMITIDAS = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
  private static readonly TAMANO_MAXIMO_BYTES = 2_000_000; //2.0 MB.
  private static readonly DEFINICIONES: DefinicionFotografia[] = [
    { numero: 1, campo: 'nombreArchivoFotoExtensionOFormatoPosibLocEdifSolicInfraest', titulo: 'Posible localización de la edificación', codigo: 'UBIC' },
    { numero: 2, campo: 'nombreArchivoFotoExtensionOFormatoVistaPanGrSolicInfraest', titulo: 'Vista panorámica general', codigo: 'PANORAMICA' },
    { numero: 3, campo: 'nombreArchivoFotoExtensionOFormatoVistaSolicInfraest1', titulo: 'Vista 1', codigo: 'VISTA_01' },
    { numero: 4, campo: 'nombreArchivoFotoExtensionOFormatoVistaSolicInfraest2', titulo: 'Vista 2', codigo: 'VISTA_02' },
    { numero: 5, campo: 'nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest1', titulo: 'Acercamiento de detalle 1', codigo: 'ACERC_DET_01' },
    { numero: 6, campo: 'nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest2', titulo: 'Acercamiento de detalle 2', codigo: 'ACERC_DET_02' },
    { numero: 7, campo: 'nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest1', titulo: 'Fotografía adicional 1', codigo: 'ADIC_01' },
    { numero: 8, campo: 'nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest2', titulo: 'Fotografía adicional 2', codigo: 'ADIC_02' }
  ];
  readonly totalRanuras = FotAnexSolicObrSbComponent.DEFINICIONES.length;

  ranuras: RanuraFotografia[] = this.crearRanurasVacias();
  //REGISTRO DE FOTOGRAFÍAS ANEXAS DE LA SOLICITUD (null SI LA SOLICITUD AÚN NO TIENE; AL GUARDAR SE CREA):
  registro: FotografiasAnexasSolicInfraestI | null = null;
  cargando = false;
  guardando = false;
  //RANURA CUYA FOTOGRAFÍA GUARDADA SE VA A QUITAR (CONFIRMACIÓN EN PANTALLA):
  ranuraPorEliminar: RanuraFotografia | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;
  //IDENTIFICA LA CARGA EN CURSO: SI SE CAMBIA DE SOLICITUD MIENTRAS LLEGAN LAS FOTOGRAFÍAS DE LA ANTERIOR, ESAS SE DESCARTAN:
  private solicitudCarga = 0;

  constructor(
    private readonly service: FotografiasAnexasSolicInfraestService,
    private readonly parametrosSistemaService: ParametrosSistemaService,
    private readonly unidadesMilitaresService: UnidadesMilitaresService,
    private readonly gestionArchivosService: GestionArchivosService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  //HAY CAMBIOS SIN GUARDAR CUANDO ALGUNA RANURA TIENE UN ARCHIVO NUEVO O UNA FOTOGRAFÍA MARCADA PARA QUITAR:
  get hayCambios(): boolean {
    return this.ranuras.some(ranura => !!ranura.archivoSeleccionado || ranura.eliminada);
  }

  get totalFotografias(): number {
    return this.ranuras.filter(ranura => !!ranura.archivoSeleccionado || (!!ranura.nombreArchivo && !ranura.eliminada)).length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitudInfraestructura']) this.cargar();
  }

  ngOnDestroy(): void {
    this.ranuras.forEach(ranura => this.liberarPreview(ranura));
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  private crearRanurasVacias(): RanuraFotografia[] {
    return FotAnexSolicObrSbComponent.DEFINICIONES.map(definicion => ({ ...definicion, nombreArchivo: '', archivoSeleccionado: null, eliminada: false, previewUrl: null, noEncontrada: false, mensajeError: '' }));
  }

  //NOMBRE DEL ARCHIVO GUARDADO EN LA COLUMNA DE LA FOTOGRAFÍA DEL REGISTRO:
  private nombreArchivoRegistro(registro: FotografiasAnexasSolicInfraestI | null, campo: CampoFotografia): string {
    if (!registro) return '';
    return String(registro[campo] ?? '').trim();
  }

  //CARPETA DEL SERVIDOR DE ARCHIVOS DONDE VAN LAS FOTOGRAFÍAS DE LA SOLICITUD: CARPETA PRINCIPAL + RUTA DE FOTOGRAFÍAS ANEXAS DE
  //SOLICITUDES (PARÁMETROS DEL SISTEMA) + CARPETA DE LA UNIDAD MILITAR DE LA SOLICITUD — MISMO PATRÓN QUE LAS FOTOGRAFÍAS DE APOYOS.
  //SI LA SOLICITUD NO TRAE LA CARPETA DE SU UNIDAD MILITAR, SE CONSULTA LA UNIDAD MILITAR POR SU SIGLA O ACRÓNIMO:
  private obtenerCarpetaFotografias(): Observable<string> {
    const unidadMilitar = this.solicitudInfraestructura?.unidadMilitarDTO;
    const carpetaUnidad$ = String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim()
      ? of(String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar).trim())
      : this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(String(unidadMilitar?.siglaoAcronimoUnidadMilitar || '').trim()).pipe(
          map(({ unidadMilitarDTO }) => String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim())
        );
    return forkJoin({ parametros: this.parametrosSistemaService.getSystemParameterbyId(1), carpetaUnidad: carpetaUnidad$ }).pipe(
      map(({ parametros, carpetaUnidad }) => {
        const parametrosSistemaDTO = parametros.parametrosSistemaDTO;
        const rutaFotografias = String(parametrosSistemaDTO?.rutaDestinoArchivosFotografiasAnexasSolicInfraest || '').trim();
        if (!rutaFotografias) throw new Error('SIN RUTA DE FOTOGRAFÍAS ANEXAS DE SOLICITUDES EN LOS PARÁMETROS DEL SISTEMA');
        if (!carpetaUnidad) throw new Error('SIN CARPETA DE ALMACENAMIENTO DE LA UNIDAD MILITAR DE LA SOLICITUD');
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim() + rutaFotografias;
        const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
        return `${baseNormalizada}${carpetaUnidad.replace(/^[\\/]+|[\\/]+$/g, '')}/`;
      })
    );
  }

  //CARGA EL REGISTRO DE FOTOGRAFÍAS DE LA SOLICITUD Y LA VISTA PREVIA DE CADA FOTOGRAFÍA GUARDADA:
  cargar(): void {
    const solicitud = ++this.solicitudCarga;
    this.ranuras.forEach(ranura => this.liberarPreview(ranura));
    this.ranuras = this.crearRanurasVacias();
    this.registro = null;
    const idSolicitudInfraestructura = this.solicitudInfraestructura?.idSolicitudInfraestructura;
    if (!idSolicitudInfraestructura) return;
    this.cargando = true;
    this.service.findAllAttachedPhotographsOfInfrastructureRequests(undefined, idSolicitudInfraestructura).subscribe({
      next: registros => {
        if (solicitud !== this.solicitudCarga) return;
        this.registro = registros[0] ?? null;
        this.ranuras.forEach(ranura => ranura.nombreArchivo = this.nombreArchivoRegistro(this.registro, ranura.campo));
        this.cargando = false;
        this.cdr.markForCheck();
        if (this.ranuras.some(ranura => !!ranura.nombreArchivo)) this.cargarPreviews(solicitud);
      },
      error: err => {
        if (solicitud !== this.solicitudCarga) return;
        console.error('ERROR AL CARGAR LAS FOTOGRAFÍAS ANEXAS DE LA SOLICITUD: ', err);
        this.cargando = false;
        this.mostrarToast('error', 'No se pudieron cargar las fotografías anexas de la solicitud.');
      }
    });
  }

  //TRAE CADA FOTOGRAFÍA GUARDADA DEL SERVIDOR DE ARCHIVOS (getFile + getFileBytes, CON EL TOKEN DE AUTORIZACIÓN) Y LA MUESTRA.
  //LAS OCHO SE PIDEN UNA DETRÁS DE OTRA (concatMap) Y NO EN PARALELO: EL BACKEND REGISTRA CADA RUTA ESTÁTICA EN UN MAPA EN MEMORIA
  //Y CON MUCHAS PETICIONES SIMULTÁNEAS ALGUNAS FOTOGRAFÍAS EXISTENTES QUEDABAN COMO "NO ENCONTRADAS":
  private cargarPreviews(solicitud: number): void {
    this.obtenerCarpetaFotografias().subscribe({
      next: carpeta => {
        from(this.ranuras.filter(ranura => !!ranura.nombreArchivo && !ranura.archivoSeleccionado && !ranura.eliminada)).pipe(
          concatMap(ranura => this.gestionArchivosService.getFile(carpeta + ranura.nombreArchivo).pipe(
            concatMap(({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica)),
            map(bytes => ({ ranura, bytes: bytes as Blob | null })),
            catchError(err => {
              console.error('ERROR AL CARGAR LA FOTOGRAFÍA ANEXA DE LA SOLICITUD: ', carpeta + ranura.nombreArchivo, err);
              return of({ ranura, bytes: null as Blob | null });
            })
          ))
        ).subscribe(({ ranura, bytes }) => {
          if (!bytes) {
            this.marcarNoEncontrada(ranura, solicitud);
            return;
          }
          if (solicitud !== this.solicitudCarga || ranura.archivoSeleccionado) return;
          this.liberarPreview(ranura);
          ranura.previewUrl = URL.createObjectURL(bytes);
          this.cdr.markForCheck();
        });
      },
      error: err => {
        console.error('ERROR AL OBTENER LA CARPETA DE LAS FOTOGRAFÍAS ANEXAS DE LA SOLICITUD: ', err);
        this.ranuras.filter(ranura => !!ranura.nombreArchivo).forEach(ranura => this.marcarNoEncontrada(ranura, solicitud));
      }
    });
  }

  private marcarNoEncontrada(ranura: RanuraFotografia, solicitud: number): void {
    if (solicitud !== this.solicitudCarga) return;
    ranura.noEncontrada = true;
    this.cdr.markForCheck();
  }

  private liberarPreview(ranura: RanuraFotografia): void {
    if (ranura.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(ranura.previewUrl);
    ranura.previewUrl = null;
  }

  //VALIDA EL ARCHIVO ELEGIDO (EXTENSIÓN Y TAMAÑO, IGUAL QUE LAS FOTOGRAFÍAS DE APOYOS) Y MUESTRA SU VISTA PREVIA LOCAL:
  onSeleccionarArchivo(ranura: RanuraFotografia, event: Event): void {
    ranura.mensajeError = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    if (file.size > FotAnexSolicObrSbComponent.TAMANO_MAXIMO_BYTES) {
      ranura.mensajeError = 'El archivo excede el tamaño máximo permitido de 2.0 MB.';
      return;
    }
    if (!FotAnexSolicObrSbComponent.EXTENSIONES_PERMITIDAS.includes(extension)) {
      ranura.mensajeError = 'El archivo debe tener una extensión válida (jpg, jpeg, bmp, png o gif).';
      return;
    }
    this.liberarPreview(ranura);
    ranura.archivoSeleccionado = file;
    ranura.eliminada = false;
    ranura.noEncontrada = false;
    ranura.previewUrl = URL.createObjectURL(file);
  }

  //DESCARTA EL ARCHIVO ELEGIDO Y VUELVE A MOSTRAR LA FOTOGRAFÍA GUARDADA (SI LA HAY):
  onQuitarArchivoSeleccionado(ranura: RanuraFotografia): void {
    ranura.archivoSeleccionado = null;
    ranura.mensajeError = '';
    this.liberarPreview(ranura);
    if (ranura.nombreArchivo && !ranura.eliminada) this.cargarPreviews(this.solicitudCarga);
  }

  confirmarEliminarFotografia(ranura: RanuraFotografia): void { this.ranuraPorEliminar = ranura; }
  noEliminarFotografia(): void { this.ranuraPorEliminar = null; }

  //LA FOTOGRAFÍA GUARDADA SOLO SE MARCA; EL ARCHIVO SE BORRA DEL SERVIDOR CUANDO EL REGISTRO SE GUARDA SIN ELLA:
  siEliminarFotografia(): void {
    const ranura = this.ranuraPorEliminar;
    this.ranuraPorEliminar = null;
    if (!ranura) return;
    ranura.eliminada = true;
    ranura.noEncontrada = false;
    this.liberarPreview(ranura);
  }

  //DESHACE LOS CAMBIOS SIN GUARDAR Y VUELVE A CARGAR LAS FOTOGRAFÍAS GUARDADAS:
  descartarCambios(): void { this.cargar(); }

  //FECHA Y HORA LOCAL ACTUAL SIN SEPARADORES (yyyyMMddHHmmss), COMO EN LOS NÚMEROS DE REGISTRO DEL BACKEND:
  private obtenerMarcaTiempo(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    return `${ahora.getFullYear()}${dosDigitos(ahora.getMonth() + 1)}${dosDigitos(ahora.getDate())}${dosDigitos(ahora.getHours())}${dosDigitos(ahora.getMinutes())}${dosDigitos(ahora.getSeconds())}`;
  }

  //NOMBRE DEL ARCHIVO NUEVO: "FOTO_SOLIC_" + ID DE LA SOLICITUD + SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR + CÓDIGO DE LA FOTOGRAFÍA
  //(UBIC, PANORAMICA, VISTA_01...) + FECHA Y HORA, SIGUIENDO EL FORMATO DE LOS NOMBRES YA REGISTRADOS (EJ. "FOTO_UBIC_CAOCC_ALOJ_TROPA.jpg").
  //LA FECHA Y HORA EVITA QUE EL NAVEGADOR MUESTRE UNA FOTOGRAFÍA ANTERIOR GUARDADA EN CACHÉ CON EL MISMO NOMBRE:
  private nombreArchivoNuevo(ranura: RanuraFotografia, archivo: File, marcaTiempo: string): string {
    const extension = (archivo.name.split('.').pop() || '').toLowerCase();
    const siglaoAcronimo = String(this.solicitudInfraestructura?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim().toUpperCase().replace(/[^A-Z0-9]+/g, '');
    return `FOTO_SOLIC_${this.solicitudInfraestructura?.idSolicitudInfraestructura}_${siglaoAcronimo}_${ranura.codigo}_${marcaTiempo}.${extension}`;
  }

  //1) SUBE LOS ARCHIVOS NUEVOS, 2) CREA O MODIFICA EL REGISTRO CON LOS NOMBRES FINALES Y 3) BORRA LOS ARCHIVOS REEMPLAZADOS O QUITADOS.
  //SI EL REGISTRO NO SE PUEDE GUARDAR, SE BORRAN LOS ARCHIVOS RECIÉN SUBIDOS PARA NO DEJARLOS HUÉRFANOS — MISMO ORDEN QUE LAS
  //FOTOGRAFÍAS DE APOYOS:
  guardar(): void {
    const solicitudInfraestructura = this.solicitudInfraestructura;
    if (!solicitudInfraestructura || this.guardando || !this.hayCambios) return;
    this.guardando = true;
    this.obtenerCarpetaFotografias().subscribe({
      next: carpeta => this.subirYGuardar(solicitudInfraestructura, carpeta),
      error: err => {
        console.error('ERROR AL OBTENER LA CARPETA DE LAS FOTOGRAFÍAS ANEXAS DE LA SOLICITUD: ', err);
        this.guardando = false;
        this.mostrarToast('error', 'No se pudo determinar la carpeta de las fotografías (revise los parámetros del sistema y la carpeta de la unidad militar).');
      }
    });
  }

  private subirYGuardar(solicitudInfraestructura: SolicitudesInfraestructurasI, carpeta: string): void {
    const marcaTiempo = this.obtenerMarcaTiempo();
    const nombresFinales = new Map<CampoFotografia, string | null>();
    const subidas: FotografiaSubida[] = [];
    const porSubir: Observable<FotografiaSubida>[] = [];
    this.ranuras.forEach(ranura => {
      if (ranura.archivoSeleccionado) {
        const nombre = this.nombreArchivoNuevo(ranura, ranura.archivoSeleccionado, marcaTiempo);
        const subida: FotografiaSubida = { numero: ranura.numero, ruta: carpeta + nombre };
        nombresFinales.set(ranura.campo, nombre);
        porSubir.push(this.gestionArchivosService.uploadFile(ranura.archivoSeleccionado, subida.ruta).pipe(map(() => {
          subidas.push(subida);
          return subida;
        })));
      } else {
        nombresFinales.set(ranura.campo, ranura.eliminada || !ranura.nombreArchivo ? null : ranura.nombreArchivo);
      }
    });
    //ARCHIVOS GUARDADOS QUE SE REEMPLAZAN O SE QUITAN (SE BORRAN SOLO SI EL REGISTRO SE GUARDA BIEN):
    const porBorrar = this.ranuras
      .filter(ranura => !!ranura.nombreArchivo && (ranura.eliminada || !!ranura.archivoSeleccionado))
      .map(ranura => carpeta + ranura.nombreArchivo);

    (porSubir.length ? forkJoin(porSubir) : of([])).subscribe({
      next: () => {
        const registro: FotografiasAnexasSolicInfraestI = {
          idFotografiasAnexasSolicInfraest: this.registro?.idFotografiasAnexasSolicInfraest,
          solicitudInfraestructuraDTO: solicitudInfraestructura,
          nombreArchivoFotoExtensionOFormatoPosibLocEdifSolicInfraest: nombresFinales.get('nombreArchivoFotoExtensionOFormatoPosibLocEdifSolicInfraest') ?? null,
          nombreArchivoFotoExtensionOFormatoVistaPanGrSolicInfraest: nombresFinales.get('nombreArchivoFotoExtensionOFormatoVistaPanGrSolicInfraest') ?? null,
          nombreArchivoFotoExtensionOFormatoVistaSolicInfraest1: nombresFinales.get('nombreArchivoFotoExtensionOFormatoVistaSolicInfraest1') ?? null,
          nombreArchivoFotoExtensionOFormatoVistaSolicInfraest2: nombresFinales.get('nombreArchivoFotoExtensionOFormatoVistaSolicInfraest2') ?? null,
          nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest1: nombresFinales.get('nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest1') ?? null,
          nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest2: nombresFinales.get('nombreArchivoFotoExtensionOFormatoAcercDetSolicInfraest2') ?? null,
          nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest1: nombresFinales.get('nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest1') ?? null,
          nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest2: nombresFinales.get('nombreArchivoFotoExtensionOFormatoFotAdicSolicInfraest2') ?? null
        };
        const guardar$ = registro.idFotografiasAnexasSolicInfraest
          ? this.service.updateAttachedPhotographsOfInfrastructureRequest(registro)
          : this.service.addAttachedPhotographsOfInfrastructureRequest(registro);
        guardar$.subscribe({
          next: respuesta => this.procesarRespuesta(respuesta, subidas, porBorrar),
          error: err => {
            console.error('ERROR AL GUARDAR LAS FOTOGRAFÍAS ANEXAS DE LA SOLICITUD: ', err);
            this.revertirSubidas(subidas);
            this.guardando = false;
            this.mostrarToast('error', err.error?.mensaje || 'Error al guardar las fotografías anexas de la solicitud.');
          }
        });
      },
      error: err => {
        console.error('ERROR AL SUBIR LAS FOTOGRAFÍAS ANEXAS DE LA SOLICITUD: ', err);
        this.revertirSubidas(subidas);
        this.guardando = false;
        this.mostrarToast('error', 'No se pudieron subir las fotografías al servidor de archivos.');
      }
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. YA EXISTE UN REGISTRO DE FOTOGRAFÍAS PARA LA SOLICITUD):
  private procesarRespuesta(respuesta: FotografiasAnexasSolicInfraestMsj, subidas: FotografiaSubida[], porBorrar: string[]): void {
    if (respuesta.banderaexito === false) {
      this.revertirSubidas(subidas);
      this.guardando = false;
      this.mostrarToast('error', respuesta.mensaje || 'No se pudieron guardar las fotografías anexas de la solicitud.');
      return;
    }
    const borrados = porBorrar.map(ruta => this.gestionArchivosService.deleteFile({ filePath: ruta }).pipe(
      catchError(err => {
        console.error('ERROR AL BORRAR LA FOTOGRAFÍA ANTERIOR DE LA SOLICITUD: ', ruta, err);
        return of(null);
      })
    ));
    (borrados.length ? forkJoin(borrados) : of([])).subscribe(() => {
      this.guardando = false;
      this.mostrarToast('exito', respuesta.mensaje || 'Fotografías anexas de la solicitud guardadas correctamente.');
      this.cargar();
    });
  }

  private revertirSubidas(subidas: FotografiaSubida[]): void {
    subidas.forEach(subida => this.gestionArchivosService.deleteFile({ filePath: subida.ruta }).subscribe({
      error: err => console.error('ERROR AL LIMPIAR LA FOTOGRAFÍA NO ASOCIADA: ', subida.ruta, err)
    }));
  }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTipo = tipo;
    this.toast = mensaje;
    this.cdr.markForCheck();
    this.toastTimer = setTimeout(() => {
      this.toast = '';
      this.cdr.markForCheck();
    }, 4000);
  }
}
