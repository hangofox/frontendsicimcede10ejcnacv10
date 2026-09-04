import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ParametrosSistemaI } from '../../../interfaces/panel-control/parametros-sistema/parametros-sistema.interface';
import { ParametrosSistemaService } from '../../../services/panel-control/parametros-sistema/parametros-sistema.service';

@Component({
  selector: 'app-parametros-sistema',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parametros-sistema.component.html',
  styleUrl: './parametros-sistema.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParametrosSistemaComponent implements OnInit {
  @ViewChild('editorHtml') editorHtml?: ElementRef<HTMLDivElement>;

  parametrosSistemaForm!: FormGroup;
  mensajeError = '';
  cargandoDatos = false;
  guardandoDatos = false;
  banderaConfirmacionModificacion = false;
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  editorPestanaActiva: 'editor' | 'codigo' | 'preview' = 'editor';
  editorContenidoHtml = '';
  codigoFuenteHtml = '';

  private parametrosCargados: ParametrosSistemaI | null = null;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private parametrosSistemaService: ParametrosSistemaService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  private initForm(): void {
    this.parametrosSistemaForm = this.formBuilder.group({
      idParametrosSistema: [''],
      tiempoMinutosSesionInactivaSistema: ['', [Validators.required, Validators.min(1)]],
      tiempoMinutosValidezCodigoActivacionContrasena: ['', [Validators.required, Validators.min(1)]],
      rutaDestinoCarpetaPrincipalServidorAplicaciones: ['', Validators.required],
      rutaDestinoCarpetaCargueTemporalArchivos: ['', Validators.required],
      rutaDestinoArchivosUsuarios: ['', Validators.required],
      rutaDestinoArchivosUnidadesMilitares: ['', Validators.required],
      rutaDestinoArchivosHistorialIntegrantesDocumentos: ['', Validators.required],
      rutaDestinoArchivosResponsables: ['', Validators.required],
      rutaDestinoArchivosAltasEquiposIngenieros: ['', Validators.required],
      rutaDestinoArchivosBajasEquiposIngenieros: ['', Validators.required],
      authEnable: [''], startTTLSEnable: [''], smtpHost: [''], smtpPort: [''], smtpProtocols: [''],
      correoElectronicoRemitente: ['', Validators.email], usuarioRemitente: [''], passwordRemitente: [''],
      asuntoDestinatarioRecuperacionContrasena: [''], cuerpoMensajeHtmlRecuperacionContrasena: ['']
    });
  }

  private cargarDatos(): void {
    this.cargandoDatos = true;
    this.mensajeError = '';
    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        this.parametrosCargados = parametrosSistemaDTO;
        const html = String(parametrosSistemaDTO.cuerpoMensajeHtmlRecuperacionContrasena || '');
        this.editorContenidoHtml = html;
        this.codigoFuenteHtml = html;
        this.editorPestanaActiva = 'editor';
        this.parametrosSistemaForm.reset({
          ...parametrosSistemaDTO,
          authEnable: this.normalizarIndicador(parametrosSistemaDTO.authEnable),
          startTTLSEnable: this.normalizarIndicador(parametrosSistemaDTO.startTTLSEnable),
          cuerpoMensajeHtmlRecuperacionContrasena: html
        });
        this.cargandoDatos = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.cargandoDatos = false;
        console.error('ERROR AL CARGAR LOS PARÁMETROS DEL SISTEMA: ', err);
        this.mensajeError = 'Error al cargar los parámetros del sistema. Verifique la conexión con el servidor.';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  //ORACLE ALMACENA ESTOS INDICADORES COMO 1/0. TAMBIÉN SE ADMITEN LAS REPRESENTACIONES
  //BOOLEANAS PARA EVITAR QUE EL SELECT QUEDE VACÍO SI EL BACKEND CAMBIA LA SERIALIZACIÓN.
  private normalizarIndicador(valor: unknown): string {
    if (valor === 1 || valor === '1' || valor === true || valor === 'true') return '1';
    if (valor === 0 || valor === '0' || valor === false || valor === 'false') return '0';
    return '';
  }

  cambiarPestana(pestana: 'editor' | 'codigo' | 'preview'): void {
    if (this.editorPestanaActiva === 'editor') this.sincronizarEditor();
    if (this.editorPestanaActiva === 'codigo') this.actualizarHtml(this.codigoFuenteHtml);
    if (pestana === 'codigo') this.codigoFuenteHtml = this.editorContenidoHtml;
    this.editorPestanaActiva = pestana;
    this.changeDetectorRef.markForCheck();
  }

  sincronizarEditor(): void {
    if (this.editorHtml?.nativeElement) this.actualizarHtml(this.editorHtml.nativeElement.innerHTML);
  }

  sincronizarCodigoFuente(html: string): void {
    this.codigoFuenteHtml = html;
    this.actualizarHtml(html);
  }

  private actualizarHtml(html: string): void {
    this.editorContenidoHtml = html;
    const control = this.parametrosSistemaForm.get('cuerpoMensajeHtmlRecuperacionContrasena');
    control?.setValue(html, { emitEvent: false });
    control?.markAsDirty();
  }

  formatear(comando: string): void {
    document.execCommand(comando, false);
    this.sincronizarEditor();
  }

  formatearConValor(comando: string, valor: string): void {
    if (!valor) return;
    document.execCommand(comando, false, valor);
    this.sincronizarEditor();
  }

  insertarEnlace(): void {
    const url = window.prompt('Ingrese la URL del enlace:');
    if (url) {
      document.execCommand('createLink', false, url);
      this.sincronizarEditor();
    }
  }

  accionModificarRegistro(): void {
    this.mensajeError = '';
    if (this.editorPestanaActiva === 'editor') this.sincronizarEditor();
    if (this.parametrosSistemaForm.invalid) {
      this.parametrosSistemaForm.markAllAsTouched();
      this.mensajeError = 'Complete correctamente todos los campos obligatorios antes de guardar.';
      return;
    }
    this.banderaConfirmacionModificacion = true;
  }

  noModificarParametros(): void {
    this.banderaConfirmacionModificacion = false;
  }

  siModificarParametros(): void {
    if (!this.parametrosCargados || this.guardandoDatos) return;
    this.banderaConfirmacionModificacion = false;
    this.guardandoDatos = true;
    const v = this.parametrosSistemaForm.getRawValue();
    const parametros: ParametrosSistemaI = {
      ...this.parametrosCargados, ...v,
      idParametrosSistema: Number(v.idParametrosSistema || this.parametrosCargados.idParametrosSistema),
      tiempoMinutosSesionInactivaSistema: Number(v.tiempoMinutosSesionInactivaSistema),
      tiempoMinutosValidezCodigoActivacionContrasena: Number(v.tiempoMinutosValidezCodigoActivacionContrasena),
      smtpPort: Number(v.smtpPort)
    };
    this.parametrosSistemaService.updateSystemParameter(parametros).subscribe({
      next: (respuesta) => {
        this.guardandoDatos = false;
        this.mostrarToast('exito', respuesta.mensaje || 'Parámetros del sistema actualizados con éxito.');
        this.cargarDatos();
      },
      error: (err) => {
        this.guardandoDatos = false;
        console.error('ERROR AL MODIFICAR LOS PARÁMETROS DEL SISTEMA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al actualizar los parámetros del sistema.');
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
}
