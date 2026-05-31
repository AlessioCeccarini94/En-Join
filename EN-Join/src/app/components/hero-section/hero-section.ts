import { Component, OnInit, inject, signal } from '@angular/core';
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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements OnInit {
  private eventService = inject(EventService);
  private categoryService = inject(CategoryService);
  private cityService = inject(CityService);
  private fb = inject(FormBuilder);

  isModalOpen = false;
  cities = signal<CityItem[]>([]);
  category = signal<CategoryItem[]>([]);
  allEvents = signal<EventItem[]>([]);
  latestEventsByCategory = signal<LatestEventsByCategory[]>([]);
  upcomingEvents = signal<EventItem[]>([]);
  showUpcomingEvents = false;
  eventsError = signal('');
  eventsMessage = signal('');
  latestEventsError = signal('');
  latestEventsMessage = signal('');

  eventForm = this.fb.group({
    category: ['', Validators.required],
    numberOfPeople: [1, [Validators.required, Validators.min(1)]],
    location: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(5)]],
    date: ['', Validators.required],
  });

  ngOnInit() {
    this.cityService.getCities().subscribe({
      next: (data) => this.cities.set(data),
      error: (err) => console.error('Errore cities:', err),
    });

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.category.set(data);
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
        this.allEvents.set(sections);
        if (sections.length === 0) {
          this.latestEventsMessage.set('Non ci sono ancora eventi disponibili.');
        }
      },
      error: (err) => {
        this.latestEventsError.set('Impossibile caricare gli ultimi eventi per categoria.');
        console.error('Errore caricamento ultimi eventi per categoria:', err);
      },
    });
  }

  loadLatestEventsByCategory() {
    this.latestEventsError.set('');
    this.latestEventsMessage.set('');

    this.eventService.getLatestEventsByCategory().subscribe({
      next: (sections) => {
        this.latestEventsByCategory.set(sections);
        if (sections.length === 0) {
          this.latestEventsMessage.set('Non ci sono ancora eventi disponibili.');
        }
      },
      error: (err) => {
        this.latestEventsError.set('Impossibile caricare gli ultimi eventi per categoria.');
        console.error('Errore caricamento ultimi eventi per categoria:', err);
      },
    });
  }

  joinEvent(event: EventItem) {
    this.eventsError.set('');
    this.eventsMessage.set('');

    this.eventService.joinEvent(event.id).subscribe({
      next: () => {
        this.eventsMessage.set(`Hai scelto di partecipare a ${event.category}.`);
      },
      error: (err) => {
        this.eventsError.set('Impossibile partecipare a questo evento.');
        console.error('Errore partecipazione evento:', err);
      },
    });
  }
}
