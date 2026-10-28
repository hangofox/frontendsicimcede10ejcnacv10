import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GerentesProyectosSolicInfraestI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/gerentes-proyectos-solic-infraest/gerentes-proyectos-solic-infraest.interface';
import { SolicitudesInfraestructurasI } from '../../../../../../interfaces/digei/solicitudes-infraestructuras/solicitudes-infraestructuras.interface';

@Component({
  selector: 'app-add-upd-del-ger-proy-solic-const-nuev',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-upd-del-ger-proy-solic-const-nuev.component.html',
  styleUrl: './add-upd-del-ger-proy-solic-const-nuev.component.scss'
})
export class AddUpdDelGerenteProyectoSolicConstNuevComponent implements OnChanges {
  @Input() modo: 'guardar' | 'modificar' | 'eliminar' = 'guardar';
  @Input() data: GerentesProyectosSolicInfraestI | null = null;
  //SOLICITUD DE INFRAESTRUCTURA A LA QUE PERTENECE EL GERENTE DE PROYECTO (LA DEL MODAL DESDE EL QUE SE ABRIÓ EL LISTADO):
  @Input() solicitudInfraestructura: SolicitudesInfraestructurasI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<GerentesProyectosSolicInfraestI>();
  @Output() eliminar = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  //EN LA TABLA SOLO EL MÓVIL ES OBLIGATORIO (NOT NULL); SE PIDEN TAMBIÉN EL GRADO, LOS NOMBRES Y EL PRIMER APELLIDO PARA
  //IDENTIFICAR AL GERENTE DE PROYECTO (EL BACKEND BUSCA POR NOMBRES Y APELLIDOS). LOS LÍMITES SON LOS TAMAÑOS DE LAS COLUMNAS:
  form = this.fb.group({
    grado: ['', [Validators.required, Validators.maxLength(255)]],
    nombres: ['', [Validators.required, Validators.maxLength(255)]],
    apellido1: ['', [Validators.required, Validators.maxLength(255)]],
    apellido2: ['', Validators.maxLength(255)],
    movil: ['', [Validators.required, Validators.maxLength(150), Validators.pattern(/^[0-9]{7,15}$/)]],
    cargo: ['', Validators.maxLength(255)]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['modo']) {
      const x = this.data;
      this.form.reset({
        grado: String(x?.gradoGerenteProyectoSolicInfraest ?? ''),
        nombres: String(x?.nombresGerenteProyectoSolicInfraest ?? ''),
        apellido1: String(x?.primerApellidoGerenteProyectoSolicInfraest ?? ''),
        apellido2: String(x?.segundoApellidoGerenteProyectoSolicInfraest ?? ''),
        movil: String(x?.movilGerenteProyectoSolicInfraest ?? ''),
        cargo: String(x?.cargoActualGerenteProyectoSolicInfraest ?? '')
      });
      if (this.modo === 'eliminar') {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  enviar(): void {
    if (this.form.invalid || !this.solicitudInfraestructura) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    //LOS TEXTOS SE GUARDAN EN MAYÚSCULA, IGUAL QUE LOS DEMÁS REGISTROS DE LA TABLA:
    const texto = (valor: string | null | undefined): string => String(valor ?? '').trim().toUpperCase();
    this.guardar.emit({
      idGerenteProyectoSolicInfraest: this.data?.idGerenteProyectoSolicInfraest,
      solicitudInfraestructuraDTO: this.solicitudInfraestructura,
      gradoGerenteProyectoSolicInfraest: texto(valores.grado),
      nombresGerenteProyectoSolicInfraest: texto(valores.nombres),
      primerApellidoGerenteProyectoSolicInfraest: texto(valores.apellido1),
      segundoApellidoGerenteProyectoSolicInfraest: texto(valores.apellido2),
      movilGerenteProyectoSolicInfraest: texto(valores.movil),
      cargoActualGerenteProyectoSolicInfraest: texto(valores.cargo)
    });
  }

  confirmar(): void {
    if (this.data?.idGerenteProyectoSolicInfraest) this.eliminar.emit(this.data.idGerenteProyectoSolicInfraest);
  }
}
