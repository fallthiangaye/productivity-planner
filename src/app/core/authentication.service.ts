import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { Observable } from 'rxjs';

/**
 * Represents the payload of the response received when registering a new user in Firebase.
 *
 * @see https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
 */
interface fireBaseResponseSignup {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface fireBaseResponseSignin {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly #http = inject(HttpClient);

  register(
    email: string,
    password: string
  ): Observable<fireBaseResponseSignup> {
    console.log(environment.firebaseConfig.apiKey);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
    ${environment.firebaseConfig.apiKey}`;
    const body = { email, password, returnSecureToken: true };

    return this.#http.post<fireBaseResponseSignup>(url, body);
  }

  login(email: string, password: string): Observable<fireBaseResponseSignin> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
    ${environment.firebaseConfig.apiKey}`;
    const body = { email, password, returnSecureToken: true };

    return this.#http.post<fireBaseResponseSignin>(url, body);
  }

  save(
    email: string,
    userId: string,
    idToken: string
  ): Observable<fireBaseResponseSignin> {
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`;
    const userFirestoreCollectionId = 'users';
    const url = `${baseUrl}/${userFirestoreCollectionId}?key=${environment.firebaseConfig.apiKey}&documentId=${userId}`;
    const body = {
      fields: {
        id: { stringValue: userId },
        email: { stringValue: email },
      },
    };

    const headers = new HttpHeaders({
      authorization: `Bearer ${idToken}`,
    });

    const options = { headers };

    return this.#http.post<fireBaseResponseSignin>(url, body, options);
  }
}
