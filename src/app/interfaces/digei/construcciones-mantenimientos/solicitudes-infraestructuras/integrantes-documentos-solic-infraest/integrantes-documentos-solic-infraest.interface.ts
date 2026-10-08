import { SolicitudesInfraestructurasI } from "../solicitudes-infraestructuras.interface";

export interface RolIntegranteDocumentosSolicInfraestI {
    clave: string;
    etiqueta: string;
}

//CONFIGURACIÓN DE LOS 17 ROLES DEL COMITÉ DE INTEGRANTES DE LA SOLICITUD DE INFRAESTRUCTURA (UN ÚNICO REGISTRO POR
//SOLICITUD, CON 6 CAMPOS PLANOS POR CADA ROL: grado/nombres/primerApellido/segundoApellido/nombreArchivoFotoFirma/cargo
//+ EL SUFIJO "clave" — MISMO ORDEN Y NOMBRES EXACTOS QUE IntegrantesSolicitudesInfraestructuraDTO.java):
export const ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST: RolIntegranteDocumentosSolicInfraestI[] = [
    { clave: 'JefeGestionIngenierosBatallon', etiqueta: 'Jefe de Gestión de Ingenieros (Batallón)' },
    { clave: 'CteBatallon', etiqueta: 'Comandante de Batallón' },
    { clave: 'FincaRaizBr', etiqueta: 'Finca Raíz (Brigada)' },
    { clave: 'JefeGestionIngenierosBr', etiqueta: 'Jefe de Gestión de Ingenieros (Brigada)' },
    { clave: 'CteOJem2doCteBr', etiqueta: 'Comandante o Jefe de Estado Mayor / 2do Comandante (Brigada)' },
    { clave: 'FincaRaizDiv', etiqueta: 'Finca Raíz (División)' },
    { clave: 'JefeGestionIngenierosDiv', etiqueta: 'Jefe de Gestión de Ingenieros (División)' },
    { clave: 'CteDiv', etiqueta: 'Comandante de División' },
    { clave: 'FincaRaizComando', etiqueta: 'Finca Raíz (Comando)' },
    { clave: 'JefeGestionIngenierosComando', etiqueta: 'Jefe de Gestión de Ingenieros (Comando)' },
    { clave: 'CteComando', etiqueta: 'Comandante (Comando)' },
    { clave: 'FincaRaizCede', etiqueta: 'Finca Raíz (CEDE)' },
    { clave: 'JefeGestionIngenierosCede', etiqueta: 'Jefe de Gestión de Ingenieros (CEDE)' },
    { clave: 'CteCede', etiqueta: 'Comandante (CEDE)' },
    { clave: 'FincaRaizJef', etiqueta: 'Finca Raíz (Jefatura)' },
    { clave: 'JefeGestionIngenierosJef', etiqueta: 'Jefe de Gestión de Ingenieros (Jefatura)' },
    { clave: 'CteJef', etiqueta: 'Comandante (Jefatura)' }
];

//ORDEN JERÁRQUICO DE LOS NIVELES DE UNIDAD MILITAR (DE MENOR A MAYOR) — MISMO ORDEN DEL COMBO "NIVEL" DE
//AddUpdDelUnidadMilitarComponent Y USADO TANTO POR EL LISTADO DE SOLICITUDES DE INFRAESTRUCTURAS (PARA DECIDIR
//DESDE QUÉ COLUMNA DE CHULEO EMPIEZA UNA SOLICITUD) COMO POR EL ASISTENTE DE ADJUNTAMIENTO DE INTEGRANTES (PARA
//DECIDIR DESDE QUÉ NIVEL EMPIEZA A HABILITARSE). DEPARTAMENTO, IGUAL QUE DISPENSARIO Y COMANDO, NO TIENE ROLES DE
//COMITÉ PROPIOS EN GRUPOS_NIVEL_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST, PERO DEBE FIGURAR AQUÍ PARA QUE LAS
//SOLICITUDES DE UNIDADES MILITARES DE ESE NIVEL PUEDAN CALCULAR CORRECTAMENTE QUÉ NIVELES SUPERIORES APLICAN:
export const NIVELES_JERARQUIA_UNIDAD_MILITAR = ['DISPENSARIO', 'BATALLON', 'BRIGADA', 'DIVISION', 'DEPARTAMENTO', 'JEFATURA', 'COMANDO'];

