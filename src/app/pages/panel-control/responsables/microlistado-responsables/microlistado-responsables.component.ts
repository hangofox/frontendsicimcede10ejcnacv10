import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ResponsablesI } from '../../../../interfaces/panel-control/responsables/responsables.interface';
import { ResponsablesService } from '../../../../services/panel-control/responsables/responsables.service';

@Component({
  selector: 'app-microlistado-responsables',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './microlistado-responsables.component.html',
  styleUrl: './microlistado-responsables.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MicrolistadoResponsablesComponent implements OnInit {

  //EL MICROLISTADO SE ABRE ACOTADO A LA UNIDAD MILITAR QUE LE PASA EL COMPONENTE QUE LO INVOCA (LA DE LA
  //INFRAESTRUCTURA A LA QUE SE LE VA A ASIGNAR EL RESPONSABLE). NO ES UN FILTRO QUE EL USUARIO PUEDA CAMBIAR:
  @Input({ required: true }) siglaoAcronimoUnidadMilitar!: String;
  //SOLO SE OFRECEN RESPONSABLES ACTIVOS CUANDO ESTA BANDERA ESTÁ ENCENDIDA:
  @Input() soloResponsablesActivos = true;

  @Output() seleccionarResponsable = new EventEmitter<ResponsablesI>();
  @Output() cerrarModal = new EventEmitter<void>();

  responsables: ResponsablesI[] = [];
  totalRegistros = 0;
  paginaActual = 0;
  tandaNumeroRegistrosporPagina = 10;
  responsablesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private responsablesService: ResponsablesService
  ) {
    this.responsablesForm = this.formBuilder.group({
      ctextPalabraClave: new FormControl(''),
      cboxTandaNumeroRegistrosporPaginaSeleccionado: new FormControl('10')
    });
  }

  ngOnInit(): void {
    this.accionListar();
  }

  buscar(): void {
    this.paginaActual = 0;
    this.accionListar();
  }

  //CONSULTA PAGINADA CONTRA EL BACKEND, SIEMPRE RESTRINGIDA A LA UNIDAD MILITAR RECIBIDA:
  accionListar(): void {
    const keyword = String(this.responsablesForm.value.ctextPalabraClave || '').trim().toUpperCase() || undefined;
    const siglaoAcronimoUnidadMilitar = String(this.siglaoAcronimoUnidadMilitar || '') || undefined;
    const estado = this.soloResponsablesActivos ? 'ACTIVO' : undefined;

    this.responsablesService.findAllResponsiblesPag(this.paginaActual, this.tandaNumeroRegistrosporPagina, undefined, siglaoAcronimoUnidadMilitar, estado, keyword, 'idResponsable', 'ASC').subscribe({
      next: (responsables) => {
        this.responsables = responsables;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL LISTAR RESPONSABLES: ', err)
    });

    this.responsablesService.findCountTotalRegisters(undefined, siglaoAcronimoUnidadMilitar, estado, keyword).subscribe({
      next: (totalRegistros) => {
        this.totalRegistros = totalRegistros;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => console.error('ERROR AL CONTAR RESPONSABLES: ', err)
    });
  }

  //DEVUELVE EL RESPONSABLE ELEGIDO AL COMPONENTE QUE ABRIÓ EL MICROLISTADO PARA QUE ESCRIBA SU NÚMERO DE DOCUMENTO
  //DE IDENTIFICACIÓN EN LA CAJA DE TEXTO Y CIERRE LA VENTANA — MISMO PATRÓN QUE
  //MicrolistadoResponsablesComponent.ponerIdyNumeroDocumentoIdentificacionResponsable() DEL PROYECTO DE REFERENCIA
  //PortalSiadmecEjcNacionalV20:
  ponerNumeroDocumentoIdentificacionResponsable(responsable: ResponsablesI): void {
    this.seleccionarResponsable.emit(responsable);
  }

  cambiarPagina(pagina: number): void { this.paginaActual = pagina; this.accionListar(); }
  seleccionarTandaNumeroRegistrosporPagina(): void {
    this.tandaNumeroRegistrosporPagina = Number(this.responsablesForm.value.cboxTandaNumeroRegistrosporPaginaSeleccionado);
    this.buscar();
  }
  calcularTotalPaginas(): number { return Math.max(Math.ceil(this.totalRegistros / this.tandaNumeroRegistrosporPagina), 1); }
}
