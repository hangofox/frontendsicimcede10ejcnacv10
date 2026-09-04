import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { UnidadesMilitaresService } from '../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { ParametrosSistemaService } from '../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { GestionArchivosService } from '../../../../services/gestion-archivos/gestion-archivos.service';

export interface OperacionFotoUnidadMilitar {
  tipo: 'subir' | 'eliminar';
  nombreAnterior: string;
  nombreNuevo: string;
  archivo?: File;
}

export interface GuardadoUnidadMilitarEvent {
  unidadMilitar: UnidadesMilitaresI;
  operacionFoto: OperacionFotoUnidadMilitar | null;
}

//DATOS SIMULADOS DE UNIDADES MILITARES SIATH (CATÁLOGO EXTERNO — SOLO SE USAN PARA PRECARGAR EL FORMULARIO EN
//MODO GUARDAR, IGUAL QUE cargarDatosSiathUnidadMilitarporSiglaoAcronimoUnidadMilitar EN EL PROYECTO DE REFERENCIA):
interface SiathUnidadMilitarSimuladaI {
  idSiath: number;
  codigoSiath: string;
  nombre: string;
  siglaoAcronimo: string;
}

const SIATH_UNIDADES_MILITARES_SIMULADAS: SiathUnidadMilitarSimuladaI[] = [
  { idSiath: 1, codigoSiath: 'SIATH-020', nombre: 'BATALLÓN DE POLICÍA MILITAR No. 10', siglaoAcronimo: 'BAPOM10' },
  { idSiath: 2, codigoSiath: 'SIATH-021', nombre: 'ESCUELA DE ARTILLERÍA', siglaoAcronimo: 'ESART' },
  { idSiath: 3, codigoSiath: 'SIATH-022', nombre: 'GRUPO DE CABALLERÍA MECANIZADO No. 10', siglaoAcronimo: 'GMC10' }
];

