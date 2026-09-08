import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, of, Subscription } from 'rxjs';

import { ResponsablesI } from '../../../../interfaces/panel-control/responsables/responsables.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposDocumentosIdentificacionI } from '../../../../interfaces/tipos-documentos-identificacion/tipos-documentos-identificacion.interface';
import { PaisesMundoI } from '../../../../interfaces/paises-mundo/paises-mundo.interface';
import { DepartamentosoEstadosMundoI } from '../../../../interfaces/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface';

import { ResponsablesService } from '../../../../services/panel-control/responsables/responsables.service';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposDocumentosIdentificacionService } from '../../../../services/tipos-documentos-identificacion/tipos-documentos-identificacion.service';
import { PaisesMundoService } from '../../../../services/paises-mundo/paises-mundo.service';
import { DepartamentosoEstadosMundoService } from '../../../../services/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

import { AddUpdDelResponsableComponent, GuardadoResponsableEvent, OperacionFotoResponsable } from '../add-upd-del-responsable/add-upd-del-responsable.component';
import { VistaResponsableComponent } from '../vista-responsable/vista-responsable.component';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-responsables',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelResponsableComponent, VistaResponsableComponent, SemaforoContadoresComponent],
  templateUrl: './listado-responsables.component.html',
  styleUrl: './listado-responsables.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoResponsablesComponent implements OnInit, OnDestroy {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBO DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposDocumentos: TiposDocumentosIdentificacionI[] = [];
  paisesMundo: PaisesMundoI[] = [];
  departamentosoEstadosMundo: DepartamentosoEstadosMundoI[] = [];

  //PÁGINA ACTUAL DE RESPONSABLES TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE RECORTA EN EL CLIENTE):
  responsables: ResponsablesI[] = [];
  totalRegistros = 0;
  totalRegistrosActivos = 0;
  totalRegistrosInactivos = 0;

  responsablesForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  responsableSeleccionado: ResponsablesI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;
  miniaturasFotos = new Map<number, string>();
  private readonly subscriptionsMiniaturas = new Subscription();
  private solicitudMiniaturasActual = 0;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private responsablesService: ResponsablesService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private tiposDocumentosIdentificacionService: TiposDocumentosIdentificacionService,
    private paisesMundoService: PaisesMundoService,
    private departamentosoEstadosMundoService: DepartamentosoEstadosMundoService,
    private spinnerService: SpinnerService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService
  ) {
    this.responsablesForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarTiposDocumentos();
    this.cargarPaisesMundo();
    this.cargarDepartamentosoEstadosMundo();
    this.accionListar();
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
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

  //CARGA LOS TIPOS DE DOCUMENTO DE IDENTIFICACIÓN DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposDocumentos(): void {
    this.tiposDocumentosIdentificacionService.findAllTypesOfIdentificationDocuments(undefined, undefined, 'nombreTipoDocumentoIdentificacion', 'ASC')
      .subscribe({
        next: (tipos) => {
          this.tiposDocumentos = tipos;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE DOCUMENTO DE IDENTIFICACIÓN: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE PAÍSES DEL MUNDO DESDE EL BACKEND (COMBO CON CAMPO DE TEXTO DE "PAÍS DE ORIGEN" DEL FORMULARIO):
  private cargarPaisesMundo(): void {
    this.paisesMundoService.findAllCountriesOfTheWorld(undefined, undefined, 'nombrePaisMundo', 'ASC')
      .subscribe({
        next: (paises) => {
          this.paisesMundo = paises;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR PAÍSES DEL MUNDO: ', err)
      });
  }

  //CARGA EL CATÁLOGO COMPLETO DE DEPARTAMENTOS O ESTADOS DEL MUNDO DESDE EL BACKEND (COMBO CON CAMPO DE TEXTO DE
  //"DEPARTAMENTO O ESTADO DE ORIGEN" DEL FORMULARIO, FILTRADO EN EL COMPONENTE POR EL PAÍS SELECCIONADO):
  private cargarDepartamentosoEstadosMundo(): void {
    this.departamentosoEstadosMundoService.findAllDepartmentsOrStatesOfTheWorld(undefined, undefined, undefined, 'nombreDepartamentooEstadoMundo', 'ASC')
      .subscribe({
        next: (departamentos) => {
          this.departamentosoEstadosMundo = departamentos;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR DEPARTAMENTOS O ESTADOS DEL MUNDO: ', err)
      });
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE Y LA UNIDAD MILITAR SELECCIONADAS:
  accionListar(): void {
    const valoresFormulario = this.responsablesForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;

    this.responsablesService.findAllResponsiblesPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      siglaoAcronimoUnidadMilitar,
      undefined,
      keyword,
      'idResponsable',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.responsables = data;
        this.cargarMiniaturasFotos(data);
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR RESPONSABLES: ', err)
    });

    this.responsablesService.findCountTotalRegisters(undefined, siglaoAcronimoUnidadMilitar, undefined, keyword)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE RESPONSABLES: ', err)
        });

    this.responsablesService.findCountTotalRegisters(undefined, siglaoAcronimoUnidadMilitar, 'ACTIVO', keyword)
      .subscribe({
        next: (total) => {
          this.totalRegistrosActivos = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR RESPONSABLES ACTIVOS: ', err)
      });

    this.responsablesService.findCountTotalRegisters(undefined, siglaoAcronimoUnidadMilitar, 'INACTIVO', keyword)
      .subscribe({
        next: (total) => {
          this.totalRegistrosInactivos = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR RESPONSABLES INACTIVOS: ', err)
      });
    }

  private cargarMiniaturasFotos(responsables: ResponsablesI[]): void {
    const solicitud = ++this.solicitudMiniaturasActual;
    this.limpiarMiniaturasFotos();
    if (!responsables.length) return;
    this.subscriptionsMiniaturas.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosResponsables).trim();
        responsables.forEach(responsable => {
          const id = Number(responsable.idResponsable);
          if (!id) return;
          this.subscriptionsMiniaturas.add(this.responsablesService.getResponsiblebyId(id).subscribe({
            next: ({ responsableDTO }) => {
              if (solicitud !== this.solicitudMiniaturasActual) return;
              const nombre = String(responsableDTO?.nombreArchivoFotoExtensionoFormatoResponsable || '').trim();
              const sigla = String(responsableDTO?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim();
              if (!nombre || !sigla) return;
              this.subscriptionsMiniaturas.add(this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(sigla).subscribe({
                next: ({ unidadMilitarDTO }) => {
                  const carpeta = String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim();
                  if (!carpeta || solicitud !== this.solicitudMiniaturasActual) return;
                  const ruta = this.conformarRutaFotoResponsable(rutaBase, carpeta, nombre);
                  this.subscriptionsMiniaturas.add(this.gestionArchivosService.getFile(ruta).subscribe({
                    next: ({ rutaEstatica }) => this.subscriptionsMiniaturas.add(this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
                      next: (blob) => {
                        if (solicitud !== this.solicitudMiniaturasActual) return;
                        this.miniaturasFotos.set(id, URL.createObjectURL(blob));
                        this.changeDetectorRef.markForCheck();
                      },
                      error: () => this.eliminarMiniaturaFoto(id)
                    })),
                    error: () => this.eliminarMiniaturaFoto(id)
                  }));
                },
                error: () => this.eliminarMiniaturaFoto(id)
              }));
            },
            error: () => this.eliminarMiniaturaFoto(id)
          }));
        });
      },
      error: () => this.limpiarMiniaturasFotos()
    }));
  }

  obtenerMiniaturaFoto(id?: number): string | null { return id ? this.miniaturasFotos.get(Number(id)) || null : null; }
  onErrorMiniaturaFoto(id?: number): void { if (id) this.eliminarMiniaturaFoto(Number(id)); }

  private eliminarMiniaturaFoto(id: number): void {
    const url = this.miniaturasFotos.get(id);
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    this.miniaturasFotos.delete(id);
    this.changeDetectorRef.markForCheck();
  }

  private limpiarMiniaturasFotos(): void {
    this.miniaturasFotos.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url); });
    this.miniaturasFotos.clear();
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
    this.tandaNumeroRegistrosporPagina = Number(this.responsablesForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', responsable: ResponsablesI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.responsableSeleccionado = responsable;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(responsable: ResponsablesI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.responsableSeleccionado = responsable;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.responsableSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.responsableSeleccionado = null;
  }

  //RECIBE EL RESPONSABLE NUEVO O MODIFICADO DESDE EL MODAL Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID):
  guardarResponsable(evento: GuardadoResponsableEvent): void {
    const operacion = evento.operacionFoto;
    if (operacion) {
      const unidadAnterior$ = operacion.siglaAnterior
        ? this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(operacion.siglaAnterior)
        : of(null);
      const unidadNueva$ = operacion.siglaNueva
        ? this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(operacion.siglaNueva)
        : of(null);
      forkJoin({ anterior: unidadAnterior$, nueva: unidadNueva$ }).subscribe({
        next: ({ anterior, nueva }) => {
          operacion.carpetaAnterior = String(anterior?.unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '');
          operacion.carpetaNueva = String(nueva?.unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '');
          if ((operacion.siglaAnterior && !operacion.carpetaAnterior)
            || (operacion.siglaNueva && !operacion.carpetaNueva)) {
            this.reportarFalloFotoPrevio(null, 'No se pudo determinar la carpeta de almacenamiento de la unidad militar.');
            return;
          }
          this.continuarGuardadoResponsable(evento);
        },
        error: (err) => this.reportarFalloFotoPrevio(err, 'No se pudo consultar la unidad militar por su sigla o acrónimo.')
      });
      return;
    }
    this.guardarRegistroResponsable(evento);
  }

  private continuarGuardadoResponsable(evento: GuardadoResponsableEvent): void {
    const operacion = evento.operacionFoto;
    if (operacion && operacion.tipo !== 'eliminar') {
      this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
        next: ({ parametrosSistemaDTO }) => {
          const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones)
            + String(parametrosSistemaDTO.rutaDestinoArchivosResponsables);
          this.ejecutarOperacionFotoPrevia(evento, rutaBase);
        },
        error: (err) => this.reportarFalloFotoPrevio(err, 'No se pudo obtener la configuración de archivos.')
      });
      return;
    }
    this.guardarRegistroResponsable(evento);
  }

  private ejecutarOperacionFotoPrevia(evento: GuardadoResponsableEvent, rutaBase: string): void {
    const operacion = evento.operacionFoto!;
    const rutaAnterior = this.conformarRutaFotoResponsable(rutaBase, operacion.carpetaAnterior, operacion.nombreAnterior);
    const rutaNueva = this.conformarRutaFotoResponsable(rutaBase, operacion.carpetaNueva, operacion.nombreNuevo);

    if (operacion.tipo === 'subir' && operacion.archivo) {
      this.gestionArchivosService.uploadFile(operacion.archivo, rutaNueva).subscribe({
        next: () => this.guardarRegistroResponsable(evento, rutaBase),
        error: (err) => this.reportarFalloFotoPrevio(err, 'No se pudo subir la fotografía.')
      });
      return;
    }
    if (operacion.tipo === 'mover') {
      this.gestionArchivosService.moveFile({ sourcePath: rutaAnterior, destinationPath: rutaNueva }).subscribe({
        next: () => this.guardarRegistroResponsable(evento, rutaBase),
        error: (err) => this.reportarFalloFotoPrevio(err, 'No se pudo mover la fotografía a la carpeta de la nueva unidad militar.')
      });
      return;
    }
    this.gestionArchivosService.renameFile({ oldPath: rutaAnterior, newPath: rutaNueva }).subscribe({
      next: () => this.guardarRegistroResponsable(evento, rutaBase),
      error: (err) => this.reportarFalloFotoPrevio(err, 'No se pudo renombrar la fotografía.')
    });
  }

  private guardarRegistroResponsable(evento: GuardadoResponsableEvent, rutaBaseOperacionPrevia?: string): void {
    const { responsable, operacionFoto } = evento;
    if (responsable.idResponsable) {
      this.responsablesService.updateResponsible(responsable).subscribe({
        next: (respuesta) => {
          this.procesarFotoDespuesDeGuardar(operacionFoto, respuesta.mensaje || 'Responsable modificado correctamente.');
        },
        error: (err) => {
          this.revertirOperacionFotoPrevia(operacionFoto, rutaBaseOperacionPrevia);
          console.error('ERROR AL MODIFICAR RESPONSABLE: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar el responsable.');
        }
      });
    } else {
      this.responsablesService.addResponsible(responsable).subscribe({
        next: (respuesta) => {
          this.procesarFotoDespuesDeGuardar(operacionFoto, respuesta.mensaje || 'Responsable creado correctamente.');
        },
        error: (err) => {
          this.revertirOperacionFotoPrevia(operacionFoto, rutaBaseOperacionPrevia);
          console.error('ERROR AL CREAR RESPONSABLE: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear el responsable.');
        }
      });
    }
  }

  private revertirOperacionFotoPrevia(operacion: OperacionFotoResponsable | null, rutaBase?: string): void {
    if (!operacion || !rutaBase || operacion.tipo === 'eliminar') return;
    const anterior = this.conformarRutaFotoResponsable(rutaBase, operacion.carpetaAnterior, operacion.nombreAnterior);
    const nuevo = this.conformarRutaFotoResponsable(rutaBase, operacion.carpetaNueva, operacion.nombreNuevo);
    if (operacion.tipo === 'subir') {
      if (anterior === nuevo) return;
      this.gestionArchivosService.deleteFile({ filePath: nuevo }).subscribe({ error: (err) => console.error('ERROR AL LIMPIAR LA FOTO NO ASOCIADA: ', err) });
    } else if (operacion.tipo === 'mover') {
      this.gestionArchivosService.moveFile({ sourcePath: nuevo, destinationPath: anterior }).subscribe({ error: (err) => console.error('ERROR AL REVERTIR EL MOVIMIENTO DE LA FOTO: ', err) });
    } else {
      this.gestionArchivosService.renameFile({ oldPath: nuevo, newPath: anterior }).subscribe({ error: (err) => console.error('ERROR AL REVERTIR EL RENOMBRADO DE LA FOTO: ', err) });
    }
  }

  private procesarFotoDespuesDeGuardar(operacion: OperacionFotoResponsable | null, mensaje: string): void {
    if (!operacion || operacion.tipo === 'mover' || operacion.tipo === 'renombrar') {
      this.finalizarGuardadoResponsable(mensaje);
      return;
    }
    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const base = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones)
          + String(parametrosSistemaDTO.rutaDestinoArchivosResponsables);
        const rutaAnterior = this.conformarRutaFotoResponsable(base, operacion.carpetaAnterior, operacion.nombreAnterior);
        const rutaNueva = this.conformarRutaFotoResponsable(base, operacion.carpetaNueva, operacion.nombreNuevo);
        if (operacion.tipo === 'subir' && (!operacion.nombreAnterior || rutaAnterior === rutaNueva)) {
          this.finalizarGuardadoResponsable(mensaje);
          return;
        }
        this.gestionArchivosService.deleteFile({ filePath: rutaAnterior }).subscribe({
          next: () => this.finalizarGuardadoResponsable(mensaje),
          error: (err) => {
            console.error('ERROR AL ELIMINAR LA FOTO ANTERIOR DEL RESPONSABLE: ', err);
            this.finalizarGuardadoResponsable(mensaje);
          }
        });
      },
      error: (err) => {
        console.error('ERROR AL OBTENER PARÁMETROS PARA LIMPIAR LA FOTO ANTERIOR: ', err);
        this.finalizarGuardadoResponsable(mensaje);
      }
    });
  }

  private reportarFalloFotoPrevio(error: unknown, mensaje: string): void {
    console.error('ERROR AL PROCESAR LA FOTOGRAFÍA DEL RESPONSABLE: ', error);
    this.mostrarToast('error', `${mensaje} El responsable no fue guardado ni modificado.`);
  }

  private conformarRutaFotoResponsable(rutaBase: string, carpetaUnidad: string, nombreArchivo: string): string {
    const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
    const carpetaNormalizada = carpetaUnidad.replace(/^[\\/]+|[\\/]+$/g, '');
    return `${baseNormalizada}${carpetaNormalizada}/${nombreArchivo}`;
  }

  private finalizarGuardadoResponsable(mensaje: string): void {
    this.mostrarToast('exito', mensaje);
    this.accionListar();
    this.cerrarModalAddUpdDel();
  }

  //RECIBE EL ID DEL RESPONSABLE A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarResponsable(idResponsable: number): void {
    this.responsablesService.getResponsiblebyId(idResponsable).subscribe({
      next: ({ responsableDTO }) => this.eliminarRegistroResponsable(idResponsable, responsableDTO),
      error: (err) => {
        console.error('ERROR AL CONSULTAR EL RESPONSABLE ANTES DE ELIMINARLO: ', err);
        this.mostrarToast('error', 'No se pudo consultar el responsable y no se realizó la eliminación.');
      }
    });
  }

  private eliminarRegistroResponsable(idResponsable: number, responsableEliminado: ResponsablesI): void {
    this.responsablesService.deleteResponsible(idResponsable).subscribe({
      next: (respuesta) => {
        const mensaje = respuesta.mensaje || 'Responsable eliminado correctamente.';
        const nombreFoto = String(responsableEliminado?.nombreArchivoFotoExtensionoFormatoResponsable || '');
        const siglaUnidad = String(responsableEliminado?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '');
        if (!nombreFoto || !siglaUnidad) {
          this.finalizarGuardadoResponsable(mensaje);
          return;
        }
        forkJoin({
          unidad: this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(siglaUnidad),
          parametros: this.parametrosSistemaService.getSystemParameterbyId(1)
        }).subscribe({
          next: ({ unidad, parametros }) => {
            const carpetaUnidad = String(unidad.unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '');
            if (!carpetaUnidad) {
              console.error('NO SE ENCONTRÓ LA CARPETA DE LA UNIDAD MILITAR: ', siglaUnidad);
              this.finalizarGuardadoResponsable(mensaje);
              return;
            }
            const parametrosSistemaDTO = parametros.parametrosSistemaDTO;
            const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones)
              + String(parametrosSistemaDTO.rutaDestinoArchivosResponsables);
            const ruta = this.conformarRutaFotoResponsable(rutaBase, carpetaUnidad, nombreFoto);
            this.gestionArchivosService.deleteFile({ filePath: ruta }).subscribe({
              next: () => this.finalizarGuardadoResponsable(mensaje),
              error: (err) => {
                console.error('ERROR AL ELIMINAR LA FOTO DEL RESPONSABLE ELIMINADO: ', err);
                this.finalizarGuardadoResponsable(mensaje);
              }
            });
          },
          error: (err) => {
            console.error('ERROR AL OBTENER PARÁMETROS PARA ELIMINAR LA FOTO DEL RESPONSABLE: ', err);
            this.finalizarGuardadoResponsable(mensaje);
          }
        });
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR RESPONSABLE: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el responsable.');
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
    this.limpiarMiniaturasFotos();
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }
}
