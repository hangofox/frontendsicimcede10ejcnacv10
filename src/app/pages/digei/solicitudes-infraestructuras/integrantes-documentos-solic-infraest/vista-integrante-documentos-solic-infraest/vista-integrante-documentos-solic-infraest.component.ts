import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrantesDocumentosSolicInfraestI, ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST } from '../../../../../interfaces/digei/solicitudes-infraestructuras/integrantes-documentos-solic-infraest/integrantes-documentos-solic-infraest.interface';

@Component({
  selector: 'app-vista-integrante-documentos-solic-infraest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-integrante-documentos-solic-infraest.component.html',
  styleUrl: './vista-integrante-documentos-solic-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaIntegranteDocumentosSolicInfraestComponent {

  @Input() integranteDocumentosSolicInfraestData: IntegrantesDocumentosSolicInfraestI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  readonly roles = ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST;

  obtenerValorCampo(clave: string, prefijoCampo: string): string {
    const integrante = this.integranteDocumentosSolicInfraestData as any;
    return integrante?.[`${prefijoCampo}${clave}`] ?? '';
  }

  obtenerNombresYApellidos(clave: string): string {
    const nombres = this.obtenerValorCampo(clave, 'nombres');
    const primerApellido = this.obtenerValorCampo(clave, 'primerApellido');
    const segundoApellido = this.obtenerValorCampo(clave, 'segundoApellido');
    return `${nombres} ${primerApellido} ${segundoApellido}`.trim();
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
