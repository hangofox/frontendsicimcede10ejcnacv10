import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ClasificacionesEquiposIngenierosI } from '../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.interface';
import { SubclasificacionesEquiposIngenierosI } from '../../../../interfaces/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.interface';
import { ElementosSubclasificacionesEquiposIngenierosI } from '../../../../interfaces/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.interface';

import { ClasificacionesEquiposIngenierosService } from '../../../../services/dinco/clasificaciones-equipos-ingenieros/clasificaciones-equipos-ingenieros.service';
import { SubclasificacionesEquiposIngenierosService } from '../../../../services/dinco/clasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros/subclasificaciones-equipos-ingenieros.service';
import { ElementosSubclasificacionesEquiposIngenierosService } from '../../../../services/dinco/elementos-subclasificaciones-equipos-ingenieros/elementos-subclasificaciones-equipos-ingenieros.service';

//CONSULTA EN TRES COLUMNAS DE LA JERARQUÍA DE LOS EQUIPOS DE INGENIEROS: CLASIFICACIÓN → SUBCLASIFICACIÓN → ELEMENTO.
//AL ELEGIR UNA CLASIFICACIÓN SE VEN SUS SUBCLASIFICACIONES, Y AL ELEGIR UNA SUBCLASIFICACIÓN SUS ELEMENTOS (CON SU LÍNEA,
//CUENTA Y CLASE DE ACTIVO). LOS TRES CATÁLOGOS SE CARGAN UNA SOLA VEZ Y SE FILTRAN EN EL NAVEGADOR:
@Component({
  selector: 'app-clasific-subclasific-element-equip-ing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './clasific-subclasific-element-equip-ing.component.html',
  styleUrl: './clasific-subclasific-element-equip-ing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClasificSubclasificElementEquipIngComponent implements OnInit {

  clasificaciones: ClasificacionesEquiposIngenierosI[] = [];
  subclasificaciones: SubclasificacionesEquiposIngenierosI[] = [];
  elementos: ElementosSubclasificacionesEquiposIngenierosI[] = [];

  idClasificacionSeleccionada: number | null = null;
  idSubclasificacionSeleccionada: number | null = null;

  //BUSCADORES DE CADA COLUMNA:
  busquedaClasificacion = '';
  busquedaSubclasificacion = '';
  busquedaElemento = '';

  //ESTADO DE CARGA DE CADA COLUMNA: CADA LISTA SE PIDE POR SEPARADO Y SU COLUMNA SE MUESTRA APENAS LLEGA (LA DE ELEMENTOS ES
  //LA MÁS PESADA, Y ASÍ NO RETIENE A LAS OTRAS DOS); SI UNA FALLA, SOLO ESA COLUMNA MUESTRA EL ERROR:
  cargandoClasificaciones = true;
  cargandoSubclasificaciones = true;
  cargandoElementos = true;
  errorClasificaciones = false;
  errorSubclasificaciones = false;
  errorElementos = false;

  get cargandoAlguna(): boolean {
    return this.cargandoClasificaciones || this.cargandoSubclasificaciones || this.cargandoElementos;
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private clasificacionesEquiposIngenierosService: ClasificacionesEquiposIngenierosService,
    private subclasificacionesEquiposIngenierosService: SubclasificacionesEquiposIngenierosService,
    private elementosSubclasificacionesEquiposIngenierosService: ElementosSubclasificacionesEquiposIngenierosService
  ) {}

  ngOnInit(): void {
    this.clasificacionesEquiposIngenierosService.findAllEngineerEquipmentClassifications(undefined, undefined, 'nombreClasificacionEquipoIngeniero', 'ASC')
      .subscribe({
        next: (clasificaciones) => {
          this.clasificaciones = clasificaciones;
          this.cargandoClasificaciones = false;
          //SE ABRE LA PRIMERA CLASIFICACIÓN PARA QUE LAS COLUMNAS NO ARRANQUEN VACÍAS:
          if (!this.idClasificacionSeleccionada && clasificaciones[0]?.idClasificacionEquipoIngeniero) {
            this.seleccionarClasificacion(clasificaciones[0].idClasificacionEquipoIngeniero);
          }
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => {
          console.error('ERROR AL CARGAR CLASIFICACIONES DE EQUIPOS DE INGENIEROS: ', err);
          this.cargandoClasificaciones = false;
          this.errorClasificaciones = true;
          this.changeDetectorRef.markForCheck();
        }
      });

    this.subclasificacionesEquiposIngenierosService.findAllEngineerEquipmentSubclassifications(undefined, undefined, undefined, undefined, 'nombreSubclasificacionEquipoIngeniero', 'ASC')
      .subscribe({
        next: (subclasificaciones) => {
          this.subclasificaciones = subclasificaciones;
          this.cargandoSubclasificaciones = false;
          //SI LA CLASIFICACIÓN YA ESTÁ ELEGIDA, SE ABRE SU PRIMERA SUBCLASIFICACIÓN:
          if (!this.idSubclasificacionSeleccionada) {
            this.idSubclasificacionSeleccionada = this.subclasificacionesDeClasificacion[0]?.idSubclasificacionEquipoIngeniero ?? null;
          }
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => {
          console.error('ERROR AL CARGAR SUBCLASIFICACIONES DE EQUIPOS DE INGENIEROS: ', err);
          this.cargandoSubclasificaciones = false;
          this.errorSubclasificaciones = true;
          this.changeDetectorRef.markForCheck();
        }
      });

    this.elementosSubclasificacionesEquiposIngenierosService.findAllEngineerEquipmentSubclassificationElements(undefined, undefined, undefined, 'nombreElementoSubclasificacionEquipoIngeniero', 'ASC')
      .subscribe({
        next: (elementos) => {
          this.elementos = elementos;
          this.cargandoElementos = false;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => {
          console.error('ERROR AL CARGAR ELEMENTOS DE SUBCLASIFICACIONES DE EQUIPOS DE INGENIEROS: ', err);
          this.cargandoElementos = false;
          this.errorElementos = true;
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  private contiene(texto: unknown, busqueda: string): boolean {
    const normalizar = (valor: unknown) => String(valor ?? '').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return normalizar(texto).includes(normalizar(busqueda.trim()));
  }

  //---------- COLUMNA 1: CLASIFICACIONES ----------
  get clasificacionesVisibles(): ClasificacionesEquiposIngenierosI[] {
    return this.clasificaciones.filter(item => this.contiene(item.nombreClasificacionEquipoIngeniero, this.busquedaClasificacion));
  }

  totalSubclasificaciones(idClasificacion: number | undefined): number {
    return this.subclasificaciones.filter(item => item.clasificacionEquipoIngenieroDTO?.idClasificacionEquipoIngeniero === idClasificacion).length;
  }

  totalElementosClasificacion(idClasificacion: number | undefined): number {
    return this.elementos.filter(item => item.clasificacionEquipoIngenieroDTO?.idClasificacionEquipoIngeniero === idClasificacion).length;
  }

  seleccionarClasificacion(idClasificacion: number | undefined): void {
    if (!idClasificacion) return;
    this.idClasificacionSeleccionada = idClasificacion;
    this.busquedaSubclasificacion = '';
    this.busquedaElemento = '';
    //SE ABRE LA PRIMERA SUBCLASIFICACIÓN DE LA CLASIFICACIÓN ELEGIDA:
    const primera = this.subclasificacionesDeClasificacion[0];
    this.idSubclasificacionSeleccionada = primera?.idSubclasificacionEquipoIngeniero ?? null;
  }

  get clasificacionSeleccionada(): ClasificacionesEquiposIngenierosI | undefined {
    return this.clasificaciones.find(item => item.idClasificacionEquipoIngeniero === this.idClasificacionSeleccionada);
  }

  //---------- COLUMNA 2: SUBCLASIFICACIONES DE LA CLASIFICACIÓN ELEGIDA ----------
  private get subclasificacionesDeClasificacion(): SubclasificacionesEquiposIngenierosI[] {
    return this.subclasificaciones.filter(item => item.clasificacionEquipoIngenieroDTO?.idClasificacionEquipoIngeniero === this.idClasificacionSeleccionada);
  }

  get subclasificacionesVisibles(): SubclasificacionesEquiposIngenierosI[] {
    return this.subclasificacionesDeClasificacion.filter(item => this.contiene(item.nombreSubclasificacionEquipoIngeniero, this.busquedaSubclasificacion));
  }

  totalElementos(idSubclasificacion: number | undefined): number {
    return this.elementos.filter(item => item.subclasificacionEquipoIngenieroDTO?.idSubclasificacionEquipoIngeniero === idSubclasificacion).length;
  }

  seleccionarSubclasificacion(idSubclasificacion: number | undefined): void {
    if (!idSubclasificacion) return;
    this.idSubclasificacionSeleccionada = idSubclasificacion;
    this.busquedaElemento = '';
  }

  get subclasificacionSeleccionada(): SubclasificacionesEquiposIngenierosI | undefined {
    return this.subclasificaciones.find(item => item.idSubclasificacionEquipoIngeniero === this.idSubclasificacionSeleccionada);
  }

  //---------- COLUMNA 3: ELEMENTOS DE LA SUBCLASIFICACIÓN ELEGIDA ----------
  get elementosVisibles(): ElementosSubclasificacionesEquiposIngenierosI[] {
    return this.elementos.filter(item =>
      item.subclasificacionEquipoIngenieroDTO?.idSubclasificacionEquipoIngeniero === this.idSubclasificacionSeleccionada &&
      (this.contiene(item.nombreElementoSubclasificacionEquipoIngeniero, this.busquedaElemento) ||
       this.contiene(item.lineaEquipoIngenieroDTO?.nombreLineaEquipoIngeniero, this.busquedaElemento) ||
       this.contiene(item.cuentaEquipoIngenieroDTO?.numeroCuentaEquipoIngeniero, this.busquedaElemento) ||
       this.contiene(item.claseActivoEquipoIngenieroDTO?.numeroClaseActivoEquipoIngeniero, this.busquedaElemento)));
  }
}
