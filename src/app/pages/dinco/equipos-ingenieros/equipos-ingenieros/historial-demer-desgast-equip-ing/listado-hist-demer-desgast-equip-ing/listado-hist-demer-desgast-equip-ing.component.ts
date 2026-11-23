import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { EquiposIngenierosI } from '../../../../../../interfaces/dinco/equipos-ingenieros/equipos-ingenieros.interface';
import { HistorialDemerDesgastEquipIngI, HistorialDemerDesgastEquipIngMsj } from '../../../../../../interfaces/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/historial-demer-desgast-equip-ing.interface';
import { HistorialDemerDesgastEquipIngService } from '../../../../../../services/dinco/equipos-ingenieros/historial-demer-desgast-equip-ing/historial-demer-desgast-equip-ing.service';
import { ParametrosSistemaService } from '../../../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { UnidadesMilitaresService } from '../../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';
import { SpinnerService } from '../../../../../../services/spinner/spinner.service';

import { AddUpdDelHistDemerDesgastEquipIngComponent, GuardadoHistorialDemeritoDesgasteEvent } from '../add-upd-del-hist-demer-desgast-equip-ing/add-upd-del-hist-demer-desgast-equip-ing.component';
import { VistaHistDemerDesgastEquipIngComponent } from '../vista-hist-demer-desgast-equip-ing/vista-hist-demer-desgast-equip-ing.component';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

