import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from '../models/interfaces/api-response';
import { DialogService } from '../services/dialog-service';
import { HttpErrorResponse } from '@angular/common/http';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const dialogService = inject(DialogService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage: string;

      if (error.error instanceof ErrorEvent) {
        errorMessage = `A client-side error occurred: ${error.error.message}`;
        console.error('Client-side error:', error.error);
      } else {
        const apiError = error.error as ApiResponse<object>;
        errorMessage =
          apiError?.message ||
          `Server returned code ${error.status}: an unexpected error occurred.`;
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
      }

      dialogService.openErrorDialog(errorMessage);

      return throwError(() => new Error(errorMessage));
    }),
  );
};
