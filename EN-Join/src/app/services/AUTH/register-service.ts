import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../../models/interfaces/api-response';
import { RegisterRequest } from '../../models/interfaces/register-request';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseURL = environment.services.auth.url;
  private http = inject(HttpClient);
  private router = inject(Router);

  register(request: RegisterRequest): Observable<ApiResponse<never>> {
    console.log(`Registrazione user:${request.email}`);
    return this.http.post<ApiResponse<never>>(`${this.baseURL}/auth/register`, request).pipe(
      tap(() => {
        console.log('Registrazione effettuata');
        this.router.navigate(['/login']);
      }),
    );
  }
}
