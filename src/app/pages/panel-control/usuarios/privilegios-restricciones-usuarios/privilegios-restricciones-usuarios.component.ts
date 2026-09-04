import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UsuariosI } from '../../../../interfaces/panel-control/usuarios/usuarios.interface';
import { FuncionalidadesI } from '../../../../interfaces/panel-control/usuarios/funcionalidades/funcionalidades.interface';
import { RolesI } from '../../../../interfaces/panel-control/usuarios/funcionalidades/roles/roles.interface';

interface FuncionalidadConRolesI {
  funcionalidad: FuncionalidadesI;
  roles: RolesI[];
}

//CATÁLOGO SIMULADO DE FUNCIONALIDADES Y ROLES (SIN CONSUMIR EL BACKEND):
const FUNCIONALIDAD_USUARIOS: FuncionalidadesI = { idFuncionalidad: 1, nombreFuncionalidad: 'USUARIOS', nombreIconoMenuPrincipalFuncionalidad: 'imagen_usuarios_01.png', labelMenuPrincipalFuncionalidad: 'Usuarios' };
const FUNCIONALIDAD_OFICINAS: FuncionalidadesI = { idFuncionalidad: 2, nombreFuncionalidad: 'OFICINAS', nombreIconoMenuPrincipalFuncionalidad: 'imagen_oficinas_01.png', labelMenuPrincipalFuncionalidad: 'Oficinas' };
const FUNCIONALIDAD_UNIDADES: FuncionalidadesI = { idFuncionalidad: 3, nombreFuncionalidad: 'UNIDADES MILITARES', nombreIconoMenuPrincipalFuncionalidad: 'imagen_unidades_militares_01.png', labelMenuPrincipalFuncionalidad: 'Unidades militares' };

const ROLES_SIMULADOS: RolesI[] = [
  { idRol: 1, nombreRol: 'VER USUARIOS', funcionalidadDTO: FUNCIONALIDAD_USUARIOS },
  { idRol: 2, nombreRol: 'GUARDAR USUARIOS', funcionalidadDTO: FUNCIONALIDAD_USUARIOS },
  { idRol: 3, nombreRol: 'MODIFICAR USUARIOS', funcionalidadDTO: FUNCIONALIDAD_USUARIOS },
  { idRol: 4, nombreRol: 'ELIMINAR USUARIOS', funcionalidadDTO: FUNCIONALIDAD_USUARIOS },
  { idRol: 5, nombreRol: 'LISTADO DE PRIVILEGIOS Y RESTRICCIONES DE USUARIOS', funcionalidadDTO: FUNCIONALIDAD_USUARIOS },
  { idRol: 6, nombreRol: 'VER OFICINAS', funcionalidadDTO: FUNCIONALIDAD_OFICINAS },
  { idRol: 7, nombreRol: 'GUARDAR OFICINAS', funcionalidadDTO: FUNCIONALIDAD_OFICINAS },
  { idRol: 8, nombreRol: 'MODIFICAR OFICINAS', funcionalidadDTO: FUNCIONALIDAD_OFICINAS },
  { idRol: 9, nombreRol: 'ELIMINAR OFICINAS', funcionalidadDTO: FUNCIONALIDAD_OFICINAS },
  { idRol: 10, nombreRol: 'VER UNIDADES MILITARES', funcionalidadDTO: FUNCIONALIDAD_UNIDADES },
  { idRol: 11, nombreRol: 'GUARDAR UNIDADES MILITARES', funcionalidadDTO: FUNCIONALIDAD_UNIDADES },
  { idRol: 12, nombreRol: 'MODIFICAR UNIDADES MILITARES', funcionalidadDTO: FUNCIONALIDAD_UNIDADES },
  { idRol: 13, nombreRol: 'ELIMINAR UNIDADES MILITARES', funcionalidadDTO: FUNCIONALIDAD_UNIDADES }
];

