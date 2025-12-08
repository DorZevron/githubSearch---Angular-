import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'jwt_token';
  private router = inject(Router);

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${environment.apiBaseUrl}/auth/login`, { username, password })
      .pipe(tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
      }));
  }

  getPayload(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson);
  }

  tokenExpired(): boolean {
    const payload = this.getPayload();
    if (!payload) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}