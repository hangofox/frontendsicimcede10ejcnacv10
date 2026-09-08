import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UsuariosI } from '../../../../interfaces/panel-control/usuarios/usuarios.interface';
import { TiposUsuariosI } from '../../../../interfaces/panel-control/tipos-usuarios/tipos-usuarios.interface';
import { TiposDocumentosIdentificacionI } from '../../../../interfaces/tipos-documentos-identificacion/tipos-documentos-identificacion.interface';
import { GradosSiathI } from '../../../../interfaces/grados-siath/grados-siath.interface';
import { PaisesMundoI } from '../../../../interfaces/paises-mundo/paises-mundo.interface';
import { DepartamentosoEstadosMundoI } from '../../../../interfaces/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface';

import { UsuariosService } from '../../../../services/panel-control/usuarios/usuarios.service';
import { TiposUsuariosService } from '../../../../services/panel-control/tipos-usuarios/tipos-usuarios.service';
import { TiposDocumentosIdentificacionService } from '../../../../services/tipos-documentos-identificacion/tipos-documentos-identificacion.service';
import { GradosSiathService } from '../../../../services/grados-siath/grados-siath.service';
import { PaisesMundoService } from '../../../../services/paises-mundo/paises-mundo.service';
import { DepartamentosoEstadosMundoService } from '../../../../services/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.service';
import { SpinnerService } from '../../../../services/spinner/spinner.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

