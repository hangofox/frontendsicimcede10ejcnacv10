import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IntegrantesApoyosObrRedMitigGestRiesgDesastI, IntegrantesApoyosObrRedMitigGestRiesgDesastMsj } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/integrantes-apoy-obr-red-mitig/integrantes-apoy-obr-red-mitig.interface';
import { ApoyosObrRedMitigGestRiesgDesastI } from '../../../../../../interfaces/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/apoyos-obr-red-mitig-gest-riesg-desast.interface';
import { IntegrantesApoyosObrRedMitigGestRiesgDesastService } from '../../../../../../services/digei/gestion-riesgo/apoyos-obr-red-mitig-gest-riesg-desast/integrantes-apoy-obr-red-mitig/integrantes-apoy-obr-red-mitig.service';
import { ParametrosSistemaService } from '../../../../../../services/panel-control/parametros-sistema/parametros-sistema.service';
import { UnidadesMilitaresService } from '../../../../../../services/panel-control/unidades-militares/unidades-militares.service';
import { GestionArchivosService } from '../../../../../../services/gestion-archivos/gestion-archivos.service';
import { GradosSiathService } from '../../../../../../services/grados-siath/grados-siath.service';
import { SemaforoContadoresComponent } from '../../../../../../shared/components/semaforo-contadores/semaforo-contadores.component';
import {
  AddUpdDelIntegApoyObrRedMitigComponent,
  cantidadIntegrantesRegistrados,
  ConfiguracionIntegranteApoyo,
  GuardadoIntegrantesApoyoEvent,
  INTEGRANTES_APOYO,
  integranteRegistrado,
  nombreArchivoFirmaIntegrante
} from '../add-upd-del-integ_apoy-obr-red-mitig/add-upd-del-integ_apoy-obr-red-mitig.component';
import { VistaIntegApoyObrRedMitigComponent } from '../vista-integ-apoy-obr-red-mitig/vista-integ-apoy-obr-red-mitig.component';

@Component({
  selector: 'app-listado-integ-apoy-obr-red-mitig',
  standalone: true,
  imports: [CommonModule, SemaforoContadoresComponent, AddUpdDelIntegApoyObrRedMitigComponent, VistaIntegApoyObrRedMitigComponent],
  templateUrl: './listado-integ-apoy-obr-red-mitig.component.html',
  styleUrl: './listado-integ-apoy-obr-red-mitig.component.scss'
})
export class ListadoIntegApoyObrRedMitigComponent implements OnInit, OnChanges, OnDestroy {
  //APOYO DE OBRAS, REDUCCIÓN Y MITIGACIÓN DE RIESGOS Y DESASTRES DESDE EL QUE SE ABREN LOS INTEGRANTES (MODAL DEL LISTADO DE APOYOS). EL
  //BACKEND SOLO PERMITE UN REGISTRO DE INTEGRANTES POR APOYO (JEFE DE SECCIÓN TÉCNICA, JEFE DE OPERACIONES Y COMANDANTE):
  @Input() apoyoObrRedMitigGestRiesgDesast: ApoyosObrRedMitigGestRiesgDesastI | null = null;

  readonly integrantes = INTEGRANTES_APOYO;
  registros: IntegrantesApoyosObrRedMitigGestRiesgDesastI[] = [];
  cargando = false;
  guardando = false;
  //CARPETA DEL SERVIDOR DE ARCHIVOS CON LAS FIRMAS DE LA UNIDAD MILITAR DEL APOYO (null MIENTRAS SE RESUELVE O SI NO SE PUDO):
  carpetaFirmas: string | null = null;
  gradosSiath: string[] = [];
  modal = false;
  vista = false;
  modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  seleccionado: IntegrantesApoyosObrRedMitigGestRiesgDesastI | null = null;
  toast = '';
  toastTipo: 'exito' | 'error' = 'exito';
  private toastTimer: any = null;

