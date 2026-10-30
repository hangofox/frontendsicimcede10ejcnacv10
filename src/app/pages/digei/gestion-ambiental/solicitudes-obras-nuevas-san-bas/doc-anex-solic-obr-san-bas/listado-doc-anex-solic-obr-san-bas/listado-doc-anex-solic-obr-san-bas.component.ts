import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DocumentacionAnexaSolicInfraestI, DocumentacionAnexaSolicInfraestMsj } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/documentacion-anex-solic-infraest/documentacion-anex-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { TiposDocumentosAnexosSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/tipos-documentacion-anex-solic-infraest/tipos-documentacion-anex-solic-infraest.interface';
import { DocumentacionAnexaSolicInfraestService } from '../../../../../../services/digei/solicitudes-infraestructuras/documentacion-anex-solic-infraest/documentacion-anex-solic-infraest.service';
import { TiposDocumentosAnexosSolicInfraestService } from '../../../../../../services/digei/solicitudes-infraestructuras/tipos-documentacion-anex-solic-infraest/tipos-documentacion-anex-solic-infraest.service';
import { ParametrosSistemaService } from '../../../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { UnidadesMilitaresService } from '../../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelDocumentacionAnexaSolicObrSbComponent, GuardadoDocumentacionAnexaEvent } from '../add-upd-del-doc-anex-solic-obr-san-bas/add-upd-del-doc-anex-solic-obr-san-bas.component';
import { VistaDocumentacionAnexaSolicObrSbComponent } from '../vista-doc-anex-solic-obr-san-bas/vista-doc-anex-solic-obr-san-bas.component';

