import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApoyosAtencPrevEmergDesastI } from '../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { FotografiasAnexasApoyAtencPrevEmergDesastI, FotografiasAnexasApoyAtencPrevEmergDesastMsj } from '../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/fot_anex_apoy_atenc_prev_emerg_des/fot_anex_apoy_atenc_prev_emerg_des.interface';
import { FotografiasAnexasApoyAtencPrevEmergDesastService } from '../../../../services/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/fot_anex_apoy_atenc_prev_emerg_des/fot_anex_apoy_atenc_prev_emerg_des.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

//NÚMERO DE CADA UNA DE LAS CUATRO FOTOGRAFÍAS (COLUMNAS ..._APOY_ATENC_PREV_EMERG_DESAST1 A 4 DE LA TABLA):
type NumeroFotografia = 1 | 2 | 3 | 4;

//ESTADO DE CADA RANURA DE FOTOGRAFÍA EN PANTALLA:
interface RanuraFotografia {
  numero: NumeroFotografia;
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
  numero: NumeroFotografia;
  ruta: string;
}

@Component({
  selector: 'app-fotog-anex-apoy-atenc-prev-emerg-des',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fotog_anex_apoy_atenc_prev_emerg_des.component.html',
  styleUrl: './fotog_anex_apoy_atenc_prev_emerg_des.component.scss'
})
export class FotogAnexApoyAtencPrevEmergDesComponent implements OnChanges, OnDestroy {
  //APOYO DESDE EL QUE SE ABREN LAS FOTOGRAFÍAS ANEXAS (MODAL DEL LISTADO DE APOYOS). EL BACKEND SOLO PERMITE UN REGISTRO
  //DE FOTOGRAFÍAS ANEXAS POR APOYO, CON CUATRO FOTOGRAFÍAS:
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;

  //MISMAS RESTRICCIONES DE ARCHIVO QUE LA FOTO DE AddUpdDelResponsableComponent:
  private static readonly EXTENSIONES_PERMITIDAS = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
  private static readonly TAMANO_MAXIMO_BYTES = 2_000_000; //2.0 MB.
  private static readonly NUMEROS: NumeroFotografia[] = [1, 2, 3, 4];

  ranuras: RanuraFotografia[] = this.crearRanurasVacias();
  //REGISTRO DE FOTOGRAFÍAS ANEXAS DEL APOYO (null SI EL APOYO AÚN NO TIENE; AL GUARDAR SE CREA):
  registro: FotografiasAnexasApoyAtencPrevEmergDesastI | null = null;
  cargando = false;
  guardando = false;
  //RANURA CUYA FOTOGRAFÍA GUARDADA SE VA A QUITAR (CONFIRMACIÓN EN PANTALLA):
  ranuraPorEliminar: RanuraFotografia | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;
  //IDENTIFICA LA CARGA EN CURSO: SI SE CAMBIA DE APOYO MIENTRAS LLEGAN LAS FOTOGRAFÍAS DEL ANTERIOR, ESAS SE DESCARTAN:
  private solicitudCarga = 0;

  constructor(
    private readonly service: FotografiasAnexasApoyAtencPrevEmergDesastService,
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
    if (changes['apoyoAtencPrevEmergDesast']) this.cargar();
  }

