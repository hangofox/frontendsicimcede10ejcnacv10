import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GRUPOS_NIVEL_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST, IntegrantesDocumentosSolicInfraestI, NIVELES_JERARQUIA_UNIDAD_MILITAR, RolIntegranteDocumentosSolicInfraestI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/integrantes-documentos-solic-infraest/integrantes-documentos-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { CargosIntegrantesDocumentosI } from '../../../../../interfaces/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.interface';
import { HistorialIntegrantesDocumentosI } from '../../../../../interfaces/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.interface';

import { IntegrantesDocumentosSolicInfraestService } from '../../../../../services/digei/solicitudes-infraestructuras/integrantes-documentos-solic-infraest/integrantes-documentos-solic-infraest.service';
import { CargosIntegrantesDocumentosService } from '../../../../../services/panel-control/cargos-integrantes-documentos/cargos-integrantes-documentos.service';
import { HistorialIntegrantesDocumentosService } from '../../../../../services/panel-control/historial-integrantes-documentos/historial-integrantes-documentos.service';
import { SpinnerService } from '../../../../../services/spinner/spinner.service';

import { AddUpdDelIntegranteDocumentosSolicInfraestComponent } from '../add-upd-del-integrante-documentos-solic-infraest/add-upd-del-integrante-documentos-solic-infraest.component';
import { VistaIntegranteDocumentosSolicInfraestComponent } from '../vista-integrante-documentos-solic-infraest/vista-integrante-documentos-solic-infraest.component';

type EstadoFilaAsistenteIntegrante = 'pendiente' | 'activa' | 'adjuntada';

interface FilaAsistenteIntegranteI {
  rol: RolIntegranteDocumentosSolicInfraestI;
  estado: EstadoFilaAsistenteIntegrante;
  cargoSeleccionadoId: number | null;
  historialesDelCargo: HistorialIntegrantesDocumentosI[];
  idHistorialSeleccionado: number | null;
  grado: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  cargo: string;
  nombreArchivoFotoFirma: string;
}

interface GrupoAsistenteIntegranteI {
  nivel: string;
  etiqueta: string;
  aplica: boolean;
  filas: FilaAsistenteIntegranteI[];
}

