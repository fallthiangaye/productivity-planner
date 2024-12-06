import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'productivity-planners';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly isStaging = !(environment as any).production;
}
