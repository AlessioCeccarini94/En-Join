import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ErrorDialogData {
  message: string;
}

@Component({
  selector: 'app-error-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.css',
})
export class ErrorDialog {
  public data: ErrorDialogData = inject(MAT_DIALOG_DATA);
}
