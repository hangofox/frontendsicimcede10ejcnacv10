import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentacionAnexaSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/documentacion-anex-solic-infraest/documentacion-anex-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { TiposDocumentosAnexosSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/tipos-documentacion-anex-solic-infraest/tipos-documentacion-anex-solic-infraest.interface';

//LO QUE EL FORMULARIO ENTREGA AL LISTADO: EL REGISTRO Y, SI SE ELIGIÓ, EL ARCHIVO NUEVO (EL LISTADO LO SUBE AL SERVIDOR DE ARCHIVOS
//ANTES DE GUARDAR EL REGISTRO, IGUAL QUE LAS FOTOGRAFÍAS ANEXAS DE APOYOS):
export interface GuardadoDocumentacionAnexaEvent {
  documentacion: DocumentacionAnexaSolicInfraestI;
  archivo: File | null;
}

@Component({
  selector: 'app-add-upd-del-doc-anex-solic-const-nuev',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-doc-anex-solic-const-nuev.component.html',
  styleUrl: './add-upd-del-doc-anex-solic-const-nuev.component.scss'
})
export class AddUpdDelDocumentacionAnexaSolicConstNuevComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: DocumentacionAnexaSolicInfraestI | null = null;
  //SOLICITUD DE INFRAESTRUCTURA A LA QUE PERTENECE EL DOCUMENTO (LA DEL MODAL DESDE EL QUE SE ABRIÓ EL LISTADO):
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;
  @Input() tiposDocumentosAnexos: TiposDocumentosAnexosSolicInfraestI[] = [];
  //EL LISTADO LO PONE EN true MIENTRAS SUBE EL ARCHIVO Y GUARDA EL REGISTRO:
  @Input() guardando = false;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<GuardadoDocumentacionAnexaEvent>();
  @Output() eliminar = new EventEmitter<number>();

  //TIPOS DE ARCHIVO PERMITIDOS PARA LOS DOCUMENTOS ANEXOS (LOS REGISTRADOS SON PDF) Y TAMAÑO MÁXIMO, QUE ES EL LÍMITE DE SUBIDA
  //DEL BACKEND (spring.servlet.multipart.max-file-size=5MB):
  static readonly EXTENSIONES_PERMITIDAS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png'];
  private static readonly TAMANO_MAXIMO_BYTES = 5 * 1024 * 1024;
  readonly extensionesPermitidas = AddUpdDelDocumentacionAnexaSolicConstNuevComponent.EXTENSIONES_PERMITIDAS;
  readonly acceptArchivos = AddUpdDelDocumentacionAnexaSolicConstNuevComponent.EXTENSIONES_PERMITIDAS.map(extension => '.' + extension).join(',');

  private readonly fb = inject(FormBuilder);
  //EN LA TABLA SON OBLIGATORIOS (NOT NULL) EL TIPO Y EL NOMBRE DEL DOCUMENTO (VARCHAR2(250)); EL ARCHIVO SE PIDE AL CREAR Y AL MODIFICAR
  //ES OPCIONAL (SI NO SE ELIGE OTRO, SE CONSERVA EL QUE YA TIENE):
  form = this.fb.group({
    tipoDocumentoAnexoSeleccionado: ['', Validators.required],
    nombreDocumento: ['', [Validators.required, Validators.maxLength(250)]]
  });
  archivoSeleccionado: File | null = null;
  mensajeErrorArchivo = '';

  //NOMBRE DEL ARCHIVO YA GUARDADO EN EL REGISTRO (VACÍO AL CREAR):
  get nombreArchivoActual(): string {
    return String(this.data?.nombreArchivoDocumentoAnexoSolicInfraest ?? '').trim();
  }

  //AL CREAR ES OBLIGATORIO ELEGIR EL ARCHIVO; AL MODIFICAR BASTA CON EL QUE YA TIENE:
  get faltaArchivo(): boolean {
    return this.modo !== 'eliminar' && !this.archivoSeleccionado && !this.nombreArchivoActual;
  }

  //TIPO DE DOCUMENTO ELEGIDO; AL MODIFICAR, SI AÚN NO LLEGA EL CATÁLOGO, SE USA EL DEL REGISTRO:
  get tipoDocumentoAnexoSeleccionado(): TiposDocumentosAnexosSolicInfraestI | null {
    const id = Number(this.form.getRawValue().tipoDocumentoAnexoSeleccionado);
    if (!id) return null;
    return this.tiposDocumentosAnexos.find(tipo => tipo.idTipoDocumentoAnexoSolicInfraest === id)
      ?? (this.data?.tipoDocumentoAnexoSolicInfraestDTO?.idTipoDocumentoAnexoSolicInfraest === id ? this.data.tipoDocumentoAnexoSolicInfraestDTO : null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      const x = this.data;
      this.form.reset({
        tipoDocumentoAnexoSeleccionado: x?.tipoDocumentoAnexoSolicInfraestDTO?.idTipoDocumentoAnexoSolicInfraest ? String(x.tipoDocumentoAnexoSolicInfraestDTO.idTipoDocumentoAnexoSolicInfraest) : '',
        nombreDocumento: String(x?.nombreDocumentoAnexoSolicInfraest ?? '')
      });
      this.archivoSeleccionado = null;
      this.mensajeErrorArchivo = '';
      if (this.modo === 'eliminar') {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  //VALIDA EL ARCHIVO ELEGIDO (EXTENSIÓN Y TAMAÑO), IGUAL QUE LAS FOTOGRAFÍAS ANEXAS DE APOYOS:
  onSeleccionarArchivo(event: Event): void {
    this.mensajeErrorArchivo = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    if (file.size > AddUpdDelDocumentacionAnexaSolicConstNuevComponent.TAMANO_MAXIMO_BYTES) {
      this.mensajeErrorArchivo = 'El archivo excede el tamaño máximo permitido de 5 MB.';
      return;
    }
    if (!AddUpdDelDocumentacionAnexaSolicConstNuevComponent.EXTENSIONES_PERMITIDAS.includes(extension)) {
      this.mensajeErrorArchivo = `El archivo debe tener una extensión válida (${AddUpdDelDocumentacionAnexaSolicConstNuevComponent.EXTENSIONES_PERMITIDAS.join(', ')}).`;
      return;
    }
    this.archivoSeleccionado = file;
  }

  onQuitarArchivoSeleccionado(): void {
    this.archivoSeleccionado = null;
    this.mensajeErrorArchivo = '';
  }

  enviar(): void {
    const tipoDocumento = this.tipoDocumentoAnexoSeleccionado;
    if (this.form.invalid || this.faltaArchivo || !tipoDocumento || !this.solicitudInfraestructura) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.guardar.emit({
      documentacion: {
        idDocumentacionAnexaSolicInfraest: this.data?.idDocumentacionAnexaSolicInfraest,
        solicitudInfraestructuraDTO: this.solicitudInfraestructura,
        nombreDocumentoAnexoSolicInfraest: String(valores.nombreDocumento ?? '').trim().toUpperCase(),
        tipoDocumentoAnexoSolicInfraestDTO: tipoDocumento,
        //EL LISTADO LO REEMPLAZA POR EL NOMBRE DEL ARCHIVO SUBIDO CUANDO SE ELIGE UNO NUEVO:
        nombreArchivoDocumentoAnexoSolicInfraest: this.nombreArchivoActual || null
      },
      archivo: this.archivoSeleccionado
    });
  }

  confirmar(): void {
    if (this.data?.idDocumentacionAnexaSolicInfraest) this.eliminar.emit(this.data.idDocumentacionAnexaSolicInfraest);
  }
}
