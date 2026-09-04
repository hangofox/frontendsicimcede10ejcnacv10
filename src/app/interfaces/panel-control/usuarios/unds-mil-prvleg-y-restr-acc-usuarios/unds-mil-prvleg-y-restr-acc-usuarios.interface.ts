export interface UnidadesMilitaresPrivilegyRestriccAccesosUsuariosI {
    idUnidadMilitar?: number;
    nombreUnidadMilitar: String;
    siglaoAcronimoUnidadMilitar: String;
    nombreArchivoFotoLogExtoFmtUnidadMilitar: String;//POR DEFECTO DEJO DECLARADA ESTA VARIABLE, AUNQUE EN EL BACKEND NO SE EMPLEE, PERO LA REQUIERO PARA PODER HACER LA ASIGNACIÓN DEL OBJETO COMPLETO, QUE REQUIERE TODOS LOS DATOS COMPLETOS Y NO ME DE ERROR.
    nombreCarpetaAlmacenamientoUnidadMilitar: String;
}
  
export interface UnidadesMilitaresPrivilegyRestriccAccesosUsuariosMsj {
    mensaje: string;
}