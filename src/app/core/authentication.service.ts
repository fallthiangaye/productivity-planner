import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.staging';
import { Observable } from 'rxjs';

/**
 * Represents the payload of the response received when registering a new user in Firebase.
 *
 * @see https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
 */
interface fireBaseRegisterResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly #http = inject(HttpClient);

  register(
    email: string,
    password: string
  ): Observable<fireBaseRegisterResponse> {
    console.log(environment.firebaseConfig.apiKey);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
    ${environment.firebaseConfig.apiKey}`;
    const body = { email, password, returnSecureToken: true };

    return this.#http.post<fireBaseRegisterResponse>(url, body);
  }
}
