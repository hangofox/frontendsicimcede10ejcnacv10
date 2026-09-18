import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatosUsuarioConectadoComponent } from '../datos-usuario-conectado/datos-usuario-conectado.component';

@Component({
  selector: 'app-cabezote',
  standalone: true,
  imports: [DatePipe, DatosUsuarioConectadoComponent],
  templateUrl: './cabezote.component.html',
  styleUrl: './cabezote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabezoteComponent {
  @Input() mostrarUsuario = true;
  readonly ahora = new Date();

  //Rotulo del titulo del sistema. Vive aqui y no escrito en la plantilla para
  //que el marcado y los estilos del panel no dependan de su valor: cambiarlo
  //no obliga a tocar ninguna clase, identificador SVG ni animacion.
  readonly tituloSistema = 'SICIM';
}
