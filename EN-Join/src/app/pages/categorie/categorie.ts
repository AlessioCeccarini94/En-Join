import { Component, inject, signal } from '@angular/core';
import { EventItem, EventService } from '../../services/PAGES/eventService';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categorie',
  imports: [MatIconModule],
  templateUrl: './categorie.html',
  styleUrl: './categorie.css',
})
export class Categorie {
  private eventService = inject(EventService);

  categories = ['Spettacolo', 'Sport', 'Musica', 'Viaggi', 'Arte'];

  categoriesIcon: { [key: string]: string } = {
    Spettacolo: 'theater_comedy',
    Sport: 'sports_soccer',
    Viaggi: 'flight',
    Musica: 'music_note',
    Arte: 'palette',
  };
  selectedCategory = signal('');
  events = signal<EventItem[]>([]);
  errorMessage = signal('');
  emptyMessage = signal('');

  loadEventsByCategory(category: string) {
    this.selectedCategory.set(category);
    this.errorMessage.set('');
    this.emptyMessage.set('');
    this.events.set([]);

    this.eventService.getEventsByCategory(category).subscribe({
      next: (events) => {
        this.events.set(events);
        if (events.length === 0) {
          this.emptyMessage.set(`Non ci sono eventi per ${category}.`);
        }
      },
      error: (error) => {
        this.errorMessage.set('Impossibile caricare gli eventi per questa categoria.');
        console.error('Errore filtro categoria:', error);
      },
    });
  }
}
