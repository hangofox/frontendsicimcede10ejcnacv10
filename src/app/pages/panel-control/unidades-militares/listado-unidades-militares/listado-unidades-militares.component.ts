import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

import { AddUpdDelUnidadMilitarComponent, GuardadoUnidadMilitarEvent } from '../add-upd-del-unidad-militar/add-upd-del-unidad-militar.component';
import { VistaUnidadMilitarComponent } from '../vista-unidad-militar/vista-unidad-militar.component';

@Component({
  selector: 'app-listado-unidades-militares',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelUnidadMilitarComponent, VistaUnidadMilitarComponent],
  templateUrl: './listado-unidades-militares.component.html',
  styleUrl: './listado-unidades-militares.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoUnidadesMilitaresComponent implements OnInit, OnDestroy {

  //PÁGINA ACTUAL DE UNIDADES MILITARES TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE RECORTA EN EL CLIENTE):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  totalRegistros = 0;

  unidadesMilitaresForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  unidadMilitarSeleccionada: UnidadesMilitaresI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;
  miniaturasFotos = new Map<number, string>();
  private readonly subscriptionsMiniaturas = new Subscription();
  private solicitudMiniaturasActual = 0;

  //REGISTROS ESPECIALES/ADMINISTRATIVOS QUE NO SON UNIDADES MILITARES REALES (SE USAN COMO VALORES COMODÍN EN
  //OTROS COMBOS DEL SISTEMA) — NO SE OCULTAN DE LA TABLA, PERO SUS ACCIONES DE VER/MODIFICAR/ELIMINAR QUEDAN
  //DESHABILITADAS, IGUAL QUE EN PortalSiadmecEjcNacionalV20 (listado-unidades-militares.component.html):
  private readonly siglasUnidadesMilitaresProtegidas = ['TODAS LAS UNIDADES MILITARES', 'OTRA UNIDAD MILITAR U ORGANIZACION', 'BAJASEQYPERS'];

  esUnidadMilitarProtegida(unidadMilitar: UnidadesMilitaresI): boolean {
    return this.siglasUnidadesMilitaresProtegidas.includes(String(unidadMilitar.siglaoAcronimoUnidadMilitar));
  }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService,
    private spinnerService: SpinnerService
  ) {
    this.unidadesMilitaresForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.accionListar();
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LA PALABRA CLAVE ACTUAL:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE:
  accionListar(): void {
    const valoresFormulario = this.unidadesMilitaresForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;

    this.unidadesMilitaresService.findAllMilitaryUnitsPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      'idUnidadMilitar',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.unidadesMilitares = data;
        this.cargarMiniaturasFotos(data);
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR UNIDADES MILITARES: ', err)
    });

    this.unidadesMilitaresService.findCountTotalRegisters(undefined, keyword)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE UNIDADES MILITARES: ', err)
      });
  }

  private cargarMiniaturasFotos(unidades: UnidadesMilitaresI[]): void {
    const solicitud = ++this.solicitudMiniaturasActual;
    this.limpiarMiniaturasFotos();
    if (!unidades.length) return;
    this.subscriptionsMiniaturas.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosUnidadesMilitares).trim();
        unidades.forEach(unidad => {
          const id = Number(unidad.idUnidadMilitar);
          if (!id) return;
          this.subscriptionsMiniaturas.add(this.unidadesMilitaresService.getMilitaryUnitbyId(id).subscribe({
            next: ({ unidadMilitarDTO }) => {
              if (solicitud !== this.solicitudMiniaturasActual) return;
              const nombre = String(unidadMilitarDTO?.nombreArchivoFotoLogExtoFmtUnidadMilitar || '').trim();
              if (!nombre) return;
              this.subscriptionsMiniaturas.add(this.gestionArchivosService.getFile(rutaBase + nombre).subscribe({
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
        });
      },
      error: () => this.limpiarMiniaturasFotos()
    }));
  }

  obtenerMiniaturaFoto(id?: number): string | null {
    return id ? this.miniaturasFotos.get(Number(id)) || null : null;
  }

  onErrorMiniaturaFoto(id?: number): void {
    if (id) this.eliminarMiniaturaFoto(Number(id));
  }

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
    this.tandaNumeroRegistrosporPagina = Number(this.unidadesMilitaresForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', unidadMilitar: UnidadesMilitaresI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.unidadMilitarSeleccionada = unidadMilitar;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(unidadMilitar: UnidadesMilitaresI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.unidadMilitarSeleccionada = unidadMilitar;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.unidadMilitarSeleccionada = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.unidadMilitarSeleccionada = null;
  }

  //RECIBE LA UNIDAD MILITAR NUEVA O MODIFICADA DESDE EL MODAL Y LA ENVÍA AL BACKEND (POST SI ES NUEVA, PUT SI YA TIENE ID):
  guardarUnidadMilitar(evento: GuardadoUnidadMilitarEvent): void {
    const { unidadMilitar, operacionFoto } = evento;
    if (!unidadMilitar.idUnidadMilitar && operacionFoto?.tipo === 'subir') {
      const unidadSinFoto = { ...unidadMilitar, nombreArchivoFotoLogExtoFmtUnidadMilitar: '' };
      this.unidadesMilitaresService.addMilitaryUnit(unidadSinFoto).subscribe({
        next: (respuesta) => this.completarFotoUnidadCreada(evento, respuesta.mensaje || 'Unidad militar creada correctamente.'),
        error: (err) => this.reportarErrorGuardado(err, 'Error al crear la unidad militar.')
      });
      return;
    }
    if (unidadMilitar.idUnidadMilitar && operacionFoto?.tipo === 'subir' && operacionFoto.archivo) {
      this.obtenerRutaBaseFotos((rutaBase) => {
        this.gestionArchivosService.uploadFile(operacionFoto.archivo!, rutaBase + operacionFoto.nombreNuevo).subscribe({
          next: () => this.guardarRegistroUnidad(evento, rutaBase),
          error: (err) => this.reportarErrorFotoPrevia(err, 'No se pudo subir el logotipo. La unidad militar no fue modificada.')
        });
      });
      return;
    }
    this.guardarRegistroUnidad(evento);
  }

  private guardarRegistroUnidad(evento: GuardadoUnidadMilitarEvent, rutaBasePreSubida?: string): void {
    const { unidadMilitar, operacionFoto } = evento;
    if (unidadMilitar.idUnidadMilitar) {
      this.unidadesMilitaresService.updateMilitaryUnit(unidadMilitar).subscribe({
        next: (respuesta) => this.procesarFotoUnidadDespuesDeGuardar(operacionFoto, respuesta.mensaje || 'Unidad militar modificada correctamente.'),
        error: (err) => {
          if (rutaBasePreSubida && operacionFoto?.tipo === 'subir' && operacionFoto.nombreAnterior !== operacionFoto.nombreNuevo) {
            this.gestionArchivosService.deleteFile({ filePath: rutaBasePreSubida + operacionFoto.nombreNuevo }).subscribe({ error: () => {} });
          }
          this.reportarErrorGuardado(err, 'Error al modificar la unidad militar.');
        }
      });
    } else {
      this.unidadesMilitaresService.addMilitaryUnit(unidadMilitar).subscribe({
        next: (respuesta) => this.finalizarGuardado(respuesta.mensaje || 'Unidad militar creada correctamente.'),
        error: (err) => this.reportarErrorGuardado(err, 'Error al crear la unidad militar.')
      });
    }
  }

  private completarFotoUnidadCreada(evento: GuardadoUnidadMilitarEvent, mensaje: string): void {
    const sigla = String(evento.unidadMilitar.siglaoAcronimoUnidadMilitar).trim();
    this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(sigla).subscribe({
      next: ({ unidadMilitarDTO }) => {
        const id = Number(unidadMilitarDTO.idUnidadMilitar);
        const extension = (evento.operacionFoto?.archivo?.name.split('.').pop() || '').toLowerCase();
        const nombre = `${this.encriptarIdUnidad(id)}.${extension}`;
        this.obtenerRutaBaseFotos((rutaBase) => {
          this.gestionArchivosService.uploadFile(evento.operacionFoto!.archivo!, rutaBase + nombre).subscribe({
            next: () => this.unidadesMilitaresService.updateMilitaryUnit({ ...unidadMilitarDTO, nombreArchivoFotoLogExtoFmtUnidadMilitar: nombre }).subscribe({
              next: () => this.finalizarGuardado(mensaje),
              error: (err) => {
                this.gestionArchivosService.deleteFile({ filePath: rutaBase + nombre }).subscribe({ error: () => {} });
                this.reportarErrorGuardado(err, 'La unidad militar fue creada, pero no se pudo asociar el logotipo.');
              }
            }),
            error: (err) => this.reportarErrorFotoPrevia(err, 'La unidad militar fue creada sin logotipo porque el archivo no pudo subirse.')
          });
        });
      },
      error: (err) => this.reportarErrorFotoPrevia(err, 'La unidad militar fue creada sin logotipo porque no pudo consultarse por sigla.')
    });
  }

  private procesarFotoUnidadDespuesDeGuardar(operacion: GuardadoUnidadMilitarEvent['operacionFoto'], mensaje: string): void {
    if (!operacion || (operacion.tipo === 'subir' && (!operacion.nombreAnterior || operacion.nombreAnterior === operacion.nombreNuevo))) {
      this.finalizarGuardado(mensaje);
      return;
    }
    this.obtenerRutaBaseFotos((rutaBase) => this.gestionArchivosService.deleteFile({ filePath: rutaBase + operacion.nombreAnterior }).subscribe({
      next: () => this.finalizarGuardado(mensaje),
      error: (err) => {
        console.error('ERROR AL ELIMINAR EL LOGOTIPO ANTERIOR: ', err);
        this.finalizarGuardado(mensaje);
      }
    }));
  }

  private obtenerRutaBaseFotos(continuar: (rutaBase: string) => void): void {
    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => continuar(String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
        + String(parametrosSistemaDTO.rutaDestinoArchivosUnidadesMilitares).trim()),
      error: (err) => this.reportarErrorFotoPrevia(err, 'No se pudo obtener la configuración de archivos.')
    });
  }

  private encriptarIdUnidad(id: number): string {
    let valor = String(id);
    for (let i = 0; i < 2; i++) valor = btoa(valor);
    return valor;
  }

  private finalizarGuardado(mensaje: string): void {
    this.mostrarToast('exito', mensaje);
    this.accionListar();
    this.cerrarModalAddUpdDel();
  }

  private reportarErrorGuardado(err: any, mensaje: string): void {
    console.error('ERROR AL GUARDAR UNIDAD MILITAR: ', err);
    this.mostrarToast('error', err?.error?.mensaje || mensaje);
  }

  private reportarErrorFotoPrevia(err: unknown, mensaje: string): void {
    console.error('ERROR AL PROCESAR EL LOGOTIPO DE LA UNIDAD MILITAR: ', err);
    this.mostrarToast('error', mensaje);
    this.accionListar();
    this.cerrarModalAddUpdDel();
  }

  //RECIBE EL ID DE LA UNIDAD MILITAR A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarUnidadMilitar(idUnidadMilitar: number): void {
    this.unidadesMilitaresService.getMilitaryUnitbyId(idUnidadMilitar).subscribe({
      next: ({ unidadMilitarDTO }) => this.eliminarRegistroUnidadMilitar(idUnidadMilitar, unidadMilitarDTO),
      error: (err) => {
        console.error('ERROR AL CONSULTAR LA UNIDAD MILITAR ANTES DE ELIMINARLA: ', err);
        this.mostrarToast('error', 'No se pudo consultar la unidad militar y no se realizó la eliminación.');
      }
    });
  }

  private eliminarRegistroUnidadMilitar(idUnidadMilitar: number, unidadEliminada: UnidadesMilitaresI): void {
    this.unidadesMilitaresService.deleteMilitaryUnit(idUnidadMilitar).subscribe({
      next: (respuesta) => {
        const mensaje = respuesta.mensaje || 'Unidad militar eliminada correctamente.';
        const nombre = String(unidadEliminada?.nombreArchivoFotoLogExtoFmtUnidadMilitar || '').trim();
        if (!nombre) { this.finalizarGuardado(mensaje); return; }
        this.obtenerRutaBaseFotos((rutaBase) => this.gestionArchivosService.deleteFile({ filePath: rutaBase + nombre }).subscribe({
          next: () => this.finalizarGuardado(mensaje),
          error: (err) => { console.error('ERROR AL ELIMINAR EL LOGOTIPO DE LA UNIDAD MILITAR ELIMINADA: ', err); this.finalizarGuardado(mensaje); }
        }));
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR UNIDAD MILITAR: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar la unidad militar.');
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
