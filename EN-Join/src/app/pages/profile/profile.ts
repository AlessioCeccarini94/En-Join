import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService, User } from '../../services/USER/profile-service';
import { EventService } from '../../services/PAGES/eventService';
import { EventItem } from '../../services/PAGES/eventService';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, MatIcon],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private profileService = inject(ProfileService);
  private eventService = inject(EventService);

  user = signal<User | null>(null);
  createdEvents = signal<EventItem[]>([]);
  joinedEvents = signal<EventItem[]>([]);
  createdEventsError = signal('');
  createdEventsMessage = signal('');
  joinedEventsError = signal('');
  joinedEventsMessage = signal('');

  ngOnInit(): void {
    this.profileService.getUser().subscribe({
      next: (user) => {
        this.user.set(user);
      },
      error: (err) => {
        console.error('Errore recupero utente:', err);
      },
    });

    this.loadCreatedEvents();
    this.loadJoinedEvents();
  }

  private loadCreatedEvents(): void {
    this.createdEventsError.set('');
    this.createdEventsMessage.set('');

    this.eventService.getMyEvents().subscribe({
      next: (events) => {
        this.createdEvents.set(this.sortEventsByDate(events));
        if (events.length === 0) {
          this.createdEventsMessage.set('Non hai ancora creato nessun evento.');
        }
      },
      error: (err) => {
        this.createdEventsError.set('Impossibile caricare gli eventi che hai creato.');
        console.error('Errore recupero eventi creati:', err);
      },
    });
  }

  private loadJoinedEvents(): void {
    this.joinedEventsError.set('');
    this.joinedEventsMessage.set('');

    this.eventService.getJoinedEvents().subscribe({
      next: (events) => {
        this.joinedEvents.set(this.sortEventsByDate(events));
        if (events.length === 0) {
          this.joinedEventsMessage.set('Non stai ancora partecipando a nessun evento.');
        }
      },
      error: (err) => {
        this.joinedEventsError.set('Impossibile caricare gli eventi a cui partecipi.');
        console.error('Errore recupero eventi partecipati:', err);
      },
    });
  }

  private sortEventsByDate(events: EventItem[]): EventItem[] {
    return [...events].sort(
      (firstEvent, secondEvent) =>
        new Date(`${firstEvent.date}T00:00:00`).getTime() -
        new Date(`${secondEvent.date}T00:00:00`).getTime(),
    );
  }

  deleteEvent(eventId: string): void {
    const shouldDelete = window.confirm('Vuoi eliminare definitivamente questo evento?');
    if (!shouldDelete) return;

    this.createdEventsError.set('');
    this.createdEventsMessage.set('');

    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        const nextCreatedEvents = this.createdEvents().filter((event) => event.id !== eventId);
        this.createdEvents.set(nextCreatedEvents);
        this.joinedEvents.set(this.joinedEvents().filter((event) => event.id !== eventId));
        if (nextCreatedEvents.length === 0) {
          this.createdEventsMessage.set('Non hai ancora creato nessun evento.');
        }
      },
      error: (err) => {
        this.createdEventsError.set('Impossibile eliminare questo evento.');
        console.error('Errore cancellazione evento:', err);
      },
    });
  }

  leaveEvent(eventId: string): void {
    this.joinedEventsError.set('');
    this.joinedEventsMessage.set('');

    this.eventService.leaveEvent(eventId).subscribe({
      next: () => {
        const nextJoinedEvents = this.joinedEvents().filter((event) => event.id !== eventId);
        this.joinedEvents.set(nextJoinedEvents);
        if (nextJoinedEvents.length === 0) {
          this.joinedEventsMessage.set('Non stai ancora partecipando a nessun evento.');
        }
      },
      error: (err) => {
        this.joinedEventsError.set('Impossibile annullare la partecipazione.');
        console.error('Errore annullamento partecipazione:', err);
      },
    });
  }
}
