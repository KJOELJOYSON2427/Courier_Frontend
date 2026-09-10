import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface CustomError {
  message: string;
}
//method to handle HTTP errors
export function handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    // Client-side or Network error (Status 0)
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } 
    // Backend error (e.g., 404, 500)
    else {
      // The server may return a structured error, or just the error message string.
      // We prioritize the error body message provided by the server.
      const serverError = error.error || error.statusText;
      
      errorMessage = 
        `Server returned code ${error.status}: ` + 
        `${serverError || 'Something went Wrong (No message provided)'}`;
      
      // The specific message you asked for from the server's 500 status:
      if (error.status === 500) {
        errorMessage = `Something went Wrong: ${serverError}`;
      }
    }
    
    // Log the error to the console for debugging
    console.error(errorMessage);

    // Re-throw the error as a standardized CustomError Observable
    // This stops the Observable chain and passes the error message to the component
    return throwError(() => ({ 
        message: errorMessage 
    } as CustomError));
  }