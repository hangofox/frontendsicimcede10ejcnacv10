import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistorialIntegrantesSolicInfraestI, HistorialIntegrantesSolicInfraestMsj } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';
import { HistorialIntegrantesSolicInfraestService } from '../../../../../../services/digei/solicitudes-infraestructuras/historial-integrantes-solic-infraest/historial-integrantes-solic-infraest.service';
import { LineasMandosUnidadesMilitaresService } from '../../../../../../services/panel-control/lineas-mandos-unidades-militares/lineas-mandos-unidades-militares.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import { AddUpdDelHistorialIntegranteSolicObrSbComponent, GrupoFinalAlternativoLineaMando, OpcionPasoLineaMando } from '../add-upd-del-hist-integ-solic-obr-san-bas/add-upd-del-hist-integ-solic-obr-san-bas.component';
import { VistaHistorialIntegranteSolicObrSbComponent } from '../vista-hist-integ-solic-obr-san-bas/vista-hist-integ-solic-obr-san-bas.component';
import { EstructuraLineaMando, analizarLineaMando, obtenerIndicesFinalesVigentes, obtenerPasosUnicosLineaMando } from '../../../../../../shared/lineas-mando/linea-mando.util';

@Component({
  selector: 'app-listado-hist-integ-solic-obr-san-bas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SemaforoContadoresComponent, AddUpdDelHistorialIntegranteSolicObrSbComponent, VistaHistorialIntegranteSolicObrSbComponent],
  templateUrl: './listado-hist-integ-solic-obr-san-bas.component.html',
  styleUrl: './listado-hist-integ-solic-obr-san-bas.component.scss'
})
export class ListadoHistorialIntegrantesSolicObrSbComponent implements OnChanges {
  //SOLICITUD DE INFRAESTRUCTURA DESDE LA QUE SE ABRE EL HISTORIAL (MODAL DEL LISTADO DE SOLICITUDES); SOLO SE LISTAN
  //Y SE CREAN INTEGRANTES DE ESTA SOLICITUD:
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({ keyword: [''], cboxSiglaoAcronimoUnidadMilitarSeleccionado: [''], cantidad: ['10'] });
  //PASOS (SIGLAS O ACRÓNIMOS DE UNIDADES MILITARES) DE LA LÍNEA DE MANDO DE LA SOLICITUD, EJ. [CAOCC, JEMOP, SECEJ, COEJC]. SE USAN EN
  //EL COMBO DE FILTRO POR UNIDAD MILITAR DEL INTEGRANTE Y SE PASAN AL FORMULARIO (AddUpdDelHistorialIntegranteSolicObrSbComponent).
  //SI LA UNIDAD MILITAR DE LA SOLICITUD NO TIENE LÍNEA DE MANDO REGISTRADA, SOLO CONTIENE LA PROPIA UNIDAD MILITAR DE LA SOLICITUD:
  pasosLineaMando: string[] = [];
  //TRAMO COMÚN Y FINALES ALTERNATIVOS DE LA LÍNEA DE MANDO DE LA SOLICITUD; EL FORMULARIO LOS USA PARA AGRUPAR EN SU COMBO
  //LAS UNIDADES MILITARES DE CADA FINAL ALTERNATIVO (CAMINO). ES null SI LA UNIDAD MILITAR NO TIENE LÍNEA DE MANDO REGISTRADA:
  estructuraLineaMando: EstructuraLineaMando | null = null;
  registros: HistorialIntegrantesSolicInfraestI[] = [];
  //CARGOS YA REGISTRADOS POR UNIDAD MILITAR EN TODA LA SOLICITUD (NO SOLO EN LA PÁGINA ACTUAL), COMO CLAVES "SIGLA O ACRÓNIMO|CARGO",
  //PARA AVISAR EN EL FORMULARIO SI SE REPITE UN CARGO DE LA MISMA UNIDAD MILITAR:
  cargosRegistrados: string[] = [];
  //TODOS LOS REGISTROS DEL HISTORIAL DE LA SOLICITUD (SIN FILTROS NI PAGINACIÓN), QUE SE PASAN AL FORMULARIO PARA OCULTAR LAS
  //UNIDADES MILITARES DE LA LÍNEA DE MANDO QUE YA TIENEN REGISTRADOS TODOS SUS INTEGRANTES PREDETERMINADOS:
  registrosSolicitud: HistorialIntegrantesSolicInfraestI[] = [];

