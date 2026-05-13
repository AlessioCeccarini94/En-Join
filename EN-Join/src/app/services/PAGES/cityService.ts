import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type CityItem = {
  id: string;
  cityName: string;
};

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private http = inject(HttpClient);
  private baseURL = environment.services.auth.url;

  getCities(): Observable<CityItem[]> {
    return this.http.get<CityItem[]>(`${this.baseURL}/cities`);
  }
}
