import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/eventService';
import { CategoryService } from '../../services/categoryService';
import { MatFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-section',
  imports: [ReactiveFormsModule, MatFabButton, MatIconModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements OnInit {
  private http = inject(HttpClient);
  private eventService = inject(EventService);
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  isModalOpen = false;
  cities: any[] = [];
  category: any[] = [];

  eventForm = this.fb.group({
    category: ['', Validators.required],
    numberOfPeople: [1, [Validators.required, Validators.min(1)]],
    location: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(5)]],
    date: ['', Validators.required],
  });

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/cities').subscribe({
      next: (data) => (this.cities = data),
      error: (err) => console.error('Errore cities:', err),
    });

    this.categoryService.getCategories().subscribe({
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
    this.eventForm.reset({
      category: '',
      numberOfPeople: 1,
      location: '',
      description: '',
      date: '',
    });
  }

  salvaEvento() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    this.eventService.createEvent(this.eventForm.getRawValue()).subscribe({
      next: (response) => {
        console.log('Evento creato:', response);
        this.closeModal();
      },
      error: (err) => console.error('Errore:', err),
    });
  }
}
