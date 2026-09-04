import { UnidadesMilitaresI } from "../../../panel-control/unidades-militares/unidades-militares.interface";
import { UsuariosI } from "../../usuarios/usuarios.interface";
import { FuncionalidadesI } from "../funcionalidades/funcionalidades.interface";
import { RolesI } from "../funcionalidades/roles/roles.interface";

export interface PrivilegyRestriccAccesosUsuariosI {
    idPrivilegioyRestriccionAccesoUsuario?: number;
    numeroRegistroPrivilegioyRestriccionAccesoUsuario?: String;
    unidadMilitarDTO: UnidadesMilitaresI;
    usuarioDTO: UsuariosI;
    funcionalidadDTO: FuncionalidadesI;
    rolDTO: RolesI;
    urlAccesoUsuario: String;
    sioNoPrivilegioyRestriccionAccesoUsuario: String;
    fechaHMSIngresoPrivilegioyRestriccionAccesoUsuario: String;
}

export interface PrivilegyRestriccAccesosUsuariosMsj {
    mensaje: string;
}