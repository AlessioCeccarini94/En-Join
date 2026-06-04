import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService, User } from '../../services/USER/profile-service';

@Component({
  selector: 'app-organize-profile',
  imports: [],
  templateUrl: './organize-profile.html',
  styleUrl: './organize-profile.css',
})
export class OrganizeProfile {
  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  user = signal<User | null>(null);
  errorMessage = signal('');

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');

    if (!userId) {
      this.errorMessage.set('Organizzatore non trovato.');
      return;
    }

    this.profileService.getUserById(userId).subscribe({
      next: (user) => {
        this.user.set(user);
      },
      error: (err) => {
        this.errorMessage.set("Impossibile caricare il profilo dell'organizzatore.");
        console.error('Errore recupero organizzatore:', err);
      },
    });
  }
}
