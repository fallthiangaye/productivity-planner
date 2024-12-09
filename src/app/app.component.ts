import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './core/authentication.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'productivity-planners';

  readonly #authenticationService = inject(AuthenticationService);

  onLogin() {
    const email = 'thiangaye.fall@uadb.edu.sn';
    const password = 'passer123';

    this.#authenticationService
      .login(email, password)
      .pipe(
        switchMap((response) => {
          console.log(response);
          const { email, localId, idToken } = response;
          return this.#authenticationService.save(email, localId, idToken);
        })
      )
      .subscribe((response) => console.log(response));
  }
}
