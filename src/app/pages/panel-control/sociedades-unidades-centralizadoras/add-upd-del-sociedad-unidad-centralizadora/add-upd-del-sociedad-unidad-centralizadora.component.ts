import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SociedadesUnidadesCentralizadorasI } from '../../../../interfaces/panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface';
import { UnidadesMilitaresI } from '../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

@Component({
  selector: 'app-add-upd-del-sociedad-unidad-centralizadora',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upd-del-sociedad-unidad-centralizadora.component.html',
  styleUrl: './add-upd-del-sociedad-unidad-centralizadora.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelSociedadUnidadCentralizadoraComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() sociedadUnidadCentralizadoraData: SociedadesUnidadesCentralizadorasI | null = null;
  @Input() unidadesMilitares: UnidadesMilitaresI[] = [];

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<SociedadesUnidadesCentralizadorasI>();
  @Output() eliminar = new EventEmitter<number>();

  sociedadesUnidadesCentralizadorasForm!: FormGroup;

  //BÚSQUEDA DE UNIDAD MILITAR (SOLO EN MODO GUARDAR) — CAMPO DE TEXTO QUE FILTRA EL CATÁLOGO DE UNIDADES
  //MILITARES MIENTRAS SE ESCRIBE (MISMO PATRÓN QUE AddUpdDelUnidadMilitarRealizMttoComponent):
  terminoBusquedaUnidadMilitar = '';
  unidadMilitarBusquedaSeleccionada: UnidadesMilitaresI | null = null;
  mostrarSugerenciasUnidadMilitar = false;
  mensajeBusquedaUnidadMilitar = '';

  //LISTA DE SUGERENCIAS FILTRADAS POR NOMBRE O SIGLA A PARTIR DEL TÉRMINO ESCRITO:
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
    if (changes['modo'] || changes['sociedadUnidadCentralizadoraData']) {
      this.initForm();
      this.terminoBusquedaUnidadMilitar = '';
      this.unidadMilitarBusquedaSeleccionada = null;
      this.mostrarSugerenciasUnidadMilitar = false;
      this.mensajeBusquedaUnidadMilitar = '';
    }
  }

  private initForm(): void {
    const sociedadUnidadCentralizadora = this.sociedadUnidadCentralizadoraData;
    this.sociedadesUnidadesCentralizadorasForm = this.formBuilder.group({
      idSociedadUnidadCentralizadora: [sociedadUnidadCentralizadora?.idSociedadUnidadCentralizadora ?? null],
      codigoSociedadUnidadCentralizadora: [sociedadUnidadCentralizadora?.codigoSociedadUnidadCentralizadora ?? '', Validators.required],
      unidadMilitarSeleccionada: [sociedadUnidadCentralizadora?.unidadMilitarDTO?.idUnidadMilitar ?? '', Validators.required]
    });
    if (this.banderaCrudEliminar) {
      this.sociedadesUnidadesCentralizadorasForm.disable();
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

    this.sociedadesUnidadesCentralizadorasForm.patchValue({
      unidadMilitarSeleccionada: this.unidadMilitarBusquedaSeleccionada.idUnidadMilitar
    });
    this.mensajeBusquedaUnidadMilitar = 'Datos de la unidad militar cargados correctamente.';
  }

  guardarModificar(): void {
    if (this.sociedadesUnidadesCentralizadorasForm.invalid) {
      this.sociedadesUnidadesCentralizadorasForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.sociedadesUnidadesCentralizadorasForm.getRawValue();
    const unidadMilitar = this.unidadesMilitares.find(u => u.idUnidadMilitar === Number(valoresFormulario.unidadMilitarSeleccionada));

    const sociedadUnidadCentralizadora: SociedadesUnidadesCentralizadorasI = {
      idSociedadUnidadCentralizadora: valoresFormulario.idSociedadUnidadCentralizadora ?? undefined,
      codigoSociedadUnidadCentralizadora: valoresFormulario.codigoSociedadUnidadCentralizadora,
      unidadMilitarDTO: unidadMilitar ?? this.unidadesMilitares[0]
    };
    this.guardar.emit(sociedadUnidadCentralizadora);
  }

  confirmarEliminar(): void {
    const idSociedadUnidadCentralizadora = this.sociedadesUnidadesCentralizadorasForm.getRawValue().idSociedadUnidadCentralizadora;
    if (idSociedadUnidadCentralizadora) {
      this.eliminar.emit(Number(idSociedadUnidadCentralizadora));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
