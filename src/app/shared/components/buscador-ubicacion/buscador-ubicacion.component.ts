import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DepartamentosoEstadosMundoI } from '../../../interfaces/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface';
import { CiudadesMundoI } from '../../../interfaces/paises-mundo/departamentos-estados-mundo/ciudades-mundo/ciudades-mundo.interface';
import { PaisesMundoI } from '../../../interfaces/paises-mundo/paises-mundo.interface';
import { DepartamentosoEstadosMundoService } from '../../../services/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.service';
import { CiudadesMundoService } from '../../../services/paises-mundo/departamentos-estados-mundo/ciudades-mundo/ciudades-mundo.service';
import { PaisesMundoService } from '../../../services/paises-mundo/paises-mundo.service';

@Component({
  selector: 'app-buscador-ubicacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buscador-ubicacion.component.html',
  styleUrl: './buscador-ubicacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuscadorUbicacionComponent implements OnInit, OnChanges {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) controlPais!: string;
  @Input({ required: true }) controlDepartamento!: string;
  @Input({ required: true }) controlCiudad!: string;
  @Input() camposRequeridos = false;

  paises: PaisesMundoI[] = [];
  departamentos: DepartamentosoEstadosMundoI[] = [];
  ciudades: CiudadesMundoI[] = [];
  paisSeleccionado: PaisesMundoI | null = null;
  departamentoSeleccionado: DepartamentosoEstadosMundoI | null = null;
  ciudadSeleccionada: CiudadesMundoI | null = null;
  terminoPais = '';
  terminoDepartamento = '';
  terminoCiudad = '';
  mostrarPaises = false;
  mostrarDepartamentos = false;
  mostrarCiudades = false;

  constructor(
    private readonly paisesService: PaisesMundoService,
    private readonly departamentosService: DepartamentosoEstadosMundoService,
    private readonly ciudadesService: CiudadesMundoService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.paisesService.findAllCountriesOfTheWorld(undefined, undefined, 'nombrePaisMundo', 'ASC').subscribe(paises => {
      this.paises = paises;
      this.sincronizarFormulario();
      this.cdr.markForCheck();
    });
    this.departamentosService.findAllDepartmentsOrStatesOfTheWorld(undefined, undefined, undefined, 'nombreDepartamentooEstadoMundo', 'ASC').subscribe(departamentos => {
      this.departamentos = departamentos;
      this.sincronizarFormulario();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(): void { this.sincronizarFormulario(); }

  get paisesFiltrados(): PaisesMundoI[] {
    const termino = this.terminoPais.trim().toUpperCase();
    return this.paises.filter(pais => !termino || String(pais.nombrePaisMundo).toUpperCase().includes(termino));
  }

  get departamentosFiltrados(): DepartamentosoEstadosMundoI[] {
    const idPais = this.paisSeleccionado?.idPaisMundo;
    const termino = this.terminoDepartamento.trim().toUpperCase();
    return this.departamentos.filter(departamento =>
      (!idPais || departamento.paisMundoDTO?.idPaisMundo === idPais) &&
      (!termino || String(departamento.nombreDepartamentooEstadoMundo).toUpperCase().includes(termino))
    );
  }

  get ciudadesFiltradas(): CiudadesMundoI[] {
    const termino = this.terminoCiudad.trim().toUpperCase();
    return this.ciudades.filter(ciudad => !termino || String(ciudad.nombreCiudadMundo).toUpperCase().includes(termino));
  }

  escribirPais(event: Event): void {
    this.terminoPais = (event.target as HTMLInputElement).value;
    this.formGroup.get(this.controlPais)?.setValue(this.terminoPais);
    this.paisSeleccionado = null;
    this.limpiarDepartamento();
    this.mostrarPaises = true;
  }

  seleccionarPais(pais: PaisesMundoI): void {
    this.paisSeleccionado = pais;
    this.terminoPais = String(pais.nombrePaisMundo);
    this.formGroup.get(this.controlPais)?.setValue(this.terminoPais);
    this.mostrarPaises = false;
    this.limpiarDepartamento();
  }

  limpiarPais(): void {
    this.paisSeleccionado = null;
    this.terminoPais = '';
    this.formGroup.get(this.controlPais)?.setValue('');
    this.limpiarDepartamento();
  }

  escribirDepartamento(event: Event): void {
    this.terminoDepartamento = (event.target as HTMLInputElement).value;
    this.formGroup.get(this.controlDepartamento)?.setValue(this.terminoDepartamento);
    this.departamentoSeleccionado = null;
    this.limpiarCiudad();
    this.mostrarDepartamentos = true;
  }

  seleccionarDepartamento(departamento: DepartamentosoEstadosMundoI): void {
    this.departamentoSeleccionado = departamento;
    this.terminoDepartamento = String(departamento.nombreDepartamentooEstadoMundo);
    this.formGroup.get(this.controlDepartamento)?.setValue(this.terminoDepartamento);
    this.mostrarDepartamentos = false;
    this.limpiarCiudad();
    this.cargarCiudades();
  }

  limpiarDepartamento(): void {
    this.departamentoSeleccionado = null;
    this.terminoDepartamento = '';
    this.formGroup?.get(this.controlDepartamento)?.setValue('');
    this.limpiarCiudad();
  }

  escribirCiudad(event: Event): void {
    this.terminoCiudad = (event.target as HTMLInputElement).value;
    this.formGroup.get(this.controlCiudad)?.setValue(this.terminoCiudad);
    this.ciudadSeleccionada = null;
    this.mostrarCiudades = true;
  }

  seleccionarCiudad(ciudad: CiudadesMundoI): void {
    this.ciudadSeleccionada = ciudad;
    this.terminoCiudad = String(ciudad.nombreCiudadMundo);
    this.formGroup.get(this.controlCiudad)?.setValue(this.terminoCiudad);
    this.mostrarCiudades = false;
  }

  limpiarCiudad(): void {
    this.ciudadSeleccionada = null;
    this.ciudades = [];
    this.terminoCiudad = '';
    this.formGroup?.get(this.controlCiudad)?.setValue('');
  }

  ocultarSugerencias(): void {
    setTimeout(() => {
      this.mostrarPaises = false;
      this.mostrarDepartamentos = false;
      this.mostrarCiudades = false;
      this.cdr.markForCheck();
    }, 150);
  }

  sincronizarFormulario(): void {
    if (!this.formGroup) return;
    this.terminoPais = String(this.formGroup.get(this.controlPais)?.value || '');
    this.terminoDepartamento = String(this.formGroup.get(this.controlDepartamento)?.value || '');
    this.terminoCiudad = String(this.formGroup.get(this.controlCiudad)?.value || '');
    this.paisSeleccionado = this.paises.find(pais => String(pais.nombrePaisMundo).toUpperCase() === this.terminoPais.toUpperCase()) ?? null;
    this.departamentoSeleccionado = this.departamentosFiltrados.find(departamento => String(departamento.nombreDepartamentooEstadoMundo).toUpperCase() === this.terminoDepartamento.toUpperCase()) ?? null;
    if (this.paisSeleccionado && this.departamentoSeleccionado) this.cargarCiudades(false);
  }

  private cargarCiudades(limpiarSeleccion = true): void {
    const idPais = this.paisSeleccionado?.idPaisMundo;
    const idDepartamento = this.departamentoSeleccionado?.idDepartamentooEstadoMundo;
    if (!idPais || !idDepartamento) return;
    const ciudadActual = limpiarSeleccion ? '' : this.terminoCiudad;
    this.ciudadesService.findAllCitiesOfTheWorld(undefined, idPais, idDepartamento, undefined, undefined, undefined, 'nombreCiudadMundo', 'ASC').subscribe(ciudades => {
      this.ciudades = ciudades;
      this.ciudadSeleccionada = ciudades.find(ciudad => String(ciudad.nombreCiudadMundo).toUpperCase() === ciudadActual.toUpperCase()) ?? null;
      this.cdr.markForCheck();
    });
  }
}
