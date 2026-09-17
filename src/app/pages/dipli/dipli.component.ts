import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dipli',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dipli.component.html',
  styleUrl: './dipli.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DipliComponent {

}
