import { Component, inject, signal } from '@angular/core';
import { ProfileService, User } from '../../services/USER/profile-service';
import { EventItem } from '../../services/PAGES/eventService';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatListModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private profileService = inject(ProfileService);

  user = signal<User | null>(null);
  joinedEvents = signal<EventItem[]>([]);
  joinedEventsError = '';
  joinedEventsMessage = '';

  ngOnInit(): void {
    this.profileService.getUser().subscribe({
      next: (user) => {
        this.user.set(user);
      },
      error: (err) => {
        console.error('Errore recupero utente:', err);
      },
    });

    this.profileService.getJoinedEvents().subscribe({
      next: (events) => {
        this.joinedEvents.set(this.sortEventsByDate(events));
        if (events.length === 0) {
          this.joinedEventsMessage = 'Non stai ancora partecipando a nessun evento.';
        }
      },
      error: (err) => {
        this.joinedEventsError = 'Impossibile caricare gli eventi a cui partecipi.';
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
}
