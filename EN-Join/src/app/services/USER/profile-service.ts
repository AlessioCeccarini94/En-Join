import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EventItem } from '../PAGES/eventService';

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
  private baseURL = environment.services.auth.url;
  private http = inject(HttpClient);

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/users/me`);
  }

  getMyEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.baseURL}/events/my_events`);
  }

  getJoinedEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.baseURL}/events/joined_events`);
  }
}