  //PALETA DE COLORES PARA DIFERENCIAR EN LA TABLA LOS INTEGRANTES DE CADA UNIDAD MILITAR (EL COLOR DE CADA UNIDAD MILITAR SE ASIGNA
  //SEGÚN SU POSICIÓN EN LA LÍNEA DE MANDO DE LA SOLICITUD, ASÍ ES EL MISMO EN TODAS LAS PÁGINAS):
  private static readonly TOTAL_COLORES_UNIDAD = 8;

  //DEVUELVE LA CLASE DE COLOR ("unidad-color-N") DE LA UNIDAD MILITAR DEL INTEGRANTE. SI LA UNIDAD MILITAR NO ESTÁ EN LA LÍNEA DE
  //MANDO, SE CALCULA UN COLOR FIJO A PARTIR DE SU SIGLA O ACRÓNIMO:
  claseColorUnidad(siglaoAcronimo: unknown): string {
    const siglaoAcronimoUnidad = String(siglaoAcronimo ?? '').trim().toUpperCase();
    if (!siglaoAcronimoUnidad) return '';
    const posicion = this.pasosLineaMando.indexOf(siglaoAcronimoUnidad);
    const indice = posicion >= 0
      ? posicion
      : [...siglaoAcronimoUnidad].reduce((suma, letra) => suma + letra.charCodeAt(0), 0);
    return `unidad-color-${indice % ListadoHistorialIntegrantesSolicObrSbComponent.TOTAL_COLORES_UNIDAD}`;
  }

  //SIGLAS O ACRÓNIMOS (EN MAYÚSCULA) DE LAS UNIDADES MILITARES QUE YA TIENEN INTEGRANTES REGISTRADOS EN EL HISTORIAL DE LA SOLICITUD:
  private get siglasoAcronimosConIntegrantes(): Set<string> {
    return new Set(this.registrosSolicitud.map(registro => String(registro.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar ?? '').trim().toUpperCase()));
  }

  //UNIDADES MILITARES DEL TRAMO COMÚN EN EL COMBO DE FILTRO (SI LA LÍNEA NO TIENE FINALES ALTERNATIVOS, SON TODAS SUS UNIDADES MILITARES):
  get opcionesTramoComunFiltro(): OpcionPasoLineaMando[] {
    const tramoComun = this.estructuraLineaMando?.finalesAlternativos.length ? this.estructuraLineaMando.tramoComun : this.pasosLineaMando;
    return tramoComun.map((siglaoAcronimo, indice) => ({ valor: siglaoAcronimo, siglaoAcronimo, numero: indice + 1, numeroFinal: null }));
  }

  //UN GRUPO POR CADA FINAL ALTERNATIVO VIGENTE EN EL COMBO DE FILTRO: MIENTRAS LA SOLICITUD NO TENGA INTEGRANTES EN NINGÚN
  //FINAL SE MUESTRAN TODOS; CUANDO YA LOS TIENE, SOLO EL CAMINO TOMADO (IGUAL QUE EN EL FORMULARIO Y EN LA LÍNEA DE MANDO DEL
  //LISTADO DE SOLICITUDES). EL VALOR LLEVA EL NÚMERO DEL FINAL ("F2|CEDE10") PORQUE UNA UNIDAD MILITAR PUEDE ESTAR EN VARIOS FINALES:
  get gruposFinalesFiltro(): GrupoFinalAlternativoLineaMando[] {
    const estructura = this.estructuraLineaMando;
    if (!estructura?.finalesAlternativos.length) return [];
    const totalTramoComun = estructura.tramoComun.length;
    return obtenerIndicesFinalesVigentes(estructura, this.siglasoAcronimosConIntegrantes).map(indice => {
      const final = estructura.finalesAlternativos[indice];
      const numeroFinal = indice + 1;
      return {
        numeroFinal,
        etiqueta: `Final alternativo ${numeroFinal}: ${final.join(' → ')}`,
        opciones: final.map((siglaoAcronimo, posicion) => ({ valor: `F${numeroFinal}|${siglaoAcronimo}`, siglaoAcronimo, numero: totalTramoComun + posicion + 1, numeroFinal }))
      };
    });
  }

