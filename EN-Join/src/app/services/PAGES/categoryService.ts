import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type CategoryItem = {
  id: string;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseURL = environment.services.auth.url;

  getCategories(): Observable<CategoryItem[]> {
    return this.http.get<CategoryItem[]>(`${this.baseURL}/categories`);
  }
}
