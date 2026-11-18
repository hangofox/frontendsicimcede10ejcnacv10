import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MaterialesTecnicosI } from '../../../../../interfaces/dinco/gestion-desminado/materiales-tecnicos/materiales-tecnicos.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposDespejesMilitaresArtefactosExplosivosI } from '../../../../../interfaces/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.interface';

import { MaterialesTecnicosService } from '../../../../../services/dinco/gestion-desminado/materiales-tecnicos/materiales-tecnicos.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposDespejesMilitaresArtefactosExplosivosService } from '../../../../../services/dinco/tipos-despejes-militares-artefactos-explosivos/tipos-despejes-militares-artefactos-explosivos.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';

import { AddUpdDelMaterialTecnicoComponent } from '../add-upd-del-material-tecnico/add-upd-del-material-tecnico.component';
import { VistaMaterialTecnicoComponent } from '../vista-material-tecnico/vista-material-tecnico.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { OrdenarPorSiglaPipe } from '../../../../../shared/pipes/ordenar-por-sigla.pipe';

@Component({
  selector: 'app-listado-materiales-tecnicos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelMaterialTecnicoComponent, VistaMaterialTecnicoComponent, SemaforoContadoresComponent, OrdenarPorSiglaPipe],
  templateUrl: './listado-materiales-tecnicos.component.html',
  styleUrl: './listado-materiales-tecnicos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoMaterialesTecnicosComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBOS DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposDespejesMilitaresArtefactosExplosivos: TiposDespejesMilitaresArtefactosExplosivosI[] = [];

  //PÁGINA ACTUAL DE MATERIALES TÉCNICOS (EL BACKEND FILTRA POR PALABRA CLAVE Y COMBOS; LA PÁGINA SE RECORTA EN EL CLIENTE PARA
  //PODER CONTAR CADA ESTADO DEL SEMÁFORO SOBRE EL MISMO RESULTADO — MISMO PATRÓN QUE ListadoInfraestructurasComponent):
  materialesTecnicos: MaterialesTecnicosI[] = [];
  totalRegistros = 0;
  readonly estados = [
    { etiqueta: 'BUENO', tono: 'bueno' },
    { etiqueta: 'REGULAR', tono: 'regular' },
    { etiqueta: 'MALO', tono: 'malo' },
    { etiqueta: 'MANTENIMIENTO', tono: 'mantenimiento' },
    { etiqueta: 'FUERA DE SERVICIO', tono: 'fuera-servicio' },
    { etiqueta: 'DADO DE BAJA', tono: 'baja' }
  ];
  estadosContadores = this.estados.map(estado => ({ ...estado, valor: 0 }));

  materialesTecnicosForm: FormGroup;

  //PAGINACIÓN:
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  materialTecnicoSeleccionado: MaterialesTecnicosI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private materialesTecnicosService: MaterialesTecnicosService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private tiposDespejesMilitaresArtefactosExplosivosService: TiposDespejesMilitaresArtefactosExplosivosService,
    private spinnerService: SpinnerService
  ) {
    this.materialesTecnicosForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxNombreTipoDespejeMilitarArtefactoExplosivoSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarTiposDespejesMilitaresArtefactosExplosivos();
    this.accionListar();
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES DESDE EL BACKEND:
  private cargarUnidadesMilitares(): void {
    this.unidadesMilitaresService.findAllMilitaryUnits(undefined, undefined, 'nombreUnidadMilitar', 'ASC')
      .subscribe({
        next: (unidadesMilitares) => {
          this.unidadesMilitares = unidadesMilitares;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR UNIDADES MILITARES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE DESPEJE MILITAR DE ARTEFACTOS EXPLOSIVOS DESDE EL BACKEND:
  private cargarTiposDespejesMilitaresArtefactosExplosivos(): void {
    this.tiposDespejesMilitaresArtefactosExplosivosService.findAllTypesOfMilitaryClearanceOfExplosiveDevices(undefined, undefined, 'nombreTipoDespejeMilitarArtefactoExplosivo', 'ASC')
      .subscribe({
        next: (tiposDespejesMilitaresArtefactosExplosivos) => {
          this.tiposDespejesMilitaresArtefactosExplosivos = tiposDespejesMilitaresArtefactosExplosivos;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE DESPEJE MILITAR DE ARTEFACTOS EXPLOSIVOS: ', err)
      });
  }

  //RESETEA LA PÁGINA Y VUELVE A CONSULTAR EL BACKEND CON LOS FILTROS ACTUALES:
  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA EL BACKEND CON LA PALABRA CLAVE Y LOS COMBOS DE FILTRO; CON EL RESULTADO SE CALCULAN EL TOTAL, LOS
  //CONTADORES DEL SEMÁFORO POR ESTADO Y LA PÁGINA ACTUAL:
  accionListar(): void {
    const valoresFormulario = this.materialesTecnicosForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = (valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado as string) || undefined;
    const nombreTipoDespejeMilitarArtefactoExplosivo: string | undefined = (valoresFormulario.cboxNombreTipoDespejeMilitarArtefactoExplosivoSeleccionado as string) || undefined;

    this.materialesTecnicosService.findAllTechnicalMaterials(
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      nombreTipoDespejeMilitarArtefactoExplosivo,
      'idMaterialTecnico',
      'ASC'
    ).subscribe({
      next: (registros) => {
        this.totalRegistros = registros.length;
        const ultimaPagina = Math.max(0, Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina) - 1);
        this.paginaActual = Math.min(this.paginaActual, ultimaPagina);
        const inicio = this.paginaActual * this.tandaNumeroRegistrosporPagina;
        this.materialesTecnicos = registros.slice(inicio, inicio + this.tandaNumeroRegistrosporPagina);
        this.estadosContadores = this.estados.map(estado => ({
          ...estado,
          valor: registros.filter(registro => this.normalizarEstado(registro.estadoUsoMaterialTecnico) === this.normalizarEstado(estado.etiqueta)).length
        }));
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR MATERIALES TÉCNICOS: ', err)
    });
  }

  private normalizarEstado(estado: unknown): string {
    return String(estado ?? '').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  //CLASE DEL BADGE DE ESTADO EN LA TABLA, CON EL MISMO TONO DE SU LUZ EN EL SEMÁFORO:
  claseEstado(estado: unknown): string {
    const encontrado = this.estados.find(item => this.normalizarEstado(item.etiqueta) === this.normalizarEstado(estado));
    return encontrado ? `badge-${encontrado.tono}` : 'badge-neutral';
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
    this.tandaNumeroRegistrosporPagina = Number(this.materialesTecnicosForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL:
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', materialTecnico: MaterialesTecnicosI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.materialTecnicoSeleccionado = materialTecnico;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(materialTecnico: MaterialesTecnicosI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.materialTecnicoSeleccionado = materialTecnico;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.materialTecnicoSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.materialTecnicoSeleccionado = null;
  }

  //RECIBE EL MATERIAL TÉCNICO NUEVO O MODIFICADO DESDE EL MODAL Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID).
  //SI EL BACKEND RESPONDE banderaexito = false (EJ. REGISTRO REPETIDO) SE MUESTRA SU MENSAJE Y EL MODAL QUEDA ABIERTO:
  guardarMaterialTecnico(materialTecnico: MaterialesTecnicosI): void {
    const esModificacion = !!materialTecnico.idMaterialTecnico;
    const solicitud = esModificacion
      ? this.materialesTecnicosService.updateTechnicalMaterial(materialTecnico)
      : this.materialesTecnicosService.addTechnicalMaterial(materialTecnico);

    solicitud.subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible guardar el material técnico.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || `Material técnico ${esModificacion ? 'modificado' : 'creado'} correctamente.`);
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL GUARDAR MATERIAL TÉCNICO: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al guardar el material técnico.');
      }
    });
  }

  //RECIBE EL ID DEL MATERIAL TÉCNICO A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarMaterialTecnico(idMaterialTecnico: number): void {
    this.materialesTecnicosService.deleteTechnicalMaterial(idMaterialTecnico).subscribe({
      next: (respuesta) => {
        if (respuesta.banderaexito === false) {
          this.mostrarToast('error', respuesta.mensaje || 'No fue posible eliminar el material técnico.');
          return;
        }
        this.mostrarToast('exito', respuesta.mensaje || 'Material técnico eliminado correctamente.');
        this.accionListar();
        this.cerrarModalAddUpdDel();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR MATERIAL TÉCNICO: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el material técnico.');
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