export interface GrupoNivelIntegrantesDocumentosSolicInfraestI {
    nivel: string;
    etiqueta: string;
    roles: RolIntegranteDocumentosSolicInfraestI[];
}

//AGRUPACIÓN DE LOS ROLES DEL COMITÉ POR NIVEL DE UNIDAD MILITAR (SOLO LOS 5 NIVELES QUE TIENEN ESPACIOS DE FIRMA EN
//EL ASISTENTE DE ADJUNTAMIENTO Y EN LAS COLUMNAS DE CHULEO DEL LISTADO DE SOLICITUDES: BATALLON, BRIGADA, DIVISION,
//JEFATURA Y COMANDO — LOS ROLES DE CEDE EXISTEN EN EL BACKEND PERO NO HACEN PARTE DE ESTA VALIDACIÓN POR NIVEL
//(NO EXISTE UN NIVEL "CEDE" EN NIVELES_JERARQUIA_UNIDAD_MILITAR). DISPENSARIO Y DEPARTAMENTO TAMPOCO TIENEN GRUPO
//AQUÍ PORQUE NO TIENEN ROLES DE COMITÉ PROPIOS EN EL BACKEND):
export const GRUPOS_NIVEL_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST: GrupoNivelIntegrantesDocumentosSolicInfraestI[] = [
    { nivel: 'BATALLON', etiqueta: 'Batallón', roles: ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST.filter(rol => rol.clave.endsWith('Batallon')) },
    { nivel: 'BRIGADA', etiqueta: 'Brigada', roles: ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST.filter(rol => rol.clave.endsWith('Br')) },
    { nivel: 'DIVISION', etiqueta: 'División', roles: ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST.filter(rol => rol.clave.endsWith('Div')) },
    { nivel: 'JEFATURA', etiqueta: 'Jefatura', roles: ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST.filter(rol => rol.clave.endsWith('Jef')) },
    { nivel: 'COMANDO', etiqueta: 'Comando', roles: ROLES_INTEGRANTES_DOCUMENTOS_SOLIC_INFRAEST.filter(rol => rol.clave.endsWith('Comando')) }
];

export interface IntegrantesDocumentosSolicInfraestI {
    idIntegrantesSolicitudesInfraestructura?: number;
    solicitudInfraestructuraDTO: SolicitudesInfraestructurasI;

    gradoJefeGestionIngenierosBatallon?: String;
    nombresJefeGestionIngenierosBatallon?: String;
    primerApellidoJefeGestionIngenierosBatallon?: String;
    segundoApellidoJefeGestionIngenierosBatallon?: String;
    nombreArchivoFotoFirmaJefeGestionIngenierosBatallon?: String;
    cargoJefeGestionIngenierosBatallon?: String;

    gradoCteBatallon?: String;
    nombresCteBatallon?: String;
    primerApellidoCteBatallon?: String;
    segundoApellidoCteBatallon?: String;
    nombreArchivoFotoFirmaCteBatallon?: String;
    cargoCteBatallon?: String;

    gradoFincaRaizBr?: String;
    nombresFincaRaizBr?: String;
    primerApellidoFincaRaizBr?: String;
    segundoApellidoFincaRaizBr?: String;
    nombreArchivoFotoFirmaFincaRaizBr?: String;
    cargoFincaRaizBr?: String;

    gradoJefeGestionIngenierosBr?: String;
    nombresJefeGestionIngenierosBr?: String;
    primerApellidoJefeGestionIngenierosBr?: String;
    segundoApellidoJefeGestionIngenierosBr?: String;
    nombreArchivoFotoFirmaJefeGestionIngenierosBr?: String;
    cargoJefeGestionIngenierosBr?: String;

