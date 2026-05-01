import { Component, inject, signal, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService, User } from '../../services/profile-service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, RouterLink, MatListModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private profileService = inject(ProfileService);
  ElementRef = inject(ElementRef);

  user = signal<User | null>(null);

  ngOnInit(): void {
    this.profileService.getUser().subscribe({
      next: (user) => {
        this.user.set(user);
        console.log('Utente:', user);
      },
      error: (err) => {
        console.error('Errore recupero utente:', err);
      },
    });
    console.log('Utente:', this.user());
  }
}
