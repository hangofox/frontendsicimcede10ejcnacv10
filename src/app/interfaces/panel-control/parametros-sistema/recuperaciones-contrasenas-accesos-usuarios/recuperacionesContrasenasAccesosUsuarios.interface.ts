import { UsuariosI } from "../../usuarios/usuarios.interface";

export interface RecuperacionesContrasenasAccesosUsuariosI {
    idRecuperacionContrasenaAccesoUsuario?: number;
    usuarioDTO: UsuariosI;
    codigoActivacionContrasenaAccesoUsuario: String;
    fechaHMSExpCodActivContrasenaAccesoUsuario: String;
    estadoUsoCodigoActivacionContrasenaAccesoUsuario: String;
}

export interface RecuperacionesContrasenasAccesosUsuariosMsj {
    mensaje: string;
}

//MEDIOS POR LOS QUE SE PUEDE ENVIAR EL CÓDIGO DE ACTIVACIÓN (MISMOS VALORES QUE ESPERA EmailDTO EN EL BACKEND):
export type MedioEnvioCodigoActivacion = 'INSTITUCIONAL' | 'PERSONAL';

//PETICIÓN PÚBLICA DE ENVÍO DEL CÓDIGO DE ACTIVACIÓN: SOLO VIAJAN EL ID DEL USUARIO Y EL MEDIO.
//EL CÓDIGO, LAS ETIQUETAS *[NUMDOCIDSICIM]* Y *[CODACTIVAUSICIM]* Y LOS DATOS SMTP LOS RESUELVE EL BACKEND.
export interface EnvioCodigoActivacionRecuperacionContrasenaI {
    idUsuario: number;
    medioEnvio: MedioEnvioCodigoActivacion;
}

export interface EnvioCodigoActivacionRecuperacionContrasenaMsj {
    mensaje: string;
    banderaexito: boolean;
}
