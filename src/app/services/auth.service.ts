import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'jwt_token';


  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${environment.apiBaseUrl}/auth/login`, { username, password })
      .pipe(tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
      }));
  }


  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}