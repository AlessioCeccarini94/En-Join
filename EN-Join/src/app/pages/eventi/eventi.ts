import { Component, inject, OnInit } from '@angular/core';
import { EventService, EventItem } from '../../services/PAGES/eventService';

@Component({
  selector: 'app-eventi',
  imports: [],
  templateUrl: './eventi.html',
  styleUrl: './eventi.css',
})
export class Eventi implements OnInit {
  private eventService = inject(EventService);
  upcomingEvents: EventItem[] = [];
  eventsError = '';
  eventsMessage = '';

  ngOnInit() {
    this.loadUpcomingEvents();
  }

  loadUpcomingEvents() {
    this.eventsError = '';
    this.eventsMessage = '';

    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.upcomingEvents = this.sortUpcomingEvents(events);
        if (this.upcomingEvents.length === 0) {
          this.eventsMessage = 'Non ci sono prossimi eventi disponibili.';
        }
      },
      error: (err) => {
        this.eventsError = 'Impossibile caricare i prossimi eventi.';
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
