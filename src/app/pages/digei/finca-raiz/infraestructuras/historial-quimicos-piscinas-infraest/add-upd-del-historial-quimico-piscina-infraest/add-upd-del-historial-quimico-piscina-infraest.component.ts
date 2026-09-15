import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialQuimicosPiscinasInfraestI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/historial-quimicos-piscinas-infraest/historial-quimicos-piscinas-infraest.interface';
import { InfraestructurasI } from '../../../../../../interfaces/digei/finca-raiz/infraestructuras/infraestructuras.interface';
import { OficinasI } from '../../../../../../interfaces/panel-control/oficinas/oficinas.interface';
import { QuimicosPiscinasI } from '../../../../../../interfaces/panel-control/quimicos-piscinas/quimicos-piscinas.interface';
import { CentrosCostosOficinasI } from '../../../../../../interfaces/panel-control/oficinas/centros-costos-oficinas/centros-costos-oficinas.interface';
import { CentrosCostosOficinasService } from '../../../../../../services/panel-control/oficinas/centros-costos-oficinas/centros-costos-oficinas.service';

@Component({ selector: 'app-add-upd-del-historial-quimico-piscina-infraest', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './add-upd-del-historial-quimico-piscina-infraest.component.html', styleUrl: './add-upd-del-historial-quimico-piscina-infraest.component.scss' })
export class AddUpdDelHistorialQuimicoPiscinaInfraestComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() historialData: HistorialQuimicosPiscinasInfraestI | null = null;
  @Input({ required: true }) infraestructura!: InfraestructurasI;
  @Input() oficinas: OficinasI[] = [];
  @Input() quimicosPiscinas: QuimicosPiscinasI[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<HistorialQuimicosPiscinasInfraestI>();
  @Output() eliminar = new EventEmitter<number>();
  form!: FormGroup;
  centrosCostosOficina: CentrosCostosOficinasI[] = [];

  constructor(private fb: FormBuilder, private centrosCostosOficinasService: CentrosCostosOficinasService) { this.inicializar(); }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['historialData'] || changes['quimicosPiscinas'] || changes['oficinas'] || changes['infraestructura']) this.inicializar();
  }

  private inicializar(): void {
    const h = this.historialData;
    this.form = this.fb.group({
      id: [h?.idHistorialQuimicoPiscinaInfraest ?? null],
      numero: [{ value: h?.numRegHistorialQuimicoPiscinaInfraest ?? '', disabled: true }],
      quimicoPiscina: [this.buscarIdQuimicoPiscina(h?.nombreHistorialQuimicoPiscinaInfraest), Validators.required],
      oficina: [h?.oficinaDTO?.idOficina ?? '', Validators.required],
      centroCosto: ['', Validators.required],
      ingreso: [{ value: this.formatearFechaParaInput(h?.fechaHMSIngresoQuimicoPiscinaInfraest) || this.obtenerFechaHoraActual(), disabled: true }],
      modificacion: [{ value: h ? this.obtenerFechaHoraActual() : '', disabled: true }]
    });
    if (this.modo === 'eliminar') this.form.disable();
    this.centrosCostosOficina = [];
    if (h?.oficinaDTO?.idOficina && this.infraestructura) {
      this.cargarCentrosCostosOficina(Number(h.oficinaDTO.idOficina), true);
    }
  }

  //DEVUELVE LA FECHA Y HORA LOCAL EN EL FORMATO REQUERIDO POR datetime-local, SIN CONVERTIRLA A UTC:
  private obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dosDigitos = (valor: number): string => String(valor).padStart(2, '0');
    const fecha = `${ahora.getFullYear()}-${dosDigitos(ahora.getMonth() + 1)}-${dosDigitos(ahora.getDate())}`;
    const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return `${fecha}T${hora}`;
  }

  //NORMALIZA LAS FECHAS RECIBIDAS DEL BACKEND PARA MOSTRARLAS EN UN INPUT datetime-local:
  private formatearFechaParaInput(fecha: unknown): string {
    if (!fecha) return '';
    const texto = String(fecha).replace(' ', 'T');
    return texto.length > 16 ? texto.slice(0, 16) : texto;
  }

  //AGREGA LOS SEGUNDOS QUE REQUIERE EL BACKEND SIN CAMBIAR EL VALOR MOSTRADO AL USUARIO:
  private agregarSegundosParaBackend(fecha: string): string {
    if (!fecha) return fecha;
    return fecha.length === 16 ? `${fecha}:00` : fecha;
  }

  //BUSCA EL ID DEL CATÁLOGO A PARTIR DEL NOMBRE GUARDADO EN EL HISTORIAL:
  private buscarIdQuimicoPiscina(nombre: String | undefined): number | string {
    if (!nombre) return '';
    return this.quimicosPiscinas.find(quimico => String(quimico.nombreQuimicoPiscina) === String(nombre))?.idQuimicoPiscina ?? '';
  }

  //ACTUALIZA INMEDIATAMENTE EL CENTRO DE COSTO AL CAMBIAR LA OFICINA:
  seleccionarOficina(event: Event): void {
    const idOficina = Number((event.target as HTMLSelectElement).value);
    this.form.get('centroCosto')?.setValue('');
    this.centrosCostosOficina = [];
    if (!idOficina) return;
    this.cargarCentrosCostosOficina(idOficina, false);
  }

  //CARGA LOS CENTROS DE COSTO QUE COINCIDEN CON LA OFICINA Y LA UNIDAD MILITAR DE LA INFRAESTRUCTURA:
  private cargarCentrosCostosOficina(idOficina: number, seleccionarActual: boolean): void {
    const oficina = this.oficinas.find(item => Number(item.idOficina) === idOficina) ?? this.historialData?.oficinaDTO;
    const nombreOficina = String(oficina?.nombreOficina || '');
    const siglaUnidadMilitar = String(this.infraestructura?.unidadMilitarDTO?.siglaoAcronimoUnidadMilitar || '');
    if (!nombreOficina || !siglaUnidadMilitar) return;

    this.centrosCostosOficinasService.findAllCentrosCostosOficinas(
      undefined,
      undefined,
      siglaUnidadMilitar,
      nombreOficina,
      'centroCostoOficina',
      'ASC'
    ).subscribe({
      next: centrosCostos => {
        this.centrosCostosOficina = centrosCostos.filter(centroCosto => Number(centroCosto.oficinaDTO?.idOficina) === idOficina);
        if (seleccionarActual) {
          const valorActual = String(this.historialData?.centroCostoOficinaQuimicoPiscinaInfraest || '');
          const centroCostoActual = this.centrosCostosOficina.find(item => String(item.centroCostoOficina) === valorActual);
          this.form.get('centroCosto')?.setValue(centroCostoActual?.idCentroCostoOficina ?? '');
        }
      },
      error: error => {
        this.centrosCostosOficina = [];
        this.form.get('centroCosto')?.setValue('');
        console.error('ERROR AL CARGAR CENTROS DE COSTO DE LA OFICINA: ', error);
      }
    });
  }

  enviar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const oficina = this.oficinas.find(item => Number(item.idOficina) === Number(v.oficina));
    const quimicoPiscina = this.quimicosPiscinas.find(item => Number(item.idQuimicoPiscina) === Number(v.quimicoPiscina));
    const centroCostoSeleccionado = this.centrosCostosOficina.find(item => Number(item.idCentroCostoOficina) === Number(v.centroCosto));
    if (!oficina || !quimicoPiscina || !centroCostoSeleccionado) return;
    const centroCosto = String(centroCostoSeleccionado.centroCostoOficina || '').trim();
    if (!centroCosto) {
      this.form.get('centroCosto')?.setErrors({ required: true });
      return;
    }
    this.guardar.emit({ idHistorialQuimicoPiscinaInfraest: v.id ?? undefined, numRegHistorialQuimicoPiscinaInfraest: this.historialData?.numRegHistorialQuimicoPiscinaInfraest, nombreHistorialQuimicoPiscinaInfraest: quimicoPiscina.nombreQuimicoPiscina, centroCostoOficinaQuimicoPiscinaInfraest: centroCosto, fechaHMSIngresoQuimicoPiscinaInfraest: this.agregarSegundosParaBackend(v.ingreso), fechaHMSModificacionQuimicoPiscinaInfraest: this.agregarSegundosParaBackend(v.modificacion), oficinaDTO: oficina, infraestructuraDTO: this.infraestructura });
  }
  confirmarEliminar(): void { const id = this.form.getRawValue().id; if (id) this.eliminar.emit(Number(id)); }
}