@Component({
  selector: 'app-listado-integrantes-documentos-solic-infraest',
  standalone: true,
  imports: [CommonModule, FormsModule, AddUpdDelIntegranteDocumentosSolicInfraestComponent, VistaIntegranteDocumentosSolicInfraestComponent],
  templateUrl: './listado-integrantes-documentos-solic-infraest.component.html',
  styleUrl: './listado-integrantes-documentos-solic-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoIntegrantesDocumentosSolicInfraestComponent implements OnInit, OnChanges {

  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;

  //CATÁLOGOS PARA EL ASISTENTE: EL CARGO A ELEGIR EN CADA FILA Y EL HISTORIAL DE INTEGRANTES DE DOCUMENTOS DE DONDE SE
  //TOMAN LOS DATOS DE CADA PERSONA (SOLO LOS QUE ESTÁN MARCADOS COMO "SI" EN "PREDETERMINADO ACTUAL"):
  cargosIntegrantesDocumentos: CargosIntegrantesDocumentosI[] = [];
  historialesIntegrantesDocumentosPredeterminados: HistorialIntegrantesDocumentosI[] = [];

  integranteDocumentosSolicInfraest: IntegrantesDocumentosSolicInfraestI | null = null;

  //EL ASISTENTE SE ORGANIZA EN LOS 5 NIVELES CON ESPACIOS DE FIRMA (BATALLON, BRIGADA, DIVISION, JEFATURA, COMANDO). LOS
  //NIVELES POR DEBAJO DEL NIVEL DE LA UNIDAD MILITAR DE LA SOLICITUD QUEDAN MARCADOS COMO "NO APLICA" Y NO
  //PARTICIPAN DEL FLUJO SECUENCIAL DE ADJUNTAMIENTO:
  grupos: GrupoAsistenteIntegranteI[] = [];
  cargando = false;
  guardando = false;

  //ESTADO DE MODALES (SOLO SE USAN PARA VER EL DETALLE GUARDADO Y CONFIRMAR LA ELIMINACIÓN DEL REGISTRO COMPLETO):
  modalVistaVisible = false;
  modalEliminarVisible = false;

  //TOAST LOCAL:
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private integrantesDocumentosSolicInfraestService: IntegrantesDocumentosSolicInfraestService,
    private cargosIntegrantesDocumentosService: CargosIntegrantesDocumentosService,
    private historialIntegrantesDocumentosService: HistorialIntegrantesDocumentosService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.cargarCargosIntegrantesDocumentos();
    this.cargarHistorialesIntegrantesDocumentosPredeterminados();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitudInfraestructura']) {
      this.cargarIntegrantes();
    }
  }

  //CARGA EL CATÁLOGO DE CARGOS DE INTEGRANTES DE DOCUMENTOS (COMBO "CARGO" DE CADA FILA DEL ASISTENTE):
  private cargarCargosIntegrantesDocumentos(): void {
    this.cargosIntegrantesDocumentosService.findAllCargosIntegrantesDocumentos(undefined, undefined, 'nombreCargoIntegranteDocumentos', 'ASC')
      .subscribe({
        next: (cargos) => {
          this.cargosIntegrantesDocumentos = cargos;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR CARGOS DE INTEGRANTES DE DOCUMENTOS: ', err)
      });
  }

  //CARGA EL HISTORIAL DE INTEGRANTES DE DOCUMENTOS Y SE QUEDA SOLO CON LOS QUE ESTÁN MARCADOS COMO "SI" EN
  //siONoActualIntegranteDocumentosPredeterminado (ÚNICOS DE DONDE SE PUEDEN ADJUNTAR DATOS AL COMITÉ):
  private cargarHistorialesIntegrantesDocumentosPredeterminados(): void {
    this.historialIntegrantesDocumentosService.findAllHistorialesIntegrantesDocumentos(undefined, undefined, undefined, 'nombresYApellidosIntegranteDocumentos', 'ASC')
      .subscribe({
        next: (historiales) => {
          this.historialesIntegrantesDocumentosPredeterminados = historiales.filter(h => h.siONoActualIntegranteDocumentosPredeterminado === 'SI');
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => console.error('ERROR AL CARGAR EL HISTORIAL DE INTEGRANTES DE DOCUMENTOS: ', err)
      });
  }

  //CARGA EL ÚNICO REGISTRO DE INTEGRANTES ASOCIADO A LA SOLICITUD DE INFRAESTRUCTURA (SI YA EXISTE):
  private cargarIntegrantes(): void {
    const idSolicitudInfraestructura = this.solicitudInfraestructura?.idSolicitudInfraestructura;
    if (!idSolicitudInfraestructura) {
      this.integranteDocumentosSolicInfraest = null;
      this.construirGrupos();
      return;
    }
    this.cargando = true;
    this.integrantesDocumentosSolicInfraestService.findAllIntegrantesDocumentosSolicInfraest(undefined, idSolicitudInfraestructura)
      .subscribe({
        next: (data) => {
          this.integranteDocumentosSolicInfraest = data[0] ?? null;
          this.construirGrupos();
          this.cargando = false;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => {
          console.error('ERROR AL CARGAR INTEGRANTES DE LA SOLICITUD DE INFRAESTRUCTURA: ', err);
          this.cargando = false;
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  //DEVUELVE EL ÍNDICE JERÁRQUICO DEL NIVEL DE LA UNIDAD MILITAR DE LA SOLICITUD (-1 SI NO TIENE UN NIVEL VÁLIDO):
  private obtenerIndiceNivelUnidadMilitar(): number {
    const nivel = String(this.solicitudInfraestructura?.unidadMilitarDTO?.nivelUnidadMilitar || '').toUpperCase().trim();
    return NIVELES_JERARQUIA_UNIDAD_MILITAR.indexOf(nivel);
  }

  //CONSTRUYE LOS 4 GRUPOS DE NIVEL (BATALLON, BRIGADA, DIVISION, JEFATURA). UN GRUPO "APLICA" SOLO SI SU NIVEL ES
  //IGUAL O SUPERIOR AL NIVEL DE LA UNIDAD MILITAR DE LA SOLICITUD (MISMA REGLA DE ListadoSolicitudesInfraestructurasComponent.aplicaChuleoNivel());
  //LOS GRUPOS QUE NO APLICAN QUEDAN SIN FILAS Y NO PARTICIPAN DEL FLUJO SECUENCIAL DE ADJUNTAMIENTO. LA PRIMERA
  //FILA SIN DATOS DE LOS GRUPOS QUE SÍ APLICAN QUEDA "ACTIVA" (DISPONIBLE PARA ADJUNTAR), EL RESTO "PENDIENTE":
  private construirGrupos(): void {
    const integrante = this.integranteDocumentosSolicInfraest as any;
    const indiceUnidadMilitar = this.obtenerIndiceNivelUnidadMilitar();

    this.grupos = GRUPOS_NIVEL_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST.map(grupo => {
      const indiceGrupo = NIVELES_JERARQUIA_UNIDAD_MILITAR.indexOf(grupo.nivel);
      const aplica = indiceUnidadMilitar !== -1 && indiceGrupo !== -1 && indiceGrupo >= indiceUnidadMilitar;

      const filas: FilaAsistenteIntegranteI[] = !aplica ? [] : grupo.roles.map(rol => {
        const grado = integrante?.[`grado${rol.clave}`] || '';
        const nombres = integrante?.[`nombres${rol.clave}`] || '';
        const primerApellido = integrante?.[`primerApellido${rol.clave}`] || '';
        const segundoApellido = integrante?.[`segundoApellido${rol.clave}`] || '';
        const cargo = integrante?.[`cargo${rol.clave}`] || '';
        const nombreArchivoFotoFirma = integrante?.[`nombreArchivoFotoFirma${rol.clave}`] || '';
        const tieneDatos = !!(grado || nombres || primerApellido || segundoApellido || cargo);
        return {
          rol,
          estado: (tieneDatos ? 'adjuntada' : 'pendiente') as EstadoFilaAsistenteIntegrante,
          cargoSeleccionadoId: null,
          historialesDelCargo: [],
          idHistorialSeleccionado: null,
          grado, nombres, primerApellido, segundoApellido, cargo, nombreArchivoFotoFirma
        };
      });

      return { nivel: grupo.nivel, etiqueta: grupo.etiqueta, aplica, filas };
    });

    //ACTIVA LA PRIMERA FILA PENDIENTE ENTRE TODOS LOS GRUPOS QUE APLICAN, RECORRIÉNDOLOS EN ORDEN:
    for (const fila of this.todasLasFilasAplicables()) {
      if (fila.estado === 'pendiente') {
        fila.estado = 'activa';
        break;
      }
    }
  }

  //DEVUELVE TODAS LAS FILAS DE LOS GRUPOS QUE APLICAN, EN ORDEN (BATALLON → BRIGADA → DIVISION → JEFATURA → COMANDO), PARA
  //RECORRER EL FLUJO SECUENCIAL DE ADJUNTAMIENTO SIN IMPORTAR A QUÉ GRUPO PERTENECE CADA FILA:
  private todasLasFilasAplicables(): FilaAsistenteIntegranteI[] {
    return this.grupos.filter(g => g.aplica).flatMap(g => g.filas);
  }

  //FILTRA EL HISTORIAL DE INTEGRANTES PREDETERMINADOS SEGÚN EL CARGO SELECCIONADO EN LA FILA ACTIVA Y, ADEMÁS, POR
  //LA UNIDAD MILITAR DE LA SOLICITUD DE INFRAESTRUCTURA (SIN IMPORTAR EL NIVEL AL QUE PERTENEZCA LA FILA —
  //DISPENSARIO, BATALLON, BRIGADA, DIVISION O JEFATURA — SOLO SE OFRECEN INTEGRANTES DE ESA MISMA UNIDAD MILITAR):
  onCambioCargoFila(fila: FilaAsistenteIntegranteI): void {
    fila.idHistorialSeleccionado = null;
    const idUnidadMilitarSolicitud = this.solicitudInfraestructura?.unidadMilitarDTO?.idUnidadMilitar;
    fila.historialesDelCargo = fila.cargoSeleccionadoId
      ? this.historialesIntegrantesDocumentosPredeterminados.filter(h =>
          h.cargoIntegranteDocumentosDTO?.idCargoIntegranteDocumentos === fila.cargoSeleccionadoId &&
          h.unidadMilitarDTO?.idUnidadMilitar === idUnidadMilitarSolicitud
        )
      : [];
  }

  //ADJUNTA A LA PERSONA SELECCIONADA DEL HISTORIAL EN LA FILA ACTIVA, LA BLOQUEA Y HABILITA LA SIGUIENTE FILA PENDIENTE
  //(QUE PUEDE ESTAR EN EL MISMO GRUPO O EN EL SIGUIENTE GRUPO QUE APLIQUE):
  adjuntarIntegrante(fila: FilaAsistenteIntegranteI): void {
    const historial = this.historialesIntegrantesDocumentosPredeterminados.find(h => h.idHistorialIntegranteDocumentos === fila.idHistorialSeleccionado);
    if (!historial) return;

    //EL HISTORIAL GUARDA "NOMBRES Y APELLIDOS" EN UN SOLO CAMPO DE TEXTO, MIENTRAS EL COMITÉ SEPARA NOMBRES,
    //PRIMER APELLIDO Y SEGUNDO APELLIDO EN COLUMNAS DISTINTAS; PARA NO INVENTAR UNA DIVISIÓN INCORRECTA, EL
    //NOMBRE COMPLETO SE DEJA EN "NOMBRES" Y LOS APELLIDOS QUEDAN VACÍOS:
    fila.grado = String(historial.gradoIntegranteDocumentos || '');
    fila.nombres = String(historial.nombresYApellidosIntegranteDocumentos || '');
    fila.primerApellido = '';
    fila.segundoApellido = '';
    fila.cargo = String(historial.cargoIntegranteDocumentos || '');
    fila.nombreArchivoFotoFirma = String(historial.nombreArchivoFotoFirmaIntegranteDocumentos || '');
    fila.estado = 'adjuntada';

    const filasAplicables = this.todasLasFilasAplicables();
    const indiceActual = filasAplicables.indexOf(fila);
    const siguiente = filasAplicables[indiceActual + 1];
    if (siguiente && siguiente.estado === 'pendiente') {
      siguiente.estado = 'activa';
    }
    this.changeDetectorRef.markForCheck();
  }

  //DESBLOQUEA UNA FILA YA ADJUNTADA PARA VOLVER A ELEGIR SU INTEGRANTE; AL SER UN PROCESO SECUENCIAL, LAS FILAS
  //POSTERIORES A ESTA (INCLUSO EN OTRO GRUPO) TAMBIÉN SE REINICIAN A "PENDIENTE" (SOLO ESTA QUEDA "ACTIVA"):
  quitarIntegrante(fila: FilaAsistenteIntegranteI): void {
    const filasAplicables = this.todasLasFilasAplicables();
    const indice = filasAplicables.indexOf(fila);
    filasAplicables.forEach((f, i) => {
      if (i < indice) return;
      f.estado = i === indice ? 'activa' : 'pendiente';
      f.cargoSeleccionadoId = null;
      f.historialesDelCargo = [];
      f.idHistorialSeleccionado = null;
      f.grado = '';
      f.nombres = '';
      f.primerApellido = '';
      f.segundoApellido = '';
      f.cargo = '';
      f.nombreArchivoFotoFirma = '';
    });
    this.changeDetectorRef.markForCheck();
  }

  get totalAplicables(): number {
    return this.todasLasFilasAplicables().length;
  }

  get totalAdjuntados(): number {
    return this.todasLasFilasAplicables().filter(f => f.estado === 'adjuntada').length;
  }

  get algunNivelAplica(): boolean {
    return this.grupos.some(g => g.aplica);
  }

  //GUARDA (CREA O MODIFICA) EL ÚNICO REGISTRO DE INTEGRANTES DE LA SOLICITUD. SE PARTE DEL REGISTRO YA GUARDADO
  //(SI EXISTE) PARA NO PERDER LOS DATOS DE NIVELES/ROLES QUE ESTE ASISTENTE NO GESTIONA (COMANDO, CEDE, Y LOS
  //NIVELES QUE NO APLICAN PARA ESTA SOLICITUD), Y SOLO SE SOBRESCRIBEN LOS CAMPOS DE LOS GRUPOS QUE SÍ APLICAN:
  guardarIntegrantesRegistrados(): void {
    if (!this.solicitudInfraestructura || this.guardando) return;
    this.guardando = true;
    this.changeDetectorRef.markForCheck();

    const registro: { [campo: string]: any } = {
      ...(this.integranteDocumentosSolicInfraest as any || {}),
      idIntegrantesSolicitudesInfraestructura: this.integranteDocumentosSolicInfraest?.idIntegrantesSolicitudesInfraestructura ?? undefined,
      solicitudInfraestructuraDTO: this.solicitudInfraestructura
    };
    this.todasLasFilasAplicables().forEach(fila => {
      registro[`grado${fila.rol.clave}`] = fila.grado;
      registro[`nombres${fila.rol.clave}`] = fila.nombres;
      registro[`primerApellido${fila.rol.clave}`] = fila.primerApellido;
      registro[`segundoApellido${fila.rol.clave}`] = fila.segundoApellido;
      registro[`cargo${fila.rol.clave}`] = fila.cargo;
      registro[`nombreArchivoFotoFirma${fila.rol.clave}`] = fila.nombreArchivoFotoFirma;
    });
    const integranteDocumentosSolicInfraest = registro as IntegrantesDocumentosSolicInfraestI;

    const alTerminar = (respuesta: { mensaje: string }) => {
      this.guardando = false;
      this.mostrarToast('exito', respuesta.mensaje || 'Integrantes guardados correctamente.');
      this.cargarIntegrantes();
    };
    const alFallar = (err: any) => {
      this.guardando = false;
      console.error('ERROR AL GUARDAR INTEGRANTES DE LA SOLICITUD DE INFRAESTRUCTURA: ', err);
      this.mostrarToast('error', err.error?.mensaje || 'Error al guardar los integrantes.');
      this.changeDetectorRef.markForCheck();
    };

    if (integranteDocumentosSolicInfraest.idIntegrantesSolicitudesInfraestructura) {
      this.integrantesDocumentosSolicInfraestService.updateIntegrantesDocumentosSolicInfraest(integranteDocumentosSolicInfraest).subscribe({ next: alTerminar, error: alFallar });
    } else {
      this.integrantesDocumentosSolicInfraestService.addIntegrantesDocumentosSolicInfraest(integranteDocumentosSolicInfraest).subscribe({ next: alTerminar, error: alFallar });
    }
  }

  abrirModalVista(): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalVistaVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalVista(): void {
    this.modalVistaVisible = false;
  }

  abrirModalEliminar(): void {
    this.spinnerService.mostrarAntesDeAbrir(() => {
      this.modalEliminarVisible = true;
      this.changeDetectorRef.markForCheck();
    });
  }

  cerrarModalEliminar(): void {
    this.modalEliminarVisible = false;
  }

  //RECIBE EL ID DEL REGISTRO DE INTEGRANTES A ELIMINAR (DESDE EL MODAL DE CONFIRMACIÓN) Y LO ENVÍA AL BACKEND:
  eliminarIntegrantes(idIntegrantesSolicitudesInfraestructura: number): void {
    this.integrantesDocumentosSolicInfraestService.deleteIntegrantesDocumentosSolicInfraest(idIntegrantesSolicitudesInfraestructura).subscribe({
      next: (respuesta) => {
        this.mostrarToast('exito', respuesta.mensaje || 'Integrantes eliminados correctamente.');
        this.cargarIntegrantes();
        this.cerrarModalEliminar();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR INTEGRANTES DE LA SOLICITUD DE INFRAESTRUCTURA: ', err);
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar los integrantes.');
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
