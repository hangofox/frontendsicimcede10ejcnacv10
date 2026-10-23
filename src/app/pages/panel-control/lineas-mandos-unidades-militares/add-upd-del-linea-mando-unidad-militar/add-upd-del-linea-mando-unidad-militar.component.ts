import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { LineasMandosUnidadesMilitaresI } from '../../../../interfaces/panel-control/lineas-mandos-unidades-militares/lineas-mandos-unidades-militares.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { AnalisisLineaMando, SEPARADOR_LINEA_MANDO, analizarLineaMando, formatearLineaMando, obtenerRutasLineaMando } from '../../../../shared/lineas-mando/linea-mando.util';

@Component({
  selector: 'app-add-upd-del-linea-mando-unidad-militar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upd-del-linea-mando-unidad-militar.component.html',
  styleUrl: './add-upd-del-linea-mando-unidad-militar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelLineaMandoUnidadMilitarComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() lineaMandoUnidadMilitarData: LineasMandosUnidadesMilitaresI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<LineasMandosUnidadesMilitaresI>();
  @Output() eliminar = new EventEmitter<number>();

  lineasMandosUnidadesMilitaresForm!: FormGroup;

  //BÚSQUEDA DE UNIDAD MILITAR (SOLO EN MODO GUARDAR) — CAMPO DE TEXTO QUE FILTRA EL CATÁLOGO DE UNIDADES MILITARES
  //MILITARES MIENTRAS SE ESCRIBE (MISMO PATRÓN QUE AddUpdDelSociedadUnidadCentralizadoraComponent):
  terminoBusquedaUnidadMilitar = '';
  unidadMilitarBusquedaSeleccionada: UnidadesMilitaresI | null = null;
  mostrarSugerenciasUnidadMilitar = false;
  mensajeBusquedaUnidadMilitar = '';

  //LISTA DE SUGERENCIAS FILTRADAS POR NOMBRE O SIGLA O ACRÓNIMO A PARTIR DEL TÉRMINO ESCRITO:
  get unidadesMilitaresFiltradas(): UnidadesMilitaresI[] {
    const termino = this.terminoBusquedaUnidadMilitar.trim().toUpperCase();
    if (!termino) return this.unidadesMilitares;
    return this.unidadesMilitares.filter(unidadMilitar =>
      String(unidadMilitar.nombreUnidadMilitar).toUpperCase().includes(termino) || String(unidadMilitar.siglaoAcronimoUnidadMilitar).toUpperCase().includes(termino)
    );
  }

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['lineaMandoUnidadMilitarData']) {
      this.initForm();
      this.terminoBusquedaUnidadMilitar = '';
      this.unidadMilitarBusquedaSeleccionada = null;
      this.mostrarSugerenciasUnidadMilitar = false;
      this.mensajeBusquedaUnidadMilitar = '';
    }
  }

  private initForm(): void {
    const lineaMandoUnidadMilitar = this.lineaMandoUnidadMilitarData;
    this.lineasMandosUnidadesMilitaresForm = this.formBuilder.group({
      idLineaMandoUnidadMilitar: [lineaMandoUnidadMilitar?.idLineaMandoUnidadMilitar ?? null],
      lineaMandoUnidadMilitar: [lineaMandoUnidadMilitar?.lineaMandoUnidadMilitar ?? '', [Validators.required, Validators.maxLength(255)]],
      unidadMilitarSeleccionada: [lineaMandoUnidadMilitar?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required]
    });
    if (this.banderaCrudEliminar) {
      this.lineasMandosUnidadesMilitaresForm.disable();
    }
    //EN MODIFICAR NO SE PUEDE CAMBIAR LA UNIDAD MILITAR DEL REGISTRO (SOLO LA LÍNEA DE MANDO); EL VALOR SE CONSERVA
    //PORQUE guardarModificar() LEE EL FORMULARIO CON getRawValue():
    if (this.banderaCrudModificar) {
      this.lineasMandosUnidadesMilitaresForm.get('unidadMilitarSeleccionada')?.disable();
    }
  }

  //MUESTRA LA LISTA DE SUGERENCIAS AL ESCRIBIR Y LIMPIA LA SELECCIÓN PREVIA SI EL TEXTO YA NO COINCIDE CON ELLA:
  onEscribirBusquedaUnidadMilitar(): void {
    this.mostrarSugerenciasUnidadMilitar = true;
    if (this.unidadMilitarBusquedaSeleccionada && this.unidadMilitarBusquedaSeleccionada.nombreUnidadMilitar !== this.terminoBusquedaUnidadMilitar) {
      this.unidadMilitarBusquedaSeleccionada = null;
    }
  }

  //SE EJECUTA CON (mousedown) EN VEZ DE (click) PARA QUE LA SELECCIÓN SE REGISTRE ANTES DE QUE EL (blur) DEL CAMPO
  //DE TEXTO OCULTE LA LISTA DE SUGERENCIAS:
  seleccionarUnidadMilitar(unidadMilitar: UnidadesMilitaresI): void {
    this.unidadMilitarBusquedaSeleccionada = unidadMilitar;
    this.terminoBusquedaUnidadMilitar = String(unidadMilitar.nombreUnidadMilitar);
    this.mostrarSugerenciasUnidadMilitar = false;
  }

  ocultarSugerenciasUnidadMilitarConRetraso(): void {
    setTimeout(() => { this.mostrarSugerenciasUnidadMilitar = false; }, 150);
  }

  limpiarBusquedaUnidadMilitar(): void {
    this.terminoBusquedaUnidadMilitar = '';
    this.unidadMilitarBusquedaSeleccionada = null;
    this.mensajeBusquedaUnidadMilitar = '';
  }

  //CARGA LA UNIDAD MILITAR SELECCIONADA EN EL FORMULARIO:
  cargarInformacionUnidadMilitar(): void {
    this.mensajeBusquedaUnidadMilitar = '';
    if (!this.unidadMilitarBusquedaSeleccionada) {
      this.mensajeBusquedaUnidadMilitar = 'Escriba y seleccione una unidad militar del catálogo.';
      return;
    }

    this.lineasMandosUnidadesMilitaresForm.patchValue({
      unidadMilitarSeleccionada: this.unidadMilitarBusquedaSeleccionada.idUnidadMilitar
    });
    this.mensajeBusquedaUnidadMilitar = 'Datos de la unidad militar cargados correctamente.';
  }

  //TRAMO COMÚN Y FINALES ALTERNATIVOS ESCRITOS EN EL CAMPO "LÍNEA DE MANDO" (VER LA NOMENCLATURA EN linea-mando.util.ts),
  //EJ. "BAICC->BRICC->CAOCC->[SECEJ->CEDE10][CEDE10][JEMGF->COING]":
  private get analisisLineaMandoEscrita(): AnalisisLineaMando {
    return analizarLineaMando(this.lineasMandosUnidadesMilitaresForm?.get('lineaMandoUnidadMilitar')?.value);
  }

  //RUTAS COMPLETAS QUE RESULTAN DE LA LÍNEA DE MANDO ESCRITA; SE MUESTRAN EN EL FORMULARIO CUANDO HAY FINALES ALTERNATIVOS:
  get rutasLineaMando(): string[][] {
    const analisis = this.analisisLineaMandoEscrita;
    return analisis.errores.length ? [] : obtenerRutasLineaMando(analisis.estructura);
  }

  //ERRORES DE FORMATO DE LA LÍNEA DE MANDO: LOS PASOS VAN SEPARADOS CON "->" Y LOS FINALES ALTERNATIVOS VAN AL FINAL ENTRE
  //CORCHETES; CADA SIGLA O ACRÓNIMO DEBE ESCRIBIRSE EXACTAMENTE IGUAL A LA SIGLA O ACRÓNIMO DE UNA UNIDAD MILITAR REGISTRADA; LA LÍNEA
  //EMPIEZA POR LA UNIDAD MILITAR DEL REGISTRO (LA SUBALTERNA) Y SIGUE HACIA LAS SUPERIORES; NINGUNA SIGLA O ACRÓNIMO SE REPITE DENTRO DEL
  //TRAMO COMÚN NI DENTRO DE UNA MISMA RUTA (UNA SIGLA O ACRÓNIMO SÍ PUEDE APARECER EN VARIOS FINALES, EJ. CEDE10) Y NO HAY FINALES REPETIDOS:
  get erroresLineaMando(): string[] {
    if (this.banderaCrudEliminar) return [];
    const { estructura, errores: erroresFormato } = this.analisisLineaMandoEscrita;
    const { tramoComun, finalesAlternativos } = estructura;
    if (!tramoComun.length && !finalesAlternativos.length) return erroresFormato;
    const errores = [...erroresFormato];
    const siglasoAcronimosRegistradas = this.unidadesMilitares.map(unidad => String(unidad.siglaoAcronimoUnidadMilitar ?? '').trim());
    const todosLosPasos = [...tramoComun, ...finalesAlternativos.flat()];

    if (tramoComun.some(paso => !paso)) {
      errores.push('Hay un paso vacío en el tramo común: escriba una sigla entre cada "->" (sin "->" al inicio ni repetido).');
    }
    finalesAlternativos.forEach((final, indice) => {
      if (final.some(paso => !paso)) {
        errores.push(`El final alternativo ${indice + 1} tiene un paso vacío: escriba al menos una sigla entre los corchetes y una sigla entre cada "->".`);
      }
    });
    [...new Set(todosLosPasos.filter(paso => !!paso))].forEach(paso => {
      if (siglasoAcronimosRegistradas.includes(paso)) return;
      if (/[\/,;|>\[\]]/.test(paso)) {
        errores.push(`"${paso}" no es válido: separe las siglas únicamente con "->" y encierre cada final alternativo entre "[" y "]".`);
        return;
      }
      const parecida = siglasoAcronimosRegistradas.find(siglaoAcronimo => siglaoAcronimo.toUpperCase() === paso.toUpperCase());
      errores.push(parecida
        ? `"${paso}" debe escribirse igual que la sigla registrada: "${parecida}".`
        : `"${paso}" no corresponde a la sigla o acrónimo de ninguna unidad militar registrada.`);
    });
    const repetidasTramoComun = tramoComun.filter((paso, indice) => !!paso && tramoComun.indexOf(paso) !== indice);
    if (repetidasTramoComun.length) {
      errores.push(`La sigla ${[...new Set(repetidasTramoComun)].join(', ')} está repetida en el tramo común de la línea de mando.`);
    }
    finalesAlternativos.forEach((final, indice) => {
      const repetidas = final.filter((paso, posicion) => !!paso && (final.indexOf(paso) !== posicion || tramoComun.includes(paso)));
      if (repetidas.length) {
        errores.push(`La sigla ${[...new Set(repetidas)].join(', ')} está repetida en el final alternativo ${indice + 1} (no puede repetirse dentro del final ni estar ya en el tramo común).`);
      }
    });
    const textosFinales = finalesAlternativos.map(final => final.join(SEPARADOR_LINEA_MANDO));
    const finalesRepetidos = textosFinales.filter((final, indice) => !!final && textosFinales.indexOf(final) !== indice);
    if (finalesRepetidos.length) {
      errores.push(`El final alternativo [${[...new Set(finalesRepetidos)].join('], [')}] está repetido.`);
    }
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(this.lineasMandosUnidadesMilitaresForm.get('unidadMilitarSeleccionada')?.value));
    const siglaoAcronimoUnidad = String(unidadMilitar?.siglaoAcronimoUnidadMilitar ?? '').trim();
    if (siglaoAcronimoUnidad && tramoComun[0] !== siglaoAcronimoUnidad) {
      errores.push(`La línea de mando debe empezar por la unidad militar del registro (la subalterna): "${siglaoAcronimoUnidad}->...".`);
    }
    if (formatearLineaMando(estructura).length > 255) {
      errores.push('La línea de mando no puede superar los 255 caracteres.');
    }
    return errores;
  }

  guardarModificar(): void {
    if (this.lineasMandosUnidadesMilitaresForm.invalid || this.erroresLineaMando.length) {
      this.lineasMandosUnidadesMilitaresForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.lineasMandosUnidadesMilitaresForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));
    if (!unidadMilitar) return;

    const lineaMandoUnidadMilitar: LineasMandosUnidadesMilitaresI = {
      idLineaMandoUnidadMilitar: valoresFormulario.idLineaMandoUnidadMilitar ?? undefined,
      //SE GUARDA SIN ESPACIOS ALREDEDOR DE LOS "->" NI DE LOS CORCHETES (EJ. "CAOCC -> [ SECEJ ][COEJC]" QUEDA "CAOCC->[SECEJ][COEJC]"):
      lineaMandoUnidadMilitar: formatearLineaMando(this.analisisLineaMandoEscrita.estructura),
      unidadMilitarDTO: unidadMilitar
    };
    this.guardar.emit(lineaMandoUnidadMilitar);
  }

  confirmarEliminar(): void {
    const idLineaMandoUnidadMilitar = this.lineasMandosUnidadesMilitaresForm.getRawValue().idLineaMandoUnidadMilitar;
    if (idLineaMandoUnidadMilitar) {
      this.eliminar.emit(Number(idLineaMandoUnidadMilitar));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