  ngOnDestroy(): void {
    this.ranuras.forEach(ranura => this.liberarPreview(ranura));
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  private crearRanurasVacias(): RanuraFotografia[] {
    return FotogAnexApoyAtencPrevEmergDesComponent.NUMEROS.map(numero => ({ numero, nombreArchivo: '', archivoSeleccionado: null, eliminada: false, previewUrl: null, noEncontrada: false, mensajeError: '' }));
  }

  //NOMBRE DEL ARCHIVO GUARDADO EN LA COLUMNA DE LA FOTOGRAFÍA N.° numero DEL REGISTRO:
  private nombreArchivoRegistro(registro: FotografiasAnexasApoyAtencPrevEmergDesastI | null, numero: NumeroFotografia): string {
    if (!registro) return '';
    const nombres = [
      registro.nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast1,
      registro.nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast2,
      registro.nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast3,
      registro.nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast4
    ];
    return String(nombres[numero - 1] ?? '').trim();
  }

  //CARPETA DEL SERVIDOR DE ARCHIVOS DONDE VAN LAS FOTOGRAFÍAS DEL APOYO: CARPETA PRINCIPAL + RUTA DE FOTOGRAFÍAS ANEXAS DE APOYOS
  //(PARÁMETROS DEL SISTEMA) + CARPETA DE LA UNIDAD MILITAR DEL APOYO — MISMO PATRÓN QUE LAS FOTOS DE RESPONSABLES. SI EL APOYO NO
  //TRAE LA CARPETA DE SU UNIDAD MILITAR, SE CONSULTA LA UNIDAD MILITAR POR SU SIGLA O ACRÓNIMO:
  private obtenerCarpetaFotografias(): Observable<string> {
    const unidadMilitar = this.apoyoAtencPrevEmergDesast?.unidadMilitarDTO;
    const carpetaUnidad$ = String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim()
      ? of(String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar).trim())
      : this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(String(unidadMilitar?.siglaoAcronimoUnidadMilitar || '').trim()).pipe(
          map(({ unidadMilitarDTO }) => String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim())
        );
    return forkJoin({ parametros: this.parametrosSistemaService.getSystemParameterbyId(1), carpetaUnidad: carpetaUnidad$ }).pipe(
      map(({ parametros, carpetaUnidad }) => {
        const parametrosSistemaDTO = parametros.parametrosSistemaDTO;
        const rutaFotografias = String(parametrosSistemaDTO?.rutaDestinoArchivosFotografiasAnexasApoyosAtencPrevEmergDesast || '').trim();
        if (!rutaFotografias) throw new Error('SIN RUTA DE FOTOGRAFÍAS ANEXAS DE APOYOS EN LOS PARÁMETROS DEL SISTEMA');
        if (!carpetaUnidad) throw new Error('SIN CARPETA DE ALMACENAMIENTO DE LA UNIDAD MILITAR DEL APOYO');
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim() + rutaFotografias;
        const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
        return `${baseNormalizada}${carpetaUnidad.replace(/^[\\/]+|[\\/]+$/g, '')}/`;
      })
    );
  }

  //CARGA EL REGISTRO DE FOTOGRAFÍAS DEL APOYO Y LA VISTA PREVIA DE CADA FOTOGRAFÍA GUARDADA:
  cargar(): void {
    const solicitud = ++this.solicitudCarga;
    this.ranuras.forEach(ranura => this.liberarPreview(ranura));
    this.ranuras = this.crearRanurasVacias();
    this.registro = null;
    const idApoyoAtencPrevEmergDesast = this.apoyoAtencPrevEmergDesast?.idApoyoAtencPrevEmergDesast;
    if (!idApoyoAtencPrevEmergDesast) return;
    this.cargando = true;
    this.service.findAllAttachedPhotographsOfSupports(undefined, idApoyoAtencPrevEmergDesast).subscribe({
      next: registros => {
        if (solicitud !== this.solicitudCarga) return;
        this.registro = registros[0] ?? null;
        this.ranuras.forEach(ranura => ranura.nombreArchivo = this.nombreArchivoRegistro(this.registro, ranura.numero));
        this.cargando = false;
        this.cdr.markForCheck();
        if (this.ranuras.some(ranura => !!ranura.nombreArchivo)) this.cargarPreviews(solicitud);
      },
      error: err => {
        if (solicitud !== this.solicitudCarga) return;
        console.error('ERROR AL CARGAR LAS FOTOGRAFÍAS ANEXAS DEL APOYO: ', err);
        this.cargando = false;
        this.mostrarToast('error', 'No se pudieron cargar las fotografías anexas del apoyo.');
      }
    });
  }

