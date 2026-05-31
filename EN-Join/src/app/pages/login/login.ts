import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/AUTH/login-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
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