//HISTORIAL DE DEMÉRITOS Y DESGASTES DE UN EQUIPO DE INGENIEROS. SE ABRE EN UN MODAL DESDE EL BOTÓN DE HISTORIAL DEL LISTADO DE
//EQUIPOS DE INGENIEROS (MISMO PATRÓN QUE ListadoHistDiagnInicSeleccEquipIngComponent). EL DOCUMENTO ANEXO SE SUBE, ABRE Y BORRA
//COMO EN ListadoDocumentacionAnexaSolicMttoComponent:
@Component({
  selector: 'app-listado-hist-demer-desgast-equip-ing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelHistDemerDesgastEquipIngComponent, VistaHistDemerDesgastEquipIngComponent, SemaforoContadoresComponent],
  templateUrl: './listado-hist-demer-desgast-equip-ing.component.html',
  styleUrl: './listado-hist-demer-desgast-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoHistDemerDesgastEquipIngComponent implements OnChanges, OnDestroy {

  //EQUIPO DE INGENIEROS DUEÑO DEL HISTORIAL:
  @Input({ required: true }) equipoIngeniero!: EquiposIngenierosI;

  //HistorialDemeritoYDesgasteEquipoIngenieroController SOLO FILTRA POR PALABRA CLAVE (N.° DE REGISTRO O NOMBRE DEL PROYECTO), NO POR
  //EQUIPO, ASÍ QUE SE TRAEN LOS HISTORIALES QUE COINCIDEN Y AQUÍ SE DEJAN LOS DE ESTE EQUIPO; EL TOTAL, EL SEMÁFORO Y LA PAGINACIÓN
  //SE CALCULAN SOBRE ESE RESULTADO:
  private historialesEquipo: HistorialDemerDesgastEquipIngI[] = [];

  //PÁGINA ACTUAL QUE SE MUESTRA EN LA TABLA:
  historialesDemeritosYDesgastesEquiposIngenieros: HistorialDemerDesgastEquipIngI[] = [];
  totalRegistros = 0;

  //SEMÁFORO: TOTAL ACUMULADO DE HORAS TRABAJADAS Y DE KILÓMETROS RECORRIDOS DEL EQUIPO (MISMO PATRÓN DE SUMAS QUE ListadoHistProyeccMunicEspecComponent):
  contadores: { etiqueta: string; tono: string; valor: number }[] = this.calcularContadores();

  //CARPETA DEL SERVIDOR DE ARCHIVOS CON LOS DOCUMENTOS ANEXOS DE LA UNIDAD MILITAR DEL EQUIPO (null MIENTRAS SE RESUELVE O SI NO SE PUDO):
  carpetaDocumentos: string | null = null;
  //EN true MIENTRAS SE SUBE O BORRA EL ARCHIVO Y SE GUARDA O ELIMINA EL REGISTRO:
  guardando = false;
  //REGISTRO CUYO DOCUMENTO SE ESTÁ ABRIENDO EN OTRA PESTAÑA (PARA DESHABILITAR SU BOTÓN MIENTRAS SE DESCARGA):
  abriendoId: number | null = null;
  //URLs blob: ABIERTAS EN OTRAS PESTAÑAS, QUE SE LIBERAN AL CERRAR EL LISTADO:
  private readonly urlsAbiertas: string[] = [];
  //EXISTENCIA DE CADA DOCUMENTO EN EL SERVIDOR (POR NOMBRE; null MIENTRAS SE VERIFICA) Y true SI NO SE PUDO RESOLVER LA CARPETA:
  private readonly existenciaDocumentos = new Map<string, boolean | null>();
  private carpetaNoDisponible = false;

  historialesDemeritosYDesgastesEquiposIngenierosForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES INTERNOS:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  historialDemeritoDesgasteSeleccionado: HistorialDemerDesgastEquipIngI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private historialDemerDesgastEquipIngService: HistorialDemerDesgastEquipIngService,
    private parametrosSistemaService: ParametrosSistemaService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private gestionArchivosService: GestionArchivosService,
    private spinnerService: SpinnerService
  ) {
    this.historialesDemeritosYDesgastesEquiposIngenierosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  //AL CAMBIAR EL EQUIPO SE RESUELVE LA CARPETA DE SU UNIDAD MILITAR Y SE VUELVE A LISTAR:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipoIngeniero'] && this.equipoIngeniero?.idEquipoIngeniero) {
      this.carpetaDocumentos = null;
      this.carpetaNoDisponible = false;
      this.existenciaDocumentos.clear();
      this.obtenerCarpetaDocumentos().subscribe({
        next: carpeta => {
          this.carpetaDocumentos = carpeta;
          this.verificarDocumentosPagina();
          this.changeDetectorRef.markForCheck();
        },
        error: err => {
          console.error('ERROR AL OBTENER LA CARPETA DE LOS DOCUMENTOS ANEXOS DE DEMÉRITOS Y DESGASTES: ', err);
          //SIN CARPETA NO SE PUEDE VERIFICAR NI ABRIR NINGÚN DOCUMENTO: LA COLUMNA MUESTRA "NO":
          this.carpetaNoDisponible = true;
          this.changeDetectorRef.markForCheck();
        }
      });
      this.buscar();
    }
  }

  ngOnDestroy(): void {
    this.urlsAbiertas.forEach(url => URL.revokeObjectURL(url));
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  //CARPETA DEL SERVIDOR DE ARCHIVOS DONDE VAN LOS DOCUMENTOS: CARPETA PRINCIPAL + RUTA DEL HISTORIAL DE DEMÉRITOS Y DESGASTES (PARÁMETROS DEL
  //SISTEMA) + CARPETA DE LA UNIDAD MILITAR DEL EQUIPO — MISMO PATRÓN QUE ListadoDocumentacionAnexaSolicMttoComponent. SI EL EQUIPO NO TRAE LA
  //CARPETA DE SU UNIDAD MILITAR, SE CONSULTA LA UNIDAD MILITAR POR SU SIGLA O ACRÓNIMO:
  private obtenerCarpetaDocumentos(): Observable<string> {
    const unidadMilitar = this.equipoIngeniero?.unidadMilitarDTO;
    const carpetaUnidad$ = String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim()
      ? of(String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar).trim())
      : this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(String(unidadMilitar?.siglaoAcronimoUnidadMilitar || '').trim()).pipe(
          map(({ unidadMilitarDTO }) => String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim())
        );
    return forkJoin({ parametros: this.parametrosSistemaService.getSystemParameterbyId(1), carpetaUnidad: carpetaUnidad$ }).pipe(
      map(({ parametros, carpetaUnidad }) => {
        const parametrosSistemaDTO = parametros.parametrosSistemaDTO;
        const rutaDemeritos = String(parametrosSistemaDTO?.rutaDestinoArchivosHistorialDemeritosDesgastesEquiposIngenieros || '').trim();
        if (!rutaDemeritos) throw new Error('SIN RUTA DEL HISTORIAL DE DEMÉRITOS Y DESGASTES EN LOS PARÁMETROS DEL SISTEMA');
        if (!carpetaUnidad) throw new Error('SIN CARPETA DE ALMACENAMIENTO DE LA UNIDAD MILITAR DEL EQUIPO');
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim() + rutaDemeritos;
        const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
        return `${baseNormalizada}${carpetaUnidad.replace(/^[\\/]+|[\\/]+$/g, '')}/`;
      })
    );
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LA PALABRA CLAVE:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA LOS HISTORIALES QUE COINCIDEN CON LA PALABRA CLAVE (DEL ÚLTIMO REGISTRADO AL PRIMERO) Y SE QUEDA CON LOS DEL EQUIPO:
  accionListar(): void {
    const palabraClave = (this.historialesDemeritosYDesgastesEquiposIngenierosForm.value.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const idEquipoIngeniero = Number(this.equipoIngeniero.idEquipoIngeniero);

    this.historialDemerDesgastEquipIngService.findAllEngineerEquipmentDemeritAndWearHistories(undefined, keyword, 'idHistorialDemeritoYDesgasteEquipoIngeniero', 'DESC')
      .subscribe({
        next: (historiales) => {
          this.historialesEquipo = (historiales ?? []).filter(historial =>
            Number(historial.equipoIngenieroDTO?.idEquipoIngeniero) === idEquipoIngeniero);
          this.recortarPagina();
        },
        error: (err) => {
          console.error('ERROR AL LISTAR HISTORIAL DE DEMÉRITOS Y DESGASTES DE EQUIPOS DE INGENIEROS: ', err);
          this.historialesEquipo = [];
          this.recortarPagina();
        }
      });
  }

  //RECALCULA EL TOTAL Y EL SEMÁFORO Y RECORTA LA PÁGINA ACTUAL:
  private recortarPagina(): void {
    this.totalRegistros = this.historialesEquipo.length;
    this.contadores = this.calcularContadores();
    const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina) - 1);
    this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
    const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
    this.historialesDemeritosYDesgastesEquiposIngenieros = this.historialesEquipo.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
    this.verificarDocumentosPagina();
    this.changeDetectorRef.markForCheck();
  }

  //VERIFICA EN EL SERVIDOR DE ARCHIVOS SI EL DOCUMENTO DE CADA REGISTRO DE LA PÁGINA EXISTE DE VERDAD (UN REGISTRO PUEDE TENER EL NOMBRE
  //GUARDADO SIN QUE EL ARCHIVO ESTÉ EN LA CARPETA) — MISMO PATRÓN QUE ListadoHistMttosEquipIngComponent:
  private verificarDocumentosPagina(): void {
    const carpeta = this.carpetaDocumentos;
    if (!carpeta) return;
    this.historialesDemeritosYDesgastesEquiposIngenieros.forEach(historial => {
      const nombre = this.nombreArchivo(historial);
      if (!nombre || this.existenciaDocumentos.has(nombre)) return;
      this.existenciaDocumentos.set(nombre, null);
      this.gestionArchivosService.getFile(carpeta + nombre).pipe(map(() => true), catchError(() => of(false))).subscribe(existe => {
        this.existenciaDocumentos.set(nombre, existe);
        this.changeDetectorRef.markForCheck();
      });
    });
  }

  //ESTADO DEL DOCUMENTO EN LA TABLA: 'si' (EXISTE: BOTÓN), 'no' (SIN NOMBRE O SIN ARCHIVO EN EL SERVIDOR: "NO") O 'verificando' ("..."):
  estadoDocumento(historial: HistorialDemerDesgastEquipIngI): 'si' | 'no' | 'verificando' {
    const nombre = this.nombreArchivo(historial);
    if (!nombre || this.carpetaNoDisponible) return 'no';
    const existe = this.existenciaDocumentos.get(nombre);
    return existe === undefined || existe === null ? 'verificando' : existe ? 'si' : 'no';
  }

  private calcularContadores(): { etiqueta: string; tono: string; valor: number }[] {
    const sumar = (campo: (historial: HistorialDemerDesgastEquipIngI) => unknown) =>
      Math.round(this.historialesEquipo.reduce((suma, historial) => suma + (Number(campo(historial)) || 0), 0) * 100) / 100;
    return [
      { etiqueta: 'HORAS TRABAJADAS', tono: 'verificacion', valor: sumar(historial => historial.horasTrabajadasHistorialDemeritoYDesgasteEquipoIngeniero) },
      { etiqueta: 'KILÓMETROS RECORRIDOS', tono: 'asignacion', valor: sumar(historial => historial.kilometrosRecorridosHistorialDemeritoYDesgasteEquipoIngeniero) }
    ];
  }

  //MUESTRA LOS VALORES MONETARIOS CON SEPARADOR DE MILES (ES-CO):
  formatearValor(valor: unknown): string {
    const texto = String(valor ?? '').trim();
    if (!texto) return '-';
    const numero = Number(texto);
    return isNaN(numero) ? texto : '$ ' + numero.toLocaleString('es-CO');
  }

  //MUESTRA HORAS Y KILÓMETROS CON SEPARADOR DE MILES (ES-CO):
  formatearNumero(valor: unknown): string {
    const texto = String(valor ?? '').trim();
    if (!texto) return '-';
    const numero = Number(texto);
    return isNaN(numero) ? texto : numero.toLocaleString('es-CO');
  }

  nombreArchivo(historial: HistorialDemerDesgastEquipIngI | null | undefined): string {
    return String(historial?.nombreArchivoDocumentoAnexoHistDemerDesgastEquipIng ?? '').trim();
  }

  calcularTotalPaginas(): number {
    const total = Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina);
    return total > 0 ? total : 1;
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.recortarPagina();
  }

  seleccionarTandaNumeroRegistrosporPagina(): void {
    this.tandaNumeroRegistrosporPagina = Number(this.historialesDemeritosYDesgastesEquiposIngenierosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.recortarPagina();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', historial: HistorialDemerDesgastEquipIngI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.historialDemeritoDesgasteSeleccionado = historial;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(historial: HistorialDemerDesgastEquipIngI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.historialDemeritoDesgasteSeleccionado = historial;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  //MIENTRAS SE GUARDA NO SE CIERRA EL MODAL (PARA NO PERDER EL ESTADO DE LA SUBIDA):
  cerrarModalAddUpdDel(): void {
    if (this.guardando) return;
    this.modalAddUpdDelVisible = false;
    this.historialDemeritoDesgasteSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.historialDemeritoDesgasteSeleccionado = null;
  }

  //ABRE EL DOCUMENTO ANEXO EN OTRA PESTAÑA (getFile + getFileBytes, CON EL TOKEN DE AUTORIZACIÓN). LA PESTAÑA SE ABRE ANTES DE LA
  //DESCARGA PARA QUE EL NAVEGADOR NO LA BLOQUEE COMO VENTANA EMERGENTE:
  abrirArchivo(historial: HistorialDemerDesgastEquipIngI): void {
    const nombre = this.nombreArchivo(historial);
    if (!nombre || !this.carpetaDocumentos || this.abriendoId !== null) return;
    const pestana = window.open('', '_blank');
    this.abriendoId = historial.idHistorialDemeritoYDesgasteEquipoIngeniero ?? null;
    const esPdf = nombre.toLowerCase().endsWith('.pdf');
    this.gestionArchivosService.getFile(this.carpetaDocumentos + nombre).subscribe({
      next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
        next: bytes => {
          const url = URL.createObjectURL(esPdf ? new Blob([bytes], { type: 'application/pdf' }) : bytes);
          this.urlsAbiertas.push(url);
          if (pestana) pestana.location.href = url; else window.open(url, '_blank');
          this.abriendoId = null;
          this.changeDetectorRef.markForCheck();
        },
        error: () => this.errorAlAbrir(pestana)
      }),
      error: () => this.errorAlAbrir(pestana)
    });
  }

  private errorAlAbrir(pestana: Window | null): void {
    pestana?.close();
    this.abriendoId = null;
    this.mostrarToast('error', 'No se encontró el documento anexo en el servidor de archivos.');
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

  //EL BACKEND NO DEVUELVE EL REGISTRO CREADO: SE BUSCA EL ÚLTIMO REGISTRO DEL EQUIPO (EL DE MAYOR ID), QUE ES EL QUE SE ACABA DE CREAR:
  private obtenerRegistroCreado(): Observable<HistorialDemerDesgastEquipIngI> {
    const idEquipoIngeniero = Number(this.equipoIngeniero.idEquipoIngeniero);
    return this.historialDemerDesgastEquipIngService.findAllEngineerEquipmentDemeritAndWearHistories(undefined, undefined, 'idHistorialDemeritoYDesgasteEquipoIngeniero', 'DESC').pipe(
      map(registros => {
        const creado = (registros ?? []).find(registro => Number(registro.equipoIngenieroDTO?.idEquipoIngeniero) === idEquipoIngeniero);
        if (!creado?.idHistorialDemeritoYDesgasteEquipoIngeniero) throw new Error('NO SE ENCONTRÓ EL REGISTRO CREADO');
        return creado;
      })
    );
  }

  //GUARDA EL REGISTRO Y SU DOCUMENTO ANEXO, CUYO NOMBRE ES EL ID DEL REGISTRO ENCRIPTADO:
  // - AL MODIFICAR (EL ID YA EXISTE): 1) SE SUBE EL ARCHIVO NUEVO, 2) SE GUARDA EL REGISTRO Y 3) SE BORRA EL ARCHIVO ANTERIOR SI SE QUITÓ O SI
  //   TENÍA OTRO NOMBRE. SI EL REGISTRO NO SE GUARDA, SE BORRA EL ARCHIVO SUBIDO (SALVO QUE TENGA EL MISMO NOMBRE DEL QUE YA TENÍA).
  // - AL CREAR (EL ID LO ASIGNA EL BACKEND): 1) SE CREA EL REGISTRO SIN ARCHIVO, 2) SE OBTIENE SU ID, 3) SE SUBE EL ARCHIVO CON EL ID
  //   ENCRIPTADO Y 4) SE ACTUALIZA EL REGISTRO CON ESE NOMBRE — MISMO ORDEN QUE LA FOTO DE UNA UNIDAD MILITAR NUEVA:
  guardarHistorialDemeritoDesgaste(evento: GuardadoHistorialDemeritoDesgasteEvent): void {
    if (this.guardando) return;
    const carpeta = this.carpetaDocumentos;
    if (evento.archivo && !carpeta) {
      this.mostrarToast('error', 'No se pudo determinar la carpeta de los documentos (revise los parámetros del sistema y la carpeta de la unidad militar).');
      return;
    }
    this.guardando = true;
    this.changeDetectorRef.markForCheck();
    const historial: HistorialDemerDesgastEquipIngI = { ...evento.historial };
    const idRegistro = historial.idHistorialDemeritoYDesgasteEquipoIngeniero;
    if (idRegistro) {
      this.modificarConArchivo(historial, idRegistro, evento);
    } else {
      this.crearConArchivo(historial, evento.archivo);
    }
  }

  private modificarConArchivo(historial: HistorialDemerDesgastEquipIngI, idRegistro: number, evento: GuardadoHistorialDemeritoDesgasteEvent): void {
    const carpeta = this.carpetaDocumentos;
    const nombreAnterior = this.nombreArchivo(this.historialDemeritoDesgasteSeleccionado);
    let nombreNuevo = '';
    let subida$: Observable<unknown> = of(null);
    if (evento.archivo && carpeta) {
      nombreNuevo = this.nombreArchivoEncriptado(idRegistro, evento.archivo);
      historial.nombreArchivoDocumentoAnexoHistDemerDesgastEquipIng = nombreNuevo;
      subida$ = this.gestionArchivosService.uploadFile(evento.archivo, carpeta + nombreNuevo);
    }
    //EL ARCHIVO ANTERIOR SE BORRA SI SE QUITÓ O SI SE REEMPLAZÓ POR OTRO CON DISTINTO NOMBRE (CON EL MISMO NOMBRE YA QUEDÓ SOBRESCRITO):
    const porBorrar = nombreAnterior && (evento.quitarArchivo || (nombreNuevo && nombreNuevo !== nombreAnterior)) ? nombreAnterior : '';
    const revertir = (): void => { if (nombreNuevo && nombreNuevo !== nombreAnterior) this.revertirSubida(carpeta + nombreNuevo); };
    subida$.subscribe({
      next: () => this.historialDemerDesgastEquipIngService.updateEngineerEquipmentDemeritAndWearHistory(historial).subscribe({
        next: respuesta => {
          if (respuesta.banderaexito === false) {
            revertir();
            this.terminarConError(respuesta.mensaje || 'No fue posible guardar el demérito y desgaste.');
            return;
          }
          this.borrarArchivosSinUso(porBorrar ? [porBorrar] : []).subscribe(() => {
            [porBorrar, nombreNuevo].filter(Boolean).forEach(nombre => this.existenciaDocumentos.delete(nombre));
            this.terminarGuardado(respuesta.mensaje || 'Demérito y desgaste modificado correctamente.');
          });
        },
        error: err => {
          console.error('ERROR AL GUARDAR DEMÉRITO Y DESGASTE DE EQUIPO DE INGENIEROS: ', err);
          revertir();
          this.terminarConError(err.error?.mensaje || 'Error al guardar el demérito y desgaste.');
        }
      }),
      error: err => {
        console.error('ERROR AL SUBIR EL DOCUMENTO ANEXO DEL DEMÉRITO Y DESGASTE: ', err);
        this.terminarConError('No se pudo subir el documento anexo al servidor de archivos.');
      }
    });
  }

  private crearConArchivo(historial: HistorialDemerDesgastEquipIngI, archivo: File | null): void {
    historial.nombreArchivoDocumentoAnexoHistDemerDesgastEquipIng = null;
    this.historialDemerDesgastEquipIngService.addEngineerEquipmentDemeritAndWearHistory(historial).subscribe({
      next: respuesta => {
        if (respuesta.banderaexito === false) {
          this.terminarConError(respuesta.mensaje || 'No fue posible guardar el demérito y desgaste.');
          return;
        }
        const mensaje = respuesta.mensaje || 'Demérito y desgaste creado correctamente.';
        const carpeta = this.carpetaDocumentos;
        if (!archivo || !carpeta) {
          this.terminarGuardado(mensaje);
          return;
        }
        let rutaSubida = '';
        this.obtenerRegistroCreado().pipe(
          switchMap(creado => {
            const nombre = this.nombreArchivoEncriptado(Number(creado.idHistorialDemeritoYDesgasteEquipoIngeniero), archivo);
            rutaSubida = carpeta + nombre;
            return this.gestionArchivosService.uploadFile(archivo, rutaSubida).pipe(
              switchMap(() => this.historialDemerDesgastEquipIngService.updateEngineerEquipmentDemeritAndWearHistory({ ...creado, nombreArchivoDocumentoAnexoHistDemerDesgastEquipIng: nombre })),
              map(actualizado => { if (actualizado.banderaexito === false) throw new Error(actualizado.mensaje); })
            );
          })
        ).subscribe({
          next: () => this.terminarGuardado(mensaje),
          error: err => {
            console.error('ERROR AL ASOCIAR EL DOCUMENTO ANEXO AL DEMÉRITO Y DESGASTE CREADO: ', err);
            if (rutaSubida) this.revertirSubida(rutaSubida);
            this.terminarGuardado('El demérito y desgaste se creó, pero no se pudo guardar su documento anexo. Modifíquelo para adjuntarlo de nuevo.', 'error');
          }
        });
      },
      error: err => {
        console.error('ERROR AL GUARDAR DEMÉRITO Y DESGASTE DE EQUIPO DE INGENIEROS: ', err);
        this.terminarConError(err.error?.mensaje || 'Error al guardar el demérito y desgaste.');
      }
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA: SE MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private terminarConError(mensaje: string): void {
    this.guardando = false;
    this.mostrarToast('error', mensaje);
  }

  private terminarGuardado(mensaje: string, tipo: 'exito' | 'error' = 'exito'): void {
    this.guardando = false;
    this.mostrarToast(tipo, mensaje);
    this.cerrarModalAddUpdDel();
    this.accionListar();
  }

  //ELIMINA EL REGISTRO SELECCIONADO Y TAMBIÉN SU DOCUMENTO ANEXO DEL SERVIDOR DE ARCHIVOS:
  eliminarHistorialDemeritoDesgaste(idHistorialDemeritoYDesgasteEquipoIngeniero: number): void {
    if (this.guardando) return;
    const archivo = this.nombreArchivo(this.historialDemeritoDesgasteSeleccionado);
    this.guardando = true;
    this.changeDetectorRef.markForCheck();
    this.historialDemerDesgastEquipIngService.deleteEngineerEquipmentDemeritAndWearHistory(idHistorialDemeritoYDesgasteEquipoIngeniero).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.guardando = false;
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible eliminar el demérito y desgaste.');
          return;
        }
        this.borrarArchivosSinUso(archivo ? [archivo] : []).subscribe(() => {
          this.guardando = false;
          this.mostrarToast('exito', respuesta.mensaje || 'Demérito y desgaste eliminado correctamente.');
          this.cerrarModalAddUpdDel();
          this.accionListar();
        });
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR DEMÉRITO Y DESGASTE DE EQUIPO DE INGENIEROS: ', err);
        this.guardando = false;
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el demérito y desgaste.');
      }
    });
  }

  //ANTES DE BORRAR UN ARCHIVO SE VERIFICA QUE NINGÚN OTRO REGISTRO DEL HISTORIAL LO SIGA USANDO; SI NO SE PUEDE VERIFICAR, NO SE BORRA
  //— MISMO CRITERIO QUE LA DOCUMENTACIÓN ANEXA DE SOLICITUDES:
  private borrarArchivosSinUso(nombres: string[]): Observable<unknown> {
    const carpeta = this.carpetaDocumentos;
    if (!nombres.length || !carpeta) return of(null);
    return new Observable(observador => {
      this.historialDemerDesgastEquipIngService.findAllEngineerEquipmentDemeritAndWearHistories().subscribe({
        next: registros => {
          const enUso = new Set((registros ?? []).map(registro => this.nombreArchivo(registro)).filter(Boolean));
          const borrados = [...new Set(nombres)].filter(nombre => !enUso.has(nombre)).map(nombre =>
            this.gestionArchivosService.deleteFile({ filePath: carpeta + nombre }).pipe(catchError(err => {
              console.error('ERROR AL BORRAR EL DOCUMENTO ANEXO ANTERIOR DEL DEMÉRITO Y DESGASTE: ', nombre, err);
              return of(null);
            }))
          );
          (borrados.length ? forkJoin(borrados) : of([])).subscribe(() => { observador.next(null); observador.complete(); });
        },
        error: err => {
          console.error('ERROR AL VERIFICAR EL USO DEL DOCUMENTO ANEXO ANTES DE BORRARLO: ', err);
          observador.next(null);
          observador.complete();
        }
      });
    });
  }

  private revertirSubida(ruta: string | null): void {
    if (!ruta) return;
    this.gestionArchivosService.deleteFile({ filePath: ruta }).subscribe({
      error: err => console.error('ERROR AL LIMPIAR EL DOCUMENTO ANEXO NO ASOCIADO: ', ruta, err)
    });
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
