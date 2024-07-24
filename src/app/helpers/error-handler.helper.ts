import { HttpErrorResponse } from '@angular/common/http';

export function errorHandler(error: HttpErrorResponse): string {
  let errorMessage = '';

  if (error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    // @ts-ignore
    errorMessage = `An error occurred: ${error.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Backend returned code ${error.status}: $error.message}`;
  }

  return errorMessage;
}
