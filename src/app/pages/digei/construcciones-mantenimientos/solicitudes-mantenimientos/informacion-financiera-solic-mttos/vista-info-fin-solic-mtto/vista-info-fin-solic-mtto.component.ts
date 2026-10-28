import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InformacionFinancieraSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/informacion-financiera-solic-infraest/informacion-financiera-solic-infraest.interface';

@Component({
  selector: 'app-vista-inf-fin-solic-mtto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-info-fin-solic-mtto.component.html',
  styleUrl: './vista-info-fin-solic-mtto.component.scss'
})
export class VistaInformacionFinancieraSolicMttoComponent {
  @Input() data: InformacionFinancieraSolicInfraestI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  //VALOR TOTAL DE LA ACTIVIDAD (CANTIDAD × VALOR DEL COSTO UNITARIO); null SI NO TIENE VALOR DEL COSTO UNITARIO:
  get valorTotal(): number | null {
    const valorUnitario = Number(this.data?.valorCostoUnitarioCapituloProductoInfraestructura);
    if (!String(this.data?.valorCostoUnitarioCapituloProductoInfraestructura ?? '').trim() || isNaN(valorUnitario)) return null;
    return Number(this.data?.cantidadActividadProductoInfraestructura ?? 0) * valorUnitario;
  }
}
