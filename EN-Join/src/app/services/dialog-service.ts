import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  openErrorDialog(errorMessage: string): void {
    window.alert(errorMessage);
  }
}
