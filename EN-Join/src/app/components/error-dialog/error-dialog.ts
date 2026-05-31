import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  imports: [],
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.css',
})
export class ErrorDialog {
  @Input() message = '';
}
