import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from "../../services/event";

interface City {
  id: number;
  name: string;
}

@Component({
  selector: 'app-hero-section',
  imports: [FormsModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements OnInit {
  isModalOpen = false;
  cities: City[] = [];

  nuovoEvento = {
    category: '',
    numberOfPeople: 0,
    location: '',
    description: '',
    date: ''
  };

  constructor(
    private eventService: EventService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<City[]>('http://localhost:8080/cities').subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (error) => {
        console.error('Errore durante il caricamento delle citta:', error);
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.nuovoEvento = {
      category: '',
      numberOfPeople: 0,
      location: '',
      description: '',
      date: ''
    };
  }

  salvaEvento() {
    this.eventService.createEvent(this.nuovoEvento).subscribe({
      next: (response) => {
        console.log('Evento salvato con successo:', response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Errore durante il salvataggio dell\'evento:', error);
      }
    });
  }
}
