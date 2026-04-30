import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-hero-section',
  imports: [FormsModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements OnInit {
  private http = inject(HttpClient);
  private eventService = inject(EventService);
  private categoryService = inject(CategoryService);

  isModalOpen = false;
  cities: any[] = [];
  category: any[] = [];

  nuovoEvento = {
    category: '',
    numberOfPeople: 0,
    location: '',
    description: '',
    date: '',
  };

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/cities').subscribe({
      next: (data) => (this.cities = data),
      error: (err) => console.error('Errore cities:', err),
    });

    this.http.get<any[]>('http://localhost:8080/categories').subscribe({
      next: (data) => {
        console.log('Categorie:', data);
        this.category = data;
      },
      error: (err) => console.error('Errore categories:', err),
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.nuovoEvento = { category: '', numberOfPeople: 0, location: '', description: '', date: '' };
  }

  salvaEvento() {
    this.eventService.createEvent(this.nuovoEvento).subscribe({
      next: (response) => {
        console.log('Evento creato:', response);
        this.closeModal();
      },
      error: (err) => console.error('Errore:', err),
    });
  }
}
