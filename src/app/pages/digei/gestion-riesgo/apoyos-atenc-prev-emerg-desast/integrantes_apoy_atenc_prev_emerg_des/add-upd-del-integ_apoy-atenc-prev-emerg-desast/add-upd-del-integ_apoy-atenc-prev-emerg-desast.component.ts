import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { IntegrantesApoyosAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/integrantes-apoy-atenc-prev-emerg-des/integrantes-apoy-atenc-prev-emerg-des.interface';
import { ApoyosAtencPrevEmergDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-atenc-prev-emerg-desast/apoyos-atenc-prev-emerg-desast.interface';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';

//TIPO DE INTEGRANTE DEL APOYO: JEFE DE GESTIÓN DEL RIESGO, JEFE DE OPERACIONES Y COMANDANTE DE LA UNIDAD MILITAR (MISMAS ABREVIATURAS
//DE LOS NOMBRES DE FIRMAS YA REGISTRADOS, EJ. "FIRMA_TRUJILLO_JGR_CAOCC.jpg", "FIRMA_ARIAS_JOP_CAOCC.jpg", "FIRMA_NARANJO_CTE_CAOCC.jpg"):
export type TipoIntegranteApoyo = 'JGR' | 'JOP' | 'CTE';

//DATOS DE CADA INTEGRANTE: sufijo ES LA PARTE FINAL DEL NOMBRE DE SUS VARIABLES EN EL DTO (gradoJefeGestionRiesgoUnidadMilitar, ...):
export interface ConfiguracionIntegranteApoyo {
  tipo: TipoIntegranteApoyo;
  titulo: string;
  sufijo: 'JefeGestionRiesgoUnidadMilitar' | 'JefeOperacionesUnidadMilitar' | 'CteUnidadMilitar';
  cargoSugerido: string;
}

export const INTEGRANTES_APOYO: ConfiguracionIntegranteApoyo[] = [
  { tipo: 'JGR', titulo: 'Jefe de gestión del riesgo de la unidad militar', sufijo: 'JefeGestionRiesgoUnidadMilitar', cargoSugerido: 'JEFE GESTION DEL RIESGO' },
  { tipo: 'JOP', titulo: 'Jefe de operaciones de la unidad militar', sufijo: 'JefeOperacionesUnidadMilitar', cargoSugerido: 'JEFE B3 OPERACIONES' },
  { tipo: 'CTE', titulo: 'Comandante de la unidad militar', sufijo: 'CteUnidadMilitar', cargoSugerido: 'COMANDANTE' }
];

//NOMBRE DEL ARCHIVO DE FIRMA GUARDADO EN EL REGISTRO PARA EL INTEGRANTE INDICADO:
export function nombreArchivoFirmaIntegrante(registro: IntegrantesApoyosAtencPrevEmergDesastI | null, integrante: ConfiguracionIntegranteApoyo): string {
  if (!registro) return '';
  return String((registro as any)[`nombreArchivoFotoFirma${integrante.sufijo}`] ?? '').trim();
}

//UN INTEGRANTE ESTÁ REGISTRADO CUANDO TIENE NOMBRES O PRIMER APELLIDO:
export function integranteRegistrado(registro: IntegrantesApoyosAtencPrevEmergDesastI | null, integrante: ConfiguracionIntegranteApoyo): boolean {
  if (!registro) return false;
  return ['nombres', 'primerApellido'].some(prefijo => !!String((registro as any)[prefijo + integrante.sufijo] ?? '').trim());
}

//CANTIDAD DE INTEGRANTES REGISTRADOS (0 A 3) EN EL REGISTRO DE INTEGRANTES DE UN APOYO:
export function cantidadIntegrantesRegistrados(registro: IntegrantesApoyosAtencPrevEmergDesastI | null): number {
  return INTEGRANTES_APOYO.filter(integrante => integranteRegistrado(registro, integrante)).length;
}

//CAMBIO DE FIRMA DE UN INTEGRANTE QUE SE APLICA AL GUARDAR (EL LISTADO SUBE EL ARCHIVO NUEVO Y BORRA EL ANTERIOR):
export interface CambioFirmaIntegranteApoyo {
  integrante: ConfiguracionIntegranteApoyo;
  archivo: File | null;
  //LA FIRMA GUARDADA SE QUITA (SIN REEMPLAZARLA):
  eliminada: boolean;
}

export interface GuardadoIntegrantesApoyoEvent {
  integrantes: IntegrantesApoyosAtencPrevEmergDesastI;
  cambiosFirmas: CambioFirmaIntegranteApoyo[];
}

//ESTADO DE LA FIRMA DE CADA INTEGRANTE EN PANTALLA:
interface EstadoFirma {
  nombreArchivo: string;
  archivoSeleccionado: File | null;
  eliminada: boolean;
  previewUrl: string | null;
  noEncontrada: boolean;
  mensajeError: string;
}

//AL MENOS UN INTEGRANTE DEBE TENER NOMBRES Y PRIMER APELLIDO, Y SI SE DILIGENCIA CUALQUIER DATO DE UN INTEGRANTE, SUS NOMBRES Y SU
//PRIMER APELLIDO SON OBLIGATORIOS (LAS COLUMNAS DE ORACLE SON NULL, POR ESO NINGÚN INTEGRANTE ES OBLIGATORIO POR SÍ SOLO):
function validarIntegrantes(control: AbstractControl): ValidationErrors | null {
  const valores = control.value || {};
  const texto = (campo: string): string => String(valores[campo] ?? '').trim();
  let integrantesCompletos = 0;
  for (const integrante of INTEGRANTES_APOYO) {
    const campos = ['grado', 'nombres', 'primerApellido', 'segundoApellido', 'cargo'].map(prefijo => texto(prefijo + integrante.sufijo));
    const tieneDatos = campos.some(valor => !!valor);
    const completo = !!texto('nombres' + integrante.sufijo) && !!texto('primerApellido' + integrante.sufijo);
    if (tieneDatos && !completo) return { integranteIncompleto: integrante.tipo };
    if (completo) integrantesCompletos++;
  }
  return integrantesCompletos ? null : { sinIntegrantes: true };
}

@Component({
  selector: 'app-add-upd-del-integ-apoy-atenc-prev-emerg-desast',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-integ_apoy-atenc-prev-emerg-desast.component.html',
  styleUrl: './add-upd-del-integ_apoy-atenc-prev-emerg-desast.component.scss'
})
export class AddUpdDelIntegApoyAtencPrevEmergDesastComponent implements OnChanges, OnDestroy {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: IntegrantesApoyosAtencPrevEmergDesastI | null = null;
  //APOYO AL QUE PERTENECEN LOS INTEGRANTES (EL DEL MODAL DESDE EL QUE SE ABRIÓ EL LISTADO):
  @Input() apoyoAtencPrevEmergDesast: ApoyosAtencPrevEmergDesastI | null = null;
  //CARPETA DEL SERVIDOR DE ARCHIVOS CON LAS FIRMAS DE LA UNIDAD MILITAR DEL APOYO (LA RESUELVE EL LISTADO):
  @Input() carpetaFirmas: string | null = null;
  //SIGLAS O ACRÓNIMOS DE LOS GRADOS SIATH PARA LAS SUGERENCIAS DEL CAMPO GRADO:
  @Input() gradosSiath: string[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<GuardadoIntegrantesApoyoEvent>();
  @Output() eliminar = new EventEmitter<number>();

  //MISMAS RESTRICCIONES DE ARCHIVO QUE LA FOTO/FIRMA DE AddUpdDelHistorialIntegranteDocumentosComponent:
  private static readonly EXTENSIONES_PERMITIDAS = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
  private static readonly TAMANO_MAXIMO_BYTES = 2_000_000; //2.0 MB.

  readonly integrantes = INTEGRANTES_APOYO;
  private readonly fb = inject(FormBuilder);
  form: FormGroup = this.crearFormulario();
  firmas: Record<TipoIntegranteApoyo, EstadoFirma> = this.crearFirmasVacias();
  //INTEGRANTE CUYA FIRMA GUARDADA SE VA A QUITAR (CONFIRMACIÓN EN PANTALLA):
  integrantePorQuitarFirma: ConfiguracionIntegranteApoyo | null = null;
  //IDENTIFICA LA CARGA DE FIRMAS EN CURSO: SI CAMBIA EL REGISTRO MIENTRAS LLEGAN LAS DEL ANTERIOR, ESAS SE DESCARTAN:
  private solicitudCarga = 0;

  constructor(
    private readonly gestionArchivosService: GestionArchivosService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  get siglaoAcronimoUnidadMilitar(): string {
    return String(this.apoyoAtencPrevEmergDesast?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim().toUpperCase();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      this.form = this.crearFormulario();
      if (this.modo === 'eliminar') this.form.disable();
      this.reiniciarFirmas();
    } else if (changes['carpetaFirmas']) {
      this.cargarPreviews();
    }
  }

  ngOnDestroy(): void {
    this.integrantes.forEach(integrante => this.liberarPreview(this.firmas[integrante.tipo]));
  }

  //UN CONTROL POR CADA VARIABLE DEL DTO (EL NOMBRE DEL CONTROL ES EL MISMO DE LA VARIABLE):
  private crearFormulario(): FormGroup {
    const controles: Record<string, string> = {};
    this.integrantes.forEach(integrante => ['grado', 'nombres', 'primerApellido', 'segundoApellido', 'cargo'].forEach(prefijo => {
      const campo = prefijo + integrante.sufijo;
      controles[campo] = String((this.data as any)?.[campo] ?? '');
    }));
    return this.fb.group(controles, { validators: validarIntegrantes });
  }

  private crearFirmasVacias(): Record<TipoIntegranteApoyo, EstadoFirma> {
    const vacia = (): EstadoFirma => ({ nombreArchivo: '', archivoSeleccionado: null, eliminada: false, previewUrl: null, noEncontrada: false, mensajeError: '' });
    return { JGR: vacia(), JOP: vacia(), CTE: vacia() };
  }

  private reiniciarFirmas(): void {
    this.integrantes.forEach(integrante => this.liberarPreview(this.firmas[integrante.tipo]));
    this.firmas = this.crearFirmasVacias();
    this.integrantes.forEach(integrante => this.firmas[integrante.tipo].nombreArchivo = nombreArchivoFirmaIntegrante(this.data, integrante));
    this.cargarPreviews();
  }

  //TRAE CADA FIRMA GUARDADA DEL SERVIDOR DE ARCHIVOS (getFile + getFileBytes, CON EL TOKEN DE AUTORIZACIÓN) Y LA MUESTRA:
  private cargarPreviews(): void {
    const solicitud = ++this.solicitudCarga;
    const carpeta = this.carpetaFirmas;
    if (!carpeta) return;
    this.integrantes.forEach(integrante => {
      const firma = this.firmas[integrante.tipo];
      if (!firma.nombreArchivo || firma.archivoSeleccionado || firma.eliminada) return;
      this.gestionArchivosService.getFile(carpeta + firma.nombreArchivo).subscribe({
        next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
          next: bytes => {
            if (solicitud !== this.solicitudCarga || firma.archivoSeleccionado) return;
            this.liberarPreview(firma);
            firma.previewUrl = URL.createObjectURL(bytes);
            this.cdr.markForCheck();
          },
          error: () => this.marcarNoEncontrada(firma, solicitud)
        }),
        error: () => this.marcarNoEncontrada(firma, solicitud)
      });
    });
  }

  private marcarNoEncontrada(firma: EstadoFirma, solicitud: number): void {
    if (solicitud !== this.solicitudCarga) return;
    firma.noEncontrada = true;
    this.cdr.markForCheck();
  }

  private liberarPreview(firma: EstadoFirma): void {
    if (firma.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(firma.previewUrl);
    firma.previewUrl = null;
  }

  //SUGERENCIA DEL CARGO SEGÚN EL INTEGRANTE Y LA SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR DEL APOYO (EJ. "COMANDANTE CAOCC"):
  cargoSugerido(integrante: ConfiguracionIntegranteApoyo): string {
    return `${integrante.cargoSugerido} ${this.siglaoAcronimoUnidadMilitar}`.trim();
  }

  usarCargoSugerido(integrante: ConfiguracionIntegranteApoyo): void {
    this.form.controls['cargo' + integrante.sufijo].setValue(this.cargoSugerido(integrante));
  }

  //VALIDA EL ARCHIVO ELEGIDO (EXTENSIÓN Y TAMAÑO) Y MUESTRA SU VISTA PREVIA LOCAL:
  onSeleccionarFirma(integrante: ConfiguracionIntegranteApoyo, event: Event): void {
    const firma = this.firmas[integrante.tipo];
    firma.mensajeError = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    if (file.size > AddUpdDelIntegApoyAtencPrevEmergDesastComponent.TAMANO_MAXIMO_BYTES) {
      firma.mensajeError = 'El archivo excede el tamaño máximo permitido de 2.0 MB.';
      return;
    }
    if (!AddUpdDelIntegApoyAtencPrevEmergDesastComponent.EXTENSIONES_PERMITIDAS.includes(extension)) {
      firma.mensajeError = 'El archivo debe tener una extensión válida (jpg, jpeg, bmp, png o gif).';
      return;
    }
    this.liberarPreview(firma);
    firma.archivoSeleccionado = file;
    firma.eliminada = false;
    firma.noEncontrada = false;
    firma.previewUrl = URL.createObjectURL(file);
  }

  //DESCARTA EL ARCHIVO ELEGIDO Y VUELVE A MOSTRAR LA FIRMA GUARDADA (SI LA HAY):
  onQuitarFirmaSeleccionada(integrante: ConfiguracionIntegranteApoyo): void {
    const firma = this.firmas[integrante.tipo];
    firma.archivoSeleccionado = null;
    firma.mensajeError = '';
    this.liberarPreview(firma);
    this.cargarPreviews();
  }

  confirmarQuitarFirma(integrante: ConfiguracionIntegranteApoyo): void { this.integrantePorQuitarFirma = integrante; }
  noQuitarFirma(): void { this.integrantePorQuitarFirma = null; }

  //LA FIRMA GUARDADA SOLO SE MARCA; EL ARCHIVO SE BORRA DEL SERVIDOR CUANDO EL REGISTRO SE GUARDA SIN ELLA:
  siQuitarFirma(): void {
    const integrante = this.integrantePorQuitarFirma;
    this.integrantePorQuitarFirma = null;
    if (!integrante) return;
    const firma = this.firmas[integrante.tipo];
    firma.eliminada = true;
    firma.noEncontrada = false;
    this.liberarPreview(firma);
  }

  enviar(): void {
    if (this.form.invalid || !this.apoyoAtencPrevEmergDesast) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    const integrantes: any = {
      idIntegrantesApoyosAtencPrevEmergDesast: this.data?.idIntegrantesApoyosAtencPrevEmergDesast,
      apoyoAtencPrevEmergDesastDTO: this.apoyoAtencPrevEmergDesast
    };
    //MISMO ORDEN DE COLUMNAS DE LA TABLA: GRADO, NOMBRES, PRIMER APELLIDO, SEGUNDO APELLIDO, FIRMA Y CARGO. LOS CAMPOS VACÍOS SE
    //ENVÍAN EN null; LA FIRMA SE ENVÍA CON EL NOMBRE GUARDADO Y EL LISTADO LA REEMPLAZA SI SE ELIGIÓ UN ARCHIVO NUEVO O SE QUITÓ:
    this.integrantes.forEach(integrante => {
      const texto = (prefijo: string): string | null => String(valores[prefijo + integrante.sufijo] ?? '').trim().toUpperCase() || null;
      const firma = this.firmas[integrante.tipo];
      integrantes['grado' + integrante.sufijo] = texto('grado');
      integrantes['nombres' + integrante.sufijo] = texto('nombres');
      integrantes['primerApellido' + integrante.sufijo] = texto('primerApellido');
      integrantes['segundoApellido' + integrante.sufijo] = texto('segundoApellido');
      integrantes['nombreArchivoFotoFirma' + integrante.sufijo] = firma.eliminada ? null : (firma.nombreArchivo || null);
      integrantes['cargo' + integrante.sufijo] = texto('cargo');
    });
    const cambiosFirmas: CambioFirmaIntegranteApoyo[] = this.integrantes
      .map(integrante => ({ integrante, archivo: this.firmas[integrante.tipo].archivoSeleccionado, eliminada: this.firmas[integrante.tipo].eliminada }))
      .filter(cambio => !!cambio.archivo || cambio.eliminada);
    this.guardar.emit({ integrantes, cambiosFirmas });
  }

  confirmar(): void {
    if (this.data?.idIntegrantesApoyosAtencPrevEmergDesast) this.eliminar.emit(this.data.idIntegrantesApoyosAtencPrevEmergDesast);
  }
}
