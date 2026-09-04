import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, of, Subscription } from 'rxjs';

import { HistorialIntegrantesDocumentosI } from '../../../../interfaces/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposDocumentosIdentificacionI } from '../../../../interfaces/tipos-documentos-identificacion/tipos-documentos-identificacion.interface';
import { CargosIntegrantesDocumentosI } from '../../../../interfaces/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.interface';
import { GradosSiathI } from '../../../../interfaces/grados-siath/grados-siath.interface';

import { HistorialIntegrantesDocumentosService } from '../../../../services/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposDocumentosIdentificacionService } from '../../../../services/tipos-documentos-identificacion/tipos-documentos-identificacion.service';
import { CargosIntegrantesDocumentosService } from '../../../../services/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.service';
import { GradosSiathService } from '../../../../services/grados-siath/grados-siath.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

import { AddUpdDelHistorialIntegranteDocumentosComponent, GuardadoHistorialIntegranteDocumentosEvent, OperacionFirmaHistorial } from '../add-upd-del-historial-integrante-documentos/add-upd-del-historial-integrante-documentos.component';
import { VistaHistorialIntegranteDocumentosComponent } from '../vista-historial-integrante-documentos/vista-historial-integrante-documentos.component';

@Component({
  selector: 'app-listado-historial-integrantes-documentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelHistorialIntegranteDocumentosComponent, VistaHistorialIntegranteDocumentosComponent],
  templateUrl: './listado-historial-integrantes-documentos.component.html',
  styleUrl: './listado-historial-integrantes-documentos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoHistorialIntegrantesDocumentosComponent implements OnInit, OnDestroy {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposDocumentosIdentificacion: TiposDocumentosIdentificacionI[] = [];
  cargosIntegrantesDocumentos: CargosIntegrantesDocumentosI[] = [];
  gradosSiath: GradosSiathI[] = [];

  //PÁGINA ACTUAL DE HISTORIALES DE INTEGRANTES DE DOCUMENTOS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE RECORTA EN EL CLIENTE):
  historialesIntegrantesDocumentos: HistorialIntegrantesDocumentosI[] = [];
  totalRegistros = 0;

  historialesIntegrantesDocumentosForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  historialIntegranteDocumentosSeleccionado: HistorialIntegrantesDocumentosI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;
  miniaturasFirmas = new Map<number, string>();
  private readonly subscriptionsMiniaturas = new Subscription();
  private solicitudMiniaturasActual = 0;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private historialIntegrantesDocumentosService: HistorialIntegrantesDocumentosService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private tiposDocumentosIdentificacionService: TiposDocumentosIdentificacionService,
    private cargosIntegrantesDocumentosService: CargosIntegrantesDocumentosService,
    private gradosSiathService: GradosSiathService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService,
    private spinnerService: SpinnerService
  ) {
    this.historialesIntegrantesDocumentosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarTiposDocumentosIdentificacion();
    this.cargarCargosIntegrantesDocumentos();
    this.cargarGradosSiath();
    this.accionListar();
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarUnidadesMilitares(): void {
    this.unidadesMilitaresService.findAllMilitaryUnits(undefined, undefined, 'nombreUnidadMilitar', 'ASC')
      .subscribe({
        next: (unidadesMilitares) => {
          this.unidadesMilitares = unidadesMilitares;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR UNIDADES MILITARES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE DOCUMENTO DE IDENTIFICACIÓN DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposDocumentosIdentificacion(): void {
    this.tiposDocumentosIdentificacionService.findAllTypesOfIdentificationDocuments(undefined, undefined, 'nombreTipoDocumentoIdentificacion', 'ASC')
      .subscribe({
        next: (tiposDocumentosIdentificacion) => {
          this.tiposDocumentosIdentificacion = tiposDocumentosIdentificacion;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE DOCUMENTO DE IDENTIFICACIÓN: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE CARGOS DE INTEGRANTES DE DOCUMENTOS DESDE EL BACKEND (COMBO DEL FORMULARIO), ORDENADO POR
  //EL ID DEL CARGO (NO ALFABÉTICAMENTE POR NOMBRE):
  private cargarCargosIntegrantesDocumentos(): void {
    this.cargosIntegrantesDocumentosService.findAllCargosIntegrantesDocumentos(undefined, undefined, 'idCargoIntegranteDocumentos', 'ASC')
      .subscribe({
        next: (cargosIntegrantesDocumentos) => {
          this.cargosIntegrantesDocumentos = cargosIntegrantesDocumentos;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR CARGOS DE INTEGRANTES DE DOCUMENTOS: ', err)
      });
  }

  //CARGA LOS GRADOS SIATH DESDE EL BACKEND (COMBO CON CAMPO DE TEXTO DE "GRADO" DEL FORMULARIO):
  private cargarGradosSiath(): void {
    this.gradosSiathService.findAllSiathGrades(undefined, 'orden', 'ASC')
      .subscribe({
        next: (grados) => {
          this.gradosSiath = grados;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR GRADOS SIATH: ', err)
      });
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LA PALABRA CLAVE ACTUAL:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE Y LA UNIDAD MILITAR SELECCIONADAS:
  accionListar(): void {
    const valoresFormulario = this.historialesIntegrantesDocumentosForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;

    this.historialIntegrantesDocumentosService.findAllHistorialesIntegrantesDocumentosPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      siglaoAcronimoUnidadMilitar,
      keyword,
      'idHistorialIntegranteDocumentos',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.historialesIntegrantesDocumentos = data;
        this.cargarMiniaturasFirmas(data);
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR HISTORIALES DE INTEGRANTES DE DOCUMENTOS: ', err)
    });

    this.historialIntegrantesDocumentosService.findCountTotalRegisters(undefined, siglaoAcronimoUnidadMilitar, keyword)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE HISTORIALES DE INTEGRANTES DE DOCUMENTOS: ', err)
      });
  }

  private cargarMiniaturasFirmas(historiales: HistorialIntegrantesDocumentosI[]): void {
    const solicitud = ++this.solicitudMiniaturasActual;
    this.limpiarMiniaturasFirmas();
    if (!historiales.length) return;
    this.subscriptionsMiniaturas.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosHistorialIntegrantesDocumentos).trim();
        historiales.forEach(historial => {
          const id = Number(historial.idHistorialIntegranteDocumentos);
          if (!id) return;
          this.subscriptionsMiniaturas.add(this.historialIntegrantesDocumentosService.getHistorialIntegranteDocumentosbyId(id).subscribe({
            next: ({ historialIntegranteDocumentosDTO }) => {
              if (solicitud !== this.solicitudMiniaturasActual) return;
              const nombre = String(historialIntegranteDocumentosDTO?.nombreArchivoFotoFirmaIntegranteDocumentos || '').trim();
              const sigla = String(historialIntegranteDocumentosDTO?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
              if (!nombre || !sigla) return;
              this.subscriptionsMiniaturas.add(this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(sigla).subscribe({
                next: ({ unidadMilitarDTO }) => {
                  const carpeta = String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
                  if (!carpeta || solicitud !== this.solicitudMiniaturasActual) return;
                  const ruta = this.rutaFirma(rutaBase, carpeta, nombre);
                  this.subscriptionsMiniaturas.add(this.gestionArchivosService.getFile(ruta).subscribe({
                    next: ({ rutaEstatica }) => this.subscriptionsMiniaturas.add(this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
                      next: (blob) => {
                        if (solicitud !== this.solicitudMiniaturasActual) return;
                        this.miniaturasFirmas.set(id, URL.createObjectURL(blob));
                        this.changeDetectorRef.markForCheck();
                      },
                      error: () => this.eliminarMiniaturaFirma(id)
                    })),
                    error: () => this.eliminarMiniaturaFirma(id)
                  }));
                },
                error: () => this.eliminarMiniaturaFirma(id)
              }));
            },
            error: () => this.eliminarMiniaturaFirma(id)
          }));
        });
      },
      error: () => this.limpiarMiniaturasFirmas()
    }));
  }

  obtenerMiniaturaFirma(id?: number): string | null {
    return id ? this.miniaturasFirmas.get(Number(id)) || null : null;
  }

  onErrorMiniaturaFirma(id?: number): void {
    if (id) this.eliminarMiniaturaFirma(Number(id));
  }

  private eliminarMiniaturaFirma(id: number): void {
    const url = this.miniaturasFirmas.get(id);
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    this.miniaturasFirmas.delete(id);
    this.changeDetectorRef.markForCheck();
  }

  private limpiarMiniaturasFirmas(): void {
    this.miniaturasFirmas.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url); });
    this.miniaturasFirmas.clear();
    this.changeDetectorRef.markForCheck();
  }

  calcularTotalPaginas(): number {
    const total = Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina);
    return total > 0 ? total : 1;
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.accionListar();
  }

  seleccionarTandaNumeroRegistrosporPagina(): void {
    this.tandaNumeroRegistrosporPagina = Number(this.historialesIntegrantesDocumentosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', historialIntegranteDocumentos: HistorialIntegrantesDocumentosI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.historialIntegranteDocumentosSeleccionado = historialIntegranteDocumentos;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(historialIntegranteDocumentos: HistorialIntegrantesDocumentosI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.historialIntegranteDocumentosSeleccionado = historialIntegranteDocumentos;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.historialIntegranteDocumentosSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.historialIntegranteDocumentosSeleccionado = null;
  }

  //RECIBE EL HISTORIAL DE INTEGRANTE DE DOCUMENTOS NUEVO O MODIFICADO DESDE EL MODAL Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID):
  guardarHistorialIntegranteDocumentos(evento: GuardadoHistorialIntegranteDocumentosEvent): void {
    const operacion = evento.operacionFirma;
    if (!operacion) { this.guardarRegistroHistorial(evento); return; }
    const anterior$ = operacion.siglaAnterior ? this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(operacion.siglaAnterior) : of(null);
    const nueva$ = operacion.siglaNueva ? this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(operacion.siglaNueva) : of(null);
    forkJoin({ anterior: anterior$, nueva: nueva$ }).subscribe({
      next: ({ anterior, nueva }) => {
        operacion.carpetaAnterior = String(anterior?.unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
        operacion.carpetaNueva = String(nueva?.unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
        if ((operacion.siglaAnterior && !operacion.carpetaAnterior) || (operacion.siglaNueva && !operacion.carpetaNueva)) {
          this.reportarFalloFirma(null, 'No se pudo determinar la carpeta de la unidad militar.'); return;
        }
        if (operacion.tipo === 'eliminar') { this.guardarRegistroHistorial(evento); return; }
        this.obtenerRutaBase((rutaBase) => this.ejecutarFirmaPrevia(evento, rutaBase));
      },
      error: (err) => this.reportarFalloFirma(err, 'No se pudo consultar la unidad militar por sigla.')
    });
  }

  private ejecutarFirmaPrevia(evento: GuardadoHistorialIntegranteDocumentosEvent, rutaBase: string): void {
    const op = evento.operacionFirma!;
    const anterior = this.rutaFirma(rutaBase, op.carpetaAnterior, op.nombreAnterior);
    const nueva = this.rutaFirma(rutaBase, op.carpetaNueva, op.nombreNuevo);
    if (op.tipo === 'subir' && op.archivo) {
      this.gestionArchivosService.uploadFile(op.archivo, nueva).subscribe({
        next: () => this.guardarRegistroHistorial(evento, rutaBase),
        error: (err) => this.reportarFalloFirma(err, 'No se pudo subir la firma. El registro no fue guardado ni modificado.')
      }); return;
    }
    const solicitud = op.tipo === 'mover'
      ? this.gestionArchivosService.moveFile({ sourcePath: anterior, destinationPath: nueva })
      : this.gestionArchivosService.renameFile({ oldPath: anterior, newPath: nueva });
    solicitud.subscribe({
      next: () => this.guardarRegistroHistorial(evento, rutaBase),
      error: (err) => this.reportarFalloFirma(err, op.tipo === 'mover' ? 'No se pudo mover la firma a la nueva unidad militar.' : 'No se pudo renombrar la firma.')
    });
  }

  private guardarRegistroHistorial(evento: GuardadoHistorialIntegranteDocumentosEvent, rutaBasePrevia?: string): void {
    const { historialIntegranteDocumentos, operacionFirma } = evento;
    if (historialIntegranteDocumentos.idHistorialIntegranteDocumentos) {
      this.historialIntegrantesDocumentosService.updateHistorialIntegranteDocumentos(historialIntegranteDocumentos).subscribe({
        next: (respuesta) => this.procesarFirmaDespues(operacionFirma, respuesta.mensaje || 'Historial de integrante de documentos modificado correctamente.'),
        error: (err) => {
          this.revertirFirma(operacionFirma, rutaBasePrevia);
          console.error('ERROR AL MODIFICAR HISTORIAL DE INTEGRANTE DE DOCUMENTOS: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar el historial de integrante de documentos.');
        }
      });
    } else {
      this.historialIntegrantesDocumentosService.addHistorialIntegranteDocumentos(historialIntegranteDocumentos).subscribe({
        next: (respuesta) => this.procesarFirmaDespues(operacionFirma, respuesta.mensaje || 'Historial de integrante de documentos creado correctamente.'),
        error: (err) => {
          this.revertirFirma(operacionFirma, rutaBasePrevia);
          console.error('ERROR AL CREAR HISTORIAL DE INTEGRANTE DE DOCUMENTOS: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear el historial de integrante de documentos.');
        }
      });
    }
  }

  private procesarFirmaDespues(op: OperacionFirmaHistorial | null, mensaje: string): void {
    if (!op || op.tipo === 'mover' || op.tipo === 'renombrar') { this.finalizarGuardado(mensaje); return; }
    this.obtenerRutaBase((base) => {
      const anterior = this.rutaFirma(base, op.carpetaAnterior, op.nombreAnterior);
      const nueva = this.rutaFirma(base, op.carpetaNueva, op.nombreNuevo);
      if (op.tipo === 'subir' && (!op.nombreAnterior || anterior === nueva)) { this.finalizarGuardado(mensaje); return; }
      this.gestionArchivosService.deleteFile({ filePath: anterior }).subscribe({
        next: () => this.finalizarGuardado(mensaje),
        error: (err) => { console.error('ERROR AL ELIMINAR LA FIRMA ANTERIOR: ', err); this.finalizarGuardado(mensaje); }
      });
    });
  }

  private revertirFirma(op: OperacionFirmaHistorial | null, base?: string): void {
    if (!op || !base || op.tipo === 'eliminar') return;
    const anterior = this.rutaFirma(base, op.carpetaAnterior, op.nombreAnterior);
    const nueva = this.rutaFirma(base, op.carpetaNueva, op.nombreNuevo);
    if (op.tipo === 'subir') {
      if (anterior !== nueva) this.gestionArchivosService.deleteFile({ filePath: nueva }).subscribe({ error: () => {} });
    } else if (op.tipo === 'mover') {
      this.gestionArchivosService.moveFile({ sourcePath: nueva, destinationPath: anterior }).subscribe({ error: () => {} });
    } else this.gestionArchivosService.renameFile({ oldPath: nueva, newPath: anterior }).subscribe({ error: () => {} });
  }

  private obtenerRutaBase(continuar: (rutaBase: string) => void): void {
    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => continuar(String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
        + String(parametrosSistemaDTO.rutaDestinoArchivosHistorialIntegrantesDocumentos).trim()),
      error: (err) => this.reportarFalloFirma(err, 'No se pudo obtener la configuración de archivos.')
    });
  }

  private rutaFirma(base: string, carpeta: string, nombre: string): string {
    const baseConSeparador = /[\\/]$/.test(base) ? base : `${base}/`;
    return `${baseConSeparador}${carpeta.replace(/^[\\/]+|[\\/]+$/g, '')}/${nombre}`;
  }

  private finalizarGuardado(mensaje: string): void {
    this.mostrarToast('exito', mensaje); this.accionListar(); this.cerrarModalAddUpdDel();
  }

  private reportarFalloFirma(err: unknown, mensaje: string): void {
    console.error('ERROR AL PROCESAR LA FIRMA DEL INTEGRANTE: ', err); this.mostrarToast('error', mensaje);
  }

  //RECIBE EL ID DEL HISTORIAL DE INTEGRANTE DE DOCUMENTOS A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarHistorialIntegranteDocumentos(idHistorialIntegranteDocumentos: number): void {
    this.historialIntegrantesDocumentosService.getHistorialIntegranteDocumentosbyId(idHistorialIntegranteDocumentos).subscribe({
      next: ({ historialIntegranteDocumentosDTO }) => this.eliminarRegistroHistorial(idHistorialIntegranteDocumentos, historialIntegranteDocumentosDTO),
      error: (err) => { console.error('ERROR AL CONSULTAR EL HISTORIAL ANTES DE ELIMINARLO: ', err); this.mostrarToast('error', 'No se pudo consultar el registro y no se realizó la eliminación.'); }
    });
  }

  private eliminarRegistroHistorial(id: number, historial: HistorialIntegrantesDocumentosI): void {
    const nombre = String(historial.nombreArchivoFotoFirmaIntegranteDocumentos || '').trim();
    const sigla = String(historial.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
    this.historialIntegrantesDocumentosService.deleteHistorialIntegranteDocumentos(id).subscribe({
      next: (respuesta) => {
        const mensaje = respuesta.mensaje || 'Historial de integrante de documentos eliminado correctamente.';
        if (!nombre || !sigla) { this.finalizarGuardado(mensaje); return; }
        this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(sigla).subscribe({
          next: ({ unidadMilitarDTO }) => this.obtenerRutaBase((base) => {
            const carpeta = String(unidadMilitarDTO.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
            this.gestionArchivosService.deleteFile({ filePath: this.rutaFirma(base, carpeta, nombre) }).subscribe({
              next: () => this.finalizarGuardado(mensaje),
              error: (err) => { console.error('ERROR AL ELIMINAR LA FIRMA DEL REGISTRO ELIMINADO: ', err); this.finalizarGuardado(mensaje); }
            });
          }),
          error: (err) => { console.error('ERROR AL CONSULTAR LA UNIDAD MILITAR PARA ELIMINAR LA FIRMA: ', err); this.finalizarGuardado(mensaje); }
        });
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR HISTORIAL DE INTEGRANTE DE DOCUMENTOS: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el historial de integrante de documentos.');
      }
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

  ngOnDestroy(): void {
    this.solicitudMiniaturasActual++;
    this.subscriptionsMiniaturas.unsubscribe();
    this.limpiarMiniaturasFirmas();
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }
}
