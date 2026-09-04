import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dinco',
  standalone: true,
  templateUrl: './dinco.component.html',
  styleUrl: './dinco.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DincoComponent {

}