    gradoCteOJem2doCteBr?: String;
    nombresCteOJem2doCteBr?: String;
    primerApellidoCteOJem2doCteBr?: String;
    segundoApellidoCteOJem2doCteBr?: String;
    nombreArchivoFotoFirmaCteOJem2doCteBr?: String;
    cargoCteOJem2doCteBr?: String;

    gradoFincaRaizDiv?: String;
    nombresFincaRaizDiv?: String;
    primerApellidoFincaRaizDiv?: String;
    segundoApellidoFincaRaizDiv?: String;
    nombreArchivoFotoFirmaFincaRaizDiv?: String;
    cargoFincaRaizDiv?: String;

    gradoJefeGestionIngenierosDiv?: String;
    nombresJefeGestionIngenierosDiv?: String;
    primerApellidoJefeGestionIngenierosDiv?: String;
    segundoApellidoJefeGestionIngenierosDiv?: String;
    nombreArchivoFotoFirmaJefeGestionIngenierosDiv?: String;
    cargoJefeGestionIngenierosDiv?: String;

    gradoCteDiv?: String;
    nombresCteDiv?: String;
    primerApellidoCteDiv?: String;
    segundoApellidoCteDiv?: String;
    nombreArchivoFotoFirmaCteDiv?: String;
    cargoCteDiv?: String;

    gradoFincaRaizComando?: String;
    nombresFincaRaizComando?: String;
    primerApellidoFincaRaizComando?: String;
    segundoApellidoFincaRaizComando?: String;
    nombreArchivoFotoFirmaFincaRaizComando?: String;
    cargoFincaRaizComando?: String;

    gradoJefeGestionIngenierosComando?: String;
    nombresJefeGestionIngenierosComando?: String;
    primerApellidoJefeGestionIngenierosComando?: String;
    segundoApellidoJefeGestionIngenierosComando?: String;
    nombreArchivoFotoFirmaJefeGestionIngenierosComando?: String;
    cargoJefeGestionIngenierosComando?: String;

    gradoCteComando?: String;
    nombresCteComando?: String;
    primerApellidoCteComando?: String;
    segundoApellidoCteComando?: String;
    nombreArchivoFotoFirmaCteComando?: String;
    cargoCteComando?: String;

    gradoFincaRaizCede?: String;
    nombresFincaRaizCede?: String;
    primerApellidoFincaRaizCede?: String;
    segundoApellidoFincaRaizCede?: String;
    nombreArchivoFotoFirmaFincaRaizCede?: String;
    cargoFincaRaizCede?: String;

    gradoJefeGestionIngenierosCede?: String;
    nombresJefeGestionIngenierosCede?: String;
    primerApellidoJefeGestionIngenierosCede?: String;
    segundoApellidoJefeGestionIngenierosCede?: String;
    nombreArchivoFotoFirmaJefeGestionIngenierosCede?: String;
    cargoJefeGestionIngenierosCede?: String;

    gradoCteCede?: String;
    nombresCteCede?: String;
    primerApellidoCteCede?: String;
    segundoApellidoCteCede?: String;
    nombreArchivoFotoFirmaCteCede?: String;
    cargoCteCede?: String;

    gradoFincaRaizJef?: String;
    nombresFincaRaizJef?: String;
    primerApellidoFincaRaizJef?: String;
    segundoApellidoFincaRaizJef?: String;
    nombreArchivoFotoFirmaFincaRaizJef?: String;
    cargoFincaRaizJef?: String;

    gradoJefeGestionIngenierosJef?: String;
    nombresJefeGestionIngenierosJef?: String;
    primerApellidoJefeGestionIngenierosJef?: String;
    segundoApellidoJefeGestionIngenierosJef?: String;
    nombreArchivoFotoFirmaJefeGestionIngenierosJef?: String;
    cargoJefeGestionIngenierosJef?: String;

    gradoCteJef?: String;
    nombresCteJef?: String;
    primerApellidoCteJef?: String;
    segundoApellidoCteJef?: String;
    nombreArchivoFotoFirmaCteJef?: String;
    cargoCteJef?: String;
}

export interface IntegrantesDocumentosSolicInfraestMsj {
  mensaje: string;
}
