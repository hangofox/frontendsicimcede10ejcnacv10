import { Pipe, PipeTransform } from '@angular/core';

import { UnidadesMilitaresI } from '../../interfaces/panel-control/unidades-militares/unidades-militares.interface';

//ORDENA ALFABÉTICAMENTE POR SIGLA O ACRÓNIMO LAS UNIDADES MILITARES DE LOS COMBOS DE FILTRO QUE SOLO MUESTRAN LA SIGLA O ACRÓNIMO
//(EL CATÁLOGO LLEGA ORDENADO POR NOMBRE, POR ESO "BRICC" APARECÍA ENTRE LOS "COMANDO DE LA ..."). ES PURO: SOLO SE
//RECALCULA CUANDO CAMBIA LA REFERENCIA DEL ARREGLO, Y NO MODIFICA EL ARREGLO ORIGINAL QUE USAN LOS FORMULARIOS:
@Pipe({
  name: 'ordenarPorSigla',
  standalone: true
})
export class OrdenarPorSiglaPipe implements PipeTransform {
  transform(unidadesMilitares: UnidadesMilitaresI[] | null | undefined): UnidadesMilitaresI[] {
    return [...(unidadesMilitares ?? [])].sort((unidadA, unidadB) =>
      String(unidadA.siglaoAcronimoUnidadMilitar ?? '').localeCompare(String(unidadB.siglaoAcronimoUnidadMilitar ?? ''), 'es', { numeric: true })
    );
  }
}
