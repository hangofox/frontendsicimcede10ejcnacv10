import { PaisesMundoI } from "../../../paises-mundo/paises-mundo.interface";
import { DepartamentosoEstadosMundoI } from "../../../paises-mundo/departamentos-estados-mundo/departamentos-estados-mundo.interface";

export interface CiudadesMundoI {
    idCiudadMundo?: number;
    nombreCiudadMundo: String;
    paisMundoDTO: PaisesMundoI;
    departamentooEstadoMundoDTO: DepartamentosoEstadosMundoI;
}

export interface CiudadesMundoMsj {
    mensaje: string;
}