import { EquiposIngenierosI } from "../../equipos-ingenieros/equipos-ingenieros.interface";

//PROYECCIÓN DE REVISIÓN TÉCNICO-MECÁNICA DE UN EQUIPO DE TRANSPORTE (TABLA_PROYECCIONES_TECNICOMECANICAS_EQUIP_TRANSP). EL EQUIPO DE
//TRANSPORTE ES UN REGISTRO DE TABLA_EQUIPOS_INGENIEROS:
export interface ProyeccionesTecnicomecanicasEquipTranspI {
    idProyeccionTecnicomecanicaEquipTransp?: number;
    nombreYNumeroRubroProyeccionTecnicomecanicaEquipTransp: String;
    valorSolicitadoProyeccionTecnicomecanicaEquipTransp: String;
    //java.util.Date: LLEGA DEL BACKEND COMO TEXTO ISO Y SE ENVÍA COMO yyyy-MM-ddTHH:mm:ss.
    fechaHMSProyeccionTecnicomecanicaEquipTransp: String;
    equipoIngenieroDTO: EquiposIngenierosI;
}

export interface ProyeccionesTecnicomecanicasEquipTranspMsj {
  mensaje: string;
  banderaexito?: boolean;
}
