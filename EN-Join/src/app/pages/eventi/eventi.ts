import { Component, inject, OnInit, signal } from '@angular/core';
import { EventService, EventItem } from '../../services/PAGES/eventService';

@Component({
  selector: 'app-eventi',
  imports: [],
  templateUrl: './eventi.html',
  styleUrl: './eventi.css',
})
export class Eventi implements OnInit {
  private eventService = inject(EventService);
  upcomingEvents = signal<EventItem[]>([]);
  eventsError = signal('');
  eventsMessage = signal('');

  ngOnInit() {
    this.loadUpcomingEvents();
  }

  loadUpcomingEvents() {
    this.eventsError.set('');
    this.eventsMessage.set('');

    this.eventService.getEvents().subscribe({
      next: (events) => {
        const upcomingEvents = this.sortUpcomingEvents(events);
        this.upcomingEvents.set(upcomingEvents);
        if (upcomingEvents.length === 0) {
          this.eventsMessage.set('Non ci sono prossimi eventi disponibili.');
        }
      },
      error: (err) => {
        this.eventsError.set('Impossibile caricare i prossimi eventi.');
        console.error('Errore caricamento eventi:', err);
      },
    });
  }
  private sortUpcomingEvents(events: EventItem[]): EventItem[] {
    const today = this.startOfToday();

    return [...events]
      .filter((event) => this.eventDateValue(event) >= today)
      .sort(
        (firstEvent, secondEvent) =>
          this.eventDateValue(firstEvent) - this.eventDateValue(secondEvent),
      );
  }

  private eventDateValue(event: EventItem): number {
    return new Date(`${event.date}T00:00:00`).getTime();
  }

  private startOfToday(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
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
