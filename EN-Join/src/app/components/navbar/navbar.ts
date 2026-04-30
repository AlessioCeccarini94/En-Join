import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  isDropdownOpen = false;
  isLoggedIn = this.loginService.isLoggedIn;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.loginService.logout();
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
