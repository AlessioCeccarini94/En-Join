import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type EventItem = {
  id: string;
  category: string;
  numberOfPeople: number;
  location: string;
  description: string;
  organizerName: string;
  date: string;
};

export type EventRequest = {
  category: string;
  numberOfPeople: number;
  location: string;
  description: string;
  date: string;
};

export type LatestEventsByCategory = {
  category: string;
  events: EventItem[];
};

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseURL = environment.services.auth.url;
  private http = inject(HttpClient);

  getEvents(): Observable<EventItem[]> {
    return this.http
      .get<{ content: EventItem[] }>(`${this.baseURL}/events/all_events`)
      .pipe(map((response) => response.content));
  }

  getEventsByCategory(category: string): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.baseURL}/events/by-category`, {
      params: { category },
    });
  }

  getLatestEventsByCategory(): Observable<LatestEventsByCategory[]> {
    return this.http.get<LatestEventsByCategory[]>(`${this.baseURL}/events/latest-by-category`);
  }

  createEvent(event: EventRequest): Observable<EventItem> {
    return this.http.post<EventItem>(`${this.baseURL}/events`, event);
  }

  getMyEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.baseURL}/events/my_events`);
  }

  getJoinedEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.baseURL}/events/joined_events`);
  }

  joinEvent(eventId: string): Observable<EventItem> {
    return this.http.put<EventItem>(`${this.baseURL}/events/${eventId}/join`, null);
  }
}
