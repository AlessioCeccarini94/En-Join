import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  EventItem,
  EventRequest,
  EventService,
  LatestEventsByCategory,
} from '../../services/PAGES/eventService';
import { AllEvents } from '../../models/interfaces/event-response';
import { CategoryItem, CategoryService } from '../../services/PAGES/categoryService';
import { CityItem, CityService } from '../../services/PAGES/cityService';
import { MatFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [ReactiveFormsModule, MatFabButton, MatIconModule, RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements OnInit {
  private eventService = inject(EventService);
  private categoryService = inject(CategoryService);
  private cityService = inject(CityService);
  private fb = inject(FormBuilder);

  isModalOpen = false;
  cities: CityItem[] = [];
  category: CategoryItem[] = [];
  allEvents: EventItem[] = [];
  latestEventsByCategory: LatestEventsByCategory[] = [];
  upcomingEvents: EventItem[] = [];
  showUpcomingEvents = false;
  eventsError = '';
  eventsMessage = '';
  latestEventsError = '';
  latestEventsMessage = '';

  eventForm = this.fb.group({
    category: ['', Validators.required],
    numberOfPeople: [1, [Validators.required, Validators.min(1)]],
    location: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(5)]],
    date: ['', Validators.required],
  });

  ngOnInit() {
    this.cityService.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => console.error('Errore cities:', err),
    });

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.category = data;
      },
      error: (err) => console.error('Errore categories:', err),
    });

    this.loadLatestEventsByCategory();
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

    const formValue = this.eventForm.getRawValue();
    const eventPayload: EventRequest = {
      category: formValue.category ?? '',
      numberOfPeople: formValue.numberOfPeople ?? 1,
      location: formValue.location ?? '',
      description: formValue.description ?? '',
      date: formValue.date ?? '',
    };

    this.eventService.createEvent(eventPayload).subscribe({
      next: (response) => {
        console.log('Evento creato:', response);
        this.closeModal();
        this.loadLatestEventsByCategory();
        if (this.showUpcomingEvents) {
        }
      },
      error: (err) =>
        console.error('Errore creazione evento /events:', err?.status, err?.error || err),
    });
  }

  loadAllevents() {
    this.eventService.getEvents().subscribe({
      next: (sections) => {
        this.allEvents = sections;
        if (sections.length === 0) {
          this.latestEventsMessage = 'Non ci sono ancora eventi disponibili.';
        }
      },
      error: (err) => {
        this.latestEventsError = 'Impossibile caricare gli ultimi eventi per categoria.';
        console.error('Errore caricamento ultimi eventi per categoria:', err);
      },
    });
  }

  loadLatestEventsByCategory() {
    this.latestEventsError = '';
    this.latestEventsMessage = '';

    this.eventService.getLatestEventsByCategory().subscribe({
      next: (sections) => {
        this.latestEventsByCategory = sections;
        if (sections.length === 0) {
          this.latestEventsMessage = 'Non ci sono ancora eventi disponibili.';
        }
      },
      error: (err) => {
        this.latestEventsError = 'Impossibile caricare gli ultimi eventi per categoria.';
        console.error('Errore caricamento ultimi eventi per categoria:', err);
      },
    });
  }

  joinEvent(event: EventItem) {
    this.eventsError = '';
    this.eventsMessage = '';

    this.eventService.joinEvent(event.id).subscribe({
      next: () => {
        this.eventsMessage = `Hai scelto di partecipare a ${event.category}.`;
      },
      error: (err) => {
        this.eventsError = 'Impossibile partecipare a questo evento.';
        console.error('Errore partecipazione evento:', err);
      },
    });
  }
}
