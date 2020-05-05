import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DB } from '../models/db.model';
import { Search } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError('Your input was incorrect');
    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  searchFlashcard(inputValue): Observable<Search> {
    return this.http
      .post<Search>('http://localhost:3000/search', {
        title: inputValue,
      })
      .pipe(catchError(this.handleError));
  }

  postFlashcard(title, source, target, translations): Observable<Search> {
    return this.http
      .post<Search>('http://localhost:3000/save', {
        title,
        source,
        target,
        translations,
      })
      .pipe(catchError(this.handleError));
  }

  getFlashcard(): Observable<DB> {
    return this.http
      .get<DB>('http://localhost:3000/save')
      .pipe(catchError(this.handleError));
	}

	deleteFlashcard(title): Observable<DB> {
    return this.http
      .delete<DB>(`http://localhost:3000/save/${title}`)
      .pipe(catchError(this.handleError));
  }
}