import { AddUpdDelUsuarioComponent, GuardadoUsuarioEvent, OperacionFotoUsuario } from '../add-upd-del-usuario/add-upd-del-usuario.component';
import { VistaUsuarioComponent } from '../vista-usuario/vista-usuario.component';
import { PrivilegiosRestriccionesUsuariosComponent } from '../privilegios-restricciones-usuarios/privilegios-restricciones-usuarios.component';
import { SemaforoContadoresComponent } from '../../../../shared/components/semaforo-contadores/semaforo-contadores.component';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelUsuarioComponent, VistaUsuarioComponent, PrivilegiosRestriccionesUsuariosComponent, SemaforoContadoresComponent],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoUsuariosComponent implements OnInit, OnDestroy {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (SE USAN EN LOS COMBOS DE FILTRO Y DEL FORMULARIO):
  tiposUsuarios: TiposUsuariosI[] = [];
  tiposDocumentos: TiposDocumentosIdentificacionI[] = [];
  gradosSiath: GradosSiathI[] = [];
  paisesMundo: PaisesMundoI[] = [];
  departamentosoEstadosMundo: DepartamentosoEstadosMundoI[] = [];

  //PÁGINA ACTUAL DE USUARIOS TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE RECORTA EN EL CLIENTE):
  usuarios: UsuariosI[] = [];
  totalRegistros = 0;
  totalRegistrosActivos = 0;
  totalRegistrosInactivos = 0;

  usuariosForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalPrivilegiosVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  usuarioSeleccionado: UsuariosI | null = null;

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
    private usuariosService: UsuariosService,
    private tiposUsuariosService: TiposUsuariosService,
    private tiposDocumentosIdentificacionService: TiposDocumentosIdentificacionService,
    private gradosSiathService: GradosSiathService,
    private paisesMundoService: PaisesMundoService,
    private departamentosoEstadosMundoService: DepartamentosoEstadosMundoService,
    private spinnerService: SpinnerService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService
  ) {
    this.usuariosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxTipoUsuarioSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarTiposUsuarios();
    this.cargarTiposDocumentos();
    this.cargarGradosSiath();
    this.cargarPaisesMundo();
    this.cargarDepartamentosoEstadosMundo();
    this.accionListar();
  }

  //CARGA LOS TIPOS DE USUARIO DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO). SE EXCLUYE EL REGISTRO
  //"TODOS LOS TIPOS DE USUARIOS" QUE EXISTE COMO FILA REAL EN tabla_tipos_usuarios: EN EL COMBO DE FILTRO YA
  //TENEMOS NUESTRA PROPIA OPCIÓN "" QUE CUMPLE ESA FUNCIÓN (SIN FILTRO), Y EN EL FORMULARIO DE CREAR/MODIFICAR NO
  //TIENE SENTIDO QUE UN USUARIO REAL QUEDE ASIGNADO A ESE "TIPO" PLACEHOLDER — SIN ESTA EXCLUSIÓN EL DATO
  //APARECÍA DUPLICADO (EL PLACEHOLDER PROPIO + EL REGISTRO REAL DE LA BASE DE DATOS):
  private cargarTiposUsuarios(): void {
    this.tiposUsuariosService.findAllTypesOfUsers(undefined, undefined, 'nombreTipoUsuario', 'ASC')
      .subscribe({
        next: (tipos) => {
          this.tiposUsuarios = tipos.filter(tipo => String(tipo.nombreTipoUsuario).trim().toUpperCase() !== 'TODOS LOS TIPOS DE USUARIOS');
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE USUARIO: ', err)
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

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE Y EL TIPO DE USUARIO SELECCIONADOS:
  accionListar(): void {
    const valoresFormulario = this.usuariosForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const nombreTipoUsuario: string | undefined = (valoresFormulario.cboxTipoUsuarioSeleccionado as string) || undefined;

    this.usuariosService.findAllUsersPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      nombreTipoUsuario,
      keyword,
      'idUsuario',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargarMiniaturasFotos(data);
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR USUARIOS: ', err)
    });

      this.usuariosService.findCountTotalRegisters(undefined, nombreTipoUsuario, keyword)
        .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
          error: (err) => console.error('ERROR AL CONTAR TOTAL DE USUARIOS: ', err)
        });

      //EL ENDPOINT DE CONTEO DE USUARIOS NO RECIBE EL ESTADO. SE CONSULTA LA COLECCION COMPLETA CON LOS MISMOS
      //FILTROS ACTIVOS PARA OBTENER LOS SEMAFOROS SIN LIMITAR EL CALCULO A LA PAGINA QUE SE ESTA VISUALIZANDO:
      this.usuariosService.findAllUsers(undefined, nombreTipoUsuario, keyword, 'idUsuario', 'ASC')
        .subscribe({
          next: (usuariosFiltrados) => {
            this.totalRegistrosActivos = usuariosFiltrados.filter(usuario =>
              String(usuario.estadoUsuario).trim().toUpperCase() === 'ACTIVO'
            ).length;
            this.totalRegistrosInactivos = usuariosFiltrados.filter(usuario =>
              String(usuario.estadoUsuario).trim().toUpperCase() === 'INACTIVO'
            ).length;
            this.changeDetectorRef.markForCheck();
          },
          error: (err) => console.error('ERROR AL CONTAR USUARIOS POR ESTADO: ', err)
        });
    }

  private cargarMiniaturasFotos(usuarios: UsuariosI[]): void {
    const solicitud = ++this.solicitudMiniaturasActual;
    this.limpiarMiniaturasFotos();
    if (!usuarios.length) return;
    this.subscriptionsMiniaturas.add(this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosUsuarios).trim();
        usuarios.forEach(usuario => {
          const id = Number(usuario.idUsuario);
          if (!id) return;
          this.subscriptionsMiniaturas.add(this.usuariosService.getUserbyId(id).subscribe({
            next: ({ usuarioDTO }) => {
              if (solicitud !== this.solicitudMiniaturasActual) return;
              const nombre = String(usuarioDTO?.nombreArchivoFotoExtensionoFormatoUsuario || '').trim();
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
    this.tandaNumeroRegistrosporPagina = Number(this.usuariosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', usuario: UsuariosI | null = null): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalModo = modo;
      this.usuarioSeleccionado = usuario;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(usuario: UsuariosI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.usuarioSeleccionado = usuario;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalPrivilegiosyRestricciones(usuario: UsuariosI): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.usuarioSeleccionado = usuario;
      this.modalPrivilegiosVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.usuarioSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.usuarioSeleccionado = null;
  }

  cerrarModalPrivilegios(): void {
    this.modalPrivilegiosVisible = false;
    this.usuarioSeleccionado = null;
  }

  //RECIBE EL USUARIO NUEVO O MODIFICADO DESDE EL MODAL Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID):
  guardarUsuario(evento: GuardadoUsuarioEvent): void {
    const operacion = evento.operacionFoto;
    if (operacion?.tipo === 'subir' && operacion.archivo) {
      this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
        next: ({ parametrosSistemaDTO }) => {
          const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones)
            + String(parametrosSistemaDTO.rutaDestinoArchivosUsuarios);
          this.gestionArchivosService.uploadFile(operacion.archivo!, rutaBase + operacion.nombreNuevo).subscribe({
            next: () => this.guardarRegistroUsuario(evento, rutaBase),
            error: (err) => {
              console.error('ERROR AL SUBIR LA FOTOGRAFÍA DEL USUARIO: ', err);
              this.mostrarToast('error', 'No se pudo subir la fotografía. El usuario no fue guardado ni modificado.');
            }
          });
        },
        error: (err) => {
          console.error('ERROR AL OBTENER LOS PARÁMETROS PARA LA FOTOGRAFÍA: ', err);
          this.mostrarToast('error', 'No se pudo obtener la configuración de archivos. El usuario no fue guardado ni modificado.');
        }
      });
      return;
    }
    this.guardarRegistroUsuario(evento);
  }

  private guardarRegistroUsuario(evento: GuardadoUsuarioEvent, rutaFotoPreSubida?: string): void {
    const { usuario, operacionFoto } = evento;
    if (usuario.idUsuario) {
      this.usuariosService.updateUser(usuario).subscribe({
        next: (respuesta) => {
          this.procesarFotoDespuesDeGuardar(operacionFoto, respuesta.mensaje || 'Usuario modificado correctamente.');
        },
        error: (err) => {
          this.limpiarFotoPreSubida(operacionFoto, rutaFotoPreSubida);
          console.error('ERROR AL MODIFICAR USUARIO: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar el usuario.');
        }
      });
    } else {
      this.usuariosService.addUser(usuario).subscribe({
        next: (respuesta: any) => {
          this.procesarFotoDespuesDeGuardar(operacionFoto, respuesta.mensaje || 'Usuario creado correctamente.');
        },
        error: (err) => {
          this.limpiarFotoPreSubida(operacionFoto, rutaFotoPreSubida);
          console.error('ERROR AL CREAR USUARIO: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear el usuario.');
        }
      });
    }
  }

  private limpiarFotoPreSubida(operacion: OperacionFotoUsuario | null, rutaBase?: string): void {
    if (operacion?.tipo !== 'subir' || !rutaBase || operacion.nombreAnterior === operacion.nombreNuevo) return;
    this.gestionArchivosService.deleteFile({ filePath: rutaBase + operacion.nombreNuevo }).subscribe({
      error: (err) => console.error('ERROR AL LIMPIAR LA FOTOGRAFÍA NO ASOCIADA: ', err)
    });
  }

  private procesarFotoDespuesDeGuardar(operacion: OperacionFotoUsuario | null, mensajeExito: string): void {
    if (!operacion) {
      this.finalizarGuardadoUsuario(mensajeExito);
      return;
    }

    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones)
          + String(parametrosSistemaDTO.rutaDestinoArchivosUsuarios);

        if (operacion.tipo === 'subir' && operacion.archivo) {
          if (operacion.nombreAnterior && operacion.nombreAnterior !== operacion.nombreNuevo) {
            this.gestionArchivosService.deleteFile({ filePath: rutaBase + operacion.nombreAnterior }).subscribe({
              next: () => this.finalizarGuardadoUsuario(mensajeExito),
              error: (err) => {
                console.error('ERROR AL ELIMINAR LA FOTO ANTERIOR DEL USUARIO: ', err);
                this.finalizarGuardadoUsuario(mensajeExito);
              }
            });
          } else {
            this.finalizarGuardadoUsuario(mensajeExito);
          }
          return;
        }

        if (operacion.tipo === 'renombrar') {
          this.gestionArchivosService.renameFile({ oldPath: rutaBase + operacion.nombreAnterior, newPath: rutaBase + operacion.nombreNuevo }).subscribe({
            next: () => this.finalizarGuardadoUsuario(mensajeExito),
            error: (err) => this.finalizarGuardadoUsuarioConAviso(err, 'El usuario se guardó, pero no se pudo renombrar la fotografía.')
          });
          return;
        }

        this.gestionArchivosService.deleteFile({ filePath: rutaBase + operacion.nombreAnterior }).subscribe({
          next: () => this.finalizarGuardadoUsuario(mensajeExito),
          error: (err) => this.finalizarGuardadoUsuarioConAviso(err, 'El usuario se guardó, pero no se pudo eliminar la fotografía.')
        });
      },
      error: (err) => this.finalizarGuardadoUsuarioConAviso(err, 'El usuario se guardó, pero no se pudo obtener la configuración de archivos.')
    });
  }

  private finalizarGuardadoUsuario(mensaje: string): void {
    this.mostrarToast('exito', mensaje);
    this.accionListar();
    this.cerrarModalAddUpdDel();
  }

  private finalizarGuardadoUsuarioConAviso(error: unknown, mensaje: string): void {
    console.error('ERROR AL PROCESAR LA FOTOGRAFÍA DEL USUARIO: ', error);
    this.mostrarToast('error', mensaje);
    this.accionListar();
    this.cerrarModalAddUpdDel();
  }

  //RECIBE EL ID DEL USUARIO A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarUsuario(idUsuario: number): void {
    this.usuariosService.getUserbyId(idUsuario).subscribe({
      next: ({ usuarioDTO }) => this.eliminarRegistroUsuario(idUsuario, String(usuarioDTO?.nombreArchivoFotoExtensionoFormatoUsuario || '').trim()),
      error: (err) => {
        console.error('ERROR AL CONSULTAR EL USUARIO ANTES DE ELIMINARLO: ', err);
        this.mostrarToast('error', 'No se pudo consultar el usuario y no se realizó la eliminación.');
      }
    });
  }

  private eliminarRegistroUsuario(idUsuario: number, nombreFoto: string): void {
    this.usuariosService.deleteUser(idUsuario).subscribe({
      next: (respuesta) => {
        const mensaje = respuesta.mensaje || 'Usuario eliminado correctamente.';
        if (!nombreFoto) { this.finalizarGuardadoUsuario(mensaje); return; }
        this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
          next: ({ parametrosSistemaDTO }) => {
            const ruta = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
              + String(parametrosSistemaDTO.rutaDestinoArchivosUsuarios).trim() + nombreFoto;
            this.gestionArchivosService.deleteFile({ filePath: ruta }).subscribe({
              next: () => this.finalizarGuardadoUsuario(mensaje),
              error: (err) => { console.error('ERROR AL ELIMINAR LA FOTO DEL USUARIO ELIMINADO: ', err); this.finalizarGuardadoUsuario(mensaje); }
            });
          },
          error: (err) => { console.error('ERROR AL OBTENER PARÁMETROS PARA ELIMINAR LA FOTO: ', err); this.finalizarGuardadoUsuario(mensaje); }
        });
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR USUARIO: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el usuario.');
      }
    });
  }

  //cerrarModal* SE DISPARAN DESDE (click) EN EL TEMPLATE, ASÍ QUE OnPush YA LOS DETECTA SOLO; NO NECESITAN
  //markForCheck() (abrirModalAddUpdDel/abrirModalVista/abrirModalPrivilegiosyRestricciones SÍ LO NECESITAN PORQUE
  //MUTAN EL ESTADO DENTRO DEL setTimeout DE SpinnerService.mostrarAntesDeAbrir):

  recibirToast(evento: { tipo: 'exito' | 'error'; mensaje: string }): void {
    this.mostrarToast(evento.tipo, evento.mensaje);
  }

  //CENTRALIZA EL markForCheck() PARA EL TOAST — TANTO AL MOSTRARLO (SE LLAMA DESDE CALLBACKS ASÍNCRONOS DE
  //subscribe QUE OnPush NO DETECTA POR SÍ SOLO) COMO AL OCULTARLO (DENTRO DE setTimeout, IGUALMENTE ASÍNCRONO):
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