@Component({
  selector: 'app-add-upd-del-unidad-militar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upd-del-unidad-militar.component.html',
  styleUrl: './add-upd-del-unidad-militar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelUnidadMilitarComponent implements OnChanges, OnDestroy {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() unidadMilitarData: UnidadesMilitaresI | null = null;

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<GuardadoUnidadMilitarEvent>();
  @Output() eliminar = new EventEmitter<number>();

  unidadesMilitaresForm!: FormGroup;

  //LOGOTIPO DE LA UNIDAD MILITAR — SIMULADO CON UNA VISTA PREVIA LOCAL (FileReader), SIN SUBIRSE A NINGÚN
  //SERVIDOR DE ARCHIVOS (MISMO PATRÓN QUE MiPerfilComponent Y AddUpdDelUsuarioComponent):
  previewUrlFotoUnidadMilitar: string | null = null;
  selectedFileUnidadMilitar: File | null = null;
  isSelectedFileUnidadMilitar = false;
  banderaConfirmacionEliminacionFoto = false;
  mensajeErrorFoto = '';
  nombreArchivoFotoUnidadMilitar = '';
  fotoExistenteEliminada = false;

  //BÚSQUEDA DE UNIDAD MILITAR SIATH (SOLO EN MODO GUARDAR) — CAMPO DE TEXTO QUE FILTRA EL CATÁLOGO SIMULADO
  //MIENTRAS SE ESCRIBE (IGUAL QUE EL p-dropdown CON [filter]="true" DEL PROYECTO DE REFERENCIA, SIN PRIMENG):
  readonly siathUnidadesMilitares = SIATH_UNIDADES_MILITARES_SIMULADAS;
  terminoBusquedaSiathUnidadMilitar = '';
  siathUnidadMilitarSeleccionada: SiathUnidadMilitarSimuladaI | null = null;
  mostrarSugerenciasSiathUnidadMilitar = false;
  mensajeBusquedaSiathUnidadMilitar = '';

  //LISTA DE SUGERENCIAS FILTRADAS POR NOMBRE O SIGLA A PARTIR DEL TÉRMINO ESCRITO:
  get siathUnidadesMilitaresFiltradas(): SiathUnidadMilitarSimuladaI[] {
    const termino = this.terminoBusquedaSiathUnidadMilitar.trim().toUpperCase();
    if (!termino) return this.siathUnidadesMilitares;
    return this.siathUnidadesMilitares.filter(unidadMilitar =>
      unidadMilitar.nombre.toUpperCase().includes(termino) || unidadMilitar.siglaoAcronimo.toUpperCase().includes(termino)
    );
  }

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  //NOMBRE DE LA CARPETA DE ALMACENAMIENTO — SIEMPRE IGUAL A LA SIGLA O ACRÓNIMO EN MAYÚSCULA, SOLO LECTURA:
  get nombreCarpetaAlmacenamientoCalculado(): string {
    return String(this.unidadesMilitaresForm?.get('siglaoAcronimoUnidadMilitar')?.value || '').toUpperCase();
  }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private parametrosSistemaService: ParametrosSistemaService,
    private gestionArchivosService: GestionArchivosService
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['unidadMilitarData']) {
      this.initForm();
      this.previewUrlFotoUnidadMilitar = null;
      this.selectedFileUnidadMilitar = null;
      this.isSelectedFileUnidadMilitar = false;
      this.nombreArchivoFotoUnidadMilitar = String(this.unidadMilitarData?.nombreArchivoFotoLogExtoFmtUnidadMilitar || '').trim();
      this.fotoExistenteEliminada = false;
      this.terminoBusquedaSiathUnidadMilitar = '';
      this.siathUnidadMilitarSeleccionada = null;
      this.mostrarSugerenciasSiathUnidadMilitar = false;
      this.mensajeBusquedaSiathUnidadMilitar = '';
      if (this.unidadMilitarData?.idUnidadMilitar && this.modo !== 'guardar') {
        this.cargarFotoUnidadMilitar(Number(this.unidadMilitarData.idUnidadMilitar));
      }
    }
  }

  private cargarFotoUnidadMilitar(idUnidadMilitar: number): void {
    this.unidadesMilitaresService.getMilitaryUnitbyId(idUnidadMilitar).subscribe({
      next: ({ unidadMilitarDTO }) => {
        this.nombreArchivoFotoUnidadMilitar = String(unidadMilitarDTO?.nombreArchivoFotoLogExtoFmtUnidadMilitar || '').trim();
        this.changeDetectorRef.markForCheck();
        if (this.nombreArchivoFotoUnidadMilitar) this.resolverPreviewFoto(this.nombreArchivoFotoUnidadMilitar);
      },
      error: () => this.onErrorPreviewFoto()
    });
  }

  private resolverPreviewFoto(nombreArchivo: string): void {
    this.parametrosSistemaService.getSystemParameterbyId(1).subscribe({
      next: ({ parametrosSistemaDTO }) => {
        const ruta = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim()
          + String(parametrosSistemaDTO.rutaDestinoArchivosUnidadesMilitares).trim()
          + nombreArchivo.trim();
        this.gestionArchivosService.getFile(ruta).subscribe({
          next: ({ rutaEstatica }) => this.gestionArchivosService.getFileBytes(rutaEstatica).subscribe({
            next: (blob) => {
              this.liberarPreview();
              this.previewUrlFotoUnidadMilitar = URL.createObjectURL(blob);
              this.changeDetectorRef.markForCheck();
            },
            error: () => this.onErrorPreviewFoto()
          }),
          error: () => this.onErrorPreviewFoto()
        });
      },
      error: () => this.onErrorPreviewFoto()
    });
  }

  private liberarPreview(): void {
    if (this.previewUrlFotoUnidadMilitar?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrlFotoUnidadMilitar);
  }

  onErrorPreviewFoto(): void {
    this.liberarPreview();
    this.previewUrlFotoUnidadMilitar = null;
    this.changeDetectorRef.markForCheck();
  }

  private initForm(): void {
    const unidadMilitar = this.unidadMilitarData;
    this.unidadesMilitaresForm = this.formBuilder.group({
      idUnidadMilitar: [unidadMilitar?.idUnidadMilitar ?? null],
      codigoUnidadMilitar: [unidadMilitar?.codigoUnidadMilitar ?? '', Validators.required],
      nombreUnidadMilitar: [unidadMilitar?.nombreUnidadMilitar ?? '', Validators.required],
      siglaoAcronimoUnidadMilitar: [unidadMilitar?.siglaoAcronimoUnidadMilitar ?? '', Validators.required],
      nivelUnidadMilitar: [unidadMilitar?.nivelUnidadMilitar ?? '', Validators.required]
    });
    if (this.banderaCrudEliminar) {
      this.unidadesMilitaresForm.disable();
    }
  }

  //MUESTRA LA LISTA DE SUGERENCIAS AL ESCRIBIR Y LIMPIA LA SELECCIÓN PREVIA SI EL TEXTO YA NO COINCIDE CON ELLA:
  onEscribirBusquedaSiathUnidadMilitar(): void {
    this.mostrarSugerenciasSiathUnidadMilitar = true;
    if (this.siathUnidadMilitarSeleccionada && this.siathUnidadMilitarSeleccionada.nombre !== this.terminoBusquedaSiathUnidadMilitar) {
      this.siathUnidadMilitarSeleccionada = null;
    }
  }

  //SE EJECUTA CON (mousedown) EN VEZ DE (click) PARA QUE LA SELECCIÓN SE REGISTRE ANTES DE QUE EL (blur) DEL CAMPO
  //DE TEXTO OCULTE LA LISTA DE SUGERENCIAS:
  seleccionarSiathUnidadMilitar(siathUnidadMilitar: SiathUnidadMilitarSimuladaI): void {
    this.siathUnidadMilitarSeleccionada = siathUnidadMilitar;
    this.terminoBusquedaSiathUnidadMilitar = siathUnidadMilitar.nombre;
    this.mostrarSugerenciasSiathUnidadMilitar = false;
  }

  ocultarSugerenciasSiathUnidadMilitarConRetraso(): void {
    setTimeout(() => { this.mostrarSugerenciasSiathUnidadMilitar = false; }, 150);
  }

  limpiarBusquedaSiathUnidadMilitar(): void {
    this.terminoBusquedaSiathUnidadMilitar = '';
    this.siathUnidadMilitarSeleccionada = null;
    this.mensajeBusquedaSiathUnidadMilitar = '';
  }

  //CARGA LOS DATOS DE LA UNIDAD MILITAR SIATH SELECCIONADA EN EL FORMULARIO (NOMBRE, SIGLA Y CÓDIGO):
  cargarInformacionUnidadMilitar(): void {
    this.mensajeBusquedaSiathUnidadMilitar = '';
    if (!this.siathUnidadMilitarSeleccionada) {
      this.mensajeBusquedaSiathUnidadMilitar = 'Escriba y seleccione una unidad militar del catálogo SIATH.';
      return;
    }

    this.unidadesMilitaresForm.patchValue({
      codigoUnidadMilitar: this.siathUnidadMilitarSeleccionada.codigoSiath,
      nombreUnidadMilitar: this.siathUnidadMilitarSeleccionada.nombre,
      siglaoAcronimoUnidadMilitar: this.siathUnidadMilitarSeleccionada.siglaoAcronimo
    });
    this.mensajeBusquedaSiathUnidadMilitar = 'Datos de la unidad militar cargados correctamente.';
  }

  onSelectFileUnidadMilitar(event: Event): void {
    this.mensajeErrorFoto = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const extension = (file.name.split('.').pop() || '').toLowerCase();
    const extensionesPermitidas = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
    const tamanoMaximoBytes = 2_000_000; //2.0 MB.

    if (file.size > tamanoMaximoBytes) {
      this.mensajeErrorFoto = 'El archivo excede el tamaño máximo permitido de 2.0 MB.';
      input.value = '';
      return;
    }
    if (!extensionesPermitidas.includes(extension)) {
      this.mensajeErrorFoto = 'El archivo debe tener una extensión válida (jpg, jpeg, bmp, png o gif).';
      input.value = '';
      return;
    }

    this.selectedFileUnidadMilitar = file;
    this.isSelectedFileUnidadMilitar = true;

    const lector = new FileReader();
    lector.onload = () => {
      this.liberarPreview();
      this.previewUrlFotoUnidadMilitar = lector.result as string;
      this.changeDetectorRef.markForCheck();
    };
    lector.readAsDataURL(file);
  }

  onRemoveFileUnidadMilitar(): void {
    this.selectedFileUnidadMilitar = null;
    this.isSelectedFileUnidadMilitar = false;
    this.previewUrlFotoUnidadMilitar = null;
    if (this.nombreArchivoFotoUnidadMilitar && !this.fotoExistenteEliminada) {
      this.resolverPreviewFoto(this.nombreArchivoFotoUnidadMilitar);
    }
  }

  confirmarEliminarFotoUnidadMilitar(): void {
    if (!this.nombreArchivoFotoUnidadMilitar) return;
    this.banderaConfirmacionEliminacionFoto = true;
  }

  noEliminarFotoUnidadMilitar(): void {
    this.banderaConfirmacionEliminacionFoto = false;
  }

  siEliminarFotoUnidadMilitar(): void {
    this.banderaConfirmacionEliminacionFoto = false;
    this.previewUrlFotoUnidadMilitar = null;
    this.selectedFileUnidadMilitar = null;
    this.isSelectedFileUnidadMilitar = false;
    this.fotoExistenteEliminada = true;
  }

  guardarModificar(): void {
    if (this.unidadesMilitaresForm.invalid) {
      this.unidadesMilitaresForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.unidadesMilitaresForm.getRawValue();

    const nombreAnterior = this.nombreArchivoFotoUnidadMilitar;
    let nombreArchivoFoto = this.fotoExistenteEliminada ? '' : nombreAnterior;
    let operacionFoto: OperacionFotoUnidadMilitar | null = null;
    if (this.selectedFileUnidadMilitar) {
      const extension = (this.selectedFileUnidadMilitar.name.split('.').pop() || '').toLowerCase();
      nombreArchivoFoto = valoresFormulario.idUnidadMilitar
        ? `${this.obtenerIdUnidadMilitarEncriptado(Number(valoresFormulario.idUnidadMilitar))}.${extension}`
        : '';
      operacionFoto = { tipo: 'subir', nombreAnterior, nombreNuevo: nombreArchivoFoto, archivo: this.selectedFileUnidadMilitar };
    } else if (this.fotoExistenteEliminada && nombreAnterior) {
      operacionFoto = { tipo: 'eliminar', nombreAnterior, nombreNuevo: '' };
    }

    const unidadMilitar: UnidadesMilitaresI = {
      idUnidadMilitar: valoresFormulario.idUnidadMilitar ?? undefined,
      codigoUnidadMilitar: valoresFormulario.codigoUnidadMilitar,
      nombreUnidadMilitar: valoresFormulario.nombreUnidadMilitar,
      siglaoAcronimoUnidadMilitar: valoresFormulario.siglaoAcronimoUnidadMilitar,
      nombreArchivoFotoLogExtoFmtUnidadMilitar: nombreArchivoFoto,
      nombreCarpetaAlmacenamientoUnidadMilitar: String(valoresFormulario.siglaoAcronimoUnidadMilitar).toUpperCase(),
      nivelUnidadMilitar: valoresFormulario.nivelUnidadMilitar
    };
    this.guardar.emit({ unidadMilitar, operacionFoto });
  }

  private obtenerIdUnidadMilitarEncriptado(idUnidadMilitar: number): string {
    let idEncriptado = String(idUnidadMilitar);
    for (let i = 0; i < 2; i++) idEncriptado = btoa(idEncriptado);
    return idEncriptado;
  }

  confirmarEliminar(): void {
    const idUnidadMilitar = this.unidadesMilitaresForm.getRawValue().idUnidadMilitar;
    if (idUnidadMilitar) {
      this.eliminar.emit(Number(idUnidadMilitar));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }

  ngOnDestroy(): void { this.liberarPreview(); }
}
