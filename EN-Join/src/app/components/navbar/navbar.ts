import { Component, ElementRef, HostListener, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { ProfileService, User } from '../../services/profile-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private loginService = inject(LoginService);
  private profileService = inject(ProfileService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  isDropdownOpen = false;
  isLoggedIn = this.loginService.isLoggedIn;
  user = signal<User | null>(null);

  constructor() {
    effect(() => {
      if (this.isLoggedIn()) {
        this.loadCurrentUser();
        return;
      }
      this.user.set(null);
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  loadCurrentUser(): void {
    this.profileService.getUser().subscribe({
      next: (user) => this.user.set(user),
      error: (err) => {
        console.error('Errore recupero utente:', err);
        this.user.set(null);
      },
    });
  }

  logout(): void {
    this.loginService.logout();
    this.user.set(null);
    this.isDropdownOpen = false;
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }
}
