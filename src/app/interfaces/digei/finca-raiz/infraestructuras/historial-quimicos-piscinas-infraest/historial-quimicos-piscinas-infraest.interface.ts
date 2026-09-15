import { OficinasI } from '../../../../panel-control/oficinas/oficinas.interface';
import { InfraestructurasI } from '../infraestructuras.interface';

export interface HistorialQuimicosPiscinasInfraestI {
  idHistorialQuimicoPiscinaInfraest?: number;
  numRegHistorialQuimicoPiscinaInfraest?: String;
  nombreHistorialQuimicoPiscinaInfraest: String;
  centroCostoOficinaQuimicoPiscinaInfraest: String;
  fechaHMSIngresoQuimicoPiscinaInfraest?: String;
  fechaHMSModificacionQuimicoPiscinaInfraest?: String;
  oficinaDTO: OficinasI;
  infraestructuraDTO: InfraestructurasI;
}

export interface HistorialQuimicosPiscinasInfraestMsj {
  mensaje: string;
}