  constructor(
    private readonly service: IntegrantesApoyosObrRedMitigGestRiesgDesastService,
    private readonly parametrosSistemaService: ParametrosSistemaService,
    private readonly unidadesMilitaresService: UnidadesMilitaresService,
    private readonly gestionArchivosService: GestionArchivosService,
    private readonly gradosSiathService: GradosSiathService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  //EL APOYO SOLO PUEDE TENER UN REGISTRO DE INTEGRANTES: SI YA LO TIENE, NO SE PUEDE CREAR OTRO:
  get puedeCrear(): boolean { return !this.cargando && this.registros.length === 0; }

  ngOnInit(): void {
    //SIGLAS O ACRÓNIMOS DE LOS GRADOS SIATH SIN REPETIDOS, PARA LAS SUGERENCIAS DEL CAMPO GRADO:
    this.gradosSiathService.findAllSiathGrades(undefined, 'orden', 'ASC').subscribe({
      next: grados => {
        this.gradosSiath = [...new Set(grados.map(grado => String(grado.nombreGradoSiath ?? '').trim()).filter(Boolean))];
        this.cdr.markForCheck();
      },
      error: err => console.error('ERROR AL CARGAR LOS GRADOS SIATH: ', err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apoyoObrRedMitigGestRiesgDesast']) {
      this.carpetaFirmas = null;
      this.cargar();
      if (this.apoyoObrRedMitigGestRiesgDesast) {
        this.obtenerCarpetaFirmas().subscribe({
          next: carpeta => {
            this.carpetaFirmas = carpeta;
            this.cdr.markForCheck();
          },
          error: err => console.error('ERROR AL OBTENER LA CARPETA DE LAS FIRMAS DE LOS INTEGRANTES DEL APOYO: ', err)
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  //CARGA EL REGISTRO DE INTEGRANTES DEL APOYO (EL BACKEND FILTRA POR EL ID DEL APOYO):
  cargar(): void {
    const idApoyoObrRedMitigGestRiesgDesast = this.apoyoObrRedMitigGestRiesgDesast?.idApoyoObrRedMitigGestRiesgDesast;
    this.registros = [];
    if (!idApoyoObrRedMitigGestRiesgDesast) return;
    this.cargando = true;
    this.service.findAllMembersOfSupports(undefined, idApoyoObrRedMitigGestRiesgDesast, undefined, 'idIntegrantesApoyosObrRedMitigGestRiesgDesast', 'ASC').subscribe({
      next: registros => {
        this.registros = registros;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: err => {
        console.error('ERROR AL CARGAR LOS INTEGRANTES DEL APOYO: ', err);
        this.cargando = false;
        this.mostrarToast('error', 'No se pudieron cargar los integrantes del apoyo.');
      }
    });
  }

  //CARPETA DEL SERVIDOR DE ARCHIVOS DONDE VAN LAS FIRMAS: CARPETA PRINCIPAL + RUTA DE INTEGRANTES DE APOYOS (PARÁMETROS DEL SISTEMA) +
  //CARPETA DE LA UNIDAD MILITAR DEL APOYO — MISMO PATRÓN QUE FotAnexApoyObrRedMitigGestDesComponent. SI EL APOYO NO TRAE LA CARPETA DE
  //SU UNIDAD MILITAR, SE CONSULTA LA UNIDAD MILITAR POR SU SIGLA O ACRÓNIMO:
  private obtenerCarpetaFirmas(): Observable<string> {
    const unidadMilitar = this.apoyoObrRedMitigGestRiesgDesast?.unidadMilitarDTO;
    const carpetaUnidad$ = String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim()
      ? of(String(unidadMilitar?.nombreCarpetaAlmacenamientoUnidadMilitar).trim())
      : this.unidadesMilitaresService.getMilitaryUnitbySiglaoAcronimo(String(unidadMilitar?.siglaoAcronimoUnidadMilitar || '').trim()).pipe(
          map(({ unidadMilitarDTO }) => String(unidadMilitarDTO?.nombreCarpetaAlmacenamientoUnidadMilitar || '').trim())
        );
    return forkJoin({ parametros: this.parametrosSistemaService.getSystemParameterbyId(1), carpetaUnidad: carpetaUnidad$ }).pipe(
      map(({ parametros, carpetaUnidad }) => {
        const parametrosSistemaDTO = parametros.parametrosSistemaDTO;
        const rutaIntegrantes = String(parametrosSistemaDTO?.rutaDestinoArchivosIntegrantesApoyosObrRedMitigGestRiesgDesast || '').trim();
        if (!rutaIntegrantes) throw new Error('SIN RUTA DE INTEGRANTES DE APOYOS EN LOS PARÁMETROS DEL SISTEMA');
        if (!carpetaUnidad) throw new Error('SIN CARPETA DE ALMACENAMIENTO DE LA UNIDAD MILITAR DEL APOYO');
        const rutaBase = String(parametrosSistemaDTO.rutaDestinoCarpetaPrincipalServidorAplicaciones).trim() + rutaIntegrantes;
        const baseNormalizada = /[\\/]$/.test(rutaBase) ? rutaBase : `${rutaBase}/`;
        return `${baseNormalizada}${carpetaUnidad.replace(/^[\\/]+|[\\/]+$/g, '')}/`;
      })
    );
  }

  //GRADO, NOMBRES Y APELLIDOS DEL INTEGRANTE EN UNA SOLA LÍNEA PARA LA TABLA:
  nombreCompleto(registro: IntegrantesApoyosObrRedMitigGestRiesgDesastI, integrante: ConfiguracionIntegranteApoyo): string {
    if (!integranteRegistrado(registro, integrante)) return '';
    return ['grado', 'nombres', 'primerApellido', 'segundoApellido']
      .map(prefijo => String((registro as any)[prefijo + integrante.sufijo] ?? '').trim()).filter(Boolean).join(' ');
  }

  cargo(registro: IntegrantesApoyosObrRedMitigGestRiesgDesastI, integrante: ConfiguracionIntegranteApoyo): string {
    return String((registro as any)['cargo' + integrante.sufijo] ?? '').trim();
  }

  tieneFirma(registro: IntegrantesApoyosObrRedMitigGestRiesgDesastI, integrante: ConfiguracionIntegranteApoyo): boolean {
    return !!nombreArchivoFirmaIntegrante(registro, integrante);
  }

  cantidadIntegrantes(registro: IntegrantesApoyosObrRedMitigGestRiesgDesastI): number { return cantidadIntegrantesRegistrados(registro); }

  abrir(modo: 'guardar' | 'modificar' | 'eliminar', registro: IntegrantesApoyosObrRedMitigGestRiesgDesastI | null = null): void { this.modo = modo; this.seleccionado = registro; this.modal = true; }
  ver(registro: IntegrantesApoyosObrRedMitigGestRiesgDesastI): void { this.seleccionado = registro; this.vista = true; }
  cerrar(): void { this.modal = false; this.vista = false; this.seleccionado = null; }

  //FECHA Y HORA LOCAL ACTUAL SIN SEPARADORES (yyyyMMddHHmmss), COMO EN LOS NÚMEROS DE REGISTRO DEL BACKEND:
  private obtenerMarcaTiempo(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    return `${ahora.getFullYear()}${dosDigitos(ahora.getMonth() + 1)}${dosDigitos(ahora.getDate())}${dosDigitos(ahora.getHours())}${dosDigitos(ahora.getMinutes())}${dosDigitos(ahora.getSeconds())}`;
  }

  //NOMBRE DEL ARCHIVO NUEVO: "FIRMA_OBRA_" + ID DEL APOYO + SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR + TIPO DE INTEGRANTE (JST, JOP O CTE,
  //COMO EN LOS NOMBRES YA REGISTRADOS) + FECHA Y HORA, QUE EVITA QUE EL NAVEGADOR MUESTRE UNA FIRMA ANTERIOR GUARDADA EN CACHÉ:
  private nombreArchivoNuevo(integrante: ConfiguracionIntegranteApoyo, archivo: File, marcaTiempo: string): string {
    const extension = (archivo.name.split('.').pop() || '').toLowerCase();
    const siglaoAcronimo = String(this.apoyoObrRedMitigGestRiesgDesast?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '').trim().toUpperCase().replace(/[^A-Z0-9]+/g, '');
    return `FIRMA_OBRA_${this.apoyoObrRedMitigGestRiesgDesast?.idApoyoObrRedMitigGestRiesgDesast}_${siglaoAcronimo}_${integrante.tipo}_${marcaTiempo}.${extension}`;
  }

  //1) SUBE LAS FIRMAS NUEVAS, 2) CREA O MODIFICA EL REGISTRO CON LOS NOMBRES FINALES Y 3) BORRA LAS FIRMAS REEMPLAZADAS O QUITADAS. SI EL
  //REGISTRO NO SE PUEDE GUARDAR, SE BORRAN LAS FIRMAS RECIÉN SUBIDAS PARA NO DEJARLAS HUÉRFANAS — MISMO ORDEN QUE LAS FOTOGRAFÍAS ANEXAS:
  guardar(evento: GuardadoIntegrantesApoyoEvent): void {
    if (this.guardando) return;
    const cambiosConArchivo = evento.cambiosFirmas.filter(cambio => !!cambio.archivo);
    const carpeta = this.carpetaFirmas;
    if (evento.cambiosFirmas.length && !carpeta) {
      this.mostrarToast('error', 'No se pudo determinar la carpeta de las firmas (revise los parámetros del sistema y la carpeta de la unidad militar).');
      return;
    }
    this.guardando = true;
    const marcaTiempo = this.obtenerMarcaTiempo();
    const integrantes: any = { ...evento.integrantes };
    const subidas: string[] = [];
    const porSubir = cambiosConArchivo.map(cambio => {
      const nombre = this.nombreArchivoNuevo(cambio.integrante, cambio.archivo as File, marcaTiempo);
      const ruta = carpeta + nombre;
      integrantes['nombreArchivoFotoFirma' + cambio.integrante.sufijo] = nombre;
      return this.gestionArchivosService.uploadFile(cambio.archivo as File, ruta).pipe(map(() => { subidas.push(ruta); return ruta; }));
    });
    //FIRMAS GUARDADAS QUE SE REEMPLAZAN O SE QUITAN (SE BORRAN SOLO SI EL REGISTRO SE GUARDA BIEN):
    const porBorrar = evento.cambiosFirmas
      .map(cambio => nombreArchivoFirmaIntegrante(this.seleccionado, cambio.integrante))
      .filter(nombre => !!nombre);

    (porSubir.length ? forkJoin(porSubir) : of([])).subscribe({
      next: () => {
        const modificar = !!integrantes.idIntegrantesApoyosObrRedMitigGestRiesgDesast;
        (modificar ? this.service.updateMembersOfSupport(integrantes) : this.service.addMembersOfSupport(integrantes)).subscribe({
          next: respuesta => this.procesarRespuestaGuardado(respuesta, modificar, subidas, porBorrar),
          error: err => {
            console.error('ERROR AL GUARDAR LOS INTEGRANTES DEL APOYO: ', err);
            this.revertirSubidas(subidas);
            this.guardando = false;
            this.mostrarToast('error', err.error?.mensaje || (modificar ? 'Error al modificar los integrantes del apoyo.' : 'Error al agregar los integrantes del apoyo.'));
          }
        });
      },
      error: err => {
        console.error('ERROR AL SUBIR LAS FIRMAS DE LOS INTEGRANTES DEL APOYO: ', err);
        this.revertirSubidas(subidas);
        this.guardando = false;
        this.mostrarToast('error', 'No se pudieron subir las firmas al servidor de archivos.');
      }
    });
  }

  //EL BACKEND RESPONDE HTTP 200 CON banderaexito=false CUANDO NO GUARDA (EJ. YA EXISTE UN REGISTRO DE INTEGRANTES PARA EL APOYO); EN
  //ESE CASO SE BORRAN LAS FIRMAS SUBIDAS, SE MUESTRA EL ERROR Y SE DEJA EL MODAL ABIERTO:
  private procesarRespuestaGuardado(respuesta: IntegrantesApoyosObrRedMitigGestRiesgDesastMsj, modificar: boolean, subidas: string[], porBorrar: string[]): void {
    if (respuesta.banderaexito === false) {
      this.revertirSubidas(subidas);
      this.guardando = false;
      this.mostrarToast('error', respuesta.mensaje || (modificar ? 'Error al modificar los integrantes del apoyo.' : 'Error al agregar los integrantes del apoyo.'));
      return;
    }
    this.borrarFirmasSinUso(porBorrar).subscribe(() => {
      this.guardando = false;
      this.mostrarToast('exito', respuesta.mensaje || (modificar ? 'Integrantes del apoyo modificados correctamente.' : 'Integrantes del apoyo agregados correctamente.'));
      this.cerrar();
      this.cargar();
    });
  }

  //AL ELIMINAR EL REGISTRO TAMBIÉN SE BORRAN SUS FIRMAS DEL SERVIDOR DE ARCHIVOS:
  eliminar(id: number): void {
    if (this.guardando) return;
    const firmas = this.integrantes.map(integrante => nombreArchivoFirmaIntegrante(this.seleccionado, integrante)).filter(nombre => !!nombre);
    this.guardando = true;
    this.service.deleteMembersOfSupport(id).subscribe({
      next: respuesta => {
        if (respuesta.banderaexito === false) {
          this.guardando = false;
          this.mostrarToast('error', respuesta.mensaje || 'Error al eliminar los integrantes del apoyo.');
          return;
        }
        this.borrarFirmasSinUso(firmas).subscribe(() => {
          this.guardando = false;
          this.mostrarToast('exito', respuesta.mensaje || 'Integrantes del apoyo eliminados correctamente.');
          this.cerrar();
          this.cargar();
        });
      },
      error: err => {
        this.guardando = false;
        this.mostrarToast('error', err.error?.mensaje || 'Error al eliminar los integrantes del apoyo.');
      }
    });
  }

  //VARIOS REGISTROS DE INTEGRANTES PUEDEN USAR EL MISMO ARCHIVO DE FIRMA (EJ. LOS APOYOS 1 Y 10 USAN "FIRMA_ARIAS_JOP_CAOCC.jpg"),
  //POR ESO ANTES DE BORRAR UNA FIRMA SE VERIFICA QUE NINGÚN OTRO REGISTRO LA SIGA USANDO; SI NO SE PUEDE VERIFICAR, NO SE BORRA:
  private borrarFirmasSinUso(nombres: string[]): Observable<unknown> {
    const carpeta = this.carpetaFirmas;
    if (!nombres.length || !carpeta) return of(null);
    return new Observable(observador => {
      this.service.findAllMembersOfSupports().subscribe({
        next: registros => {
          const enUso = new Set<string>();
          registros.forEach(registro => this.integrantes.forEach(integrante => {
            const nombre = nombreArchivoFirmaIntegrante(registro, integrante);
            if (nombre) enUso.add(nombre);
          }));
          const borrados = [...new Set(nombres)].filter(nombre => !enUso.has(nombre)).map(nombre =>
            this.gestionArchivosService.deleteFile({ filePath: carpeta + nombre }).pipe(catchError(err => {
              console.error('ERROR AL BORRAR LA FIRMA ANTERIOR DEL INTEGRANTE: ', nombre, err);
              return of(null);
            }))
          );
          (borrados.length ? forkJoin(borrados) : of([])).subscribe(() => { observador.next(null); observador.complete(); });
        },
        error: err => {
          console.error('ERROR AL VERIFICAR EL USO DE LAS FIRMAS ANTES DE BORRARLAS: ', err);
          observador.next(null);
          observador.complete();
        }
      });
    });
  }

  private revertirSubidas(subidas: string[]): void {
    subidas.forEach(ruta => this.gestionArchivosService.deleteFile({ filePath: ruta }).subscribe({
      error: err => console.error('ERROR AL LIMPIAR LA FIRMA NO ASOCIADA: ', ruta, err)
    }));
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
