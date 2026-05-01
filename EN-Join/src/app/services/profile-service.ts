import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  image: string;
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/users/me';
  private http = inject(HttpClient);
  getUser(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<User>(this.apiUrl, { headers });
  }
}
