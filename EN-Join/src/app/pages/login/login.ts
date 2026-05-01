import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.loginForm.invalid) return;
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {
        const token = this.extractToken(response);
        if (!token) {
          console.error('Token non trovato nella risposta login:', response);
          return;
        }
        this.loginService.setSession(token);
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Errore login:', err),
    });
  }

  private extractToken(response: any): string | null {
    return (
      response?.token ??
      response?.accessToken ??
      response?.jwt ??
      response?.data?.token ??
      response?.data?.accessToken ??
      null
    );
  }
}
