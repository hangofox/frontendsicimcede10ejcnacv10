import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProyeccionesTecnicomecanicasEquipTranspI } from '../../../../../interfaces/dinco/equipos-transportes/proyecciones-tecnicomecanicas-equip-transp/proyecciones-tecnicomecanicas-equip-transp.interface';
import { formatearFechaProyeccion, formatearValorProyeccion } from '../add-upd-del-proy-tecnicomec-equip-transp/add-upd-del-proy-tecnicomec-equip-transp.component';

@Component({
  selector: 'app-vista-proy-tecnicomec-equip-transp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-proy-tecnicomec-equip-transp.component.html',
  styleUrl: './vista-proy-tecnicomec-equip-transp.component.scss'
})
export class VistaProyTecnicomecEquipTranspComponent {
  @Input() data: ProyeccionesTecnicomecanicasEquipTranspI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  readonly formatearFecha = formatearFechaProyeccion;
  readonly formatearValor = formatearValorProyeccion;
}
