import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaninosI } from '../../../../../interfaces/dinco/gestion-desminado/caninos/caninos.interface';

@Component({
  selector: 'app-vista-canino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-canino.component.html',
  styleUrl: './vista-canino.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VistaCaninoComponent {

  @Input() caninoData: CaninosI | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  //MUESTRA LA FECHA DEL BACKEND (EJ. "2026-05-12T14:30:00" O "2026-05-12 14:30:00.0") COMO DD/MM/AAAA HH:MM:
  formatearFecha(fecha: unknown): string {
    if (!fecha) return '-';
    const texto = String(fecha).replace(' ', 'T');
    const [parteFecha, parteHora = ''] = texto.split('T');
    const [anio, mes, dia] = parteFecha.split('-');
    if (!anio || !mes || !dia) return texto;
    return `${dia}/${mes}/${anio}${parteHora ? ' ' + parteHora.slice(0, 5) : ''}`;
  }

  //MUESTRA LOS VALORES MONETARIOS CON SEPARADOR DE MILES (ES-CO):
  formatearValor(valor: unknown): string {
    if (valor === null || valor === undefined || String(valor).trim() === '') return '-';
    const numero = Number(String(valor).replace(',', '.'));
    if (Number.isNaN(numero)) return String(valor);
    return '$ ' + numero.toLocaleString('es-CO', { maximumFractionDigits: 2 });
  }

  closeModal(): void {
    this.cerrarModal.emit();
  }
}
