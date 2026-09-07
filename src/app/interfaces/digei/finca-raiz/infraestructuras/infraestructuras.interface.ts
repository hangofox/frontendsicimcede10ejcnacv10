import { UnidadesMilitaresI } from "../../../panel-control/unidades-militares/unidades-militares.interface";
import { SociedadesUnidadesCentralizadorasI } from "../../../panel-control/sociedades-unidades-centralizadoras/sociedades-unidades-centralizadoras.interface";
import { TiposEstructurasInfraestructurasI } from "../tipos-estructuras-infraestructuras/tipos-estructuras-infraestructuras.interface";
import { FuncionalidadesInfraestructurasI } from "../funcionalidades-infraestructuras/funcionalidades-infraestructuras.interface";
import { SegurosI } from "../../../seguros/seguros.interface";
import { TerrenosI } from "../../../terrenos/terrenos.interface";

export interface InfraestructurasI {
    idInfraestructura?: number;
    unidadMilitarDTO: UnidadesMilitaresI;
    sociedadUnidadCentralizadoraDTO?: SociedadesUnidadesCentralizadorasI;
    tipoEstructuraInfraestructuraDTO?: TiposEstructurasInfraestructurasI;
    funcionalidadInfraestructuraDTO?: FuncionalidadesInfraestructurasI;
    seguroDTO?: SegurosI;
    terrenoDTO?: TerrenosI;
    denominacionInfraestructura: String;
    numeroInventarioInfraestructura: String;
    numeroActivoFijoInfraestructura: String;
    centroCostoUnidadMilitarInfraestructura: String;
    paisOrigenInfraestructura: String;
    departamentoOEstadoOrigenInfraestructura: String;
    ciudadOrigenInfraestructura: String;
    direccionInfraestructura: String;
    fechaHMSAmortizacionInfraestructura: String;
    fechaHMSAltaInfraestructura: String;
    numeroLargoInfraestructura: String;
    nombreUnidadMedidaLargoInfraestructura: String;
    numeroAnchuraInfraestructura: String;
    nombreUnidadMedidaAnchuraInfraestructura: String;
    numeroProfundidadInfraestructura: String;
    nombreUnidadMedidaProfundidadInfraestructura: String;
    numeroPisosInfraestructura: String;
    estadoUsoInfraestructura: String;
    latitudInfraestructura: String;
    longitudInfraestructura: String;
    normaSismoresistenteInfraestructura: String;
    propiedadHorizontalInfraestructura: String;
    denominacionPosteriorInfraestructura: String;
    estratoInfraestructura: String;
    numeroCuentaInfraestructura: String;
    numeroSubcuentaInfraestructura: String;
    valorContableInfraestructura: String;
    fechaHMSIngresoInfraestructura?: String;
    fechaHMSModificacionInfraestructura?: String;
}

export interface InfraestructurasMsj {
  mensaje: string;
}