  //SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR ELEGIDA EN EL COMBO DE FILTRO (SIN EL NÚMERO DEL FINAL ALTERNATIVO), PARA ENVIARLA AL BACKEND:
  private get siglaoAcronimoFiltro(): string | undefined {
    const valor = String(this.form.value.cboxSiglaoAcronimoUnidadMilitarSeleccionado || '');
    return (valor.includes('|') ? valor.slice(valor.indexOf('|') + 1) : valor) || undefined;
  }
  total = 0;
  pagina = 0;
  cantidad = 10;
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: HistorialIntegrantesSolicInfraestI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: HistorialIntegrantesSolicInfraestService,
    private readonly lineasMandosUnidadesMilitaresService: LineasMandosUnidadesMilitaresService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  //AL CAMBIAR LA SOLICITUD SE LIMPIA EL FILTRO DE UNIDAD MILITAR, SE CARGA SU LÍNEA DE MANDO Y SE VUELVE A LISTAR:
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['solicitudInfraestructura']) {
      this.form.patchValue({ cboxSiglaoAcronimoUnidadMilitarSeleccionado: '' });
      this.cargarPasosLineaMando();
      this.buscar();
    }
  }

  //CARGA LA LÍNEA DE MANDO DE LA UNIDAD MILITAR DE LA SOLICITUD (LA QUE EMPIEZA CON SU SIGLA O ACRÓNIMO ANTES DEL PRIMER "->"). SI TERMINA
  //EN FINALES ALTERNATIVOS ENTRE CORCHETES, LOS PASOS SON LOS DEL TRAMO COMÚN SEGUIDOS DE LOS DE CADA FINAL, SIN REPETIR:
  private cargarPasosLineaMando(): void {
    const siglaoAcronimo = String(this.solicitudInfraestructura?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim().toUpperCase();
    this.pasosLineaMando = siglaoAcronimo ? [siglaoAcronimo] : [];
    this.estructuraLineaMando = null;
    if (!siglaoAcronimo) return;
    this.lineasMandosUnidadesMilitaresService.findAllMilitaryUnitChainsOfCommand(undefined, undefined, siglaoAcronimo).subscribe({
      next: lineasMando => {
        const lineaMando = lineasMando.find(linea => String(analizarLineaMando(linea.lineaMandoUnidadMilitar).estructura.tramoComun[0] ?? '').toUpperCase() === siglaoAcronimo);
        const estructura = analizarLineaMando(String(lineaMando?.lineaMandoUnidadMilitar || '').toUpperCase()).estructura;
        const pasos = obtenerPasosUnicosLineaMando(estructura);
        if (pasos.length) {
          this.pasosLineaMando = pasos;
          this.estructuraLineaMando = estructura;
        }
        this.cdr.markForCheck();
      },
      error: err => console.error('ERROR AL CARGAR LA LÍNEA DE MANDO DE LA SOLICITUD DE INFRAESTRUCTURA: ', err)
    });
  }

  //EL HISTORIAL NO TIENE COLUMNA DE ESTADO NI EN LA TABLA DE ORACLE NI EN HistorialIntegranteSolicitudInfraestructuraDTO,
  //ASÍ QUE AQUÍ SOLO SE LISTA LA PÁGINA DE LA SOLICITUD Y SE CUENTA EL TOTAL FILTRADO — MISMO PATRÓN QUE
  //ListadoHistorialProveedoresProductosServiciosComponent:
  listar(): void {
    const idSolicitudInfraestructura = this.solicitudInfraestructura?.idSolicitudInfraestructura;
    if (!idSolicitudInfraestructura) {
      this.registros = [];
      this.registrosSolicitud = [];
      this.cargosRegistrados = [];
      this.total = 0;
      return;
    }
    const keyword = this.form.value.keyword?.trim() || undefined;
    const siglaoAcronimoUnidadMilitar = this.siglaoAcronimoFiltro;
    //LOS REGISTROS SE ORDENAN EN EL BACKEND POR LA POSICIÓN DE LA UNIDAD MILITAR EN LA LÍNEA DE MANDO Y, DENTRO DE CADA UNIDAD MILITAR, POR GRADO DE MENOR A MAYOR:
    this.service.findAllInfrastructureRequestMemberHistoriesPag(this.pagina, this.cantidad, undefined, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar, 'lineaMandoYGrado', 'ASC').subscribe(registros => {
      this.registros = registros;
      this.cdr.markForCheck();
    });
    this.service.findCountTotalRegisters(undefined, idSolicitudInfraestructura, keyword, siglaoAcronimoUnidadMilitar).subscribe(total => {
      this.total = total;
      this.cdr.markForCheck();
    });
    //LOS CARGOS Y LOS REGISTROS DE LA SOLICITUD SE CONSULTAN SIN EL FILTRO DE UNIDAD MILITAR, PORQUE LAS VALIDACIONES DEL
    //FORMULARIO (CARGO REPETIDO E INTEGRANTES PREDETERMINADOS PENDIENTES) SON SOBRE TODA LA SOLICITUD:
    this.service.findAllInfrastructureRequestMemberHistories(undefined, idSolicitudInfraestructura).subscribe(todos => {
      this.registrosSolicitud = todos;
      this.cargosRegistrados = todos
        .filter(registro => !!String(registro.cargoIntegranteSolicitudInfraestructura || '').trim())
        .map(registro => AddUpdDelHistorialIntegranteSolicObrSbComponent.claveCargoUnidadMilitar(registro.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar, registro.cargoIntegranteSolicitudInfraestructura));
      this.quitarFiltroDeFinalDescartado();
      this.cdr.markForCheck();
    });
  }

  //SI LA SOLICITUD TOMÓ OTRO CAMINO Y LA UNIDAD MILITAR DEL FILTRO ERA DE UN FINAL ALTERNATIVO QUE YA NO ESTÁ VIGENTE, SE QUITA EL
  //FILTRO Y SE VUELVE A LISTAR CON TODAS LAS UNIDADES MILITARES:
  private quitarFiltroDeFinalDescartado(): void {
    const valor = String(this.form.value.cboxSiglaoAcronimoUnidadMilitarSeleccionado || '');
    if (!valor.includes('|')) return;
    const sigueVigente = this.gruposFinalesFiltro.some(grupo => grupo.opciones.some(opcion => opcion.valor === valor));
    if (sigueVigente) return;
    this.form.patchValue({ cboxSiglaoAcronimoUnidadMilitarSeleccionado: '' });
    this.buscar();
  }

  buscar(): void { this.pagina = 0; this.listar(); }
  paginas(): number { return Math.max(1, Math.ceil(this.total / this.cantidad)); }
  cambiarCantidad(): void { this.cantidad = Number(this.form.value.cantidad); this.buscar(); }
  cambiarPagina(pagina: number): void { this.pagina = pagina; this.listar(); }
  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: HistorialIntegrantesSolicInfraestI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: HistorialIntegrantesSolicInfraestI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  guardar(registro: HistorialIntegrantesSolicInfraestI): void {
    const modificar = !!registro.idHistorialIntegranteSolicitudInfraestructura;
    (modificar ? this.service.updateInfrastructureRequestMemberHistory(registro) : this.service.addInfrastructureRequestMemberHistory(registro)).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, modificar ? 'Integrante modificado correctamente.' : 'Integrante agregado correctamente.', modificar ? 'Error al modificar el integrante.' : 'Error al agregar el integrante.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar el integrante.' : 'Error al agregar el integrante.'))
    });
  }

  eliminar(id: number): void {
    this.service.deleteInfrastructureRequestMemberHistory(id).subscribe({
      next: respuesta => this.procesarRespuesta(respuesta, 'Integrante eliminado correctamente.', 'Error al eliminar el integrante.'),
      error: err => this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar el integrante.')
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. EL CARGO YA ESTÁ REGISTRADO EN LA
  //SOLICITUD); EN ESE CASO SE MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO PARA CORREGIR EL CARGO:
  private procesarRespuesta(respuesta: HistorialIntegrantesSolicInfraestMsj, mensajeExito: string, mensajeError: string): void {
    if (respuesta.banderaexito === false) {
      this.mostrarToast('error', respuesta.mensaje || mensajeError);
      return;
    }
    this.mostrarToast('exito', respuesta.mensaje || mensajeExito);
    this.cerrar();
    this.listar();
  }

  private mostrarToast(tipo: 'exito' | 'error', mensaje: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTipo = tipo;
    this.toast = mensaje;
    this.cdr.markForCheck();
    this.toastTimer = setTimeout(() => {
      this.toast = '';
      this.cdr.markForCheck();
    }, 4000);
  }
}
