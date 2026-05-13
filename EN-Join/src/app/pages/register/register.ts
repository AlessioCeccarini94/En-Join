import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/AUTH/register-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { RegisterRequest } from '../../models/interfaces/register-request';
import { CityService } from '../../services/PAGES/cityService';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private cityService = inject(CityService);
  cities: Array<{ id: string; name: string }> = [];
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', Validators.required],
    cityId: ['', Validators.required],
  });

  ngOnInit(): void {
    this.cityService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities
          .map((city) => ({ id: city.id, name: city.cityName }))
          .sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base' }));
      },
      error: (err) => {
        this.errorMessage = 'Impossibile caricare la lista delle citta.';
        console.error('Errore cities:', err);
      },
    });
  }

  register(): void {
    if (this.registerForm.invalid || this.isSubmitting) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.registerForm.getRawValue();
    const request: RegisterRequest = {
      firstName: formValue.firstName ?? '',
      lastName: formValue.lastName ?? '',
      email: formValue.email ?? '',
      password: formValue.password ?? '',
      phone: formValue.phone ?? '',
      cityId: formValue.cityId ?? '',
    };

    this.registerService.register(request).subscribe({
      next: () => {
        this.successMessage = 'Registrazione completata, reindirizzamento al login...';
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Errore durante la registrazione.';
        this.isSubmitting = false;
      },
    });
  }
}