  //TRAE CADA FOTOGRAFÍA GUARDADA DEL SERVIDOR DE ARCHIVOS (getFile + getFileBytes, CON EL TOKEN DE AUTORIZACIÓN) Y LA MUESTRA:
  private cargarPreviews(solicitud: number): void {
    this.obtenerCarpetaFotografias().subscribe({
      next: carpeta => {
        this.ranuras.filter(ranura => !!ranura.nombreArchivo).forEach(ranura => {
          this.gestionArchivosService.getFile(carpeta + ranura.nombreArchivo).subscribe({
            next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
              next: bytes => {
                if (solicitud !== this.solicitudCarga || ranura.archivoSeleccionado) return;
                this.liberarPreview(ranura);
                ranura.previewUrl = URL.createObjectURL(bytes);
                this.cdr.markForCheck();
              },
              error: () => this.marcarNoEncontrada(ranura, solicitud)
            }),
            error: () => this.marcarNoEncontrada(ranura, solicitud)
          });
        });
      },
      error: err => {
        console.error('ERROR AL OBTENER LA CARPETA DE LAS FOTOGRAFÍAS ANEXAS DEL APOYO: ', err);
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

  //VALIDA EL ARCHIVO ELEGIDO (EXTENSIÓN Y TAMAÑO, IGUAL QUE LA FOTO DE RESPONSABLES) Y MUESTRA SU VISTA PREVIA LOCAL:
  onSeleccionarArchivo(ranura: RanuraFotografia, event: Event): void {
    ranura.mensajeError = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    if (file.size > FotogAnexApoyAtencPrevEmergDesComponent.TAMANO_MAXIMO_BYTES) {
      ranura.mensajeError = 'El archivo excede el tamaño máximo permitido de 2.0 MB.';
      return;
    }
    if (!FotogAnexApoyAtencPrevEmergDesComponent.EXTENSIONES_PERMITIDAS.includes(extension)) {
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

  //NOMBRE DEL ARCHIVO NUEVO: "FOTO_APOY_" + ID DEL APOYO + SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR + NÚMERO DE LA FOTOGRAFÍA + FECHA Y HORA,
  //SIGUIENDO EL FORMATO DE LOS NOMBRES YA REGISTRADOS (EJ. "FOTO_APOY_01_CAOCC_VISITA_PREV.jpg"). LA FECHA Y HORA EVITA QUE EL
  //NAVEGADOR MUESTRE UNA FOTOGRAFÍA ANTERIOR GUARDADA EN CACHÉ CON EL MISMO NOMBRE:
  private nombreArchivoNuevo(numero: NumeroFotografia, archivo: File, marcaTiempo: string): string {
    const extension = (archivo.name.split('.').pop() || '').toLowerCase();
    const siglaoAcronimo = String(this.apoyoAtencPrevEmergDesast?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim().toUpperCase().replace(/[^A-Z0-9]+/g, '');
    return `FOTO_APOY_${this.apoyoAtencPrevEmergDesast?.idApoyoAtencPrevEmergDesast}_${siglaoAcronimo}_${numero}_${marcaTiempo}.${extension}`;
  }

  //1) SUBE LOS ARCHIVOS NUEVOS, 2) CREA O MODIFICA EL REGISTRO CON LOS NOMBRES FINALES Y 3) BORRA LOS ARCHIVOS REEMPLAZADOS O QUITADOS.
  //SI EL REGISTRO NO SE PUEDE GUARDAR, SE BORRAN LOS ARCHIVOS RECIÉN SUBIDOS PARA NO DEJARLOS HUÉRFANOS — MISMO ORDEN QUE LAS FOTOS
  //DE ListadoResponsablesComponent:
  guardar(): void {
    const apoyo = this.apoyoAtencPrevEmergDesast;
    if (!apoyo || this.guardando || !this.hayCambios) return;
    this.guardando = true;
    this.obtenerCarpetaFotografias().subscribe({
      next: carpeta => this.subirYGuardar(apoyo, carpeta),
      error: err => {
        console.error('ERROR AL OBTENER LA CARPETA DE LAS FOTOGRAFÍAS ANEXAS DEL APOYO: ', err);
        this.guardando = false;
        this.mostrarToast('error', 'No se pudo determinar la carpeta de las fotografías (revise los parámetros del sistema y la carpeta de la unidad militar).');
      }
    });
  }

  private subirYGuardar(apoyo: ApoyosAtencPrevEmergDesastI, carpeta: string): void {
    const marcaTiempo = this.obtenerMarcaTiempo();
    const nombresFinales = new Map<NumeroFotografia, string | null>();
    const subidas: FotografiaSubida[] = [];
    const porSubir: Observable<FotografiaSubida>[] = [];
    this.ranuras.forEach(ranura => {
      if (ranura.archivoSeleccionado) {
        const nombre = this.nombreArchivoNuevo(ranura.numero, ranura.archivoSeleccionado, marcaTiempo);
        const subida: FotografiaSubida = { numero: ranura.numero, ruta: carpeta + nombre };
        nombresFinales.set(ranura.numero, nombre);
        porSubir.push(this.gestionArchivosService.uploadFile(ranura.archivoSeleccionado, subida.ruta).pipe(map(() => {
          subidas.push(subida);
          return subida;
        })));
      } else {
        nombresFinales.set(ranura.numero, ranura.eliminada || !ranura.nombreArchivo ? null : ranura.nombreArchivo);
      }
    });
    //ARCHIVOS GUARDADOS QUE SE REEMPLAZAN O SE QUITAN (SE BORRAN SOLO SI EL REGISTRO SE GUARDA BIEN):
    const porBorrar = this.ranuras
      .filter(ranura => !!ranura.nombreArchivo && (ranura.eliminada || !!ranura.archivoSeleccionado))
      .map(ranura => carpeta + ranura.nombreArchivo);

    (porSubir.length ? forkJoin(porSubir) : of([])).subscribe({
      next: () => {
        const registro: FotografiasAnexasApoyAtencPrevEmergDesastI = {
          idFotografiasAnexasApoyAtencPrevEmergDesast: this.registro?.idFotografiasAnexasApoyAtencPrevEmergDesast,
          apoyoAtencPrevEmergDesastDTO: apoyo,
          nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast1: nombresFinales.get(1) ?? null,
          nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast2: nombresFinales.get(2) ?? null,
          nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast3: nombresFinales.get(3) ?? null,
          nombreArchivoFotoExtensionOFormatoApoyAtencPrevEmergDesast4: nombresFinales.get(4) ?? null
        };
        const guardar$ = registro.idFotografiasAnexasApoyAtencPrevEmergDesast
          ? this.service.updateAttachedPhotographsOfSupport(registro)
          : this.service.addAttachedPhotographsOfSupport(registro);
        guardar$.subscribe({
          next: respuesta => this.procesarRespuesta(respuesta, subidas, porBorrar),
          error: err => {
            console.error('ERROR AL GUARDAR LAS FOTOGRAFÍAS ANEXAS DEL APOYO: ', err);
            this.revertirSubidas(subidas);
            this.guardando = false;
            this.mostrarToast('error', err.error?.mensaje || 'Error al guardar las fotografías anexas del apoyo.');
          }
        });
      },
      error: err => {
        console.error('ERROR AL SUBIR LAS FOTOGRAFÍAS ANEXAS DEL APOYO: ', err);
        this.revertirSubidas(subidas);
        this.guardando = false;
        this.mostrarToast('error', 'No se pudieron subir las fotografías al servidor de archivos.');
      }
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. YA EXISTE UN REGISTRO DE FOTOGRAFÍAS PARA EL APOYO):
  private procesarRespuesta(respuesta: FotografiasAnexasApoyAtencPrevEmergDesastMsj, subidas: FotografiaSubida[], porBorrar: string[]): void {
    if (respuesta.banderaexito === false) {
      this.revertirSubidas(subidas);
      this.guardando = false;
      this.mostrarToast('error', respuesta.mensaje || 'No se pudieron guardar las fotografías anexas del apoyo.');
      return;
    }
    const borrados = porBorrar.map(ruta => this.gestionArchivosService.deleteFile({ filePath: ruta }).pipe(
      catchError(err => {
        console.error('ERROR AL BORRAR LA FOTOGRAFÍA ANTERIOR DEL APOYO: ', ruta, err);
        return of(null);
      })
    ));
    (borrados.length ? forkJoin(borrados) : of([])).subscribe(() => {
      this.guardando = false;
      this.mostrarToast('exito', respuesta.mensaje || 'Fotografías anexas del apoyo guardadas correctamente.');
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
