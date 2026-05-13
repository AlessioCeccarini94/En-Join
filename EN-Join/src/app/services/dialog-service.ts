import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialog } from '../components/error-dialog/error-dialog';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialog, {
      data: { message: errorMessage },
    });
  }
}
