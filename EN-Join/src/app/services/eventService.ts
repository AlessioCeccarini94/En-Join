import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';
  private http = inject(HttpClient);

  createEvent(event: any): Observable<any> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });
    return this.http.post(this.apiUrl, event);
  }
}
