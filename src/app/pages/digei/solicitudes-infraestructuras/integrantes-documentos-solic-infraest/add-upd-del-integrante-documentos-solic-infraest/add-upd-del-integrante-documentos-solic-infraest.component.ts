import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { IntegrantesDocumentosSolicInfraestI, RolIntegranteDocumentosSolicInfraestI, ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST } from '../../../../../interfaces/digei/solicitudes-infraestructuras/integrantes-documentos-solic-infraest/integrantes-documentos-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

@Component({
  selector: 'app-add-upd-del-integrante-documentos-solic-infraest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-integrante-documentos-solic-infraest.component.html',
  styleUrl: './add-upd-del-integrante-documentos-solic-infraest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdDelIntegranteDocumentosSolicInfraestComponent implements OnChanges {

  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() integranteDocumentosSolicInfraestData: IntegrantesDocumentosSolicInfraestI | null = null;
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<IntegrantesDocumentosSolicInfraestI>();
  @Output() eliminar = new EventEmitter<number>();

  //LOS 15 ROLES DEL COMITÉ SE RECORREN EN EL HTML CON *ngFor PARA NO TENER QUE ESCRIBIR A MANO 90 CAMPOS
  //(15 ROLES x 6 CAMPOS: grado/nombres/primerApellido/segundoApellido/nombreArchivoFotoFirma/cargo):
  readonly roles = ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST;

  integrantesDocumentosSolicInfraestForm!: FormGroup;

  get banderaCrudGuardar(): boolean { return this.modo === 'guardar'; }
  get banderaCrudModificar(): boolean { return this.modo === 'modificar'; }
  get banderaCrudEliminar(): boolean { return this.modo === 'eliminar'; }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo'] || changes['integranteDocumentosSolicInfraestData']) {
      this.initForm();
    }
  }

  //CONSTRUYE EL NOMBRE DEL CONTROL REACTIVO PARA UN CAMPO Y ROL DADOS (EJ. "gradoCteBatallon"):
  obtenerNombreControl(clave: string, prefijoCampo: string): string {
    return `${prefijoCampo}${clave}`;
  }

  private obtenerValorCampo(clave: string, prefijoCampo: string): string {
    const integrante = this.integranteDocumentosSolicInfraestData as any;
    if (!integrante) return '';
    return integrante[this.obtenerNombreControl(clave, prefijoCampo)] ?? '';
  }

  private initForm(): void {
    const controles: { [nombreControl: string]: any } = {
      idIntegrantesSolicitudesInfraestructura: [this.integranteDocumentosSolicInfraestData?.idIntegrantesSolicitudesInfraestructura ?? null]
    };
    this.roles.forEach(rol => {
      controles[this.obtenerNombreControl(rol.clave, 'grado')] = [this.obtenerValorCampo(rol.clave, 'grado')];
      controles[this.obtenerNombreControl(rol.clave, 'nombres')] = [this.obtenerValorCampo(rol.clave, 'nombres')];
      controles[this.obtenerNombreControl(rol.clave, 'primerApellido')] = [this.obtenerValorCampo(rol.clave, 'primerApellido')];
      controles[this.obtenerNombreControl(rol.clave, 'segundoApellido')] = [this.obtenerValorCampo(rol.clave, 'segundoApellido')];
      controles[this.obtenerNombreControl(rol.clave, 'cargo')] = [this.obtenerValorCampo(rol.clave, 'cargo')];
      controles[this.obtenerNombreControl(rol.clave, 'nombreArchivoFotoFirma')] = [this.obtenerValorCampo(rol.clave, 'nombreArchivoFotoFirma')];
    });
    this.integrantesDocumentosSolicInfraestForm = this.formBuilder.group(controles);
    if (this.banderaCrudEliminar) {
      this.integrantesDocumentosSolicInfraestForm.disable();
    }
  }

  guardarModificar(): void {
    if (this.integrantesDocumentosSolicInfraestForm.invalid || !this.solicitudInfraestructura) {
      this.integrantesDocumentosSolicInfraestForm.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.integrantesDocumentosSolicInfraestForm.getRawValue();
    const integranteDocumentosSolicInfraest: { [campo: string]: any } = {
      idIntegrantesSolicitudesInfraestructura: valoresFormulario.idIntegrantesSolicitudesInfraestructura ?? undefined,
      solicitudInfraestructuraDTO: this.solicitudInfraestructura
    };
    this.roles.forEach(rol => {
      integranteDocumentosSolicInfraest[this.obtenerNombreControl(rol.clave, 'grado')] = valoresFormulario[this.obtenerNombreControl(rol.clave, 'grado')];
      integranteDocumentosSolicInfraest[this.obtenerNombreControl(rol.clave, 'nombres')] = valoresFormulario[this.obtenerNombreControl(rol.clave, 'nombres')];
      integranteDocumentosSolicInfraest[this.obtenerNombreControl(rol.clave, 'primerApellido')] = valoresFormulario[this.obtenerNombreControl(rol.clave, 'primerApellido')];
      integranteDocumentosSolicInfraest[this.obtenerNombreControl(rol.clave, 'segundoApellido')] = valoresFormulario[this.obtenerNombreControl(rol.clave, 'segundoApellido')];
      integranteDocumentosSolicInfraest[this.obtenerNombreControl(rol.clave, 'cargo')] = valoresFormulario[this.obtenerNombreControl(rol.clave, 'cargo')];
      integranteDocumentosSolicInfraest[this.obtenerNombreControl(rol.clave, 'nombreArchivoFotoFirma')] = valoresFormulario[this.obtenerNombreControl(rol.clave, 'nombreArchivoFotoFirma')];
    });
    this.guardar.emit(integranteDocumentosSolicInfraest as IntegrantesDocumentosSolicInfraestI);
  }

  confirmarEliminar(): void {
    const idIntegrantesSolicitudesInfraestructura = this.integrantesDocumentosSolicInfraestForm.getRawValue().idIntegrantesSolicitudesInfraestructura;
    if (idIntegrantesSolicitudesInfraestructura) {
      this.eliminar.emit(Number(idIntegrantesSolicitudesInfraestructura));
    }
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
