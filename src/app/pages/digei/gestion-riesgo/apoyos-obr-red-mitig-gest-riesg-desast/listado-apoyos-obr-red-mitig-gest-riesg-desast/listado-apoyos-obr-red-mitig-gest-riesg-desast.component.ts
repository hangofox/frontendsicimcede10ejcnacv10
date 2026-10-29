import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApoyosObrRedMitigGestRiesgDesastI, ApoyosObrRedMitigGestRiesgDesastMsj } from '../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.interface';
import { UnidadesMilitaresI } from '../../../../../interfaces/panel-control/unidades-militares/unidades-militares.interface';
import { TiposEntidadesInstitucionalesI } from '../../../../../interfaces/tipos-entidades-institucionales/tipos-entidades-institucionales.interface';
import { TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI } from '../../../../../interfaces/digei/gestion-riesgo/tipos-em-desast-gen-obr-red-mitig/tipos-em-desast-gen-obr-red-mitig.interface';
import { PaisesMundoI } from '../../../../../interfaces/paises-mundo/paises-mundo.interface';
import { DepartamentosoEstadosMundoI } from '../../../../../interfaces/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface';

import { ApoyosObrRedMitigGestRiesgDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.service';
import { UnidadesMilitaresService } from '../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { TiposEntidadesInstitucionalesService } from '../../../../../services/tipos-entidades-institucionales/tipos-entidades-institucionales.service';
import { TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService } from '../../../../../services/digei/gestion-riesgo/tipos-em-desast-gen-obr-red-mitig/tipos-em-desast-gen-obr-red-mitig.service';
import { PaisesMundoService } from '../../../../../services/paises-mundo/paises-mundo.service';
import { DepartamentosoEstadosMundoService } from '../../../../../services/paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';
import { HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-eq_tr-obr-red-mitig/historial-eq_tr-obr-red-mitig.service';
import { HistorialControlAvancObrRedMitigGestRiesgDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-ctr-avanc-obr-red-mitig/historial-ctr-avanc-obr-red-mitig.service';
import { FotografiasAnexasApoyObrRedMitigGestRiesgDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/fot-anex-apoy-obr-red-mitig-gest-des/fot-anex-apoy-obr-red-mitig-gest-des.service';
import { IntegrantesApoyosObrRedMitigGestRiesgDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/integrantes-apoy-obr-red-mitig/integrantes-apoy-obr-red-mitig.service';
import { HistorialMaqPesadApoyObrRedMitigGestRiesgDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-maq-pesad-obr-red-mitig/historial-maq-pesad-obr-red-mitig.service';
import { HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastService } from '../../../../../services/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/historial-tip-pers-obr-red-mitig/historial-tip-pers-obr-red-mitig.service';

import { AddUpdDelApoyoObrRedMitigGestRiesgDesastComponent } from '../add-upd-del-apoyo-obr-red-mitig-gest-riesg-desast/add-upd-del-apoyo-obr-red-mitig-gest-riesg-desast.component';
import { VistaApoyoObrRedMitigGestRiesgDesastComponent } from '../vista-apoyo-obr-red-mitig-gest-riesg-desast/vista-apoyo-obr-red-mitig-gest-riesg-desast.component';
import { ListadoHistEqTrObrRedMitigComponent } from '../historial-eq_tr-obr-red-mitig/listado-hist-eq_tr-obr-red-mitig/listado-hist-eq_tr-obr-red-mitig.component';
import { ListadoHistCtrAvancObrRedMitigComponent } from '../historial-ctr-avanc-obr-red-mitig/listado-hist-ctr-avanc-obr-red-mitig/listado-hist-ctr-avanc-obr-red-mitig.component';
import { FotAnexApoyObrRedMitigGestDesComponent } from '../fot-anex-apoy-obr-red-mitig-gest-des/fot-anex-apoy-obr-red-mitig-gest-des.component';
import { ListadoIntegApoyObrRedMitigComponent } from '../integrantes_apoy_obr_red_mitig/listado-integ-apoy-obr-red-mitig/listado-integ-apoy-obr-red-mitig.component';
import { ListadoHistMaqPesadObrRedMitigComponent } from '../historial-maq-pesad-obr-red-mitig/listado-hist-maq-pesad-obr-red-mitig/listado-hist-maq-pesad-obr-red-mitig.component';
import { ListadoHistTipPersObrRedMitigComponent } from '../historial-tip-pers-obr-red-mitig/listado-hist-tip-pers-obr-red-mitig/listado-hist-tip-pers-obr-red-mitig.component';
import { cantidadIntegrantesRegistrados } from '../integrantes_apoy_obr_red_mitig/add-upd-del-integ_apoy-obr-red-mitig/add-upd-del-integ_apoy-obr-red-mitig.component';
import { SemaforoContadoresComponent } from '../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { OrdenarPorSiglaPipe } from '../../../../../shared/pipes/ordenar-por-sigla.pipe';

@Component({
  selector: 'app-listado-apoyos-obr-red-mitig-gest-riesg-desast',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddUpdDelApoyoObrRedMitigGestRiesgDesastComponent, VistaApoyoObrRedMitigGestRiesgDesastComponent, ListadoHistEqTrObrRedMitigComponent, ListadoHistCtrAvancObrRedMitigComponent, FotAnexApoyObrRedMitigGestDesComponent, ListadoIntegApoyObrRedMitigComponent, ListadoHistTipPersObrRedMitigComponent, ListadoHistMaqPesadObrRedMitigComponent, SemaforoContadoresComponent, OrdenarPorSiglaPipe],
  templateUrl: './listado-apoyos-obr-red-mitig-gest-riesg-desast.component.html',
  styleUrl: './listado-apoyos-obr-red-mitig-gest-riesg-desast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoApoyosObrRedMitigGestRiesgDesastComponent implements OnInit {

  //CATÁLOGOS CARGADOS DESDE EL BACKEND (COMBOS DE FILTRO Y/O COMBOS DEL FORMULARIO):
  unidadesMilitares: UnidadesMilitaresI[] = [];
  tiposEntidadesInstitucionales: TiposEntidadesInstitucionalesI[] = [];
  tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast: TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastI[] = [];
  paisesMundo: PaisesMundoI[] = [];
  departamentosoEstadosMundo: DepartamentosoEstadosMundoI[] = [];

  //PÁGINA ACTUAL DE APOYOS DE OBRAS, REDUCCIÓN Y MITIGACIÓN DE RIESGOS Y DESASTRES TRAÍDA DEL BACKEND (YA PAGINADA POR EL SERVIDOR, NO SE
  //RECORTA EN EL CLIENTE):
  apoyosObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI[] = [];
  totalRegistros = 0;

  //CANTIDAD DE EQUIPOS DE TRANSPORTES, DE CONTROLES DE AVANCES DE LA OBRA Y DE FOTOGRAFÍAS ANEXAS DE CADA APOYO (POR SU ID), PARA LAS
  //COLUMNAS QUE MUESTRAN "NO" O EL CHULO VERDE. LOS HISTORIALES NO SE PUEDEN FILTRAR POR APOYO EN EL BACKEND, ASÍ QUE CADA LISTA SE
  //TRAE COMPLETA UNA SOLA VEZ Y SE CUENTA AQUÍ; MIENTRAS SE CARGA (null) LA COLUMNA MUESTRA "...":
  cantidadTiposPersonalPorApoyo: Map<number, number> | null = null;
  cantidadEquiposTransportesPorApoyo: Map<number, number> | null = null;
  cantidadMaquinariasPesadasPorApoyo: Map<number, number> | null = null;
  cantidadControlesAvancesPorApoyo: Map<number, number> | null = null;
  cantidadFotografiasAnexasPorApoyo: Map<number, number> | null = null;
  cantidadIntegrantesPorApoyo: Map<number, number> | null = null;

  apoyosObrRedMitigGestRiesgDesastForm: FormGroup;

  //PAGINACIÓN REAL (CONTRA EL BACKEND):
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;

  //ESTADO DE MODALES:
  modalAddUpdDelVisible = false;
  modalVistaVisible = false;
  modalModo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  apoyoObrRedMitigGestRiesgDesastSeleccionado: ApoyosObrRedMitigGestRiesgDesastI | null = null;

  //ESTADO DEL MODAL DEL HISTORIAL DE EQUIPOS DE TRANSPORTES DEL APOYO (ASOCIADO AL APOYO SELECCIONADO):
  modalEquiposTransportesVisible = false;
  apoyoObrRedMitigGestRiesgDesastParaEquiposTransportes: ApoyosObrRedMitigGestRiesgDesastI | null = null;

  //ESTADO DEL MODAL DEL HISTORIAL DE MAQUINARIAS PESADAS DEL APOYO (ASOCIADO AL APOYO SELECCIONADO):
  modalMaquinariasPesadasVisible = false;
  apoyoObrRedMitigGestRiesgDesastParaMaquinariasPesadas: ApoyosObrRedMitigGestRiesgDesastI | null = null;

  //ESTADO DEL MODAL DEL HISTORIAL DE CONTROLES DE AVANCES DE LA OBRA DEL APOYO (ASOCIADO AL APOYO SELECCIONADO):
  modalControlesAvancesVisible = false;
  apoyoObrRedMitigGestRiesgDesastParaControlesAvances: ApoyosObrRedMitigGestRiesgDesastI | null = null;

  //ESTADO DEL MODAL DE LAS FOTOGRAFÍAS ANEXAS DEL APOYO (ASOCIADO AL APOYO SELECCIONADO):
  modalFotografiasAnexasVisible = false;
  apoyoObrRedMitigGestRiesgDesastParaFotografiasAnexas: ApoyosObrRedMitigGestRiesgDesastI | null = null;

  //ESTADO DEL MODAL DE LOS INTEGRANTES DEL APOYO (ASOCIADO AL APOYO SELECCIONADO):
  modalIntegrantesVisible = false;
  apoyoObrRedMitigGestRiesgDesastParaIntegrantes: ApoyosObrRedMitigGestRiesgDesastI | null = null;

  //ESTADO DEL MODAL DEL HISTORIAL DE TIPOS DE PERSONAL DE APOYOS DEL APOYO (ASOCIADO AL APOYO SELECCIONADO):
  modalTiposPersonalVisible = false;
  apoyoObrRedMitigGestRiesgDesastParaTiposPersonal: ApoyosObrRedMitigGestRiesgDesastI | null = null;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private apoyosObrRedMitigGestRiesgDesastService: ApoyosObrRedMitigGestRiesgDesastService,
    private unidadesMilitaresService: UnidadesMilitaresService,
    private tiposEntidadesInstitucionalesService: TiposEntidadesInstitucionalesService,
    private tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService: TiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService,
    private paisesMundoService: PaisesMundoService,
    private departamentosoEstadosMundoService: DepartamentosoEstadosMundoService,
    private spinnerService: SpinnerService,
    private historialEquipTranspApoyObrRedMitigGestRiesgDesastService: HistorialEquipTranspApoyObrRedMitigGestRiesgDesastService,
    private historialControlAvancObrRedMitigGestRiesgDesastService: HistorialControlAvancObrRedMitigGestRiesgDesastService,
    private fotografiasAnexasApoyObrRedMitigGestRiesgDesastService: FotografiasAnexasApoyObrRedMitigGestRiesgDesastService,
    private integrantesApoyosObrRedMitigGestRiesgDesastService: IntegrantesApoyosObrRedMitigGestRiesgDesastService,
    private historialTipoPersonalApoyObrRedMitigGestRiesgDesastService: HistorialTipoPersonalApoyObrRedMitigGestRiesgDesastService,
    private historialMaqPesadApoyObrRedMitigGestRiesgDesastService: HistorialMaqPesadApoyObrRedMitigGestRiesgDesastService
  ) {
    this.apoyosObrRedMitigGestRiesgDesastForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      //EL BACKEND FILTRA LOS APOYOS POR LA SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR (NO POR SU ID):
      cboxSiglaoAcronimoUnidadMilitarSeleccionado: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.cargarUnidadesMilitares();
    this.cargarTiposEntidadesInstitucionales();
    this.cargarTiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast();
    this.cargarPaisesMundo();
    this.cargarDepartamentosoEstadosMundo();
    this.accionListar();
    this.cargarCantidadTiposPersonal();
    this.cargarCantidadEquiposTransportes();
    this.cargarCantidadMaquinariasPesadas();
    this.cargarCantidadControlesAvances();
    this.cargarCantidadFotografiasAnexas();
    this.cargarCantidadIntegrantes();
  }

  //CUENTA CUÁNTOS REGISTROS DE LA LISTA PERTENECEN A CADA APOYO (POR EL ID DE SU apoyoObrRedMitigGestRiesgDesastDTO):
  private contarPorApoyo(registros: { apoyoObrRedMitigGestRiesgDesastDTO: ApoyosObrRedMitigGestRiesgDesastI }[]): Map<number, number> {
    const cantidades = new Map<number, number>();
    registros.forEach(registro => {
      const idApoyoObrRedMitigGestRiesgDesast = registro.apoyoObrRedMitigGestRiesgDesastDTO?.idApoyoObrRedMitigGestRiesgDesast;
      if (idApoyoObrRedMitigGestRiesgDesast !== undefined) cantidades.set(idApoyoObrRedMitigGestRiesgDesast, (cantidades.get(idApoyoObrRedMitigGestRiesgDesast) ?? 0) + 1);
    });
    return cantidades;
  }

  //CARGA EL HISTORIAL COMPLETO DE TIPOS DE PERSONAL DE APOYOS Y CUENTA LOS DE CADA APOYO:
  private cargarCantidadTiposPersonal(): void {
    this.cantidadTiposPersonalPorApoyo = null;
    this.historialTipoPersonalApoyObrRedMitigGestRiesgDesastService.findAllSupportStaffTypeHistories().subscribe({
      next: registros => {
        this.cantidadTiposPersonalPorApoyo = this.contarPorApoyo(registros);
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LOS TIPOS DE PERSONAL DE LOS APOYOS: ', err)
    });
  }

  //CARGA EL HISTORIAL COMPLETO DE EQUIPOS DE TRANSPORTES Y CUENTA LOS DE CADA APOYO:
  private cargarCantidadEquiposTransportes(): void {
    this.cantidadEquiposTransportesPorApoyo = null;
    this.historialEquipTranspApoyObrRedMitigGestRiesgDesastService.findAllTransportEquipmentHistoriesOfSupports().subscribe({
      next: registros => {
        this.cantidadEquiposTransportesPorApoyo = this.contarPorApoyo(registros);
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LOS EQUIPOS DE TRANSPORTES DE LOS APOYOS: ', err)
    });
  }

  //CARGA EL HISTORIAL COMPLETO DE MAQUINARIAS PESADAS Y CUENTA LAS DE CADA APOYO:
  private cargarCantidadMaquinariasPesadas(): void {
    this.cantidadMaquinariasPesadasPorApoyo = null;
    this.historialMaqPesadApoyObrRedMitigGestRiesgDesastService.findAllHeavyMachineryHistoriesOfSupports().subscribe({
      next: registros => {
        this.cantidadMaquinariasPesadasPorApoyo = this.contarPorApoyo(registros);
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LAS MAQUINARIAS PESADAS DE LOS APOYOS: ', err)
    });
  }

  //CARGA EL HISTORIAL COMPLETO DE CONTROLES DE AVANCES DE LAS OBRAS Y CUENTA LOS DE CADA APOYO:
  private cargarCantidadControlesAvances(): void {
    this.cantidadControlesAvancesPorApoyo = null;
    this.historialControlAvancObrRedMitigGestRiesgDesastService.findAllProgressControlHistoriesOfWorks().subscribe({
      next: registros => {
        this.cantidadControlesAvancesPorApoyo = this.contarPorApoyo(registros);
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LOS CONTROLES DE AVANCES DE LAS OBRAS DE LOS APOYOS: ', err)
    });
  }

  //CARGA LOS REGISTROS DE FOTOGRAFÍAS ANEXAS (UNO POR APOYO) Y CUENTA CUÁNTAS DE SUS DOS COLUMNAS TIENEN NOMBRE DE ARCHIVO:
  private cargarCantidadFotografiasAnexas(): void {
    this.cantidadFotografiasAnexasPorApoyo = null;
    this.fotografiasAnexasApoyObrRedMitigGestRiesgDesastService.findAllAttachedPhotographsOfSupports().subscribe({
      next: registros => {
        const cantidades = new Map<number, number>();
        registros.forEach(registro => {
          const idApoyoObrRedMitigGestRiesgDesast = registro.apoyoObrRedMitigGestRiesgDesastDTO?.idApoyoObrRedMitigGestRiesgDesast;
          if (idApoyoObrRedMitigGestRiesgDesast === undefined) return;
          const cantidad = [
            registro.nombreArchivoFotoExtensionOFormatoApoyObrRedMitigGestRiesgDesast1,
            registro.nombreArchivoFotoExtensionOFormatoApoyObrRedMitigGestRiesgDesast2
          ].filter(nombre => !!String(nombre ?? '').trim()).length;
          cantidades.set(idApoyoObrRedMitigGestRiesgDesast, (cantidades.get(idApoyoObrRedMitigGestRiesgDesast) ?? 0) + cantidad);
        });
        this.cantidadFotografiasAnexasPorApoyo = cantidades;
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LAS FOTOGRAFÍAS ANEXAS DE LOS APOYOS: ', err)
    });
  }

  //CARGA LOS REGISTROS DE INTEGRANTES (UNO POR APOYO) Y CUENTA CUÁNTOS DE SUS TRES INTEGRANTES (JEFE DE SECCIÓN TÉCNICA, JEFE DE
  //OPERACIONES Y COMANDANTE) ESTÁN REGISTRADOS:
  private cargarCantidadIntegrantes(): void {
    this.cantidadIntegrantesPorApoyo = null;
    this.integrantesApoyosObrRedMitigGestRiesgDesastService.findAllMembersOfSupports().subscribe({
      next: registros => {
        const cantidades = new Map<number, number>();
        registros.forEach(registro => {
          const idApoyoObrRedMitigGestRiesgDesast = registro.apoyoObrRedMitigGestRiesgDesastDTO?.idApoyoObrRedMitigGestRiesgDesast;
          if (idApoyoObrRedMitigGestRiesgDesast === undefined) return;
          cantidades.set(idApoyoObrRedMitigGestRiesgDesast, (cantidades.get(idApoyoObrRedMitigGestRiesgDesast) ?? 0) + cantidadIntegrantesRegistrados(registro));
        });
        this.cantidadIntegrantesPorApoyo = cantidades;
        this.changeDetectorRef.markForCheck();
      },
      error: err => console.error('ERROR AL CONTAR LOS INTEGRANTES DE LOS APOYOS: ', err)
    });
  }

  //CANTIDAD DE REGISTROS ASOCIADOS AL APOYO EN EL MAPA DADO (null MIENTRAS EL MAPA SE CARGA):
  cantidadAsociada(cantidades: Map<number, number> | null, apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): number | null {
    if (!cantidades) return null;
    return cantidades.get(apoyoObrRedMitigGestRiesgDesast.idApoyoObrRedMitigGestRiesgDesast ?? -1) ?? 0;
  }

  //CARGA EL CATÁLOGO DE UNIDADES MILITARES DESDE EL BACKEND (COMBO DE FILTRO Y COMBO DEL FORMULARIO):
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

  //CARGA EL CATÁLOGO DE TIPOS DE ENTIDADES INSTITUCIONALES DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposEntidadesInstitucionales(): void {
    this.tiposEntidadesInstitucionalesService.findAllTypesOfInstitutionalEntities(undefined, undefined, 'nombreTipoEntidadInstitucional', 'ASC')
      .subscribe({
        next: (tiposEntidadesInstitucionales) => {
          this.tiposEntidadesInstitucionales = tiposEntidadesInstitucionales;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE ENTIDADES INSTITUCIONALES: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE TIPOS DE EMERGENCIAS O DESASTRES QUE GENERAN LAS OBRAS DESDE EL BACKEND (COMBO DEL FORMULARIO):
  private cargarTiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast(): void {
    this.tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesastService.findAllTypesOfEmergenciesDisastersGeneratingWorks(undefined, undefined, 'nombreTipoEmDesastGenObrApoyoObrRedMitigGestRiesgDesast', 'ASC')
      .subscribe({
        next: (tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast) => {
          this.tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast = tiposEmDesastGenObrApoyoObrRedMitigGestRiesgDesast;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR TIPOS DE EMERGENCIAS O DESASTRES QUE GENERAN LAS OBRAS: ', err)
      });
  }

  //CARGA EL CATÁLOGO DE PAÍSES DEL MUNDO DESDE EL BACKEND (COMBO CON CAMPO DE TEXTO DE "PAÍS" DEL FORMULARIO):
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

  //CARGA EL CATÁLOGO COMPLETO DE DEPARTAMENTOS O ESTADOS DEL MUNDO DESDE EL BACKEND (COMBO CON CAMPO DE TEXTO DE "DEPARTAMENTO O
  //ESTADO" DEL FORMULARIO, FILTRADO EN EL COMPONENTE POR EL PAÍS SELECCIONADO):
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

  //CONSULTA PAGINADA REAL DEL BACKEND SEGÚN LA PALABRA CLAVE (CÓDIGO RADICADO, CIUDAD O SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR) Y LA
  //UNIDAD MILITAR SELECCIONADA:
  accionListar(): void {
    const valoresFormulario = this.apoyosObrRedMitigGestRiesgDesastForm.value;
    const palabraClave = (valoresFormulario.ctextPalabraClave || '').trim().toUpperCase();
    const keyword: string | undefined = palabraClave || undefined;
    const siglaoAcronimoUnidadMilitar: string | undefined = valoresFormulario.cboxSiglaoAcronimoUnidadMilitarSeleccionado || undefined;

    this.apoyosObrRedMitigGestRiesgDesastService.findAllSupportsWorksReductionMitigationRiskManagementDisastersPag(
      this.paginaActual,
      this.tandaNumeroRegistrosporPagina,
      undefined,
      keyword,
      siglaoAcronimoUnidadMilitar,
      'idApoyoObrRedMitigGestRiesgDesast',
      'ASC'
    ).subscribe({
      next: (data) => {
        this.apoyosObrRedMitigGestRiesgDesast = data;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR APOYOS DE OBRAS, REDUCCIÓN Y MITIGACIÓN DE RIESGOS Y DESASTRES: ', err)
    });

    this.apoyosObrRedMitigGestRiesgDesastService.findCountTotalRegisters(undefined, keyword, siglaoAcronimoUnidadMilitar)
      .subscribe({
        next: (total) => {
          this.totalRegistros = total;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CONTAR TOTAL DE APOYOS DE OBRAS, REDUCCIÓN Y MITIGACIÓN DE RIESGOS Y DESASTRES: ', err)
      });
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
    this.tandaNumeroRegistrosporPagina = Number(this.apoyosObrRedMitigGestRiesgDesastForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.paginaActual = 0;
    this.accionListar();
  }

  //MUESTRA UNA FECHA DEL BACKEND (EJ. "2026-10-23T14:30:00.000-05:00" O "2026-10-23 14:30:00.0") COMO "2026-10-23 14:30", SIN
  //CONVERTIRLA DE ZONA HORARIA (EL BACKEND YA LA ENTREGA EN HORA DE BOGOTÁ POR spring.jackson.time-zone):
  formatearFecha(fecha: unknown): string {
    if (!fecha) return '-';
    return String(fecha).replace('T', ' ').slice(0, 16);
  }

  //ABRE EL MODAL DE CREAR / MODIFICAR / ELIMINAR, MOSTRANDO PRIMERO EL SPINNER GLOBAL DEL PIÑÓN GIRATORIO
  //(SpinnerModalComponent, MONTADO EN LA RAÍZ DE LA APLICACIÓN):
  abrirModalAddUpdDel(modo: 'guardar' | 'modificar' | 'eliminar', apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI | null = null): void {
    this.spinnerService.showBeforeOpening(() => {
      this.modalModo = modo;
      this.apoyoObrRedMitigGestRiesgDesastSeleccionado = apoyoObrRedMitigGestRiesgDesast;
      this.modalAddUpdDelVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  abrirModalVista(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoObrRedMitigGestRiesgDesastSeleccionado = apoyoObrRedMitigGestRiesgDesast;
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalAddUpdDel(): void {
    this.modalAddUpdDelVisible = false;
    this.apoyoObrRedMitigGestRiesgDesastSeleccionado = null;
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
    this.apoyoObrRedMitigGestRiesgDesastSeleccionado = null;
  }

  //ABRE EL MODAL CON EL HISTORIAL DE EQUIPOS DE TRANSPORTES ASOCIADO AL APOYO SELECCIONADO — MISMO PATRÓN QUE EL HISTORIAL DE
  //INTEGRANTES DE ListadoSolicitudesConstruccionesNuevasComponent:
  abrirModalEquiposTransportes(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoObrRedMitigGestRiesgDesastParaEquiposTransportes = apoyoObrRedMitigGestRiesgDesast;
      this.modalEquiposTransportesVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalEquiposTransportes(): void {
    this.modalEquiposTransportesVisible = false;
    this.apoyoObrRedMitigGestRiesgDesastParaEquiposTransportes = null;
    //SE VUELVE A CONTAR POR SI SE AGREGÓ O ELIMINÓ ALGÚN EQUIPO MIENTRAS EL MODAL ESTUVO ABIERTO:
    this.cargarCantidadEquiposTransportes();
  }

  //ABRE EL MODAL CON EL HISTORIAL DE MAQUINARIAS PESADAS ASOCIADO AL APOYO SELECCIONADO — MISMO PATRÓN QUE EL HISTORIAL DE EQUIPOS
  //DE TRANSPORTES:
  abrirModalMaquinariasPesadas(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoObrRedMitigGestRiesgDesastParaMaquinariasPesadas = apoyoObrRedMitigGestRiesgDesast;
      this.modalMaquinariasPesadasVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalMaquinariasPesadas(): void {
    this.modalMaquinariasPesadasVisible = false;
    this.apoyoObrRedMitigGestRiesgDesastParaMaquinariasPesadas = null;
    //SE VUELVE A CONTAR POR SI SE AGREGÓ O ELIMINÓ ALGUNA MAQUINARIA PESADA MIENTRAS EL MODAL ESTUVO ABIERTO:
    this.cargarCantidadMaquinariasPesadas();
  }

  //ABRE EL MODAL CON EL HISTORIAL DE CONTROLES DE AVANCES DE LA OBRA ASOCIADO AL APOYO SELECCIONADO — MISMO PATRÓN QUE EL
  //HISTORIAL DE EQUIPOS DE TRANSPORTES:
  abrirModalControlesAvances(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoObrRedMitigGestRiesgDesastParaControlesAvances = apoyoObrRedMitigGestRiesgDesast;
      this.modalControlesAvancesVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalControlesAvances(): void {
    this.modalControlesAvancesVisible = false;
    this.apoyoObrRedMitigGestRiesgDesastParaControlesAvances = null;
    //SE VUELVE A CONTAR POR SI SE AGREGÓ O ELIMINÓ ALGÚN CONTROL DE AVANCE MIENTRAS EL MODAL ESTUVO ABIERTO:
    this.cargarCantidadControlesAvances();
  }

  //ABRE EL MODAL CON LAS DOS FOTOGRAFÍAS ANEXAS (ANTES Y DESPUÉS DE LA OBRA) DEL APOYO SELECCIONADO:
  abrirModalFotografiasAnexas(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoObrRedMitigGestRiesgDesastParaFotografiasAnexas = apoyoObrRedMitigGestRiesgDesast;
      this.modalFotografiasAnexasVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalFotografiasAnexas(): void {
    this.modalFotografiasAnexasVisible = false;
    this.apoyoObrRedMitigGestRiesgDesastParaFotografiasAnexas = null;
    //SE VUELVE A CONTAR POR SI SE AGREGÓ O QUITÓ ALGUNA FOTOGRAFÍA MIENTRAS EL MODAL ESTUVO ABIERTO:
    this.cargarCantidadFotografiasAnexas();
  }

  //ABRE EL MODAL CON LOS INTEGRANTES (JEFE DE SECCIÓN TÉCNICA, JEFE DE OPERACIONES Y COMANDANTE) DEL APOYO SELECCIONADO:
  abrirModalIntegrantes(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoObrRedMitigGestRiesgDesastParaIntegrantes = apoyoObrRedMitigGestRiesgDesast;
      this.modalIntegrantesVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalIntegrantes(): void {
    this.modalIntegrantesVisible = false;
    this.apoyoObrRedMitigGestRiesgDesastParaIntegrantes = null;
    //SE VUELVE A CONTAR POR SI SE AGREGARON, MODIFICARON O ELIMINARON LOS INTEGRANTES MIENTRAS EL MODAL ESTUVO ABIERTO:
    this.cargarCantidadIntegrantes();
  }

  //ABRE EL MODAL CON EL HISTORIAL DE TIPOS DE PERSONAL DE APOYOS ASOCIADO AL APOYO SELECCIONADO — MISMO PATRÓN QUE EL HISTORIAL DE
  //EQUIPOS DE TRANSPORTES:
  abrirModalTiposPersonal(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): void {
    this.spinnerService.showBeforeOpening(() => {
      this.apoyoObrRedMitigGestRiesgDesastParaTiposPersonal = apoyoObrRedMitigGestRiesgDesast;
      this.modalTiposPersonalVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalTiposPersonal(): void {
    this.modalTiposPersonalVisible = false;
    this.apoyoObrRedMitigGestRiesgDesastParaTiposPersonal = null;
    //SE VUELVE A CONTAR POR SI SE AGREGÓ O ELIMINÓ ALGÚN TIPO DE PERSONAL MIENTRAS EL MODAL ESTUVO ABIERTO:
    this.cargarCantidadTiposPersonal();
  }

  //RESPUESTA DEL BACKEND AL CREAR, MODIFICAR O ELIMINAR: RESPONDE HTTP 200 AUNQUE NO GUARDE (EJ. CÓDIGO RADICADO REPETIDO), ASÍ QUE
  //SE USA banderaexito PARA SABER SI CERRAR EL MODAL Y REFRESCAR EL LISTADO O DEJARLO ABIERTO MOSTRANDO EL MENSAJE DE ERROR:
  private procesarRespuesta(respuesta: ApoyosObrRedMitigGestRiesgDesastMsj, mensajeExito: string): void {
    if (respuesta.banderaexito === false) {
      this.mostrarToast('error', respuesta.mensaje || 'No se pudo completar la operación.');
      return;
    }
    this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
    this.accionListar();
    this.cerrarModalAddUpdDel();
  }

  //RECIBE EL APOYO NUEVO O MODIFICADO DESDE EL MODAL Y LO ENVÍA AL BACKEND (POST SI ES NUEVO, PUT SI YA TIENE ID):
  guardarApoyoObrRedMitigGestRiesgDesast(apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI): void {
    if (apoyoObrRedMitigGestRiesgDesast.idApoyoObrRedMitigGestRiesgDesast) {
      this.apoyosObrRedMitigGestRiesgDesastService.updateSupportWorkReductionMitigationRiskManagementDisaster(apoyoObrRedMitigGestRiesgDesast).subscribe({
        next: (respuesta) => this.procesarRespuesta(respuesta, 'Informe de apoyo modificado correctamente.'),
        error: (err) => {
          console.error('ERROR AL MODIFICAR APOYO DE OBRAS, REDUCCIÓN Y MITIGACIÓN DE RIESGOS Y DESASTRES: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al modificar el informe de apoyo.');
        }
      });
    } else {
      this.apoyosObrRedMitigGestRiesgDesastService.addSupportWorkReductionMitigationRiskManagementDisaster(apoyoObrRedMitigGestRiesgDesast).subscribe({
        next: (respuesta) => this.procesarRespuesta(respuesta, 'Informe de apoyo creado correctamente.'),
        error: (err) => {
          console.error('ERROR AL CREAR APOYO DE OBRAS, REDUCCIÓN Y MITIGACIÓN DE RIESGOS Y DESASTRES: ', err);
          this.mostrarToast('error', err.error?.mensaje || 'Error al crear el informe de apoyo.');
        }
      });
    }
  }

  //RECIBE EL ID DEL APOYO A ELIMINAR Y LO ENVÍA AL BACKEND:
  eliminarApoyoObrRedMitigGestRiesgDesast(idApoyoObrRedMitigGestRiesgDesast: number): void {
    this.apoyosObrRedMitigGestRiesgDesastService.deleteSupportWorkReductionMitigationRiskManagementDisaster(idApoyoObrRedMitigGestRiesgDesast).subscribe({
      next: (respuesta) => this.procesarRespuesta(respuesta, 'Informe de apoyo eliminado correctamente.'),
      error: (err) => {
        console.error('ERROR AL ELIMINAR APOYO DE OBRAS, REDUCCIÓN Y MITIGACIÓN DE RIESGOS Y DESASTRES: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el informe de apoyo.');
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
