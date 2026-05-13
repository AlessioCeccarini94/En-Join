import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/interfaces/login-request';
import { User } from '../../models/interfaces/user-interface';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseURL = environment.services.auth.url;
  private http = inject(HttpClient);
  private _isLoggedIn = signal<boolean>(this.hasToken());
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  login(request: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseURL}/auth/login`, request);
  }
  setSession(token: string): void {
    localStorage.setItem('token', token);
    this._isLoggedIn.set(true);
  }
  logout(): void {
    localStorage.removeItem('token');
    this._isLoggedIn.set(false);
  }
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
