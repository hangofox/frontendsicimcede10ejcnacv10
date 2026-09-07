import { UnidadesMilitaresI } from "../../../panel-control/unidades-militares/unidades-militares.interface";
import { SociedadesUnidadesCentralizadorasI } from "../../../panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface";
import { EstadosTerrenosI } from "../estados-terrenos/estados-terrenos.interface";

export interface TerrenosI {
    idTerreno?: number;
    unidadMilitarDTO: UnidadesMilitaresI;
    sociedadUnidadCentralizadoraDTO: SociedadesUnidadesCentralizadorasI;
    estadoTerrenoDTO: EstadosTerrenosI;
    denominacionTerreno: String;
    numeroInventarioTerreno: String;
    numeroActivoFijoTerreno: String;
    numeroCatastralTerreno: String;
    numeroEscrituraTerreno: String;
    numeroNotariaTerreno: String;
    lugarUbicacionNotariaTerreno: String;
    fechaHMSMatriculaTerreno: String;
    paisOrigenTerreno: String;
    departamentoOEstadoOrigenTerreno: String;
    ciudadOrigenTerreno: String;
    direccionTerreno: String;
    latitudTerreno: String;
    longitudTerreno: String;
    numeroAreaTerreno: String;
    nombreUnidadMedidaTerreno: String;
    siONoExoneradoImpuestoPredialTerreno: String;
    numeroAnosExoneracionImpuestoPredialTerreno: number;
    observacionesTerreno: String;
    fechaHMSAltaTerreno: String;
    fechaHMSIngresoTerreno?: String;
    fechaHMSModificacionTerreno?: String;
}

export interface TerrenosMsj {
  mensaje: string;
}
