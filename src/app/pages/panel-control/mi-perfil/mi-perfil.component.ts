import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { UsuariosI } from '../../../interfaces/panel-control/usuarios/usuarios.interface';
import { ParametrosSistemaI } from '../../../interfaces/panel-control/parametros-sistema/parametros-sistema.interface';
import { AuthService } from '../../../core/services/auth.service';
import { UsuariosService } from '../../../services/panel-control/usuarios/usuarios.service';
import { ParametrosSistemaService } from '../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../services/gestion-archivos/gestion-archivos.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiPerfilComponent implements OnInit {

  miPerfilForm!: FormGroup;
  mensajeError = '';
  cargandoDatos = false;

  //FOTO DE PERFIL — VISTA PREVIA DE LA YA ALMACENADA EN EL SERVIDOR DE ARCHIVOS (resolverPreviewFotoUsuario) O DE
  //UNA NUEVA SELECCIONADA LOCALMENTE (onSelectFileUserPhoto, CON FileReader PARA VISTA PREVIA INMEDIATA):
  previewUrlFotoUsuario: string | null = null;
  nombreArchivoFotoExtensionoFormatoUsuario: string | null = null;
  selectedFileUserPhoto: File | null = null;
  isSelectedFileUserPhoto = false;
  banderaConfirmacionEliminacionFoto = false;

  //TOAST:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  //USUARIO CARGADO DESDE EL BACKEND — SE USA PARA REPOBLAR EL FORMULARIO Y CONSERVAR LOS CAMPOS NO EDITABLES AL GUARDAR:
  private usuario!: UsuariosI;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  private initForm(): void {
    this.miPerfilForm = this.formBuilder.group({
      nicknameUsuario: ['', Validators.required],
      passwordUsuario1: [''],
      passwordUsuario2: [''],
      nombreTipoDocumentoIdentificacion: [{ value: '', disabled: true }],
      numeroDocumentoIdentificacionUsuario: [{ value: '', disabled: true }],
      lugarExpedicionDocumentoIdentificacionUsuario: [{ value: '', disabled: true }],
      gradoUsuario: [{ value: '', disabled: true }],
      nombresUsuario: [{ value: '', disabled: true }],
      primerApellidoUsuario: [{ value: '', disabled: true }],
      segundoApellidoUsuario: [{ value: '', disabled: true }],
      fechaHMSNacimientoUsuario: [{ value: '', disabled: true }],
      sexoUsuario: [{ value: '', disabled: true }],
      direccionUsuario: ['', Validators.required],
      telefonoUsuario: [''],
      movilUsuario: ['', Validators.required],
      correoElectronicoPersonalUsuario: ['', [Validators.required, Validators.email]],
      correoElectronicoInstitucionalUsuario: [''],
      nombrePaisMundoOrigenUsuario: [{ value: '', disabled: true }],
      nombreDepartamentooEstadoMundoOrigenUsuario: [{ value: '', disabled: true }],
      nombreCiudadMundoOrigenUsuario: [{ value: '', disabled: true }],
      nombreTipoUsuario: [{ value: '', disabled: true }],
      fechaHMSIngresoUsuario: [{ value: '', disabled: true }],
      estadoUsuario: [{ value: '', disabled: true }]
    });
  }

  //CARGA LOS DATOS DEL USUARIO LOGUEADO DESDE EL BACKEND, A PARTIR DEL idUsuario GUARDADO EN LA SESIÓN POR AuthService:
  private cargarDatosUsuario(): void {
    const usuarioSesion = this.authService.usuarioActual();
    if (!usuarioSesion?.idUsuario) {
      this.mensajeError = 'No se encontró la sesión del usuario. Por favor inicie sesión nuevamente.';
      this.changeDetectorRef.markForCheck();
      return;
    }
    this.cargandoDatos = true;
    this.usuariosService.getUserbyId(usuarioSesion.idUsuario).subscribe({
      next: (respuesta) => {
        this.usuario = respuesta.usuarioDTO;
        this.cargandoDatos = false;
        this.chargueForm();
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.cargandoDatos = false;
        console.error('ERROR AL CARGAR LOS DATOS DEL PERFIL: ', err);
        this.mensajeError = 'Error al cargar los datos del perfil. Verifique la conexión con el servidor.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  //CARGA EL FORMULARIO CON LOS DATOS DEL USUARIO YA CONSULTADO EN EL BACKEND:
  private chargueForm(): void {
    this.miPerfilForm.patchValue({
      nicknameUsuario: this.usuario.nicknameUsuario || '',
      passwordUsuario1: '',
      passwordUsuario2: '',
      nombreTipoDocumentoIdentificacion: this.usuario.tipoDocumentoIdentificacionDTO?.nombreTipoDocumentoIdentificacion || '',
      numeroDocumentoIdentificacionUsuario: this.usuario.numeroDocumentoIdentificacionUsuario || '',
      lugarExpedicionDocumentoIdentificacionUsuario: this.usuario.lugarExpedicionDocumentoIdentificacionUsuario || '',
      gradoUsuario: this.usuario.gradoUsuario || '',
      nombresUsuario: this.usuario.nombresUsuario || '',
      primerApellidoUsuario: this.usuario.primerApellidoUsuario || '',
      segundoApellidoUsuario: this.usuario.segundoApellidoUsuario || '',
      fechaHMSNacimientoUsuario: this.formatearFechaParaInput(this.usuario.fechaHMSNacimientoUsuario),
      sexoUsuario: this.usuario.sexoUsuario || '',
      direccionUsuario: this.usuario.direccionUsuario || '',
      telefonoUsuario: this.usuario.telefonoUsuario || '',
      movilUsuario: this.usuario.movilUsuario || '',
      correoElectronicoPersonalUsuario: this.usuario.correoElectronicoPersonalUsuario || '',
      correoElectronicoInstitucionalUsuario: this.usuario.correoElectronicoInstitucionalUsuario || '',
      //CAMPOS DE ORIGEN — LOS NOMBRES DEL FORMULARIO DIFIEREN DE LOS DE LA INTERFAZ:
      nombrePaisMundoOrigenUsuario: this.usuario.paisOrigenUsuario || '',
      nombreDepartamentooEstadoMundoOrigenUsuario: this.usuario.departamentooEstadoOrigenUsuario || '',
      nombreCiudadMundoOrigenUsuario: this.usuario.ciudadOrigenUsuario || '',
      nombreTipoUsuario: this.usuario.tipoUsuarioDTO?.nombreTipoUsuario || '',
      fechaHMSIngresoUsuario: this.formatearFechaParaInput(this.usuario.fechaHMSIngresoUsuario),
      estadoUsuario: this.usuario.estadoUsuario || ''
    });

    this.selectedFileUserPhoto = null;
    this.isSelectedFileUserPhoto = false;
    if (this.usuario.nombreArchivoFotoExtensionoFormatoUsuario) {
      this.nombreArchivoFotoExtensionoFormatoUsuario = String(this.usuario.nombreArchivoFotoExtensionoFormatoUsuario);
      this.resolverPreviewFotoUsuario(this.nombreArchivoFotoExtensionoFormatoUsuario);
    } else {
      this.nombreArchivoFotoExtensionoFormatoUsuario = null;
      this.liberarPreviewFotoUsuario();
      this.previewUrlFotoUsuario = null;
    }
  }

  //RESUELVE LA URL LOCAL DE LA FOTO YA ALMACENADA EN EL SERVIDOR DE ARCHIVOS PARA MOSTRARLA COMO VISTA PREVIA —
  //MISMO PATRÓN QUE frontend-sigeps-v10 (getFile() + getFileBytes() PORQUE UN <img> NO PUEDE ENVIAR EL TOKEN):
  private resolverPreviewFotoUsuario(nombreArchivo: string): void {
    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: (respuestaParametros) => {
        const parametrosSistema = respuestaParametros.parametrosSistemaDTO;
        const rutaCompleta = String(parametrosSistema.rutaDestinoCarpetaPrincipalServidorAplicaciones)
          + String(parametrosSistema.rutaDestinoArchivosUsuarios) + nombreArchivo;
        this.gestionArchivosService.getFile(rutaCompleta).subscribe({
          next: (respuestaArchivo) => {
            this.gestionArchivosService.getFileBytes(respuestaArchivo.rutaEstatica).subscribe({
              next: (blob) => {
                this.liberarPreviewFotoUsuario();
                this.previewUrlFotoUsuario = URL.createObjectURL(blob);
                this.changeDetectorRef.markForCheck();
              },
              error: () => { this.previewUrlFotoUsuario = null; this.changeDetectorRef.markForCheck(); }
            });
          },
          error: () => { this.previewUrlFotoUsuario = null; this.changeDetectorRef.markForCheck(); }
        });
      },
      error: (err) => {
        console.error('ERROR AL OBTENER LOS PARÁMETROS DEL SISTEMA PARA LA VISTA PREVIA DE LA FOTO: ', err);
        this.previewUrlFotoUsuario = null;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  //NORMALIZA UNA FECHA DEL BACKEND AL FORMATO YYYY-MM-DDTHH:mm QUE REQUIERE <input type="datetime-local">. LOS
  //CAMPOS TIMESTAMP DE ORACLE LLEGAN CON ESPACIO EN VEZ DE "T" Y, MUCHAS VECES, CON SEGUNDOS/FRACCIÓN DE SEGUNDOS
  //(EJ. "2024-05-12 14:30:00.0") — MISMO PATRÓN QUE AddUpdDelUsuarioComponent.formatearFechaParaInput():
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //DEVUELVE LA FECHA Y HORA LOCAL ACTUAL EN FORMATO YYYY-MM-DDTHH:mm. A PROPÓSITO NO SE USA Date.toISOString()
  //(DEVUELVE LA HORA EN UTC): EN COLOMBIA (UTC-5) EL DATO QUEDABA 5 HORAS ADELANTADO. MISMO PATRÓN QUE
  //AddUpdDelUsuarioComponent.obtenerFechaHoraActual() Y AuditoriasSistemaService.obtenerFechaHoraLocalActual():
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  onSelectFileUserPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const extension = (file.name.split('.').pop() || '').toLowerCase();
    const extensionesPermitidas = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
    const tamanoMaximoBytes = 2_000_000; //2.0 MB.

    if (file.size > tamanoMaximoBytes) {
      this.mostrarToast('error', 'El archivo excede el tamaño máximo permitido de 2.0 MB.');
      input.value = '';
      return;
    }
    if (!extensionesPermitidas.includes(extension)) {
      this.mostrarToast('error', 'El archivo debe tener una extensión válida (jpg, jpeg, bmp, png o gif).');
      input.value = '';
      return;
    }

    this.selectedFileUserPhoto = file;
    this.isSelectedFileUserPhoto = true;

    const lector = new FileReader();
    lector.onload = () => {
      this.liberarPreviewFotoUsuario();
      this.previewUrlFotoUsuario = lector.result as string;
      this.changeDetectorRef.markForCheck();
    };
    lector.readAsDataURL(file);
  }

  //CANCELA LA SELECCIÓN PENDIENTE DE UN ARCHIVO NUEVO Y RESTAURA LA VISTA PREVIA DE LA FOTO YA ALMACENADA (SI HABÍA UNA):
  onRemoveFileUserPhoto(): void {
    this.selectedFileUserPhoto = null;
    this.isSelectedFileUserPhoto = false;
    this.liberarPreviewFotoUsuario();
    this.previewUrlFotoUsuario = null;
    if (this.nombreArchivoFotoExtensionoFormatoUsuario) {
      this.resolverPreviewFotoUsuario(this.nombreArchivoFotoExtensionoFormatoUsuario);
    }
  }

  onErrorPreviewFotoUsuario(): void {
    this.liberarPreviewFotoUsuario();
    this.previewUrlFotoUsuario = null;
    this.changeDetectorRef.markForCheck();
  }

  private liberarPreviewFotoUsuario(): void {
    if (this.previewUrlFotoUsuario?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoUsuario);
  }

  confirmarEliminarFotoUsuario(): void {
    if (!this.usuario?.nombreArchivoFotoExtensionoFormatoUsuario) return;
    this.banderaConfirmacionEliminacionFoto = true;
  }

  noEliminarFotoUsuario(): void {
    this.banderaConfirmacionEliminacionFoto = false;
  }

  //ELIMINA DEFINITIVAMENTE LA FOTO YA ALMACENADA: BORRA EL ARCHIVO FÍSICO DEL SERVIDOR DE ARCHIVOS Y LIMPIA EL
  //CAMPO EN BASE DE DATOS (MISMO PATRÓN QUE frontend-sigeps-v10):
  siEliminarFotoUsuario(): void {
    this.banderaConfirmacionEliminacionFoto = false;
    const nombreArchivoAEliminar = this.usuario?.nombreArchivoFotoExtensionoFormatoUsuario;
    if (!nombreArchivoAEliminar) return;

    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: (respuestaParametros) => {
        const parametrosSistema = respuestaParametros.parametrosSistemaDTO;
        const ruta = String(parametrosSistema.rutaDestinoCarpetaPrincipalServidorAplicaciones)
          + String(parametrosSistema.rutaDestinoArchivosUsuarios) + nombreArchivoAEliminar;

        this.gestionArchivosService.deleteFile({ filePath: ruta }).subscribe({
          next: () => {
            const usuarioSinFoto: UsuariosI = { ...this.usuario, nombreArchivoFotoExtensionoFormatoUsuario: '' };
            this.usuariosService.updateUser(usuarioSinFoto).subscribe({
              next: () => {
                this.usuario = usuarioSinFoto;
                const tokenAutorizacion = localStorage.getItem('tokenAutorizacion') || '';
                this.authService.establecerSesion(usuarioSinFoto, tokenAutorizacion);
                this.nombreArchivoFotoExtensionoFormatoUsuario = null;
                this.liberarPreviewFotoUsuario();
                this.previewUrlFotoUsuario = null;
                this.mostrarToast('exito', 'Foto de perfil eliminada correctamente.');
                this.cargarDatosUsuario();
              },
              error: (err) => {
                console.error('ERROR AL LIMPIAR EL CAMPO DE LA FOTO DEL USUARIO: ', err);
                this.mostrarToast('error', 'Se eliminó el archivo, pero no se pudo actualizar el registro del usuario.');
              }
            });
          },
          error: (err) => {
            console.error('ERROR AL ELIMINAR LA FOTO DE PERFIL: ', err);
            this.mostrarToast('error', 'No se pudo eliminar la foto de perfil.');
          }
        });
      },
      error: (err) => {
        console.error('ERROR AL OBTENER LOS PARÁMETROS DEL SISTEMA PARA ELIMINAR LA FOTO: ', err);
        this.mostrarToast('error', 'No se pudo obtener la configuración de archivos del sistema.');
      }
    });
  }

  //ENCRIPTA LA CONTRASEÑA CON EL MISMO ESQUEMA (BASE64 APLICADO 10 VECES) QUE ESPERA EL BACKEND, IGUAL QUE EN EL LOGIN:
  private obtenerPasswordUsuarioEncriptado(passwordPlano: string): string {
    let passwordEncriptado = passwordPlano;
    for (let i = 0; i < 10; i++) {
      passwordEncriptado = btoa(passwordEncriptado);
    }
    return passwordEncriptado;
  }

  //ENCRIPTA EL NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN CON BTOA X2 PARA CONFORMAR EL NOMBRE DEL ARCHIVO DE LA FOTO:
  private obtenerNumeroDocumentoIdentificacionUsuarioEncriptado(numeroDocumentoIdentificacion: string): string {
    let numeroDocumentoIdentificacionEncriptado = numeroDocumentoIdentificacion;
    for (let i = 0; i < 2; i++) {
      numeroDocumentoIdentificacionEncriptado = btoa(numeroDocumentoIdentificacionEncriptado);
    }
    return numeroDocumentoIdentificacionEncriptado;
  }

  accionModificarRegistro(): void {
    this.mensajeError = '';
    const formValues = this.miPerfilForm.getRawValue();

    const nuevaPassword1 = (formValues.passwordUsuario1 || '').trim();
    const nuevaPassword2 = (formValues.passwordUsuario2 || '').trim();
    const quiereCambiarPassword = nuevaPassword1.length > 0 || nuevaPassword2.length > 0;

    if (quiereCambiarPassword) {
      if (nuevaPassword1 !== nuevaPassword2) {
        this.mensajeError = 'La contraseña y la confirmación no son iguales.';
        return;
      }
      const regexPoliticaSeguridadPassword = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
      if (!regexPoliticaSeguridadPassword.test(nuevaPassword1)) {
        this.mensajeError = 'La contraseña debe tener mínimo 8 caracteres, al menos una letra mayúscula y un número.';
        return;
      }
    }

    if (!formValues.direccionUsuario || !formValues.movilUsuario || !formValues.correoElectronicoPersonalUsuario) {
      this.mensajeError = 'Complete los campos obligatorios: dirección, celular y correo electrónico personal.';
      return;
    }

    //SI SE SELECCIONÓ UNA FOTO NUEVA, PRIMERO SE CONSULTAN LOS PARÁMETROS DEL SISTEMA PARA CONFORMAR EL NOMBRE
    //DEL ARCHIVO (NÚMERO DE DOCUMENTO ENCRIPTADO + EXTENSIÓN) ANTES DE CONTINUAR CON EL GUARDADO DEL PERFIL:
    if (this.selectedFileUserPhoto) {
      this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
        next: (respuestaParametros) => {
          const parametrosSistema = respuestaParametros.parametrosSistemaDTO;
          const extension = (this.selectedFileUserPhoto!.name.split('.').pop() || '').toString();
          const nuevoNombreArchivo = this.obtenerNumeroDocumentoIdentificacionUsuarioEncriptado(String(this.usuario.numeroDocumentoIdentificacionUsuario)) + '.' + extension;
          const rutaDestino = String(parametrosSistema.rutaDestinoCarpetaPrincipalServidorAplicaciones)
            + String(parametrosSistema.rutaDestinoArchivosUsuarios) + nuevoNombreArchivo;
          this.gestionArchivosService.uploadFile(this.selectedFileUserPhoto!, rutaDestino).subscribe({
            next: () => this.continuarGuardadoPerfil(formValues, quiereCambiarPassword, nuevaPassword1, nuevoNombreArchivo, parametrosSistema),
            error: (err) => {
              console.error('ERROR AL SUBIR LA FOTO DE PERFIL: ', err);
              this.mostrarToast('error', 'No se pudo subir la foto. Los datos del perfil no fueron modificados.');
            }
          });
        },
        error: (err) => {
          console.error('ERROR AL OBTENER LOS PARÁMETROS DEL SISTEMA: ', err);
          this.mostrarToast('error', 'No se pudo obtener la configuración de archivos del sistema.');
        }
      });
    } else {
      this.continuarGuardadoPerfil(formValues, quiereCambiarPassword, nuevaPassword1, null, null);
    }
  }

  //CONTINÚA EL GUARDADO DEL PERFIL YA CON EL NOMBRE DE ARCHIVO DE LA FOTO (SI APLICA) RESUELTO:
  private continuarGuardadoPerfil(
    formValues: any,
    quiereCambiarPassword: boolean,
    nuevaPassword1: string,
    nuevoNombreArchivo: string | null,
    parametrosSistema: ParametrosSistemaI | null
  ): void {
    const usuarioActualizado: UsuariosI = {
      ...this.usuario,
      nicknameUsuario: formValues.nicknameUsuario,
      lugarExpedicionDocumentoIdentificacionUsuario: formValues.lugarExpedicionDocumentoIdentificacionUsuario || '',
      nombreArchivoFotoExtensionoFormatoUsuario: nuevoNombreArchivo || this.usuario.nombreArchivoFotoExtensionoFormatoUsuario || '',
      direccionUsuario: formValues.direccionUsuario,
      telefonoUsuario: formValues.telefonoUsuario || '',
      movilUsuario: formValues.movilUsuario,
      correoElectronicoPersonalUsuario: formValues.correoElectronicoPersonalUsuario,
      correoElectronicoInstitucionalUsuario: formValues.correoElectronicoInstitucionalUsuario || '',
      fechaHMSModificacionUsuario: this.obtenerFechaHoraActual()
    };

    //SI EL USUARIO QUIERE CAMBIAR LA CONTRASEÑA — PRIMERO ACTUALIZA EL PASSWORD Y LUEGO EL PERFIL:
    if (quiereCambiarPassword) {
      const passwordEncriptado = this.obtenerPasswordUsuarioEncriptado(nuevaPassword1);
      usuarioActualizado.passwordUsuario = passwordEncriptado;

      this.usuariosService.updatePassword(Number(this.usuario.idUsuario), passwordEncriptado).subscribe({
        next: () => {
          this.guardarPerfilUsuario(usuarioActualizado, nuevoNombreArchivo, parametrosSistema);
        },
        error: (err) => {
          console.error('ERROR AL ACTUALIZAR LA CONTRASEÑA: ', err);
          this.limpiarFotoNoAsociada(nuevoNombreArchivo, parametrosSistema);
          this.mostrarToast('error', 'Error al actualizar la contraseña. Intente nuevamente.');
        }
      });
    } else {
      this.guardarPerfilUsuario(usuarioActualizado, nuevoNombreArchivo, parametrosSistema);
    }
  }

  //LLAMA AL SERVICIO DE ACTUALIZACIÓN DEL PERFIL, SINCRONIZA LA SESIÓN Y, SI HAY UNA FOTO NUEVA SELECCIONADA, LA SUBE:
  private guardarPerfilUsuario(
    usuario: UsuariosI,
    nuevoNombreArchivo: string | null,
    parametrosSistema: ParametrosSistemaI | null
  ): void {
    this.usuariosService.updateUser(usuario).subscribe({
      next: (respuesta) => {
        //SINCRONIZA LA SESIÓN (NICKNAME, GRADO, NOMBRE) PARA QUE EL CABEZOTE REFLEJE LOS DATOS ACTUALIZADOS SIN
        //NECESIDAD DE RECARGAR LA PÁGINA — REUTILIZA EL TOKEN YA EMITIDO EN EL LOGIN:
        const tokenAutorizacion = localStorage.getItem('tokenAutorizacion') || '';
        this.authService.establecerSesion(usuario, tokenAutorizacion);

        this.mostrarToast('exito', respuesta.mensaje || 'Perfil actualizado con éxito.');
        this.miPerfilForm.patchValue({ passwordUsuario1: '', passwordUsuario2: '' });

        if (nuevoNombreArchivo) {
          const nombreAnterior = String(this.usuario.nombreArchivoFotoExtensionoFormatoUsuario || '');
          this.nombreArchivoFotoExtensionoFormatoUsuario = nuevoNombreArchivo;
          this.selectedFileUserPhoto = null;
          this.isSelectedFileUserPhoto = false;
          if (parametrosSistema && nombreAnterior && nombreAnterior !== nuevoNombreArchivo) {
            const rutaAnterior = String(parametrosSistema.rutaDestinoCarpetaPrincipalServidorAplicaciones)
              + String(parametrosSistema.rutaDestinoArchivosUsuarios) + nombreAnterior;
            this.gestionArchivosService.deleteFile({ filePath: rutaAnterior }).subscribe({
              error: (err) => console.error('ERROR AL ELIMINAR LA FOTO ANTERIOR DEL PERFIL: ', err)
            });
          }
        }
        this.cargarDatosUsuario();
      },
      error: (err) => {
        console.error('ERROR AL MODIFICAR EL PERFIL: ', err);
        this.limpiarFotoNoAsociada(nuevoNombreArchivo, parametrosSistema);
        this.mostrarToast('error', 'Error al modificar el perfil. Verifique la conexión con el servidor.');
      }
    });
  }

  private limpiarFotoNoAsociada(nuevoNombreArchivo: string | null, parametrosSistema: ParametrosSistemaI | null): void {
    const nombreAnterior = String(this.usuario.nombreArchivoFotoExtensionoFormatoUsuario || '');
    if (!nuevoNombreArchivo || !parametrosSistema || nuevoNombreArchivo === nombreAnterior) return;
    const rutaNueva = String(parametrosSistema.rutaDestinoCarpetaPrincipalServidorAplicaciones)
      + String(parametrosSistema.rutaDestinoArchivosUsuarios) + nuevoNombreArchivo;
    this.gestionArchivosService.deleteFile({ filePath: rutaNueva }).subscribe({
      error: (err) => console.error('ERROR AL LIMPIAR LA FOTO NO ASOCIADA: ', err)
    });
  }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTipo = tipo;
    this.toastMensaje = mensaje;
    this.changeDetectorRef.markForCheck();
    this.toastTimer = setTimeout(() => { this.toastMensaje = ''; this.changeDetectorRef.markForCheck(); }, 4000);
  }
}