//SOLO EL SUPER ADMINISTRADOR (idUsuario === 1) VIENE CON TODOS LOS ROLES PRE-MARCADOS EN LA SIMULACIÓN:
const IDS_ROLES_POR_USUARIO_SIMULADOS: Record<number, number[]> = {
  1: ROLES_SIMULADOS.map(r => r.idRol!),
  2: [1, 6, 10],
  3: [1],
  5: [1, 6]
};

@Component({
  selector: 'app-privilegios-restricciones-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './privilegios-restricciones-usuarios.component.html',
  styleUrl: './privilegios-restricciones-usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegiosRestriccionesUsuariosComponent implements OnChanges {

  @Input() usuarioData: UsuariosI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() toastEvento = new EventEmitter<{ tipo: 'exito' | 'error'; mensaje: string }>();

  private readonly CONTROL_SELECCIONAR_TODOS = 'checkboxSeleccionarTodos';

  readonly roles = ROLES_SIMULADOS;
  funcionalidadesConRoles: FuncionalidadConRolesI[] = [];
  privilegiosForm!: FormGroup;
  guardando = false;

  get esSuperAdministrador(): boolean {
    return this.usuarioData?.idUsuario === 1;
  }

  constructor(private formBuilder: FormBuilder) {
    this.construirAgrupacion();
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarioData']) {
      this.initForm();
    }
  }

  private construirAgrupacion(): void {
    const funcionalidades = [FUNCIONALIDAD_USUARIOS, FUNCIONALIDAD_OFICINAS, FUNCIONALIDAD_UNIDADES];
    this.funcionalidadesConRoles = funcionalidades.map(funcionalidad => ({
      funcionalidad,
      roles: this.roles.filter(rol => rol.funcionalidadDTO.idFuncionalidad === funcionalidad.idFuncionalidad)
    }));
  }

  obtenerNombreControl(idRol: number | undefined): string {
    return 'rol_' + idRol;
  }

  private initForm(): void {
    const idsMarcados = new Set(this.usuarioData?.idUsuario ? IDS_ROLES_POR_USUARIO_SIMULADOS[this.usuarioData.idUsuario] ?? [] : []);
    const controls: any = {};
    this.roles.forEach(rol => {
      controls[this.obtenerNombreControl(rol.idRol)] = [idsMarcados.has(rol.idRol!)];
    });
    controls[this.CONTROL_SELECCIONAR_TODOS] = [this.roles.length > 0 && this.roles.every(rol => idsMarcados.has(rol.idRol!))];
    this.privilegiosForm = this.formBuilder.group(controls);

    //EL SUPER ADMINISTRADOR NUNCA DEBE QUEDAR SIN ACCESO — SU FORMULARIO QUEDA BLOQUEADO:
    if (this.esSuperAdministrador) {
      this.privilegiosForm.disable();
    }
  }

  onCambioSeleccionarTodos(): void {
    const nuevoEstado = !!this.privilegiosForm.get(this.CONTROL_SELECCIONAR_TODOS)?.value;
    this.roles.forEach(rol => {
      this.privilegiosForm.get(this.obtenerNombreControl(rol.idRol))?.setValue(nuevoEstado, { emitEvent: false });
    });
  }

  onCambioRolIndividual(): void {
    const todosMarcados = this.roles.every(rol => !!this.privilegiosForm.get(this.obtenerNombreControl(rol.idRol))?.value);
    this.privilegiosForm.get(this.CONTROL_SELECCIONAR_TODOS)?.setValue(todosMarcados, { emitEvent: false });
  }

  //SIMULACIÓN: NO PERSISTE EN NINGÚN BACKEND, SOLO EMITE EL TOAST DE CONFIRMACIÓN Y CIERRA EL MODAL:
  guardarPrivilegios(): void {
    if (this.esSuperAdministrador || this.guardando) return;
    this.guardando = true;
    setTimeout(() => {
      this.guardando = false;
      this.toastEvento.emit({ tipo: 'exito', mensaje: 'Privilegios y restricciones actualizados (simulado).' });
      this.closeModal();
    }, 300);
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
