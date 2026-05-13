import { FormControl } from '@angular/forms';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  cityId: string | unknown;
}