@Component({
  selector: 'app-listado-doc-anex-solic-obr-san-bas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelDocumentacionAnexaSolicObrSbComponent, VistaDocumentacionAnexaSolicObrSbComponent],
  templateUrl: './listado-doc-anex-solic-obr-san-bas.component.html',
  styleUrl: './listado-doc-anex-solic-obr-san-bas.component.scss'
})
export class ListadoDocumentacionAnexaSolicObrSbComponent implements OnInit, OnChanges, OnDestroy {
  //SOLICITUD DE INFRAESTRUCTURA DESDE LA QUE SE ABRE EL LISTADO (MODAL DEL LISTADO DE SOLICITUDES); SOLO SE LISTAN
  //Y SE CREAN DOCUMENTOS ANEXOS DE ESTA SOLICITUD:
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cantidad: ['10'] });
  registros: DocumentacionAnexaSolicInfraestI[] = [];
  tiposDocumentosAnexos: TiposDocumentosAnexosSolicInfraestI[] = [];
  //CARPETA DEL SERVIDOR DE ARCHIVOS CON LOS DOCUMENTOS DE LA UNIDAD MILITAR DE LA SOLICITUD (null MIENTRAS SE RESUELVE O SI NO SE PUDO):
  carpetaDocumentos: string | null = null;
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  guardando = false;
  //DOCUMENTO QUE SE ESTÁ ABRIENDO EN OTRA PESTAÑA (PARA DESHABILITAR SU BOTÓN MIENTRAS SE DESCARGA):
  abriendoId: number | null = null;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: DocumentacionAnexaSolicInfraestI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;
  //URLs blob: ABIERTAS EN OTRAS PESTAÑAS, QUE SE LIBERAN AL CERRAR EL LISTADO:
  private readonly urlsAbiertas: string[] = [];

  constructor(
    private readonly service: DocumentacionAnexaSolicInfraestService,
    private readonly tiposDocumentosAnexosService: TiposDocumentosAnexosSolicInfraestService,
    private readonly parametrosSistemaService: ParametrosSistemaService,
    private readonly unidadesMilitaresService: UnidadesMilitaresService,
    private readonly gestionArchivosService: GestionArchivosService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  //EL CATÁLOGO DE TIPOS DE DOCUMENTOS SE CARGA UNA SOLA VEZ:
  ngOnInit(): void {
    this.tiposDocumentosAnexosService.findAllTypesOfAttachedDocumentsOfInfrastructureRequests(undefined, undefined, 'idTipoDocumentoAnexoSolicInfraest', 'ASC').subscribe({
      next: tipos => { this.tiposDocumentosAnexos = tipos; this.cdr.markForCheck(); },
      error: err => console.error('ERROR AL CARGAR LOS TIPOS DE DOCUMENTOS ANEXOS DE SOLICITUDES DE INFRAESTRUCTURAS: ', err)
    });
  }

  //AL CAMBIAR LA SOLICITUD SE RESUELVE LA CARPETA DE SU UNIDAD MILITAR Y SE VUELVE A LISTAR:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitudInfraestructura']) {
      this.carpetaDocumentos = null;
      if (this.solicitudInfraestructura) {
        this.obtenerCarpetaDocumentos().subscribe({
          next: carpeta => { this.carpetaDocumentos = carpeta; this.cdr.markForCheck(); },
          error: err => console.error('ERROR AL OBTENER LA CARPETA DE LA DOCUMENTACIÓN ANEXA DE LA SOLICITUD: ', err)
        });
      }
      this.buscar();
    }
  }

  ngOnDestroy(): void {
    this.urlsAbiertas.forEach(url => URL.revokeObjectURL(url));
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  //CARPETA DEL SERVIDOR DE ARCHIVOS DONDE VAN LOS DOCUMENTOS: CARPETA PRINCIPAL + RUTA DE DOCUMENTACIÓN ANEXA DE SOLICITUDES (PARÁMETROS DEL
  //SISTEMA) + CARPETA DE LA UNIDAD MILITAR DE LA SOLICITUD — MISMO PATRÓN QUE FotAnexApoyAtencPrevEmergDesComponent. SI LA SOLICITUD NO TRAE
  //LA CARPETA DE SU UNIDAD MILITAR, SE CONSULTA LA UNIDAD MILITAR POR SU SIGLA O ACRÓNIMO:
  private obtenerCarpetaDocumentos(): Observable<string> {
    const unidadMilitar = this.solicitudInfraestructura?.unidadMilitarDTO;
    const carpetaUnidad$ = String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim()
      ? of(String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar).trim())
      : this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(String(unidadMilitar?.siglaoAcronimoUnidadMilitar || '').trim()).pipe(
          map(({ unidadMilitarDTO }) => String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim())
        );
    return forkJoin({ parametros: this.parametrosSistemaService.getSystemParameterbyId(1), carpetaUnidad: carpetaUnidad$ }).pipe(
      map(({ parametros, carpetaUnidad }) => {
        const parametrosSistemaDTO = parametros.parametrosSistemaDTO;
        const rutaDocumentacion = String(parametrosSistemaDTO?.rutaDestinoArchivosDocumentacionAnexaSolicInfraest || '').trim();
        if (!rutaDocumentacion) throw new Error('SIN RUTA DE DOCUMENTACIÓN ANEXA DE SOLICITUDES DE INFRAESTRUCTURAS EN LOS PARÁMETROS DEL SISTEMA');
        if (!carpetaUnidad) throw new Error('SIN CARPETA DE ALMACENAMIENTO DE LA UNIDAD MILITAR DE LA SOLICITUD');
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim() + rutaDocumentacion;
        const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
        return `${baseNormalizada}${carpetaUnidad.replace(/^[\\/]+|[\\/]+$/g, '')}/`;
      })
    );
  }

  //SE LISTA LA PÁGINA DE LA SOLICITUD (EL BACKEND FILTRA POR idSolicitudInfraestructura Y BUSCA POR NOMBRE DEL DOCUMENTO) Y SE CUENTA EL TOTAL FILTRADO:
  listar(): void {
    const idSolicitudInfraestructura = this.solicitudInfraestructura?.idSolicitudInfraestructura;
    if (!idSolicitudInfraestructura) {
      this.registros = [];
      this.total = 0;
      return;
    }
    const keyword = this.form.value.keyword?.trim() || undefined;
    this.service.findAllAttachedDocumentationOfInfrastructureRequestsPag(this.pagina, this.cantidad, undefined, keyword, idSolicitudInfraestructura, 'idDocumentacionAnexaSolicInfraest', 'ASC').subscribe(registros => {
      this.registros = registros;
      this.cdr.markForCheck();
    });
    this.service.findCountTotalRegisters(undefined, keyword, idSolicitudInfraestructura).subscribe(total => {
      this.total = total;
      this.cdr.markForCheck();
    });
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: DocumentacionAnexaSolicInfraestI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: DocumentacionAnexaSolicInfraestI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { if (this.guardando) return; this.modal = false; this.vista = false; this.seleccionado = null; }

  nombreArchivo(registro: DocumentacionAnexaSolicInfraestI | null): string {
    return String(registro?.nombreArchivoDocumentoAnexoSolicInfraest ?? '').trim();
  }

  //ABRE EL ARCHIVO DEL DOCUMENTO EN OTRA PESTAÑA (getFile + getFileBytes, CON EL TOKEN DE AUTORIZACIÓN). LA PESTAÑA SE ABRE ANTES DE LA
  //DESCARGA PARA QUE EL NAVEGADOR NO LA BLOQUEE COMO VENTANA EMERGENTE:
  abrirArchivo(registro: DocumentacionAnexaSolicInfraestI): void {
    const nombre = this.nombreArchivo(registro);
    if (!nombre || !this.carpetaDocumentos || this.abriendoId !== null) return;
    const pestana = window.open('', '_blank');
    this.abriendoId = registro.idDocumentacionAnexaSolicInfraest ?? null;
    const esPdf = nombre.toLowerCase().endsWith('.pdf');
    this.gestionArchivosService.getFile(this.carpetaDocumentos + nombre).subscribe({
      next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
        next: bytes => {
          const url = URL.createObjectURL(esPdf ? new Blob([bytes], { type: 'application/pdf' }) : bytes);
          this.urlsAbiertas.push(url);
          if (pestana) pestana.location.href = url; else window.open(url, '_blank');
          this.abriendoId = null;
          this.cdr.markForCheck();
        },
        error: () => this.errorAlAbrir(pestana)
      }),
      error: () => this.errorAlAbrir(pestana)
    });
  }

  private errorAlAbrir(pestana: Window | null): void {
    pestana?.close();
    this.abriendoId = null;
    this.mostrarToast('error', 'No se encontró el archivo del documento en el servidor de archivos.');
  }

  //FECHA Y HORA LOCAL ACTUAL SIN SEPARADORES (yyyyMMddHHmmss), COMO EN LOS NÚMEROS DE REGISTRO DEL BACKEND:
  private obtenerMarcaTiempo(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    return `${ahora.getFullYear()}${dosDigitos(ahora.getMonth() + 1)}${dosDigitos(ahora.getDate())}${dosDigitos(ahora.getHours())}${dosDigitos(ahora.getMinutes())}${dosDigitos(ahora.getSeconds())}`;
  }

  //NOMBRE DEL ARCHIVO NUEVO: "DOC_ANEX_SOLIC_" + ID DE LA SOLICITUD + SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR + TIPO DE DOCUMENTO + FECHA Y HORA,
  //COMO LAS FOTOGRAFÍAS ANEXAS DE APOYOS. LA FECHA Y HORA EVITA QUE EL NAVEGADOR MUESTRE UN DOCUMENTO ANTERIOR GUARDADO EN CACHÉ:
  private nombreArchivoNuevo(documentacion: DocumentacionAnexaSolicInfraestI, archivo: File): string {
    const extension = (archivo.name.split('.').pop() || '').toLowerCase();
    const limpiar = (texto: unknown): string => String(texto ?? '').trim().toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const siglaoAcronimo = limpiar(this.solicitudInfraestructura?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar);
    const tipo = limpiar(documentacion.tipoDocumentoAnexoSolicInfraestDTO?.nombreTipoDocumentoAnexoSolicInfraest);
    return `DOC_ANEX_SOLIC_${this.solicitudInfraestructura?.idSolicitudInfraestructura}_${siglaoAcronimo}_${tipo}_${this.obtenerMarcaTiempo()}.${extension}`;
  }

  //1) SUBE EL ARCHIVO NUEVO (SI SE ELIGIÓ), 2) CREA O MODIFICA EL REGISTRO CON EL NOMBRE FINAL Y 3) BORRA EL ARCHIVO REEMPLAZADO. SI EL
  //REGISTRO NO SE PUEDE GUARDAR, SE BORRA EL ARCHIVO RECIÉN SUBIDO PARA NO DEJARLO HUÉRFANO — MISMO ORDEN QUE LAS FOTOGRAFÍAS ANEXAS:
  guardar(evento: GuardadoDocumentacionAnexaEvent): void {
    if (this.guardando) return;
    const carpeta = this.carpetaDocumentos;
    if (evento.archivo && !carpeta) {
      this.mostrarToast('error', 'No se pudo determinar la carpeta de los documentos (revise los parámetros del sistema y la carpeta de la unidad militar).');
      return;
    }
    this.guardando = true;
    const documentacion: DocumentacionAnexaSolicInfraestI = { ...evento.documentacion };
    const modificar = !!documentacion.idDocumentacionAnexaSolicInfraest;
    let rutaSubida: string | null = null;
    //ARCHIVO GUARDADO QUE SE REEMPLAZA (SE BORRA SOLO SI EL REGISTRO SE GUARDA BIEN):
    const porBorrar = evento.archivo ? this.nombreArchivo(this.seleccionado) : '';
    let subida$: Observable<unknown> = of(null);
    if (evento.archivo) {
      const nombre = this.nombreArchivoNuevo(documentacion, evento.archivo);
      documentacion.nombreArchivoDocumentoAnexoSolicInfraest = nombre;
      const ruta = carpeta + nombre;
      subida$ = this.gestionArchivosService.uploadFile(evento.archivo, ruta).pipe(map(() => { rutaSubida = ruta; }));
    }

    subida$.subscribe({
      next: () => {
        (modificar ? this.service.updateAttachedDocumentationOfInfrastructureRequest(documentacion) : this.service.addAttachedDocumentationOfInfrastructureRequest(documentacion)).subscribe({
          next: respuesta => this.procesarRespuestaGuardado(respuesta, modificar, rutaSubida, porBorrar),
          error: err => {
            console.error('ERROR AL GUARDAR EL DOCUMENTO ANEXO DE LA SOLICITUD: ', err);
            this.revertirSubida(rutaSubida);
            this.guardando = false;
            this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar el documento anexo.' : 'Error al agregar el documento anexo.'));
          }
        });
      },
      error: err => {
        console.error('ERROR AL SUBIR EL ARCHIVO DEL DOCUMENTO ANEXO DE LA SOLICITUD: ', err);
        this.guardando = false;
        this.mostrarToast('error', 'No se pudo subir el archivo al servidor de archivos.');
      }
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA; EN ESE CASO SE BORRA EL ARCHIVO SUBIDO, SE MUESTRA EL ERROR Y SE
  //DEJA EL MODAL ABIERTO:
  private procesarRespuestaGuardado(respuesta: DocumentacionAnexaSolicInfraestMsj, modificar: boolean, rutaSubida: string | null, porBorrar: string): void {
    if (respuesta.banderaexito === false) {
      this.revertirSubida(rutaSubida);
      this.guardando = false;
      this.mostrarToast('error', respuesta.mensaje || (modificar ? 'Error al modificar el documento anexo.' : 'Error al agregar el documento anexo.'));
      return;
    }
    this.borrarArchivosSinUso(porBorrar ? [porBorrar] : []).subscribe(() => {
      this.guardando = false;
      this.mostrarToast('exito', respuesta.mensaje || (modificar ? 'Documento anexo modificado correctamente.' : 'Documento anexo agregado correctamente.'));
      this.cerrar();
      this.listar();
    });
  }

  //AL ELIMINAR EL REGISTRO TAMBIÉN SE BORRA SU ARCHIVO DEL SERVIDOR DE ARCHIVOS:
  eliminar(id: number): void {
    if (this.guardando) return;
    const archivo = this.nombreArchivo(this.seleccionado);
    this.guardando = true;
    this.service.deleteAttachedDocumentationOfInfrastructureRequest(id).subscribe({
      next: respuesta => {
        if (respuesta.banderaexito === false) {
          this.guardando = false;
          this.mostrarToast('error', respuesta.mensaje || 'Error al eliminar el documento anexo.');
          return;
        }
        this.borrarArchivosSinUso(archivo ? [archivo] : []).subscribe(() => {
          this.guardando = false;
          this.mostrarToast('exito', respuesta.mensaje || 'Documento anexo eliminado correctamente.');
          this.cerrar();
          this.listar();
        });
      },
      error: err => {
        this.guardando = false;
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el documento anexo.');
      }
    });
  }

  //ANTES DE BORRAR UN ARCHIVO SE VERIFICA QUE NINGÚN OTRO DOCUMENTO DE LA SOLICITUD LO SIGA USANDO (MISMA CARPETA); SI NO SE PUEDE
  //VERIFICAR, NO SE BORRA — MISMO CRITERIO QUE LAS FIRMAS DE INTEGRANTES DE APOYOS:
  private borrarArchivosSinUso(nombres: string[]): Observable<unknown> {
    const carpeta = this.carpetaDocumentos;
    const idSolicitudInfraestructura = this.solicitudInfraestructura?.idSolicitudInfraestructura;
    if (!nombres.length || !carpeta || !idSolicitudInfraestructura) return of(null);
    return new Observable(observador => {
      this.service.findAllAttachedDocumentationOfInfrastructureRequests(undefined, undefined, idSolicitudInfraestructura).subscribe({
        next: registros => {
          const enUso = new Set(registros.map(registro => this.nombreArchivo(registro)).filter(Boolean));
          const borrados = [...new Set(nombres)].filter(nombre => !enUso.has(nombre)).map(nombre =>
            this.gestionArchivosService.deleteFile({ filePath: carpeta + nombre }).pipe(catchError(err => {
              console.error('ERROR AL BORRAR EL ARCHIVO ANTERIOR DEL DOCUMENTO ANEXO: ', nombre, err);
              return of(null);
            }))
          );
          (borrados.length ? forkJoin(borrados) : of([])).subscribe(() => { observador.next(null); observador.complete(); });
        },
        error: err => {
          console.error('ERROR AL VERIFICAR EL USO DEL ARCHIVO ANTES DE BORRARLO: ', err);
          observador.next(null);
          observador.complete();
        }
      });
    });
  }

  private revertirSubida(ruta: string | null): void {
    if (!ruta) return;
    this.gestionArchivosService.deleteFile({ filePath: ruta }).subscribe({
      error: err => console.error('ERROR AL LIMPIAR EL ARCHIVO NO ASOCIADO: ', ruta, err)
    });
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
