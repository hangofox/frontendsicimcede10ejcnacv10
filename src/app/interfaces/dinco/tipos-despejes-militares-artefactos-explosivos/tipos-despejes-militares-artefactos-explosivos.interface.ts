//CAMPOS DE TipoDespejeMilitarArtefactoExplosivoDTO (BACKEND):
export interface TiposDespejesMilitaresArtefactosExplosivosI {
  idTipoDespejeMilitarArtefactoExplosivo?: number;
  nombreTipoDespejeMilitarArtefactoExplosivo: String;
}

export interface TiposDespejesMilitaresArtefactosExplosivosMsj {
  mensaje: string;
  banderaexito?: boolean;//EL BACKEND RESPONDE HTTP 200 AUNQUE NO GUARDE; ESTA BANDERA LO INDICA.
}
