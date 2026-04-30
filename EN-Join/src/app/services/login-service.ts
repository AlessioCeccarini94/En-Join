import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/auth/login';
  private http = inject(HttpClient);
  private _isLoggedIn = signal<boolean>(this.hasToken());
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
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
